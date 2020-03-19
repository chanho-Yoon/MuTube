const recorderContainer = document.getElementById('jsRecordContainer')
const recordBtn = document.getElementById('jsRecordBtn')
const videoPreview = document.getElementById('jsVideoPreview')

let streamObject
let videoRecorder

// video 다운로드
const handleVideoData = event => {
  const { data: videoFile } = event
  const link = document.createElement('a')
  link.href = URL.createObjectURL(videoFile)
  link.download = 'recorded.webm'
  document.body.appendChild(link)
  link.click()
}
// 녹화 중지
const stopRecording = () => {
  videoRecorder.stop()
  recordBtn.removeEventListener('click', stopRecording)
  recordBtn.addEventListener('click', getVideo)
  recordBtn.innerHTML = '녹화'
}
// 녹화 시작
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject)
  videoRecorder.start()
  videoRecorder.addEventListener('dataavailable', handleVideoData)
  recordBtn.addEventListener('click', stopRecording)
}
// 카메라에서 비디오 가져오기
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    })
    videoPreview.srcObject = stream
    videoPreview.muted = true
    videoPreview.play()
    recordBtn.innerHTML = '녹화 중지'
    streamObject = stream
    startRecording()
  } catch (error) {
    recordBtn.innerHTML = '녹화 불가능'
  } finally {
    recordBtn.removeEventListener('click', getVideo)
  }
}

function init() {
  recordBtn.addEventListener('click', getVideo)
}

if (recorderContainer) {
  init()
}
