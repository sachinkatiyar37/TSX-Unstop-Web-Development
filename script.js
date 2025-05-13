// Smooth scrolling for internal links
    // Animate progress bars on scroll into view
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('#skills .progress-bar');
        progressBars.forEach(bar => {
            const widthTarget = bar.textContent.trim();
            bar.style.width = widthTarget;
        });
    }

    // Intersection Observer for animating skills section
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    animateProgressBars();
                    skillsSection.style.opacity = 1;
                    skillsAnimated = true;
                    observer.unobserve(skillsSection);
                }
            });
        }, {threshold: 0.5});
        observer.observe(skillsSection);
    } else {
        // Fallback if IntersectionObserver not supported
        animateProgressBars();
        skillsSection.style.opacity = 1;
    }

    // Fade in other sections on scroll
    const fadeInSections = ['about', 'portfolio', 'contact'];
    fadeInSections.forEach(id => {
        const section = document.getElementById(id);
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.style.opacity = 1;
                        observer.unobserve(section);
                    }
                });
            }, {threshold: 0.3});
            obs.observe(section);
        } else {
            section.style.opacity = 1;
        }
    });

    // Contact form validation and fake submission
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.style.display = 'none';

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        form.classList.remove('was-validated');
        // Simulate sending message
        formMessage.style.color = '#ffdd57';
        formMessage.textContent = "Sending message...";
        formMessage.style.display = 'block';

        setTimeout(() => {
            formMessage.textContent = "Thank you! Your message has been sent.";
            form.reset();
        }, 1500);
    });
