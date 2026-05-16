import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Clock, Users, Award, Info, ChevronRight, ChevronLeft, Layers, UserCircle, Menu, ClipboardList, Palette, ArrowRight, ArrowLeft } from 'lucide-react';
import { CATEGORIES, TESTS, SMO_34_TEST_IDS } from './data/tests';
import { PsychologyTest } from './types';

export default function App() {
  const [view, setView] = useState<'archive' | 'smo-34'>('archive');
  const [displayMode, setDisplayMode] = useState<'catalog' | 'ledger'>('catalog');
  const [theme, setTheme] = useState<'default' | 'lilac-dream' | 'pastel-pink'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<PsychologyTest | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const scrollLedger = (direction: 'left' | 'right') => {
    if (tableContainerRef.current) {
      const scrollAmount = 300;
      tableContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const filteredTests = useMemo(() => {
    let baseList = TESTS;
    if (view === 'smo-34') {
      baseList = TESTS.filter(t => SMO_34_TEST_IDS.includes(t.id));
    }

    return baseList.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            test.developer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, view]);

  return (
    <div 
      className="min-h-screen bg-cream text-ink font-serif selection:bg-strawberry-light selection:text-white flex flex-col h-[100dvh] overflow-hidden transition-colors duration-500"
    >
      {/* Mobile Navigation Sidebar (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-cream z-[101] shadow-2xl md:hidden overflow-y-auto flex flex-col"
            >
              <div className="sticky top-0 bg-cream p-6 border-b border-matcha-light/10 flex justify-between items-center z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-strawberry-dark">Archives & Search</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 outline-none">
                  <X size={24} className="text-matcha-dark" />
                </button>
              </div>

              <div className="p-6 space-y-8 pb-12">
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => {setView('archive'); setIsMobileMenuOpen(false);}}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border transition-all ${
                      view === 'archive' ? 'bg-strawberry-dark text-white border-strawberry-dark' : 'bg-transparent text-sage border-sage/30'
                    }`}
                  >
                    Archive Encyclopedia
                  </button>
                  <button 
                    onClick={() => {setView('smo-34'); setIsMobileMenuOpen(false);}}
                    className={`w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs border transition-all ${
                      view === 'smo-34' ? 'bg-strawberry-dark text-white border-strawberry-dark' : 'bg-transparent text-sage border-sage/30'
                    }`}
                  >
                    SMO No. 34 Series of 2017
                  </button>
                </div>

                {/* Mobile Theme Switcher */}
                <div className="py-4 border-y border-matcha-light/10">
                  <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-sage mb-4 flex items-center gap-2">
                    <Palette size={12} />
                    Select Curated Theme
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setTheme('default')}
                      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${theme === 'default' ? 'bg-matcha-light/10 border-matcha-dark' : 'border-matcha-light/10'}`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, #A4BE7B 0%, #E86A7B 100%)' }} />
                      <span className="text-[8px] font-sans font-bold uppercase tracking-tighter text-matcha-dark">Matcha</span>
                    </button>
                    <button 
                      onClick={() => setTheme('lilac-dream')}
                      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${theme === 'lilac-dream' ? 'bg-matcha-light/10 border-[#8E7AB5]' : 'border-matcha-light/10'}`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, #B799FF 0%, #8E7AB5 100%)' }} />
                      <span className="text-[8px] font-sans font-bold uppercase tracking-tighter text-[#8E7AB5]">Lilac</span>
                    </button>
                    <button 
                      onClick={() => setTheme('pastel-pink')}
                      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${theme === 'pastel-pink' ? 'bg-matcha-light/10 border-[#F08080]' : 'border-matcha-light/10'}`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, #FFB6C1 0%, #F08080 100%)' }} />
                      <span className="text-[8px] font-sans font-bold uppercase tracking-tighter text-[#F08080]">Coquette</span>
                    </button>
                  </div>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-matcha-dark opacity-40 italic" size={18} />
                  <input 
                    type="text" 
                    placeholder="Lookup Instrument..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 py-3 bg-transparent border-b border-matcha-light/30 focus:outline-none focus:border-strawberry-dark transition-all text-base font-sans placeholder:italic placeholder:text-ink/30"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-sage"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button 
                    onClick={() => {setSelectedCategory(null);}}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest border transition-all ${
                      !selectedCategory ? 'bg-strawberry-dark text-white border-strawberry-dark' : 'bg-transparent text-sage border-sage/30'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.filter(cat => view === 'archive' || TESTS.some(t => t.category === cat.id && SMO_34_TEST_IDS.includes(t.id))).map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => {setSelectedCategory(cat.id);}}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest border transition-all ${
                        selectedCategory === cat.id ? 'bg-matcha-dark text-white border-matcha-dark' : 'bg-transparent text-sage border-sage/30'
                      }`}
                    >
                      {cat.name.split('.')[1].split('&')[0].trim()}
                    </button>
                  ))}
                </div>

                {CATEGORIES.filter(cat => view === 'archive' || TESTS.some(t => t.category === cat.id && SMO_34_TEST_IDS.includes(t.id))).map((cat, idx) => (
                  <section key={cat.id} className={`${selectedCategory && selectedCategory !== cat.id ? 'hidden' : 'block'}`}>
                    <h2 className={`text-[10px] font-sans font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${
                      idx % 2 === 0 ? 'text-strawberry-dark' : 'text-matcha-dark'
                    }`}>
                      <div className="w-1 h-1 rounded-full bg-current" />
                      {cat.name}
                    </h2>
                    <ul className="space-y-1 text-base">
                      {TESTS.filter(t => t.category === cat.id && (view === 'archive' || SMO_34_TEST_IDS.includes(t.id))).map(t => (
                        <li 
                          key={t.id}
                          onClick={() => {setSelectedTest(t); setIsMobileMenuOpen(false);}}
                          className={`py-3 px-2 rounded-lg cursor-pointer transition-all active:bg-strawberry-light/10 ${
                            selectedTest?.id === t.id ? 'text-strawberry-dark font-bold bg-strawberry-light/5' : 'text-sage italic'
                          }`}
                        >
                          {t.name}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header className="flex items-center justify-between px-6 md:px-10 py-4 md:py-6 border-b border-matcha-light/30 bg-cream/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 text-matcha-dark hover:bg-strawberry-light/20 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div onClick={() => setView('archive')} className="cursor-pointer">
            <h1 className="text-lg md:text-3xl font-bold italic tracking-tighter text-matcha-dark leading-tight">
              PmLE 2026
            </h1>
            <p className="text-[6px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-sans text-sage font-semibold">
              Psychometric Instrument Encyclopedia
            </p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-sans uppercase tracking-widest font-medium">
          <button 
            onClick={() => {setView('archive'); setSearchQuery(''); setSelectedCategory(null);}}
            className={`pb-1 transition-all ${view === 'archive' ? 'border-b-2 border-strawberry-dark text-ink' : 'opacity-50 hover:opacity-100'}`}
          >
            Archive
          </button>
          <button 
            onClick={() => {setView('smo-34'); setSearchQuery(''); setSelectedCategory(null);}}
            className={`pb-1 transition-all ${view === 'smo-34' ? 'border-b-2 border-strawberry-dark text-ink' : 'opacity-50 hover:opacity-100'}`}
          >
            SMO No. 34
          </button>
          
          {/* Theme Switcher Toggle */}
          <div className="flex bg-matcha-light/10 p-1 rounded-full border border-matcha-light/20 ml-2">
             <button 
               onClick={() => setTheme('default')}
               title="Strawberry Matcha"
               className={`w-6 h-6 rounded-full transition-all border-2 ${theme === 'default' ? 'border-strawberry-dark scale-110 shadow-sm' : 'border-transparent opacity-50 hover:opacity-100'}`}
               style={{ background: 'linear-gradient(135deg, #A4BE7B 0%, #E86A7B 100%)' }}
             />
             <button 
               onClick={() => setTheme('lilac-dream')}
               title="Lilac Dream"
               className={`w-6 h-6 rounded-full transition-all border-2 mx-1 ${theme === 'lilac-dream' ? 'border-[#8E7AB5] scale-110 shadow-sm' : 'border-transparent opacity-50 hover:opacity-100'}`}
               style={{ background: 'linear-gradient(135deg, #B799FF 0%, #8E7AB5 100%)' }}
             />
             <button 
               onClick={() => setTheme('pastel-pink')}
               title="Pastel Pink Coquette"
               className={`w-6 h-6 rounded-full transition-all border-2 ${theme === 'pastel-pink' ? 'border-[#F08080] scale-110 shadow-sm' : 'border-transparent opacity-50 hover:opacity-100'}`}
               style={{ background: 'linear-gradient(135deg, #FFB6C1 0%, #F08080 100%)' }}
             />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex w-80 border-r border-matcha-light/20 flex flex-col bg-white/50 shrink-0 overflow-y-auto">
          <div className="p-8 space-y-10">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-matcha-dark opacity-40 italic" size={16} />
              <input 
                type="text" 
                placeholder="Lookup Instrument..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 py-2 bg-transparent border-b border-matcha-light/30 focus:outline-none focus:border-strawberry-dark transition-all text-sm font-sans placeholder:italic placeholder:text-ink/30"
              />
            </div>

            {CATEGORIES.filter(cat => view === 'archive' || TESTS.some(t => t.category === cat.id && SMO_34_TEST_IDS.includes(t.id))).map((cat, idx) => (
              <section key={cat.id}>
                <h2 className={`text-[11px] font-sans font-bold uppercase tracking-widest mb-4 ${
                  idx % 2 === 0 ? 'text-strawberry-dark' : 'text-matcha-dark'
                }`}>
                  {cat.name}
                </h2>
                <ul className="space-y-3 text-[13px] italic text-sage">
                  {TESTS.filter(t => t.category === cat.id && (view === 'archive' || SMO_34_TEST_IDS.includes(t.id))).slice(0, 5).map(t => (
                    <li 
                      key={t.id}
                      onClick={() => {setSelectedTest(t); setSelectedCategory(cat.id);}}
                      className={`cursor-pointer px-2 transition-all hover:text-strawberry-dark hover:translate-x-1 ${
                        selectedTest?.id === t.id ? 'bg-strawberry-light/20 py-2 rounded-r-lg border-l-4 border-strawberry-dark text-strawberry-dark' : ''
                      }`}
                    >
                      {t.name}
                    </li>
                  ))}
                  <li 
                    onClick={() => setSelectedCategory(cat.id)}
                    className="pt-2 text-[10px] font-sans uppercase tracking-widest font-bold text-matcha-dark cursor-pointer hover:underline"
                  >
                    View All {cat.id} instruments →
                  </li>
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-auto p-8 bg-matcha-light/5 border-t border-matcha-light/10">
            <p className="text-[10px] leading-relaxed text-matcha-dark uppercase tracking-tight font-sans">
              Volume 4.2: Indigenous Psychometrics <br/>Special focus on Philippine settings
            </p>
          </div>
        </aside>

        {/* Content Area */}
        <section 
          id="main-content-section"
          className="flex-1 p-6 md:p-12 overflow-y-auto relative flex flex-col bg-cream/30 scroll-smooth"
        >
          {/* Top Decorative Element */}
          <div className="absolute top-0 right-0 w-48 md:w-80 h-48 md:h-80 bg-strawberry-light/10 rounded-bl-full -z-10 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="px-3 py-1 bg-matcha-light text-white text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em] rounded-full">
                {view === 'smo-34' ? 'Clinical Reference' : (selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Psychometrics Database')}
              </span>
              <h3 className="text-4xl md:text-6xl font-bold text-ink mt-4 md:mt-6 mb-2 tracking-tighter leading-tight">
                {view === 'smo-34' ? (
                  <>SMO No. 34 <span className="text-strawberry-dark font-light italic">Series of 2017</span></>
                ) : (
                  <>Test <span className="text-strawberry-dark font-light italic">Encyclopedia</span></>
                )}
              </h3>
              <p className="text-base md:text-xl italic text-matcha-dark opacity-70 leading-relaxed">
                {searchQuery ? `Search results for "${searchQuery}"` : view === 'smo-34' ? 'Psychological test materials in Annex B under the CHED guidelines.' : selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.description : 'A curated collection of standardized psychological instruments for clinical and industrial practice.'}
              </p>
            </div>

            <div className="flex bg-white/50 p-1.5 rounded-full border border-matcha-light/20 shadow-inner">
              <button 
                onClick={() => setDisplayMode('catalog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-sans uppercase tracking-widest transition-all ${
                  displayMode === 'catalog' ? 'bg-strawberry-dark text-white shadow-lg' : 'text-sage hover:text-matcha-dark'
                }`}
              >
                <Layers size={14} />
                Encyclopedia
              </button>
              <button 
                onClick={() => setDisplayMode('ledger')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-sans uppercase tracking-widest transition-all ${
                  displayMode === 'ledger' ? 'bg-matcha-dark text-white shadow-lg' : 'text-sage hover:text-matcha-dark'
                }`}
              >
                <ClipboardList size={14} />
                Ledger
              </button>
            </div>
          </div>

          {/* Scroll Down Indicator - Mobile Only */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              const element = document.getElementById('instruments-start');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="md:hidden flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-matcha-light/20 text-matcha-dark text-[10px] uppercase font-sans font-bold tracking-[0.2em] mx-auto mb-12 animate-bounce"
          >
            Scroll to Instruments
            <ChevronRight size={14} className="rotate-90" />
          </motion.button>

          <div id="instruments-start" />

          {displayMode === 'catalog' ? (
            /* Grid of Results */
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 pb-20">
              <AnimatePresence mode="popLayout">
                {filteredTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => setSelectedTest(test)}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-matcha-light/10 group cursor-pointer hover:shadow-xl hover:shadow-strawberry-dark/5 transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-4 md:mb-6">
                      <div className="flex-1">
                        <h4 className="text-xl md:text-2xl font-bold text-ink group-hover:text-strawberry-dark transition-colors mb-1 tracking-tight leading-tight">
                          {test.name}
                        </h4>
                        <p className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-sage font-bold">
                          {test.developer}
                        </p>
                      </div>
                      <ChevronRight size={20} className="text-strawberry-dark hidden md:block opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                    
                    <p className="text-sm italic text-ink/60 mb-6 line-clamp-2 leading-relaxed">
                      {test.quickInfo}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-matcha-light/10 px-2 py-1 md:py-0.5 rounded text-[9px] md:text-[10px] font-sans uppercase tracking-widest border border-matcha-light/20 text-matcha-dark">
                        {test.administration.type}
                      </span>
                      <span className="bg-strawberry-light/10 px-2 py-1 md:py-0.5 rounded text-[9px] md:text-[10px] font-sans uppercase tracking-widest border border-strawberry-light/20 text-strawberry-dark">
                        {test.administration.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Comparison Table (Ledger) - Entirely Unrestricted flowing layout */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full pb-32 relative"
            >
              {/* Frozen Horizontal Scroll Controls */}
              <div className="sticky top-0 z-[60] flex justify-end gap-2 mb-2 pointer-events-none">
                <div className="flex gap-2 p-1.5 bg-matcha-dark/90 backdrop-blur-md rounded-full shadow-lg border border-white/10 pointer-events-auto mr-4 md:mr-0">
                  <button 
                    onClick={() => scrollLedger('left')}
                    className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
                    title="Scroll Left"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="w-px h-4 bg-white/20 self-center" />
                  <button 
                    onClick={() => scrollLedger('right')}
                    className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
                    title="Scroll Right"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div ref={tableContainerRef} className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-separate border-spacing-0 min-w-[1000px] md:min-w-[1400px]">
                  <thead className="sticky top-[48px] z-40 translate-y-[-1px]">
                    <tr className="bg-matcha-dark text-white font-sans uppercase tracking-[0.2em] text-[8px] md:text-[9px]">
                      <th className="px-5 md:px-8 py-6 border-b border-white/10 sticky left-0 top-0 bg-matcha-dark z-50 shadow-[2px_0_10px_rgba(0,0,0,0.2)]">Instrument</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Cat.</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Type</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Time</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Training</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Developer</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Items</th>
                      <th className="px-4 md:px-6 py-6 border-b border-white/10 bg-matcha-dark">Age Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink text-[11px] md:text-[13px] font-serif">
                    {filteredTests.map((test) => (
                      <tr 
                        key={test.id}
                        onClick={() => setSelectedTest(test)}
                        className="group hover:bg-strawberry-light/5 cursor-pointer transition-colors border-b border-matcha-light/10"
                      >
                        <td className="px-5 md:px-8 py-6 font-bold text-ink italic group-hover:text-strawberry-dark transition-colors sticky left-0 bg-cream group-hover:bg-[#f8f5f0] z-30 border-r border-matcha-light/10 border-b border-matcha-light/10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                          <span className="block min-w-[180px] md:min-w-0">{test.name}</span>
                        </td>
                        <td className="px-4 md:px-6 py-6 border-b border-matcha-light/10">
                          <span className="bg-white border border-matcha-light/20 px-1.5 py-0.5 rounded text-[8px] md:text-[9px] font-sans uppercase tracking-tight text-sage">
                            {test.category.charAt(0)}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-6 text-ink opacity-70 italic border-b border-matcha-light/10">{test.administration.type}</td>
                        <td className="px-4 md:px-6 py-6 text-ink opacity-70 italic whitespace-nowrap border-b border-matcha-light/10">{test.administration.time}</td>
                        <td className="px-4 md:px-6 py-6 border-b border-matcha-light/10">
                          <span className={`px-1.5 py-0.5 rounded text-[8px] md:text-[10px] font-sans font-bold uppercase tracking-tight ${
                            test.administration.trainingNeeded.includes('High') ? 'bg-strawberry-light/10 text-strawberry-dark' : 'bg-matcha-light/10 text-matcha-dark'
                          }`}>
                            {test.administration.trainingNeeded.split('(')[0]}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-6 text-ink font-sans text-[10px] md:text-xs uppercase tracking-tight font-medium opacity-60 border-b border-matcha-light/10">
                          {test.developer}
                        </td>
                        <td className="px-4 md:px-6 py-6 text-ink opacity-70 italic whitespace-nowrap border-b border-matcha-light/10">{test.administration.items}</td>
                        <td className="px-4 md:px-6 py-6 text-ink opacity-70 italic whitespace-nowrap border-b border-matcha-light/10">{test.administration.ageRange}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 flex justify-between items-center text-[10px] uppercase font-sans tracking-[0.2em] text-sage font-bold px-4">
                <span className="flex items-center gap-2">
                  <ClipboardList size={14} />
                  Total Records: {filteredTests.length}
                </span>
                <span className="italic opacity-50">End of Forensic Ledger</span>
              </div>
            </motion.div>
          )}
        </section>
      </main>      {/* Modal - Enhanced Editorial Version */}
      <AnimatePresence>
        {selectedTest && (
          <div className="fixed inset-0 z-[1000] flex md:items-center justify-center p-0 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTest(null)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={selectedTest.id}
              initial={{ opacity: 0, scale: 0.9, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 100 }}
              className="relative w-full max-w-6xl h-fit md:h-auto md:max-h-[90vh] bg-cream rounded-none md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row border-0 md:border md:border-matcha-light/20 md:overflow-hidden custom-scrollbar z-[1001]"
            >
              {/* Hero Section - Scrolls away on mobile now */}
              <div className={`w-full md:w-96 p-8 md:p-12 text-white flex flex-col relative overflow-hidden shrink-0 min-h-[40vh] md:min-h-0 ${
                selectedTest.category === 'intelligence' ? 'matcha-gradient' : 'strawberry-gradient'
              }`}>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-0"></div>
                
                <div className="flex justify-between items-center mb-6 md:mb-12 relative z-10">
                  <button 
                    onClick={() => setSelectedTest(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <span className="md:hidden text-[10px] uppercase font-bold tracking-widest opacity-70">Instrument Details</span>
                </div>
                
                <div className="relative z-10">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold opacity-70 block mb-3 md:mb-4">
                    {CATEGORIES.find(c => c.id === selectedTest.category)?.name.split('.')[1] || 'Technical Entry'}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight md:leading-[0.9] tracking-tighter">
                    {selectedTest.name}
                  </h2>
                  <p className="text-sm md:text-lg italic opacity-90 leading-relaxed font-light">
                    {selectedTest.quickInfo}
                  </p>
                </div>
                
                <div className="mt-8 md:mt-auto pt-8 md:pt-12 grid grid-cols-2 lg:grid-cols-1 gap-6 relative z-10">
                   <div className="border-l-2 border-white/30 pl-3 md:pl-4">
                     <p className="text-[8px] md:text-[9px] uppercase tracking-widest font-sans font-bold opacity-60 mb-0.5">Developer</p>
                     <p className="text-sm md:text-lg font-medium leading-tight">{selectedTest.developer}</p>
                   </div>
                   <div className="border-l-2 border-white/30 pl-3 md:pl-4 font-sans uppercase">
                      <p className="text-[8px] md:text-[9px] tracking-widest font-bold opacity-60 mb-0.5">Training Level</p>
                      <p className="text-xs md:text-sm font-bold tracking-[0.1em]">{selectedTest.administration.trainingNeeded}</p>
                   </div>
                </div>
              </div>

              <div className="w-full flex-1 p-8 md:p-16 bg-white md:overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-10 md:space-y-12">
                  <section>
                    <h4 className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-strawberry-dark mb-6 md:mb-8 text-center border-b border-strawberry-light/30 pb-4">
                      Administration & Specifications
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 md:gap-y-10 gap-x-4 md:gap-x-6">
                      <div className="border-l border-strawberry-light/30 pl-3 md:pl-4">
                        <span className="block text-[8px] md:text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest mb-1">Mode</span>
                        <span className="text-xs md:text-sm font-bold text-ink italic leading-tight">{selectedTest.administration.type}</span>
                      </div>
                      <div className="border-l border-strawberry-light/30 pl-3 md:pl-4">
                        <span className="block text-[8px] md:text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest mb-1">Items</span>
                        <span className="text-xs md:text-sm font-bold text-ink italic leading-tight">{selectedTest.administration.items}</span>
                      </div>
                      <div className="border-l border-strawberry-light/30 pl-3 md:pl-4">
                        <span className="block text-[8px] md:text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest mb-1">Age Range</span>
                        <span className="text-xs md:text-sm font-bold text-ink italic leading-tight">{selectedTest.administration.ageRange}</span>
                      </div>
                      <div className="border-l border-strawberry-light/30 pl-3 md:pl-4">
                        <span className="block text-[8px] md:text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest mb-1">Time</span>
                        <span className="text-xs md:text-sm font-bold text-ink italic leading-tight">{selectedTest.administration.time}</span>
                      </div>
                      <div className="border-l border-strawberry-light/30 pl-3 md:pl-4 col-span-2 md:col-span-1">
                        <span className="block text-[8px] md:text-[9px] opacity-40 uppercase font-sans font-bold tracking-widest mb-1">Training</span>
                        <span className="text-xs md:text-sm font-bold text-ink italic leading-tight">{selectedTest.administration.trainingNeeded}</span>
                      </div>
                    </div>
                  </section>

                  <section className="bg-cream/40 p-6 md:p-10 rounded-2xl md:rounded-3xl border border-matcha-light/10">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-matcha-dark mb-4">Instrument Purpose</h4>
                    <p className="text-lg md:text-xl leading-relaxed text-ink opacity-90 font-serif">
                      {selectedTest.purpose}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <div className="space-y-4">
                      <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-strawberry-dark">Statistical Scaling</h4>
                      <p className="text-sm italic leading-relaxed text-ink/70">
                        {selectedTest.scoring}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-matcha-dark">Clinical Interpretation</h4>
                      <p className="text-sm italic leading-relaxed text-ink/70">
                        {selectedTest.interpretation}
                      </p>
                    </div>
                  </div>

                  <section className="border-t border-matcha-light/20 pt-10">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-sage mb-6">Constructs & Factors Measured</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTest.factorsMeasured.split(',').map((factor, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.05) }}
                          className="bg-cream/50 border-l-4 border-matcha-light p-4 rounded-r-xl text-sm italic text-ink/80 flex items-center gap-3"
                        >
                          <span className="w-2 h-2 rounded-full bg-strawberry-dark/30 shrink-0" />
                          {factor.trim()}
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-white border-2 border-matcha-light/10 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Layers size={80} className="text-matcha-dark" />
                    </div>
                    <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-matcha-dark mb-6">Registry of Editions & Versions</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedTest.versions.split(',').map((v, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-strawberry-light/10 border border-strawberry-light/30 rounded-full text-[10px] md:text-xs font-bold text-strawberry-dark tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-strawberry-dark" />
                          {v.trim()}
                        </div>
                      ))}
                    </div>
                  </section>

                  {selectedTest.mnemonics && (
                    <div className="bg-strawberry-dark text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-lg shadow-strawberry-dark/20 text-center md:text-left">
                      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                      <h5 className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-bold mb-2 opacity-80">Memorialization Device</h5>
                      <p className="text-xl md:text-2xl font-bold tracking-tight mb-2 leading-tight font-serif italic">
                        "{selectedTest.mnemonics}"
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-end text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-ink/30 border-t border-matcha-light/20 pt-8 pb-4">
                    <button 
                      onClick={() => setSelectedTest(null)}
                      className="text-matcha-dark hover:text-strawberry-dark transition-colors px-4 py-2 border border-matcha-light/20 rounded-full md:border-0"
                    >
                      Close Entry
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="h-10 md:h-12 bg-matcha-dark text-cream flex items-center justify-between px-6 md:px-10 text-[8px] md:text-[9px] uppercase font-sans tracking-widest shrink-0 relative z-20">
        <span>Encyclopedia Database</span>
        <span>© PmLE 2026</span>
        <span className="hidden lg:block italic">
          {theme === 'default' && "A Strawberry Matcha Anthology"}
          {theme === 'lilac-dream' && "A Lilac Dream Sequence"}
          {theme === 'pastel-pink' && "A Pastel Pink Coquette Collection"}
        </span>
      </footer>
    </div>
  );
}
