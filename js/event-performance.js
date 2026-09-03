
const breadcrumbCurrent = document.querySelector(".breadcrumb-current");

document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       기본 요소
    ================================================== */

    const tabs = document.querySelectorAll(".pagetab a");

    const eventWrap = document.querySelector(".event-content-wrap");
    const performWrap = document.querySelector(".perform-content-wrap");

    const tabSlider = document.querySelector(".pagetab > ul");

    const mobileFilterBtn =
        document.querySelector(".mobile-filter-btn");

    const filterCloseBtns =
        document.querySelectorAll(".filter-close");


    /* ==================================================
       필터 아코디언
    ================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-category");

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

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (icon) {
                    icon.src =
                        "./images-sub/icon/filter-plus.svg";
                }

            }


            /* ------------------------------------------
               닫혀 있는 카테고리 → 열기
            ------------------------------------------ */

            else {

                /* 다른 카테고리 전부 닫기 */

                filterButtons.forEach(function (otherButton) {

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


                /* 현재 카테고리 열기 */

                list.style.display = "block";

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                if (icon) {
                    icon.src =
                        "./images-sub/icon/filter-minus.svg";
                }

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


                        tag.innerHTML = `${label}<span aria-hidden="true">
                        <img src="./images-sub/icon/filter-delete.svg" alt=""></span>`;


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

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });

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

        /* 체크박스 초기화 */

        document
            .querySelectorAll(
                '.filter input[type="checkbox"]'
            )
            .forEach(function (checkbox) {

                checkbox.checked = false;

            });


        /* 아코디언 초기화 */

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


        /* 태그 초기화 */

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


        /* 필터 아코디언 초기화 */

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

                /*
                    현재 활성화된 영역 찾기
                */

                const activeWrap =
                    document.querySelector(
                        ".event-content-wrap.tab-active"
                    ) ||
                    document.querySelector(
                        ".perform-content-wrap.tab-active"
                    );


                if (!activeWrap) return;


                /*
                    현재 활성화된 필터 확인
                */

                const activeFilter =
                    activeWrap.querySelector(".filter");


                if (!activeFilter) return;


                /*
                    필터 열기
                */

                document.body.classList.add(
                    "mobile-filter-active"
                );


                /*
                    버튼 숨기기
                */

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
       모바일 필터 닫기 버튼
    ================================================== */

    filterCloseBtns.forEach(function (closeBtn) {

        closeBtn.addEventListener(
            "click",
            function () {

                closeMobileFilter();

            }
        );

    });


    /* ==================================================
       행사 / 공연 탭
    ================================================== */

    tabs.forEach(function (tab, index) {

        tab.addEventListener(
            "click",
            function (e) {

                e.preventDefault();


                /* -------------------------
                   탭 글자
                ------------------------- */

                tabs.forEach(function (t) {

                    t.classList.remove(
                        "tab-active"
                    );

                });

                tab.classList.add(
                    "tab-active"
                );


                /* -------------------------
                   모바일 필터 닫기
                ------------------------- */

                closeMobileFilter();


                /* -------------------------
                   필터 초기화
                ------------------------- */

                resetAllFilters();


                /* -------------------------
                   행사
                ------------------------- */

                if (index === 0) {

                    if (tabSlider) {

                        tabSlider.classList.remove(
                            "perform-active"
                        );

                    }


                    eventWrap.classList.add(
                        "tab-active"
                    );

                    performWrap.classList.remove(
                        "tab-active"
                    );


                    if (breadcrumbCurrent) {

                        breadcrumbCurrent.textContent =
                            "행사";

                    }

                }


                /* -------------------------
                   공연
                ------------------------- */

                else {

                    if (tabSlider) {

                        tabSlider.classList.add(
                            "perform-active"
                        );

                    }


                    eventWrap.classList.remove(
                        "tab-active"
                    );

                    performWrap.classList.add(
                        "tab-active"
                    );


                    if (breadcrumbCurrent) {

                        breadcrumbCurrent.textContent =
                            "공연";

                    }

                }

            }
        );

    });

});

