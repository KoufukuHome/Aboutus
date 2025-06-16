// スムーススクロール
$(function(){
    $(document).on("click", "a[href*='#']:not(.no_scroll)", function(){
        if(!sizeSp){
            var headerHeight = 70; // 固定ヘッダの高さ（PC）
        }else{
            var headerHeight = 40; // 固定ヘッダの高さ（SP）
        }
        var speed = 500; // スクロールの速さ
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top-headerHeight;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        // lazyLoad対策
        setTimeout(function(){
            var positionBefore = position;
            position = target.offset().top-headerHeight;
            var positionGap = Math.abs(positionBefore - position);
            if(positionGap > 10){
                $("html, body").scrollTop(position);
            }
        },1000);
        return false;
    });
});

//別ページからのアンカーリンク
$(window).on('load', function() {
    if(!sizeSp){
        var headerHeight = 70; // 固定ヘッダの高さ（PC）
    }else{
        var headerHeight = 40; // 固定ヘッダの高さ（SP）
    }
    var urlHash = location.hash;
    if(urlHash){
        var target = $(urlHash);
        if(target.length){
            var position = target.offset().top-headerHeight;
            $("html, body").scrollTop(position);
            // lazyLoad対策
            setTimeout(function(){
                var positionBefore = position;
                position = target.offset().top-headerHeight;
                var positionGap = Math.abs(positionBefore - position);
                if(positionGap > 10){
                    $("html, body").scrollTop(position);
                }
            },1000);
        }
    }
});

// ユーザーエージェントチェック
var agent = navigator.userAgent;

var spFlag = false;
if(agent.indexOf("iPhone") > 0){
    // iphone処理
    spFlag = true;
}else if(agent.indexOf("Android") > 0){
    // android処理
    spFlag = true;
}

//============================================================
//	レスポンシブ用(不要な場合は削除)
//============================================================
// 画面サイズ取得
var breakpoint = 767;
var sizeSp = false;
if(window.matchMedia('(max-width:'+ breakpoint + 'px)').matches){
    sizeSp = true;
}else{
    sizeSp = false;
}

//============================================================
//	背景画像の遅延読込(不要な場合は削除)
//============================================================
document.addEventListener('DOMContentLoaded',()=> {
    const lazyloadList = document.querySelectorAll(".lazyload");
    const observerLazyload = new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('lazyloaded');}});});
    lazyloadList.forEach((item)=>{observerLazyload.observe(item);});
});

//============================================================
//	Swiper用(不要な場合は削除)
//============================================================
// 初期化（引数minSlidesSpは省略可）
function initSlider(elementName, settings, minSlides, minSlidesSp) {
    if (!(typeof Swiper === 'undefined')){
        settings.init = false;
        let slider = new Swiper(elementName + ' .swiper', settings);
        if (minSlidesSp != undefined && sizeSp) {
            minSlides = minSlidesSp;
        }
        if ($(elementName + ' .swiper-slide:not(.swiper-slide-duplicate)').length > minSlides) {
            slider.init();
        } else {
            $(elementName + ' .swiper-button-prev,' + elementName + ' .swiper-button-next,' + elementName + ' .swiper-pagination').css({ 'cssText': 'display: none !important;' });
            $(elementName).addClass('disabled');
        }
        return slider;
    }
}

// ループ指定のスライダーのLightboxが正しく動作するようにする
function setSliderLightbox(elementName){
	// 最初のスライドの前・最後のスライドの後に挿入されるクローンのLightboxを削除
	$(elementName + ' .swiper-slide.swiper-slide-duplicate a').removeAttr('data-lightbox');
	$(elementName + ' .swiper-slide.swiper-slide-duplicate a').attr('href','javascript:void(0)');
	// クローンのLightboxをクリック
	$(elementName + ' .swiper-slide.swiper-slide-duplicate a').on('click',function(){
		// クローンではないスライドのLightboxを実行する
		var index = $(this).closest('.swiper-slide').attr('data-swiper-slide-index');
		$(elementName + ' .swiper-slide:not(.swiper-slide-duplicate):eq('+ index + ') a').trigger('click');
	});
}

//============================================================
//	サイト毎に共通動作を記述する場合はここより下で行うこと
//============================================================

//タブレット判定
var ua = navigator.userAgent
var sp = ua.indexOf('iPhone') > -1 ||
    (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)
var isTablet = !sp && (
    ua.indexOf('iPad') > -1 ||
    (ua.indexOf('Macintosh') > -1 && 'ontouchend' in document) ||
    ua.indexOf('Android') > -1
)
$(function () {
    if (isTablet) {
        $('meta[name="viewport"]').attr('content', 'width=1400');
        $('body').addClass('tablet');
    }
});

//デスクトップ用Webサイトを表示（iPad）判定
var ua = navigator.userAgent
var sp = ua.indexOf('iPhone') > -1 ||
    (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)
var isDesktopIpad = !sp && (ua.indexOf('Macintosh') > -1 && 'ontouchend' in document);
$(function () {
    if (isDesktopIpad) {
        $('body').addClass('isDesktopIpad');
    }
});

// jsHide
function jsHide() {
    const jsHideList = document.querySelectorAll(".jsHideFade,.jsHide,.jsHideList");
    const observerJsHide = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('jsShow');
            }
        });
    }, {
        rootMargin: "0% 0% -10%"
    });
    jsHideList.forEach((item) => {
        observerJsHide.observe(item);
    });
    
    const footerList = document.querySelectorAll("#footer");
    const observerFooter = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $('.jsHideFade,.jsHide,.jsHideList').addClass('jsShow');
            }
        });
    },{
        rootMargin: "0%"
    });
    footerList.forEach((item) => {
        observerFooter.observe(item);
    });
}
$(function(){
    jsHide()
});

// ウィンドウのスクロールの有効／無効
var defaultPosition;
var windowScrollTop;
function windowScrollToggle() {
    var target = $('#container');
    if (target.css('position') == 'fixed') {
        target.css({ 'position': defaultPosition, 'top': '0' });
        $('html,body').scrollTop(windowScrollTop);
    } else {
        defaultPosition = target.css('position');
        windowScrollTop = $(window).scrollTop();
        target.css({ 'position': 'fixed', 'top': -windowScrollTop });
        $('html,body').scrollTop(0);
    }
}
$(function(){
    $("#headerscroll").removeClass("scroll");
    var currentPos = $(this).scrollTop();
    if (!sizeSp){
        if (currentPos > 200){
            $("#headerscroll").addClass("scroll");
        }else{
            $("#headerscroll").removeClass("scroll");
        }
    }else{
        if (currentPos > 100){
            $("#headerscroll").addClass("scroll");
        }else{
            $("#headerscroll").removeClass("scroll");
        }
    }

    
    let prevScrollPos = 0;

    $(window).scroll(function(){
        if (!$('#header').hasClass('naviOpen')){
            var currentPos = $(this).scrollTop();
            var scrollDirection = currentPos > prevScrollPos ? 'down' : 'up';

            if (!sizeSp){
                if (currentPos > 200 && scrollDirection === 'up'){  // 上スクロールかつ閾値超えでクラス付与
                    $("#headerscroll").addClass("scroll");
                } else if (scrollDirection === 'down' || currentPos <= 200){ // 下スクロール、または閾値以下でクラス除去
                    $("#headerscroll").removeClass("scroll");
                }
            } else {
                if (currentPos > 100){  // 上スクロールかつ閾値超えでクラス付与
                    $("#headerscroll").addClass("scroll");
                } else if (currentPos <= 100){ // 下スクロール、または閾値以下でクラス除去
                    $("#headerscroll").removeClass("scroll");
                }
            }
            prevScrollPos = currentPos;
        }
    });
    
    // btnNavi
    $('#headerscroll .btnNav , #header .btnNav , #menu a ,#menuclose').click(function () {
        if ($('#header,#headerscroll').hasClass('naviOpen')){
            $('#header,#headerscroll').removeClass('naviOpen');
            $('body').removeClass('naviOpen');
            $('#headerscroll .btnNav,#header .btnNav').removeClass('naviOpen');
            $('.secChangemenu .tablist .tab').removeClass('on');
            $('.secChangemenu .contentlist .contentlitem').hide();
            $('#menu').fadeOut(500, function () {
                windowScrollToggle();
            });
        }else{
            $('body').addClass('naviOpen');
            $('#menu').fadeIn(500);
            $('#header,#headerscroll').addClass('naviOpen');
            $('#headerscroll .btnNav , #header .btnNav').addClass('naviOpen');
            windowScrollToggle();
            $("html, body").scrollTop(0);
        }
    });

});

$(function() {
    // 初期化
    $('.secChangemenu .contentlist .contentlitem').hide();

    // タブ切り替え
    $('.secChangemenu .tablist .tab:not(.links)').on('click', function () {
        // クリックされたタブの data-number 属性値を取得
        let targetNumber = $(this).data('number');

        if ($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.secChangemenu .contentlist .contentlitem[data-number="' + targetNumber + '"]').hide();
        } else {
            // 全てのタブから on クラスを削除
            $('.secChangemenu .tablist .tab').removeClass('on');
            // クリックされたタブに on クラスを追加
            $(this).addClass('on');

            // 全てのコンテンツを非表示
            $('.secChangemenu .contentlist .contentlitem').hide();
            // data-number が一致するコンテンツを表示
            $('.secChangemenu .contentlist .contentlitem[data-number="' + targetNumber + '"]').show();
        }
    });
});

$(function () {
    $('#menu .taptrigger').on('click', function () {
        $(this).toggleClass('on');
        $(this).next().slideToggle();
    });

    $('#footer .triggerbox').on('click', function () {
        $(this).toggleClass('on');
        $(this).next().slideToggle();
    });
});

$(function(){
    // fixedBnr
    var $fixedBnr = $("#fNavi");
    $(window).scroll(function(){
        var currentPos = $(this).scrollTop();
        if (currentPos > 200){
            $fixedBnr.addClass("active");
        }else{
            $fixedBnr.removeClass("active");
        }
    });
});

$(function(){
  $("#fNavi .closeBtn").click(function() {
    $("#fNavi").toggleClass("close");
  });
});
$(function () {
    $(".btnSendCo").click(function(){
        $(this).addClass("no_tap");
        $('.btnSendCoBack').addClass("no_tap");
    });
});
window.onpageshow = function() {
    $('.btnSendCo').removeClass("no_tap");
    $('.btnSendCoBack').removeClass("no_tap");
};