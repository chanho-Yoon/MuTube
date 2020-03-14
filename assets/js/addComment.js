import axios from 'axios'

const addCommentForm = document.getElementById('jsAddComment')
const commentList = document.getElementById('jsCommentList')
const commentCount = document.getElementById('jsCommentsCount')

function increaseCount() {
  commentCount.innerHTML = `${parseInt(commentCount.innerHTML) + 1} comment`
}

function addComment(comment, avatarUrl, userUrl, userName) {
  const li = document.createElement('li')
  const spanComment = document.createElement('span')
  const span = document.createElement('span')
  const a = document.createElement('a')
  const img = document.createElement('img')
  const i = document.createElement('i')
  img.setAttribute('class', 'u-avatar')
  img.setAttribute('src', avatarUrl)
  a.setAttribute('href', '/users/' + userUrl)
  a.innerHTML = userName
  spanComment.innerHTML = comment
  i.setAttribute('class', 'fas fa-ellipsis-v')

  const videoCommentsMain = document.createElement('div')
  const videoCommentsImg = document.createElement('div')
  const videoCommentsContent = document.createElement('div')
  const videoCommentsMenu = document.createElement('div')
  const videoCommentsMenuList = document.createElement('div')
  //videoDetail에서 댓글부분에 해당하는 div 클래스 생성 및 이름 추가
  videoCommentsMain.setAttribute('class', 'video__comments-main')
  videoCommentsImg.setAttribute('class', 'video__comments-img')
  videoCommentsContent.setAttribute('class', 'video__comments-content')
  videoCommentsMenu.setAttribute('class', 'video__comments-menu')
  videoCommentsMenuList.setAttribute('class', 'video__comments-menu-list')
  //main의 자식클래스 추가
  videoCommentsMain.appendChild(videoCommentsImg).appendChild(img) // 댓글 아바타 부분
  videoCommentsMain.appendChild(videoCommentsContent)
  videoCommentsMain.appendChild(videoCommentsMenu)
  videoCommentsMain.appendChild(videoCommentsMenuList)

  // 댓글 작성자 이름 부분
  videoCommentsContent.appendChild(span).appendChild(a)
  // 댓글 작성자의 내용 부분
  videoCommentsContent.appendChild(spanComment)
  // 메뉴 아이콘
  videoCommentsMenu.appendChild(i)
  // 메뉴 리스트
  li.appendChild(videoCommentsMain)
  commentList.prepend(li)

  // comment 수 증가
  increaseCount()
}

const handleSubmit = event => {
  // 새로고침 x
  event.preventDefault()
  const commentInput = addCommentForm.querySelector('input')
  const comment = commentInput.value
  // 실시간으로 댓글 달게하고 해당 URL로 바로 이동할 수 있게
  const avatarSrc = document.querySelector('.video__comments-avatar')
  const avatarUrl = avatarSrc.querySelector('img').src
  const getUser = document.getElementById('jsUserAvatar').name
  const UserNameUrl = getUser.split('/')

  sendComment(comment, avatarUrl, UserNameUrl[0], UserNameUrl[1])
  commentInput.value = ''
}

//apiRouter로 보냄
const sendComment = async (comment, avatarUrl, userUrl, userName) => {
  const id = window.location.href.split('/videos/')[1]
  const response = await axios({
    url: `/api/${id}/comment`,
    method: 'POST',
    data: {
      comment
    }
  })
  if (response.status === 200) {
    addComment(comment, avatarUrl, userUrl, userName)
  }
}

function commentSubmit() {
  addCommentForm.addEventListener('submit', handleSubmit)
}

if (addCommentForm) {
  setTimeout(commentSubmit(), 1000)
}
