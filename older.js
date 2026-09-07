
  function older(){
    
  var er=()=>{
    var m=0
    for(var n of[
      rgb(255,255,255),rgb(255,255,0),rgb(0,255,255),rgb(0,255,0),rgb(255,0,255),rgb(255,0,0),rgb(0,0,255)
    ]){
      setStyle(n)
      box(160*m/7,0,160/7,70).fill()
      m++
    }
    m=0
    for(var n of[rgb(0,0,255),rgb(0,0,0),rgb(255,0,255),rgb(0,0,0),rgb(0,255,255),rgb(0,0,0),rgb(255,255,255)]){
      setStyle(n)
      box(160*m/7,70,160/7,5).fill()
      m++
    }
    m=0
    for(var n of[rgb(0,0,0),rgb(100,100,0),rgb(0,100,100),rgb(0,0,0),rgb(100,0,100)]){
      setStyle(n)
      box(160*m/5,75,160/5,5).fill()
      m++
    }
    setStyle(rgb(0,0,0))
    box(0,80,160,20).fill()
    setStyle(rgb(255,255,255))
    box(30,80,50,20).fill()
  }
    this.error=false
    this.update=()=>{
      if(this.error){er()}
setStyle(rgba(0,0,0,0.1))
    box(0,0,160,100).fill()
    setStyle(rgba(255,255,255,0.2),rgba(255,255,255,0.1),0.2)
    box(0,0,160,100).fill()
    for(var n of range(50)){
      var m=n*2+random(0,5)
      fill([[0,m],[160,m]])
    }}
    return this
  }
