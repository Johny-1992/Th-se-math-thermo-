import React, { useState, useEffect } from "react";
import { Juror, Chapter, JuryResponse, ChatMessage } from "../types";
import { Send, GraduationCap, Trophy, HelpCircle, ArrowRight, Loader2, RefreshCw, Activity, ShieldCheck, AlertTriangle, BookOpen, History } from "lucide-react";
import { useLanguage, Language } from "../localization";

interface JuryViewProps {
  currentChapterId: number;
  chapter: Chapter;
  onValidationChange: (chapterId: number, isValidated: boolean, score: number) => void;
}

const getValidationProbes = (lang: Language): Juror[] => {
  if (lang === "en") {
    return [
      {
        name: "Commutator Contraction & Singularities Probe (Tao)",
        role: "Harmonic Analysis Vector & 3D Cascade Stretching",
        avatarColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        initialObjection: "The thesis claims to formally interrupt the 3D replicative cascade through conformal attenuation. How do you rigorously prove that the non-local commutators [P, S] smooth Hardy-BMO and break the net energy transfer to high frequencies under strict divergence-free constraints?",
        profile: "Microlocal analysis and regulation of non-linear blow-up poles.",
        focusArea: "Microlocal harmonics, Turing cascades, non-linear couplings."
      },
      {
        name: "Global Energy & Dissipation Probe (Leray-Hopf)",
        role: "Energy Bounds & de Rham-Leray Invariants Vector",
        avatarColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        initialObjection: "The formalism poses an existence bound Mcrit = sqrt(E0/ν³). Is the global L² energy dissipative identity fully preserved by the τ124 gauge without point-like mass collapse?",
        profile: "Monitoring of global invariants and Hilbertian energy inequalities.",
        focusArea: "Global invariants, L2 energy inequalities, scale limits."
      },
      {
        name: "Global C∞ Regularity & BKM Lemma Probe",
        role: "Deterministic Closure Vector & Millennium Hypothesis",
        avatarColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        initialObjection: "The global regularity condition requires that ||ω(·, t)||_L∞ remains continuously lower than Mcrit. Prove that the contractile Riccati structure prevents any regularity jumps or microlocal singularities in the dual space.",
        profile: "Guarantees of analyticity of the modified damping semigroup.",
        focusArea: "Global C∞ regularity, Beale-Kato-Majda criterion, Hardy-BMO manifold."
      },
      {
        name: "Industrial CFD Validation Probe (OMNI-SYNAPSE)",
        role: "Real Flow Applications & Cavitation Vector",
        avatarColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        initialObjection: "Under supercritical shear constraints, how does the stabilization of the τ124 gauge integrated into OMNI-SYNAPSE avoid introducing artificial numerical viscosity that ruins the profile?",
        profile: "Validation of modern pseudo-spectral and de Rham computational codes.",
        focusArea: "Pseudo-spectral computational codes, cavitation, OMNI-SYNAPSE."
      }
    ];
  }

  if (lang === "zh") {
    return [
      {
        name: "交换子收缩与奇异性探测仪 (陶哲轩)",
        role: "调和分析与三维级联拉伸分析向量",
        avatarColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        initialObjection: "该论文声称通过共形衰减正式中断了三维复制级联。您如何严格证明非局部交换子 [P, S] 在严格散度自由的约束下能平滑 Hardy-BMO 并打破向高频的净能量传递？",
        profile: "非线性爆破极点的微局部分析与调控。",
        focusArea: "微局部调和分析、图灵级联、非线性耦合。"
      },
      {
        name: "全局能量与耗散探测仪 (勒雷-霍普夫)",
        role: "能量边界与德拉姆-勒雷不变量向量",
        avatarColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        initialObjection: "该形式化方法设定了存在性边界 Mcrit = sqrt(E0/ν³)。在没有点状质量塌缩的情况下，τ124 规范是否能够完全保持全局 L² 能量耗散恒等式？",
        profile: "全局不变量与希尔伯特能量不等式的监测。",
        focusArea: "全局不变量、L2 能量不等式、尺度极限。"
      },
      {
        name: "全局 C∞ 正则性与 BKM 引理探测仪",
        role: "确定性闭合向量与千禧年猜想",
        avatarColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        initialObjection: "全局正则性条件要求 ||ω(·, t)||_L∞ 持续低于 Mcrit。证明收缩性的 Riccati 结构在对偶空间中能够防止任何正则性跃变或微局部奇异性的产生。",
        profile: "修改后阻尼半群的解析性保证。",
        focusArea: "全局 C∞ 正则性、Beale-Kato-Majda 准则、Hardy-BMO 流形。"
      },
      {
        name: "工业 CFD 验证探测仪 (OMNI-SYNAPSE)",
        role: "真实流体应用与空化分析向量",
        avatarColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        initialObjection: "在超临界剪切约束下，集成在 OMNI-SYNAPSE 中的 τ124 规范稳定化机制如何避免引入破坏流场剖面的超常人工数值粘性？",
        profile: "伪谱与德拉姆计算方法的验证。",
        focusArea: "伪谱数值计算、空化现象、OMNI-SYNAPSE 平台。"
      }
    ];
  }

  if (lang === "ru") {
    return [
      {
        name: "Зонд сжатия коммутаторов и сингулярностей (Тао)",
        role: "Вектор гармонического анализа и растяжения 3D-каскадов",
        avatarColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        initialObjection: "В диссертации утверждается формальное прерывание репликативного 3D-каскада за счет конформного затухания. Как вы строго доказываете, что нелокальные коммутаторы [P, S] сглаживают Харди-BMO и нарушают чистый перенос энергии в область высоких частот при строгом условии соленоидальности?",
        profile: "Микролокальный анализ и регулирование нелинейных полюсов взрыва.",
        focusArea: "Микролокальные гармоники, каскады Тьюринга, нелинейные связи."
      },
      {
        name: "Зонд глобальной энергии и диссипации (Лере-Хопф)",
        role: "Вектор энергетических границ и инвариантов де Рама-Лере",
        avatarColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        initialObjection: "Формализм устанавливает предел существования Mcrit = sqrt(E0/ν³). Полностью ли сохраняется глобальное L²-диссипативное тождество энергии калибровкой τ124 без точечного коллапса массы?",
        profile: "Мониторинг глобальных инвариантов и гильбертовых неравенств энергии.",
        focusArea: "Глобальные инварианты, неравенства энергии L2, пределы масштабов."
      },
      {
        name: "Зонд глобальной регулярности C∞ и леммы BKM",
        role: "Детерминированный вектор замыкания и гипотеза тысячелетия",
        avatarColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        initialObjection: "Условие глобальной регулярности требует, чтобы ||ω(·, t)||_L∞ оставалась непрерывно ниже Mcrit. Докажите, что сократительная структура Риккати предотвращает любые скачки регулярности или микролокальные сингулярности в дуальном пространстве.",
        profile: "Гарантии аналитичности модифицированной полугруппы затухания.",
        focusArea: "Глобальная регулярность C∞, критерий Била-Като-Майды, многообразие Харди-BMO."
      },
      {
        name: "Промышленный зонд верификации CFD (OMNI-SYNAPSE)",
        role: "Вектор реальных течений и кавитации",
        avatarColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        initialObjection: "В условиях сверхкритических сдвиговых нагрузок как стабилизация калибровки τ124, интегрированной в OMNI-SYNAPSE, позволяет избежать внедрения искусственной численной вязкости, разрушающей профиль?",
        profile: "Валидация псевдоспектральных вычислительных кодов и кодов де Рама.",
        focusArea: "Псевдоспектральные расчетные коды, кавитация, OMNI-SYNAPSE."
      }
    ];
  }

  // Fallback to French
  return [
    {
      name: "Sonde de Contraction des Commutateurs & Singularités (Tao)",
      role: "Vecteur d'Analyse Harmonique & Étirement de Cascade 3D",
      avatarColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      initialObjection: "La thèse prétend interrompre formellement la cascade réplicative 3D par l'atténuation conforme. Comment démontrez-vous rigoureusement que les commutateurs non locaux [P, S] lissent Hardy-BMO et brisent le transfert d'énergie net vers les hautes fréquences sous contrainte stricte de divergence ?",
      profile: "Analyse microlocale et régulation des pôles d'explosion non linéaires.",
      focusArea: "Harmonique microlocale, cascades de Turing, couplages non linéaires."
    },
    {
      name: "Sonde d'Énergie Globale & Dissipation (Leray-Hopf)",
      role: "Vecteur des Bornes Énergétiques et Invariants de de Rham-Leray",
      avatarColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      initialObjection: "Le formalisme pose une borne d'existence Mcrit = sqrt(E0/ν³). L'identité dissipative d'énergie globale L² est-elle pleinement préservée par la jauge τ124 sans effondrement ponctuel de masse ?",
      profile: "Suivi des invariants globaux et de l'inégalité hilbertienne d'énergie.",
      focusArea: "Invariants globaux, inégalités d'énergie L2, limites d'échelles."
    },
    {
      name: "Sonde de Régularité C∞ Globale & Lemme BKM",
      role: "Vecteur de Clôture Déterministe & Hypothèse du Millénaire",
      avatarColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      initialObjection: "La condition de régularité globale exige que ||ω(·, t)||_L∞ reste continûment inférieure à Mcrit. Démontrez que la structure contractile de Riccati empêche tout saut de régularité ou singularité microlocale dans l'espace dual.",
      profile: "Garanties d'analycité du semi-groupe modifié d'amortissement.",
      focusArea: "Régularité C∞ globale, critère de Beale-Kato-Majda, variété Hardy-BMO."
    },
    {
      name: "Sonde Industrielle de Validation CFD (OMNI-SYNAPSE)",
      role: "Vecteur d'Applications Écoulement Réel & Cavitation",
      avatarColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      initialObjection: "La condition de cisaillement critique simule des gradients abrupts. Comment l'amortissement spectral évite-t-il l'effondrement de la couche limite convective sans viscosité artificielle ?",
      profile: "Validation des codes de calcul pseudo-spectraux et de de Rham.",
      focusArea: "Codes de calculs pseudo-spectraux, cavitation, OMNI-SYNAPSE."
    }
  ];
};

export default function JuryView({
  currentChapterId,
  chapter,
  onValidationChange,
}: JuryViewProps) {
  const { language, t: trans } = useLanguage();
  const VALIDATION_PROBES = getValidationProbes(language);
  const [selectedProbeIdx, setSelectedProbeIdx] = useState(0);
  const probe = VALIDATION_PROBES[selectedProbeIdx];

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedDefenses, setSavedDefenses] = useState<any[]>([]);

  // Historique des messages par chapitre et par stress-vecteur
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});

  const currentKey = `${currentChapterId}-${selectedProbeIdx}`;
  const history = chatHistories[currentKey] || [];

  const fetchSavedDefenses = async () => {
    try {
      const res = await fetch("/api/jury/saved_defenses");
      if (res.ok) {
        const data = await res.json();
        setSavedDefenses(data);
      }
    } catch (e) {
      console.error("Erreur récupération défenses", e);
    }
  };

  // Chargement des défenses enregistrées
  useEffect(() => {
    fetchSavedDefenses();
  }, [currentChapterId, selectedProbeIdx]);

  // Initialisation de l'épreuve de robustesse au chargement
  useEffect(() => {
    if (history.length === 0) {
      setChatHistories(prev => ({
        ...prev,
        [currentKey]: [
          {
            sender: "Jury",
            jurorName: probe.name,
            text: probe.initialObjection,
            timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    }
  }, [currentChapterId, selectedProbeIdx]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setIsLoading(true);
    setInputText("");

    const timestamp = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    const johnyMsg: ChatMessage = {
      sender: "Johny",
      text: textToSend,
      timestamp
    };

    setChatHistories(prev => ({
      ...prev,
      [currentKey]: [...(prev[currentKey] || []), johnyMsg]
    }));

    try {
      // Requête vers le serveur Express pour évaluer la réponse en direct
      const res = await fetch("/api/jury/objection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapter: currentChapterId,
          jurorName: probe.name,
          johnyResponse: textToSend
        })
      });

      if (!res.ok) {
        throw new Error("La validation analytique de robustesse a renvoyé un code incorrect.");
      }

      const data: JuryResponse = await res.json();

      // Ajouter le log de diagnostic de la sonde à l'historique
      const probeFeedbackMsg: ChatMessage = {
        sender: "Jury",
        jurorName: probe.name,
        text: data.feedback,
        timestamp,
        evaluation: data.evaluation,
        verdict: data.verdict
      };

      const nextObjectionMsg: ChatMessage = {
        sender: "Jury",
        jurorName: probe.name,
        text: `Nouveau défi de robustesse : ${data.nextObjection}`,
        timestamp
      };

      setChatHistories(prev => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] || []), probeFeedbackMsg, nextObjectionMsg]
      }));

      // Validation de la section si le score passe au dessus de 75%
      const isValidated = data.evaluation >= 75;
      onValidationChange(currentChapterId, isValidated, data.evaluation);
      
      // Recharger l'historique enregistré pour Johny
      fetchSavedDefenses();

    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        sender: "Jury",
        jurorName: probe.name,
        text: "Signal d'évaluation momentanément interrompu. La jauge conforme τ124 résiste néanmoins de manière stable à cet instant. Réitérez l'envoi thérapeutique d'arguments.",
        timestamp
      };
      setChatHistories(prev => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] || []), errorMsg]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChallenge = () => {
    setChatHistories(prev => ({
      ...prev,
      [currentKey]: [
        {
          sender: "Jury",
          jurorName: probe.name,
          text: probe.initialObjection,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col h-[520px]" id={`jury-view-chapter-${currentChapterId}`}>
      {/* Header du module de défense active */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4" id="jury-view-header">
        <div className="flex items-center gap-2.5" id="jury-main-title">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-medium tracking-widest text-slate-500 uppercase">
              {language === "en" ? "ACTIVE DEFENSE & ROBUSTNESS CONSOLE" : language === "zh" ? "主动防御与学识验证控制台" : language === "ru" ? "КОНСОЛЬ АКТИВНОЙ ОБОРОНЫ И УСТОЙЧИВОСТИ" : "CONSOLE DE DÉFENSE ET ROBUSTESSE ACTIVE"}
            </span>
            <h2 className="text-lg font-bold text-slate-100">
              {trans.juryTitle}
            </h2>
          </div>
        </div>

        {/* Bouton de réinitialisation de la sonde */}
        <button
          onClick={handleResetChallenge}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono transition-colors self-end sm:self-auto cursor-pointer"
          id="btn-restart-defense"
        >
          <RefreshCw className="w-3.5 h-3.5" /> {language === "en" ? "Reset probe State" : language === "zh" ? "重置评议探测仪" : language === "ru" ? "Сбросить состояние зонда" : "Réinitialiser la sonde"}
        </button>
      </div>

      {/* Grid de sélection des sondes analytiques de validation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4" id="jurors-selector-grid">
        {VALIDATION_PROBES.map((p, idx) => {
          const isSelected = idx === selectedProbeIdx;
          return (
            <button
              key={p.name}
              onClick={() => setSelectedProbeIdx(idx)}
              className={`p-3 rounded-lg text-left transition-all border text-xs relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? "bg-indigo-600/15 border-indigo-500/55 text-white shadow-lg"
                  : "bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
              }`}
              id={`btn-juror-${idx}`}
            >
              <h4 className="font-bold truncate">{p.name.includes("Sonde ") && language === "en" ? p.name : p.name.split(" : ")[1] || p.name}</h4>
              <p className="text-[9px] text-slate-500 mt-1 truncate">{p.role}</p>
              {isSelected && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Descriptif technique de la sonde active */}
      <div className="bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[10px] font-mono" id="juror-profile-box">
        <div id="jp-focus">
          <span className="text-slate-500">{trans.juryFocus}</span>{" "}
          <span className="text-indigo-400">{probe.focusArea}</span>
        </div>
        <div className="text-slate-500 italic hidden md:block" id="jp-profile">
          <span className="text-slate-500 font-semibold">{trans.juryProfile}</span> {probe.profile}
        </div>
      </div>

      {/* Terminal de discussion & épreuve de robustesse (défilement automatique) */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3.5 border-b border-slate-850 my-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800" id="dialogue-scroll-view">
        {history.map((msg, idx) => {
          const isJohny = msg.sender === "Johny";
          return (
            <div
              key={idx}
              className={`flex flex-col ${isJohny ? "items-end" : "items-start"}`}
              id={`message-${idx}`}
            >
              {/* Entête du message */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mb-1" id={`msg-lbl-${idx}`}>
                <span>
                  {isJohny 
                    ? (language === "en" ? "TECHNICAL DEFENDER: Johny Mulenda" : language === "zh" ? "答辩学者：Johny Mulenda" : language === "ru" ? "ДИССЕРТАНТ-ДОКЛАДЧИК: Johny Mulenda" : "DÉFENSEUR TECHNIQUE : Johny Mulenda")
                    : `${language === "en" ? "ACTIVE PROBE" : language === "zh" ? "评议探测仪" : language === "ru" ? "АКТИВНЫЙ ЗОНД" : "SONDE ACTIVE"} : ${msg.jurorName}`
                  }
                </span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Bulle de texte */}
              <div
                className={`max-w-[85%] p-3.5 rounded-xl text-xs leading-relaxed font-sans ${
                  isJohny
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md font-medium"
                    : "bg-slate-950 text-slate-300 rounded-tl-none border border-slate-800"
                }`}
                id={`msg-bubble-${idx}`}
              >
                {msg.text}

                {/* Score et évaluation académiques sous forme de carte d'excellence */}
                {msg.evaluation !== undefined && (
                  <div className="mt-3 pt-3 border-t border-slate-800 bg-slate-900/60 p-2.5 rounded-lg space-y-1.5 font-mono" id={`verdict-box-${idx}`}>
                    <div className="flex items-center justify-between text-[11px]" id={`v-score-row-${idx}`}>
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> {language === "en" ? "SECURITY DIAGNOSTIC:" : language === "zh" ? "安全符合性诊断：" : language === "ru" ? "ДИАГНОСТИКА БЕЗОПАСНОСТИ:" : "DIAGNOSTIC DE SÉCURITÉ :"}
                      </span>
                      <span className={`text-sm font-extrabold ${msg.evaluation >= 80 ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`}>
                        {msg.evaluation} / 100
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]" id={`v-verdict-row-${idx}`}>
                      <span className="text-slate-500">{language === "en" ? "Validation Status:" : language === "zh" ? "评审结论：" : language === "ru" ? "Статус валидации:" : "Statut de Validation :"}</span>
                      <span className={`font-bold uppercase ${msg.evaluation >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {msg.verdict}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-indigo-400 font-mono italic p-2" id="msg-loading-indicator">
            <Loader2 className="w-4 h-4 animate-spin" />
            {language === "en" ? "Stress vector calculating on τ124 gauge..." : language === "zh" ? "正在评估对偶共形紧致扰动强韧度..." : language === "ru" ? "Вычисляется вектор стресса для калибровки τ124..." : "Vecteur de Stress en cours de calcul sur la jauge τ124..."}
          </div>
        )}
      </div>

      {/* Formulaire de réponse directe en temps réel */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex gap-2"
        id="send-message-form"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={language === "en" ? `Enter your academic defense argument for Chapter ${currentChapterId}...` : language === "zh" ? `输入您关于第 ${currentChapterId} 章的学术答辩阐述...` : language === "ru" ? `Введите ваши научные аргументы для Главы ${currentChapterId}...` : `Saisissez vos arguments de démonstration de robustesse de la thèse pour le Chapitre ${currentChapterId}...`}
          disabled={isLoading}
          className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-200 placeholder-slate-600 font-medium"
          id="input-defense-text"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-mono text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer"
          id="btn-submit-defense"
        >
          <Send className="w-4 h-4" /> {trans.juryBtnSubmit}
        </button>
      </form>

      {/* Intégration du Dépôt des Argumentations Enregistrées de de Rham-Leray */}
      {savedDefenses.length > 0 && (
        <div className="mt-5 bg-slate-950/40 border border-slate-805 rounded-xl p-5 shadow-lg space-y-4" id="saved-defenses-repo">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3" id="saved-defenses-title">
            <div className="flex items-center gap-2 text-indigo-400">
              <BookOpen className="w-4 h-4 animate-pulse" />
              <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-200">
                {trans.jurySavedDefensesTitle}
              </h3>
            </div>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full">
              {language === "en" ? `${savedDefenses.length} response(s) memorized` : language === "zh" ? `已记录 ${savedDefenses.length} 条答辩回复` : language === "ru" ? `Запомнено ответов: ${savedDefenses.length}` : `${savedDefenses.length} réponse(s) mémorisée(s)`}
            </span>
          </div>

          <div className="max-h-[260px] overflow-y-auto pr-2 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800" id="saved-defenses-list">
            {savedDefenses.map((def, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col gap-2.5 hover:border-slate-750 transition-colors" id={`saved-card-${idx}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono border-b border-slate-950 pb-2" id={`saved-card-header-${idx}`}>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-bold">
                      {language === "en" ? "Chapter" : language === "zh" ? "第" : language === "ru" ? "Глава" : "Chapitre"}{language === "zh" ? `${def.chapterId}章` : ` ${def.chapterId}`}
                    </span>
                    <span className="text-slate-500 font-medium">| {def.jurorName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{def.timestamp}</span>
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold">
                      {def.evaluation}/100
                    </span>
                  </div>
                </div>

                <div className="text-slate-300 text-xs leading-relaxed font-sans font-medium whitespace-pre-wrap bg-slate-950/60 p-3 rounded border border-slate-850" id={`saved-card-response-${idx}`}>
                  {def.johnyResponse}
                </div>

                <div className="text-[11px] leading-relaxed text-indigo-300/90 font-mono flex gap-2 pl-2 border-l-2 border-indigo-500/30" id={`saved-card-feedback-${idx}`}>
                  <span className="text-slate-500 font-extrabold shrink-0">{trans.jurySavedDefensesFeedback}</span>
                  <span>{def.feedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
