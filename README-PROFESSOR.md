# Dumont Digital — v2 Área do Professor

## Passos
1. No Supabase > SQL Editor, execute **supabase/teacher.sql**.
2. No Supabase > Authentication > Users, crie uma conta própria para o professor (se ainda não existir).
3. No SQL Editor, execute a instrução abaixo trocando pelo e-mail exato do professor:

```sql
insert into public.teacher_accounts(user_id)
select id from auth.users where email = 'SEU_EMAIL_DE_PROFESSOR'
on conflict (user_id) do nothing;
```

4. Envie os arquivos desta v2 para o **mesmo repositório GitHub** já ligado à Vercel. Não crie outro projeto Vercel.
5. Confira que as variáveis de ambiente continuam presentes. Esta v2 aceita `NEXT_PUBLIC_SUPABASE_ANON_KEY` **ou** `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, além da URL.
6. Aguarde o deploy e faça login com a conta do professor; acesse `/professor`.
7. Cadastre título, descrição, URL de vídeo YouTube, URL de material e marque 'Publicar'.
8. Entre como aluno em `/aluno/aulas` para ver apenas aulas publicadas.

## Segurança e limites
- Autorização feita no banco por RLS; não basta digitar a URL `/professor`.
- Os links do YouTube não são privados de fato; pessoas com o link podem compartilhar vídeos não listados.
- Nesta versão são 16 aulas fixas do primeiro curso; vídeos são incorporados, não enviados ao YouTube.
- Progresso do aluno continua na tabela `lesson_progress` original.
- Faça backup do repositório e teste com contas diferentes antes de liberar aos alunos.
