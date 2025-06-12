document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("closeBtn");
  const header = document.querySelector(".header-container");

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

  gsap.to(".hero-buttons", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
    delay: 1.1,
  });

  // Property cards animation
  gsap.utils.toArray(".property-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        delay: index * 0.1,
      }
    );
  });

  // Featured property animation
  gsap.fromTo(
    ".featured-property",
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".featured-property",
        start: "top 70%",
        toggleActions: "play none none none",
      },
    }
  );

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

  // Close button for mobile menu
  closeBtn.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "";
    mobileMenuBtn.querySelector("i").classList.replace("fa-times", "fa-bars");
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

  // Page transitions
  document.querySelectorAll("a").forEach((link) => {
    if (
      link.href &&
      !link.href.startsWith("javascript") &&
      !link.href.startsWith("#") &&
      !link.classList.contains("whatsapp-float")
    ) {
      link.addEventListener("click", function (e) {
        if (this.target === "_blank" || this.hasAttribute("download")) return;

        e.preventDefault();
        document.body.classList.add("page-transition");

        setTimeout(() => {
          window.location.href = this.href;
        }, 700);
      });
    }
  });
});
