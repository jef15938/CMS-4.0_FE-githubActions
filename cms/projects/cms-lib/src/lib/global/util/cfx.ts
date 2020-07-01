export class RippleScreen {
  constructor(
    private ele,
    private points: number = 3, // 總波紋數量
    private maxBorder: number = 4, // 波紋最大線寬
    private lineColor: string = 'white', // 波紋顏色
    private fillColor: string = 'rgba(255,255,255,.25)', // 波紋有填充時的顏色
    private fadeInSpan: number = 500, // 波紋淡入時的耗時
    private lifeSpan: number = 5000, // 波紋淡入到淡出至0的總耗時
    private maxSize: number = 750, // 波紋最大尺寸
    private minRate: number =  0.5, // 波紋最小尺寸倍率（取最大尺寸浮點百分比）
    private randomFill: boolean = true, // 是否隨機填充
    private radiusMetaRate: number = 10, // 波紋半徑擴張速度
    private speedMetaRate: number = 0.5, // 波紋中心點位移速度
    private globalAlpha: number = 0.35// 波紋透明度
    ){
    this.init();
  }
  private space ;
  private ctx ;
  private pool: any[] = [];
  public canvasWidth: number ;
  public canvasHeight: number ;
  private loop;
  init() {
    const space = document.createElement('canvas');
    this.ele.appendChild(space);
    this.canvasWidth =  this.ele.getBoundingClientRect().width;
    this.canvasHeight  = this.ele.getBoundingClientRect().height;
    this.space = this.ele.querySelectorAll('canvas')[0];
    this.ctx = this.space.getContext('2d');
    this.size();

    const $this = this;
    window.addEventListener('resize', $this.debounce(
      () => {
        $this.size();
        $this.drawAll();
      }, 200)
      );
    for (let i = 0; i < $this.points; i++) {
      const isFill = i % 2 === 0 && $this.randomFill;
      const newPulse = $this.createPulse(isFill, this.radiusMetaRate, this.speedMetaRate);
      $this.pool.push(newPulse);
    }
    this.drawAll();
  }

  drawAll(){

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.pool.forEach((ele) => {
      ele.draw();
    });
    cancelAnimationFrame(this.loop);
    this.loop = window.requestAnimationFrame(() => {
      this.pulseMeta();
      this.drawAll();
    });
  }

  pulseMeta(){
    this.pool.forEach((ele, i) => {
      ele.radius += .5;
      ele.center.x += ele.speedX;
      ele.center.y += ele.speedY;
      if (ele.life <= this.fadeInSpan / 16){
        ele.opacity += this.globalAlpha  / (this.fadeInSpan / 16 );
        ele.life += 1;
      }
      else{
        if (ele.opacity < 0){
          const isFill = i % 2 === 0 && this.randomFill;
          const newPulse = this.createPulse(isFill, this.radiusMetaRate, this.speedMetaRate);
          this.pool[i] = newPulse;
        }
        else{
          ele.opacity -= this.globalAlpha * 16 / (this.lifeSpan );
        }
      }
    });
  }

  createPulse(isFill, radiusMetaRate, speedMetaRate) {
    const $this = this;
    const pulse = {
      center: {
        x: $this.canvasWidth * Math.random(),
        y: $this.canvasHeight * Math.random()
      },
      speedX : (Math.random() > 0.5 ? 1 : -1) * Math.random() * speedMetaRate,
      speedY : (Math.random() > 0.5 ? 1 : -1) * Math.random() * speedMetaRate,
      radiusMeta : (Math.random() > 0.5 ? 1 : -1) * radiusMetaRate * Math.random() ,
      borderWidth: $this.maxBorder * Math.random(),
      lifeSpan: $this.lifeSpan,
      life: 0,
      opacity: 0,
      radius: $this.maxSize * (Math.random() > $this.minRate ? Math.random() : $this.minRate) / 2,
      draw() {
        $this.ctx.beginPath();
        $this.ctx.lineWidth = this.borderWidth;
        $this.ctx.strokeStyle = $this.lineColor;
        $this.ctx.fillStyle = $this.fillColor;
        $this.ctx.globalAlpha = this.opacity;
        $this.ctx.arc(
          this.center.x,
          this.center.y,
          this.radius,
          0,
          Math.PI * 2,
          true
        );

        if (isFill){
          $this.ctx.fill();
        }
        else{
          $this.ctx.stroke();
        }

        $this.ctx.closePath();
      }

    };
    return pulse;
  }


  size() {
    const eleWidth = this.ele.getBoundingClientRect().width;
    const eleHeight = this.ele.getBoundingClientRect().height;
    if (this.space.width !== eleWidth || this.space.width !== eleHeight) {
      this.canvasWidth = this.ele.getBoundingClientRect().width;
      this.canvasHeight = this.ele.getBoundingClientRect().height;
      this.space.width = this.canvasWidth;
      this.space.height = this.canvasHeight;
    }
  }

  debounce(func, delay) {
    let timer = null;
    const $this: any = this;
    return () => {
      const context = $this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }



}
