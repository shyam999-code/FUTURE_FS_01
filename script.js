document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Reveal & Active Link Tracking
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Active link tracking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Sticky Navbar styling on scroll
        if (window.scrollY > 20) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            // Placeholder for simple mobile menu functionality
            // For a production site, we'd add CSS for .nav-links.active
            mobileMenu.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Contact Form Handling (Basic)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_sdqapro', 'template_h0e0gyn', contactForm)
                .then(() => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, (error) => {
                    alert('Failed to send the message. Please try again later.');
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
            // contactForm.reset() is now handled inside the EmailJS callback
        });
    }

    // Smooth scroll for all links (Polyfill-like behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Certificate Modal Functions
function openCertModal(imageSrc, captionText) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('modalCaption');
    
    modal.style.display = "block";
    modalImg.src = imageSrc;
    caption.innerHTML = captionText;
}

function closeCertModal() {
    document.getElementById('certModal').style.display = "none";
}

// Close modal when clicking outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById('certModal');
    if (event.target == modal) {
        closeCertModal();
    }
});
