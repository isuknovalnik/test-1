(function () {
	
	var setActiveItem = function (navItem, itemNumber, items, blocks, activeNavClass, activeBlockClass) {
		if (!navItem.classList.contains(activeNavClass)) {
			for (var j = 0; j < items.length; j++) {
				if (j === itemNumber) {
					items[j].classList.add(activeNavClass);
					blocks[j].classList.add(activeBlockClass);
				} else {
					items[j].classList.remove(activeNavClass);
					blocks[j].classList.remove(activeBlockClass);
				}
			}
		}
	};

	window.showBlock = function (navItem, itemNumber, items, blocks, activeNavClass, activeBlockClass) {
		navItem.addEventListener('click', function (event) {
			event.preventDefault();
			setActiveItem(navItem, itemNumber, items, blocks, activeNavClass, activeBlockClass);
		});
	};

})();
