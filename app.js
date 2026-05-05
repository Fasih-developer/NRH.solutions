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




loaded();
navbar();