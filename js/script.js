

$(document).ready(function() {
    ///////// **searchbox** /////////
    $('.search-icon').click(function() {
      $('#search-overlay').fadeIn(200);
      $('.search-box').addClass("open_search-box");
    });
  
    $('.close-btn').click(function() {
      $('#search-overlay').fadeOut(200);
      $('.search-box').removeClass("open_search-box");
    });

    ///////// **mobile size** /////////
    $('#navbtn').click(function () {
      $('.main-nav').addClass('open-nav');
      $('.nav-overlay').addClass('on');
    });

    $('.close-nav').click(function () {
      $('.main-nav').removeClass('open-nav');
      $('.nav-overlay').removeClass('on');
    });

    $('.nav-overlay').click(function () {
      $('.close-nav').trigger('click');
    });
    
    ///////// **main Slider** /////////
    var mainSlider = new Swiper('.main-slider .swiper-container', {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        preloadImages: false,
        updateOnWindowResize: true,
        
            
        // If we need pagination
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },
        // Navigation arrows   
        navigation: {
            nextEl: '.main-slider .swiper-button-next',
            prevEl: '.main-slider .swiper-button-prev',
        },
        on: {
            init: function (swiper) {
              lazyLoad();
            },
          },
        });


        // Set the date we're counting down to
        var countDownDate = new Date("june 5, 2024 15:37:25").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

          // Get today's date and time
          var now = new Date().getTime();
            
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
            
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
          // Update individual div elements with the respective time units
          document.getElementById("days").innerHTML = days;
          document.getElementById("hours").innerHTML = hours;
          document.getElementById("minutes").innerHTML = minutes;
          document.getElementById("seconds").innerHTML = seconds;

          if (distance < 0) {
              clearInterval(x);
              document.getElementById("days").innerHTML = "0d";
              document.getElementById("hours").innerHTML = "0h";
              document.getElementById("minutes").innerHTML = "0m";
              document.getElementById("seconds").innerHTML = "0s";
          }
        }, 1000);

        
        /*************************statics *******************/
        $(window).scroll(staticsScroll);

        var viewed = false;
        
        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
        
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
        
            return elemBottom <= docViewBottom && elemTop >= docViewTop;
        }
        
        function staticsScroll() {
            if (isScrolledIntoView($(".stat-num")) && !viewed) {
                viewed = true;
                $(".stat-num").each(function() {
                    var $this = $(this),
                        countTo = $this.attr("data-count");
                    $({ countNum: $this.text() }).animate(
                        {
                            countNum: countTo
                        },
                        {
                            duration: 3000,
                            easing: "swing",
                            step: function() {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $this.text(this.countNum);
                            }
                        }
                    );
                });
            }
        }
        
});

/***********lazy load ************/
function lazyLoad() {
    const images = document.querySelectorAll(".lazy-img");

    const optionsLazyLoad = {
      //  rootMargin: '-50px',
      // threshold: 1
    };

    const imageObserver = new IntersectionObserver(function (enteries) {
      enteries.forEach(function (entery) {
        if (!entery.isIntersecting) {
          return;
        } else {
          preloadImage(entery.target);
          imageObserver.unobserve(entery.target);
        }
      });
    }, optionsLazyLoad);
  
    images.forEach(function (image) {
      imageObserver.observe(image);
    });
  }
  
  function preloadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.parentElement.classList.remove("loading-img");
      img.parentElement.classList.add("loaded-img");
      // img.parentElement.parentElement.classList.add("lazy-head-img");
    };
  }

