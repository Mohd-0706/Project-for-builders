document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("closeBtn");
  const header = document.querySelector(".header-container");
  const reviewForm = document.getElementById("reviewForm");
  const successMessage = document.getElementById("successMessage");
  const ratingInputs = document.querySelectorAll(".rating-star-input");
  const ratingValue = document.getElementById("ratingValue");

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

  // Review cards animation
  gsap.utils.toArray(".review-card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2 + index * 0.1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  // Review form animation
  gsap.to(".review-form-section", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".review-form-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Footer animation
  gsap.to("footer", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "footer",
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

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  
  const stars = document.querySelectorAll('input[name="rating"]');

  stars.forEach(star => {
    star.addEventListener('change', () => {
      ratingValue.textContent = star.value;
    });
  });


  // Review form submission
  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.querySelector(
      'input[name="rating"]:checked'
    )?.value;
    const project = document.getElementById("project").value;
    const reviewText = document.getElementById("review").value;

    // In a real implementation, you would send this data to your server
    console.log("Review submitted:", {
      name,
      email,
      rating,
      project,
      reviewText,
    });

    // Show success message
    reviewForm.reset();
    ratingValue.textContent = "0";
    successMessage.style.display = "block";

    // Scroll to success message
    setTimeout(() => {
      successMessage.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  });

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
