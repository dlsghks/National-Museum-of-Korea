const breadcrumbCurrent = document.querySelector(".breadcrumb-current");

document.addEventListener("DOMContentLoaded", function () {

    gsap.registerPlugin(ScrollTrigger);

    /* ==================================================
       배너 애니메이션
    ================================================== */

    const bannerText = gsap.timeline();

    bannerText.from(".sub-banner-title h2", {
        y: 100,
        opacity: 0,
        duration: 0.5,
    });

    bannerText.from(".sub-banner-title p", {
        y: 80,
        opacity: 0,
        duration: 0.5,
    });

    /* ==================================================
       기본 요소
    ================================================== */

    const tabs = document.querySelectorAll(".pagetab a");

    const eventWrap = document.querySelector(".event-content-wrap");
    const performWrap = document.querySelector(".perform-content-wrap");

    const tabSlider = document.querySelector(".pagetab > ul");

    const mobileFilterBtn =
        document.querySelector(".mobile-filter-btn");


    /* ==================================================
       필터 아코디언
    ================================================== */

    const filterButtons = document.querySelectorAll(".filter-category");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const list = button.nextElementSibling;
            const icon = button.querySelector("img");

            if (!list) return;


            /* ------------------------------------------
               이미 열려 있는 카테고리 → 닫기
            ------------------------------------------ */

            if (list.style.display === "block") {

                list.style.display = "none";

                button.setAttribute("aria-expanded", "false");

                if (icon) {
                    icon.src = "./images-sub/icon/filter-plus.svg";
                }

                return;
            }


            /* ------------------------------------------
               같은 레벨의 카테고리만 닫기
            ------------------------------------------ */

            // 최상위 필터
            if (button.parentElement.classList.contains("filter")) {

                const topLevelButtons =
                    button.parentElement.querySelectorAll(
                        ":scope > .filter-category"
                    );

                topLevelButtons.forEach(function (otherButton) {

                    if (otherButton === button) return;

                    const otherList =
                        otherButton.nextElementSibling;

                    const otherIcon =
                        otherButton.querySelector("img");

                    if (otherList) {
                        otherList.style.display = "none";
                    }

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    if (otherIcon) {
                        otherIcon.src =
                            "./images-sub/icon/filter-plus.svg";
                    }

                });

            }

            // 하위 필터
            else {

                const parentList =
                    button.parentElement.parentElement;

                if (parentList) {

                    const childButtons =
                        parentList.querySelectorAll(
                            ":scope > li > .filter-category"
                        );

                    childButtons.forEach(function (otherButton) {

                        if (otherButton === button) return;

                        const otherList =
                            otherButton.nextElementSibling;

                        const otherIcon =
                            otherButton.querySelector("img");

                        if (otherList) {
                            otherList.style.display = "none";
                        }

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        if (otherIcon) {
                            otherIcon.src =
                                "./images-sub/icon/filter-plus.svg";
                        }

                    });

                }

            }


            /* ------------------------------------------
               현재 카테고리 열기
            ------------------------------------------ */

            list.style.display = "block";

            button.setAttribute(
                "aria-expanded",
                "true"
            );

            if (icon) {
                icon.src =
                    "./images-sub/icon/filter-minus.svg";
            }

        });

    });


    /* ==================================================
       선택된 필터 태그
    ================================================== */

    function initFilter(wrap) {

        if (!wrap) return;


        const filterTags =
            wrap.querySelector(".filter-tags");

        const checkboxes =
            wrap.querySelectorAll(
                '.filter input[type="checkbox"]'
            );

        const resetBtn =
            wrap.querySelector(".reset-btn");


        /* -------------------------
           체크박스와 라벨 사이
           빈 공간 클릭
        ------------------------- */

        const filterItems =
            wrap.querySelectorAll(
                ".filter-list li:has(> input[type='checkbox'])"
            );

        filterItems.forEach(function (item) {

            item.addEventListener("click", function (e) {

                /* 체크박스나 라벨을 직접 클릭한 경우 */
                if (
                    e.target.matches('input[type="checkbox"]') ||
                    e.target.closest("label")
                ) {
                    return;
                }

                const checkbox =
                    item.querySelector(
                        'input[type="checkbox"]'
                    );

                if (!checkbox) return;

                checkbox.checked = !checkbox.checked;

                checkbox.dispatchEvent(
                    new Event("change", {
                        bubbles: true
                    })
                );

            });

        });


        /* -------------------------
           체크박스
        ------------------------- */

        checkboxes.forEach(function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    if (!filterTags) return;


                    const label =
                        checkbox.nextElementSibling
                            .textContent
                            .trim();


                    /* -------------------------
                       체크됨
                    ------------------------- */

                    if (checkbox.checked) {

                        const existingTag =
                            filterTags.querySelector(
                                `.filter-tag[data-value="${checkbox.value}"]`
                            );

                        if (existingTag) return;


                        const tag =
                            document.createElement("button");

                        tag.type = "button";

                        tag.classList.add(
                            "filter-tag"
                        );

                        tag.dataset.value =
                            checkbox.value;


                        tag.innerHTML = `${label}<span aria-hidden="true"><img src="./images-sub/icon/filter-delete.svg" alt=""></span>`;


                        /* -------------------------
                           태그 삭제
                        ------------------------- */

                        tag.addEventListener(
                            "click",
                            function () {

                                checkbox.checked = false;

                                tag.remove();

                            }
                        );


                        filterTags.appendChild(tag);


                        /* -------------------------
                           모바일 / 태블릿에서
                           선택하면 페이지 맨 위로
                        ------------------------- */

                        if (window.innerWidth <= 900) {

                            const selectedFilter =
                                wrap.querySelector(
                                    ".selected-filter"
                                );

                            if (selectedFilter) {

                                const selectedFilterTop =
                                    selectedFilter.getBoundingClientRect().top +
                                    window.scrollY -
                                    75;

                                window.scrollTo({
                                    top: selectedFilterTop,
                                    behavior: "smooth"
                                });

                            }

                        } else {

                            const pagetab =
                                document.querySelector(".pagetab");

                            if (pagetab) {

                                const pagetabTop =
                                    pagetab.getBoundingClientRect().top +
                                    window.scrollY -
                                    100;

                                window.scrollTo({
                                    top: pagetabTop,
                                    behavior: "smooth"
                                });

                            }

                        }

                    }


                    /* -------------------------
                       체크 해제
                    ------------------------- */

                    else {

                        const tag =
                            filterTags.querySelector(
                                `.filter-tag[data-value="${checkbox.value}"]`
                            );

                        if (tag) {
                            tag.remove();
                        }

                    }

                }
            );

        });


        /* -------------------------
           초기화
        ------------------------- */

        if (resetBtn) {

            resetBtn.addEventListener(
                "click",
                function () {

                    checkboxes.forEach(
                        function (checkbox) {

                            checkbox.checked = false;

                        }
                    );

                    if (filterTags) {
                        filterTags.innerHTML = "";
                    }

                }
            );

        }

    }


    /* 행사 / 공연 연결 */

    initFilter(eventWrap);
    initFilter(performWrap);


    /* ==================================================
       필터 전체 초기화
    ================================================== */

    function resetAllFilters() {

        document
            .querySelectorAll(
                '.filter input[type="checkbox"]'
            )
            .forEach(function (checkbox) {

                checkbox.checked = false;

            });

        document
            .querySelectorAll(".filter-category")
            .forEach(function (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const list =
                    button.nextElementSibling;

                const icon =
                    button.querySelector("img");

                if (list) {
                    list.style.display = "none";
                }

                if (icon) {
                    icon.src =
                        "./images-sub/icon/filter-plus.svg";
                }

            });

        document
            .querySelectorAll(".filter-tags")
            .forEach(function (tags) {

                tags.innerHTML = "";

            });

    }


    /* ==================================================
       모바일 필터 닫기
    ================================================== */

    function closeMobileFilter() {

        document.body.classList.remove(
            "mobile-filter-active"
        );

        if (mobileFilterBtn) {

            mobileFilterBtn.classList.remove(
                "filter-btn-hidden"
            );

            mobileFilterBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        document
            .querySelectorAll(".filter-category")
            .forEach(function (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const list =
                    button.nextElementSibling;

                if (list) {
                    list.style.display = "none";
                }

                const icon =
                    button.querySelector("img");

                if (icon) {
                    icon.src =
                        "./images-sub/icon/filter-plus.svg";
                }

            });

    }


    /* ==================================================
       필터 오버레이 클릭
    ================================================== */

    const filterOverlays =
        document.querySelectorAll(".filter-overlay");

    filterOverlays.forEach(function (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeMobileFilter();

            }
        );

    });


    /* ==================================================
       모바일 필터 열기
    ================================================== */

    if (mobileFilterBtn) {

        mobileFilterBtn.addEventListener(
            "click",
            function () {

                const activeWrap =
                    document.querySelector(
                        ".event-content-wrap.tab-active"
                    ) ||
                    document.querySelector(
                        ".perform-content-wrap.tab-active"
                    );

                if (!activeWrap) return;

                const activeFilter =
                    activeWrap.querySelector(".filter");

                if (!activeFilter) return;

                document.body.classList.add(
                    "mobile-filter-active"
                );

                mobileFilterBtn.classList.add(
                    "filter-btn-hidden"
                );

                mobileFilterBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }
        );

    }


    /* ==================================================
       행사 / 공연 탭
    ================================================== */

        /* ==================================================
       행사 / 공연 탭
    ================================================== */

    tabs.forEach(function (tab, index) {

        tab.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                /* 이미 선택된 탭이면 실행하지 않음 */
                if (tab.classList.contains("tab-active")) {
                    return;
                }


                /* ------------------------------------------
                   탭 상태 변경
                ------------------------------------------ */

                tabs.forEach(function (t) {

                    t.classList.remove(
                        "tab-active"
                    );

                });

                tab.classList.add(
                    "tab-active"
                );


                closeMobileFilter();

                resetAllFilters();


                /* ------------------------------------------
                   현재 / 다음 콘텐츠
                ------------------------------------------ */

                const previousWrap =
                    index === 0
                        ? performWrap
                        : eventWrap;

                const nextWrap =
                    index === 0
                        ? eventWrap
                        : performWrap;


                /* ------------------------------------------
                   기존 콘텐츠 숨기기
                ------------------------------------------ */

                if (previousWrap) {

                    gsap.killTweensOf(previousWrap);

                    gsap.to(previousWrap, {

                        opacity: 0,

                        duration: 0.15,

                        ease: "power1.out",

                        onComplete: function () {

                            previousWrap.classList.remove(
                                "tab-active"
                            );

                            previousWrap.style.opacity = "";

                        }

                    });

                }


                /* ------------------------------------------
                   새 콘텐츠 표시
                ------------------------------------------ */

                if (nextWrap) {

                    /* display: block */

                    nextWrap.classList.add(
                        "tab-active"
                    );

                    /* 처음에는 투명 */

                    gsap.killTweensOf(nextWrap);

                    gsap.set(nextWrap, {
                        opacity: 0
                    });


                    /* 스르륵 나타나기 */

                    gsap.to(nextWrap, {

                        opacity: 1,

                        duration: 0.2,

                        ease: "power1.out"

                    });

                }


                /* ------------------------------------------
                   행사 / 공연에 따른 설정
                ------------------------------------------ */

                if (index === 0) {

                    if (tabSlider) {

                        tabSlider.classList.remove(
                            "perform-active"
                        );

                    }

                    if (breadcrumbCurrent) {

                        breadcrumbCurrent.textContent =
                            "행사";

                    }

                }

                else {

                    if (tabSlider) {

                        tabSlider.classList.add(
                            "perform-active"
                        );

                    }

                    if (breadcrumbCurrent) {

                        breadcrumbCurrent.textContent =
                            "공연";

                    }

                }

            }
        );

    });

});