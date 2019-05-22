(function () {
	$(window).scroll(function() {
		if($(this).scrollTop() > 20) {
			$('.header').addClass('header--fixed');
		}
		else{
			$('.header').removeClass('header--fixed');
		}
	});
	$('.modal-btn').click(function() {
		$('.modal').addClass('modal--active');
		$('body').addClass('modal-active');
	});
	$('.modal-close').click(function() {
		$('.modal').removeClass('modal--active');
		$('body').removeClass('modal-active');
	});
	$('.modal').click(function(evt) {
		if (evt.target === this) {
			$('.modal').removeClass('modal--active');
			$('body').removeClass('modal-active');
		}
	});
	$('.header__nav-btn').click(function() {
		$('.header__nav-btn').toggleClass('header__nav-btn--active');
		$('.main-nav').toggleClass('main-nav--active');
		$('body').toggleClass('mob-active');
	});
})();
