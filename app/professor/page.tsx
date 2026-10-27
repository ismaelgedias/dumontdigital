import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
import TeacherEditor from '@/components/TeacherEditor'
import {lessons} from '@/lib/course'
export default async function TeacherPage(){
 const supabase=await createClient()
 const {data:{user}}=await supabase.auth.getUser()
 if(!user)redirect('/login')
 const {data:role}=await supabase.from('teacher_accounts').select('user_id').eq('user_id',user.id).maybeSingle()
 if(!role)redirect('/aluno')
 const {data:records,error}=await supabase.from('course_lessons').select('id,title,description,video_url,material_url,is_published').order('id')
 return <main className="container" style={{paddingTop:35,paddingBottom:70}}><span className="pill">ADMINISTRAÇÃO</span><h1>Área do professor</h1><p className="muted">Cadastre os vídeos, materiais e publique as aulas do Robô de Sumô. As alterações aparecem para os alunos sem novo deploy.</p>{error?<p className="error">Erro ao consultar aulas: {error.message}. Execute o SQL teacher.sql no Supabase.</p>:<TeacherEditor initial={records??[]} catalog={lessons}/>}</main>
}
