console.log('page function js');

function setScreenSize(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
};
setScreenSize();
window.addEventListener('resize', setScreenSize);

getDirection();
document.addEventListener('DOMContentLoaded', getDirection);
function getDirection(){
	const floating = document.querySelectorAll('.floating_btn');
	if(floating.length>0) {
		let floatingH = document.querySelector('.floating_btn').clientHeight;
		document.querySelector('#footer').style.cssText = 'padding-bottom:'+floatingH+'px';
		document.querySelector('#fixedBtn').classList.add('hFloating');
		document.querySelector('#fixedBtn').style.cssText = 'bottom:'+(floatingH+14)+'px';
	}
}

//scroll
let lastScroll = document.documentElement.scrollTop || 0;
let isScrolling;
document.addEventListener('scroll', getScrollDirection, false);
function getScrollDirection() {
	let scrollTop = document.documentElement.scrollTop;
	let height = window.innerHeight;
	let scrollHeight = document.querySelector('body').scrollHeight;
	const body = document.querySelector('body');
	const toolbar = document.querySelectorAll('#toolbar');
	const floating = document.querySelectorAll('.floating_btn');

	if(toolbar.length>0){
		if (scrollTop >= lastScroll) {
			body.classList.add('sDown');
			//console.log('down')
		}
		else {
			body.classList.remove('sDown');
			body.classList.add('end');
			//console.log('up')
		}
		lastScroll = scrollTop;

		if(scrollTop == 0){
			body.classList.remove('end');
			body.classList.remove('sDown');
		}
		if(scrollTop + height >= scrollHeight){
			body.classList.add('end');
		}
	} else if(floating.length>0) {
		//console.log('플로팅바 yes');
		let floatingH = document.querySelector('.floating_btn').clientHeight;
		if(scrollTop > 0){
			body.classList.add('scroll');
			document.querySelector('#fixedBtn').style.cssText = 'bottom:'+(floatingH+16)+'px';
		} else {
			body.classList.remove('scroll');
			document.querySelector('#fixedBtn').style.cssText = 'bottom:'+(floatingH-44)+'px';
		}
	}

	window.clearTimeout( isScrolling );

	isScrolling = setTimeout(function() {
		//console.log( '스크롤 멈춤' );
	}, 66);
}

//floating button detail
function floatingMore(a){
	let wrap = a.closest('.floating_btn');
	let text = wrap.querySelector('.more');

	if(wrap.classList.contains('active')){
		wrap.classList.remove('active');
		text.innerText = '닫기';
	} else {
		wrap.classList.add('active');
		text.innerText = '닫기';
	}
}

//accordion 
function accordions(a){
	const wrap = a.closest('.accordions_wrap');
	wrap.childNodes[1].classList.toggle('on');
}

//modal
function isModal(){
	let body = document.querySelector('body');
	let modals = document.querySelectorAll('#modal.open');
	if(modals.length == 0){
		body.classList.remove('ismodal');
		body.removeEventListener('scroll touchmove mousewheel', null, false);
	} else {
		body.classList.add('ismodal');
		body.addEventListener('scroll touchmove mousewheel', function(e){e.preventDefault();}, false);
	}
}

function modalOpen(a){
	let target = document.querySelector('.'+a);
	target.closest('body').classList.add('ismodal');
	target.classList.add('open');
	target.closest('body').addEventListener('scroll touchmove mousewheel', function(e){e.preventDefault();}, false);
}

function modalClose(a){
	let target = document.querySelector('.'+a);
	target.classList.remove('open');
	isModal();
}

function modalUrlOpen(a, b){
	if(b == 'full'){
		$('#modalFullwrap').load(a, function(){
			$(this).find('#modal').addClass('open');
			$('body').addClass('ismodal');
		});	
	} else {
		$('#modalwrap').load(a, function(){
			$(this).find('#modal').addClass('open');
			$('body').addClass('ismodal');
		});	
	}
}

function modalUrlClose(){
	$('#modalwrap').empty();
	isModal();
}
function modalUrlCloseFull(){
	$('#modalFullwrap').empty();
	isModal();
}

document.addEventListener('DOMContentLoaded', function(){
	setTimeout(gnbPosition, 100);
});
//gnb active 위치
function gnbPosition(){
	const gnb = document.querySelectorAll('#gnb');
	
	if(gnb.length>0){
		const gnbWrap = document.querySelector('#gnb .wrap');
		const gnbMenu = gnbWrap.querySelector('ul');
		let gnbItem = gnbMenu.querySelectorAll('li');
		let gnbActive = gnbWrap.querySelector('.active');
		let sum = 0;
		
		gnbItem.forEach((item, index) => {
			sum += item.clientWidth;
		})
		gnbMenu.style.cssText = 'width:'+sum+'px';
		
		//console.log(gnbActive);
		if(gnbActive!==null){
			let screen = window.innerWidth;
			let activeWidth = gnbActive.clientWidth;
			let activeLeft = gnbActive.offsetLeft;
			
			if(sum-screen>= 0){
				gnbWrap.scrollLeft = activeLeft;
				//console.log(sum, screen, activeLeft)
			}
		}	
	}
}

//간편장부
function ledger(a){
	const body = document.querySelector('body');
	const li = a.closest('.ledger');
	const target = document.querySelector('.layer_ledger');
	const toolbar = document.querySelector('#toolbar');
	const menus = toolbar.querySelectorAll('li');
	let stay = Array.from(document.querySelectorAll('#toolbar li')).indexOf(document.querySelector('#toolbar .stay'));
	
	//console.log(stay)
	
	menus.forEach((menu) => {
		menu.classList.remove('active');
	})
	
	if(target.classList.contains('open')){
		close();
	} else {
		target.classList.add('open');
		li.classList.add('active');
		body.classList.add('ismodal');
		body.addEventListener('scroll touchmove mousewheel', function(e){e.preventDefault();}, false);
		//dimd close
		target.querySelector('.dimd').addEventListener('click', function(){
			close();
		})
	}
	
	function close(){
		target.classList.remove('open');
		li.classList.remove('active');
		if(stay !== -1){
			menus[stay].classList.add('active');
		}
		body.classList.remove('ismodal');
		body.removeEventListener('scroll touchmove mousewheel', null, false);
	}
}

//tooltip
function tooltip(a){
	const target = a.closest('.tooltip_wrap');
	const message = target.querySelector('.message_box');
	const arrow = document.createElement('span');
	arrow.className = 'arrow_down';
	
	if(target.classList.contains('active')){
		target.classList.remove('active');
		target.querySelector('.arrow_down').remove();
	} else {
		target.classList.add('active');
		target.append(arrow);
		setTimeout(function(){
			if(target.offsetLeft+(message.offsetWidth/2)<216){
				message.style.cssText = 'left:-'+(target.offsetLeft-8)+'px;margin:0;';
			}else if(target.offsetLeft+(message.offsetWidth/2)>window.outerWidth){
				message.style.cssText = 'left:auto;right:0;margin:0;';
			}else{

			}
			//console.log(target.offsetLeft+(message.offsetWidth/2),target.offsetLeft);
		},1);
	}
	
	const close = target.querySelector('.close').addEventListener('click', function(){
		target.classList.remove('active');
		arrow.remove();
	})
}

//카테고리
function cateH(){
	const wrap = document.querySelector('.category_menu');
	const cate = wrap.querySelector('.list');
	let menus = cate.querySelectorAll('li');
	let arrValue = new Array();
	let max = 0;
	
	for(let i=0;i<3;i++){
		let h = menus[i].clientHeight;
		arrValue.push(h);
	}
	max = Math.max.apply(null, arrValue);
	
	cate.style.cssText = 'height:'+max+'px';
}
function cateReady(){
	const wrap = document.querySelectorAll('.category_menu');
	if(wrap.length>0){
		const cate = document.querySelector('.category_menu').querySelector('.list');
		let total = cate.childElementCount;
		if(total<4){
			document.querySelector('.category_menu').classList.add('minimum');
		} else {
			document.querySelector('.category_menu').classList.remove('minimum');
			cateH();
		}
		window.addEventListener('resize', cateH);
	}
}
function controlCate(){
	const wrap = document.querySelector('.category_menu');
	const cate = wrap.querySelector('.list');
	const text = wrap.querySelector('.text');

	if(wrap.classList.contains('init')){
		wrap.classList.remove('init');
		text.innerText = '닫기';
		cate.style.cssText = 'height:auto';
	} else {
		wrap.classList.add('init');
		text.innerText = '열기';
		cateH();
	}
}

//2x2 상품 스와이프
function slideAct(){
	var view = 0; //보이는 슬라이드 개수
	var realInx = [] //현재 페이지
	var swiperArr = [] //슬라이드 배열
	
	//슬라이드 배열 생성
	$('.slider').each(function(index){
		realInx.push(0);
		swiperArr.push(undefined);
	})
	
	//디바이스 체크
	var winWChk = ''
	$(window).on('load resize', function (){
		var winW = window.innerWidth;
		if(winWChk != 'mo2' && winW <= 320){ //280대응
			slideList();
			winWChk = 'mo2';
		}
		if(winWChk != 'mo1' && winW >= 321){ //320이상
			slideList();
			winWChk = 'mo1';
		}
	}) 

	function slideList(){
		//리스트 초기화
		if ($('.slider .item').parent().hasClass('swiper-slide')){
			$('.slider .swiper-slide-duplicate').remove();
			$('.slider .item').unwrap('swiper-slide');
			$('.slider .progress-fill').remove();
		}
		
		//보이는 슬라이드 개수 설정
		$('.slider').each(function(index){
			if (window.innerWidth > 320){ //320이상
				view = 4;
			}else{ //280대응
				view = 2;
			}

			//리스트 그룹 생성 (swiper-slide element 추가)
			var num = 0;
			$(this).addClass('slider-' + index);
			$('.slider-' + index).find('.item').each(function(i) {
				$(this).addClass("item"+(Math.floor((i+view)/view)));
				num = Math.floor((i+view)/view)
			}).promise().done(function(){
				for (var i = 1; i < num+1; i++) {
					$('.slider-' + index).find('.item'+i+'').wrapAll('<div class="grid swiper-slide"></div>');
					$('.slider-' + index).find('.item'+i+'').removeClass('item'+i+'')
				}
			});
		}).promise().done(function(){
			sliderStart();
		});
	}
	
	function sliderStart(){
		$('.slider').each(function(index){
			var slideLen = $(this).find('.swiper-slide').length;
			if(slideLen>1){
				//슬라이드 초기화
				if(swiperArr[index] != undefined) {
					swiperArr[index].destroy();
					swiperArr[index] == undefined;
				}
				$(this).find('.inner').addClass('swiper-init');
				//슬라이드 실행
				swiperArr[index] = new Swiper('.slider-' + index + ' .inner', {
					slidesPerView: 1,
					initialSlide :Math.floor(realInx[index]/view),
					resistanceRatio : 0,
					loop:false,
					on: {
						slideChange: function () {
							realInx[index] = this.realIndex*view
							
							var length = this.slides.length;
							var active = this.realIndex + 1;
							
							$('.slider-' + index).find('.swiper-progress-bar .progress-fill').css('width', active * (100 / length) + '%');
						},
						init: function () {
							var length = this.slides.length;
							$('.slider-' + index).find('.swiper-progress-bar').append('<span class="progress-fill" style="width:' + 100 / length + '%"/>');
						},
					},
				});
				
				//슬라이드 배열 값 추가
				if(swiperArr[index] == undefined) {
					swiperArr[index] = swiper;
				}
			} else {
				$(this).find('.inner').removeClass('swiper-init');
			}
		});
	}
}
//배너 스와이프
function slideBannerSlide(a,b){
	var slide = $('.'+a).find('.swiper-container');
	var len = slide.find('.swiper-slide').length;
	if(len > 1){
		slide.append('<div class="swiper-pagination"></div>');
		var visualSwiper = new Swiper(slide, {
			slidesPerView: 1,
			loop: true,
			pagination: {
				el: slide.find('.swiper-pagination'),
				type: b,
			},
		});
	}
}

//탭구현
function tabInit(a){
	let tabWrap = document.querySelector(a);
	let tabs = tabWrap.querySelectorAll('.menu_tab li');
	let tabContents = tabWrap.querySelectorAll('.contents_tab .content');

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			const target = tabWrap.querySelector('#'+tab.dataset.tabTarget);
			tabContents.forEach((tabContent) => {
				tabContent.classList.remove('active');
			});
			tabs.forEach((tab) => {
				tab.classList.remove('active');
			});
			target.classList.add('active');
			tab.classList.add('active');
			//console.log(target.querySelectorAll('.slider-wrap').length);
			if(target.querySelectorAll('.slider-wrap').length>0){
				slideAct();
			}
		})
	})
}