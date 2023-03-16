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
	const floating = document.querySelectorAll('#container .floating_btn');
	if(floating.length>0) {
		let floatingH = document.querySelector('#container .floating_btn').clientHeight;
		document.querySelector('#footer').style.cssText = 'padding-bottom:'+floatingH+'px';
		document.querySelector('#fixedBtn').classList.add('hFloating');
		document.querySelector('#fixedBtn').style.cssText = 'transform: translate3d(0,'+(-(floatingH+8))+'px,0)';
	}
}

document.addEventListener('scroll', getScrollDirection, false);
function getScrollDirection(){
	let scrollTop = document.documentElement.scrollTop;
	const body = document.querySelector('body');
	const toolbar = body.querySelector('#toolbar');
	const fixBtn = body.querySelector('#fixedBtn');
	const header = body.querySelector('#header');

	if(body.querySelectorAll('#header').length){
		//console.log(header.clientHeight)
		if(scrollTop > 48){
			header.classList.add('scroll');
		} else {
			header.classList.remove('scroll');
		}
	}

	if(body.querySelectorAll('#fixedBtn').length){
		if(scrollTop > 50){
			fixBtn.classList.add('scroll');
		} else {
			fixBtn.classList.remove('scroll');
		}
	}
	if(body.querySelectorAll('#toolbar').length){
		if(scrollTop >= 50){
			toolbar.classList.add('scroll');
		} else {
			toolbar.classList.remove('scroll');
		}
	}
}

function goTop(){
	window.scrollTo({top:0, behavior:"smooth"});
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

function floatingAct(){
	document.addEventListener('scroll', floatingScroll, false);
}

//아래 노출, 위 미노출
let beforePosition = document.documentElement.scrollTop
function floatingScroll(){
	const target = document.querySelector('body');
	let scheduledAnimationFrame = false;
	let afterPosition = document.documentElement.scrollTop;
	let idScrollEnd = window.innerHeight + window.scrollY > document.querySelector('#container').clientHeight + document.querySelector('#header').clientHeight;

	if(scheduledAnimationFrame){ //https://lazywon.tistory.com/53 참고
		return;
	}
	
	scheduledAnimationFrame = true;
	requestAnimationFrame(function(){
		if (afterPosition > 0) {
			if(beforePosition < afterPosition ){
				target.classList.remove('floatingAct');
			} else {
				target.classList.add('floatingAct');
				if(idScrollEnd){
					target.classList.remove('floatingAct');
				}
			}
		} else {
				target.classList.remove('floatingAct');
		}
		beforePosition = afterPosition;
		scheduledAnimationFrame = false;
	})
}
//위 노출, 아래 미노출...
function floatingScroll2(){
	const target = document.querySelector('body');
	let scheduledAnimationFrame = false;
	let afterPosition = document.documentElement.scrollTop;
	let idScrollEnd = window.innerHeight + window.scrollY > document.querySelector('#container').clientHeight + document.querySelector('#header').clientHeight;
	
	if(scheduledAnimationFrame){ //https://lazywon.tistory.com/53 참고
		return;
	}
	
	scheduledAnimationFrame = true;
	requestAnimationFrame(function(){
		if (afterPosition > 0) {
			if(beforePosition < afterPosition ){
				if(idScrollEnd){
					target.classList.remove('floatingAct');
				} else {
					target.classList.add('floatingAct');
				}
			} else {
				target.classList.remove('floatingAct');
			}
		} else {
				target.classList.remove('floatingAct');
		}
		beforePosition = afterPosition;
		scheduledAnimationFrame = false;
	})
}

//accordion 
function accordions(a){
	const wrap = a.closest('.accordions_wrap');
	wrap.classList.toggle('on');
}

//기간검색
function periodDetail(a){
	const wrap = a.closest('.period_check');
	wrap.classList.toggle('on');
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
	//console.log(a)
	document.querySelector('body').classList.add('ismodal');
	target.classList.add('open');
	document.querySelector('body').addEventListener('scroll touchmove mousewheel', function(e){e.preventDefault();}, false);
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
			if($(this).find('#modal').length > 1){
				const firstTarget = $(this).find('#modal')[0];
				$(firstTarget).addClass('open');
			} else {
				$(this).find('#modal').addClass('open');
			}
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
		target.querySelector('.close').addEventListener('click', function(){
			close();
		});
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

//카테고리 메뉴
function cateReady(){
	const wrap = document.querySelector('.category_menu');
	const cate = wrap.querySelector('.list');
	let total = cate.childElementCount;
	let menus = cate.querySelectorAll('li');
	function init(){
		let arrValue = new Array();
		let max = 0;
		for(let i=0;i<3;i++){
			let h = menus[i].clientHeight;
			arrValue.push(h);
		}
		max = Math.max.apply(null, arrValue);
		cate.style.cssText = 'height:'+max+'px';
	}
	init();
	if(total<4){
		document.querySelector('.category_menu').classList.add('minimum');
	} else {
		document.querySelector('.category_menu').classList.remove('minimum');
	}
	//window.addEventListener('resize', cateH);
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
		cateReady();
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
			var slider = $(this);
			if(slider.hasClass('type1')){
				if (window.innerWidth > 320){ //320이상
					view = 2;
				}else{ //280대응
					view = 2;
				}
			}else {
				if (window.innerWidth > 320){ //320이상
					view = 4;
				}else{ //280대응
					view = 2;
				}
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
	let slide = document.querySelector('.'+a).querySelector('.swiper-container');
	let len = slide.querySelectorAll('.swiper-slide').length;
	if(len > 1){
		const pagination = document.createElement('div');
		pagination.className = 'swiper-pagination';
		slide.append(pagination);
		let slideSwiper = new Swiper(slide, {
			slidesPerView: 1,
			loop: true,
			autoHeight : true,
			pagination: {
				el: slide.querySelector('.swiper-pagination'),
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
			const target = tabWrap.querySelector('#'+tab.dataset.tabTarget); //data-tab-target
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

//공동구매 attain
function attain(){
	const box = document.querySelector('.groupbuying_list');
	let lists = box.querySelectorAll('ul>li');

	lists.forEach((list) => {
		let step = list.querySelector('.step');
		let total = step.querySelectorAll('li').length;
		let attain = list.querySelectorAll('.attain').length;
		let bar = list.querySelector('.step_box .bar>span');
		let fill = (100/total)*attain;

		list.querySelector('.step').classList.add('cols'+step.dataset.step);
		bar.style.width = fill+'%';
	});
}

//브랜드관
function youtubeSlide(){
	const box = document.querySelectorAll('.youtubeslide');

	if(box.length>0){
		let wrap = document.querySelector('.youtubeslide');
		let slide = wrap.querySelector('.swiper-container');
		let len = wrap.querySelectorAll('.swiper-slide').length;

		if(len>1){
			document.querySelector('.youtubeslide .swiper-pagination').style.display = 'inline-block';
			const youtubeSwiper = new Swiper(slide, {
				slidesPerView: 1,
				pagination: {
					el: wrap.querySelector('.swiper-pagination'),
					type:'fraction',
				},
				loop: true
			})
		} else {
			document.querySelector('.youtubeslide .swiper-pagination').style.display = 'none';
		}
	}
	
};

function videoLayer(idx, url){
	const layer = document.querySelector('.youtubelayer');
	const iframe = layer.querySelector('.video_box iframe');
	let btn = layer.querySelectorAll('.video_list li');
	let num = idx.closest('.swiper-slide').dataset.swiperSlideIndex;

	layer.classList.add('open');
	iframe.setAttribute('src', url);

	for(let i=0;i<btn.length;++i){
		btn[i].classList.remove('active');
		if(num===undefined){
			btn[0].classList.add('active');
		}else{
			btn[num].classList.add('active');
		}
	}
	layer.querySelector('.btn_close').addEventListener('click', () => {
		layer.classList.remove('open');
		iframe.setAttribute('src', '');
	});
}

function videotab(a,b){
	let url = b;
	let btn = a.closest('.video_list').querySelectorAll('li');

	btn.forEach((item) => {
		item.addEventListener('click', () => {
			btn.forEach((item) => {
				item.classList.remove('active');
			});
			item.classList.add('active');
		})
	})
	a.closest('.youtubelayer').querySelector('iframe').setAttribute('src', url);
}

//배너 스와이프 wide
function wideBannerSlide(a){
	let slide = document.querySelector('.'+a);
	let len = slide.querySelectorAll('.swiper-slide').length;
	if(len > 1){
		let wideBannerSwiper = new Swiper(slide, {
			slidesPerView: 1,
			spaceBetween: 15,
			loop: true,
			loopAdditionalSlides: 1,
			autoplay: {
				delay: 3000
			}
		});
	} else {
		slide.classList.add('none-swiper')
	}
}

function mainPopup(a){
	const popupWrap = document.querySelectorAll('.main_popup');
	const popup = document.querySelector('.main_popup');
	const body = document.querySelector('body');
	if(popupWrap.length){
		popup.classList.add('open');
		body.classList.add('ismodal');
		body.addEventListener('scroll touchmove mousewheel', function(e){e.preventDefault();}, false);
		slideBannerSlide('main_popup','bullets');

		if(a == 'close'){
			popup.classList.remove('open');
			body.classList.remove('ismodal');
			body.removeEventListener('scroll touchmove mousewheel', null, false);
		}
	}
}

//거래원장 스크롤
function scrollCustom(){
	const scrollBox = document.querySelector('.scrollList');
	const scrollCont = scrollBox.querySelector('.common_tbl');
	const progressBox = document.querySelector('#progress');
	const setScrollDisplay = () => {
		if(scrollCont.clientWidth<window.innerWidth){
			progressBox.style.display = 'none';
		} else {
			progressBox.style.display = 'block';
		}
	}
	const setTblScroll = () => {
		let bar = (scrollBox.scrollLeft / (scrollBox.scrollWidth - scrollBox.clientWidth) ) * 100;
		progressBox.querySelector('.bar').style.width = bar + "%";
	}
	scrollBox.addEventListener('scroll', setTblScroll);
	window.addEventListener('resize', setScrollDisplay);
}

//파일찾기
function fileSelect(a){
	const box = a.closest('.fileinput');
	let fileName = a.files[0].name;
	//console.log(a);
	box.querySelector('input[type=text]').value = fileName;
}

//로딩 관련
function loadingShow(type){
	const loadingBox = document.createElement('div');
	loadingBox.id = 'loading';
	loadingBox.innerHTML ='<span></span><span></span><span></span>';

	document.querySelector('#container').append(loadingBox);
}
function loadingHide(){
	document.querySelector('#loading').remove();
}