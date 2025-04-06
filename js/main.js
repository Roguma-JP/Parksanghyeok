/* es6 */
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    const menuBtn = document.querySelector(".menuBtn");
    const nav = document.querySelector(".nav");
    const closeBtn = document.querySelectorAll(".nav__header img, .nav__item a");
    const topBtn = document.getElementById("topBtn");
    const navLinks = document.querySelectorAll(".nav__item a, .footerNav__item a");

   // 🆕 about section toggle
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

            // 💡 padding이 적용된 다음에 높이 계산해야 정확함
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
    
// 페이지 진입 시 페이드 인
window.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 1;
});

// 페이지 이탈 시 페이드 아웃
const fadeLinks = document.querySelectorAll('a[href$=".html"]');

fadeLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");

        // 페이드 아웃 효과
        document.body.classList.add("fade-out");

        // 애니메이션 끝난 후 이동
        setTimeout(() => {
            window.location.href = href;
        }, 700); // CSS와 동일한 시간
    });
});
    
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
    // 로딩 후 약간의 시간 뒤에 위치 설정 (페이드인 겹침 방지)
    setTimeout(() => {
        updateTabBar(activeTab);
    }, 200);
}
});