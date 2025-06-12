document.addEventListener("DOMContentLoaded", function () {
            gsap.registerPlugin(ScrollTrigger);

            // Header scroll background
            const header = document.querySelector(".header-container");
            window.addEventListener("scroll", () => {
                header.classList.toggle("scrolled", window.scrollY > 50);
            });

            // Animate hero title and subtitle on page load
            gsap.to(".hero-title", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            gsap.to(".hero-subtitle", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.8
            });

            // Scroll-triggered section animations
            const animateOnScroll = (selector) => {
                gsap.utils.toArray(selector).forEach((el, i) => {
                    gsap.to(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        delay: i * 0.1
                    });
                });
            };

            animateOnScroll(".section-title");
            animateOnScroll(".story-container");
            animateOnScroll(".value-card");
            animateOnScroll(".team-card");
            animateOnScroll(".stat-item");

            ScrollTrigger.refresh();

            // Stats Counter
            const stats = [
                { id: "yearsInBusiness", target: 15 },
                { id: "completedProjects", target: 125 },
                { id: "teamSize", target: 42 },
                { id: "ongoingProjects", target: 8 }
            ];

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        stats.forEach(stat => {
                            const el = document.getElementById(stat.id);
                            animateCounter(el, stat.target, 2000);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(document.querySelector(".stats-section"));

            function animateCounter(element, target, duration) {
                let start = 0;
                const increment = target / (duration / 16);
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        clearInterval(timer);
                        start = target;
                    }
                    element.textContent = Math.floor(start);
                }, 16);
            }

            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener("click", function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute("href"));
                    if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                    }
                });
            });

            // Preloader fade out
            const preloader = document.querySelector('.preloader');
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            });

            // Mobile navigation toggle with proper icon switch
            const mobileMenuBtn = document.getElementById("mobileMenuBtn");
            const mobileNav = document.getElementById("mobileNav");
            const closeBtn = document.getElementById("closeBtn");
            const icon = mobileMenuBtn.querySelector("i");

            function closeMenu() {
                mobileNav.classList.remove("active");
                document.body.style.overflow = "";
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }

            function openMenu() {
                mobileNav.classList.add("active");
                document.body.style.overflow = "hidden";
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            }

            mobileMenuBtn.addEventListener("click", () => {
                if (mobileNav.classList.contains("active")) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            closeBtn.addEventListener("click", () => {
                closeMenu();
            });

            document.querySelectorAll(".mobile-nav a").forEach(link => {
                link.addEventListener("click", () => {
                    closeMenu();
                });
            });
        });