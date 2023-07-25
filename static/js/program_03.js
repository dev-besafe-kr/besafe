$(function(){

    $('.nav .gnb .menu02 a').addClass('lineOpen');

    var typingBool00 = false;
    var typingBool01 = false;
    var typingBool02 = false;
    var typingBool03 = false;
    var typingBool04 = false;
    var typingBool05 = false;

    
    var typingIdx = 0;
    var typingTxt = "특허설계 서비스"; // 타이핑될 텍스트를 가져온다
    typingTxt = typingTxt.split(""); // 한글자씩 자른다.
    
    if (typingBool00 == false) {
      // 타이핑이 진행되지 않았다면
      typingBool00 = true;
  
      var tyInt = setInterval(typing, 130); // 반복동작
    }
    function typing() {
        if (typingIdx < typingTxt.length) {
          // 타이핑될 텍스트 길이만큼 반복
          $(".banner-sec h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
          typingIdx++;
        } else {
          clearInterval(tyInt); //끝나면 반복종료
        }
    }
    
    $('.banner-sec .title h5').animate({'opacity':'1'},2000,'swing');
    $('.banner-sec .title .minute').animate({'opacity':'1'},2500,'swing');
    $('.pg1-sec .title').animate({'opacity':'1'},2500,'swing');


    
    var count=0;

    function timeCounter() {
        id = setInterval(countFn,150);
        function countFn(){
            count++;
            if(count > 120) {
                clearInterval(id);
            }else{
                $(".count").text(count);
            }
        }
    }
    


    $(window).on('scroll',function(){


        var num=$(this).scrollTop();
        if(num >= 500){
            $('.pg1-sec .pg1-list01 li').animate({'opacity':'1','margin-top':'35px'},500,'swing');
            
        }
        $('.pg2-sec .contents-wrap').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element + 300 ){

                $('.pg2-sec .contents-wrap').animate({'opacity':'1','margin-top':'0'},900,'swing');
            }
        });  
        $('.pg3-sec .reason-title h3').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element && bottom_of_element!=0){
                var typingIdx = 0;
                var typingTxt = "이유1. 사전 보증으로 최대 1억원 자금조달"; // 타이핑될 텍스트를 가져온다
                typingTxt = typingTxt.split(""); // 한글자씩 자른다.
                
                if (typingBool01 == false) {
                  // 타이핑이 진행되지 않았다면
                  typingBool01 = true;
              
                  var tyInt = setInterval(typing, 130); // 반복동작
                }
                function typing() {
                    if (typingIdx < typingTxt.length) {
                      // 타이핑될 텍스트 길이만큼 반복
                      $(".pg3-sec .reason-title .type-pc h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
                      typingIdx++;
                    } else {
                      clearInterval(tyInt); //끝나면 반복종료
                    }
                }

                
                $('.pg3-sec .reason-title .type-pc.cont').animate({'opacity':'1','margin-top':'72px'},900,'swing');
                $('.pg3-sec .reason-title .type-m.cont').animate({'opacity':'1','margin-top':'40px'},900,'swing');
            }
        });  

        $('.pg4-sec .reason-title h3').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            console.log(bottom_of_window);
            console.log(bottom_of_element);
            
            if( bottom_of_window > bottom_of_element && bottom_of_element!=0){
                var typingIdx = 0;
                var typingTxt = "이유2. 특허권을 통해 저금리 자금조달"; // 타이핑될 텍스트를 가져온다
                typingTxt = typingTxt.split(""); // 한글자씩 자른다.
                
                if (typingBool02 == false) {
                  // 타이핑이 진행되지 않았다면
                  typingBool02 = true;
              
                  var tyInt = setInterval(typing, 130); // 반복동작
                }
                function typing() {
                    if (typingIdx < typingTxt.length) {
                      // 타이핑될 텍스트 길이만큼 반복
                      $(".pg4-sec .reason-title .type-pc h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
                      typingIdx++;
                    } else {
                      clearInterval(tyInt); //끝나면 반복종료
                    }
                }
                
            if( bottom_of_window > bottom_of_element +200 ){
                $('.pg4-sec .wrap-list').animate({'opacity':'1','margin-top':'30px'},800,'swing');
            }
               
            }
        });  

        $('.pg5-sec .reason-title h3').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element && bottom_of_element!=0){
                var typingIdx = 0;
                var typingTxt = "이유3. 일반사업자와의 명백한 차이"; // 타이핑될 텍스트를 가져온다
                typingTxt = typingTxt.split(""); // 한글자씩 자른다.
                
                if (typingBool03 == false) {
                  // 타이핑이 진행되지 않았다면
                  typingBool03 = true;
              
                  var tyInt = setInterval(typing, 130); // 반복동작
                }
                function typing() {
                    if (typingIdx < typingTxt.length) {
                      // 타이핑될 텍스트 길이만큼 반복
                      $(".pg5-sec .reason-title .type-pc h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
                      typingIdx++;
                    } else {
                      clearInterval(tyInt); //끝나면 반복종료
                    }
                }
                $('.pg5-sec .reason-title .type-pc.cont').animate({'opacity':'1','margin-top':'72px'},900,'swing');
                $('.pg5-sec .reason-title .type-m.cont').animate({'opacity':'1','margin-top':'40px'},900,'swing');
                
                if( bottom_of_window > bottom_of_element +1000 ){
                  $('.pg5-sec .contents-box .wrap-list .pg5-list01 li').animate({'opacity':'1','marginTop':'0'},700,'swing');
                }   
            }
        });  
        
        $('.pg6-sec .reason-title h3').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element && bottom_of_element!=0){
                var typingIdx = 0;
                var typingTxt = "이유4. 세금 절세 효과."; // 타이핑될 텍스트를 가져온다
                typingTxt = typingTxt.split(""); // 한글자씩 자른다.
                
                if (typingBool04 == false) {
                  // 타이핑이 진행되지 않았다면
                  typingBool04 = true;
              
                  var tyInt = setInterval(typing, 130); // 반복동작
                }
                function typing() {
                    if (typingIdx < typingTxt.length) {
                      // 타이핑될 텍스트 길이만큼 반복
                      $(".pg6-sec .reason-title .type-pc h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
                      typingIdx++;
                    } else {
                      clearInterval(tyInt); //끝나면 반복종료
                    }
                }
                $('.pg6-sec .reason-title .type-pc.cont').animate({'opacity':'1','margin-top':'72px'},900,'swing');
                $('.pg6-sec .reason-title .type-m.cont').animate({'opacity':'1','margin-top':'40px'},900,'swing');
            }
        });  
        
        $('.pg7-sec .reason-title h3').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_element && bottom_of_element!=0){
                var typingIdx = 0;
                var typingTxt = "이유5. 정부 지원사업 설계 & 기업인증에 활용"; // 타이핑될 텍스트를 가져온다
                typingTxt = typingTxt.split(""); // 한글자씩 자른다.
                
                if (typingBool05 == false) {
                  // 타이핑이 진행되지 않았다면
                  typingBool05 = true;
              
                  var tyInt = setInterval(typing, 130); // 반복동작
                }
                function typing() {
                    if (typingIdx < typingTxt.length) {
                      // 타이핑될 텍스트 길이만큼 반복
                      $(".pg7-sec .reason-title .type-pc h3").append(typingTxt[typingIdx]); // 한글자씩 이어준다.
                      typingIdx++;
                    } else {
                      clearInterval(tyInt); //끝나면 반복종료
                    }
                }
            }
            if( bottom_of_window > bottom_of_element +300 ){
              $('.pg7-sec .pg7-list01 .meritA').animate({'opacity':'1','margin-top':'0'},900,'swing');
            }
            if( bottom_of_window > bottom_of_element +700 ){
              $('.pg7-sec .pg7-list01 .meritB').animate({'opacity':'1','margin-top':'0'},900,'swing');
            }

            
        });  
        $('.pg8-sec').each( function(i){
            
          var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
          var bottom_of_window = $(window).scrollTop() + $(window).height();
          if( bottom_of_window > bottom_of_element -500 ){
            $('.pg8-sec .title .top').animate({'opacity':'1','margin-top':'0'},500,'swing');
            timeCounter();
          }
        });
        $('.pg8-sec .pg8-list01').each( function(i){
            
          var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
          var bottom_of_window = $(window).scrollTop() + $(window).height();
          if( bottom_of_window > bottom_of_element - 200 ){
            $('.pg8-sec .pg8-list01 li').animate({'opacity':'1','margin-top':'0'},400,'swing');
          }
        });
        $('.pg8-sec .box .review').each( function(i){
            
          var bottom_of_element = $(this).offset().top + $(this).outerHeight()/5;
          var bottom_of_window = $(window).scrollTop() + $(window).height();

          if( bottom_of_window > bottom_of_element +200){
            $('.pg8-sec .box .review .pg8-list02 .type-pc.first').animate({'opacity':'1','margin-top':'34px'},700,'swing');
            $('.pg8-sec .box .review .pg8-list02 .type-m.first').animate({'opacity':'1','margin-top':'50px'},700,'swing');
          }
          if( bottom_of_window > bottom_of_element +600){
            $('.pg8-sec .box .review .pg8-list02 .type-pc.second').animate({'opacity':'1','margin-top':'34px'},700,'swing');
            $('.pg8-sec .box .review .pg8-list02 .type-m.second').animate({'opacity':'1','margin-top':'10px'},700,'swing');
          }
          if( bottom_of_window > bottom_of_element +1000){
            $('.pg8-sec .box .review .pg8-list02 .type-pc.third').animate({'opacity':'1','margin-top':'34px'},700,'swing');
            $('.pg8-sec .box .review .pg8-list02 .type-m.third').animate({'opacity':'1','margin-top':'10px'},700,'swing');
          }
        });

    });
    

});
