var iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
var iPad = /iPad/.test(navigator.userAgent) && !window.MSStream;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(iPhone){
    $('body').addClass('iphone');
}
if(iPad){
    $('body').addClass('ipad');
}
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1) {
  if (ua.indexOf('chrome') > -1) {
    // alert("1") // Chrome
  } else {
    // alert("2") // Safari
    $('body').addClass('safari');
  }
}



if(window.navigator.userAgent.indexOf("Edge") > -1) {
  $('body').addClass('edge');
}

var UAString = navigator.userAgent;
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:11") !== -1)
{
  $('body').addClass('ie');
}
if (UAString.indexOf("Trident") !== -1 && UAString.indexOf("rv:10") !== -1)
{
  $('body').addClass('ie');
}


$(document).ready(function () {

  var bLazy = new Blazy({
    src: 'data-blazy' // Default is data-src
  });


  $('#menu-btn').click(function () {
    $(this).closest('header').toggleClass('menu-open');
    $('body').toggleClass('oh');
  });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header.menu-open').length === 0 && $('.header.menu-open').length > 0 && $(e.target).closest('#menu-btn').length === 0) {
      $('.header').removeClass('menu-open');
      $('body').removeClass('oh');
    }
  });

  $('.nav__item-arrow').click(function (e) {
    $(this).parent('.parent').toggleClass('open');
  });

  if($(document).width() < 992){
    $('.nav__triangle').click(function (e) {
      $(this).closest('.nav__item').toggleClass('open');
    });
  }
  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 150) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  // checking browser for WEBP
  hasWebP().then(function () {

    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var webp = $(this).data('webp');
        $(this).attr('data-blazy', webp);
      });
    } else {
      $('.webp-img').each(function () {
        var webp;
        if($(this).data('webp-mobile') !== undefined)
          webp = $(this).data('webp-mobile'); else webp = $(this).data('webp');
        console.log($(this).data('webp-mobile'));
        $(this).attr('data-blazy', webp);
      });
    }

    bLazy.revalidate();

  }, function () {
    if($(window).width() > 768) {
      $('.webp-img').each(function () {
        var img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    } else {
      $('.webp-img').each(function () {
        var img;
        if($(this).data('img-mobile') !== undefined)
          img = $(this).data('img-mobile'); else img = $(this).data('img');
        $(this).attr('data-blazy', img);
      });
    }

    bLazy.revalidate();
  });

  $('.phone').inputmask("+38 (999) 999-99-99");

  $('.magnific-popup').magnificPopup({
    delegate: 'a:not(.slick-cloned)',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300
    },
    removalDelay: 300,
    disableOn: 0,
    midClick: true,

  });


  /*popups start*/
  $(document).on('click', 'a[data-modal-class]', function (e) {
    e.preventDefault();
    var dataModalId = $(this).attr('data-modal-class');
    $('.popup.' + dataModalId + '').addClass('open');
    // $('body').addClass('oh');
    setTimeout(function () {
      bLazy.revalidate();
    },500)
  });

  $(document).on('click', '.popup__close', function (e) {
    $('.popup ').removeClass('open');
    // $('body').removeClass('oh');
  });

  $(document).on('click', '.popup', function (e) {
    if(e.target.classList[0] == "popup") {
      $('.popup ').removeClass('open');
      // $('body').removeClass('oh');
    }
  });
  /*popups end*/

  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 1) {
      $(".header").removeClass('scroll');
    } else {
      $(".header").addClass('scroll');
    }
  });

  /*validation start*/

  $('form .site-form__btn-i').click(function (e) {
    e.preventDefault();

    if($(this).closest('form').find('input[type="tel"]').length != 0) {
      var inputTel = $(this).closest('form').find('input[type="tel"]');
      if (inputTel.val().indexOf('_') === -1 && inputTel.val() != 0) {
        $(inputTel).closest('.site-form__input').addClass('correct');
        $(inputTel).closest('.site-form__input').removeClass('error-field');
      } else {
        $(inputTel).closest('.site-form__input').addClass('error-field');
        $(inputTel).closest('.site-form__input').removeClass('correct');
      }
    }

    if($(this).closest('form').find('input[type="email"]').length != 0) {
      var reg = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

      var input = $(this).closest('form').find('input[type="email"]');
      var email = $(this).closest('form').find('input[type="email"]').length > 0
        ? $(this).closest('form').find('input[type="email"]')
        : false;


      if (email.val() == "" && email !== false) {
        email.closest('.site-form__input').addClass('error-field');

      } else {
        if (reg.test(email.val()) == false) {
          email.closest('.site-form__input').addClass('error-field');
          email.closest('.site-form__input').removeClass('correct');

        } else {
          email.closest('.site-form__input').addClass('correct');
          email.closest('.site-form__input').removeClass('error-field');
        }
      }
    }

    // $(this).closest('form').find('input[type="text"]').each(function () {
    //   if($(this).val() === ''){
    //     $(this).closest('.site-form__input').addClass('error-field');
    //     $(this).closest('.site-form__input').removeClass('correct');
    //   } else {
    //     $(this).closest('.site-form__input').addClass('correct');
    //     $(this).closest('.site-form__input').removeClass('error-field');
    //   }
    // });

    if($(this).closest('form').find('.error-field').length == 0 && $(this).closest('form').find('.correct').length > 0){
      // $(this).closest('.site-form').addClass('submitted');
      $('.popup').removeClass('open');
      $('.callback-success').addClass('open');
      $(this).closest('form').find('.correct').removeClass('correct');
      // setTimeout(function () {
      //   $('.site-form').removeClass('submitted');
      //   $('.site-form').find('.correct').removeClass('correct');
      // },5000);
    }
  });

  $(document).on('click', '.header__phone-arrow', function (e) {
    $(this).closest('.header__phone').toggleClass('open');
  });

  $(document).on('click', function (e) {
    if($(e.target).closest('.header__phone.open').length === 0 ) {
      $('.header__phone').removeClass('open');
    }
  });


  if($(window).width() > 992) {
    var s = skrollr.init({
      forceHeight: false,
    });
  }

  $('#first-screen-slider-js').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  });
  $('#first-screen-slider-js').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    setTimeout(function(){
      bLazy.revalidate();
    }, 300);
  });

  if($(window).width() < 992) {

    $('.why-we__list').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
    });

    $('.our-services-slider-js').slick({
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      adaptiveHeight: true,
    });

    $('.our-services-slider-js').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      setTimeout(function(){
        bLazy.revalidate();
      }, 300);
    });
  }

	$('.block-slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		adaptiveHeight: true,
	});

	$('.block-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		setTimeout(function(){
			bLazy.revalidate();
		}, 300);
	});

  $('.block-info__big-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.block-info__small-slider',
    infinite: true,
  });
  $('.block-info__small-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.block-info__big-slider',
    dots: false,
    arrows: false,
    // centerMode: true,
    focusOnSelect: true,
    vertical: true,
    infinite: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          verticalSwiping: false,
          vertical: false,
        }
      }
    ]
  });


  $('.list-product__slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    focusOnSelect: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  AOS.init({
    disable: 'mobile',
    duration: 500
  });

  var numCounFlag = true;
  var formBgFlag = true;

  $(window).scroll(function(){
    var winScrollTop = $(this).scrollTop();

    if($('#about-num-count').length != 0) {
      var scrollToElem = $('#about-num-count').offset().top;
      // console.log(winScrollTop, scrollToElem );
      // console.log(winScrollTop > scrollToElem + 500 && $('#about-num-count').length > 0 && numCounFlag);
      if (winScrollTop > scrollToElem - 700 && $('#about-num-count').length > 0 && numCounFlag) {
        // console.log(numCounFlag);
        $('.num-block__item-num').each(function () {
          var $this = $(this);
          jQuery({Counter: 0}).animate({Counter: $this.text()}, {
            duration: 1000,
            easing: 'swing',
            step: function () {
              $this.text(Math.ceil(this.Counter));
            }
          });
        });
        numCounFlag = false;
      }
    }

    if($('.horizontal__bg').length > 0){
      var formBg = $('.horizontal__bg').offset().top;
      if(winScrollTop > formBg - 400 && $('.horizontal__bg').length > 0 && formBgFlag) {
        $('.horizontal__bg').addClass('show');
        setTimeout(function(){
          bLazy.revalidate();
        }, 100);
      }
    }

  });


  $(".vacancy__btn a").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $(".horizontal").first().offset().top -200
    }, 1000);
  });

  $(".catalog__side-menu-mobile-burger").click(function(e) {
    $(this).closest('.catalog__side-menu').find('.catalog__side-menu-list').toggleClass('open');
  });

  $('#file').on('change', function () {
    $('.file-name').html($(this).val().replace(/C:\\fakepath\\/i, ''));
    $('.file-remove').addClass('open');
  })

  $('.file-remove').click(function (e) {
    e.preventDefault();
    $('#file').val('');
    $('.file-name').html('');
    $(this).removeClass('open');
  });

  $(document).scroll(function () {
    var top = $(document).scrollTop();
    if (top < 150) {
      $(".site-btn-top").removeClass('show');
    } else {
      $(".site-btn-top").addClass('show');
    }
  });

  $(document).on('click', '.site-btn-top', function (e) {
    jQuery('html,body').animate({scrollTop: 0},800);
  });



// функция возвращает cookie с именем name, если есть, если нет, то undefined
  function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
  var alertwin = getCookie("alertwin");
  if (alertwin != "no") {
    $(document).mouseleave(function(e){
      if (e.clientY < 10) {
        $(".exitblock").addClass("open");
        // записываем cookie на 1 день, с которой мы не показываем окно
        var date = new Date;
        date.setDate(date.getDate() + 1);
        document.cookie = "alertwin=no; path=/; expires=" + date.toUTCString();
      }
    });
    $(document).click(function(e) {
      if (($(".exitblock").is(':visible')) && (!$(e.target).closest(".exitblock__content").length)) {
        $(".exitblock").remove();
      }
    });
  }

  if($(window).width() < 992){
    $(".all-categories").mCustomScrollbar({
      axis:"x",
      theme:"dark"
    });
  }


});


//script fro webp img and background
var hasWebP = (function () {
  // some small (2x1 px) test images for each feature
  var images = {
    basic: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
    lossless: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
  };

  return function (feature) {
    var deferred = $.Deferred();

    $("<img>").on("load", function () {
      // the images should have these dimensions
      if (this.width === 2 && this.height === 1) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).on("error", function () {
      deferred.reject();
    }).attr("src", images[feature || "basic"]);

    return deferred.promise();
  }
})();

