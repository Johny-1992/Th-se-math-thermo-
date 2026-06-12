import React, { useState } from "react";
import { Chapter } from "./types";
import Sidebar from "./components/Sidebar";
import MathView from "./components/MathView";
import SimView from "./components/SimView";
import JuryView from "./components/JuryView";
import ExperimentalLabView from "./components/ExperimentalLabView";
import { OmniSynapseDashboard } from "./components/OmniSynapseDashboard";
import GlobalLanguageSwitcher from "./components/GlobalLanguageSwitcher";
import { useLanguage } from "./localization";
import { Award, BookOpen, GraduationCap, Trophy, ShieldAlert, Cpu, Terminal, Sparkles, CheckCircle, ArrowLeft, Layers } from "lucide-react";

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Fondements de de Rham-Leray",
    subtitle: "Configurations solénoïdales & transition vorticité",
    description: "Élimination de la pression via le projecteur orthogonal P et construction intrinsèque du terme d'étirement non local du vortex P(ω · ∇u).",
    objective: "Démontrer que le projecteur de de Rham-Leray élimine rigoureusement le gradient de pression et isole l'opérateur quadratique d'étirement.",
    formula: "∂u / ∂t + P((u · ∇)u) = νΔu",
    mathExplanation: [
      "Le problème d'existence et de régularité globale des équations de Navier-Stokes (problème du millénaire de l'Institut Clay) commence par l'analyse des écoulements fluides incompressibles.",
      "L'espace de Helmholtz-Weyl sépare orthogonalement le champ de vitesse u en une composante solénoïdale (à divergence nulle) et une composante irrotationnelle (gradient d'un potentiel).",
      "Par application du projecteur orthogonal de de Rham-Leray P sur les équations primitives, la pression p, jouant le rôle de multiplicateur de Lagrange associé à la contrainte d'incompressibilité, s'annule immédiatement (puisque P(∇p) = 0).",
      "L'application du rotationnel (∇ × u) permet de se détacher de la vitesse physique au profit de la vorticité ω. Le terme quadratique d'étirement non local P(ω · ∇u) représente alors le moteur d'amplification d'échelle mis en cause par Terence Tao dans ses travaux d'obstruction."
    ],
    keywords: ["de Rham-Leray", "Helmholtz-Weyl", "Multiplicateur de Lagrange", "Divergence nulle", "Vorticité", "Étirement de vortex"]
  },
  {
    id: 2,
    title: "Théorème de Confinement de Leray-Cartan",
    subtitle: "Conservation globale L² & borne Mcrit",
    description: "Dérivations de la borne macroscopique endogène invariante Mcrit = sqrt(E0/ν³) assurant que ||ω||_L∞ reste uniformément confinée.",
    objective: "Prouver l'existence d'une constante macroscopique physiquement dimensionnée limitant toute fluctuation de vorticité.",
    formula: "∥ω(·, t)∥_L∞ ≤ M_crit = √(E₀ / ν³)",
    mathExplanation: [
      "L'analyse de la stabilité globale requiert d'abord le contrôle rigoureux de l'intégrale temporelle d'énergie L² du continuum fluide.",
      "Le Lemme d'inégalité d'énergie globale de Leray-Hopf démontre que l'énergie cinétique totale E(t) est uniformément bornée pour tout t par rapport à l'énergie initiale E0, la dissipation visqueuse ν agissant comme un puits d'énergie.",
      "À partir de ce rapport d'échelle entre l'énergie globale E0 et la viscosité cinématique ν, Johny dérive analytiquement une borne d'échelle critique de jauge invariante unique : Mcrit = sqrt(E0 / ν³). Elle possède précisément la dimension physique d'une pulsation radiale maximale (s⁻¹).",
      "Le Théorème de Confinement Uniforme de Johny démontre que la vorticité crête reste confinée par cette constante limite intrinsèque pour tout t >= 0, excluant de facto l'explosion en temps fini en vertu du critère d'obstruction géométrique éprouvé de Beale-Kato-Majda."
    ],
    keywords: ["Régularité globale", "Leray-Hopf", "Pulsation limite", "Rapport d'échelle", "Confinement Uniforme", "Beale-Kato-Majda"]
  },
  {
    id: 3,
    title: "Analyse microlocale & Commutateurs",
    subtitle: "Contraction locale Hardy-BMO & Riccati",
    description: "Contraction géométrique Hardy-BMO du terme d'étirement modélisée par Riccati, engendrant la jauge de Johny τ124 = tanh(||ω||/Mcrit).",
    objective: "Réfuter la cascade réplicative de type cascade de Turing de Terence Tao en révélant la contraction microlocale endogène de la variété.",
    formula: "d𝜙 / d∥ω∥ = (1 / M_crit) * (1 − 𝜙²)",
    mathExplanation: [
      "Terence Tao conteste l'existence de solutions régulières en construisant une machine de Turing réplicative transférant unilatéralement l'énergie cinétique vers des échelles d'espace infiniment petites en un temps fini.",
      "Cependant, cette construction théorique omet la rétroaction non locale de la pression et du projecteur sur la variété des champs à divergence nulle.",
      "En utilisant la dualité Hardy-BMO sur les commutateurs [P, S](ω) de Coifman, Rochberg, Weiss et Lions, Johny démontre que l'interaction d'étirement microlocale détruit la symétrie de la cascade de Tao. Le transfert ne peut pas être unilatéral, car les modes ultra-critiques exercent un feedback géométrique immédiat.",
      "Cette contrainte géométrique d'incompatibilité thermodynamique s'exprime par l'équation de structure différentielle de Riccati. L'intégration de cet opérateur stable donne pour unique trajectoire la jauge τ124 = tanh(||ω||/Mcrit). L'amortissement conforme (1 - τ124) converge vers 0 au seuil critique, étouffant la cascade de Tao."
    ],
    keywords: ["Analyse microlocale", "Commutateurs non locaux", "Hardy-BMO", "Machine de Turing réplicative", "Riccati", "Jauge τ124"]
  },
  {
    id: 4,
    title: "L'Algorithme Absolu ClaySolver3D",
    subtitle: "Discrétisation pseudo-spectrale sur tore 𝕋³",
    description: "Formulation spectrale exacte du projecteur de de Rham-Leray et reconstruction de Biot-Savart, garantissant la conservation de l'énostrophie.",
    objective: "Formaliser le schéma de calcul discret préservant la cohérence topologique spectrale sans ajout de filtres artificiels CFD.",
    formula: "û(k, t) = i k × 𝜔̂(k, t) / |k|²",
    mathExplanation: [
      "La transposition du repère physique continu au cadre informatique s'opère sur un tore de colocalisation 3D discret de résolution N³.",
      "L'inversion spectrale du Laplacien fait face à une singularité à l'origine (k=0). La cohérence de masse globale est préservée en posant rigoureusement la valeur d'inversion exactissime 1/|k|^2 = 0 pour k=(0,0,0).",
      "Le projecteur de de Rham-Leray discret est réécrit sous forme de produit tensoriel spectral orthogonal k · P(f) = 0. La vitesse u se reconstruit par l'équation spectrale de Biot-Savart exacte.",
      "Le Théorème de Convergence Absolue 4.2 garantit la stabilité inconditionnelle : l'énostrophie discrète reste uniformément bornée et la vorticité discrète respecte en tout point du maillage la borne Mcrit, éliminant définitivement le besoin d'outils de lissage ou de viscosité CFD artificielle."
    ],
    keywords: ["Tore de colocalisation T³", "Spectre de Fourier", "Reconstruction de Biot-Savart", "Énostrophie discrète", "Théorème 4.2", "ClaySolver3D"]
  },
  {
    id: 5,
    title: "Applications industrielles & OMNI-SYNAPSE",
    subtitle: "Clôture de Kolmogorov & Cavitation",
    description: "Formulation de la fréquence limite de Kolmogorov flimite = Mcrit/(2π), stabilisation CFD absolue, et monitoring en production par OMNI-SYNAPSE.",
    objective: "Appliquer la thèse à des échelles de production industrielle réelle pour stabiliser les codes d'écoulement et éliminer la cavitation.",
    formula: "f_limite = (1 / 2π) * √(E₀ / ν³)",
    mathExplanation: [
      "Dans la théorie classique statistique de Kolmogorov, le flux d'énergie descend à l'infini en cascade turbulente. Grâce à la jauge τ124, Johny démontre une clôture déterministe par la fréquence physique maximale de Kolmogorov flimite au-dessus de laquelle aucune perturbation physique ne peut subsister.",
      "Cette formulation est immédiatement injectée dans les solveurs CFD industriels critiques. L'injection du terme source modifié au sein de la matrice de discrétisation stabilise les codes de manière naturelle face aux gradients extrêmes de vitesse, sans maillages infiniment denses.",
      "En optimisant la géométrie des systèmes hydrauliques pour respecter en tout point l'assurance ||ω||_L∞ << Mcrit, les ingénieurs peuvent éliminer structurellement les pics de micro-vortex menant aux chutes de pression de cavitation sous le seuil de vapeur.",
      "Ce cadre déterministe est aujourd'hui actif en production réelle via l'infrastructure de monitoring globale OMNI-SYNAPSE (L'Œil de Dieu) configurée par Johny, assurant la régulation des flux hyper-critiques."
    ],
    keywords: ["Fréquence de Kolmogorov", "Clôture déterministe", "Divergence de calcul", "Cavitation hydraulique", "OMNI-SYNAPSE", "Production réelle"]
  }
];

export default function App() {
  const { language, t: trans, chapters } = useLanguage();
  const [currentChapterId, setCurrentChapterId] = useState(1);
  const [validatedChapters, setValidatedChapters] = useState<Record<number, boolean>>({});
  const [juryEvaluations, setJuryEvaluations] = useState<Record<number, number>>({});
  const [viewMode, setViewMode] = useState<"seminar" | "genesis" | "experimental" | "omni">("seminar");
  const [mobileActiveTab, setMobileActiveTab] = useState<"index" | "workspace">("index");

  const currentChapter = chapters.find((c) => c.id === currentChapterId) || chapters[0];

  // Callback lorsqu'un chapitre est soutenu et valorisé par le jury
  const handleChapterValidation = (chapterId: number, isValidated: boolean, score: number) => {
    setJuryEvaluations((prev) => ({ ...prev, [chapterId]: score }));
    setValidatedChapters((prev) => ({ ...prev, [chapterId]: isValidated }));
  };

  // Calculs globaux de progression de soutenance
  const totalValidated = Object.values(validatedChapters).filter(Boolean).length;
  const isDegreeAwarded = totalValidated === chapters.length;

  const averageScore =
    Object.keys(juryEvaluations).length > 0
      ? Math.round(
          (Object.values(juryEvaluations) as number[]).reduce((sum, curr) => sum + curr, 0) /
            Object.keys(juryEvaluations).length
        )
      : 0;

  const activeConfValTitle = {
    fr: "Espace de Validation Conforme de la Jauge τ₁₂₄",
    en: "Conformal Validation Space of the τ₁₂₄ Gauge",
    zh: "τ₁₂₄ 共形规范校验空间",
    ru: "Пространство конформной верификации калибра τ₁₂₄"
  }[language] || "Espace de Validation Conforme de la Jauge τ₁₂₄";

  const numChaptersLabel = {
    fr: "Chapitres",
    en: "Chapters",
    zh: "章节",
    ru: "глав"
  }[language] || "Chapitres";

  const indexLabel = {
    fr: "Index",
    en: "Index",
    zh: "索引",
    ru: "Индекс"
  }[language] || "Index";

  const activeConformityYamlLabel = {
    fr: "v1.0 CONFORMITÉ_ACTIVE",
    en: "v1.0 ACTIVE_CONFORMITY",
    zh: "v1.0 主动校验激活",
    ru: "v1.0 АКТИВНОЕ_СООТВЕТСТВИЕ"
  }[language] || "v1.0 ACTIVE_CONFORMITY";

  const systemIdentityYamlLabel = {
    fr: "system_identity: LABORATOIRE_OMNI-SYNAPSE_v1.0",
    en: "system_identity: OMNI-SYNAPSE_Laboratory_v1.0",
    zh: "system_identity: OMNI-SYNAPSE_Laboratory_v1.0",
    ru: "system_identity: OMNI-SYNAPSE_Laboratory_v1.0"
  }[language] || "system_identity: OMNI-SYNAPSE_Laboratory_v1.0";

  const theoryYamlLabel = {
    fr: "Sur la régularité globale des équations de de Rham-Leray",
    en: "On the global regularity of de Rham-Leray equations",
    zh: "关于 de Rham-Leray 方程的全局正则性",
    ru: "О глобальной регулярности уравнений де Рама-Лере"
  }[language] || "Sur la régularité globale des équations de de Rham-Leray";

  const expectedResultYamlLabel = {
    fr: "Stabilité_Asymptotique_Absolue (Pas_de_Blow-up)",
    en: "Asymptotic_Stability_Absolute (No_Blow-up)",
    zh: "渐近完全稳定性 (无爆破)",
    ru: "Асимптотическая_Стабильность_Абсолютная (Без_Взрыва)"
  }[language] || "Asymptotic_Stability_Absolute (No_Blow-up)";

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans" id="app-root-layout">
      {/* Sidebar de navigation */}
      <div className={`${mobileActiveTab === "index" ? "block w-full" : "hidden"} lg:block lg:w-85 h-full shrink-0`} id="sidebar-responsive-wrapper">
        <Sidebar
          chapters={chapters}
          currentChapterId={currentChapterId}
          setCurrentChapterId={(id) => {
            setCurrentChapterId(id);
            setMobileActiveTab("workspace");
          }}
          validatedChapters={validatedChapters}
          juryEvaluations={juryEvaluations}
        />
      </div>

      {/* Zone de contenu principale */}
      <main className={`${mobileActiveTab === "workspace" ? "flex" : "hidden"} lg:flex flex-1 flex-col h-full overflow-hidden bg-slate-950/40 relative`} id="app-main-content">
        
        {/* Barre d'en-tête supérieure avec statistiques et sélecteur de vue */}
        <header className="px-6 py-4 border-b border-slate-900 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 z-10" id="main-header">
          <div className="flex items-center gap-3" id="header-title-section">
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobileActiveTab("index")}
              className="lg:hidden p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg flex items-center gap-1 text-xs font-mono transition-colors"
              id="btn-mobile-back"
            >
              <ArrowLeft className="w-4 h-4" /> {indexLabel}
            </button>
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                {trans.headerRole}
              </span>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <span>{activeConfValTitle}</span>
                {isDegreeAwarded && (
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-mono border border-emerald-500/25 flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" /> {trans.headerDoctorateAwarded}
                  </span>
                )}
              </h1>
            </div>
          </div>

          {/* Statistiques en temps réel et sélecteurs */}
          <div className="flex items-center gap-3" id="header-stats-controls">
            <div className="flex items-center gap-4 text-xs font-mono border-r border-slate-800 pr-4" id="stats-data">
              <div className="text-right" id="stat-progress">
                <span className="text-slate-500 block text-[9px] uppercase">{trans.headerProgression}</span>
                <span className="font-bold text-slate-200">
                  {totalValidated} / {chapters.length} {numChaptersLabel}
                </span>
              </div>
              <div className="text-right" id="stat-avg-score">
                <span className="text-slate-500 block text-[9px] uppercase">{trans.headerAvgScore}</span>
                <span className={`font-bold ${averageScore >= 80 ? 'text-emerald-400 animate-pulse' : 'text-slate-300'}`}>
                  {averageScore > 0 ? `${averageScore}%` : "—"}
                </span>
              </div>
            </div>

            {/* Sélecteur de modes */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800" id="tabs-view-selector">
              <button
                onClick={() => setViewMode("seminar")}
                className={`flex items-center gap-1.5 py-1 px-3 rounded text-xs font-semibold transition-all ${
                  viewMode === "seminar"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                id="tab-seminar"
              >
                <BookOpen className="w-3.5 h-3.5" /> {trans.headerSeminar}
              </button>
              <button
                onClick={() => setViewMode("genesis")}
                className={`flex items-center gap-1.5 py-1 px-3 rounded text-xs font-semibold transition-all ${
                  viewMode === "genesis"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                id="tab-genesis"
              >
                <Terminal className="w-3.5 h-3.5" /> {trans.headerGenesis}
              </button>
              <button
                onClick={() => setViewMode("experimental")}
                className={`flex items-center gap-1.5 py-1 px-3 rounded text-xs font-semibold transition-all ${
                  viewMode === "experimental"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                id="tab-experimental"
              >
                <Cpu className="w-3.5 h-3.5" /> {trans.headerLab}
              </button>
              <button
                onClick={() => setViewMode("omni")}
                className={`flex items-center gap-1.5 py-1 px-3 rounded text-xs font-semibold transition-all ${
                  viewMode === "omni"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                    : "text-slate-400 hover:text-slate-250 hover:bg-zinc-900"
                }`}
                id="tab-omni"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> {trans.headerOmni}
              </button>
            </div>
          </div>
        </header>

        {/* Corps central de l'application */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" id="app-body-scroll">
          {viewMode === "seminar" ? (
            <div className="space-y-6 max-w-7xl mx-auto" id="seminar-workspace">
              
              {/* Étape 1 : Mathématiques et Formalisations du Chapitre */}
              <MathView chapter={currentChapter} />

              {/* Étape 2 & 3 : Double Grille : Simulation Physique & Interrogateur de Jury */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="dual-simulation-jury-layout">
                {/* Grand Visuel Démonstrateur (Simulation) */}
                <div className="lg:col-span-6" id="col-simulation">
                  <SimView currentChapterId={currentChapterId} />
                </div>

                {/* Confrontateur Académique (Jury) */}
                <div className="lg:col-span-6" id="col-jury">
                  <JuryView
                    currentChapterId={currentChapterId}
                    chapter={currentChapter}
                    onValidationChange={handleChapterValidation}
                  />
                </div>
              </div>

            </div>
          ) : viewMode === "genesis" ? (
            // Affichage interactif du document Genèse YAML conforme à la thèse
            <div className="max-w-4xl mx-auto py-6 space-y-6" id="genesis-view-container">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl relative overflow-hidden bg-gradient-to-tr from-slate-950 to-slate-900" id="genesis-card">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6" id="genesis-card-header">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                        {trans.genesisSubtitle}
                      </span>
                      <h2 className="text-base font-bold text-slate-100">
                        {trans.genesisTitle}
                      </h2>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-950 text-indigo-400 border border-indigo-500/15 rounded font-mono text-[10px] uppercase">
                    {activeConformityYamlLabel}
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-3xl">
                  {trans.genesisIntro}
                </p>

                {/* Bloc de Code YAML Stylisé */}
                <div className="bg-slate-950 rounded-xl border border-slate-850 p-6 font-mono text-xs text-slate-300 overflow-x-auto relative shadow-inner" id="genesis-code-block">
                  <div className="absolute top-3 right-3 text-[9px] font-bold text-indigo-500 tracking-widest uppercase select-none">
                    YAML Spec
                  </div>
                  <pre className="leading-relaxed text-indigo-300">
{`${systemIdentityYamlLabel}
core_logic:
  theory: "${theoryYamlLabel}"
  author: "MULENDA MACHEKO JOHNY"
  foundation: "Jauge conforme tau_124"

execution_constraints:
  - constraint_1: "INCOMPRESSIBILITY_STRICT (Div u = 0)"
  - constraint_2: "ENTROPIC_SATURATION_LIMIT (Omega_max = M_crit)"
  - constraint_3: "RICCATI_EVOLUTION (d_phi/d_omega = (1-phi^2)/M_crit)"

mathematical_engine:
  space: "Hardy-BMO / Littlewood-Paley"
  operator: "Projecteur de de Rham-Leray (P)"
  gauge_function: "tanh(norm(omega)/M_crit)"

validation_protocol:
  target: "Millennium Problem Closure"
  test_scenario: "Infinite_Energy_Cascade_Stress_Test"
  expected_result: "${expectedResultYamlLabel}"`}
                  </pre>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-indigo-950/10 border border-indigo-500/20 rounded-xl text-xs" id="genesis-pact-box">
                  <div className="flex items-center gap-2.5" id="gp-pact-lbl">
                    <Cpu className="w-5 h-5 text-indigo-400 animate-pulse" />
                    <span className="text-indigo-200 font-medium leading-tight font-mono">
                      {trans.genesisConstraints}
                    </span>
                  </div>
                  <span className="text-indigo-450 font-bold font-mono text-[10px] tracking-wider uppercase text-emerald-400 animate-pulse">
                    STATUS: INTEGRATED_100%
                  </span>
                </div>
              </div>
            </div>
          ) : viewMode === "experimental" ? (
            <ExperimentalLabView />
          ) : (
            <OmniSynapseDashboard />
          )}
        </div>
      </main>
      <GlobalLanguageSwitcher />
    </div>
  );
}
