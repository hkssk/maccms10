// 立即执行函数，避免污染全局变量
(function() {
    // --- 配置区域 ---
    const POPUP_ID = 'auto-notification-popup';
    const CLOSE_BUTTON_ID = 'popup-close-btn';
    const STORAGE_KEY_DISMISSED = 'popupDismissedForever';
    const STORAGE_KEY_SHOWN_TODAY = 'popupShownToday';
    const POPUP_TITLE = '观影必看';
    const POPUP_MESSAGE = '直接点灰色按钮观看，不要收藏播放页面，域名随时更换。';
    const CLOSE_BUTTON_TEXT = '关闭并不再提醒';
    // --- 配置结束 ---

    /**
     * 动态创建并注入弹窗所需的 CSS 样式
     */
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #${POPUP_ID} {
                visibility: hidden;
                opacity: 0;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 350px;
                max-width: 90%;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                padding: 25px;
                z-index: 9999;
                transition: opacity 0.4s ease-in-out;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                box-sizing: border-box;
            }
            #${POPUP_ID}.show {
                visibility: visible;
                opacity: 1;
            }
            #${POPUP_ID} .popup-content h3 {
                margin-top: 0;
                margin-bottom: 15px;
                color: #333;
                font-size: 20px;
            }
            #${POPUP_ID} .popup-content p {
                color: #555;
                line-height: 1.6;
                margin-bottom: 20px;
                font-size: 16px;
            }
            #${CLOSE_BUTTON_ID} {
                display: block;
                width: 100%;
                padding: 12px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.2s ease;
            }
            #${CLOSE_BUTTON_ID}:hover {
                background-color: #0056b3;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 动态创建弹窗的 HTML 结构
     */
    function createPopupHTML() {
        const popup = document.createElement('div');
        popup.id = POPUP_ID;
        popup.innerHTML = `
            <div class="popup-content">
                <h3>${POPUP_TITLE}</h3>
                <p>${POPUP_MESSAGE}</p>
                <button id="${CLOSE_BUTTON_ID}">${CLOSE_BUTTON_TEXT}</button>
            </div>
        `;
        document.body.appendChild(popup);
        return popup;
    }

    /**
     * 检查当前时间是否在弹窗时段内 (18:30 - 07:00)
     * @returns {boolean}
     */
    function isInPopupTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        return (hour > 18 || (hour === 18 && minute >= 30)) || hour < 7;
    }

    /**
     * 初始化弹窗逻辑
     */
    function initPopup() {
        // 1. 动态注入 CSS 和 HTML
        injectStyles();
        const popup = createPopupHTML();
        const closeBtn = document.getElementById(CLOSE_BUTTON_ID);

        // 2. 检查用户是否曾经点击过“永久关闭”
        if (localStorage.getItem(STORAGE_KEY_DISMISSED) === 'true') {
            console.log('用户已永久关闭弹窗，不再显示。');
            return;
        }

        // 3. 检查当前是否在弹窗时间段内
        if (!isInPopupTime()) {
            console.log('当前不在弹窗时间段内。');
            return;
        }

        // 4. 检查今天是否已经弹出过
        const today = new Date().toISOString().split('T')[0];
        if (localStorage.getItem(STORAGE_KEY_SHOWN_TODAY) !== today) {
            console.log('符合所有条件，显示弹窗。');
            popup.classList.add('show');
            localStorage.setItem(STORAGE_KEY_SHOWN_TODAY, today);
        } else {
            console.log('弹窗今天已经显示过一次。');
        }

        // 5. 绑定关闭按钮的点击事件
        closeBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY_DISMISSED, 'true');
            popup.classList.remove('show');
            console.log('用户点击关闭，已设置为永久不显示。');
        });
    }

    // 当 DOM 内容加载完成后，执行初始化函数
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopup);
    } else {
        initPopup();
    }
})();