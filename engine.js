
    var c = document.createElement("div")
    c.id = "main"
    c.style = `
            background: red;
            position: absolute;
            height: calc(min(100vh, 100*100vw/160));
            width: calc(min(100vh*1.6, 100vw));
            top: calc((100vh - min(100vh, 100*100vw/160))/2);
            left: calc((100vw - min(100vh*1.6, 100vw))/2);
            user-select: none;
            touch-action: none;`
    c.innerHTML = `<canvas id="canvas" width="1600" height="1000" style="position:absolute;width:100%;height:100%;"></canvas>`
    document.body.appendChild(c)
    var range = (n) => [...Array(n).keys()];
    var view = document.getElementById("main")

    var viewerLate=10
    var roughView=(n=10)=>{
        viewerLate=n
        var c=document.getElementById("canvas")
        c.width=160*n
        c.height=100*n
    }

    var random = (min, max) => min + Math.floor(Math.random() * max);


    var mouse = {
        x: 0, y: 0, iclick: false, clicking: false, clendi: false, get clend() {
            var n = this.clendi
            this.clendi = false
            return n
        }, id: null, get click() {
            var n = this.iclick
            this.iclick = false
            return n
        }
    }
    view.addEventListener("pointerdown", (e) => {
        if (mouse.id != null) return
        mouse.id = e.pointerId
        mouse.iclick = true
        mouse.clicking = true
        var d = view.getBoundingClientRect()
        var x = (d.x - e.clientX) / (d.left - d.right)
        var y = (d.y - e.clientY) / (d.bottom - d.top)
        mouse.x = (x * 160)
        mouse.y = -(y * 100)
        if (mouse.x < 0) mouse.x = 0
        if (mouse.y < 0) mouse.y = 0
        if (mouse.x > 160) mouse.x = 160
        if (mouse.y > 100) mouse.y = 100
    })
    view.addEventListener("pointermove", (e) => {
        if (mouse.id != e.pointerId) return
        mouse.iclick = false
        var d = view.getBoundingClientRect()
        var x = (d.x - e.clientX) / (d.left - d.right)
        var y = (d.y - e.clientY) / (d.bottom - d.top)
        mouse.x = (x * 160)
        mouse.y = -(y * 100)
        if (mouse.x < 0) mouse.x = 0
        if (mouse.y < 0) mouse.y = 0
        if (mouse.x > 160) mouse.x = 160
        if (mouse.y > 100) mouse.y = 100
    })
    view.addEventListener("mousemove", (e) => {
        if (mouse.id != e.pointerId) return
        mouse.iclick = false
        var d = view.getBoundingClientRect()
        var x = (d.x - e.clientX) / (d.left - d.right)
        var y = (d.y - e.clientY) / (d.bottom - d.top)
        mouse.x = (x * 160)
        mouse.y = - (y * 100)
        if (mouse.x < 0) mouse.x = 0
        if (mouse.y < 0) mouse.y = 0
        if (mouse.x > 160) mouse.x = 160
        if (mouse.y > 100) mouse.y = 100
    })
    window.addEventListener("pointercancel", (e) => {
        if (mouse.id != e.pointerId) return
        mouse.iclick = false
        mouse.clicking = false
        mouse.id = null
        mouse.clendi = true
    })
    window.addEventListener("pointerup", (e) => {
        if (mouse.id != e.pointerId) return
        mouse.iclick = false
        mouse.clicking = false
        mouse.id = null
        mouse.clendi = true
    })
    var ctx = document.getElementById("canvas").getContext("2d")
    var fill = (q) => {
        if (typeof q == "function") {
            q()
        } else {
            var p = [...q]
            p = p.map(e => e.map(k => k * viewerLate))
            ctx.beginPath();
            ctx.moveTo(...p.shift());
            for (var n of p) {
                ctx.lineTo(...n)
            }
        }
        ctx.fill();
        ctx.stroke();
    }
    var text = (x, y, text, si = 10, w = null) => {
        // フォントサイズの設定（si * 10）
        const fontSize = si * viewerLate;
        ctx.font = fontSize + "px serif";

        // 基準となる座標の計算
        const startX = x * viewerLate;
        let currentY = y * viewerLate;

        // 最大幅（ピクセル単位）。指定がなければ無限大にする
        const maxWidth = w ? w * viewerLate : Infinity;

        // 1. まず「\n」で文字列を分割して1行ずつ処理する
        const paragraphs = text.split('\n');

        for (let p = 0; p < paragraphs.length; p++) {
            const paragraph = paragraphs[p];

            // 空行（\nが連続した場合など）は、行だけ進めて次の処理へ
            if (paragraph === "") {
                currentY += fontSize;
                continue;
            }

            // 2. 分割された各行の中で、さらに最大幅（w）を超えないかチェック
            const chars = Array.from(paragraph);
            let currentLine = "";

            for (let i = 0; i < chars.length; i++) {
                const testLine = currentLine + chars[i];
                const metrics = ctx.measureText(testLine);

                // 最大幅を超えたら、そこまでの文字列を描画して自動改行
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(currentLine, startX, currentY);
                    ctx.strokeText(currentLine, startX, currentY);

                    currentLine = chars[i];
                    currentY += fontSize; // 行を下にずらす
                } else {
                    currentLine = testLine;
                }
            }

            // 自動改行のループ後に残った文字列を描画
            if (currentLine.length > 0) {
                ctx.fillText(currentLine, startX, currentY);
                ctx.strokeText(currentLine, startX, currentY);
            }

            // \n による次の段落へ進むための改行（最後の行以外）
            if (p < paragraphs.length - 1) {
                currentY += fontSize;
            }
        }
    };


    var setStyle = (fi = "rgba(0,0,0,0)", st = "rgba(0,0,0,0)", lineW = 1) => {
        ctx.fillStyle = fi
        ctx.strokeStyle = st
        ctx.lineWidth = lineW * viewerLate
    }
    var rgb = (a, b, c) => `rgb(${a},${b},${c})`
    var rgba = (a, b, c, d) => `rgba(${a},${b},${c},${d})`
    var box = (x, y, w, h, angle = 0, origin = null) => {
        var ox = origin ? origin[0] : (x + w / 2);
        var oy = origin ? origin[1] : (y + h / 2);
        var srad = () => {
            const points = [
                [x - ox, y - oy],
                [x - ox, y + h - oy],
                [x + w - ox, y + h - oy],
                [x + w - ox, y - oy],
                [x - ox, y - oy],
            ];
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            var k = points.map(([px, py]) => {
                const rx = px * cos - py * sin;
                const ry = px * sin + py * cos;
                return [ox + rx, oy + ry];
            });
            return k
        }
        var k = srad()
        // 点 (px, py) との当たり判定関数
        var col = (px, py) => {
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            // 1. 回転中心 (ox, oy) を基準に、判定したい点を平行移動
            const dx = px - ox;
            const dy = py - oy;

            // 2. 逆回転（-angle）させて、回転前の座標系に戻す
            // cos(-rad) = cos(rad), sin(-rad) = -sin(rad) を利用
            const rx = dx * cos + dy * sin;
            const ry = -dx * sin + dy * cos;

            // 3. 回転前のローカル座標 (ox + rx, oy + ry) が、元の長方形内にあるか判定
            const worldX = ox + rx;
            const worldY = oy + ry;

            return (
                worldX >= x &&
                worldX <= x + w &&
                worldY >= y &&
                worldY <= y + h
            );
        };
        return {
            fill() { fill(this.mat) }, mat: k, col: col,
            set angle(a) {
                angle += a
                this.mat = srad()
            }, set abAngle(a) {
                angle = a
                this.mat = srad()
            },
            set move(m) {
                x += m[0]
                y += m[1]
                ox += m[0]
                oy += m[1]
                this.mat = srad()
            }, set abMove(m) {
                var dx = m[0] - x,
                    dy = m[1] - y
                x += dx
                y += dy
                ox += dx
                oy += dy
                this.mat = srad()
            }, get ori() {
                return { x: x, y: y, angle: angle }
            }, get top() {
                return y
            }
        }
    };

    var arc = (x, y, r, a = 360, s = 0) => {
        return {
            fill() { fill(this.mat) }, mat: () => {
                ctx.beginPath();
                //ctx.moveTo(x * 10, y * 10)
                ctx.arc(x * viewerLate, y * viewerLate, r * viewerLate,
                    s * Math.PI * 2 / 360,
                    s * Math.PI * 2 / 360 + a * Math.PI * 2 / 360);
            }, col: (px, py) => {
                var dis = Math.sqrt(
                    (x - px) ** 2 + (y - py) ** 2
                )
                var dx = px - x
                var dy = py - y
                var i = ((-(Math.atan2(dx, dy) * 360 / 2 / Math.PI - 180) - 90 + 360 * 80) % 360)
                return (a == 360 || (s % 360 < i && i < (s + a) % 360)) && dis < r
            }, set angle(i) {
                s += i
            }, set abAngle(i) {
                s = i
            }, set move(m) {
                x += m[0]
                y += m[1]
            }, set abMove(m) {
                x = m[0]
                y = m[1]
            }, set changeSize(m) {
                a += m
            }, set abChangeSize(m) {
                a = m
            }, get ori() {
                return { x: x, y: y }
            }, get top() {
                return y - r
            }
        }
    }
    function col(obj1, obj2) {
        // どちらが box でどちらが arc かを判定するためのヘルパー
        const isBox = (o) => Array.isArray(o.mat);
        const isArc = (o) => typeof o.mat === 'function';

        // 1. Box vs Box
        if (isBox(obj1) && isBox(obj2)) {
            return checkBoxVsBox(obj1, obj2);
        }
        // 2. Arc vs Arc
        if (isArc(obj1) && isArc(obj2)) {
            return checkArcVsArc(obj1, obj2);
        }
        // 3. Box vs Arc (順序を考慮)
        if (isBox(obj1) && isArc(obj2)) {
            return checkBoxVsArc(obj1, obj2);
        }
        if (isArc(obj1) && isBox(obj2)) {
            return checkBoxVsArc(obj2, obj1);
        }

        return false;
    }

    // --- サブ判定ロジック ---

    // 【1. Box vs Box】分離軸定理 (SAT: Separating Axis Theorem)
    function checkBoxVsBox(b1, b2) {
        const polygons = [b1.mat.slice(0, 4), b2.mat.slice(0, 4)];

        for (let p = 0; p < 2; p++) {
            const poly = polygons[p];
            for (let i = 0; i < poly.length; i++) {
                const j = (i + 1) % poly.length;
                // 辺の法線ベクトル（分離軸）を取得
                const normal = [-(poly[j][1] - poly[i][1]), poly[j][0] - poly[i][0]];

                // 各多角形を軸上に投影
                let minA = Infinity, maxA = -Infinity;
                for (const pt of polygons[0]) {
                    const projected = pt[0] * normal[0] + pt[1] * normal[1];
                    minA = Math.min(minA, projected);
                    maxA = Math.max(maxA, projected);
                }

                let minB = Infinity, maxB = -Infinity;
                for (const pt of polygons[1]) {
                    const projected = pt[0] * normal[0] + pt[1] * normal[1];
                    minB = Math.min(minB, projected);
                    maxB = Math.max(maxB, projected);
                }

                // 影が重なっていなければ、衝突していない（分離軸が存在する）
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    }

    // 【2. Arc vs Arc】中心間距離と各々の点判定
    function checkArcVsArc(a1, a2) {
        // 全円（360度）同士の場合：中心距離 < 半径の和
        // （扇形が含まれる場合は、互いの中心点や主要な点での col 判定を利用）
        return a1.col(a2.ori?.x ?? 0, a2.ori?.y ?? 0) ||
            a2.col(a1.ori?.x ?? 0, a1.ori?.y ?? 0);
    }

    // 【3. Box vs Arc】
    function checkBoxVsArc(b, a) {
        // 1. Boxの角4点が Arc の内側にあるか
        for (let i = 0; i < 4; i++) {
            if (a.col(b.mat[i][0], b.mat[i][1])) return true;
        }

        // 2. Arcの中心点が Box の内側にあるか
        // （arc オブジェクトの動的なプロパティ構造に合わせて調整）
        // Arcのプロパティから中心座標を取得する処理
        // ※ 提示コードのarcは内部変数を保持しているため、Box側の col で判定できる場合は中心点をチェック
        const corners = b.mat;
        for (let i = 0; i < 4; i++) {
            const p1 = corners[i];
            const p2 = corners[(i + 1) % 4];
            // Arcの領域（円/扇形）がBoxの辺と交差しているかを判定
            if (a.col((p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2)) return true;
        }

        return false;
    }


    var bTime = Date.now()
    var startLoop = () => {
        setInterval(() => {
            var dt = (Date.now() - bTime) * 60 / 1000
            bTime = Date.now()
            setStyle(rgb(255, 255, 255), rgb(255, 255, 255))
            fill([[0, 0], [160, 0], [160, 100], [0, 100]])

            update(dt, {
                x: mouse.x,
                y: mouse.y,
                clicking: mouse.clicking,
                clend: mouse.clend,
                click: mouse.click
            })
        }, 0)
    }

    var textBox = (x, y, w, h, t, tFSize = 10, tColor1 = rgb(0, 0, 0,), tColor2 = rgba(0, 0, 0, 0),) => {
        var b = box(x, y, w, h)
        return {
            box: b,
            fill(){
                b.fill()
                setStyle(tColor1, tColor2)
                text(b.ori.x, b.ori.y + tFSize, this.text, tFSize, w)
            }, col: b.col,text:t,fontChange(size=undefined,co1=undefined,co2=undefined){
                if(size!=undefined)tFSize=size;
                if(co1!=undefined)tColor1=co1
                if(co2!=undefined)tColor2=co2
            }
        }
    }

    var ok = console.log

    async function loadImg(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(new Error(`画像の読み込みに失敗しました: ${src}`));
            img.src = src;
        });
    }

    function drawImage(img, x, y, w, h, angle = 0, flipH = false, flipV = false) {
        if(img==undefined){
            box(x,y,w,h,angle,).fill()
        }
        else{
            x = x * viewerLate; y = y * viewerLate; w = w * viewerLate; h = h * viewerLate
            ctx.save(); // 現在の描画状態（座標系など）を保存

            // 1. 画像の中心位置へ原点 (0,0) を移動
            ctx.translate(x + w / 2, y + h / 2);

            // 2. 回転（度数法 deg を 弧度法 rad に変換）
            if (angle !== 0) {
                ctx.rotate((angle * Math.PI) / 180);
            }

            // 3. 反転 (-1をかけることで各軸を反転)
            const scaleX = flipH ? -1 : 1;
            const scaleY = flipV ? -1 : 1;
            if (flipH || flipV) {
                ctx.scale(scaleX, scaleY);
            }

            // 4. 中心を原点に合わせた状態で描画（左上は -w/2, -h/2 になる）
            ctx.drawImage(img, -w / 2, -h / 2, w, h); 

            ctx.restore(); // 描画状態を元に戻す
        }
    }
    var imgBox = (img, x, y, w, h, angle, flH, flV) => {
        var r = box(x, y, w, h, angle)
        r.fill = () => {
            drawImage(img, r.ori.x, r.ori.y, w, h, r.ori.angle, flH, flV)
        }
        r.CflipH = (a = null) => { if (a == null) { flH = !flH } else { flH = a } }
        r.CflipV = (a = null) => { if (a == null) { flV = !flV } else { flV = a } }
        return r
    }
    var i;
    //make update(dt,mouse);use startLoop()
