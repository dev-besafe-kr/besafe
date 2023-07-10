$(function(){
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
    
    $(".topBtn").click(function() { 
        $('html, body').animate({ scrollTop : 0 // 0 까지 animation 이동합니다. 
        }, 400); // 속도 400 
        return false; 
    }); 

    $(window).scroll( function(){
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
        if($(window).scrollTop() >0){
            $('header').addClass("on");
        }
        else{
            $('header').removeClass("on");
        }

    });
    

})