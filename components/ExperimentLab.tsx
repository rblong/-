import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Play, RotateCcw, Info } from 'lucide-react';
import { 
  Genotype, 
  TraitColor, 
  TraitShape, 
  GENE_COLOR_DOMINANT, 
  GENE_COLOR_RECESSIVE, 
  GENE_SHAPE_DOMINANT, 
  GENE_SHAPE_RECESSIVE 
} from '../types';
import PeaIcon from './PeaIcon';
import PunnettSquare from './PunnettSquare';

const INITIAL_PARENT_1: Genotype = { colorAlleles: 'YY', shapeAlleles: 'RR' }; // Pure Yellow Round
const INITIAL_PARENT_2: Genotype = { colorAlleles: 'yy', shapeAlleles: 'rr' }; // Pure Green Wrinkled

const ExperimentLab: React.FC = () => {
  const [parent1, setParent1] = useState<Genotype>(INITIAL_PARENT_1);
  const [parent2, setParent2] = useState<Genotype>(INITIAL_PARENT_2);
  const [generation, setGeneration] = useState<number>(0);
  const [offspringStats, setOffspringStats] = useState<any[]>([]);

  // Helpers to get phenotype
  const getPhenotype = (g: Genotype) => {
    const isYellow = g.colorAlleles.includes(GENE_COLOR_DOMINANT);
    const isRound = g.shapeAlleles.includes(GENE_SHAPE_DOMINANT);
    const colorStr = isYellow ? '黄色' : '绿色';
    const shapeStr = isRound ? '圆粒' : '皱粒';
    return {
      color: isYellow ? TraitColor.Yellow : TraitColor.Green,
      shape: isRound ? TraitShape.Round : TraitShape.Wrinkled,
      name: `${colorStr}${shapeStr}`
    };
  };

  const calculateStatistics = () => {
    // Simulate F2 theoretical ratio for current parents
    // 1. Get gametes
    const getG = (p: Genotype) => {
       const c = p.colorAlleles.split('');
       const s = p.shapeAlleles.split('');
       return [c[0]+s[0], c[0]+s[1], c[1]+s[0], c[1]+s[1]];
    };
    const g1 = getG(parent1);
    const g2 = getG(parent2);
    
    const counts: Record<string, number> = {};
    
    g1.forEach(gam1 => {
        g2.forEach(gam2 => {
            // Reconstruct genotype
            const allC = (gam1[0] + gam2[0]);
            const allS = (gam1[1] + gam2[1]);
            const hasY = allC.includes(GENE_COLOR_DOMINANT);
            const hasR = allS.includes(GENE_SHAPE_DOMINANT);
            const key = `${hasY ? '黄色' : '绿色'}${hasR ? '圆粒' : '皱粒'}`;
            counts[key] = (counts[key] || 0) + 1;
        });
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      ratio: count, // 16 total
      color: name.includes('黄色') ? '#FACC15' : '#4ADE80'
    }));
  };

  const handleCross = () => {
    const stats = calculateStatistics();
    setOffspringStats(stats);
    setGeneration(g => g + 1);
  };

  const handleReset = () => {
    setParent1(INITIAL_PARENT_1);
    setParent2(INITIAL_PARENT_2);
    setGeneration(0);
    setOffspringStats([]);
  };

  const GenotypeSelector = ({ 
    label, 
    value, 
    onChange 
  }: { 
    label: string, 
    value: Genotype, 
    onChange: (g: Genotype) => void 
  }) => (
    <div className="flex flex-col items-center bg-white p-5 rounded-2xl shadow-md border-2 border-emerald-50 w-full md:w-72 transition-all hover:border-emerald-200">
      <h4 className="font-bold text-emerald-900 mb-3 text-lg bg-emerald-50 px-4 py-1 rounded-full">{label}</h4>
      <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
        <PeaIcon color={getPhenotype(value).color} shape={getPhenotype(value).shape} size={80} />
      </div>
      <div className="flex flex-col gap-3 mb-3 w-full">
         {/* Color Genes */}
         <div className="flex items-center justify-between gap-2 text-sm text-stone-600 bg-stone-50 p-2 rounded-lg">
           <span className="font-medium">颜色:</span>
           <select 
             className="bg-white border border-stone-300 rounded px-2 py-1 font-mono text-stone-800 flex-1 outline-none focus:ring-2 focus:ring-emerald-200"
             value={value.colorAlleles}
             onChange={(e) => onChange({ ...value, colorAlleles: e.target.value })}
           >
             <option value="YY">YY (黄色纯合)</option>
             <option value="Yy">Yy (黄色杂合)</option>
             <option value="yy">yy (绿色纯合)</option>
           </select>
         </div>
         {/* Shape Genes */}
         <div className="flex items-center justify-between gap-2 text-sm text-stone-600 bg-stone-50 p-2 rounded-lg">
           <span className="font-medium">形状:</span>
           <select 
             className="bg-white border border-stone-300 rounded px-2 py-1 font-mono text-stone-800 flex-1 outline-none focus:ring-2 focus:ring-emerald-200"
             value={value.shapeAlleles}
             onChange={(e) => onChange({ ...value, shapeAlleles: e.target.value })}
           >
             <option value="RR">RR (圆粒纯合)</option>
             <option value="Rr">Rr (圆粒杂合)</option>
             <option value="rr">rr (皱粒纯合)</option>
           </select>
         </div>
      </div>
      <div className="text-base text-emerald-800 font-bold mt-1">
        {getPhenotype(value).name}
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* 1. Parents Layer */}
      <div className="relative">
        {/* Connector Line (Visual) */}
        <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-stone-100 -z-10 hidden md:block" />
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
          <GenotypeSelector label="豌豆爸爸" value={parent1} onChange={setParent1} />
          
          <div className="bg-white rounded-full p-2 shadow-sm border border-stone-100 z-10">
             <span className="text-4xl font-light text-stone-300 block leading-none px-2">×</span>
          </div>

          <GenotypeSelector label="豌豆妈妈" value={parent2} onChange={setParent2} />
        </div>
      </div>

      {/* 2. Action Layer */}
      <div className="flex flex-col items-center justify-center animate-fade-in-up">
        <button 
          onClick={handleCross}
          className="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-16 rounded-full shadow-xl shadow-emerald-200 transform hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-xl"
        >
          <div className="bg-white/20 p-1 rounded-full group-hover:rotate-12 transition-transform">
             <Play size={24} fill="currentColor" />
          </div>
          开始杂交
        </button>
        <button 
          onClick={handleReset}
          className="text-stone-400 hover:text-stone-600 text-sm flex items-center gap-1 mt-6 hover:underline transition-all"
        >
          <RotateCcw size={14} /> 重置实验
        </button>
      </div>

      {/* Results Area */}
      {generation > 0 && (
        <div className="animate-fade-in space-y-8 pt-8 border-t border-dashed border-emerald-100">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Punnett Square */}
            <div>
              <PunnettSquare parent1={parent1} parent2={parent2} />
            </div>

            {/* Statistics Chart */}
            <div className="bg-white p-6 rounded-xl shadow-inner border border-stone-200">
              <h3 className="text-lg font-bold text-center mb-4 text-emerald-800 flex items-center justify-center gap-2">
                <Info size={18} /> 后代性状统计 (理论概率)
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={offspringStats} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                    <Tooltip cursor={{fill: '#f0fdf4'}} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                      {offspringStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center text-sm text-stone-600">
                总组合数: 16
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                   {offspringStats.map(s => (
                     <span key={s.name} className="bg-stone-100 px-2 py-1 rounded border border-stone-200">
                       {s.name}: <b>{s.count}</b>/16
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentLab;