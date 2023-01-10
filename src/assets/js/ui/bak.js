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
	const floating = document.querySelector('#container').querySelectorAll('.floating_btn');
	const fixedBtn = document.querySelector('#fixedBtn');

	if(scrollTop > 0){
		body.classList.add('scroll');
	} else {
		body.classList.remove('scroll');
	}

	if(toolbar.length>0){
		if(scrollTop == 0){
			body.classList.remove('sDown');
		} else if (scrollTop >= lastScroll) {
			body.classList.add('sDown');
			window.clearTimeout( isScrolling );
			isScrolling = setTimeout(function() {
				//console.log( '스크롤 멈춤' );
				body.classList.remove('sDown');
			}, 100);
		}
		// else {
		// 	//body.classList.remove('sDown');
		// 	//body.classList.add('end');
		// 	//console.log('up')
		// }
		lastScroll = scrollTop;
		// if(scrollTop == 0){
		// 	body.classList.remove('end');
		// 	body.classList.remove('sDown');
		// }
		// if(scrollTop + height >= scrollHeight){
		// 	body.classList.add('end');
		// }
	} else if(floating.length>0) {
		let floatingH = document.querySelector('#container .floating_btn').clientHeight;
		if(scrollTop > 0){
			document.querySelector('#fixedBtn').style.cssText = 'bottom:'+(floatingH+16)+'px';
		} else {
			document.querySelector('#fixedBtn').style.cssText = 'bottom:'+(floatingH-44)+'px';
		}
	}
}