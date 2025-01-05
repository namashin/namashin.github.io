document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(".nav-link");

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));
            if (targetElement) {
                targetElement.scrollIntoView({behavior: "smooth"});
            }
        });
    });

    // IntersectionObserver の設定
    const observerOptions = {
        root: null, // ビューポートをルートに設定
        threshold: 0.6 // セクションの60%が画面内に入ったらトリガー
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 現在表示されているセクションのIDを取得
                const currentSection = entry.target.getAttribute("id");

                // 対応するリンクを強調表示
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("data-section") === currentSection) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    // 各セクションを監視
    sections.forEach((section) => {
        observer.observe(section);
    });
});
