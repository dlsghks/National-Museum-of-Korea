const header = document.querySelector('.header');
const headerGnb = document.querySelector('.header-gnb');
const logoImg = document.querySelector('.header-logo img');
const mobileBtn = document.querySelector('.button-m-menu');
const linkBtn = document.querySelector('.link-btn');
const footerLinks = document.querySelectorAll('.footer-link')
// 1280px 이상일 때만 true를 반환하는 미디어 쿼리 설정
const pcMedia = window.matchMedia('(min-width: 1280px)');

// 로고이미지 변경
headerGnb.addEventListener('mouseenter', () =>{
  if (pcMedia.matches) {
    logoImg.src = './images/header/logo_bk.svg';
    header.classList.add('on');
  }
})

headerGnb.addEventListener('mouseleave', () =>{
  if (pcMedia.matches) {
    logoImg.src = './images/header/logo_w.svg';
    header.classList.remove('on');
  }
})

// 모바일 메뉴
mobileBtn.addEventListener('click', () =>{
  headerGnb.classList.toggle('on');
  mobileBtn.classList.toggle('on');
})

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