import React, { useMemo } from 'react';
import { Genotype, TraitColor, TraitShape, GENE_COLOR_DOMINANT, GENE_SHAPE_DOMINANT } from '../types';
import PeaIcon from './PeaIcon';

interface PunnettSquareProps {
  parent1: Genotype;
  parent2: Genotype;
}

const getGametes = (genotype: Genotype): string[] => {
  const c = genotype.colorAlleles.split('');
  const s = genotype.shapeAlleles.split('');
  // FOIL method: First, Outside, Inside, Last
  // e.g., YyRr -> YR, Yr, yR, yr
  return [
    c[0] + s[0],
    c[0] + s[1],
    c[1] + s[0],
    c[1] + s[1]
  ];
};

const getPhenotypeFromGenotypeStr = (genoStr: string): { color: TraitColor, shape: TraitShape } => {
  // genoStr format example: "YYRR" or "YyRr"
  const hasDominantColor = genoStr.includes(GENE_COLOR_DOMINANT);
  const hasDominantShape = genoStr.includes(GENE_SHAPE_DOMINANT);
  
  return {
    color: hasDominantColor ? TraitColor.Yellow : TraitColor.Green,
    shape: hasDominantShape ? TraitShape.Round : TraitShape.Wrinkled
  };
};

const PunnettSquare: React.FC<PunnettSquareProps> = ({ parent1, parent2 }) => {
  const p1Gametes = useMemo(() => getGametes(parent1), [parent1]);
  const p2Gametes = useMemo(() => getGametes(parent2), [parent2]);

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <h3 className="text-lg font-bold text-center mb-4 text-emerald-800">遗传棋盘 (F2代 预测)</h3>
      <div className="inline-block min-w-max">
        <div className="grid grid-cols-5 gap-1">
          {/* Header Row */}
          <div className="bg-stone-100 p-2 rounded-tl-lg font-bold text-stone-500 flex items-center justify-center text-xs sm:text-sm">
            亲本1 \ 亲本2
          </div>
          {p2Gametes.map((g, i) => (
            <div key={`p2-${i}`} className="bg-emerald-100 p-2 font-bold text-emerald-800 flex items-center justify-center rounded-t-lg">
              {g}
            </div>
          ))}

          {/* Rows */}
          {p1Gametes.map((g1, i) => (
            <React.Fragment key={`row-${i}`}>
              {/* Row Header */}
              <div className="bg-emerald-100 p-2 font-bold text-emerald-800 flex items-center justify-center rounded-l-lg">
                {g1}
              </div>
              {/* Cells */}
              {p2Gametes.map((g2, j) => {
                // Combine gametes, sort letters for convention (e.g. YyRr)
                const raw = g1 + g2; 
                const ys = (raw.match(/[Yy]/g) || []).sort().join(''); 
                const rs = (raw.match(/[Rr]/g) || []).sort().join('');
                
                const sortAlleles = (str: string) => str.split('').sort().join('');
                
                const combinedGenotype = sortAlleles(ys) + sortAlleles(rs);
                const phenotype = getPhenotypeFromGenotypeStr(combinedGenotype);

                return (
                  <div key={`cell-${i}-${j}`} className="bg-white border border-stone-200 p-2 flex flex-col items-center justify-center hover:bg-emerald-50 transition-colors h-24 w-24">
                    <PeaIcon color={phenotype.color} shape={phenotype.shape} size={32} />
                    <span className="text-xs text-stone-500 font-mono mt-1">{combinedGenotype}</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PunnettSquare;