import Image from "next/image";

/**
 * Componente Dado
 * Recebe uma prop `valor` (número entre 1 e 6) e exibe a imagem
 * correspondente ao valor sorteado. Se não houver valor (jogo ainda
 * não iniciado na rodada), exibe um dado "vazio" (interrogação).
 */
export default function Dado({ valor }) {
  const valorValido = valor >= 1 && valor <= 6;

  return (
    <div className="dado">
      {valorValido ? (
        <Image
          src={`/dados/${valor}.svg`}
          alt={`Dado com valor ${valor}`}
          width={70}
          height={70}
          priority
        />
      ) : (
        <span className="dado-vazio">?</span>
      )}
    </div>
  );
}
