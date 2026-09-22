
let scrollY = 0;
var m=document.getElementById("main")

// 【PC】ホイール操作の検知
m.addEventListener('wheel', (e) => {
  // e.deltaY にはスクロールしようとした量（正: 下, 負: 上）が入る
  scrollY += e.deltaY*100/m.getBoundingClientRect().height;
  
}, { passive: true });

// 【スマホ】タッチ操作の検知
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

m.addEventListener('touchmove', (e) => {
  const touchCurrentY = e.touches[0].clientY;
  
  // 前回からの移動差分を計算（下へのスワイプは上スクロール、上へのスワイプは下スクロール）
  const diffY = touchStartY - touchCurrentY;
  
  // 変数に加算
  scrollY += diffY*100/m.getBoundingClientRect().height;
  
  // 次の移動計算のためにスタート位置を更新
  touchStartY = touchCurrentY;

}, { passive: true });
