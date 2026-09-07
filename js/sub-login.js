window.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    const TextTime = gsap.timeline();

    TextTime.from(".banner-title .tit", {
        y: 100,
        opacity: 0,
        duration: 0.5,
    });

    TextTime.from(".banner-title .txt", {
        y: 80,
        opacity: 0,
        duration: 0.5,
    });

});

window.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".login-tab");
    const panels = document.querySelectorAll(".login-panel");

    tabs.forEach((tab, index) => {

        tab.addEventListener("click", () => {

            tabs.forEach((tab) => {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
            });

            panels.forEach((panel) => {
                panel.classList.remove("active");
            });

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            panels[index].classList.add("active");
        });

    });

});