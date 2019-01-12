$(function(){
	// Параллакс для фигуры
	function scale(){
		i = Math.round(($('.about-me').width()+1260*2)/1260/3*631);
		$('svg').attr("height", i).css({
			'top': 631-i+'px',
			'left': '-'+(620-i)+'px'
		});
		
	}
	scale();
	// Перерисовываем при ресайзе
	$(window).resize(function(){
		scale();
		$('.nav__item_header').removeClass('font_zero background_1 nav__item_header--floating ');
		$('.nav_header').removeClass('nav_floating tablet mobile');
		$('.invisible').hide(1);
		$('.dialog').offset({top: 200}).css({'left': '-200%', 'top': '200px'})	;		
		$('.dialog').removeAttr('style');
	});
	// Запрет перехода по кнопкам-ссылкам
	$('.button_1').click(function(event){
		event.preventDefault();
	});
	$('.flying-elements__element').addClass('transform');
	
	/* Слайдер со стрелками */
	$('.arrow-left').click(function(){
		$('#slider-item-third').next('.slider__item').attr('id', 'slider-item-');
		$('#slider-item-first').attr('id', '');
		$('#slider-item-second').attr('id', 'slider-item-first');
		$('#slider-item-third').attr('id', 'slider-item-second');
		// Ищём элемент после третьего
		if ($('#slider-item-').length == 0){
			$('.slider__item').first().attr('id', 'slider-item-third');
		} else {
			$('#slider-item-').attr('id', 'slider-item-third');
		}
	})
	$('.arrow-right').click(function(){
		$('#slider-item-first').prev('.slider__item').attr('id', 'slider-item-');
		$('#slider-item-third').attr('id', '');
		$('#slider-item-second').attr('id', 'slider-item-third');
		$('#slider-item-first').attr('id', 'slider-item-second');
		// Ищем элемент перед первым
		if ($('#slider-item-').length == 0){
			$('.slider__item').last().attr('id', 'slider-item-first');
		} else {
			$('#slider-item-').attr('id', 'slider-item-first');
		}
	})
	/* Слайдер по кнопкам */
	/* Рисуем кнопки */
	// Ищем число слайдов
	count = $('.slider__item').length;
	console.log(count);
	for (i = 1; i <= count; ++i){
		$('.slider__dots').prepend('<div class="slider__dot cursor" id="slider__dot_'+(count+1-i)+'"></div>\n');		
	}
	
	
	$('.slider__dots').css('width',(count+1)*53+'px');
	// Ищем номер первого слайда
	first = $('#slider-item-first').index();
	$('.slider__dot').eq(first-1).css('background-color', '#ff4e2e');
	/* Ловим клик на точке */
	$(document).on('click', function(e) {
		num = e.target.id;
		num = num.split('slider__dot_')[1]-1;
		if (num >= 0 && num <= count-1){
			// Очистили порядок слайдов	
			for (i = 1; i <= count; ++i){
				$('.slider__item').eq(i-1).attr('id', '');
			}
			// Выставили порядок ещё раз
			$('.slider__item').eq(num).attr('id', 'slider-item-first');
			if (num+1 >= count){
				num = -1;
			}
			$('.slider__item').eq(num+1).attr('id', 'slider-item-second');
			if (num+2 >= count){
				num = -1;
			}
			$('.slider__item').eq(num+2).attr('id', 'slider-item-third');
			//Очистили цвет точки
			$('.slider__dot').eq(first-1).removeAttr('style');
			// Ищем номер первого слайда ещё раз
			first = $('#slider-item-first').index();
			$('.slider__dot').eq(first-1).css('background-color', '#ff4e2e');
		}
	});
	//Функция запрета прокрутки страницы
	function scrollControl(targetElement, labelScrollON, labelScrollOFF){
		$("html, .body").toggleClass('no-scroll');
		if ($(targetElement).attr('id') == labelScrollOFF){
			$(targetElement).attr('id', labelScrollON);
			$(document).unbind('touchmove');
		} else {
			$(targetElement).attr('id', labelScrollOFF);
			$(document).bind('touchmove', false);
		}
	}
	
	//Всплывающее меню
	$('.nav_mini').click(function(event){
		if (event.target.className.includes('nav_mini')){
			scrollControl('.nav_mini', 'scroll_on', 'scroll_off');
			$('.nav_header').addClass('tablet mobile nav_floating');
			$('.nav__item_header').addClass('nav__item_header--floating background_1');
			$('.nav__item_header').slideDown(500, function(){
				$('.nav__item_header').toggleClass('nav__item_header--floating-move');
				
			});
		}
	});
	//Всплывающее окно для звонка
	// На кнопке
	$('.button_2').click(function(event){
		console.log(event);
		if (event.target.className.includes('button_2') && event.target.id != "cancel"){
			$('.dialog h2').text('Мы вам перезвоним');
			$('#dialog__label2 p').text('Ваш телефон (обязательно)')
			$('#dialog__label3').addClass('invisible');
			$('.dialog').show(3000, $('.dialog').css('left', '0'));
			// Чисто приблизительно для верхней кнопки
			if ($(this).offset().top < 100){
				$('.dialog').offset({top: 200});
			} else {
				$('.dialog').offset({top: $('body').height()-1300});
			}
		}
	});
	// На маленькой кнопке
	$('.call-me_mini').click(function(event){
		if (event.target.className.includes('call-me_mini')){
			$('.dialog h2').text('Мы вам перезвоним');
			$('#dialog__label2 p').text('Ваш телефон (обязательно)')
			$('#dialog__label3').addClass('invisible');
			$('.dialog').show(3000, $('.dialog').css('left', '0'));
			// Чисто приблизительно для верхней кнопки
			if ($(this).offset().top < 100){
				$('.dialog').offset({top: 200});
			} else {
				$('.dialog').offset({top: $('body').height()-1300});
			}
		}
	});
	$('.button_1 mobile').click(function(event){
		if (event.target.className.includes('button_1 mobile')){
			$('.dialog h2').text('Мы вам перезвоним');
			$('#dialog__label2 p').text('Ваш телефон (обязательно)')
			$('#dialog__label3').addClass('invisible');
			$('.dialog').show(3000, $('.dialog').css('left', '0'));
			// Чисто приблизительно для верхней кнопки
			if ($(this).offset().top < 100){
				$('.dialog').offset({top: 200});
			} else {
				$('.dialog').offset({top: $('body').height()-1300});
			}
		}
	});
	//Всплывающее окно для письма
	$('.button_1').click(function(event){
		if (event.target.className.includes('button_1') && event.target.id != 'send' && !event.target.className.includes('button_1 mobile')){
			$('.dialog h2').text('Мы вам ответим');
			$('#dialog__label3').removeClass('invisible');
			$('#dialog__label2 p').text('Ваш телефон')
			$('#phone').removeAttr('style');
			$('.dialog').show(3000, $('.dialog').css('left', '0'));
			// Двигаем окошко
			console.log($('body').height() - $(this).offset().top);
			if ($('body').height() - $(this).offset().top  > 750){
				$('.dialog').offset({top: $(this).offset().top + 100});
			} else {
				$('.dialog').offset({top: $(this).offset().top - 700});
			}
		} else {
			if (event.target.className.includes('button_1 mobile')){
				$('.dialog h2').text('Мы вам перезвоним');
				$('#dialog__label2 p').text('Ваш телефон (обязательно)')
				$('#dialog__label3').addClass('invisible');
				$('.dialog').show(3000, $('.dialog').css('left', '0'));
				// Чисто приблизительно для верхней кнопки
				if ($(this).offset().top < 100){
					$('.dialog').offset({top: 200});
				} else {
					$('.dialog').offset({top: $('body').height()-1300});
				}
			}
		}
	});
	// Закрытие всплывающего окна
	$('#cancel').click(function(event){
		if (event.target.id == 'cancel'){
			$('.dialog').offset({top: 200}).css({'left': '-200%', 'top': '200px'})	;		
			$('.dialog').removeAttr('style');
		}
	});
	document.onkeydown = function(event){
		if (event.keyCode == 27 && $('.dialog').attr('style') !== ''){
			$('.dialog').offset({top: 200}).css({'left': '-200%', 'top': '200px'})	;		
			$('.dialog').removeAttr('style');
		}
	}
	$('#send').click(function(event){
		if (event.target.id == 'send'){
			result = true;
			if ($('#dialog__label1 p').text().includes('обязательно') && $('#name').val() === '') {
				result = false;
				$('#name').css('border-color', 'red');
			}
			if ($('#dialog__label2 p').text().includes('обязательно') && $('#phone').val() === ''){
				result = false;
				$('#phone').css('border-color', 'red');
			}
			if (!$('#dialog__label3').hasClass('invisible')){
				if ($('#dialog__label3 p').text().includes('обязательно') && $('#email').val() === ''){
					result = false;
					$('#email').css('border-color', 'red');
				}
			}
		}
		if (result){
			console.log('Имя - ', $('#name').val());
			console.log('Телефон - ', $('#phone').val());
			console.log('Емайл- ', $('#email').val());
		}
	});
	
});