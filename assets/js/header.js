import '../scss/styles.scss'

//검색 클릭 이벤트 처리
const search__click = document.getElementById('search__click')

function searchClick(event) {
  alert('search 클릭했네요?')
  console.log(event)
}

search__click.addEventListener('click', searchClick)
//-----------------------------------------------------------------------------
//윈도우 창 화면 변화 감지 , 그에 따른 css 처리
function loadWindowWidth() {
  const headerHidden = document.getElementById('header__search')
  const header_ul_list = document.getElementById('ul-list')
  let width = innerWidth

  if (width < 1024) {
    headerHidden.classList.add('header__column-noshow')
    header_ul_list.classList.remove('ul-list')
  }
  if (width > 1024) {
    headerHidden.classList.remove('header__column-noshow')
    header_ul_list.classList.add('ul-list')
  }
}

document.getElementsByTagName('BODY')[0].onresize = function() {
  loadWindowWidth()
}

addEventListener('onresize', loadWindowWidth)
//-----------------------------------------------------------------------------
