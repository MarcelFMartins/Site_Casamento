# Configurando o Mural de Recados com Supabase

O site agora é 100% estático (sem PHP), pronto para hospedar na Vercel ou no GitHub Pages.
O Mural de Recados usa o [Supabase](https://supabase.com) como banco de dados.

## 1. Criar o projeto

1. Crie uma conta em https://supabase.com e clique em **New project**.
2. Escolha um nome (ex: `site-casamento`), uma senha para o banco e a região mais próxima (ex: São Paulo).
3. Aguarde o projeto terminar de ser provisionado (leva 1-2 minutos).

## 2. Criar a tabela `recados`

No painel do Supabase, vá em **SQL Editor** → **New query**, cole o SQL abaixo e clique em **Run**:

```sql
create table recados (
  id bigint generated always as identity primary key,
  nome text not null,
  mensagem text not null,
  created_at timestamptz not null default now()
);

alter table recados enable row level security;

-- Permite que qualquer visitante do site leia os recados
create policy "Qualquer um pode ler recados"
  on recados for select
  using (true);

-- Permite que qualquer visitante envie um novo recado
create policy "Qualquer um pode enviar recado"
  on recados for insert
  with check (
    char_length(nome) between 1 and 100
    and char_length(mensagem) between 1 and 1000
  );
```

## 3. Pegar a URL e a chave pública (anon key)

1. No painel, vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie o **Project URL** e a chave em **Project API keys → anon public**.

## 4. Configurar o site

Abra o arquivo `supabase-config.js` na raiz do projeto e substitua:

```js
const SUPABASE_URL = 'COLE_AQUI_A_URL_DO_SEU_PROJETO';
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_ANON_KEY_DO_SEU_PROJETO';
```

pelos valores copiados no passo 3. Salve o arquivo.

## 5. Testar localmente

Basta abrir o `index.html` em um servidor local (ex: extensão "Live Server" do VS Code, ou
`python3 -m http.server`) e testar o formulário "Deixe um Recado" — a mensagem deve aparecer
no Mural de Carinho logo abaixo.

## 6. Publicar

- **Vercel**: importe o repositório em https://vercel.com/new — não precisa de nenhuma
  configuração de build, é um site estático.
- **GitHub Pages**: em *Settings → Pages* do repositório, selecione a branch e a pasta raiz.

A chave `anon` do Supabase é pública por natureza (ela só permite o que as políticas de RLS
acima liberam), então pode ficar exposta no código do site sem problema.
