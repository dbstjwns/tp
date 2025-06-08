document.addEventListener('DOMContentLoaded', function () {
    fetch('setting_modal1.html')
        .then(response => response.text())
        .then(result => {
            document.body.insertAdjacentHTML('beforeend', result);

            return fetch('setting_modal2.html');
        })
        .then(response => response.text())
        .then(result => {
            document.body.insertAdjacentHTML('beforeend', result);

            // 페이지 상단이동
            const moveUpBtn = document.querySelector("#move_up_btn");
            if (moveUpBtn) {
                moveUpBtn.addEventListener("click", function () {
                    console.log("위로이동 클릭");
                    window.scrollTo(0, 0);
                });
            }
            function closeModal() {
                if (modal2) {
                    modal2.style.display = 'none';
                    isShow = false;
                }
            } 

            // 모달 토글
            const settingBtn = document.querySelector("#setting_btn");
            const modal2 = document.querySelector("#modal_son");
            let isShow = false;

            if (settingBtn && modal2) {
                settingBtn.addEventListener("click", function (e) {
                    e.stopPropagation(); // 추가
                    if (isShow) {
                        closeModal(); // 변경
                    } else {
                        modal2.style.display = 'block';
                        isShow = true;
                    }
                });
            }
            // 추가된 이벤트들
            // 모달 내부 클릭 시 닫히지 않도록 방지
            modal2.addEventListener("click", function (e) {
                e.stopPropagation();
            });

            // 모달 외부 클릭 시 닫기
            document.addEventListener("click", function () {
                if (isShow) {
                    closeModal();
                }
            });

            // ESC 키로 모달 닫기
            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && isShow) {
                    closeModal();
                }
            });

            // 글자 크기 변경
            const textSizeItems = document.querySelectorAll('[data-size]');
            textSizeItems.forEach(item => {
                item.addEventListener('click', function () {
                    // 같은 섹션의 다른 아이템들에서 active 제거
                    textSizeItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');

                    // 페이지에 텍스트 크기 적용
                    const size = this.dataset.size;
                    document.body.className = document.body.className.replace(/text-(small|medium|large)/g, '');
                    document.body.classList.add(`text-${size}`);
                });
            });

            // 테마 변경
            const themeItems = document.querySelectorAll('[data-theme]');
            themeItems.forEach(item => {
                item.addEventListener('click', function () {
                    // 같은 섹션의 다른 아이템들에서 active 제거
                    themeItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');

                    // 페이지에 테마 적용
                    const theme = this.dataset.theme;
                    const logoImg = document.querySelector('#logo');

                    if (theme === 'dark') {
                        document.body.classList.add('theme-dark');
                        // 다크모드 로고로 변경
                        if (logoImg) {
                            logoImg.src = 'img/logo_dark.jpg';
                        }
                    } else {
                        document.body.classList.remove('theme-dark');
                        // 화이트모드 로고로 변경
                        if (logoImg) {
                            logoImg.src = 'img/logo_white.jpg';
                        }
                    }
                });
            });
        })
        .catch(error => {
            console.error('파일 로드 실패:', error);
        });
});