import '../scss/styles.scss'

const facebookButton = document.getElementById('social-login__facebook')

function readyServices() {
  alert('서비스 준비 중 입니다. 깃허브 or 구글 인증을 사용해주세요.')
}

facebookButton.addEventListener('click', readyServices)
