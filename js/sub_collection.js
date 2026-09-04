window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 베너
  const TextTime = gsap.timeline();
  TextTime.from(".banner-title .tit", {
    y: 100,
    opacity: 0,
    duration: .5,
  })
  TextTime.from(".banner-title .txt", {
    y: 80,
    opacity: 0,
    duration: .5,
  })

  const tabContents = gsap.utils.toArray(".tab-content");
  const timelineMap = new Map();
  const triggerMap = new Map();

  function setupTab(tab) {
    const mapWrap = tab.querySelector(".map"); 
    const mapImg = tab.querySelector(".map-img-cover");
    const galleryList = tab.querySelectorAll(".gallery-list");
    const gallery = tab.querySelector(".gallery");

    // 이미 생성된 타임라인이 있다면 재사용
    if (timelineMap.has(tab)) return timelineMap.get(tab);

    const tl = gsap.timeline({ paused: true });

    if (mapImg) {
      tl.fromTo(mapImg,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 }
      );
    }
    if (galleryList.length > 0) {
      tl.fromTo(galleryList,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
        mapImg ? "-=0.15" : 0
      );
    }

    timelineMap.set(tab, tl);

    // 스크롤 진입 시 재생 (모든 탭 동일하게)
    const st = ScrollTrigger.create({
      trigger: mapWrap  || mapImg || tab,
      start: "top 60%",
      once: true,
      onEnter: () => tl.play(),
    });
    triggerMap.set(tab, st);

    return tl;
  }

  // 모든 이미지 로드를 기다린 후 트리거 생성/재계산
  const allImgs = document.querySelectorAll(".map-img img");
  let loadedCount = 0;

  function afterImagesReady() {
    tabContents.forEach(setupTab);
    ScrollTrigger.refresh(); // 정확한 위치로 재계산
  }

  if (allImgs.length === 0) {
    afterImagesReady();
  } else {
    allImgs.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === allImgs.length) afterImagesReady();
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === allImgs.length) afterImagesReady();
        }, { once: true });
      }
    });
  }

  // 혹시 폰트 등으로 레이아웃이 더 늦게 바뀌는 경우 대비
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // 탭 버튼 클릭
  const tabListBtn = document.querySelectorAll(".inner-tab .tab-list-btn");
  const tabContent = document.querySelectorAll(".tab-wrap .tab-content");

  tabListBtn.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      tabListBtn.forEach((even) => {
        even.classList.remove("on");
        even.setAttribute("aria-selected", "false");
        even.setAttribute("tabindex", "-1");
      });
      tabContent.forEach((panel) => {
        panel.classList.remove("on");
        panel.setAttribute("aria-hidden", "false");
      });

      btn.classList.add("on");
      btn.setAttribute("aria-selected", "true");
      btn.setAttribute("tabindex", "0");

      const currentTab = tabContent[idx];
      if (currentTab) {
        currentTab.classList.add("on");
        currentTab.setAttribute("aria-hidden", "true");

        // 탭이 처음 열리는 거면 setupTab 보장 (혹시 이미지 로드 전에 클릭했을 경우 대비)
        const tl = setupTab(currentTab);
        tl.restart(); // 탭 클릭 시엔 항상 처음부터 재생 (map -> gallery 순서)
      }
    });
  });

  // 이미지번호 모션
  const dataNums = document.querySelectorAll(".map-txt > li");

  dataNums.forEach((item)=> {
    const itemDataNum = item.dataset.num;
    const numTargets = document.querySelectorAll(`.map-img-cover .map-txt-num[data-num-target="${itemDataNum}"]`);

    item.addEventListener("mouseenter", ()=> {
      numTargets.forEach(target => target.classList.add("on"));
    })

    item.addEventListener("mouseleave", () => {
      numTargets.forEach((target) => target.classList.remove("on"));
    });
  })
});