# Dumont Digital — Next.js + Supabase

Projeto inicial da plataforma independente em `digital.escoladumont.com.br`.

## 1. Preparar ambiente
- Instale Node.js 20.9+ e npm.
- Abra a pasta no VS Code e execute `npm install`.
- Crie projeto em https://supabase.com/dashboard.
- No Supabase, abra SQL Editor e execute `supabase/schema.sql`.
- Copie `.env.example` para `.env.local` e preencha URL e chave **publishable** do Supabase. **Nunca use service_role/secret no frontend**.
- No Supabase Authentication > Providers > Email, mantenha cadastro público desabilitado para que somente a escola crie/convide usuários. Em Authentication > Users, crie um usuário de teste.
- Execute `npm run dev` e abra http://localhost:3000.

## 2. Publicar
- Suba esta pasta para um repositório privado no GitHub (sem `.env.local`).
- Na Vercel, importe o repositório e configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` nos Environment Variables.
- Faça o deploy. Em Vercel > Project > Settings > Domains, adicione `digital.escoladumont.com.br`.
- No painel DNS do domínio (que pode estar no Wix ou no registrador), crie o registro indicado pela Vercel. Não altere os registros do domínio raiz.
- No Supabase Authentication > URL Configuration, configure Site URL com a URL publicada e Redirect URLs para `https://digital.escoladumont.com.br/**` (e URL de preview somente se necessário).
- Confirme que o HTTPS está ativo e teste login e progresso com dois usuários diferentes.

## Escopo desta versão
- Home responsiva, login, sessão SSR por cookies, páginas protegidas, 16 aulas listadas, conclusão individual no Supabase.
- Ainda não há vídeos, matrículas pagas, painel administrativo, envio de tarefas ou integração de videoconferência.
- O botão de recuperação solicita e-mail; antes de produção, implementar tela para definir nova senha no fluxo de recuperação.
- Para menores de idade, planejar consentimento e fluxo de contas dos responsáveis, políticas de privacidade e proteção de dados antes de lançar.

## Observações
- Não publique links de vídeo não listados como se fossem proteção de conteúdo pago.
- O esquema SQL só permite leitura e gravação do próprio progresso; novas tabelas devem ter políticas RLS próprias.
- Verifique a política comercial do plano Vercel escolhido antes de operar a escola.
