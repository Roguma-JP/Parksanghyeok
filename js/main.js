document.addEventListener("DOMContentLoaded", function () {
    'use strict';

    const menuBtn = document.querySelector(".menuBtn");
    const nav = document.querySelector(".nav");
    const closeBtn = document.querySelectorAll(".nav__header img, .nav__item a");
    const topBtn = document.getElementById("topBtn");
    const navLinks = document.querySelectorAll(".nav__item a, .footerNav__item a");

    // about section toggle
    const aboutHeaders = document.querySelectorAll(".js-about-toggle");
    aboutHeaders.forEach((header) => {
        const parent = header.closest(".about");
        const arrow = header.querySelector(".about__arrow");
        const content = parent.querySelector(".about__content");

        header.addEventListener("click", () => {
            const isOpen = content.classList.contains("about__content--open");

            if (isOpen) {
                content.style.maxHeight = null;
                content.classList.remove("about__content--open");
            } else {
                content.classList.add("about__content--open");
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                }, 0);
            }

            arrow.classList.toggle("about__arrow--open");
        });
    });

    // トップへスムーズ移動
    function handleTopBtnClick(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        topBtn.classList.add("hidden");
    }

    // トップボタン表示/非表示
    function handleScroll() {
        if (window.scrollY === 0) {
            topBtn.classList.add("hidden");
        } else {
            topBtn.classList.remove("hidden");
        }
    }

    // セクションへスムーズ移動またはページ遷移
    function handleNavLinkClick(event) {
        const targetId = event.currentTarget.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetId.includes("index.html")) {
            window.location.href = targetId;
        } else {
            event.preventDefault();
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            if (nav && nav.classList.contains("active")) {
                nav.classList.remove("active");
            }
        }
    }

    // トップボタンイベント
    if (topBtn) {
        topBtn.addEventListener("click", handleTopBtnClick);
        window.addEventListener("scroll", handleScroll);
    }

    // メニュー表示
    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            nav.classList.add("active");
        });
    }

    // メニュー閉じる
    if (nav && closeBtn.length > 0) {
        closeBtn.forEach(function (btn) {
            btn.addEventListener("click", function () {
                nav.classList.remove("active");
            });
        });
    }

    // ナビイベント
    if (navLinks.length > 0) {
        navLinks.forEach(function (link) {
            link.addEventListener("click", handleNavLinkClick);
        });
    }

    // ✅ 페이지 진입 시 페이드 인
    document.body.style.opacity = 1;

    // ✅ 페이지 이탈 시 페이드 아웃
    const fadeLinks = document.querySelectorAll('a[href$=".html"]');
    fadeLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            document.body.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });

    // ✅ 스크롤 페이드 인 요소
    function handleScrollFade() {
        const fadeElements = document.querySelectorAll('.scroll-fade');
        const windowHeight = window.innerHeight;

        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const offset = 100;
            if (rect.top < windowHeight - offset) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('load', handleScrollFade);
    window.addEventListener('scroll', handleScrollFade);

    // ✅ 골드 바 탭 애니메이션
    const tabItems = document.querySelectorAll('.works__tabItem');
    const tabBar = document.querySelector('.works__tabBar');

    function updateTabBar(el) {
        const offsetLeft = el.offsetLeft;
        const width = el.offsetWidth;

        tabBar.style.left = offsetLeft + 'px';
        tabBar.style.width = width + 'px';
    }

    tabItems.forEach(item => {
        item.addEventListener('click', function () {
            tabItems.forEach(i => i.classList.remove('works__tabItem--active'));
            this.classList.add('works__tabItem--active');
            updateTabBar(this);
        });
    });

    const activeTab = document.querySelector('.works__tabItem--active');
    if (activeTab && tabBar) {
        setTimeout(() => {
            updateTabBar(activeTab);
        }, 200);
    }

    // ✅ hover 영상 재생
    document.querySelectorAll('.hoverVideo').forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
            video.load();
        });
    });

    // ✅ YouTube 썸네일 클릭 시 iframe 삽입
    document.querySelectorAll('.youtubeThumbnail').forEach(container => {
        const videoId = container.dataset.videoId;
        const iframe = document.createElement('iframe');

        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.width = "100%";
        iframe.height = "100%";

        container.addEventListener('click', () => {
            container.innerHTML = '';
            container.appendChild(iframe);
        });
    });
});
