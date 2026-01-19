import React, { useState } from 'react';
import { Sprout, BookOpen, FlaskConical, ClipboardList } from 'lucide-react';
import ExperimentLab from './components/ExperimentLab';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lab' | 'learn'>('lab');

  return (
    <div className="min-h-screen flex flex-col bg-[#F0FDF4] text-stone-800 font-sans">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Sprout size={28} className="text-yellow-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">孟德尔豌豆实验</h1>
              <p className="text-emerald-200 text-xs hidden sm:block">Wowkids AI+</p>
            </div>
          </div>
          
          <nav className="flex bg-emerald-900/50 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'lab' 
                  ? 'bg-white text-emerald-900 shadow-sm' 
                  : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <FlaskConical size={16} />
              <span className="hidden sm:inline">实验</span>模拟
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'learn' 
                  ? 'bg-white text-emerald-900 shadow-sm' 
                  : 'text-emerald-100 hover:bg-emerald-700/50'
              }`}
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">知识</span>科普
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-8">
        
        {activeTab === 'lab' ? (
          <div className="animate-fade-in">
             <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 mb-8">
               <div className="border-b border-emerald-100 pb-6 mb-6">
                 <h2 className="text-3xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                   <FlaskConical className="text-emerald-600" size={32} />
                   孟德尔豌豆实验室
                 </h2>
                 
                 {/* Operating Instructions */}
                 <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5">
                   <h3 className="flex items-center gap-2 font-bold text-emerald-800 mb-3 text-base">
                     <ClipboardList size={20} />
                     操作步骤说明：
                   </h3>
                   <div className="grid md:grid-cols-3 gap-4">
                     <div className="flex items-start gap-3">
                       <div className="bg-white text-emerald-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-emerald-200 text-sm">1</div>
                       <div>
                         <span className="block font-bold text-emerald-900 text-sm">设定父母特征</span>
                         <span className="text-stone-600 text-xs leading-relaxed">为豌豆爸爸和妈妈分别选择“颜色”和“形状”。</span>
                       </div>
                     </div>
                     <div className="flex items-start gap-3">
                       <div className="bg-white text-emerald-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-emerald-200 text-sm">2</div>
                       <div>
                         <span className="block font-bold text-emerald-900 text-sm">开始模拟杂交</span>
                         <span className="text-stone-600 text-xs leading-relaxed">点击下方的“开始杂交”按钮，AI引擎将模拟遗传过程。</span>
                       </div>
                     </div>
                     <div className="flex items-start gap-3">
                       <div className="bg-white text-emerald-700 font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-emerald-200 text-sm">3</div>
                       <div>
                         <span className="block font-bold text-emerald-900 text-sm">观察实验结果</span>
                         <span className="text-stone-600 text-xs leading-relaxed">查看生成的遗传棋盘和后代统计，验证你的猜想！</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <ExperimentLab />
             </div>
          </div>
        ) : (
          <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
             <section className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4">孟德尔的发现</h2>
                <div className="prose text-stone-600 leading-relaxed">
                  <p className="mb-4">
                    格雷戈尔·孟德尔（Gregor Mendel）是一位奥地利修道士，被称为“现代遗传学之父”。通过种植和观察豌豆，他发现了生物遗传的规律。
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                       <h3 className="font-bold text-orange-800 mb-2">什么是显性和隐性？</h3>
                       <p className="text-sm">
                         有些特征比较“强势”，只要有一个基因就能表现出来，这叫<b>显性</b>（比如黄色豌豆）。有些特征比较“弱势”，必须两个基因都在时才表现出来，这叫<b>隐性</b>（比如绿色豌豆）。
                       </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                       <h3 className="font-bold text-blue-800 mb-2">基因怎么写？</h3>
                       <p className="text-sm">
                         我们用字母表示基因。大写字母（如 <b>Y</b>）代表显性，小写字母（如 <b>y</b>）代表隐性。<br/>
                         <b>YY</b> 或 <b>Yy</b> = 黄色<br/>
                         <b>yy</b> = 绿色
                       </p>
                    </div>
                  </div>

                </div>
             </section>
             
             <section className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="text-lg font-bold text-emerald-800 mb-2">为什么选豌豆？</h3>
                <ul className="list-disc pl-5 space-y-2 text-emerald-900 text-sm">
                  <li><b>生长快：</b> 豌豆长得快，很容易观察结果。</li>
                  <li><b>特征明显：</b> 豌豆的颜色（黄/绿）和形状（圆/皱）非常容易区分。</li>
                  <li><b>易于控制：</b> 孟德尔可以很容易地控制哪两株豌豆进行“结婚”（授粉）。</li>
                </ul>
             </section>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;