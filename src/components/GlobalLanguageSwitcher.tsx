import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronUp, ChevronDown } from "lucide-react";
import { useLanguage, Language, LANGUAGE_NAMES } from "../localization";
import { motion, AnimatePresence } from "motion/react";

export default function GlobalLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages: { code: Language; name: string; flag: string; nativeName: string }[] = [
    { code: "fr", name: "Français", flag: "🇫🇷", nativeName: "Français" },
    { code: "en", name: "English", flag: "🇬🇧", nativeName: "English" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", nativeName: "中文" },
    { code: "ru", name: "Russian", flag: "🇷🇺", nativeName: "Русский" },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const switcherTitle = {
    fr: "Sélecteur de Langue Conforme",
    en: "Conformal Language Selector",
    zh: "共形语言选择中枢",
    ru: "Конформный переводчик",
  }[language];

  return (
    <div
      className="fixed bottom-6 right-6 z-50 font-sans"
      ref={containerRef}
      id="global-language-switcher-container"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-14 right-0 w-64 bg-slate-900/95 backdrop-blur-md border border-indigo-500/35 rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.25)] p-3 space-y-2 mb-2"
            id="global-language-dropdown"
          >
            <div className="px-2 pb-2 border-b border-slate-800/80 flex items-center justify-between" id="dropdown-header">
              <span className="text-[10px] font-mono font-bold text-indigo-400 tracking-wider uppercase">
                {switcherTitle}
              </span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 gap-1" id="dropdown-langs-list">
              {languages.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-650/35 border border-indigo-505/50 text-white"
                        : "hover:bg-slate-800/60 border border-transparent text-slate-300 hover:text-white"
                    }`}
                    id={`lang-select-btn-${lang.code}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg select-none filter drop-shadow-[#ffffff20_0_1px_1px]" id={`flag-${lang.code}`}>
                        {lang.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold leading-none">{lang.nativeName}</span>
                        <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">
                          {LANGUAGE_NAMES[lang.code]}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" id={`check-${lang.code}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/90 backdrop-blur-md border border-indigo-500/30 rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.15)] hover:border-indigo-400 text-white cursor-pointer group transition-all"
        id="global-language-toggle-btn"
        title={switcherTitle}
      >
        <div className="relative flex items-center justify-center">
          <Globe className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" id="globe-icon" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-indigo-500" />
        </div>
        
        <span className="text-xs font-semibold flex items-center gap-1.5 font-sans">
          <span>{currentLangObj.flag}</span>
          <span className="font-mono uppercase text-[11px] text-indigo-200 tracking-wider font-bold">
            {language}
          </span>
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        )}
      </motion.button>
    </div>
  );
}
