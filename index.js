/* =====================================
   DIPTHO DURJOY - PREMIUM PORTFOLIO JS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("main section[id]");


    // =====================================
    // 1. THEME SYSTEM
    // =====================================

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }

    updateThemeIcon();

    function updateThemeIcon() {
        if (!themeIcon) return;

        themeIcon.className = body.classList.contains("light-theme")
            ? "fas fa-sun"
            : "fas fa-moon";
    }

    themeToggle?.addEventListener("click", () => {

        body.classList.toggle("light-theme");

        const currentTheme = body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);

        updateThemeIcon();

    });


    // =====================================
    // 2. TYPING ANIMATION
    // =====================================

    const typingElement = document.querySelector(".hero-content h2");

    if (typingElement) {

        const roles = [
            "PHP Developer",
            "Web Developer",
            "Backend Developer",
            "API Integration Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        typingElement.textContent = "";

        function typeEffect() {

            const currentText = roles[roleIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentText.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentText.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentText.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }

            }

            setTimeout(typeEffect, deleting ? 45 : 85);
        }

        typeEffect();

    }


    // =====================================
    // 3. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-card, .experience-card, " +
        ".skill-card, .project-card, .contact-card, .hero-content, .hero-image"
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        if (
            element.classList.contains("skill-card") ||
            element.classList.contains("experience-card") ||
            element.classList.contains("project-card")
        ) {
            element.style.transitionDelay = `${(index % 4) * 100}ms`;
        }

    });


    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // =====================================
    // 4. SCROLL PROGRESS BAR
    // =====================================

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);


    function updateProgress() {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = `${progress}%`;

    }


    // =====================================
    // 5. BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.createElement("button");

    backToTop.className = "back-to-top";

    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';

    backToTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backToTop);


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =====================================
    // 6. ACTIVE NAVIGATION
    // =====================================

    const sectionObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }, {
        rootMargin: "-30% 0px -60% 0px"
    });


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // =====================================
    // 7. SCROLL EVENTS
    // =====================================

    let ticking = false;

    function handleScroll() {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                updateProgress();

                backToTop.classList.toggle(
                    "show",
                    window.scrollY > 400
                );

                ticking = false;

            });

            ticking = true;
        }

    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    updateProgress();


    // =====================================
    // 8. SMOOTH NAVIGATION
    // =====================================

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // 9. PROJECT CARD INTERACTIONS
    // =====================================

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

    });


    // =====================================
    // 10. IMAGE ERROR HANDLING
    // =====================================

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.classList.add("image-error");

        });

    });


    // =====================================
    // 11. FOOTER CURRENT YEAR
    // =====================================

    const footerYear = document.querySelector(".footer p");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Diptho Durjoy. All Rights Reserved.`;

    }


    // =====================================
    // 12. CONSOLE MESSAGE
    // =====================================

    console.log(
        "%c Diptho Durjoy | Portfolio Loaded Successfully ",
        "background: #7c3aed; color: white; padding: 10px; border-radius: 5px;"
    );

});
