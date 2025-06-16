$(function () {
    $(".scaleBox").addClass('scaleOn');
});

// コンテンツ縮小
$(function(){

	var bodyWrapperBase = 1400; // bodyのmin-width
	var bodyWrapperMin = 1020; // PC表示の想定最小幅
	var maxBreakPoint = 1400; // リサイズ適用の最大幅
	var minBreakPoint = 767; // リサイズ適用の最小幅
	var $contents = $('.scaleOn'); // 縮小するコンテンツ
	var windowWidth;
	var zoomScale;
	var contentsHeight;

  if(!isDesktopIpad && !sizeSp){

  	windowWidth = $(window).width();
  	if(windowWidth < maxBreakPoint && windowWidth >= bodyWrapperMin){
  		zoomScale = windowWidth / bodyWrapperBase;
  		$contents.css({
  			'transform':'scale(' + zoomScale + ')',
  			'transform-origin':'left top'
  		});
  		contentsHeight = $contents.innerHeight();
  		$contents.css('width',bodyWrapperBase);
  		$contents.css('height',contentsHeight * zoomScale);
  		$('body').css('min-width',bodyWrapperMin);
  		$('#container').css('overflow','hidden');
  	}else if(windowWidth < bodyWrapperMin && windowWidth > minBreakPoint){
  		zoomScale = bodyWrapperMin / bodyWrapperBase;
  		$contents.css({
  			'transform':'scale(' + zoomScale + ')',
  			'transform-origin':'left top'
  		});
  		contentsHeight = $contents.innerHeight();
  		$contents.css('width',bodyWrapperBase);
  		$contents.css('height',contentsHeight * zoomScale);
  		$('body').css('min-width',bodyWrapperMin);
  		$('#container').css('overflow','hidden');
  	}

  	$(window).scroll(function() {
  		windowWidth = $(window).width();
  		if(windowWidth < maxBreakPoint && windowWidth >= bodyWrapperMin){
  			zoomScale = windowWidth / bodyWrapperBase;
  			$contents.css('height','auto');
  			contentsHeight = $contents.innerHeight();
  			$contents.css('height',contentsHeight * zoomScale);
  		}else if(windowWidth < bodyWrapperMin && windowWidth > minBreakPoint){
  			zoomScale = bodyWrapperMin / bodyWrapperBase;
  			$contents.css('height','auto');
  			contentsHeight = $contents.innerHeight();
  			$contents.css('height',contentsHeight * zoomScale);
  		}
  	});

  	$(window).resize(function() {
  		windowWidth = $(window).width();
  		if(windowWidth < maxBreakPoint && windowWidth >= bodyWrapperMin){
  			zoomScale = windowWidth / bodyWrapperBase;
  			$contents.css({
  				'transform':'scale(' + zoomScale + ')',
  				'transform-origin':'left top'
  			});
  			$contents.css('width',bodyWrapperBase);
  			$contents.css('height','auto');
  			contentsHeight = $contents.innerHeight();
  			$contents.css('height',contentsHeight * zoomScale);
  			$('body').css('min-width',bodyWrapperMin);
  			$('#container').css('overflow','hidden');
  		}else if(windowWidth < bodyWrapperMin && windowWidth > minBreakPoint){
  			zoomScale = bodyWrapperMin / bodyWrapperBase;
  			$contents.css({
  				'transform':'scale(' + zoomScale + ')',
  				'transform-origin':'left top'
  			});
  			$contents.css('width',bodyWrapperBase);
  			$contents.css('height','auto');
  			contentsHeight = $contents.innerHeight();
  			$contents.css('height',contentsHeight * zoomScale);
  			$('body').css('min-width',bodyWrapperMin);
  			$('#container').css('overflow','hidden');
  		}else if(windowWidth >= maxBreakPoint){
  			$contents.css({
  				'transform':'none'
  			});
  			$contents.css('width','auto');
  			$contents.css('height','auto');
  			$('body').css('min-width',bodyWrapperBase);
  		}else{
  			$contents.css({
  				'transform':'none'
  			});
  			$contents.css('width','auto');
  			$contents.css('height','auto');
  			$('body').css('min-width',0);
  		}
  	});

  }

});