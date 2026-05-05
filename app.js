function loaded(){
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    console.log("NRH Solutions App Initialized. GSAP Ready.");
});
}
function navbar (){

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // --- NAVBAR MOBILE MENU GSAP ANIMATION ---
    const menuBtn = document.querySelector('.header__menu-btn');
    const mobileNav = document.querySelector('.header__nav');

    if (menuBtn && mobileNav) {
        // 1. Create a matchMedia instance to scope our animations
        let mm = gsap.matchMedia();

        // 2. Only run this GSAP logic on screens 768px or smaller
        mm.add("(max-width: 768px)", () => {
            let isMenuOpen = false;
            
            // Hide the menu initially ONLY on mobile
            gsap.set(mobileNav, { 
                autoAlpha: 0, 
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' 
            });

            const toggleMenu = () => {
                isMenuOpen = !isMenuOpen;
                menuBtn.setAttribute('aria-expanded', isMenuOpen);

                if (isMenuOpen) {
                    gsap.to(mobileNav, {
                        autoAlpha: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        duration: 0.5,
                        ease: "power3.out"
                    });
                } else {
                    gsap.to(mobileNav, {
                        autoAlpha: 0,
                        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
                        duration: 0.4,
                        ease: "power2.in"
                    });
                }
            };

            menuBtn.addEventListener('click', toggleMenu);

            // 3. Cleanup function: If the user resizes back to desktop, remove the inline GSAP styles
            return () => {
                menuBtn.removeEventListener('click', toggleMenu);
                gsap.set(mobileNav, { clearProps: "all" }); 
            };
        });
    }
});
}
function hero(){
    const heroTl = gsap.timeline({ defaults: { ease: "power2.out" }});
    heroTl.fromTo(".hero__video", 
        { autoAlpha: 0 }, 
        { autoAlpha: 0.5, duration: 1.5 } 
    )
    .from(".hero__heading", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8
    }, "-=0.5") 
    .from(".hero__subheading", {
        autoAlpha: 0,
        y: 15,
        duration: 0.8
    }, "-=0.4")
    .from(".hero__btn", {
        autoAlpha: 0, 
        y: 10,
        duration: 0.6
    }, "-=0.4");
}
function about(){
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about",
            start: "top 75%", // Starts when the top of the section hits 75% down the screen
            toggleActions: "play none none none" // Plays once
        },
        defaults: { ease: "power2.out" }
    });

    // 1. Heading fades in
    aboutTl.from(".about__heading", {
        autoAlpha: 0,
        y: 30,
        duration: 0.6
    })
    // 2. Text fades in
    .from(".about__text", {
        autoAlpha: 0,
        y: 30,
        duration: 0.6
    }, "-=0.3") // Overlaps slightly with previous animation
    // 3. Image fades in
    .from(".about__image", {
        autoAlpha: 0,
        x: 30, // Slides slightly from the right
        duration: 0.8
    }, "-=0.3")
    // 4. Button fades in
    .from(".about__btn", {
        autoAlpha: 0,
        y: 20,
        duration: 0.5
    }, "-=0.4");
}
function values(){
    gsap.from(".values__card", {
        scrollTrigger: {
            trigger: ".values",
            start: "top 80%", // Triggers slightly earlier so it animates as they scroll
            toggleActions: "play none none none"
        },
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.2, // 0.2 seconds between each card appearing
        ease: "power2.out",
        clearProps: "all"
    });
}
function services_slider(){
// --- EXCLUSIVE SERVICES SCROLL ANIMATION ---
    const servicesTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services",
            start: "top 75%", 
            toggleActions: "play none none none"
        },
        defaults: { ease: "power2.out" }
    });

    servicesTl.from(".services__subtitle, .services__heading, .services__description", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2
    })
    .from(".services__slider-wrapper", {
        autoAlpha: 0,
        duration: 0.8
    }, "-=0.2")
    // Force the button to be visible using fromTo
    .fromTo(".services__btn", 
        { autoAlpha: 0, y: 15 }, 
        { autoAlpha: 1, y: 0, duration: 0.5 }, 
        "-=0.3"
    );
}
function choose_Us(){
    // --- WHY CHOOSE US SCROLL & COUNTING ANIMATION ---
    const chooseTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".choose-us",
            start: "top 80%", 
            toggleActions: "play none none none"
        },
        defaults: { ease: "power2.out" }
    });

    // 1. Fade in heading
    chooseTl.from(".choose-us__heading", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6
    })
    // 2. Fade in paragraph
    .from(".choose-us__text", {
        autoAlpha: 0,
        y: 20,
        duration: 0.6
    }, "-=0.3")
    // 3. Fade in stat cards
    .from(".choose-us__stat-card", {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        clearProps: "all"
    }, "-=0.2");

    // 4. Trigger the Number Counter Animations
    const counters = document.querySelectorAll(".counter");
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        // Check if this specific counter needs decimal formatting (for the 4.9)
        const isDecimal = counter.hasAttribute("data-decimals"); 
        
        // Create a dummy object to animate the value
        let countObj = { val: 0 };

        // Attach this to the timeline so it fires smoothly after the cards fade in
        chooseTl.to(countObj, {
            val: target,
            duration: 2, 
            ease: "power2.out",
            onUpdate: function() {
                // If it's a decimal, fix to 1 place, otherwise round to whole integer
                counter.innerHTML = isDecimal ? countObj.val.toFixed(1) : Math.floor(countObj.val);
            }
        }, "-=0.5"); // Starts slightly before the fade-in finishes
    });
}
function footer(){
    const scrollTopBtn = document.querySelector('.footer__scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

loaded();
navbar();
hero();
about();
values();
services_slider();
choose_Us();
footer();