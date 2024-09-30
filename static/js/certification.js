window.addEventListener("load", () => {

    const prevButton = document.querySelector('.bot.prev');
        const nextButton = document.querySelector('.bot.next');
        const slides = document.querySelectorAll('.slide-ul .cert');
        let currentIndex = 0;

        // 새로운 이미지 세트
        const newImages = [
            {
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },
            {
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },{
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },{
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },{
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },
            {
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },{
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },{
                src: "{% static 'images/intro/cert/연구개발전담부서인정서.png' %}",
                text: "새로운 이미지 1"
            },
            // 추가 이미지들...
        ];

            nextButton.addEventListener('click', () => {
                slides.forEach((slide, index) =>  {
                    if (index < newImages.length) { // 배열의 길이만큼 반복
                        slide.querySelector('img').src = newImages[index].src; // 이미지 변경
                        slide.querySelector('.wrapper').textContent = newImages[index].text; // 텍스트 변경
                    }
                });
            });
            



})