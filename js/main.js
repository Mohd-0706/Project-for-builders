 document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const carouselList = document.getElementById('carouselList');
            const items = document.querySelectorAll('.carousel-item');
            const thumbnails = document.querySelectorAll('.thumbnail-item');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const progressBar = document.getElementById('progressBar');
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mobileNav = document.getElementById('mobileNav');
            const closeBtn = document.getElementById('closeBtn');
            
            // Variables
            let currentIndex = 0;
            let intervalId;
            let isAutoPlaying = true;
            const intervalTime = 5000; // 5 seconds
            const transitionSpeed = 800; // 0.8s (matches CSS)
            
            // Initialize
            updateCarousel();
            startAutoPlay();
            initStatsCounter();
            
            // Event Listeners
            prevBtn.addEventListener('click', () => {
                navigate(-1);
                resetAutoPlay();
            });
            
            nextBtn.addEventListener('click', () => {
                navigate(1);
                resetAutoPlay();
            });
            
            // Thumbnail click events
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    if (index !== currentIndex) {
                        currentIndex = index;
                        updateCarousel();
                        resetAutoPlay();
                    }
                });
            });
            
            // Mobile menu events
            mobileMenuBtn.addEventListener('click', () => {
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeBtn.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Functions
            function navigate(direction) {
                currentIndex += direction;
                
                if (currentIndex < 0) {
                    currentIndex = items.length - 1;
                } else if (currentIndex >= items.length) {
                    currentIndex = 0;
                }
                
                updateCarousel();
            }
            
            function updateCarousel() {
                // Update main items
                items.forEach((item, index) => {
                    item.classList.remove('active');
                    if (index === currentIndex) {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, 10);
                    }
                });
                
                // Update thumbnails
                thumbnails.forEach((thumb, index) => {
                    thumb.classList.remove('active');
                    if (index === currentIndex) {
                        thumb.classList.add('active');
                    }
                });
                
                // Reset and animate progress bar
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
                void progressBar.offsetWidth; // Trigger reflow
                progressBar.style.transition = `width ${intervalTime}ms linear`;
                progressBar.style.width = '100%';
            }
            
            function startAutoPlay() {
                if (isAutoPlaying) {
                    intervalId = setInterval(() => {
                        navigate(1);
                    }, intervalTime);
                }
            }
            
            function resetAutoPlay() {
                clearInterval(intervalId);
                startAutoPlay();
            }
            
            // Pause on hover
            carouselList.addEventListener('mouseenter', () => {
                clearInterval(intervalId);
                progressBar.style.transition = 'none';
                progressBar.style.width = progressBar.style.width; // Maintain current width
            });
            
            carouselList.addEventListener('mouseleave', () => {
                if (isAutoPlaying) {
                    resetAutoPlay();
                }
            });
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            carouselList.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(intervalId);
            }, {passive: true});
            
            carouselList.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                resetAutoPlay();
            }, {passive: true});
            
            function handleSwipe() {
                const difference = touchStartX - touchEndX;
                if (difference > 50) { // Swipe left
                    navigate(1);
                } else if (difference < -50) { // Swipe right
                    navigate(-1);
                }
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    navigate(-1);
                    resetAutoPlay();
                } else if (e.key === 'ArrowRight') {
                    navigate(1);
                    resetAutoPlay();
                }
            });
            
            // Animated stats counter
            function initStatsCounter() {
                const completedProjects = document.getElementById('completedProjects');
                const yearsExperience = document.getElementById('yearsExperience');
                const teamMembers = document.getElementById('teamMembers');
                const ongoingProjects = document.getElementById('ongoingProjects');
                
                const stats = [
                    { element: completedProjects, target: 125, duration: 2000 },
                    { element: yearsExperience, target: 15, duration: 2000 },
                    { element: teamMembers, target: 42, duration: 2000 },
                    { element: ongoingProjects, target: 8, duration: 2000 }
                ];
                
                // Only animate when stats section is in view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            stats.forEach(stat => {
                                animateCounter(stat.element, stat.target, stat.duration);
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(document.querySelector('.stats-section'));
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
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });