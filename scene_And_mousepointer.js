
    var pointerAnimationSample = () => {
        lat.set((dt, self, mouse) => {
            mouKM -= dt * 1
            if (mouKM < 1) mouKM = 1
            //ok(mousekiseki.length,mouKM)
            while (true) {
                if (mousekiseki.length < mouKM) break
                mousekiseki.shift()
            }
            if (mousekiseki.length > 0)
                for (var n of range(mousekiseki.length - 1)) {
                    setStyle(rgba(0, 0, 0, 0), rgba(240, 240, 255, n / mousekiseki.length / 2), 2)
                    fill([mousekiseki[n + 1], mousekiseki[n]])
                }
        }, 0, false)
        var mouKM = 1
        var mousekiseki = []
        view.addEventListener("pointerdown", () => {
            mousekiseki = []
            var [x, y] = [mouse.x, mouse.y]
            var f = 0
            lat.set((dt, self, mouse) => {
                f += dt
                if (f > 90) self.finished = true
                else {
                    setStyle(rgba(0, 0, 0, 0), rgba(240, 240, 255, (90 - f) / 180), 2)
                    arc(x, y, (90 - f) / 18).fill()
                }
            }, 0, false)
        })
        view.addEventListener("pointerup", () => {
            var [x, y] = [mouse.x, mouse.y]
            var f = 0
            lat.set((dt, self, mouse) => {
                f += dt
                if (f > 90) self.finished = true
                else {
                    setStyle(rgba(0, 0, 0, 0), rgba(240, 240, 255, (90 - f) / 180), 2)
                    arc(x, y, f / 18).fill()
                }
            }, 0, false)
        })
        view.addEventListener("pointermove", () => {
            if (!mouse.clicking) return
            var n = (mousekiseki.length < 2) ? 6 : ((mousekiseki[mousekiseki.length - 1][0] - mouse.x) ** 2 + (mousekiseki[mousekiseki.length - 1][1] - mouse.y) ** 2)
            if ((n > 2)) {
                mousekiseki.push([mouse.x, mouse.y])
                if (n > 5) mouKM = 40
            }
        })
    }


    var scene = "sample"
    var gameObjects = []
    class gameObject {
        constructor(strart = (self) => { }, update = (self, dt, mouse) => { }, scene = "sample", condition = "live", type = "short", id = "") {
            this.startFunc = strart
            this.updateFunc = update
            self.scene = scene
            this.condition = condition
            this.type = type

            this.startFunc(this)
            gameObjects.push(this)
        }
        update(dt, mouse) {
            if (this.condition != "live") return
            if (this.scene != scene) {
                if (this.type == "short") {
                    this.condition = "die"
                }
                return
            }
            this.updateFunc(this, dt, mouse)
        }
    }
    var gameObjectsUpdate = (dt,mouse) => {
        for (var n of gameObjects) n.update(dt,mouse)
    }
