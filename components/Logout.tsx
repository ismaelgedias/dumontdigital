'use client'
import {createClient} from '@/lib/supabase/client'
import {useRouter} from 'next/navigation'
export default function Logout(){const router=useRouter();return <button className="secondary" onClick={async()=>{await createClient().auth.signOut();router.replace('/login');router.refresh()}}>Sair da conta</button>}
