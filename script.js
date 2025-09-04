
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
