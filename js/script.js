/**
 * CASA JATOBÁ - Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 
    // 0. Splash Screen / Intro Animation
    const splashScreen = document.getElementById('splash-screen');
    const splashVideo = document.getElementById('splash-video');

    if (splashScreen) {
        const hideSplash = () => {
            splashScreen.classList.add('fade-out');

            // Remove o elemento do DOM completamente após a transição do fade-out
            setTimeout(() => {
                splashScreen.remove();
            }, 800); // 800ms é o tempo do css transition
        };

        if (splashVideo) {
            // Esconde o splash quando o vídeo terminar
            splashVideo.addEventListener('ended', hideSplash);

            // Segurança: Se o vídeo falhar em carregar (não tem duração) ou houver erro
            splashVideo.addEventListener('error', hideSplash);

            // Segunda camada de segurança: força fechar depois de um tempo fixo (ex: 8s) caso o evento não dispare
            setTimeout(hideSplash, 8000);
        } else {
            // Fallback caso não ache o vídeo
            setTimeout(hideSplash, 3500);
        }
    } 
    */

    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav');

    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Sticky Header on Scroll
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Close mobile menu on clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Smooth Scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                // Account for fixed header height
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Intersection Observer for Scroll Animations
    // Watch elements with classes fade-in-up, fade-in-left, fade-in-right
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animation has triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element hits the bottom
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 6. Image Modal Logic
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('modalClose');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    const galleryImages = document.querySelectorAll('.gallery-img');

    let currentGallery = [];
    let currentIndex = 0;

    if (modal && modalImg && closeBtn && galleryImages.length > 0) {

        function showModalImage(index) {
            if (currentGallery.length === 0) return;

            if (index < 0) index = currentGallery.length - 1;
            if (index >= currentGallery.length) index = 0;

            currentIndex = index;
            modalImg.src = currentGallery[currentIndex].src;

            if (currentGallery.length <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            } else {
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';
            }
        }

        // Open modal on click
        galleryImages.forEach(img => {
            img.addEventListener('click', function (e) {
                const parentSection = this.closest('.section') || this.closest('.grid');
                if (parentSection) {
                    currentGallery = Array.from(parentSection.querySelectorAll('.gallery-img'));
                } else {
                    currentGallery = [this];
                }

                currentIndex = currentGallery.indexOf(this);
                showModalImage(currentIndex);
                modal.classList.add('show');
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showModalImage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showModalImage(currentIndex + 1);
            });
        }

        // Close modal on close button click
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close modal on clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Modal Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('show')) {
                if (e.key === "Escape") {
                    modal.classList.remove('show');
                } else if (e.key === "ArrowLeft") {
                    showModalImage(currentIndex - 1);
                } else if (e.key === "ArrowRight") {
                    showModalImage(currentIndex + 1);
                }
            }
        });
    }

});
