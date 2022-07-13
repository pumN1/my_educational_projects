window.addEventListener('DOMContentLoaded',function(){const swiper=new Swiper('.swiper-container',{loop:!0,pagination:{el:'.swiper-pagination',clickable:!0,},navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev',},});$(function(){$("#accordion").accordion({collapsible:!0,active:!1});var icons={header:"ui-icon-circle-arrow-e",activeHeader:"ui-icon-circle-arrow-s"};$("#accordion").accordion({icons:icons})});document.querySelector('.burger').addEventListener('click',function(){document.querySelector('.burger-menu').classList.toggle('is-active')})
document.querySelector('.burger-x').addEventListener('click',function(){document.querySelector('.burger-menu').classList.remove('is-active')})
document.querySelector('.nav-search').addEventListener('click',function(){document.querySelector('.search-menu').classList.toggle('active')})
document.querySelector('.search-close').addEventListener('click',function(){document.querySelector('.search-menu').classList.remove('active')})
document.querySelectorAll('.worked-steps__btn').forEach(function(tabsBtn){tabsBtn.addEventListener('click',function(event){let path=event.currentTarget.dataset.path
document.querySelectorAll('.worked__list').forEach(function(tabContent){tabContent.classList.remove('worked__list-active')})
document.querySelector(`[data-target="${path}"]`).classList.add('worked__list-active')
document.querySelectorAll('.worked-steps__btn').forEach(function(tabContent){tabContent.classList.remove('steps__btn-active')})
document.querySelector(`[data-path="${path}"]`).classList.add('steps__btn-active')})})})
