'use client'
import {useState} from 'react'
import {createClient} from '@/lib/supabase/client'
type Lesson={id:number,title:string,description:string,video_url:string,material_url:string,is_published:boolean}
type Catalog={id:number,title:string,week:number,kind:string}
const videoOK=(v:string)=>!v||/^https:\/\/(www\.)?(youtube\.com\/(watch\?v=|live\/|embed\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}(?:[?&][^\s]*)?$/.test(v.trim())
const urlOK=(v:string)=>!v||(()=>{try{return new URL(v).protocol==='https:'}catch{return false}})()
export default function TeacherEditor({initial,catalog}:{initial:Lesson[],catalog:Catalog[]}){
 const [records,setRecords]=useState<Lesson[]>(initial)
 const [selected,setSelected]=useState(1)
 const [busy,setBusy]=useState(false)
 const [notice,setNotice]=useState('')
 const base=catalog.find(x=>x.id===selected)!
 const current=records.find(x=>x.id===selected)??{id:selected,title:base.title,description:'',video_url:'',material_url:'',is_published:false}
 function edit(patch:Partial<Lesson>){setRecords(prev=>[...prev.filter(x=>x.id!==selected),{...current,...patch}]) ;setNotice('')}
 async function save(){
  if(!current.title.trim()){setNotice('Informe o título da aula.');return}
  if(!videoOK(current.video_url)){setNotice('Informe uma URL válida do YouTube (https).');return}
  if(!urlOK(current.material_url)){setNotice('O material precisa ser um link https válido.');return}
  setBusy(true);setNotice('')
  const supabase=createClient()
  const {error}=await supabase.from('course_lessons').upsert({id:selected,title:current.title.trim(),description:current.description,video_url:current.video_url.trim(),material_url:current.material_url.trim(),is_published:current.is_published,updated_at:new Date().toISOString()},{onConflict:'id'})
  setBusy(false);setNotice(error?'Erro ao salvar: '+error.message:'Aula salva com sucesso!')
 }
 return <div className="teacher-grid"><div className="card"><h2>Aulas</h2>{catalog.map(l=>{const item=records.find(x=>x.id===l.id);return <button type="button" key={l.id} className={'teacher-choice '+(selected===l.id?'selected':'')} onClick={()=>{setSelected(l.id);setNotice('')}}><span>{String(l.id).padStart(2,'0')}. {item?.title??l.title}</span><small>{item?.is_published?'● Publicada':'○ Rascunho'}</small></button>})}</div><div className="card"><h2>Editar aula {selected}</h2><p className="muted">Semana {base.week} · {base.kind}</p><label className="teacher-label">Título<input value={current.title} maxLength={160} onChange={e=>edit({title:e.target.value})}/></label><label className="teacher-label">Descrição<textarea rows={5} value={current.description} onChange={e=>edit({description:e.target.value})}/></label><label className="teacher-label">Link do vídeo ou live no YouTube<input type="url" placeholder="https://www.youtube.com/watch?v=..." value={current.video_url} onChange={e=>edit({video_url:e.target.value})}/></label><label className="teacher-label">Link do material (PDF, Drive etc.)<input type="url" placeholder="https://..." value={current.material_url} onChange={e=>edit({material_url:e.target.value})}/></label><label className="teacher-label" style={{display:'flex',gap:10,alignItems:'center'}}><input type="checkbox" checked={current.is_published} onChange={e=>edit({is_published:e.target.checked})}/> Publicar para os alunos</label><button className="primary" disabled={busy} onClick={save}>{busy?'Salvando...':'Salvar aula'}</button>{notice&&<p role="status" className={notice.startsWith('Aula salva')?'success':'error'}>{notice}</p>}<p className="muted" style={{fontSize:13}}>O vídeo fica hospedado no YouTube. Este formulário cadastra o link, não envia arquivos ao YouTube.</p></div></div>
}
