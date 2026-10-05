
    class inputKeybord {
        constructor(action = (self) => { }, defAct = (k) => { }) {
            this.t = ""
            document.addEventListener("keydown", (e) => {
                defAct(e.key)
                switch (e.key) {
                    case "Backspace":
                        this.t = this.t.slice(0, -1)
                        break
                    case "Enter": action(this)
                    case "ArrowUp":
                    case "ArrowDown":
                    case "ArrowLeft":
                    case "ArrowRight":
                    case "Control":
                    case "Shift":
                        break
                    default:
                        if(!(this.t.length==0&&e.key==" "))this.t += e.key
                        break
                }
            })
        }
        get() {
            return this.t
        }
    }
    var winIndexs = 0
    var canvSiseBase = box(2, 2, 156, 96)
    class windowLike {
        constructor(actions = {
            "atk": (self) => { self.cMove = false; wins.push(new windowLike({ ok: async () => { wins = []; hu.setEvent([{ ch: "", te: "てきをこうげきした。" }]); await wait(() => !hu.talking); wins.push(new windowLike()); }, cancel: (self2) => { self2.del(); self.cMove = true } }, "てきをこうげきする。\n", "", "atk")) },
            "act": (self) => { ok(1) },
        },
            beforeT = "", text = "\n", title = "selAct",moreView=(self)=>{}) {
            winIndexs++
            this.index = winIndexs
            this.scroll = 0
            this.beforeScroll = 0
            this.x = 80 / 2
            this.y = 55 / 2
            this.beforeM = { x: 0, y: 0 }
            this.w = 80
            this.h = 50
            this.res = Object.keys(actions)
            this.do = Object.values(actions)
            this.sel = 0
            this.bSel = null
            this.selecting = null
            this.text = text
            this.beforeT = beforeT
            this.title = title
            this.moving = false
            this.cMove = true
            this.moreView=moreView
        }
        update(dt, mouse) {
            var top = box(this.x, this.y, this.w, 3)
            if (mouse.clend) this.moving = false
            if (this.moving) {
                this.x += mouse.x - this.beforeM.x
                this.y += mouse.y - this.beforeM.y
                top.abMove = [this.x, this.y,]
                if ((!col(top, canvSiseBase))) {
                    this.x -= mouse.x - this.beforeM.x
                    this.y -= mouse.y - this.beforeM.y
                    top.abMove = [this.x, this.y,]
                }
            }
            if (box(this.x, this.y, this.w, this.h).col(mouse.x, mouse.y) && this.index == winIndexs) {
                var befTh = (this.beforeT.split("\n").length - 1) * 5
                if (Math.abs(this.beforeScroll - scrollY) > 0) {
                    this.scroll -= this.beforeScroll - scrollY
                    this.beforeScroll = scrollY
                    if (this.scroll < 0) this.scroll = 0
                }
                setStyle(rgb(255, 0, 0))
                var main = box(this.x, this.y + 3, this.w, this.h - 3)
                setStyle("white", rgb(0, 0, 0), 0.1)
                main.fill()
                setStyle(rgb(200, 200, 200), rgb(0, 0, 0), 0.1)
                if (mouse.click && (top.col(mouse.x, mouse.y))) this.moving = true
                this.beforeM = { x: mouse.x, y: mouse.y }
                top.fill()
                this.sel = Math.ceil((mouse.y - (this.y + befTh + 3)) / 5) - 1
                if (!(this.sel >= 0 && this.sel < this.res.length)) this.sel = null
                if (mouse.click) {
                    if (this.sel == null) {
                        this.selecting = null
                    } else { this.selecting = this.sel }
                }
                setStyle(rgba(100, 100, 255, 0), rgba(100, 100, 255, 0.50), 0.2)
                if (this.sel != null) box(this.x, this.y + 3 + befTh + (this.sel) * 5, this.w, 5).fill()
                this.bSel = this.sel
                if (this.selecting != null) {
                    setStyle(rgba(100, 100, 255, 0.5), rgba(100, 100, 255, 0.50), 0.2)
                    box(this.x, this.y + 3 + befTh + (this.selecting) * 5, this.w, 5).fill()
                }
                setStyle(rgb(0, 0, 0))
                leftText(this.x, this.y + 3, this.beforeT + this.res.join("\n") + this.text, 5, this.w)
                if (mouse.dblcl && this.selecting != null) {
                    this.do[this.selecting](this)
                }
                setStyle(rgb(0, 0, 0))
                leftText(this.x, this.y, this.title, 3)
                this.moreView(this)
            } else {
                var main = box(this.x, this.y + 3, this.w, this.h - 3)
                setStyle("white", rgb(0, 0, 0), 0.1)
                main.fill()
                setStyle(rgb(200, 200, 200), rgb(0, 0, 0), 0.1)
                var top = box(this.x, this.y, this.w, 3)
                this.beforeM = { x: mouse.x, y: mouse.y }
                top.fill()
                setStyle(rgb(0, 0, 0))
                leftText(this.x, this.y + 3, this.beforeT + this.res.join("\n") + this.text, 5, this.w)
                setStyle(rgb(0, 0, 0))
                leftText(this.x, this.y, this.title, 3)
                this.moreView(this)
                setStyle(rgba(100, 100, 100, 0.1))
                box(this.x, this.y, this.w, this.h).fill()
            }
            if (!this.cMove) {
                setStyle(rgba(100, 100, 100, 0.5))
                box(this.x, this.y, this.w, this.h).fill()
            }
        }
        update2(dt, mouse) {
            if (this.cMove && mouse.click && box(this.x, this.y, this.w, this.h).col(mouse.x, mouse.y)) {
                winIndexs++
                this.index = winIndexs
            }
        }
        del() {
            wins.splice(wins.indexOf(this), 1)
        }
    }
    var wins = []
    var allWindowsUpdate = (dt, mouse) => {
        wins.sort((a, b) => a.index - b.index)
        for (var n of range(wins.length)) wins[n].update(dt, mouse)
        for (var n of range(wins.length)) wins[n].update2(dt, mouse)
    }
