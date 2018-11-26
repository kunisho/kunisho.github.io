//ーーーーーーーーーーーースクロールオフーーーーーーーーーーーー
/* "passive" が使えるかどうかを検出 */
var passiveSupported = false;
try {
    document.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function() {
            passiveSupported = true;
        }
    }));
} catch(err) {}

/* リスナーを登録 */
document.addEventListener('touchstart', function listener(e) {
    /* do something */
    e.preventDefault();
}, passiveSupported ? { passive: false } : false);
document.addEventListener('touchmove', function listener(e) {
    /* do something */
    e.preventDefault();
}, passiveSupported ? { passive: false } : false);
//ーーーーーーーーーーーースクロールオフーーーーーーーーーーーー
