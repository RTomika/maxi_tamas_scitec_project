document.addEventListener("DOMContentLoaded", () => {
    const videoOverlay = document.querySelector(".video-overlay");
    const video = document.getElementById("heroVideo");
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const fadeDistance = window.innerHeight * 0.7;
    
        const progress = Math.min(scrollY / fadeDistance, 1);
    
    
        videoOverlay.style.opacity = progress;
    
        video.style.transform = `translateY(${scrollY * 0.6}px)`;
    }
    
    window.addEventListener("scroll", handleScroll);

    const nav = document.getElementById("nav");
    setTimeout(() => {
        nav.classList.add("navShow")
    }, 500);

    //scroll nav disappearance thing
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

});