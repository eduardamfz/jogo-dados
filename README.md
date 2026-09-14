# Jogo de Dados

Jogo de dados em Next.js disputado entre 2 jogadores, em 5 rodadas.
Em cada rodada, cada jogador joga dois dados; vence quem tiver a maior soma.
Ao final das 5 rodadas, o jogo exibe o vencedor da partida (ou empate geral)
e permite jogar novamente.

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Estrutura

- `app/components/Dado.js` — componente que recebe a prop `valor` (1 a 6) e
  exibe a imagem do dado correspondente (SVGs em `public/dados`).
- `app/components/JogoDados.js` — componente principal com toda a lógica do
  jogo (rodadas, turnos, placar, mensagens e reinício).
- `public/dados/1.svg` ... `6.svg` — imagens dos dados.

## Deploy

Este projeto pode ser publicado diretamente na Vercel:

```bash
npm i -g vercel
vercel
```
