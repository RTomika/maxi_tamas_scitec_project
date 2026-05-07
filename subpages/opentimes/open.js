document.addEventListener("DOMContentLoaded", () => {
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
})