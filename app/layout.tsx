import './globals.css'
import Link from 'next/link'
export const metadata={title:'Dumont Digital | Escola de Robótica',description:'Aprenda robótica com projetos, kits e aulas ao vivo.'}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><header><nav className="container nav"><Link className="brand" href="/">⬡ <span>DUMONT <b>DIGITAL</b></span></Link><div className="links"><Link href="/#projetos">Projetos</Link><Link href="/#como">Como funciona</Link><Link href="/login" className="button small">Área do aluno</Link></div></nav></header>{children}<footer><div className="container">DUMONT DIGITAL · Robótica de verdade, de qualquer lugar · Protótipo 2026</div></footer></body></html>}
