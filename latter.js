
  function latter(){
    this.task=[]
    this.set=(func,timer=100,once=true,ano={})=>{
      this.task.push({
        do:func,
        time:timer,
        once:once,
        finished:false,
        deftimer:timer,
        ...ano
      })
    }
    this.update=(dt)=>{
      this.task.forEach((n)=>n.time-=dt)
      for(var n of this.task.filter((n)=>(n.time<=0)&&(!n.finished))){
        if(n.once)n.finished=true
        else n.time=n.deftimer+n.time
        n.do(dt,n)
      }
    }
      return this
  }
