let scrollX = 0;
let scrollY = 0;
const m = document.getElementById("main");

// スクロール感度の調整用
const WHEEL_SPEED = 0.5; // PCのホイール速度調整
const TOUCH_SPEED = 1.0; // スマホのスワイプ速度調整

// 【PC】ホイール操作の検知
m.addEventListener('wheel', (e) => {
  const rect = m.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  // 1. X軸（横）の計算（Shift+ホイール や トラックパッドの横スクロールに対応）
  const deltaPercentX = (e.deltaX * 100) / rect.width;
  scrollX += deltaPercentX * WHEEL_SPEED;

  // 2. Y軸（縦）の計算
  const deltaPercentY = (e.deltaY * 100) / rect.height;
  scrollY += deltaPercentY * WHEEL_SPEED;

}, { passive: true });


// 【スマホ】タッチ操作の検知
let touchStartX = 0;
let touchStartY = 0;

m.addEventListener('touchstart', (e) => {
  // X座標とY座標の両方のスタート位置を記憶
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

m.addEventListener('touchmove', (e) => {
  const rect = m.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const touchCurrentX = e.touches[0].clientX;
  const touchCurrentY = e.touches[0].clientY;
  
  // 1. X軸（横）の計算（左スワイプは右スクロール、右スワイプは左スクロール）
  const diffX = touchStartX - touchCurrentX;
  const deltaPercentX = (diffX * 100) / rect.width;
  scrollX += deltaPercentX * TOUCH_SPEED;
  
  // 2. Y軸（縦）の計算
  const diffY = touchStartY - touchCurrentY;
  const deltaPercentY = (diffY * 100) / rect.height;
  scrollY += deltaPercentY * TOUCH_SPEED;
  
  // 次の移動計算のためにスタート位置を更新
  touchStartX = touchCurrentX;
  touchStartY = touchCurrentY;

}, { passive: true });
