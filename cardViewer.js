
  var cardNum = -1
  var cardBase = (data = {use: (self) => ok(self)}) => {
    if (data.num == undefined) {cardNum++; data.num = cardNum}
    return [imgBox(data.img ? data.img : null, 0, 0, 30, 50), data.ex ? data.ex : "this is\nSampleCard", box(-10, 0, 0, 0), null, data]
  }
  var cardCopy = (base) => {
    return cardBase(base[4])
  }
  function cardView(deck = []) {
    this.deck = deck
    this.start = () => {
      for (var n of this.deck) {
        n[0].iY = 0
        n[0].iX = 0
        n[0].anoX = 160
        n[0].sel = 0
        n[2] = box(-10, 0, 0, 0)
        d = 0
        usingD = 0
        this.viewing = true
      }
    }
    this.viewing = false
    this.drawCard = (index, len, objs, mouse, fl, dt) => {
      var obj = objs[0]
      if (Math.abs(obj.anoX) > 5) obj.anoX += -obj.anoX * dt * 2 / 5; else obj.anoX = 0
      obj.abAngle = 0
      var f = obj.col(mouse.x, mouse.y)
      obj.abMove = [2.5 + index * 20 + obj.iX + obj.anoX, 80]
      var maxH = 20
      setStyle(rgb(0, 0, 0), rgb(255, 255, 255))
      if (((objs[2].col(mouse.x, mouse.y) || obj.col(mouse.x, mouse.y) || f) && !fl) && obj.anoX == 0 && (!((index - d < 0) || (index - d >= 6)) || true)) {
        if (obj.iY < 10) obj.iY++; else obj.iY = 10
        obj.move = [0, -maxH * (obj.iY / 10)]
        obj.fill()
        this.deck.slice(index + 1).forEach((e) => e[0].iX += 40 * (obj.iY / 10))
        textBox(35 * ((obj.iY / 10)) + obj.iX + index * 20 - 2.5, 80 - maxH * (obj.iY / 10), 30, 50, objs[1], 5, rgb(255, 255, 255)).fill()
        objs[2] = box(35 * ((obj.iY / 10)) + obj.iX + index * 20 - 2.5, 80 - maxH * (obj.iY / 10), 30, 50,)
        if (mouse.click) {
          if (obj.sel > 5) {
            objs[4].use ? objs[4].use(objs[4]) : 0
            this.deck.slice(index + 1).forEach((e) => e[0].anoX += 30);
            this.deck.splice(index, 1)
          }
        }
        obj.sel += dt
        return true
      } else {
        objs[2] = box(-10, 0, 0, 0)
        obj.sel = 0
        obj.abAngle = -5
        if (obj.iY > 0) {
          obj.iY--;
          deck.slice(index).forEach((e) => e[0].iX += 40 * (obj.iY / 10))
        } else obj.iY = 0
        obj.move = [0, -maxH * (obj.iY / 10)]
        obj.fill()
        return false
      }
    }
    var d
    var usingD
    var but = textBox(145, 65, 10, 10, "  >", 9, rgb(255, 255, 255))
    var but2 = textBox(135, 65, 10, 10, "<", 9, rgb(255, 255, 255))
    var but3 = textBox(135, 54, 22, 10, " sort", 9, rgb(255, 255, 255))
    this.update = (dt, mouse) => {
      if (!this.viewing) return
      var k = 0
      var fl = false
      if (Math.abs(usingD - (20 * d)) < 5) usingD = 20 * d; else usingD += dt * ((usingD < (20 * d)) ? 1 : -1) * Math.abs(usingD - (20 * d)) * 2 / 5
      for (var n of this.deck) {
        n[0].iX = 0 - usingD
      }
      for (var n of this.deck) {
        fl = this.drawCard(k, this.deck.length, n, mouse, fl, dt) || fl
        k++
      }
      if ((!fl) && (this.deck.length > 6)) {
        setStyle(rgba(50, 50, 50, 0.5))
        if ((6 < this.deck.length) && (((d + 1) * 6 < this.deck.length))) {
          setStyle(rgb(0, 0, 0))
          if (but.col(mouse.x, mouse.y)) {
            setStyle(rgb(50, 50, 50))
            if (mouse.clend) d += 6
          }
        }
        but.fill()
        setStyle(rgba(50, 50, 50, 0.5))
        if (d != 0) {
          setStyle(rgb(0, 0, 0))
          if (but2.col(mouse.x, mouse.y)) {
            setStyle(rgb(50, 50, 50))
            if (mouse.clend) d -= 6
          }
        }
        but2.fill()
      }
      if ((!fl)) {
        var n=this.deck.toSorted((a, b) => a[4].num - b[4].num)
        var m=0
        var k=false
        n.forEach((l)=>{
          k=k||!(l[4].num==this.deck[m][4].num)
          m++
        })
        if ((k)) {
          var n = but3.col(mouse.x, mouse.y)
          setStyle(n ? rgba(0, 0, 0, 0.7) : rgb(0, 0, 0))
          if (n && mouse.click) {
            var m = -1
            this.deck.forEach(n => n.bfi = (m++))
            this.deck.sort((a, b) => a[4].num - b[4].num)
            m = -1
            this.deck.forEach(n => n[0].anoX += ((n.bfi - (m++)) * 20))
          }
          but3.fill()
        }
      }
    }
    return this
  }
