import React, { useState } from 'react';
import { 
  X, Wand2, Sparkles, Camera, Check, RefreshCw, 
  ChevronLeft, Award, Heart, Star 
} from 'lucide-react';
import { hairstyleRecommendations } from '../data/mockData';

export default function HairstyleAdvisorModal({ isOpen, onClose, onSelectHairstyle }) {
  const [selectedFaceShape, setSelectedFaceShape] = useState('بيضاوي');
  const [selectedHairType, setSelectedHairType] = useState('كيرلي ناعم');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const faceShapes = [
    { id: 'oval', label: 'بيضاوي', icon: '🥚', desc: 'يناسبه معظم القصات' },
    { id: 'round', label: 'دائري', icon: '⚪', desc: 'قصات تمنح استطالة' },
    { id: 'heart', label: 'قلبي', icon: '💖', desc: 'غرة ناعمة وطبقات' },
    { id: 'square', label: 'مربع', icon: '◻️', desc: 'ويفي ناعم يكسر الزوايا' },
  ];

  const hairTypes = ['كيرلي ناعم', 'ويفي مموج', 'ناعم ومالس', 'كثيف ومجعد'];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 700);
  };

  const handleReset = () => {
    setShowResults(false);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center select-none">
      <div 
        className="w-full bg-white rounded-t-[32px] max-h-[90%] overflow-hidden flex flex-col shadow-2xl border-t border-pink-100 animate-slideUp text-right"
      >
        {/* Header */}
        <div className="p-4 border-b border-pink-50 flex items-center justify-between bg-gradient-to-r from-[#880E4F] via-[#C2185B] to-[#9C27B0] text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-xs">
              <Wand2 size={16} />
            </div>
            <div>
              <h3 className="text-[14px] font-bold leading-tight">مستشار الذكاء الاصطناعي للقصات</h3>
              <p className="text-[10px] text-pink-100">تحليل ملامح الوجه واقتراح القصة المثالية</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/30 active-press"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto app-scroll p-4 space-y-4">
          {!showResults ? (
            <>
              {/* Step 1: Face Shape */}
              <div className="space-y-2">
                <h4 className="text-[12.5px] font-bold text-[#880E4F]">
                  1. اختاري شكل وجهك التقريبي:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {faceShapes.map((shape) => {
                    const isSelected = selectedFaceShape === shape.label;
                    return (
                      <div
                        key={shape.id}
                        onClick={() => setSelectedFaceShape(shape.label)}
                        className={`p-2.5 rounded-2xl border text-right cursor-pointer transition-all active-press ${
                          isSelected 
                            ? 'border-[#C2185B] bg-pink-50/70 text-[#880E4F] shadow-xs ring-1 ring-[#C2185B]' 
                            : 'border-pink-100 bg-white text-gray-700 hover:border-pink-200'
                        }`}
                      >
                        <div className="text-xl mb-1">{shape.icon}</div>
                        <h5 className="text-[11.5px] font-bold">{shape.label}</h5>
                        <p className="text-[9.5px] text-gray-500 mt-0.5">{shape.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Hair Type */}
              <div className="space-y-2">
                <h4 className="text-[12.5px] font-bold text-[#880E4F]">
                  2. نوع وطبيعة شعرك الحالية:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {hairTypes.map((type) => {
                    const isSelected = selectedHairType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedHairType(type)}
                        className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all active-press ${
                          isSelected 
                            ? 'bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white border-transparent shadow-xs' 
                            : 'bg-white border-pink-100 text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 bg-gradient-to-r from-[#FFD700] via-[#F7941D] to-[#C2185B] text-white rounded-xl font-bold text-[12px] shadow-xs flex items-center justify-center gap-2 active-press disabled:opacity-75"
                >
                  {isAnalyzing ? (
                    <span>جاري التحليل وتوليد الاقتراحات...</span>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      <span>تحليل واقتراح أفضل القصات والتسريحات</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="space-y-4">
              <div className="bg-[#FFF0F5]/80 p-3 rounded-2xl border border-pink-100 flex items-center justify-between">
                <div>
                  <h4 className="text-[12.5px] font-bold text-[#880E4F]">القصات والتسريحات الموصى بها لملامحك:</h4>
                  <p className="text-[10px] text-gray-500">تناسق مثالي مع الوجه {selectedFaceShape} ونوع الشعر</p>
                </div>
                <button
                  onClick={handleReset}
                  className="p-1.5 bg-white border border-pink-100 rounded-xl text-[10px] font-bold text-[#C2185B] flex items-center gap-1 shadow-2xs"
                >
                  <RefreshCw size={11} />
                  <span>تعديل</span>
                </button>
              </div>

              {/* Recommendation Cards */}
              <div className="space-y-3">
                {hairstyleRecommendations.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl border border-pink-100 shadow-xs overflow-hidden"
                  >
                    <div className="relative h-32 w-full">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-2 right-2 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        نسبة التوافق {item.matchScore}%
                      </span>
                    </div>

                    <div className="p-3 text-right">
                      <h5 className="text-[12.5px] font-bold text-[#880E4F]">{item.title}</h5>
                      <p className="text-[10.5px] text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                      
                      <div className="mt-2 pt-2 border-t border-pink-50 flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 font-bold">✓ يبرز جمال الوجنتين والعيون</span>
                        <button
                          onClick={() => {
                            onClose();
                            alert(`تم حفظ تسريحة "${item.title}" في مفضلتك للرجوع لها عند زيارة الصالون ✨`);
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-[#C2185B] to-[#9C27B0] text-white rounded-xl text-[10px] font-bold shadow-xs active-press"
                        >
                          اختيار هذه القصة
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
