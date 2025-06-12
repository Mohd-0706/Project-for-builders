document.addEventListener("DOMContentLoaded", function () {
            // DOM Elements
            const mobileMenuBtn = document.getElementById("mobileMenuBtn");
            const mobileNav = document.getElementById("mobileNav");
            const closeBtn = document.getElementById("closeBtn");
            const header = document.querySelector(".header-container");
            const filterTabs = document.querySelectorAll(".filter-tab");
            const projectCards = document.querySelectorAll(".project-card");

            // Register the ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Hero section fade-in on page load
            gsap.fromTo(".hero-title", {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            gsap.fromTo(".hero-subtitle", {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.8
            });

            // Animate project cards on scroll
            gsap.utils.toArray(".project-card").forEach((card, index) => {
                gsap.fromTo(card, {
                    opacity: 0,
                    y: 50
                }, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "power3.out"
                });
            });

            // Animate stats items on scroll
            gsap.utils.toArray(".stat-item").forEach((item, index) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    y: 50
                }, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power3.out"
                });
            });

            // Animate progress items on scroll (slide in from left)
            gsap.utils.toArray(".progress-item").forEach((item, index) => {
                gsap.fromTo(item, {
                    opacity: 0,
                    x: -50
                }, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power3.out"
                });
            });


            // Initialize
            initStatsCounter();
            initProgressBars();
            initFeaturedSlider();
            initFilterTabs();

            // Header scroll effect
            window.addEventListener("scroll", function () {
                if (window.scrollY > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            });

            

            // Mobile menu events
            mobileMenuBtn.addEventListener("click", () => {
                const icon = mobileMenuBtn.querySelector("i");
                if (mobileNav.classList.contains("active")) {
                    mobileNav.classList.remove("active");
                    document.body.style.overflow = "";
                    icon.classList.replace("fa-times", "fa-bars");
                } else {
                    mobileNav.classList.add("active");
                    document.body.style.overflow = "hidden";
                    icon.classList.replace("fa-bars", "fa-times");
                }
            });

            closeBtn.addEventListener("click", () => {
                mobileNav.classList.remove("active");
                document.body.style.overflow = "";
                mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll(".mobile-nav a").forEach((link) => {
                link.addEventListener("click", () => {
                    mobileNav.classList.remove("active");
                    document.body.style.overflow = "";
                    mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
                });
            });

            // Filter tabs functionality
            function initFilterTabs() {
                filterTabs.forEach(tab => {
                    tab.addEventListener("click", function () {
                        // Update active tab
                        filterTabs.forEach(t => t.classList.remove("active"));
                        this.classList.add("active");

                        // Filter projects
                        const filter = this.getAttribute("data-filter");

                        projectCards.forEach(card => {
                            if (filter === "all" || card.getAttribute("data-category") === filter) {
                                card.style.display = "block";
                            } else {
                                card.style.display = "none";
                            }
                        });
                    });
                });
            }

            // Animated stats counter
            function initStatsCounter() {
                const stats = [
                    { element: document.getElementById("flatsCount"), target: 245, duration: 2000 },
                    { element: document.getElementById("homesCount"), target: 128, duration: 2000 },
                    { element: document.getElementById("sqftCount"), target: 1250000, duration: 2000 },
                    { element: document.getElementById("clientsCount"), target: 320, duration: 2000 },
                ];

                // Only animate when stats section is in view
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                stats.forEach((stat) => {
                                    animateCounter(stat.element, stat.target, stat.duration);
                                });
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                observer.observe(document.querySelector(".stats-section"));
            }

            function animateCounter(element, target, duration) {
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    element.textContent = Math.floor(current).toLocaleString();
                }, 16);
            }

            // Progress bars animation
            function initProgressBars() {
                const progressBars = document.querySelectorAll(".progress-bar");
                const progressPercents = document.querySelectorAll(".progress-percent");

                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                progressBars.forEach((bar, index) => {
                                    const percent = bar.getAttribute("data-percent");
                                    bar.style.width = `${percent}%`;
                                    progressPercents[index].textContent = `${percent}%`;
                                });
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.5 }
                );

                observer.observe(document.querySelector(".progress-section"));
            }

            // Featured projects slider
            function initFeaturedSlider() {
                const featuredSlides = document.getElementById("featuredSlides");
                const featuredPrev = document.getElementById("featuredPrev");
                const featuredNext = document.getElementById("featuredNext");
                const featuredDots = document.getElementById("featuredDots").children;

                let currentSlide = 0;
                const slideCount = featuredSlides.children.length;

                function updateSlider() {
                    featuredSlides.style.transform = `translateX(-${currentSlide * 100}%)`;

                    // Update dots
                    Array.from(featuredDots).forEach((dot, index) => {
                        if (index === currentSlide) {
                            dot.classList.add("active");
                        } else {
                            dot.classList.remove("active");
                        }
                    });
                }

                featuredPrev.addEventListener("click", () => {
                    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                    updateSlider();
                });

                featuredNext.addEventListener("click", () => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateSlider();
                });

                // Dot navigation
                Array.from(featuredDots).forEach((dot, index) => {
                    dot.addEventListener("click", () => {
                        currentSlide = index;
                        updateSlider();
                    });
                });

                // Auto slide
                let slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % slideCount;
                    updateSlider();
                }, 5000);

                // Pause on hover
                featuredSlides.addEventListener("mouseenter", () => {
                    clearInterval(slideInterval);
                });

                featuredSlides.addEventListener("mouseleave", () => {
                    slideInterval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % slideCount;
                        updateSlider();
                    }, 5000);
                });
            }

            // Preloader
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                window.addEventListener('load', function () {
                    setTimeout(function () {
                        preloader.classList.add('fade-out');
                        setTimeout(function () {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 1000);
                });
            }
        });