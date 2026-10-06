$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
	function arrangeBalloons() {
		var balloons = $('.balloons');
		var gap = 8;
		var balloonWidth = Math.min(
			100,
			($(window).width() - (balloons.length - 1) * gap) / balloons.length
		);
		var balloonHeight = balloonWidth * 1.83;
		var totalWidth = balloons.length * balloonWidth + (balloons.length - 1) * gap;
		var startLeft = Math.max(0, ($(window).width() - totalWidth) / 2);

		balloons.each(function(index){
			$(this).css({
				top: 240,
				left: startLeft + index * (balloonWidth + gap),
				bottom: 'auto',
				width: balloonWidth,
				height: balloonHeight,
				backgroundSize: balloonWidth + 'px ' + balloonHeight + 'px'
			});
			$(this).find('h2').css('font-size', balloonWidth * 0.5);
		});
	}

	$(window).resize(function(){
		if ($('.balloons-arranged').length) {
			arrangeBalloons();
		}
	});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopBalloon(balloon) {
		var maxLeft = Math.max(0, $(window).width() - balloon.outerWidth());
		var maxBottom = Math.max(200, $(window).height() - balloon.outerHeight());
		balloon.animate({
			left: maxLeft * Math.random(),
			bottom: maxBottom * Math.random()
		}, 10000, function(){
			loopBalloon(balloon);
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('.balloons').each(function(index){
			$(this).addClass(index % 2 === 0
				? 'balloons-rotate-behaviour-one'
				: 'balloons-rotate-behaviour-two');
			loopBalloon($(this));
		});
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		$('.balloons').stop(true).addClass('balloons-arranged');
		arrangeBalloons();
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var messages = $('.message p');
		function showMessage(index) {
			if (index >= messages.length) {
				$('.memories').fadeIn('slow', function(){
					$('html, body').animate({
						scrollTop: $('.memories').offset().top - 20
					}, 500);
				});
				return;
			}

			messages.eq(index).fadeIn('slow').delay(1000).fadeOut('slow', function(){
				window.setTimeout(function(){
					showMessage(index + 1);
				}, 400);
			});
		}

		showMessage(0);
	});
});




//alert('hello');