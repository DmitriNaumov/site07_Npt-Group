$(function () {

    'use strict';


    //OS windows or mac
    $(function () {
        var mac = 0;
        if (navigator.userAgent.indexOf('Mac') > 0) {
            mac = 1;
        } else {
            mac = 0;
        }

        if (1 == mac) {
            $('body').addClass('mac-os');
        } else {
            $("body").addClass('win-os');
        }
    });

    if ($('.home_page').length === 1) {
        if ($(window).width() > 992) {
            gsap.registerPlugin(ScrollTrigger);
        }
    }


    $('.lazy-img').Lazy({
        effect: 'fadeIn',
        effectTime: 1000,
        afterLoad: function (element) {
            let imageSrc = element.data('src');
            element.addClass('load-img');
        }
    });


    //popup
    function formThxPopup() {
        $(document).mouseup(function (e) {
            let container = $(".popup__form-ok, .popup__form-join, .popup__sertificat");
            if (container.has(e.target).length === 0) {
                container.removeClass('active_p');
                $('html,body').removeClass('active_p');
            }
        });
    }
    formThxPopup();


    //popup team join
    function teamJoin() {
        $('.team__join-form').click(function () {
            $('.popup__form-join').addClass('active_p');
            $('html, body').addClass('active_p');
        });

        $('.popup-join__close').click(function () {
            $('.popup__form-join').removeClass('active_p');
            $('html, body').removeClass('active_p');
        });
    }
    teamJoin();


    function animHomeImg() {
        let onepathEls = document.querySelectorAll('.demo-one path, .demo-one circle, .demo-one ellipse, .demo-one g path');
        for (let i = 0; i < onepathEls.length; i++) {
            let onepathEl = onepathEls[i];
            let offset = anime.setDashoffset(onepathEl);
            onepathEl.setAttribute('stroke-dashoffset', offset);

            let animation = anime({
                targets: onepathEl,
                strokeDashoffset: [offset, 0],
                duration: 2500,
                delay: anime.random(0, 1500),
                easing: 'easeInOutSine',
                autoplay: true
            });
        }
        setTimeout(function () {
            $('.img-fill').css('opacity', '1');
        }, 3300);
    }
    if ($('.home_page').length === 1) {
        animHomeImg();
    }


    // ---- navigation mobile menu ---- //
    function animMobileMenu() {

        $('.nav__mobile-item .drop-menu').click(function (e) {
            e.preventDefault();
            $(this).toggleClass('active_arr');
            $(this).next().slideToggle();
        });

        let tl = gsap.timeline({ paused: true });

        tl.to(".nav__mobile", 1, {
            x: 0,
            ease: Expo.easeInOut
        });
        tl.staggerFrom(".nav__mobile-item .nav__link, .nav__mobile-lang, .nav__mobile-address-mail, .nav__mobile-street", 0.8, {
            y: 100,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.6");

        tl.reverse();
        $(document).on("click", ".burger", function () {
            $('html, body, .burger, .img-logo-g, .img-logo').toggleClass('active');
            tl.reversed(!tl.reversed());
        });
    }
    animMobileMenu();


    //mobile footer menu
    function footerMobileMenu() {
        $('.footer__item .drop-menu').click(function (e) {
            e.preventDefault();
        });
    }
    if ($(window).width() < 993) {
        footerMobileMenu();
    }


    //home map slider
    function zoneMapSl() {
        $('#zone-slidewrapper').slick({
            infinite: true,
            speed: 500,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            cssEase: 'linear',
            arrows: false
        });

        $('.map-item_0').click(function () {
            $('#zone-slidewrapper').slick('goTo', 0);
        });
        $('.map-item_1').click(function () {
            $('#zone-slidewrapper').slick('goTo', 1);
        });
        $('.map-item_2').click(function () {
            $('#zone-slidewrapper').slick('goTo', 2);
        });
        $('.map-item_3').click(function () {
            $('#zone-slidewrapper').slick('goTo', 3);
        });
        $('.map-item_4').click(function () {
            $('#zone-slidewrapper').slick('goTo', 4);
        });
    }
    if ($('.home_page').length === 1) {
        zoneMapSl();
    }


    //popup sertificat
    function popupSertificate() {
        let $li = $('.sertificate__bl').find('> li'),
            $links = $li.find('> .sertificate__item-img'),
            $lightbox = $('.popup__sertificat'),
            $prev = $('.popup__sertificat-prev'),
            $next = $('.popup__sertificat-next'),
            liIndex,
            targetImg;

        function replaceImg(src) {
            $lightbox.find('img').attr('src', src);
        }

        function getHref(index) {
            return $li.eq(index).find('> .sertificate__item-img').attr('data-galery');
        }

        $links.click(function () {
            liIndex = $(this).parent().index();
            targetImg = $(this).attr('data-galery');

            replaceImg(targetImg);

            $lightbox.find('img').on('load', function () {
                setTimeout(function () {
                    $('.popup__sertificate-loader').addClass('load-p');
                    $('.popup__sertificat-img').addClass('active-im');
                }, 100);
            });

            $lightbox.addClass('active_p');
            $('html, body').addClass('active_p');
        });

        $('.sertif_close').click(function () {
            $lightbox.removeClass('active_p');
            $('html, body').removeClass('active_p');
        });

        $next.click(function () {
            if ((liIndex + 1) < $li.length) {
                targetImg = getHref(liIndex + 1);
                liIndex++;
            } else {
                targetImg = getHref(0);
                liIndex = 0;
            }
            replaceImg(targetImg);
            $('.popup__sertificate-loader').removeClass('load-p');
            $('.popup__sertificat-img').removeClass('active-im');
            $lightbox.find('img').on('load', function () {
                setTimeout(function () {
                    $('.popup__sertificate-loader').addClass('load-p');
                    $('.popup__sertificat-img').addClass('active-im');
                }, 100);
            });
        });

        $prev.click(function () {
            if (liIndex > 0) {
                targetImg = getHref(liIndex - 1);
                liIndex--;
            } else {
                targetImg = getHref($li.length - 1);
                liIndex = $li.length - 1;
            }
            replaceImg(targetImg);
            $('.popup__sertificate-loader').removeClass('load-p');
            $('.popup__sertificat-img').removeClass('active-im');
            $lightbox.find('img').on('load', function () {
                setTimeout(function () {
                    $('.popup__sertificate-loader').addClass('load-p');
                    $('.popup__sertificat-img').addClass('active-im');
                }, 100);
            });
        });
    }
    popupSertificate();


    //marqueeText
    function marqueeText() {

        $('.header__marquee').marquee({
            pauseOnHover: true,
            startVisible: true,
            duplicated: true,
            duration: 40000,
            delayBeforeStart: 0
        });
    }
    if ($('.home_page').length === 1) {
        marqueeText();
    }


    //anim home map
    function animCardMapHome() {

        const gsapCard = gsap.timeline({ paused: true });

        gsapCard.staggerFrom("#zone-viewport, .zone-map__item", 0.8, {
            top: 5,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.09", "+=0.1");
        gsapCard.reverse();

        let flag = true;
        $(window).scroll(function () {
            if (!flag) return false;

            let scrollDock = $(document).scrollTop();
            let scrollWork = $('.zone-map__card').offset().top;

            if (scrollDock + 600 >= scrollWork) {
                gsapCard.reversed(!gsapCard.reversed());
                flag = false;
            }
        });
    }
    if ($('.home_page').length === 1) {
        if ($(window).width() > 992) {
            animCardMapHome();
        }
    }

    //anim contacts_page
    function animContactPage() {

        const gsapPhone = gsap.timeline({ paused: true });

        gsapPhone.staggerFrom(".contacts-orgnizations__item", 1, {
            top: 5,
            opacity: 0,
            ease: Expo.easeInOut
        }, "0.1", "-=0.9");
        gsapPhone.reverse();

        let flag = true;
        $(window).scroll(function () {
            if (!flag) return false;

            let scrollDock = $(document).scrollTop();
            let scrollWork = $('.contacts-orgnizations__wrapp').offset().top;

            if (scrollDock + 700 >= scrollWork) {
                gsapPhone.reversed(!gsapPhone.reversed());
                flag = false;
            }
        });
    }
    if ($('.contacts_page').length === 1) {
        animContactPage();
    }

    //slideCursor
    function slideCursor() {
        $('.scroll-slider__sl').on('mousemove', function (e) {
            let x = e.offsetX;
            let y = e.offsetY;
            $('.bg-im_c').css('clip-path', 'circle(200px at ' + x + 'px ' + y + 'px)');
        });
    }
    if ($('.home_page').length === 1) {
        if ($(window).width() > 992) {
            slideCursor();
        }
    }


    //scrollTrig
    function scrollTrig() {

        let scrollSliderWrapp = $('.scroll-slider__wrapp').width();
        let scrollSliderSl = $('.scroll-slider__sl').outerWidth(true);
        let scrollSliderSlLenght = $('.scroll-slider__sl').length;
        let scrollSliderSlWidth = scrollSliderSl * scrollSliderSlLenght;
        let scrollSliderTransform = (scrollSliderSlWidth - scrollSliderWrapp) - 100;

        let winHeight = $(window).height();
        let slHeight = $('.scroll-slider__sl').height();
        let startScrollTrig = (winHeight - slHeight) / 2;

        gsap.to(".scroll-slider__wrapp", {
            scrollTrigger: {
                trigger: ".scroll-slider",
                start: "-" + startScrollTrig + "px -50px",
                end: () => '+=' + scrollSliderSlWidth,
                scrub: true,
                pin: true
            },
            x: "-" + scrollSliderTransform + "px"
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }
    if ($('.home_page').length === 1) {
        if ($(window).width() > 1024) {
            scrollTrig();
        }
    }

    function sliderHome() {
        var slideNow = 1;
        var slideCount = $('#slidewrapper').children().length;
        var navBtnId = 0;
        var translateWidth = 0;

        function nextSlide() {
            if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                $('#slidewrapper').css('transform', 'translate(0, 0)');
                slideNow = 1;
                $('.slide-nav-btn').removeClass('active');
                $('.slide-nav-btn:nth-child(1)').addClass('active');
            } else {
                translateWidth = -$('#viewport').width() * (slideNow);
                $('#slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow++;
                $('.slide-nav-btn').removeClass('active');
                $('.slide-nav-btn:nth-child(' + slideNow + ')').addClass('active');
            }
        }

        function prevSlide() {
            if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
                translateWidth = -$('#viewport').width() * (slideCount - 1);
                $('#slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow = slideCount;
                $('.slide-nav-btn').removeClass('active');
                $('.slide-nav-btn:nth-child(' + slideNow + ')').addClass('active');
            } else {
                translateWidth = -$('#viewport').width() * (slideNow - 2);
                $('#slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow--;
                $('.slide-nav-btn').removeClass('active');
                $('.slide-nav-btn:nth-child(' + slideNow + ')').addClass('active');
            }
        }

        $('.slide-nav-btn').click(function () {
            navBtnId = $(this).index();
            $('.slide-nav-btn').removeClass('active');
            $(this).addClass('active');
            if (navBtnId + 1 != slideNow) {
                translateWidth = -$('#viewport').width() * (navBtnId);
                $('#slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow = navBtnId + 1;
            }
        });

        $('.scroll-slider #viewport').swipe({
            swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {
                if (phase == "start") {
                    // сработает в начале swipe
                }
                if (phase == "end") {
                    //сработает через 20 пикселей то число которое выбрали в threshold
                    if (direction == 'left') {
                        //сработает при движении влево
                        nextSlide();
                    }
                    if (direction == 'right') {
                        //сработает при движении вправо
                        prevSlide();
                    }
                    if (direction == 'up') {
                        //сработает при движении вправо
                        let box = $('html, body');
                        box.stop().animate({
                            scrollTop: '+=' + distance * 2
                        });
                        // $('html, body').stop().animate({ scrollTop: distance }, 350);
                    }
                    if (direction == 'down') {
                        //сработает при движении вправо
                        let box = $('html, body');
                        box.stop().animate({
                            scrollTop: '-=' + distance * 2
                        });
                    }
                }
            }
        });
    }

    if ($('.home_page').length === 1) {
        if ($(window).width() < 1025) {
            sliderHome();
        }
    }


    //update page
    function updatePage() {

        let curWidth = $(window).width();

        $(window).resize(function () {
            if ($(window).width() <= 1025 && curWidth > 1025) {
                //reload
                location.reload();
            }
            else if ($(window).width() > 1025 && curWidth <= 1025) {
                //reload
                location.reload();
            }
        });
    }
    if ($('.home_page').length === 1) {
        updatePage();
    }


    //drag bl + custom cursor
    function dragBl() {

        let isDown = false;
        let startX;
        let scrollLeft;
        const slider = document.querySelector('.drag_scroll');

        const end = () => {
            isDown = false;
            slider.classList.remove('active');
        }

        const start = (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        }

        const move = (e) => {
            if (!isDown) return;

            e.preventDefault();
            const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
            const dist = (x - startX);
            slider.scrollLeft = scrollLeft - dist;
        }

        (() => {
            slider.addEventListener('mousedown', start);
            slider.addEventListener('touchstart', start);

            slider.addEventListener('mousemove', move);
            slider.addEventListener('touchmove', move);

            slider.addEventListener('mouseleave', end);
            slider.addEventListener('mouseup', end);
            slider.addEventListener('touchend', end);
        })();

    }

    function customCursor() {
        $('.drag_scroll').hover(function () {
            $('#scene').on('mousemove', function (e) {
                //cursor coord
                let x = e.clientX;

                //custom cursor width
                let custCursorBl = $('.cust-cursor__bl').width();
                let custCursorWr = $('.cust-cursor__wr').width();
                let custCursorWidth = (custCursorBl - custCursorWr) / 2;

                //cursor pos itog
                let cursorWidth = $('.custom_cursor').width();
                let cursorTransf = cursorWidth / 2;
                let xPos = x - cursorTransf - custCursorWidth;
                $('.custom_cursor').css('left', xPos + 'px');
            });
        }, function () {
            $('#scene').off("mousemove");
        });
    }
    customCursor();
    if ($('.home_page').length === 1 || $('.serv_page-1').length === 1 || $('.serv_page-3').length === 1 || $('.serv_page-5').length === 1 || $('.portfolio_page').length === 1) {
        if ($(window).width() > 992) {
            dragBl();
            customCursor();
        }
    }


    //portfolioPageSlider
    function portfolioPageSlider() {
        let slideNow = 1;
        let slideCount = $('#portfolio-page_slidewrapper').children().length;
        $('.portfolio-page_slide-count').html(slideCount);
        let translateWidth = 0;
        function nextSlide() {
            if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
                $('#portfolio-page_next').addClass('disabled');
            } else {
                $('#portfolio-page_next').removeClass('disabled');
                translateWidth = -$('#portfolio-page_viewport').width() * (slideNow);
                $('#portfolio-page_slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow++;
                $('.portfolio-page_slide-curent').html(slideNow);
            }
        }

        function prevSlide() {
            if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
                $('#portfolio-page_prev').addClass('disabled');
            } else {
                $('#portfolio-page_prev').removeClass('disabled');
                translateWidth = -$('#portfolio-page_viewport').width() * (slideNow - 2);
                $('#portfolio-page_slidewrapper').css({
                    'transform': 'translate(' + translateWidth + 'px, 0)',
                    '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                    '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                });
                slideNow--;
                $('.portfolio-page_slide-curent').html(slideNow);
            }
        }

        $('#portfolio-page_prev').click(function () {
            prevSlide();
        });
        $('#portfolio-page_next').click(function () {
            nextSlide();
        });

        $('#portfolio-page_viewport').swipe({
            swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection) {

                if (phase == "start") {
                    // сработает в начале swipe
                }
                if (phase == "end") {
                    //сработает через 20 пикселей то число которое выбрали в threshold
                    if (direction == 'left') {
                        //сработает при движении влево
                        nextSlide();
                    }
                    if (direction == 'right') {
                        //сработает при движении вправо
                        prevSlide();
                    }
                    if (direction == 'up') {
                        //сработает при движении вправо
                        let box = $('html, body');
                        box.stop().animate({
                            scrollTop: '+=' + distance * 2
                        });
                        // $('html, body').stop().animate({ scrollTop: distance }, 350);
                    }
                    if (direction == 'down') {
                        //сработает при движении вправо
                        let box = $('html, body');
                        box.stop().animate({
                            scrollTop: '-=' + distance * 2
                        });
                    }
                }
            }
        });
    }
    if ($('.portfolio_item').length === 1) {
        portfolioPageSlider();
    }


    //accordion
    function servAccordion() {
        let topItem = $('.accordion-item_first');
        topItem.on('click', function () {
            let timeAnim = 250;
            $(this).toggleClass('active');
            $(this).find('.accordion-head_first').next().slideToggle(timeAnim);
        });

        let topItemS = $('.accordion-item_second');
        topItemS.on('click', function () {
            let timeAnimS = 250;
            $(this).toggleClass('active');
            $(this).find('.accordion-head_second').next().slideToggle(timeAnimS);
        });
    }
    if ($('.serv_page').length === 1) {
        servAccordion();
    }


    //form settings
    function formLineAnimate() {
        $('.form__item input, .form__item-textarea textarea')
            .focus(function () {
                $(this).prev('.form__item-placeholder').addClass('active');
            })
            .focusout(function () {
                if ($(this).val() < 1) {
                    $(this).prev('.form__item-placeholder').removeClass('active');
                }
            });
    }
    formLineAnimate();


    $("#form").validate({
        rules: {
            name: {
                required: true
            },
            tel: {
                required: true
            },
            mail: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Ошибка. Заполниете это поле"
            },
            tel: {
                required: "Ошибка. Заполниете это поле"
            },
            mail: {
                required: "Ошибка. Заполниете это поле",
                email: "Введите действительный адрес электронной почты",
            }
        },
        submitHandler: function () {
            $("form#form").trigger('reset');
            $('.popup__form-ok').addClass('active_p');
            $('.form__item-placeholder').removeClass('active');
            $('html,body').addClass('active_p');
        }
    });


    //popupFormLineAnimate
    function popupFormLineAnimate() {
        $('.popup-form__item input, .popup-form__item-textarea textarea')
            .focus(function () {
                $(this).prev('.popup-form__item-placeholder').addClass('active');
            })
            .focusout(function () {
                if ($(this).val() < 1) {
                    $(this).prev('.popup-form__item-placeholder').removeClass('active');
                }
            });
    }
    popupFormLineAnimate();

    $(".popup__form-join-form").validate({
        rules: {
            name: {
                required: true
            },
            tel2: {
                required: true
            },
            position: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Ошибка. Заполниете это поле"
            },
            tel2: {
                required: "Ошибка. Заполниете это поле"
            },
            position: {
                required: "Ошибка. Заполниете это поле"
            }
        },
        submitHandler: function () {
            $("form.popup__form-join-form").trigger('reset');
            $('.popup-form__item-placeholder').removeClass('active');
            $('html,body').addClass('active_p');
        }
    });


    //input file
    function inputFile() {
        var $attach = $('#attach-project-file'),
            $remove = $('#remove-project-file'),
            $name = $('#attached-project-file');

        // initially hide the remove button
        $remove.hide();

        // do this when file input has changed
        // i.e.: a file has been selected
        $attach.on('change', function () {
            var val = $(this).val();
            if (val !== '') {
                // if value different than empty

                // show the file name as text
                // hide/text/fadeIn creates a nice effect when changing the text
                $name
                    .hide()
                    .text(val)
                    .fadeIn();

                // show the remove button
                $remove.fadeIn();
            } else {
                // if value empty, means the file has been removed

                // show the default text
                $name
                    .hide()
                    .html('Нажмите, чтобы загрузить резюме<br>в формате PDF')
                    .fadeIn();

                // hide remove button
                $remove.fadeOut();
            }
        });

        // remove selected file when clicking the remove button
        // prevent click bubbling to the parent label and triggering file selection
        $remove.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $attach
                .val('')
                .change(); // trigger change event
        });
    }
    inputFile();


    // buttonMore
    function buttonMore() {
        $('.btn-more_contact').click(function () {
            $(this).toggleClass('active');
            $('.contacts-orgnizations__item:nth-last-child(-n+3)').slideToggle();
        });
    }
    buttonMore();


    // portfolioFilter
    function portfolioFilter() {
        $('.portfolio__mobile-filter-li').click(function () {
            $('.portfolio__mobile-filter-li').removeClass('active-f');
            $(this).addClass('active-f');

            let targetItem = $(this).data('target');
            $('.portfolio__item').hide();
            $('.' + targetItem).show();
        });
    }
    portfolioFilter();


    // services__tab-content-map
    function servClickCity() {
        $('.services__map-city').click(function () {
            $(this).toggleClass('active-city');
            $('.scroll-wrapper').toggleClass('active-city');
        });

        $('.services__map-city-item').click(function () {
            $('.services__map-city-item').removeClass('active-city');
            $(this).addClass('active-city');

            let targetPointC = $(this).data('point');
            $('.services__point_map .services__point_map-circle').removeClass('active-city');
            $('.' + targetPointC).addClass('active-city');
        });

        $(document).click(function (e) {
            if ($(e.target).closest('.services__map-city').length) {
                return;
            }
            $('.services__map-city, .scroll-wrapper').removeClass('active-city');
            $('.services__point_map .services__point_map-circle').removeClass('active-city');
        });
    }
    if ($(window).width() > 768) {
        servClickCity();
    }


    //nav policy link
    // Cache selectors
    let lastId,
        topMenu = $(".policy__nav"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - 20
        }, 300);
        e.preventDefault();
        return false;
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        let fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        let cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("policy_active")
                .end().filter("[href='#" + id + "']").parent().addClass("policy_active");
        }
    });


    function policyFixedBl() {
        $(window).scroll(function () {
            let scrollDock = $(document).scrollTop();
            let scrollWork = $('.policy__wrapp').offset().top;
            let scrollFooter = $('.footer').offset().top;
            console.log("footer" + scrollFooter);
            console.log("dock" + scrollDock);

            if (scrollDock + 50 >= scrollWork) {
                $('.right__bl').addClass('policy_a');
            } else {
                $('.right__bl').removeClass('policy_a');
            }
            if (scrollDock > scrollFooter) {
                alert('hello');
            }
        });


        var block_show = null;
        function scrollTracking() {
            var wt = $(window).scrollTop();
            var wh = $(window).height();
            var et = $('.footer').offset().top;
            var eh = $('.footer').outerHeight();

            if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
                if (block_show == null || block_show == false) {
                    $('.right__bl').addClass('policy_end');
                }
                block_show = true;
            } else {
                if (block_show == null || block_show == true) {
                    $('.right__bl').removeClass('policy_end');
                }
                block_show = false;
            }
        }

        $(window).scroll(function () {
            scrollTracking();
        });

        $(document).ready(function () {
            scrollTracking();
        });
    }
    if ($('.policy_page').length === 1) {
        policyFixedBl();
    }


    //aos-plugin init
    function aosPlugin() {
        AOS.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: true, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 1000, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

        });
    }
    if ($('.contacts_page').length === 1) {
        aosPlugin();
    }


    //popup serv
    function popupServ() {
        $(document).mouseup(function (e) {
            let container = $(".popup__form-serv");
            if (container.has(e.target).length === 0) {
                container.removeClass('active_serv');
                $('html,body').removeClass('active_serv');
            }
        });

        $('.services__tab-item').click(function (e) {
            e.preventDefault();
            $('html,body,.popup__form-serv').addClass('active_serv');
        });
        $('.popup__serv-close').click(function () {
            $('html,body,.popup__form-serv').removeClass('active_serv');
        })
    }
    if ($('.serv_page').length === 1) {
        if ($(window).width() < 993) {
            popupServ();
        }
    }


    //maskTel
    function maskTel() {
        let elements = document.getElementsByClassName('form-mask');
        for (let i = 0; i < elements.length; i++) {
            new IMask(elements[i], {
                mask: '+7(000)000-00-00'
            });
        }
    }

    if ($('.mask').length === 1) {
        maskTel();
    }

});