(function () {
	var productSwiper = document.querySelector(".products__slider-int-wrap");
	
	if (productSwiper) {
		productSwiper = new Swiper ('.products__slider-int-wrap', {
			slidesPerView: 'auto',
			spaceBetween: 30,
			slidesPerGroup: 3,
			loop: true,
			speed: 600,
			breakpoints: {
				768: {
					slidesPerGroup: 1,
					spaceBetween: 20
				},
				1048: {
					slidesPerGroup: 2,
					spaceBetween: 30
				},
			},
			navigation: {
				nextEl: '.products-control-next',
				prevEl: '.products-control-prev',
			},
			pagination: {
				el: '.products__slider-pagination',
				type: 'fraction',
				formatFractionCurrent: function (number) {
					return (number < 10) ? ('0' + number) : number;
				},
				formatFractionTotal: function (number) {
					return (number < 10) ? ('0' + number) : number;
				},
			},
			on: {
				resize: function () {
					productSwiper.pagination.update();
				}
			},
		});

		var productCards = document.querySelectorAll(".product-card");
		var productColorButtons = [];
		var productPictures = [];
		var productBtnClass = "product-card__color--active";
		var productImgClass = "product-card__img--active";
			
		for (var j = 0; j < productCards.length; j++) {
			productColorButtons[j] = productCards[j].querySelectorAll(".product-card__color");
			productPictures[j] = productCards[j].querySelectorAll(".product-card__img");
			for (i = 0; i < productColorButtons[j].length; i++) {
				window.showBlock(productColorButtons[j][i], i, productColorButtons[j], productPictures[j], productBtnClass, productImgClass);
			}
		}
	}
  
})();
