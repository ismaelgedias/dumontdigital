'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {createClient} from '@/lib/supabase/client'
export default function LessonAction({lessonId,done}:{lessonId:number,done:boolean}){const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const router=useRouter();async function mark(){setBusy(true);const supabase=createClient();const {data:{user}}=await supabase.auth.getUser();if(!user){setMessage('Faça login novamente.');setBusy(false);return}const {error}=await supabase.from('lesson_progress').upsert({user_id:user.id,lesson_id:lessonId},{onConflict:'user_id,lesson_id'});setBusy(false);if(error){setMessage('Erro ao salvar o progresso.');return}router.refresh()}return <span><button className="primary" disabled={busy||done} onClick={mark}>{done?'✓ Concluída':busy?'Salvando...':'Marcar como concluída'}</button>{message&&<small className="error"> {message}</small>}</span>}
