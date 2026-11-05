import { useEffect, useRef, useState, type CSSProperties } from 'react'
const nodes = [
  { id:'react', label:'React', category:'Frontend', x:15, y:18, links:['typescript','vite','css'] },
  { id:'typescript', label:'TypeScript', category:'Frontend', x:39, y:15, links:['react','vite'] },
  { id:'vite', label:'Vite', category:'Frontend', x:65, y:17, links:['react','typescript','gsap'] },
  { id:'gsap', label:'GSAP', category:'Frontend', x:87, y:25, links:['vite','css'] },
  { id:'css', label:'CSS3', category:'Frontend', x:18, y:53, links:['react','gsap','ux'] },
  { id:'ux', label:'UI/UX Prototyping', category:'Design', x:43, y:48, links:['css','figma'] },
  { id:'figma', label:'Figma', category:'Design', x:72, y:52, links:['ux'] },
  { id:'kotlin', label:'Kotlin', category:'Mobile', x:14, y:84, links:['compose','studio','mvvm'] },
  { id:'compose', label:'Jetpack Compose', category:'Mobile', x:38, y:82, links:['kotlin','mvvm'] },
  { id:'studio', label:'Android Studio', category:'Mobile', x:66, y:80, links:['kotlin'] },
  { id:'mvvm', label:'MVVM Architecture', category:'Mobile', x:87, y:84, links:['kotlin','compose'] },
]
export function SkillsConstellation() {
  const container = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const element = container.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .05 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  const [selected, setSelected] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const activeId = preview || selected
  const active = nodes.find(node => node.id === activeId)
  const project = activeId && ['kotlin', 'compose', 'mvvm'].includes(activeId) ? { id: 'kitabu', name: 'Kitabu' } : null
  const coords = (index:number, mobile:boolean) => mobile ? { x: index % 2 ? 75 : 25, y: 8 + Math.floor(index / 2) * 16 } : nodes[index]
  const edges = nodes.flatMap((node,i) => node.links.filter(id => nodes.findIndex(n => n.id === id) > i).map(id => ({ from:i, to:nodes.findIndex(n=>n.id===id) })))
  return <div ref={container} className="constellation" data-in-view={inView}><div className="constellation-heading"><div><span className="constellation-kicker">✳ &nbsp; THE BIGGER PICTURE</span><h3>How my tools <span>connect.</span></h3><p>Select a technology to explore its connections.</p></div><span className="constellation-count" aria-hidden="true">11 TOOLS <span> / </span> ONE CREATIVE MIND</span></div><div className="constellation-map" role="group" aria-label="Connected technologies">
    <div className="constellation-atmosphere" aria-hidden="true"><span className="constellation-orbit orbit-one"/><span className="constellation-orbit orbit-two"/>{Array.from({length: 36}, (_, index) => <i key={index} className="constellation-particle" style={{ '--star-x': `${(index * 37 + 11) % 97}%`, '--star-y': `${(index * 53 + 7) % 93}%`, '--star-delay': `${-(index % 9) * .43}s`, '--star-size': `${index % 7 === 0 ? 4 : 2}px` } as CSSProperties}/>)}</div>
    {[false,true].map(mobile => <svg key={String(mobile)} className={mobile ? 'constellation-lines mobile-lines' : 'constellation-lines desktop-lines'} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{edges.map(edge=>{const a=coords(edge.from,mobile),b=coords(edge.to,mobile);return <line key={`${edge.from}-${edge.to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} data-active={nodes[edge.from].id===activeId||nodes[edge.to].id===activeId}/>} )}</svg>)}
    {nodes.map((node,index)=>{const mobile=coords(index,true);return <button key={node.id} type="button" className="constellation-node" style={{ '--x':`${node.x}%`, '--y':`${node.y}%`, '--mx':`${mobile.x}%`, '--my':`${mobile.y}%` } as CSSProperties} aria-pressed={selected===node.id} data-preview={activeId===node.id} onPointerEnter={event=>{if(event.pointerType==='mouse')setPreview(node.id)}} onPointerLeave={()=>setPreview(null)} onFocus={()=>setPreview(node.id)} onBlur={()=>setPreview(null)} onClick={()=>setSelected(node.id)}>{node.label}</button>})}
    </div><div className="constellation-footer"><p className="constellation-detail" aria-live="polite">{active ? <><strong>{active.label}</strong> · {active.category} · Connected with {active.links.map(id=>nodes.find(node=>node.id===id)?.label).filter(Boolean).join(', ')}. {project && <a href={`#project/${project.id}`}>Explore {project.name} ↗</a>}</> : 'Select a technology to see its connections.'}</p><button type="button" className="constellation-clear" onClick={()=>{setSelected(null);setPreview(null)}}>Clear selection <span aria-hidden="true">↗</span></button></div></div>
}
