"use client";

import { useState } from "react";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function estadoInicial() {
  return {
    rodadaAtual: 1,
    turno: "jogador1", // define qual botão "Jogar" está habilitado
    dadosJogador1: [null, null],
    dadosJogador2: [null, null],
    mensagemRodada: "Clique em Jogar para o Jogador 1",
    placar: { jogador1: 0, jogador2: 0, empates: 0 },
    jogoFinalizado: false,
    mensagemFinal: "",
  };
}

export default function JogoDados() {
  const [estado, setEstado] = useState(estadoInicial());

  const {
    rodadaAtual,
    turno,
    dadosJogador1,
    dadosJogador2,
    mensagemRodada,
    placar,
    jogoFinalizado,
    mensagemFinal,
  } = estado;

  function jogarJogador1() {
    const novosDados = [rolarDado(), rolarDado()];
    setEstado((prev) => ({
      ...prev,
      dadosJogador1: novosDados,
      turno: "jogador2",
      mensagemRodada: "Clique em Jogar para o Jogador 2",
    }));
  }

  function jogarJogador2() {
    const novosDadosJ2 = [rolarDado(), rolarDado()];

    setEstado((prev) => {
      const somaJ1 = prev.dadosJogador1[0] + prev.dadosJogador1[1];
      const somaJ2 = novosDadosJ2[0] + novosDadosJ2[1];

      let mensagemRodada;
      let novoPlacar = { ...prev.placar };

      if (somaJ1 > somaJ2) {
        mensagemRodada = "Jogador 1 venceu a rodada";
        novoPlacar.jogador1 += 1;
      } else if (somaJ2 > somaJ1) {
        mensagemRodada = "Jogador 2 venceu a rodada";
        novoPlacar.jogador2 += 1;
      } else {
        mensagemRodada = "Empate";
        novoPlacar.empates += 1;
      }

      const ultimaRodada = prev.rodadaAtual === TOTAL_RODADAS;

      if (ultimaRodada) {
        let mensagemFinal;
        if (novoPlacar.jogador1 > novoPlacar.jogador2) {
          mensagemFinal = "Jogador 1 venceu o jogo!";
        } else if (novoPlacar.jogador2 > novoPlacar.jogador1) {
          mensagemFinal = "Jogador 2 venceu o jogo!";
        } else {
          mensagemFinal = "Empate geral!";
        }

        return {
          ...prev,
          dadosJogador2: novosDadosJ2,
          placar: novoPlacar,
          mensagemRodada,
          jogoFinalizado: true,
          mensagemFinal,
        };
      }

      return {
        ...prev,
        dadosJogador2: novosDadosJ2,
        placar: novoPlacar,
        mensagemRodada,
      };
    });

    // Avança para a próxima rodada automaticamente (se não for a última)
    setTimeout(() => {
      setEstado((prev) => {
        if (prev.jogoFinalizado) return prev;
        return {
          ...prev,
          rodadaAtual: prev.rodadaAtual + 1,
          turno: "jogador1",
          dadosJogador1: [null, null],
          dadosJogador2: [null, null],
          mensagemRodada: "Clique em Jogar para o Jogador 1",
        };
      });
    }, 1500);
  }

  function jogarNovamente() {
    setEstado(estadoInicial());
  }

  return (
    <div className="jogo-container">
      <h1 className="titulo">Jogo de Dados</h1>
      <p className="rodada-info">
        Rodada {jogoFinalizado ? TOTAL_RODADAS : rodadaAtual}/{TOTAL_RODADAS}
      </p>

      <div className="jogadores">
        <div className="jogador-coluna">
          <h2>Jogador 1</h2>
          <div className="dados-linha">
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button
            className="botao-jogar"
            onClick={jogarJogador1}
            disabled={turno !== "jogador1" || jogoFinalizado}
          >
            Jogar
          </button>
          <p className="placar-item">Vitórias: {placar.jogador1}</p>
        </div>

        <div className="jogador-coluna">
          <h2>Jogador 2</h2>
          <div className="dados-linha">
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className="botao-jogar"
            onClick={jogarJogador2}
            disabled={turno !== "jogador2" || jogoFinalizado}
          >
            Jogar
          </button>
          <p className="placar-item">Vitórias: {placar.jogador2}</p>
        </div>
      </div>

      <div className="mensagem-box">
        {jogoFinalizado ? mensagemFinal : mensagemRodada}
      </div>

      {jogoFinalizado && (
        <button className="botao-jogar-novamente" onClick={jogarNovamente}>
          Jogar Novamente
        </button>
      )}
    </div>
  );
}
