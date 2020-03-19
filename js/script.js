//Шапка
$('.menu-btn').click(function(){
	$(this).toggleClass('menu-btn--active');
	$('.header__menu').toggleClass('header__menu--open')
})
//таймер
function leadingZero(number){
	return +number < 10 ? '0'+number : number;
}
function getTime(ms){//функция для разбора времени на составляющие: часы, минуты, секунды

	if(isFinite(ms) && ms > 1000){
		var secondsTotal = ms/1000,
				hours = Math.floor(secondsTotal/3600),
				minutes = Math.floor(secondsTotal%3600 / 60),
				seconds = Math.floor(secondsTotal%60);
		return {
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
	}else{
		return false;
	}
	
}
$('.timer[data-end]').each(function(){
	if(Date.parse($(this).data('end'))){
		
		var end = new Date($(this).data('end')),
				currentTime = new Date(),
				workTime = (end - currentTime),
				hoursOutput = $(this).find('.timer__value--hours'),
				minutesOutput = $(this).find('.timer__value--minutes'),
				secondsOutput = $(this).find('.timer__value--seconds');

		var timer = setInterval(function(){
			currentTime = new Date();
			if(currentTime < end){
				var diff = getTime(end - currentTime); //остаток времени в виде объекта
				hoursOutput.text(leadingZero(diff.hours));
				minutesOutput.text(leadingZero(diff.minutes));
				secondsOutput.text(leadingZero(diff.seconds));
			}else{
				clearInterval(timer);
				hoursOutput.text('00');
				minutesOutput.text('00');
				secondsOutput.text('00');
			}
		},1000)
			
	}
})

//Навигация по странице
$('a[href^="#"]').click(function(e){	
	var target = $(this.hash);
	if(target.length && target.find('.wrapper').length){
		e.preventDefault();
		$('.header__menu').removeClass('header__menu--open');
		$('.menu-btn').removeClass('menu-btn--active');
		
		$('html,body').animate({
			scrollTop: target.find('.wrapper').offset().top - $('.header').innerHeight() - 25
		},function(){
			$('.header__menu a[href="#'+e.target.id+'"]').parent().addClass('active').siblings().removeClass('active');			
		})
	}
})