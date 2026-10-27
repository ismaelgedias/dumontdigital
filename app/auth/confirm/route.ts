import { NextRequest, NextResponse } from 'next/server'
import {createClient} from '@/lib/supabase/server'
export async function GET(request:NextRequest){const url=new URL(request.url);const token_hash=url.searchParams.get('token_hash');const type=url.searchParams.get('type');if(token_hash&&type){const supabase=await createClient();await supabase.auth.verifyOtp({token_hash,type:type as 'recovery'|'email'|'invite'|'signup'})}return NextResponse.redirect(new URL('/login',url.origin))}
