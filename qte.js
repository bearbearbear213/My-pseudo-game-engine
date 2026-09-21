
    var qetNum=0
    var finQet=0
var qteF=false
    var qte=async(fl=60,after=()=>{},x=80,y=50,r=7,e=10)=>{
        qteF=false
      var o=qetNum
      qetNum++
        var l=1
        await wait(()=>true)
      var flag=false
        await wait((dt,self,mouse)=>{
            l+=dt
            if(l>(fl+e)){flag=true;return true}
            setStyle(rgb(200,200,200),"white")
            arc(x,y,r).fill()
            setStyle(rgba(255,0,0,0.5),"red")
            arc(x,y,(3-2*l/fl)*r/3,360,360*l/fl).fill()
            setStyle("white")
            arc(x,y,r/3).fill()
            return (mouse .click&&o==finQet)||qteF
        })
      finQet++
      res=flag?fl:fl-l
      if(!qteF)after(Math.abs(res))
    }
    var qteEnd=()=>{qteF=true}
