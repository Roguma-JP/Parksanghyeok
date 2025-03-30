/* es6 */
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    const menuBtn = document.querySelector(".menuBtn");
    const nav = document.querySelector(".nav");
    const closeBtn = document.querySelectorAll(".nav__header img, .nav__item a");
    const topBtn = document.getElementById("topBtn");
    const navLinks = document.querySelectorAll(".nav__item a, .footerNav__item a");
    
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
});