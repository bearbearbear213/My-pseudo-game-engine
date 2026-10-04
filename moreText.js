
var centerText=(x,y,n="sample",si,w,rotate=0)=>{
ctx.save();

// 2. 基準位置まで座標原点を移動
ctx.translate(x*viewerLate, y*viewerLate);

// 3. 角度をラジアンに変換して回転（時計回り）
ctx.rotate((Math.PI / 180) * rotate);
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
  text(0,0,n,si,w)
ctx.textAlign = 'left';
ctx.textBaseline = 'alphabetic';
  ctx.restore();
}

    var leftText = (x, y, n = "sample", si, w, rotate = 0) => {
        ctx.save();

        // 2. 基準位置まで座標原点を移動
        ctx.translate(x * viewerLate, y * viewerLate);

        // 3. 角度をラジアンに変換して回転（時計回り）
        ctx.rotate((Math.PI / 180) * rotate);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        text(0, 0, n, si, w)
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.restore();
    }
    var cmdLine = (x, y, n = "sample", si, w, rotate = 0) => {
        ctx.save();

        // 2. 基準位置まで座標原点を移動
        ctx.translate(x * viewerLate, y * viewerLate);

        // 3. 角度をラジアンに変換して回転（時計回り）
        ctx.rotate((Math.PI / 180) * rotate);
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        text(0, 0, n, si, w)
        ctx.textAlign = 'left';
        ctx.textBaseline = 'alphabetic';
        ctx.restore();
    }
