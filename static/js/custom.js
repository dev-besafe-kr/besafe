$(function(){
    $('.intro-list01.type-m').slick({
        swipe:true, 
        autoplay:false,
        pauseOnHover:false,
        slidesToShow:2,
        slidesToScroll:1,
        autoplaySpeed:7000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:false, 
        dots:true,
        responsive : [
            {
                breakpoint: 415,
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });
    
    var check = false;
    $('.nav-btn').on('click',function(e){
        if(check==false){
            $('header.type-m .nav').animate({'opacity':'1','left':'0'},700,'swing');
            $('.nav-btn .h-btn').addClass('on');
            check=true;
        }
        else{
            $('header.type-m .nav').animate({'opacity':'0','left':'-150px'},700,'swing');
            $('.nav-btn .h-btn').removeClass('on');
            check=false;
        }
    });

    var checkPlay = true;

    $('.playBtn').click(function(){
        if(checkPlay==true){
            $('.main-slider').slick('slickPause');
            $('.playBtn').attr("src","./images/play.png");

            checkPlay = false;
        }
        else{
            $('.main-slider').slick('slickPlay');
            $('.playBtn').attr("src","./images/pause.png");
            checkPlay = true;
        }
    });

    var $main_slider = $('.main-slider');
    var $main_progressBarLabel = $( '.main_slider__label' );
    var total = $('.main-slider li').length;
    $main_progressBarLabel.text('1/'+ total);
     $main_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
        
        $main_progressBarLabel.text( nextSlide+1 + '/' + slick.slideCount);
    });
    
    $('.main-slider').slick({
        swipe:true, 
        autoplay:true,
        pauseOnHover:false,
        slidesToShow:1.68,
        slidesToScroll:1,
        autoplaySpeed:7000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:true, 
        dots:false,
        responsive : [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });

    
    $('.pg2-list01').slick({
        swipe:true, 
        autoplay:true,
        pauseOnHover:false,
        slidesToShow:5,
        slidesToScroll:1,
        autoplaySpeed:3000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:false, 
        dots:false,
        responsive : [
            
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow:3
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow:2
                }
            },
            {
                breakpoint: 415,
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });


    var $slider = $('.pg3-list01');
    var $progressBar = $('.progress');
    var $progressBarLabel = $( '.slider__label' );
    var total = $('.pg3-list01 li').length;
    $progressBarLabel.text('1/'+ total);
     $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
        var calc = ( (nextSlide+1) / (slick.slideCount) ) * 100;
        
        $progressBar
        .css('background-size', calc + '% 100%')
        .attr('aria-valuenow', calc );
        
        $progressBarLabel.text( nextSlide+1 + '/' + slick.slideCount);
    });
    

    $('.pg3-list01').slick({
        swipe:true, 
        autoplay:true,
        pauseOnHover:false,
        slidesToShow:3,
        slidesToScroll:1,
        autoplaySpeed:7000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:true, 
        dots:false,
        prevArrow: $('#pg3-list-01-prev'),
        nextArrow: $('#pg3-list-01-next'),
        responsive : [
            
            {
                breakpoint: 415,
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });
    
    $('.pg4-list02').slick({
        swipe:true, 
        autoplay:false,
        pauseOnHover:false,
        slidesToShow:4,
        slidesToScroll:1,
        autoplaySpeed:7000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:true, 
        dots:false,
        prevArrow: $('.pg4-sec .arrow .prev'),
        nextArrow: $('.pg4-sec .arrow .next'),
        responsive : [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow:3
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow:2
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow:1.3
                }
            }
        ]
    });
     

    $('.pg5-list01').slick({
        swipe:true, 
        autoplay:true,
        pauseOnHover:false,
        slidesToShow:5,
        slidesToScroll:5,
        autoplaySpeed:5000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:false, 
        dots:false,
        responsive : [
            
            {
                breakpoint: 415,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:2
                }
            }
        ]
    });
    $('.pg5-list02').slick({
        swipe:true, 
        autoplay:true,
        pauseOnHover:false,
        slidesToShow:5,
        slidesToScroll:5,
        autoplaySpeed:5000, 
        speed:1000, 
        vertical:false, 
        fade:false, 
        arrows:false, 
        dots:false,
        rtl: true,
        responsive : [
            
            {
                breakpoint: 415,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:2
                }
            }
        ]
    });

    
    
    $('.pg1-list01 li').on('click',function(e){
        e.preventDefault();
        var num=$(this).index();
        if(num==0){
            $('.pg1-list01 li').removeClass('on');
            $(this).addClass('on');
            $('.pg1-list02 li').removeClass('on');
            $('#pg1-list02-01').addClass('on');
        }
        else if(num==1){
            $('.pg1-list01 li').removeClass('on');
            $(this).addClass('on');
            $('.pg1-list02 li').removeClass('on');
            $('#pg1-list02-02').addClass('on');
        }
        else if(num==2){
            $('.pg1-list01 li').removeClass('on');
            $(this).addClass('on');
            $('.pg1-list02 li').removeClass('on');
            $('#pg1-list02-03').addClass('on');
        }
        else if(num==3){
            $('.pg1-list01 li').removeClass('on');
            $(this).addClass('on');
            $('.pg1-list02 li').removeClass('on');
            $('#pg1-list02-04').addClass('on');
        }
    });

    
    var count=0;

    function timeCounter() {
        id = setInterval(countFn,300);
        function countFn(){
            count++;
            if(count > 26) {
                clearInterval(id);
            }else{
                $(".count").text(count);
            }
        }
    }
    
    
    var mapDiv = document.getElementById('map');
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(36.599511421322084, 127.29702231605454), 
        zoom: 18, //지도의 초기 줌 레벨
        minZoom: 8, //지도의 최소 줌 레벨
        zoomControl: true, //줌 컨트롤의 표시 여부
        zoomControlOptions: { //줌 컨트롤의 옵션
            position: naver.maps.Position.TOP_RIGHT
    }});
    var marker = new naver.maps.Marker({
        icon: {
            url: "/static/images/pg8_logo.png",
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
          },
        position: new naver.maps.LatLng(36.599511421322084, 127.29702231605454),
        map: map
    });

    
    $(".topBtn").click(function() { 
        $('html, body').animate({ scrollTop : 0 // 0 까지 animation 이동합니다. 
        }, 400); // 속도 400 
        return false; 
    }); 

    $(window).scroll( function(){
        if($(window).scrollTop() >0){
            $('header').addClass("on");
        }
        else{
            $('header').removeClass("on");
        }

        if($(window).scrollTop() > 800){
            $('.callBtn').fadeIn();
        }else{
            $('.callBtn').fadeOut();
        }
        if($(window).scrollTop() > 800){
            $('.topBtn').fadeIn();
        }else{
            $('.topBtn').fadeOut();
        }
        

        $('.pg1-sec .bottom .pg1-list02').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','margin-top':'0px'},400,'swing');
            }
        });  

        $('.pg2-sec').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).addClass('move01');
            }
            else if( bottom_of_window < bottom_of_element -200){
                $(this).removeClass('move01');
            }
        }); 

        $('.pg3-sec .pg3-list01').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','margin-top':'40px'},400,'swing');
            }
        }); 
        
        $('.pg4-sec .top .left-area .title').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','margin-top':'0px'},700,'swing');
            }
        }); 
        $('.pg4-sec .top .left-area .bar').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','margin-top':'20px'},700,'swing');
            }
            
        }); 
        $('.pg4-sec .top .left-area .work').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','margin-left':'0px'},700,'swing');
                timeCounter();
            }
        });  
        $('.pg4-sec .bottom .banner-zone').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1','top':'805px'},700,'swing');
            }
            //두개동시에
            if( bottom_of_window > bottom_of_element ){
                $('.pg4-sec .bottom .pg4-list02').animate({'opacity':'1','margin-top':'0px'},700,'swing');
            }
        });  

    });
})

const counter = ($counter, max) => {
    let now = max;
  
    const handle = setInterval(() => {
      $counter.innerHTML = Math.ceil(max - now);
    
      // 목표수치에 도달하면 정지
      if (now < 1) {
        clearInterval(handle);
      }
      
      // 증가되는 값이 계속하여 작아짐
      const step = now / 10;
      
      // 값을 적용시키면서 다음 차례에 영향을 끼침
      now -= step;
    }, 50);
}
