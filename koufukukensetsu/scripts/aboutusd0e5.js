$(function () {
    // slider
    var settingsModel = {
        loop: true,
        effect: 'fade',
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 20,
        pagination: {
            el: '#slider .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 3000,
        breakpoints: {
            768: {
                spaceBetween: 0,
                slidesPerView: 1,
            },
        }
    }
  
    initSlider('#slider', settingsModel, true, 1);
  });
  

  $(function () {
    // sliderGallery
    var settingsGallery = {
        loop: true,
        loopAdditionalSlides: 1,
        allowTouchMove: false,
        simulateTouch: false,
        speed: 15000,
        centeredSlides: true,
        spaceBetween: 10,
        autoplay: {
            delay: 0,
        },
        breakpoints: {
            768: {
                spaceBetween: 20,
                slidesPerView: 1,
            },
        }
    }
    initSlider('#sliderGallery', settingsGallery, false, 1);
});

$(function() {
    let tabs = $(".secHome .tab");

    $(".secHome .tab").on("click", function() {
    // クリックされたタブを記録
    let clickedTab = $(this);

    // すべてのタブとコンテンツからactiveクラスを削除
    // $(".secHome .active").removeClass("active");
    $(".secHome .tab").removeClass("active");

    // クリックされたタブにactiveクラスを追加
    clickedTab.addClass("active");

    // 1秒後にコンテンツを切り替え
    setTimeout(function() {
        const index = tabs.index(clickedTab);
        $(".secHome .content").removeClass("active").eq(index).addClass("active");
    }, 0); // 1000ミリ秒 = 1秒
    });
})

function delayNavigation(link, delay) {
    event.preventDefault();
    const targetUrl = link.href;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, delay);
  }

$(function () {
    // LineupSlider
    if (sizeSp) {
        var settingsLineup = {
            loop: false,
            slidesPerView: 1.5458,
            spaceBetween: 15,
            speed: 1000,
            freeMode: true,
            scrollbar: {
                el: '#sliderLineup .swiper-scrollbar',
                draggable: true,
            },
        }
       initSlider('#sliderLineup', settingsLineup, true, 1);
    }
});