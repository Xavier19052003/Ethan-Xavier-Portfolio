import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { assetUrl } from '../utils/assets'

type Particle = { x:number; y:number; tx:number; ty:number; sx:number; sy:number }
export function ExpExperience({ onClose }: { onClose:()=>void }) {
  const dialog = useRef<HTMLDialogElement>(null), canvas = useRef<HTMLCanvasElement>(null), logo = useRef<HTMLImageElement>(null)
  const pointer = useRef<{x:number;y:number}|null>(null), wake = useRef<()=>void>(()=>undefined)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null), closing = useRef(false)
  const stir = (x:number,y:number) => { if(timer.current) clearTimeout(timer.current); pointer.current={x,y}; wake.current(); timer.current=setTimeout(()=>{pointer.current=null;wake.current()},600) }
  const close = () => { if(closing.current)return; closing.current=true; if(timer.current)clearTimeout(timer.current); pointer.current=null; const element=dialog.current; if(!element || matchMedia('(prefers-reduced-motion: reduce)').matches) onClose(); else gsap.to(element,{opacity:0,duration:.25,onComplete:onClose}) }
  useEffect(()=>{
    const element=dialog.current, canvasEl=canvas.current, image=logo.current
    if(!element||!canvasEl||!image)return
    const previous=document.activeElement as HTMLElement|null, overflow=document.body.style.overflow
    const preference=matchMedia('(prefers-reduced-motion: reduce)')
    element.showModal(); document.body.style.overflow='hidden'; document.body.dataset.expOpen='true'; window.dispatchEvent(new Event('portfolio:dialog-presence'))
    if(!preference.matches)gsap.fromTo(element,{opacity:0},{opacity:1,duration:.4})
    const ctx=canvasEl.getContext('2d'); let raf=0, start=0, particles:Particle[]=[], disposed=false
    const draw=(time:number)=>{
      raf=0; if(!ctx||disposed||document.hidden||preference.matches)return
      if(!start)start=time
      const progress=Math.min(1,(time-start)/1500), ease=1-(1-progress)**3
      ctx.clearRect(0,0,canvasEl.width,canvasEl.height); let moving=progress<1
      for(const p of particles){const px=p.sx+(p.tx-p.sx)*ease,py=p.sy+(p.ty-p.sy)*ease;const dx=pointer.current?px-pointer.current.x:9999,dy=pointer.current?py-pointer.current.y:9999;const d=Math.hypot(dx,dy);const force=d<110?(110-d)*.32:0;const tx=px+(dx/(d||1))*force,ty=py+(dy/(d||1))*force;p.x+=(tx-p.x)*.12;p.y+=(ty-p.y)*.12;if(Math.abs(tx-p.x)+Math.abs(ty-p.y)>.3)moving=true;ctx.fillStyle='rgba(195,147,224,.85)';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill()}
      if(moving||pointer.current)raf=requestAnimationFrame(draw)
    }
    const begin=()=>{if(!raf&&!document.hidden&&!preference.matches)raf=requestAnimationFrame(draw)};wake.current=begin
    const setup=()=>{if(!ctx||!image.naturalWidth)return;canvasEl.width=element.clientWidth;canvasEl.height=element.clientHeight;const sample=document.createElement('canvas');sample.width=160;sample.height=106;const sc=sample.getContext('2d');if(!sc)return;sc.drawImage(image,0,0,160,106);const pixels=sc.getImageData(0,0,160,106).data;const bounds=image.getBoundingClientRect(),outer=element.getBoundingClientRect();particles=[];const step=element.clientWidth<600?7:5;for(let y=0;y<106;y+=step)for(let x=0;x<160;x+=step){const i=(y*160+x)*4;if(pixels[i+3]>80&&(pixels[i]+pixels[i+1]+pixels[i+2])<700){const tx=bounds.left-outer.left+x/160*bounds.width,ty=bounds.top-outer.top+y/106*bounds.height;const a=(x*13+y*7)*.04,r=90+(x+y)%180;particles.push({tx,ty,sx:tx+Math.cos(a)*r,sy:ty+Math.sin(a)*r,x:tx+Math.cos(a)*r,y:ty+Math.sin(a)*r})}}start=0;begin()}
    const visibility=()=>{if(document.hidden||preference.matches){cancelAnimationFrame(raf);raf=0;ctx?.clearRect(0,0,canvasEl.width,canvasEl.height)}else begin()}
    image.addEventListener('load',setup);window.addEventListener('resize',setup);document.addEventListener('visibilitychange',visibility);preference.addEventListener('change',visibility);if(image.complete)setup()
    return()=>{disposed=true;cancelAnimationFrame(raf);if(timer.current)clearTimeout(timer.current);image.removeEventListener('load',setup);window.removeEventListener('resize',setup);document.removeEventListener('visibilitychange',visibility);preference.removeEventListener('change',visibility);gsap.killTweensOf(element);element.close();document.body.style.overflow=overflow;delete document.body.dataset.expOpen;previous?.focus({preventScroll:true});window.dispatchEvent(new Event('portfolio:dialog-presence'))}
  },[])
  return <dialog ref={dialog} className="exp-experience" aria-labelledby="exp-title" onCancel={event=>{event.preventDefault();close()}} onPointerDown={event=>{const box=event.currentTarget.getBoundingClientRect();stir(event.clientX-box.left,event.clientY-box.top)}} onPointerMove={event=>{const box=event.currentTarget.getBoundingClientRect();stir(event.clientX-box.left,event.clientY-box.top)}} onPointerLeave={()=>{pointer.current=null;wake.current()}}>
    <button type="button" className="exp-close" onClick={close} aria-label="Close EXP experience">Close ×</button><canvas ref={canvas} className="exp-particles" aria-hidden="true"/><div className="exp-content"><p className="eyebrow">A LITTLE CURIOSITY</p><h2 id="exp-title">Explore EXP</h2><div className="exp-logo-surface"><img ref={logo} src={assetUrl('images/exp-logo.png')} alt="Original EXP monogram"/></div><p>Move your pointer or touch to stir the pattern.</p><div className="exp-controls"><button type="button" onClick={()=>stir(innerWidth*.35,innerHeight*.5)}>Stir left</button><button type="button" onClick={()=>stir(innerWidth*.65,innerHeight*.5)}>Stir right</button></div></div>
  </dialog>
}
