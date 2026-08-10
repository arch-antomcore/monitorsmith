document.addEventListener("DOMContentLoaded", () => {
    // 1. Iniciar Lenis para Smooth Scrolling idêntico ao React app
    const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar Lenis ao GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        lenis.on('scroll', window.ScrollTrigger.update);
        
        window.gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);

        // 2. Animar os elementos do blog (Fade-Up progressivo)
        const blogSections = document.querySelectorAll('main > h1, main > h2, main > section, .blog-body > *, .related-grid a, .cta-group');
        
        blogSections.forEach((el, index) => {
            window.gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, 
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 3. Efeito Parallax/Zoom ultra sutil na capa (imagem principal)
        const figureImgs = document.querySelectorAll('figure img');
        figureImgs.forEach(img => {
            window.gsap.to(img, {
                scale: 1.03,
                ease: "none",
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
});
