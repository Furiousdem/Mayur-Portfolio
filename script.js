/* =========================================================
   PART 1
   LOADER, NAVIGATION, TYPING, REVEAL, PARALLAX,
   3D TILT, CUSTOM CURSOR AND SCROLL EFFECTS
========================================================= */

"use strict";


/* =========================================================
   SAFE ELEMENT SELECTORS
========================================================= */

const getElement = (selector) => {
    return document.querySelector(selector);
};

const getElements = (selector) => {
    return document.querySelectorAll(selector);
};


/* =========================================================
   PAGE LOADER
========================================================= */

const pageLoader = getElement("#pageLoader");

window.addEventListener("load", () => {
    if (!pageLoader) {
        return;
    }

    window.setTimeout(() => {
        pageLoader.classList.add("hidden");
    }, 650);
});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const siteHeader = getElement("#siteHeader");

function updateHeaderOnScroll() {
    if (!siteHeader) {
        return;
    }

    if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeaderOnScroll,
    { passive: true }
);

updateHeaderOnScroll();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = getElement("#menuToggle");
const navMenu = getElement("#navMenu");
const navLinks = getElements(".nav-link");

function openMobileMenu() {
    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.add("open");
    document.body.classList.add("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    const menuIcon = menuToggle.querySelector("i");

    if (menuIcon) {
        menuIcon.classList.remove(
            "fa-bars"
        );

        menuIcon.classList.add(
            "fa-xmark"
        );
    }
}

function closeMobileMenu() {
    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    const menuIcon = menuToggle.querySelector("i");

    if (menuIcon) {
        menuIcon.classList.remove(
            "fa-xmark"
        );

        menuIcon.classList.add(
            "fa-bars"
        );
    }
}

function toggleMobileMenu() {
    if (!navMenu) {
        return;
    }

    if (navMenu.classList.contains("open")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMobileMenu();
    }
});


/* =========================================================
   SMOOTH SECTION SCROLLING
========================================================= */

const internalLinks = getElements('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const targetSection =
            getElement(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            siteHeader
                ? siteHeader.offsetHeight
                : 0;

        const targetPosition =
            targetSection.offsetTop -
            headerHeight +
            2;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = getElements("main section[id]");

function updateActiveNavigation() {
    const scrollPosition =
        window.scrollY + 180;

    let currentSectionId = "home";

    sections.forEach((section) => {
        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {
            currentSectionId =
                section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href");

        if (
            linkTarget ===
            `#${currentSectionId}`
        ) {
            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText = getElement("#typingText");

const typingRoles = [
    "Data Analytics",
    "Business Analytics",
    "Machine Learning",
    "Artificial Intelligence",
    "Web Development"
];

let roleIndex = 0;
let characterIndex = 0;
let deletingText = false;

const typingSpeed = 85;
const deletingSpeed = 45;
const pauseAfterTyping = 1400;
const pauseAfterDeleting = 350;

function runTypingAnimation() {
    if (!typingText) {
        return;
    }

    const currentRole =
        typingRoles[roleIndex];

    if (!deletingText) {
        characterIndex += 1;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );

        if (
            characterIndex ===
            currentRole.length
        ) {
            deletingText = true;

            window.setTimeout(
                runTypingAnimation,
                pauseAfterTyping
            );

            return;
        }

        window.setTimeout(
            runTypingAnimation,
            typingSpeed
        );
    } else {
        characterIndex -= 1;

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex
            );

        if (characterIndex === 0) {
            deletingText = false;

            roleIndex =
                (roleIndex + 1) %
                typingRoles.length;

            window.setTimeout(
                runTypingAnimation,
                pauseAfterDeleting
            );

            return;
        }

        window.setTimeout(
            runTypingAnimation,
            deletingSpeed
        );
    }
}

window.setTimeout(
    runTypingAnimation,
    900
);


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    getElements(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting
                ) {
                    entry.target
                        .classList
                        .add("visible");

                    observer.unobserve(
                        entry.target
                    );
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin:
                "0px 0px -40px 0px"
        }
    );

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   STAGGERED CARD ANIMATIONS
========================================================= */

const staggerGroups = [
    ".about-side-grid .reveal",
    ".skills-layout .reveal",
    ".language-grid .reveal",
    ".projects-grid .reveal",
    ".internships-grid .reveal"
];

staggerGroups.forEach((selector) => {
    const elements =
        getElements(selector);

    elements.forEach(
        (element, index) => {
            element.style.transitionDelay =
                `${index * 90}ms`;
        }
    );
});


/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

const scrollTopButton =
    getElement("#scrollTopButton");

function updateScrollTopButton() {
    if (!scrollTopButton) {
        return;
    }

    if (window.scrollY > 600) {
        scrollTopButton
            .classList
            .add("visible");
    } else {
        scrollTopButton
            .classList
            .remove("visible");
    }
}

window.addEventListener(
    "scroll",
    updateScrollTopButton,
    { passive: true }
);

if (scrollTopButton) {
    scrollTopButton.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}

updateScrollTopButton();


/* =========================================================
   HERO MOUSE PARALLAX
========================================================= */

const heroSection =
    getElement(".hero-section");

const parallaxLayers = [
    {
        element:
            getElement(
                ".map-layer-back"
            ),
        strength: 10
    },
    {
        element:
            getElement(
                ".map-layer-middle"
            ),
        strength: 16
    },
    {
        element:
            getElement(
                ".map-layer-front"
            ),
        strength: 21
    },
    {
        element:
            getElement(
                ".hero-compass"
            ),
        strength: 12
    }
];

function applyHeroParallax(event) {
    if (
        !heroSection ||
        window.innerWidth < 900
    ) {
        return;
    }

    const sectionBounds =
        heroSection
            .getBoundingClientRect();

    const relativeX =
        event.clientX -
        sectionBounds.left;

    const relativeY =
        event.clientY -
        sectionBounds.top;

    const xPercent =
        relativeX /
        sectionBounds.width -
        0.5;

    const yPercent =
        relativeY /
        sectionBounds.height -
        0.5;

    parallaxLayers.forEach(
        ({ element, strength }) => {
            if (!element) {
                return;
            }

            const moveX =
                xPercent * strength;

            const moveY =
                yPercent * strength;

            element.style.translate =
                `${moveX}px ${moveY}px`;
        }
    );
}

function resetHeroParallax() {
    parallaxLayers.forEach(
        ({ element }) => {
            if (!element) {
                return;
            }

            element.style.translate =
                "0px 0px";
        }
    );
}

if (heroSection) {
    heroSection.addEventListener(
        "mousemove",
        applyHeroParallax
    );

    heroSection.addEventListener(
        "mouseleave",
        resetHeroParallax
    );
}


/* =========================================================
   3D TILT CARDS
========================================================= */

const tiltCards =
    getElements(
        ".three-dimensional-card"
    );

function handleCardTilt(event) {
    const card =
        event.currentTarget;

    if (
        window.innerWidth < 900
    ) {
        return;
    }

    const bounds =
        card.getBoundingClientRect();

    const relativeX =
        event.clientX -
        bounds.left;

    const relativeY =
        event.clientY -
        bounds.top;

    const xPercentage =
        relativeX / bounds.width;

    const yPercentage =
        relativeY / bounds.height;

    const rotateY =
        (xPercentage - 0.5) * 8;

    const rotateX =
        (0.5 - yPercentage) * 8;

    card.style.transform =
        `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        `;
}

function resetCardTilt(event) {
    const card =
        event.currentTarget;

    card.style.transform = "";
}

tiltCards.forEach((card) => {
    card.addEventListener(
        "mousemove",
        handleCardTilt
    );

    card.addEventListener(
        "mouseleave",
        resetCardTilt
    );
});


/* =========================================================
   PROFILE 3D TILT
========================================================= */

const profileScene =
    getElement(".profile-scene");

function handleProfileTilt(event) {
    if (
        !profileScene ||
        window.innerWidth < 900
    ) {
        return;
    }

    const bounds =
        profileScene
            .getBoundingClientRect();

    const x =
        event.clientX -
        bounds.left;

    const y =
        event.clientY -
        bounds.top;

    const rotateY =
        (x / bounds.width - 0.5) *
        12;

    const rotateX =
        (0.5 - y / bounds.height) *
        12;

    profileScene.style.transform =
        `
        perspective(1100px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        `;
}

function resetProfileTilt() {
    if (!profileScene) {
        return;
    }

    profileScene.style.transform =
        "";
}

if (profileScene) {
    profileScene.addEventListener(
        "mousemove",
        handleProfileTilt
    );

    profileScene.addEventListener(
        "mouseleave",
        resetProfileTilt
    );
}


/* =========================================================
   SKILL BUTTON INTERACTION
========================================================= */

const skillButtons =
    getElements(".skill-button");

skillButtons.forEach((button) => {
    button.addEventListener(
        "mouseenter",
        () => {
            button.style.transform =
                `
                translateY(-5px)
                rotate(-1deg)
                scale(1.04)
                `;
        }
    );

    button.addEventListener(
        "mouseleave",
        () => {
            button.style.transform =
                "";
        }
    );
});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const customCursor =
    getElement("#customCursor");

const customCursorTrail =
    getElement(
        "#customCursorTrail"
    );

let cursorX = 0;
let cursorY = 0;

let trailX = 0;
let trailY = 0;

const cursorEnabled =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;

function moveCursor(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;

    if (customCursor) {
        customCursor.style.left =
            `${cursorX}px`;

        customCursor.style.top =
            `${cursorY}px`;

        customCursor
            .classList
            .add("active");
    }

    if (customCursorTrail) {
        customCursorTrail
            .classList
            .add("active");
    }
}

function animateCursorTrail() {
    trailX +=
        (cursorX - trailX) * 0.15;

    trailY +=
        (cursorY - trailY) * 0.15;

    if (customCursorTrail) {
        customCursorTrail.style.left =
            `${trailX}px`;

        customCursorTrail.style.top =
            `${trailY}px`;
    }

    window.requestAnimationFrame(
        animateCursorTrail
    );
}

if (cursorEnabled) {
    document.addEventListener(
        "mousemove",
        moveCursor
    );

    animateCursorTrail();

    const interactiveElements =
        getElements(
            `
            a,
            button,
            input,
            textarea,
            .three-dimensional-card
            `
        );

    interactiveElements.forEach(
        (element) => {
            element.addEventListener(
                "mouseenter",
                () => {
                    if (
                        customCursorTrail
                    ) {
                        customCursorTrail
                            .classList
                            .add(
                                "hovering"
                            );
                    }
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    if (
                        customCursorTrail
                    ) {
                        customCursorTrail
                            .classList
                            .remove(
                                "hovering"
                            );
                    }
                }
            );
        }
    );
}


/* =========================================================
   FOOTER YEAR
========================================================= */

const currentYear =
    getElement("#currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   REDUCED MOTION CHECK
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

function handleReducedMotion() {
    if (
        prefersReducedMotion.matches
    ) {
        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "visible"
                );
            }
        );

        resetHeroParallax();
        resetProfileTilt();
    }
}

prefersReducedMotion.addEventListener(
    "change",
    handleReducedMotion
);

handleReducedMotion();


/* =========================================================
   PART 2
   CONTACT FORM VALIDATION AND NETLIFY SUBMISSION
========================================================= */


/* =========================================================
   CONTACT FORM ELEMENTS
========================================================= */

const contactForm =
    getElement("#contactForm");

const contactSubmitButton =
    getElement("#contactSubmitButton");

const formStatus =
    getElement("#formStatus");


/* =========================================================
   FORM FIELD CONFIGURATION
========================================================= */

const formFields = [
    {
        element:
            getElement("#visitorName"),

        name:
            "Full Name",

        required:
            true,

        validate(value) {
            return value.trim().length >= 2;
        },

        errorMessage:
            "Please enter a valid full name."
    },

    {
        element:
            getElement("#visitorEmail"),

        name:
            "Email Address",

        required:
            true,

        validate(value) {
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return emailPattern.test(
                value.trim()
            );
        },

        errorMessage:
            "Please enter a valid email address."
    },

    {
        element:
            getElement("#visitorPhone"),

        name:
            "Contact Number",

        required:
            false,

        validate(value) {
            if (!value.trim()) {
                return true;
            }

            const phonePattern =
                /^[0-9+\-\s()]{7,18}$/;

            return phonePattern.test(
                value.trim()
            );
        },

        errorMessage:
            "Please enter a valid contact number."
    },

    {
        element:
            getElement("#visitorLinkedIn"),

        name:
            "LinkedIn Profile",

        required:
            true,

        validate(value) {
            try {
                const url =
                    new URL(
                        value.trim()
                    );

                return (
                    url.protocol ===
                        "https:" ||
                    url.protocol ===
                        "http:"
                );
            } catch {
                return false;
            }
        },

        errorMessage:
            "Please enter a valid LinkedIn profile URL."
    },

    {
        element:
            getElement("#visitorSubject"),

        name:
            "Subject",

        required:
            true,

        validate(value) {
            return value.trim().length >= 3;
        },

        errorMessage:
            "Please enter a subject."
    },

    {
        element:
            getElement("#visitorMessage"),

        name:
            "Message",

        required:
            true,

        validate(value) {
            return value.trim().length >= 10;
        },

        errorMessage:
            "Message should contain at least 10 characters."
    }
];


/* =========================================================
   FIELD ERROR HELPERS
========================================================= */

function getFormGroup(fieldElement) {
    if (!fieldElement) {
        return null;
    }

    return fieldElement.closest(
        ".form-group"
    );
}


function showFieldError(
    fieldElement,
    message
) {
    const formGroup =
        getFormGroup(fieldElement);

    if (!formGroup) {
        return;
    }

    formGroup.classList.add(
        "invalid"
    );

    const errorElement =
        formGroup.querySelector(
            ".form-error"
        );

    if (errorElement) {
        errorElement.textContent =
            message;
    }

    fieldElement.setAttribute(
        "aria-invalid",
        "true"
    );
}


function clearFieldError(
    fieldElement
) {
    const formGroup =
        getFormGroup(fieldElement);

    if (!formGroup) {
        return;
    }

    formGroup.classList.remove(
        "invalid"
    );

    const errorElement =
        formGroup.querySelector(
            ".form-error"
        );

    if (errorElement) {
        errorElement.textContent = "";
    }

    fieldElement.removeAttribute(
        "aria-invalid"
    );
}


/* =========================================================
   VALIDATE ONE FIELD
========================================================= */

function validateField(fieldConfig) {
    const fieldElement =
        fieldConfig.element;

    if (!fieldElement) {
        return true;
    }

    const value =
        fieldElement.value;

    if (
        fieldConfig.required &&
        !value.trim()
    ) {
        showFieldError(
            fieldElement,
            `${fieldConfig.name} is required.`
        );

        return false;
    }

    if (
        value.trim() &&
        !fieldConfig.validate(value)
    ) {
        showFieldError(
            fieldElement,
            fieldConfig.errorMessage
        );

        return false;
    }

    clearFieldError(
        fieldElement
    );

    return true;
}


/* =========================================================
   VALIDATE COMPLETE FORM
========================================================= */

function validateContactForm() {
    let formIsValid = true;
    let firstInvalidField = null;

    formFields.forEach(
        (fieldConfig) => {
            const fieldIsValid =
                validateField(
                    fieldConfig
                );

            if (!fieldIsValid) {
                formIsValid = false;

                if (!firstInvalidField) {
                    firstInvalidField =
                        fieldConfig.element;
                }
            }
        }
    );

    if (firstInvalidField) {
        firstInvalidField.focus();
    }

    return formIsValid;
}


/* =========================================================
   REAL-TIME FIELD VALIDATION
========================================================= */

formFields.forEach(
    (fieldConfig) => {
        const fieldElement =
            fieldConfig.element;

        if (!fieldElement) {
            return;
        }

        fieldElement.addEventListener(
            "blur",
            () => {
                validateField(
                    fieldConfig
                );
            }
        );

        fieldElement.addEventListener(
            "input",
            () => {
                const formGroup =
                    getFormGroup(
                        fieldElement
                    );

                if (
                    formGroup &&
                    formGroup.classList
                        .contains(
                            "invalid"
                        )
                ) {
                    validateField(
                        fieldConfig
                    );
                }
            }
        );
    }
);


/* =========================================================
   FORM STATUS MESSAGE
========================================================= */

function showFormStatus(
    message,
    type
) {
    if (!formStatus) {
        return;
    }

    formStatus.textContent =
        message;

    formStatus.classList.remove(
        "success",
        "error"
    );

    if (type) {
        formStatus.classList.add(
            type
        );
    }
}


function clearFormStatus() {
    if (!formStatus) {
        return;
    }

    formStatus.textContent = "";

    formStatus.classList.remove(
        "success",
        "error"
    );
}


/* =========================================================
   SUBMIT BUTTON STATE
========================================================= */

function setSubmittingState(
    isSubmitting
) {
    if (!contactSubmitButton) {
        return;
    }

    contactSubmitButton.disabled =
        isSubmitting;

    if (isSubmitting) {
        contactSubmitButton.innerHTML =
            `
            <span>
                Sending Message...
            </span>

            <i class="fa-solid fa-spinner fa-spin"></i>
            `;
    } else {
        contactSubmitButton.innerHTML =
            `
            <span>
                Send Message
            </span>

            <i class="fa-regular fa-paper-plane"></i>
            `;
    }
}


/* =========================================================
   NETLIFY FORM ENCODING
========================================================= */

function encodeFormData(formData) {
    return new URLSearchParams(
        formData
    ).toString();
}


/* =========================================================
   SUCCESS ANIMATION
========================================================= */

function runFormSuccessAnimation() {
    if (!contactForm) {
        return;
    }

    contactForm.animate(
        [
            {
                transform:
                    "translateY(0)",
                opacity: 1
            },

            {
                transform:
                    "translateY(-6px)",
                opacity: 0.85
            },

            {
                transform:
                    "translateY(0)",
                opacity: 1
            }
        ],

        {
            duration: 550,
            easing:
                "ease-out"
        }
    );
}


/* =========================================================
   CONTACT FORM SUBMISSION
========================================================= */

async function submitContactForm(
    event
) {
    event.preventDefault();

    clearFormStatus();

    const formIsValid =
        validateContactForm();

    if (!formIsValid) {
        showFormStatus(
            "Please correct the highlighted fields.",
            "error"
        );

        return;
    }

    if (!contactForm) {
        return;
    }

    setSubmittingState(true);

    const formData =
        new FormData(contactForm);

    try {
        const response =
            await fetch("/", {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body:
                    encodeFormData(
                        formData
                    )
            });

        if (!response.ok) {
            throw new Error(
                "Form submission failed."
            );
        }

        contactForm.reset();

        formFields.forEach(
            (fieldConfig) => {
                if (
                    fieldConfig.element
                ) {
                    clearFieldError(
                        fieldConfig.element
                    );
                }
            }
        );

        showFormStatus(
            "Thank you! Your message has been sent successfully. I will contact you soon.",
            "success"
        );

        runFormSuccessAnimation();
    } catch (error) {
        console.error(
            "Contact form error:",
            error
        );

        showFormStatus(
            "The message could not be sent right now. Please contact me directly through email or LinkedIn.",
            "error"
        );
    } finally {
        setSubmittingState(false);
    }
}

if (contactForm) {
    contactForm.addEventListener(
        "submit",
        submitContactForm
    );
}


/* =========================================================
   LINKEDIN URL AUTO-FORMATTING
========================================================= */

const linkedInField =
    getElement("#visitorLinkedIn");

if (linkedInField) {
    linkedInField.addEventListener(
        "blur",
        () => {
            const value =
                linkedInField.value.trim();

            if (
                value &&
                !value.startsWith(
                    "http://"
                ) &&
                !value.startsWith(
                    "https://"
                )
            ) {
                linkedInField.value =
                    `https://${value}`;
            }
        }
    );
}


/* =========================================================
   PHONE NUMBER CLEANUP
========================================================= */

const phoneField =
    getElement("#visitorPhone");

if (phoneField) {
    phoneField.addEventListener(
        "input",
        () => {
            phoneField.value =
                phoneField.value.replace(
                    /[^0-9+\-\s()]/g,
                    ""
                );
        }
    );
}


/* =========================================================
   PREVENT REPEATED SUBMISSIONS
========================================================= */

let lastSubmissionTime = 0;

if (contactForm) {
    contactForm.addEventListener(
        "submit",
        (event) => {
            const currentTime =
                Date.now();

            if (
                currentTime -
                    lastSubmissionTime <
                3000
            ) {
                event.preventDefault();

                showFormStatus(
                    "Please wait a moment before submitting again.",
                    "error"
                );

                return;
            }

            lastSubmissionTime =
                currentTime;
        },
        true
    );
}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {
        if (
            event.key === "Enter" &&
            event.target.classList
                .contains(
                    "skill-button"
                )
        ) {
            event.target.blur();
        }
    }
);


/* =========================================================
   PERFORMANCE OPTIMIZATION
========================================================= */

let scrollAnimationFrame =
    null;

window.addEventListener(
    "scroll",
    () => {
        if (scrollAnimationFrame) {
            return;
        }

        scrollAnimationFrame =
            window.requestAnimationFrame(
                () => {
                    updateHeaderOnScroll();
                    updateActiveNavigation();
                    updateScrollTopButton();

                    scrollAnimationFrame =
                        null;
                }
            );
    },
    {
        passive: true
    }
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

function initializePortfolio() {
    updateHeaderOnScroll();
    updateActiveNavigation();
    updateScrollTopButton();
    handleReducedMotion();

    document.documentElement
        .classList
        .add("javascript-enabled");
}

if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        initializePortfolio
    );
} else {
    initializePortfolio();
}