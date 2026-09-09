// 비디오
const video = document.getElementById("video");
const videoPlayBtn = document.getElementById("video-play");
const videoPlayBtnImg = document.querySelector("#video-play img");
const videoProgress = document.getElementById("video-progress");
const videoProgressBar = document.getElementById("video-progress-bar");

// 비디오
// 1. 재생 / 일시정지 토글
function videoPlay() {
  if (video.paused) {
    video.play();
    videoPlayBtnImg.src = './images/Main_section/images/main_video_pause.svg'; // 일시정지 아이콘
  } else {
    video.pause();
    videoPlayBtnImg.src = './images/Main_section/images/main_video_play.svg'; // 재생 아이콘
  }
}

// 2. 영상 진행에 따른 진행바 업데이트
function videoPlayProgress() {
  // (현재시간 / 전체시간) * 100 = 진행 퍼센트
  const percent = (video.currentTime / video.duration) * 100;
  videoProgressBar.style.width = `${percent}%`;
}

// 3. 진행바 클릭 시 해당 위치로 이동하는 함수 추가
function setProgress(e) {
  // videoProgress 기준 클릭한 X 위치 / 전체 너비
  const clickX = e.offsetX;
  const width = videoProgress.clientWidth;

  // 클릭한 비율에 맞게 비디오 재생 시간 이동
  video.currentTime = (clickX / width) * video.duration;
}

// 이벤트 리스너 연결
videoPlayBtn.addEventListener('click', videoPlay);
video.addEventListener('timeupdate', videoPlayProgress); // 재생 시간 변경 이벤트
videoProgress.addEventListener('click', setProgress);