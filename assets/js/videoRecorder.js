const recorderContainer = document.getElementById('jsRecordContainer')
const recordBtn = document.getElementById('jsRecordBtn')
const videoPreview = document.getElementById('jsVideoPreview')

const startRecording = async () => {
  try {
    //media 접근 기다림
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    })
    videoPreview.srcObject = stream
    videoPreview.muted = true
    videoPreview.play()
  } catch (error) {
    recordBtn.innerHTML = '녹화 불가능😂'
    recordBtn.removeEventListener('click', startRecording)
  }
}

function init() {
  recordBtn.addEventListener('click', startRecording)
}

if (recorderContainer) {
  init()
}
