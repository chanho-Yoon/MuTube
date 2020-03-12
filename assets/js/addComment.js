import axios from 'axios'

const addCommentForm = document.getElementById('jsAddComment')

const handleSubmit = event => {
  // 새로고침 x
  event.preventDefault()
  const commentInput = addCommentForm.querySelector('input')
  const comment = commentInput.value
  sendComment(comment)
  commentInput.value = ''
}
//apiRouter로 보냄
const sendComment = async comment => {
  const id = window.location.href.split('/videos/')[1]
  const response = await axios({
    url: `/api/${id}/comment`,
    method: 'POST',
    data: {
      comment
    }
  })
  console.log(response)
}

function init() {
  addCommentForm.addEventListener('submit', handleSubmit)
}

if (addCommentForm) {
  init()
}
