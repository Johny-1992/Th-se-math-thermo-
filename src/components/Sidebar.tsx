import React from "react";
import { BookOpen, ShieldCheck, Cpu, Code2, Award, ArrowRight, Activity, Terminal } from "lucide-react";
import { Chapter } from "../types";
import { useLanguage, Language, LANGUAGE_NAMES } from "../localization";

interface SidebarProps {
  chapters: Chapter[];
  currentChapterId: number;
  setCurrentChapterId: (id: number) => void;
  validatedChapters: Record<number, boolean>;
  juryEvaluations: Record<number, number>;
}

export default function Sidebar({
  chapters,
  currentChapterId,
  setCurrentChapterId,
  validatedChapters,
  juryEvaluations,
}: SidebarProps) {
  const { language, setLanguage, t } = useLanguage();

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <BookOpen className="w-5 h-5 text-indigo-400" id={`icon-chap-${id}`} />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" id={`icon-chap-${id}`} />;
      case 3:
        return <Activity className="w-5 h-5 text-rose-400" id={`icon-chap-${id}`} />;
      case 4:
        return <Code2 className="w-5 h-5 text-amber-400" id={`icon-chap-${id}`} />;
      case 5:
        return <Cpu className="w-5 h-5 text-cyan-400" id={`icon-chap-${id}`} />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-400" id={`icon-chap-${id}`} />;
    }
  };

  // Localized headers and labels
  const trans = {
    thesisType: {
      fr: "THÈSE DE DOCTORAT",
      en: "DOCTORAL THESIS",
      zh: "博士学位论文",
      ru: "ДОКТОРСКАЯ ДИССЕРТАЦИЯ"
    }[language],
    thesisTitle: {
      fr: "Sur la régularité globale des équations de de Rham-Leray",
      en: "On the Global Regularity of de Rham-Leray Equations",
      zh: "关于 de Rham-Leray 方程的全局正则性",
      ru: "О глобальной регулярности уравнений де Рама-Лере"
    }[language],
    thesisSubtitle: {
      fr: "& la jauge conforme τ₁₂₄",
      en: "& the τ₁₂₄ conformal gauge",
      zh: "与 τ₁₂₄ 共形规范",
      ru: "и конформный калибр τ₁₂₄"
    }[language],
    candidateRole: {
      fr: "Chercheur Indépendant",
      en: "Independent Researcher",
      zh: "独立学者",
      ru: "Независимый исследователь"
    }[language],
    chapterLabel: {
      fr: "CHAPITRE",
      en: "CHAPTER",
      zh: "章节",
      ru: "ГЛАВА"
    }[language],
    validatedLabel: {
      fr: "✓ VALIDÉ",
      en: "✓ APPROVED",
      zh: "✓ 已通过",
      ru: "✓ ОДОБРЕНО"
    }[language],
    refutedLabel: {
      fr: "RÉFUTÉ",
      en: "REFUTED",
      zh: "未通过",
      ru: "ОПРОВЕРГНУТО"
    }[language],
    toDefendLabel: {
      fr: "À DÉFENDRE",
      en: "TO DEFEND",
      zh: "待答辩",
      ru: "К ЗАЩИТЕ"
    }[language],
    telemetryDesc: {
      fr: "Infrastructure de Monitoring Global et Télémétrie en cours de production réelle.",
      en: "Global real-world production level monitoring and telemetry infrastructure.",
      zh: "全球真实现场投产级别监测与遥感控制中枢。",
      ru: "Глобальная телеметрическая система мониторинга реального времени."
    }[language],
    selectLanguageLabel: {
      fr: "Langue du Comité",
      en: "Committee Language",
      zh: "学术委员会语言",
      ru: "Язык комитета"
    }[language]
  };

  return (
    <aside className="w-full lg:w-85 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0" id="app-sidebar">
      {/* Canditate Header */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/60" id="sidebar-candidate-header">
        <div className="flex items-center gap-3 mb-2" id="header-badge-container">
          <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-mono font-medium border border-indigo-500/20" id="badge-doc">
            {trans.thesisType}
          </span>
          <span className="px-2.5 py-0.5 bg-slate-500/10 text-slate-400 rounded-full text-xs font-mono border border-slate-500/20" id="badge-year">
            2026
          </span>
        </div>
        <h1 className="text-xl font-sans font-bold tracking-tight text-white leading-tight" id="thesis-main-title">
          {trans.thesisTitle}
        </h1>
        <p className="text-xs text-slate-400 mt-1.5 font-mono" id="thesis-subtitle">
          {trans.thesisSubtitle}
        </p>

        {/* Candidat Profile Box */}
        <div className="mt-4 p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-3" id="candidate-box">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-md font-sans" id="candidate-avatar">
            JM
          </div>
          <div id="candidate-info">
            <h3 className="text-sm font-semibold text-slate-200" id="candidate-name">Johny Mulenda Macheko</h3>
            <p className="text-xs text-slate-400 font-mono" id="candidate-title">{trans.candidateRole}</p>
          </div>
        </div>

        {/* Dynamic Multilingual Language Picker */}
        <div className="mt-4 p-2 bg-slate-950/40 border border-slate-800/80 rounded-lg flex flex-col gap-1.5" id="sidebar-lang-picker">
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
            <span>{trans.selectLanguageLabel} :</span>
            <span className="text-indigo-400 font-extrabold">{language.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-4 gap-1" id="language-grid-buttons">
            {(["fr", "en", "zh", "ru"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`py-1 text-[10px] font-mono font-extrabold rounded uppercase border transition-all duration-150 cursor-pointer text-center ${
                  language === lang
                    ? "bg-indigo-600 border-indigo-505 text-white shadow shadow-indigo-600/20"
                    : "bg-slate-950/80 border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
                title={LANGUAGE_NAMES[lang]}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 select-none" id="sidebar-navigation-container">
        <h4 className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase px-2 mb-2" id="nav-header">
          {t.sidebarProgression}
        </h4>

        {chapters.map((chapter) => {
          const isActive = chapter.id === currentChapterId;
          const isValidated = validatedChapters[chapter.id];
          const evaluation = juryEvaluations[chapter.id];

          return (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapterId(chapter.id)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-lg text-left transition-all duration-200 relative overflow-hidden group ${
                isActive
                  ? "bg-slate-800/80 border border-slate-700/80 shadow-lg text-white"
                  : "hover:bg-slate-800/30 border border-transparent text-slate-400 hover:text-slate-200"
              }`}
              id={`btn-chapter-${chapter.id}`}
            >
              <div
                className={`mt-0.5 p-1.5 rounded ${
                  isActive ? "bg-slate-700 text-white" : "bg-slate-950/40 text-slate-500"
                }`}
                id={`icon-container-${chapter.id}`}
              >
                {getIcon(chapter.id)}
              </div>

              <div className="flex-1 min-w-0" id={`info-chap-${chapter.id}`}>
                <div className="flex items-center justify-between gap-1" id={`header-${chapter.id}`}>
                  <span className="text-xs font-mono font-semibold tracking-wider text-indigo-400">
                    {trans.chapterLabel} 0{chapter.id}
                  </span>
                  {isValidated ? (
                     <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[9px] font-mono border border-emerald-500/25">
                       {trans.validatedLabel}
                     </span>
                  ) : evaluation !== undefined ? (
                    <span className="px-1.5 py-0.5 bg-rose-500/10 text-rose-400 rounded text-[9px] font-mono border border-rose-500/25">
                      {trans.refutedLabel}
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 bg-slate-800 text-slate-500 rounded text-[9px] font-mono border border-slate-700">
                      {trans.toDefendLabel}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium mt-1 truncate" id={`title-chap-${chapter.id}`}>
                  {chapter.title}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5" id={`sub-chap-${chapter.id}`}>
                  {chapter.subtitle}
                </p>

                {/* Score bar if evaluated */}
                {evaluation !== undefined && (
                  <div className="mt-2 text-[10px] font-mono flex items-center gap-1.5" id={`score-${chapter.id}`}>
                    <span className="text-slate-400">Note:</span>
                    <span className={`font-bold ${evaluation >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {evaluation}%
                    </span>
                    <div className="flex-1 bg-slate-950 h-1.5 rounded-full overflow-hidden" id={`score-bar-bg-${chapter.id}`}>
                      <div
                        className={`h-full rounded-full ${evaluation >= 80 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        style={{ width: `${evaluation}%` }}
                        id={`score-bar-fill-${chapter.id}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500" id={`active-bar-${chapter.id}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Production Infrastructure telemetry reference */}
      <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-slate-500 text-xs font-mono" id="sidebar-footer">
        <div className="flex items-center gap-2 mb-1 text-slate-400 font-bold" id="telemetry-bar">
          <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>OMNI-SYNAPSE INFRA</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-500" id="telemetry-info">
          {trans.telemetryDesc}
        </p>
        <div className="mt-2 text-[9px] bg-slate-900 border border-slate-800 p-1.5 rounded overflow-x-hidden text-ellipsis whitespace-nowrap text-indigo-300" id="telemetry-host">
          https://th-se-math-thermo.vercel.app/
        </div>
      </div>
    </aside>
  );
}
