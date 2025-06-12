document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("closeBtn");
  const header = document.querySelector(".header-container");
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  gsap.to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.5,
  });

  gsap.to(".hero-subtitle", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 0.8,
  });

  // Section animations
  gsap.to(".section-title", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.to(".contact-info", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.to(".map-container", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".map-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.to(".contact-form-container", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-form-container",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Animate info items with stagger
  gsap.to(".info-item", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".contact-info",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

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

  // Form submission handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector(".submit-btn");

    // Change button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (in a real scenario, you would use fetch or XMLHttpRequest)
    setTimeout(() => {
      // Show success message
      formFeedback.textContent =
        "Your message has been sent successfully! We will get back to you soon.";
      formFeedback.className = "form-feedback success";
      formFeedback.style.display = "block";

      // Reset button state
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;

      // Reset form
      contactForm.reset();

      // Hide feedback after 5 seconds
      setTimeout(() => {
        formFeedback.style.display = "none";
      }, 5000);
    }, 1500);
  });

  // Preloader
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        preloader.classList.add("fade-out");
        setTimeout(function () {
          preloader.style.display = "none";
        }, 500);
      }, 1000);
    });
  }
});
