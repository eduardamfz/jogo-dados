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
  const [estado, setEstado] =
