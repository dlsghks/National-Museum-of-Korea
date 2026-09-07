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