import Link from 'next/link'
import {redirect} from 'next/navigation'
import {createClient} from '@/lib/supabase/server'
import Logout from '@/components/Logout'
export default async function StudentLayout({children}:{children:React.ReactNode}){const supabase=await createClient();const {data,error}=await supabase.auth.getUser();if(error||!data.user)redirect('/login');return <div className="container layout"><aside className="sidebar"><Link href="/aluno">⌂ Início</Link><Link href="/aluno/aulas">▶ Minhas aulas</Link><Logout/></aside><div>{children}</div></div>}
