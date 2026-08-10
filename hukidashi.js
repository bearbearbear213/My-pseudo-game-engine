
  var hukidashiView = (box = textBox(10, 65, 140, 30, "", 5, rgb(255, 255, 255)), chBox = textBox(11, 58, 30, 7, "", 5, rgb(255, 255, 255)), waitTime = 3) => {
    var fl = 0
    return {
      box: box, chBox: chBox,
      text: null, teTable: "", waitTime: waitTime, talking: false,
      texts: [],
      tlCh: [],
      update(dt, mouse) {
        this.talking = this.text != null
        if (((this.text == null) || (mouse.click && (this.text == this.teTable))) && this.texts.length > 0) {
          this.teTable = this.texts.shift()
          this.tIn = 0
          this.text = ""
          fl = 0
          var n = this.tlCh.shift()
          this.chBox.text = n == "" ? " " : n
        } else if (this.text != this.teTable && mouse.click && this.talking) {
          this.tIn = 0//this.teTable.length
          this.text = this.teTable
        } else if (mouse.click && this.texts.length == 0 && this.talking) {
          this.text = null
        }
        if (this.text != null) {
          fl += dt
          if (fl >= this.waitTime) while (fl >= this.waitTime) {
            fl -= this.waitTime
            if (this.text != this.teTable) {
              this.text += this.teTable[this.text.length]
            }
          }
        }
        if (this.text != null) {
          setStyle(rgba(0, 0, 0, 0.5), rgb(255, 255, 255))
          this.box.text = this.text == null ? " " : this.text
          this.box.fill()
          setStyle(rgba(0, 0, 0, 0.5), rgb(255, 255, 255))
          this.chBox.fill()
        }
      }, setEvent(v = [{ ch: "A", te: "hello" }, { ch: "B", te: "...\nhello" }]) {
        for (var n of v) {
          this.texts.push(n.te)
          this.tlCh.push(n.ch)
        }
      }
    }
  }
