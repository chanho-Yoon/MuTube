import '../scss/styles.scss'

//검색 클릭 이벤트 처리
const search__click = document.getElementById('search__click')

function searchClick(event) {
  const headerWrapper = document.getElementById('header__wrapper')
  const headerIcon = document.getElementById('header__icon')
  const headerMenu = document.getElementById('header__menu')
  const headerSearch = document.getElementById('header__search')
  headerWrapper.classList.remove('header__wrapper')
  headerWrapper.classList.add('header__wrapper-search')

  headerIcon.classList.remove('header__column')
  headerIcon.classList.add('header__column-noshow')

  headerMenu.classList.remove('header__column')
  headerMenu.classList.add('header__column-noshow')

  headerSearch.classList.remove('header__column-noshow')
}

search__click.addEventListener('click', searchClick)
//-----------------------------------------------------------------------------
//윈도우 창 화면 변화 감지 , 그에 따른 css 처리
function loadWindowWidth() {
  const headerHidden = document.getElementById('header__search')
  const header_ul_list = document.getElementById('ul-list')
  let width = innerWidth

  if (width < 758) {
    headerHidden.classList.add('header__column-noshow')
    header_ul_list.classList.remove('ul-list')
  }
  if (width > 758) {
    headerHidden.classList.remove('header__column-noshow')
    header_ul_list.classList.add('ul-list')
  }
}

document.getElementsByTagName('BODY')[0].onresize = function() {
  loadWindowWidth()
}

addEventListener('onresize', loadWindowWidth)
//-----------------------------------------------------------------------------
// 초기 브라우저 화면 크기 구해서 css class 처리
function init() {
  const firstWidth = window.innerWidth
  const headerHidden = document.getElementById('header__search')
  const header_ul_list = document.getElementById('ul-list')
  console.log(`첫 익스플로러 창 크기 ${firstWidth}`)
  if (firstWidth < 758) {
    headerHidden.classList.add('header__column-noshow')
    header_ul_list.classList.remove('ul-list')
  }
  if (firstWidth > 758) {
    headerHidden.classList.remove('header__column-noshow')
    header_ul_list.classList.add('ul-list')
  }
}
init()
//-----------------------------------------------------------------------------
