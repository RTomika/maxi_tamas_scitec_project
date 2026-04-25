document.addEventListener("DOMContentLoaded", () => {
    const videoOverlay = document.querySelector(".video-overlay");
    const video = document.getElementById("heroVideo");
    const hero = document.querySelector(".hero");
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const fadeDistance = window.innerHeight * 0.7;
    
        // A videó megáll hogyha már nem látszik, hogyha inaktív vagy az oldalon, és elindul újra ha újra látszik. (így ezáltal opitimizáltabb az oldal és nem akadozik jobban telefonokon.)
        if (videoOverlay && video && hero) {
            const progress = Math.min(scrollY / fadeDistance, 1);
            const maxTranslate = hero.clientHeight * 0.6;
            const translateY = Math.min(scrollY * 0.6, maxTranslate);
            videoOverlay.style.opacity = progress;
            video.style.transform = `translateY(${translateY}px)`;
            if (scrollY >= hero.clientHeight) {
                video.pause();
            } else {
                video.play();
            }
        }
    }
    
    window.addEventListener("scroll", handleScroll);

    const nav = document.getElementById("nav");
    setTimeout(() => {
        nav.classList.add("navShow")
    }, 500);

    //a nav eltűnik ha lefelé görgetünk és megjelenik ha felfelé görgetünk
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            nav.classList.remove("navShow");
        } else if (currentScrollY < lastScrollY) {
            nav.classList.add("navShow");
        }

        lastScrollY = currentScrollY;
    });


    //Lenis scroll
    const lenis = new Lenis({
        duration: 1.3,
        easing: t => t * (2 - t),
        smooth: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let latestScrollTop = 0;
    let ticking = false;

    if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; 
    }
    window.scrollTo(0, 0);


    const dropElements = document.querySelectorAll(".dropScroll");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                entry.target.classList.add("dropShow");
            }
        });
    }, { threshold: 0.7 });

    dropElements.forEach(dropElement => observer.observe(dropElement));


    const lines = document.querySelectorAll(".lines");
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                setTimeout(() => {
                    entry.target.classList.add("lineShow");
                }, 300);
            }
        });
    }, { threshold: 0.7 });

    lines.forEach(line => observer2.observe(line));

    // Az offcanvas bezáródik hogyha rányomunk bármilyen linkre
    const offcanvasElements = document.querySelectorAll(".offcanvas");
    offcanvasElements.forEach(offcanvasElement => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        const offcanvasLinks = offcanvasElement.querySelectorAll(".offcanvas-body a");
        
        offcanvasLinks.forEach(link => {
            link.addEventListener("click", () => {
                offcanvasInstance.hide();
            });
        });
    });

});