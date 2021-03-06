import getBlobDuration from 'get-blob-duration'

const videoContainer = document.getElementById('jsVideoPlayer')
const videoPlayer = document.querySelector('#jsVideoPlayer video')
const playBtn = document.getElementById('jsPlayButton')
const volumeRange = document.getElementById('jsVolumeRange')
const screenBtn = document.getElementById('jsScreenButton')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const videoId = document.getElementById('videoId')
const volumeIcon = document.getElementById('jsVolume')

// fetch를 사용하여 ajax
const registerView = () => {
  const id = window.location.href.split('/videos/')[1]
  fetch(`/api/${id}/view`, {
    method: 'POST'
  })
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play()
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'
  } else {
    videoPlayer.pause()
    playBtn.innerHTML = '<i class="fas fa-play"></i>'
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false
    //볼륨 mute해제시 이전 volume값을 가져옴
    if (videoPlayer.volume > 0.7) {
      volumeRange.value = videoPlayer.volume
      volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'
    } else if (videoPlayer.volume > 0.0) {
      volumeRange.value = videoPlayer.volume
      volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>'
    } else {
      volumeRange.value = videoPlayer.volume
      volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
  } else {
    volumeRange.value = 0
    videoPlayer.muted = true
    volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

function exitScreenClick() {
  screenBtn.innerHTML = '<i class="fas fa-expand"></i>'
  screenBtn.addEventListener('click', fullScreenClick)
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

function fullScreenClick() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen()
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen()
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen()
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen()
  }
  screenBtn.innerHTML = '<i class="fas fa-compress"></i>'
  screenBtn.removeEventListener('click', fullScreenClick)
  screenBtn.addEventListener('click', exitScreenClick)
}

function formatDate(seconds) {
  console.log('formatDate 도착한 duration : ' + seconds)
  const secondsNumber = parseInt(seconds, 10)
  let hours = Math.floor(secondsNumber / 3600)
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60)
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`
  }
  return `${hours}:${minutes}:${totalSeconds}`
}

//잘 작동할때가 있고 안될때가 있고 고민을 해봐야곘네,.,
//위의 문제는 npm package인 "get-blob-duration" 로 해결 / 안됨.. 흠
//아마 비동기식이 문제로 duration을 빨리 받아올 경우에만 시간표시
//해결! 비디오 플레이어 init실행시 바로 setTotalTime함수를 실행하여 받아옴
async function setTotalTime() {
  // // videoPlayer.src를 받아 그걸 서버에 요청해서 응답 받으면 response의 blob(파일) 반환
  // const blob = await fetch(videoPlayer.src).then(response => response.blob())
  // console.log('blob : ' + blob)
  // // 파일의 길이를 getBlobDuration에 받아서 저장
  // const duration = await getBlobDuration(blob)
  // console.log('blob : ' + duration)
  const duration = await getBlobDuration(videoPlayer.src)
  setInterval(getCurrentTime, 1000)
  console.log('await duration : ' + duration)
  totalTime.innerHTML = formatDate(duration)
}

//비디오 플레이 중 시간
function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime))
}

//비디오 종료시
function handleEnded() {
  registerView() // 조회수 카운터 +1
  videoPlayer.currentTime = 0
  playBtn.innerHTML = '<i class="fas fa-play"></i>'
}

function handleDrag(event) {
  const {
    target: { value }
  } = event
  videoPlayer.volume = value

  if (value > 0.7) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>'
  } else if (value > 0.0) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>'
  } else {
    volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>'
  }
}

function init() {
  videoPlayer.volume = 1
  playBtn.addEventListener('click', handlePlayClick)
  volumeIcon.addEventListener('click', handleVolumeClick)
  screenBtn.addEventListener('click', fullScreenClick)
  videoId.addEventListener('ended', handleEnded)
  volumeRange.addEventListener('input', handleDrag)
}

if (videoContainer) {
  init()
  setTotalTime()
}

// function key 는 받는게 없는데 어떻게 키보드에서 펑션키로 재생 눌렀을때의 값을 받지..
window.onkeydown = event => {
  if (event.keyCode == 119) {
    if (videoPlayer.paused) {
      videoPlayer.play()
      playBtn.innerHTML = '<i class="fas fa-pause"></i>'
    } else {
      videoPlayer.pause()
      playBtn.innerHTML = '<i class="fas fa-play"></i>'
    }
  }
}
