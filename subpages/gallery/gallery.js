document.addEventListener("DOMContentLoaded", () => {
    const pictureConts = document.querySelectorAll(".pictureCont");

    pictureConts.forEach(pictureCont => {
        const textCont = pictureCont.querySelector(".textCont");
        if (!textCont) return;

        pictureCont.addEventListener("mouseenter", () => {
            textCont.classList.add("showText");
        });

        pictureCont.addEventListener("mouseleave", () => {
            textCont.classList.remove("showText");
        });
    });
});

