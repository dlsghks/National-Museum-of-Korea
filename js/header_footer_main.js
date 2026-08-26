const header = document.querySelector('.header');
const headerGnb = document.querySelector('.header-gnb');
const logoImg = document.querySelector('.header-logo img');
const mobileBtn = document.querySelector('.button-m-menu');
const linkBtn = document.querySelector('.link-btn');
const footerLinks = document.querySelectorAll('.footer-link');
const gnbMainLists = document.querySelectorAll('.gnb-main-list');
// 1280px 이상일 때만 true를 반환하는 미디어 쿼리 설정
const pcMedia = window.matchMedia('(min-width: 1280px)');
let isGnbHovered = false;

function updateLogo() {
  const isScrolled = window.scrollY > 50;
  const isHovered = header.classList.contains('is_hover');
  const isMobileMenuOpen = mobileBtn.classList.contains('on');

  // 모바일 메뉴가 열려있으면 최우선으로 흰색 로고 적용
  if (isMobileMenuOpen) {
    logoImg.src = './images/header/logo_w.svg';
    return;
  }

 // 스크롤이 내려갔거나 OR 마우스가 올라간 상태면 검은 로고, 아니면 흰 로고
  if (isScrolled || (pcMedia.matches && isHovered)) {
    logoImg.src = './images/header/logo_bk.svg';
  } else {
    logoImg.src = './images/header/logo_w.svg';
  }
}

// 2. GNB 호버 이벤트 (on 대신 is_hover 사용)
headerGnb.addEventListener('mouseenter', () => {
  if (pcMedia.matches) {
    header.classList.add('is_hover'); // 호버 전용 클래스
    header.classList.add('is_open'); // 호버 전용 클래스
    updateLogo();
  }
});

headerGnb.addEventListener('mouseleave', () => {
  if (pcMedia.matches) {
    setTimeout(() => {
      header.classList.remove('is_hover');
      updateLogo();
    }, 300); // 0.3초
    header.classList.remove('is_open');
  }
});

// 3. 스크롤 이벤트 (is_scroll 전용)
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('is_scroll'); // 스크롤 전용 클래스
  } else {
    header.classList.remove('is_scroll');
  }
  updateLogo();
});

// 모바일 메뉴
mobileBtn.addEventListener('click', () =>{
  headerGnb.classList.toggle('on');
  mobileBtn.classList.toggle('on');

  if (mobileBtn.classList.contains('on')) {
    setTimeout(() => {
      updateLogo();
    }, 300); // 0.3초
  } else {
    // 닫힐 때는 즉시 변경
    updateLogo();
  }
})
// 
gnbMainLists.forEach((item) => {
  const mainListBtn = item.querySelector('.gnb-main-list > a');

  mainListBtn.addEventListener('click', (e) => {
    // 1. 기본 링크 이동 동작 방지 (a 태그일 경우)
    e.preventDefault();

    // 2. 현재 클릭한 요소가 이미 열려있는지 확인
    const isOpen = item.classList.contains('on');

    // 3. 모든 .footer-link에서 'on' 클래스를 제거 (다른 열린 메뉴 닫기)
    gnbMainLists.forEach((otherItem) => {
      otherItem.classList.remove('on');
    });

    // 4. 원래 닫혀있던 상태였다면 클릭한 대상만 'on' 추가 (이미 열려있었다면 닫힌 상태 유지)
    if (!isOpen) {
      item.classList.add('on');
    }
  });

});

// footer 사이트링크
footerLinks.forEach((item) => {
  const linkBtn = item.querySelector('.link-btn');

  linkBtn.addEventListener('click', (e) => {
    // 1. 기본 링크 이동 동작 방지 (a 태그일 경우)
    e.preventDefault();

    // 2. 현재 클릭한 요소가 이미 열려있는지 확인
    const isOpen = item.classList.contains('on');

    // 3. 모든 .footer-link에서 'on' 클래스를 제거 (다른 열린 메뉴 닫기)
    footerLinks.forEach((otherItem) => {
      otherItem.classList.remove('on');
    });

    // 4. 원래 닫혀있던 상태였다면 클릭한 대상만 'on' 추가 (이미 열려있었다면 닫힌 상태 유지)
    if (!isOpen) {
      item.classList.add('on');
    }
  });

});