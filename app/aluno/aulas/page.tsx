import {lessons} from '@/lib/course'
import {createClient} from '@/lib/supabase/server'
import LessonAction from '@/components/LessonAction'
function youtubeId(link:string){try{const u=new URL(link);const host=u.hostname.replace(/^www\./,'');if(host==='youtu.be')return u.pathname.slice(1).split('/')[0];if(host==='youtube.com'||host==='m.youtube.com'){if(u.pathname==='/watch')return u.searchParams.get('v');const match=u.pathname.match(/^\/(live|embed)\/([^/]+)/);return match?.[2]??null}}catch{}return null}
export default async function Lessons(){
 const supabase=await createClient()
 const {data:{user}}=await supabase.auth.getUser()
 if(!user)return null
 const [{data:progress},{data:published}]=await Promise.all([supabase.from('lesson_progress').select('lesson_id').eq('user_id',user.id),supabase.from('course_lessons').select('id,title,description,video_url,material_url').eq('is_published',true)])
 const done=new Set((progress??[]).map(p=>p.lesson_id))
 const byId=new Map((published??[]).map(l=>[l.id,l]))
 return <main><span className="pill">CURSO 01 · 8 SEMANAS</span><h1>🤖 Robô de Sumô</h1><p className="muted">16 aulas de eletrônica, Arduino e C/C++. Assista às aulas publicadas abaixo.</p><div className="card"><h2>Conteúdo do curso</h2>{lessons.map(l=>{const entry=byId.get(l.id);const video=entry?.video_url?youtubeId(entry.video_url):null;return <div className="lesson-entry" key={l.id}><div className="lessonrow"><div><b>{String(l.id).padStart(2,'0')}. {entry?.title??l.title}</b><div className="muted" style={{fontSize:13}}>Semana {l.week} · {l.kind} · {entry?'Publicada':'Em breve'}</div></div>{entry?<LessonAction lessonId={l.id} done={done.has(l.id)}/>:null}</div>{entry&&<div>{entry.description&&<p className="muted">{entry.description}</p>}{video&&<div className="video"><iframe title={'Aula '+l.id} width="100%" height="100%" src={'https://www.youtube-nocookie.com/embed/'+encodeURIComponent(video)} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{border:0,borderRadius:16}}/></div>}{entry.video_url&&!video&&<p className="error">Link de vídeo inválido. Avise o professor.</p>}{entry.material_url&&<p><a className="button small" href={entry.material_url} target="_blank" rel="noopener noreferrer">Abrir material da aula ↗</a></p>}</div>}</div>})}</div></main>
}
