import axios from 'axios'

const commentList = document.getElementById('jsCommentList')
const commentCount = document.getElementById('jsCommentsCount')

// 댓글 comment 수 감소
function decrease() {
  commentCount.innerHTML = `${parseInt(commentCount.innerHTML) - 1} comment`
}

// ajax로 선택한 댓글이 성공적으로 삭제됐을 시 element에서 지움
function removeCommentLi(li) {
  commentList.removeChild(li)
  decrease()
  alert('댓글 삭제 완료')
}

const deleteComment = async (li, delCommentId) => {
  const id = window.location.href.split('/videos/')[1]

  const response = await axios({
    url: `/api/${id}/delComment`,
    method: 'POST',
    data: {
      delCommentId
    }
  })
  if (response.status === 200) {
    removeCommentLi(li)
  }
}

const handleDeleteClick = event => {
  event.preventDefault()
  const li = event.target.closest('ul').closest('li')
  const delCommentId = event.target.name
  deleteComment(li, delCommentId)
}

function init() {
  var deleteList = document.getElementsByClassName('comment-delete')
  for (var i = 0; i < deleteList.length; i++) {
    deleteList[parseInt(i)].addEventListener('click', handleDeleteClick)
  }
}

if (commentList) {
  init()
}
