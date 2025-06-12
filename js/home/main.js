document.addEventListener("DOMContentLoaded", function () {


      // DOM Elements
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      const mobileNav = document.getElementById("mobileNav");
      const closeBtn = document.getElementById("closeBtn");
      const header = document.querySelector(".header-container");
      const video = document.getElementById("constructionVideo");
      const muteBtn = document.getElementById("muteBtn");
      const sliderContainer = document.getElementById("sliderContainer");
      const prevBtn = document.getElementById("prevBtn");
      const nextBtn = document.getElementById("nextBtn");
      const slides = document.querySelectorAll(".project-slide");
      const slideCount = slides.length;
      let currentSlide = 0;
      let autoSlideInterval;
      let isAutoSliding = true;

      

      // Initialize GSAP animations
      gsap.registerPlugin(ScrollTrigger);

      // Hero section animations
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

      gsap.to(".hero-buttons", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.1
      });

      gsap.to(".stat-item", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.4
      });

      gsap.to(".explore-btn", {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.7
      });


      gsap.to(".attached-image-section img", {
        scrollTrigger: {
          trigger: ".attached-image-section",
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });


      // Initialize
      updateSlider();
      initStatsCounter();
      setupVideoControls();
      startAutoSlide();

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


      // Close mobile menu when clicking on a link
      document.querySelectorAll(".mobile-nav a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileNav.classList.remove("active");
          document.body.style.overflow = "";
        });
      });

      //Video controls
      function setupVideoControls() {
        muteBtn.addEventListener("click", function () {
          if (video.muted) {
            video.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          } else {
            video.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          }
        });
        const playPauseBtn = document.getElementById("playPauseBtn");

        playPauseBtn.addEventListener("click", function () {
          if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
          } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
          }
        });


        // SAFELY play video
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        video.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
          // Optionally display fallback poster or message
        });
      }



      function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      }

      function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
          if (isAutoSliding) {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
          }
        }, 8000);
      }


      function pauseAutoSlide() {
        isAutoSliding = false;
        clearInterval(autoSlideInterval);
      }

      function resumeAutoSlide() {
        isAutoSliding = true;
        startAutoSlide();
      }

      prevBtn.addEventListener("click", function () {
        pauseAutoSlide();
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
        setTimeout(resumeAutoSlide, 8000);
      });

      nextBtn.addEventListener("click", function () {
        pauseAutoSlide();
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
        setTimeout(resumeAutoSlide, 1000);
      });

      // Initialize slider
      updateSlider();
      startAutoSlide();

      // Animated stats counter
      function initStatsCounter() {
        const completedProjects = document.getElementById("completedProjects");
        const yearsExperience = document.getElementById("yearsExperience");
        const teamMembers = document.getElementById("teamMembers");
        const ongoingProjects = document.getElementById("ongoingProjects");

        const stats = [
          { element: completedProjects, target: 125, duration: 2000 },
          { element: yearsExperience, target: 15, duration: 2000 },
          { element: teamMembers, target: 42, duration: 2000 },
          { element: ongoingProjects, target: 8, duration: 2000 },
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
          element.textContent = Math.floor(current);
        }, 16);
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            });
          }
        });
      });

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