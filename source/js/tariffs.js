(function () {
	var tariffsSwiper = document.querySelector(".tariffs__slider");
	
	if (tariffsSwiper) {
		var tariffsWrapper = tariffsSwiper.querySelector('.swiper-wrapper');
		var tariffsSlides = tariffsSwiper.querySelectorAll('.swiper-slide');
		var isTariffsSwiper;
	
		var initTariffsSwiper = function () {
			tariffsSwiper = new Swiper ('.tariffs__slider', {
				slidesPerView: 'auto',
				loop: true,
				speed: 600,
				navigation: {
					nextEl: '.tariffs-control-next',
					prevEl: '.tariffs-control-prev',
				},
			});
			isTariffsSwiper = true;
		}

		var destroyTariffsSwiper = function() {
			tariffsSwiper.destroy();
			tariffsWrapper.removeAttribute('style');
			tariffsSlides.forEach(function (elem) {
				elem.removeAttribute('style');
			});
			isTariffsSwiper = false;
		};

		var processResize = function() {
			if (window.matchMedia('(max-width: 1057px)').matches) {
				if (!isTariffsSwiper) {
					initTariffsSwiper();
				}
			} else {
				if (isTariffsSwiper) {
					destroyTariffsSwiper();
				}
			}
		  };

 		var resizeTimer;
  		window.addEventListener('resize', function () {
    		clearTimeout(resizeTimer);
    		resizeTimer = setTimeout(processResize, 10);
		});
		  
		if (window.matchMedia("(max-width: 1057px)").matches) {
			initTariffsSwiper();
		}
	}
  
})();
