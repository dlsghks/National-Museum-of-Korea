document.addEventListener("DOMContentLoaded", function () {
    // ================= 필터 아코디언 및 태그 연동 =================
    const filterButtons = document.querySelectorAll(".filter-button");
    const optionButtons = document.querySelectorAll(".filter-list button");
    const filterListWrap = document.querySelector(".filter-list-wrap");
    const clearBtn = document.querySelector(".clear-btn");

    // filter-tags 컨테이너 생성 (clear-btn의 형제 요소로 삽입)
    let filterTags = document.querySelector(".filter-tags");
    if (!filterTags) {
        filterTags = document.createElement("div");
        filterTags.classList.add("filter-tags");
        clearBtn.insertAdjacentElement("afterend", filterTags);
    }

    // 아코디언 열기/닫기
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filterList = button.nextElementSibling;
            filterList.classList.toggle("active");
            button.classList.toggle("active");
        });
    });

    // 필터 옵션 버튼 클릭 시
    optionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.classList.toggle("active");
            const value = button.textContent.trim();

            if (button.classList.contains("active")) {
                addTag(value);
            } else {
                removeTag(value);
            }
        });
    });

    // 태그 추가 함수
    function addTag(value) {
        // 중복 방지
        if (filterTags.querySelector(`[data-value="${value}"]`)) return;

        const tagItem = document.createElement("div");
        tagItem.classList.add("tag-item");
        tagItem.setAttribute("data-value", value);

        const tagText = document.createElement("span");
        tagText.textContent = value;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.classList.add("tag-remove");
        removeBtn.innerHTML = "&times;";

        removeBtn.addEventListener("click", function () {
            removeTag(value);
            // 해당 listbutton 체크 해제
            optionButtons.forEach(function (btn) {
                if (btn.textContent.trim() === value) {
                    btn.classList.remove("active");
                }
            });
        });

        tagItem.appendChild(tagText);
        tagItem.appendChild(removeBtn);
        filterTags.appendChild(tagItem);
    }

    // 태그 삭제 함수
    function removeTag(value) {
        const targetTag = filterTags.querySelector(`[data-value="${value}"]`);
        if (targetTag) {
            targetTag.remove();
        }
    }

    // 초기화 버튼 클릭 시 전체 삭제
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            filterTags.innerHTML = "";
            optionButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
        });
    }

    // ================= 페이지네이션 스크립트 =================
    const totalPages = 20;
    let currentPage = 1;

    const pageList = document.querySelector(".page-list");
    const firstButton = document.querySelector(".page-first");
    const prevButton = document.querySelector(".page-prev");
    const nextButton = document.querySelector(".page-next");
    const lastButton = document.querySelector(".page-last");

    function renderPagination() {
        if (!pageList) return;
        pageList.innerHTML = "";

        let startPage, endPage;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }

        for (let page = startPage; page <= endPage; page++) {
            const li = document.createElement("li");

            if (page === currentPage) {
                const strong = document.createElement("strong");
                strong.textContent = page;
                strong.setAttribute("aria-current", "page");
                li.appendChild(strong);
            } else {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = page;
                button.addEventListener("click", () => {
                    goToPage(page);
                });
                li.appendChild(button);
            }

            pageList.appendChild(li);
        }

        if (firstButton) firstButton.disabled = currentPage === 1;
        if (prevButton) prevButton.disabled = currentPage === 1;
        if (nextButton) nextButton.disabled = currentPage === totalPages;
        if (lastButton) lastButton.disabled = currentPage === totalPages;
    }

    if (firstButton) {
        firstButton.addEventListener("click", () => goToPage(1));
    }
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            if (currentPage > 1) goToPage(currentPage - 1);
        });
    }
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) goToPage(currentPage + 1);
        });
    }
    if (lastButton) {
        lastButton.addEventListener("click", () => goToPage(totalPages));
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderPagination();
    }

    renderPagination();

    // ================= 필터 모바일 레이어 스크립트 =================
    const floatingBtn = document.querySelector(".floating-filter-btn");
    const filterWrap = document.querySelector(".filter-wrap");
    const filterOverlay = document.querySelector(".filter-overlay");
    const filterCloseBtn = document.querySelector(".filter-close-btn");

    function openFilter() {
        if (filterWrap) filterWrap.classList.add("active");
        if (filterOverlay) filterOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeFilter() {
        if (filterWrap) filterWrap.classList.remove("active");
        if (filterOverlay) filterOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (floatingBtn) floatingBtn.addEventListener("click", openFilter);
    if (filterOverlay) filterOverlay.addEventListener("click", closeFilter);
    if (filterCloseBtn) filterCloseBtn.addEventListener("click", closeFilter);
});