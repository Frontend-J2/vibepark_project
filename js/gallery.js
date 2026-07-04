const images = [...document.querySelectorAll('.galery_slide_item')];
            const prev = document.getElementById('prev_btn');
            const next = document.getElementById('next_btn');
            const h2 = document.getElementById('h2');
            const p = document.getElementById('p');
            /*const description = [{  title: "Kép 1",
                                    text: "Ez az első kép leírása."
                                },
                                {   title: "Kép 2",
                                    text: "Ez a második kép leírása."
                                },
                                {   title: "Kép 3",
                                    text: "Ez a harmadik kép leírása."
                                },
                                {   title: "Kép 4",
                                    text: "Ez a negyedik kép leírása."
                                },
                                {   title: "Kép 5",
                                    text: "Ez az ötödik kép leírása."
                                },
                                {   title: "Kép 6",
                                    text: "Ez a hatodik kép leírása."
                                }];*/
            let activeIndex = 0;
            updateImg();

            prev.addEventListener('click', () => {
                activeIndex = activeIndex - 1;
                if (activeIndex < 0){
                    activeIndex = images.length - 1;
                }
                updateImg();
            });
            next.addEventListener('click', () => {
                activeIndex = activeIndex + 1;
                if (activeIndex > images.length - 1){
                    activeIndex = 0;
                }
                updateImg();
            });

            function updateImg(){
                let leftIndex = activeIndex - 1;
                if (leftIndex === -1){
                    leftIndex = images.length -1;
                }

                let leftFarIndex = activeIndex - 2;
                if (leftFarIndex === -1){
                    leftFarIndex = images.length -1;
                }
                if (leftFarIndex === -2){
                    leftFarIndex = images.length -2;
                }

                let rightIndex = activeIndex + 1;
                if (rightIndex === images.length){
                    rightIndex = 0;
                }

                let rightFarIndex = activeIndex + 2;
                if (rightFarIndex === images.length){
                    rightFarIndex = 0;
                }
                if (rightFarIndex === images.length + 1){
                    rightFarIndex = 1;
                }
                

                images.forEach((img, index) => {
                    img.classList.remove('active',
                                        'left',
                                        'right',
                                        'far_left',
                                        'far_right',
                                        'hide');

                    if (activeIndex === index){
                        img.classList.add('active');
                        //h2.innerText = description[activeIndex].title;
                        //p.innerText = description[activeIndex].text;
                    }
                    if (index === rightIndex){
                        img.classList.add('right');
                    }
                    if (index === rightFarIndex){
                        img.classList.add('far_right')
                    }
                    if (index === leftIndex){
                        img.classList.add('left')
                    }
                    if (index === leftFarIndex){
                        img.classList.add('far_left')
                    } 
                    if (index !== activeIndex && index !== leftIndex && index !== rightIndex && index !== leftFarIndex &&index !== rightFarIndex){
                        img.classList.add('hide')
                    }
                });
            };


            const container = document.querySelector('.galery_slide_container');

            container.addEventListener('click', (e) => {
                const slide = e.target.closest('.galery_slide_item');
                if (!slide) return;
                if (slide.classList.contains('right')) {
                    activeIndex += 1;
                }
                if (slide.classList.contains('far_right')) {
                    activeIndex += 2;
                }
                if (slide.classList.contains('left')) {
                    activeIndex -= 1;
                }
                if (slide.classList.contains('far_left')) {
                    activeIndex -= 2;
                }
                // körbeforgatás
                while (activeIndex < 0) {
                    activeIndex += images.length;
                }
                while (activeIndex >= images.length) {
                    activeIndex -= images.length;
                }
                updateImg();
            });