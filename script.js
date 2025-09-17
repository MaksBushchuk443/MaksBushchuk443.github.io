
document.getElementById('year').textContent = new Date().getFullYear();


const c = document.getElementById('gridfx');
const ctx = c.getContext('2d');
let w, h, t = 0;
function resize(){
  w = c.width = window.innerWidth * devicePixelRatio;
  h = c.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener('resize', resize); resize();

function loop(){
  t += 0.004;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#0affff';
  const gap = 32 * devicePixelRatio;
  const ox = Math.sin(t)*gap, oy = Math.cos(t*1.2)*gap;
  for(let y=0; y<h; y+=gap){
    for(let x=0; x<w; x+=gap){
      const r = 1 + Math.sin((x+ox+y*0.5)*0.01 + t)*0.7;
      ctx.beginPath();
      ctx.arc(x+ox*0.2, y+oy*0.2, r, 0, Math.PI*2);
      ctx.fill();
    }
  }
  requestAnimationFrame(loop);
}
loop();

function setHeaderVar(){
  const bar = document.querySelector('.xbar');
  if(!bar) return;
  const h = bar.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--header-h', `${Math.round(h)}px`);
}
setHeaderVar();
addEventListener('resize', setHeaderVar);


const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
if(!supportsSmooth){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const el = document.querySelector(id);
      if(!el) return;
      e.preventDefault();
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))||0;
      const y = el.getBoundingClientRect().top + window.pageYOffset - header - 12;
      const start = window.pageYOffset, dist = y - start, dur = 500;
      let t0=null;
      requestAnimationFrame(function step(ts){
        if(!t0) t0 = ts;
        const p = Math.min(1, (ts - t0)/dur);           
        const ease = 0.5 - Math.cos(Math.PI*p)/2;       
        window.scrollTo(0, start + dist*ease);
        if(p<1) requestAnimationFrame(step);
      });
    });
  });
}