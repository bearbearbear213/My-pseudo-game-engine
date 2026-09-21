
    function enemy(Maxhp = 10, hp = 10, act = ( con) => { }, Maxcost = 10, cost = 10, img = undefined, drawType = [50, 10, 60, 60], datas = {}) {
        this.hp = hp
        this.Maxhp = Maxhp
        this.act = act
        this.img = img
        this.drawType = drawType
        this.datas = datas
        this.viewHp = 0
        this.cost = cost
        this.Maxcost = Maxcost
        this.bcost = 0
        return this
    }
    function ButData(caV) {
        this.flag = false
        this.condition = {}
        this.start = (d = []) => { this.flag = true; this.data = d; this.turnStart()}
        this.end = (d = []) => { this.flag = false; this.turnEnd() }
        this.data = []
        this.fill = () => {
            setStyle("red")
            for (var n of this.data) {
                imgBox(n.img, ...n.drawType, 0, false, false).fill()
            }
        }
        this.update = (dt) => {
            if(this.data[0].viewHp<=0&&this.data[0].hp<=0&&this.flag){this.end();qteEnd();}
            this.fill()
            var k = 0
            var l = this.data.length
            var late = l == 1 ? 1 : (l == 2 ? 0.8 : 0.7)
            var tx = l != 1 ? (160 - 30 * late) : 160, ty = l > 2 ? 30 * late : 0
            for (var m of this.data) {
                var tr = 90
                m.viewHp += (m.hp - m.viewHp) * 0.1 * dt
                if(m.viewHp<0)m.viewHp=0
                if (Math.abs(m.hp - m.viewHp) < 1) m.viewHp = m.hp
                for (var n of [[30, "black", 90, tr], [29, "white", 80, tr + 5], [29, "red", 80 * (m.viewHp / m.Maxhp), tr + 5], [27, "black", 90, tr], [24, "white", 80, tr + 5], [24, "yellow", 80 * (m.cost / m.Maxcost), tr + 5], [24, "red", 80 * (m.bcost / m.Maxcost), 80 * (m.cost / m.Maxcost) + tr + 5]]) {
                    setStyle(n[1])
                    arc(tx, ty, n[0] * late, n[2], n[3]).fill()
                }
                setStyle(rgb(100, 100, 100))
                for (var n of range(m.Maxcost)) {
                    arc(tx, ty, 24 * late, 1, 80 * (n / m.Maxcost) + tr + 5).fill()
                }
                setStyle("black")
                arc(tx, ty, 22 * late, 90, tr).fill()
                k++
            }
            setStyle(rgb(0, 0, 0))


            if (!caV.cardUp) {
                m = player
                tx = 2
                ty = 80
                var tr = 270
                m.viewHp += (m.hp - m.viewHp) * 0.1 * dt
                if(m.viewHp<0)m.viewHp=0
                if (Math.abs(m.hp - m.viewHp) < 1) m.viewHp = m.hp
                for (var n of [[30, "black", 90, tr], [29, "white", 80, tr + 5], [29, rgb(100, 255, 100), 80 * (m.viewHp / m.Maxhp), tr + 5 + 80 - 80 * (m.viewHp / m.Maxhp)], [27, "black", 90, tr], [24, "white", 80, tr + 5], [24, "yellow", 80 * (m.cost / m.Maxcost), tr + 5], [24, "red", 80 * (m.bcost / m.Maxcost), 80 * (m.cost / m.Maxcost) + tr + 5]]) {
                    setStyle(n[1])
                    arc(tx, ty, n[0] * late, n[2], n[3]).fill()
                }
                setStyle(rgb(100, 100, 100))
                for (var n of range(m.Maxcost)) {
                    arc(tx, ty, 24 * late, 1, 80 * (n / m.Maxcost) + tr + 5).fill()
                }
                setStyle("black")
                arc(tx, ty, 22 * late, 90, tr).fill()
            }
        }
        this.turnEnd = (dt) => {
            if(!this.flag){;return}
            caV.viewing = false
            for (var m of this.data) m.act(this.ConTurnEnd)
        }
        this.turnStart=(dt)=>{
            if(!this.flag){;return}
            caV.start()
            for (var m of this.data) m.act( this.ConTurnStart)
        }
        this.ConTurnEnd=0
        this.ConTurnStart=1
        return this
    }/*
    but=new but(caV)
        but.start([new enemy(100, 100, (con) => {
            if(con==but.ConTurnEnd){
                qte(60, (r) => {
                    player.hp -=  50*r/60
                })
                qte(90, (r) => {
                    player.hp -= 50*r/90
                    but.turnStart()
                },100)
            }
        })])
        await wait(()=>!but.flag)
        
        
        if (but.flag) {
            but.update(dt)
            var b = textBox(64, 2, 32, 8, "   turn end", 5.5, "white")
            if (caV.viewing) {
                var k = b.col(mouse.x, mouse.y)
                setStyle(
                    k ? rgba(100, 100, 100, 0.5) : rgba(0, 0, 0, 0.5), "white")
                b.fill()
                if (mouse.clend && k) {
                    but.turnEnd(dt)
                }
            }
        }*/    
