type Props = {
  atual: number;
  total: number;
};

export function ProgressBar({ atual, total }: Props) {
  const percentual = Math.round(((atual + 1) / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center text-xs font-semibold text-[#737373] mb-2">
        <span className="uppercase tracking-wider text-[#4FA180]">
          Pergunta {atual + 1} de {total}
        </span>
        <span className="text-[#17332A] font-bold">{percentual}% concluído</span>
      </div>
      <div className="w-full bg-[#E1E8E4] h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#4FA180] to-[#5CBD97] h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentual}%` }}
        />
      </div>
    </div>
  );
}
