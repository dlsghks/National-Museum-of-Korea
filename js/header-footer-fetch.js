// header 불러오기
fetch("index-header.html")
  .then(res => res.text())
  .then(data => {
    document.querySelector("#header").innerHTML = data;

    // 헤더가 들어온 후 헤더 JS 실행
    initHeader();
  })

// footer
fetch("index-footer.html")
  .then(res => res.text())
  .then(data => {
    document.querySelector("#footer").innerHTML = data;

    // 푸터가 들어온 후 푸터 JS 실행
    initFooter();
  })