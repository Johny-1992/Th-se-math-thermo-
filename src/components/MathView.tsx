import React from "react";
import { Chapter } from "../types";
import { BookOpen, HelpCircle, Variable, Bookmark } from "lucide-react";
import { useLanguage } from "../localization";

interface MathViewProps {
  chapter: Chapter;
}

export default function MathView({ chapter }: MathViewProps) {
  const { language, t } = useLanguage();

  // Unified dictionary for mathematical commentary translations
  const mathTrans = {
    fr: {
      mathFormulations: "FORMULATIONS ET DÉMONSTRATIONS MATHÉMATIQUES",
      chapterLabel: "Chapitre",
      refOperators: "Opérateurs et Équations de Référence",
      demonstrationObjective: "Objectif de Démonstration :",
      primitiveForm: "Forme Primitive",
      deRhamLerayContractedForm: "Forme Contractée de de Rham-Leray",
      deRhamLerayProjectorDesc: "Où P : L²(ℝ³)³ → L²_σ(ℝ³) est le projecteur orthogonal de de Rham-Leray.",
      vorticityDynamics: "Dynamique de la Vorticité intrinsèque",
      vorticityDesc: "ω = ∇ × u (Champ de Vorticité). P(ω · ∇u) représente l'effet d'étirement des lignes de tourbillon (Vortex Stretching).",
      energyCons: "Conservation d'Énergie Globale (Leray-Hopf)",
      macroBound: "La Borne Macroscopique Invariante Endogène",
      physicalDim: "Dimension physique : s⁻¹ (Fréquence ou Pulsation de rotation maximale intrinsèque).",
      johnyTheorem: "Théorème de Confinement Uniforme de Johny V6.0",
      bkmProof: "Prouve la régularité globale C∞ via le théorème d'obstruction géométrique de Beale-Kato-Majda (BKM).",
      nonlocalCommutator: "Comportement du Commutateur Non-Local",
      riccatiEq: "Équation de Structure de Riccati Topologique",
      hardyBmoConstraint: "𝜙 = ∥ω∥ / M_crit. Contrainte d'incompacité et d'irrationalité entropique dans l'espace Hardy-BMO.",
      conformJaugeVanishing: "Évanouissement Endogène de l'Étirement par la Jauge τ124",
      fourierTransform: "Transformée de Fourier Discrète",
      invertSingularity: "Singularité d'inversion levée : 1 / |k|² = 0 pour k = (0,0,0)",
      discretProjector: "Projecteur de de Rham-Leray Discret",
      orthoConstraint: "Garantit numériquement la contrainte d'orthogonalité stricte k · P_discret(f) = 0.",
      biotSavartInversion: "Inversion de Biot-Savart Exacte",
      kolmogorovClosure: "Clôture Turbulente de Kolmogorov",
      noneFluctuation: "Aucune fluctuation physique, bruit de calcul, ou singularité n'existe au-delà de cette fréquence.",
      cfdControl: "Critère de Contrôle CFD / Cavitation",
      cavitationElimination: "Élimine la baisse de pression locale sous le seuil de vapeur, supprimant structurellement la cavitation transitoire néfaste."
    },
    en: {
      mathFormulations: "MATHEMATICAL FORMULATIONS AND PROOFS",
      chapterLabel: "Chapter",
      refOperators: "Reference Operators and Equations",
      demonstrationObjective: "Demonstration Objective:",
      primitiveForm: "Primitive Form",
      deRhamLerayContractedForm: "de Rham-Leray Contracted Form",
      deRhamLerayProjectorDesc: "Where P : L²(ℝ³)³ → L²_σ(ℝ³) is the orthogonal de Rham-Leray projector.",
      vorticityDynamics: "Dynamics of Intrinsic Vorticity",
      vorticityDesc: "ω = ∇ × u (Vorticity Field). P(ω · ∇u) represents the vortex stretching effect.",
      energyCons: "Global Energy Conservation (Leray-Hopf)",
      macroBound: "Endogenous Invariant Macroscopic Bound",
      physicalDim: "Physical dimension: s⁻¹ (intrinsic maximal rotation angular frequency).",
      johnyTheorem: "Johny's Uniform Confinement Theorem V6.0",
      bkmProof: "Proves global regular C∞ regularity via the Beale-Kato-Majda (BKM) blow-up criterion.",
      nonlocalCommutator: "Non-Local Commutator Behavior",
      riccatiEq: "Topological Riccati Structural Equation",
      hardyBmoConstraint: "𝜙 = ∥ω∥ / M_crit. Constraint of incompactness and entropic irrationality in Hardy-BMO space.",
      conformJaugeVanishing: "Endogenous Vanishing of Vortex Stretching under τ₁₂₄ Gauge",
      fourierTransform: "Discrete Fourier Transform",
      invertSingularity: "Inversion singularity resolved: 1 / |k|² = 0 for k = (0,0,0)",
      discretProjector: "Discrete de Rham-Leray Projector",
      orthoConstraint: "Numerically enforces strict orthogonality constraint: k · P_discrete(f) = 0.",
      biotSavartInversion: "Exact Biot-Savart Inversion",
      kolmogorovClosure: "Kolmogorov Turbulent Closure",
      noneFluctuation: "No physical fluctuations, computation noise, or singularity exists beyond this frequency limit.",
      cfdControl: "CFD Control & Cavitation Criterion",
      cavitationElimination: "Eliminates local pressure drops below vapor pressure, structurally suppressing harmful transient cavitation."
    },
    zh: {
      mathFormulations: "数学公式推导与定理证明",
      chapterLabel: "章节",
      refOperators: "参考算子与动力学方程",
      demonstrationObjective: "证明目标：",
      primitiveForm: "原始物理方程 (Primitive Form)",
      deRhamLerayContractedForm: "de Rham-Leray 压缩形式",
      deRhamLerayProjectorDesc: "其中 P : L²(ℝ³)³ → L²_σ(ℝ³) 是 de Rham-Leray 正交投影算子。",
      vorticityDynamics: "本征涡度动力学 (Intrinsic Vorticity Dynamics)",
      vorticityDesc: "ω = ∇ × u (涡度场)。P(ω · ∇u) 代表涡旋拉伸效应 (Vortex Stretching)。",
      energyCons: "全局能量守恒 (Leray-Hopf)",
      macroBound: "内源性不变宏观界限 (Endogenous Macroscopic Bound)",
      physicalDim: "物理量纲：s⁻¹ (本征最大旋转角频率)。",
      johnyTheorem: "Johny 全局均匀限制定理 V6.0",
      bkmProof: "通过 Beale-Kato-Majda (BKM) 几何爆破准则证明全局光滑 C∞ 正则性。",
      nonlocalCommutator: "非局部对易子行为 (Non-Local Commutator Behavior)",
      riccatiEq: "拓扑 Riccati 结构方程",
      hardyBmoConstraint: "𝜙 = ∥ω∥ / M_crit。Hardy-BMO 空间中的非紧致性与熵无理约束性。",
      conformJaugeVanishing: "τ₁₂₄ 共形规范下涡旋拉伸的内源性消失",
      fourierTransform: "离散傅里叶变换 (DFT)",
      invertSingularity: "消除逆单点奇异性：对于频域 k = (0,0,0)，1 / |k|² = 0",
      discretProjector: "离散 de Rham-Leray 投影算子",
      orthoConstraint: "数值上强制满足严格正交约束限制：k · P_discret(f) = 0。",
      biotSavartInversion: "精确 Biot-Savart 逆映射",
      kolmogorovClosure: "柯尔莫哥洛夫 (Kolmogorov) 湍流闭合",
      noneFluctuation: "在此高频截止上限之外，不存在任何物理涨落、计算噪声或奇异性。",
      cfdControl: "CFD 工业流动优化控制 / 空化抑制准则",
      cavitationElimination: "消除局部压力跌落至饱和蒸汽压以下的情况，从结构上彻底根除有害的瞬态空化效应。"
    },
    ru: {
      mathFormulations: "МАТЕМАТИЧЕСКИЕ ФОРМУЛИРОВКИ И ДОКАЗАТЕЛЬСТВА",
      chapterLabel: "Глава",
      refOperators: "Преобразующие операторы и уравнения",
      demonstrationObjective: "Цель доказательства:",
      primitiveForm: "Примитивная форма",
      deRhamLerayContractedForm: "Уравнение де Рама-Лере в сокращенной форме",
      deRhamLerayProjectorDesc: "Здесь P : L²(ℝ³)³ → L²_σ(ℝ³) — ортогональный проектор де Рама-Лере.",
      vorticityDynamics: "Динамика собственного завихрения",
      vorticityDesc: "ω = ∇ × u (поле завихренности). P(ω · ∇u) представляет собой эффект растяжения вихревых линий.",
      energyCons: "Глобальное сохранение энергии (Лере-Хопф)",
      macroBound: "Эндогенный инвариантный макроскопический предел",
      physicalDim: "Физическая размерность: с⁻¹ (собственная максимальная круговая частота вращения).",
      johnyTheorem: "Теорема Джони о равномерной локализации V6.0",
      bkmProof: "Доказывает глобальную гладкость класса C∞ по геометрическому критерию Билла-Като-Майды (BKM).",
      nonlocalCommutator: "Поведение нелокального коммутатора",
      riccatiEq: "Топологическое структурное уравнение Риккати",
      hardyBmoConstraint: "𝜙 = ∥ω∥ / M_crit. Ограничение некомпактности в пространстве Харди-BMO.",
      conformJaugeVanishing: "Эндогенное затухание растяжения под действием конформного калибра τ₁₂₄",
      fourierTransform: "Дискретное преобразование Фурье",
      invertSingularity: "Устранение сингулярности: 1 / |k|² = 0 для k = (0,0,0)",
      discretProjector: "Дискретный проектор де Рама-Лере",
      orthoConstraint: "Численно гарантирует строгое ограничение ортогональности k · P_discret(f) = 0.",
      biotSavartInversion: "Точное обращение Био-Савара",
      kolmogorovClosure: "Турбулентное замыкание Колмогорова",
      noneFluctuation: "За пределами этой частоты отсутствуют какие-либо физические флуктуации или погрешности.",
      cfdControl: "Критерий контроля CFD / подавления кавитации",
      cavitationElimination: "Исключает локальное падение давления ниже упругости паров, подавляя разрушительную кавитацию."
    }
  }[language] || {
    // Fallback safely to fr
    mathFormulations: "FORMULATIONS ET DÉMONSTRATIONS MATHÉMATIQUES",
    chapterLabel: "Chapitre",
    refOperators: "Opérateurs et Équations de Référence",
    demonstrationObjective: "Objectif de Démonstration :",
    primitiveForm: "Forme Primitive",
    deRhamLerayContractedForm: "Forme Contractée de de Rham-Leray",
    deRhamLerayProjectorDesc: "Où P : L²(ℝ³)³ → L²_σ(ℝ³) est le projecteur orthogonal de de Rham-Leray.",
    vorticityDynamics: "Dynamique de la Vorticité intrinsèque",
    vorticityDesc: "ω = ∇ × u (Champ de Vorticité). P(ω · ∇u) représente l'effet d'étirement des lignes de tourbillon (Vortex Stretching).",
    energyCons: "Conservation d'Énergie Globale (Leray-Hopf)",
    macroBound: "La Borne Macroscopique Invariante Endogène",
    physicalDim: "Dimension physique : s⁻¹ (Fréquence ou Pulsation de rotation maximale intrinsèque).",
    johnyTheorem: "Théorème de Confinement Uniforme de Johny V6.0",
    bkmProof: "Prouve la régularité globale C∞ via le théorème d'obstruction géométrique de Beale-Kato-Majda (BKM).",
    nonlocalCommutator: "Comportement du Commutateur Non-Local",
    riccatiEq: "Équation de Structure de Riccati Topologique",
    hardyBmoConstraint: "𝜙 = ∥ω∥ / M_crit. Contrainte d'incompacité et d'irrationalité entropique dans l'espace Hardy-BMO.",
    conformJaugeVanishing: "Évanouissement Endogène de l'Étirement par la Jauge τ124",
    fourierTransform: "Transformée de Fourier Discrète",
    invertSingularity: "Singularité d'inversion levée : 1 / |k|² = 0 pour k = (0,0,0)",
    discretProjector: "Projecteur de de Rham-Leray Discret",
    orthoConstraint: "Garantit numériquement la contrainte d'orthogonalité stricte k · P_discret(f) = 0.",
    biotSavartInversion: "Inversion de Biot-Savart Exacte",
    kolmogorovClosure: "Clôture Turbulente de Kolmogorov",
    noneFluctuation: "Aucune fluctuation physique, bruit de calcul, ou singularité n'existe au-delà de cette fréquence.",
    cfdControl: "Critère de Contrôle CFD / Cavitation",
    cavitationElimination: "Élimine la baisse de pression locale sous le seuil de vapeur, supprimant structurellement la cavitation transitoire néfaste."
  };

  // Rendu personnalisé des équations mathématiques en HTML/CSS poli de style LaTeX
  const renderMathBlock = (id: number) => {
    switch (id) {
      case 1:
        return (
          <div className="space-y-4 font-sans text-slate-300" id="math-renderer-1">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-1">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest" id="eq-lbl-1">{mathTrans.primitiveForm}</div>
              <p className="font-serif text-lg text-slate-100 italic" id="eq-expr-1">
                ∂u / ∂t + (u · ∇)u = −∇p + νΔu
              </p>
              <p className="font-serif text-sm text-slate-400 mt-1" id="eq-cond-1">
                ∇ · u = 0
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-1">(Eq. 2 & 3)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-1b">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest" id="eq-lbl-1b">{mathTrans.deRhamLerayContractedForm}</div>
              <p className="font-serif text-lg text-slate-100 italic" id="eq-expr-1b">
                ∂u / ∂t + P((u · ∇)u) = νΔu
              </p>
              <p className="text-xs text-slate-400 font-mono mt-1" id="eq-cond-1b">
                {mathTrans.deRhamLerayProjectorDesc}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-1b">(Eq. 6)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-indigo-950 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 to-indigo-950/20" id="eq-box-1c">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-indigo-400 uppercase tracking-widest" id="eq-lbl-1c">{mathTrans.vorticityDynamics}</div>
              <p className="font-serif text-lg text-indigo-200 italic" id="eq-expr-1c">
                ∂ω / ∂t + P(u · ∇ω) = P(ω · ∇u) + νΔω
              </p>
              <p className="text-xs text-indigo-300 font-mono mt-1.5" id="eq-cond-1c">
                {mathTrans.vorticityDesc}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-indigo-500" id="eq-ref-1c">(Eq. 7)</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 font-sans text-slate-300" id="math-renderer-2">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-2a">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest" id="eq-lbl-2a">{mathTrans.energyCons}</div>
              <p className="font-serif text-base text-slate-100 italic" id="eq-expr-2a">
                ½ ∥u(·, t)∥²_L² + ν ∫₀ᵗ ∥∇u(·, s)∥²_L² ds ≤ ½ ∥u₀∥²_L² = E₀ &lt; +∞
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-2a">(Eq. 8)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-emerald-950 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 to-emerald-950/20" id="eq-box-2b">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-emerald-400 uppercase tracking-widest" id="eq-lbl-2b">{mathTrans.macroBound}</div>
              <div className="inline-flex items-center gap-2 font-serif text-xl font-bold text-emerald-200 py-1" id="eq-expr-2b">
                <span>M_crit =</span>
                <span className="border-t-2 border-emerald-400 px-1 text-sm mt-1">
                  √ ( E₀ / ν³ )
                </span>
              </div>
              <p className="text-[11px] text-emerald-300 font-mono mt-1" id="eq-cond-2b">
                {mathTrans.physicalDim}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-emerald-500" id="eq-ref-2b">(Eq. 13)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-emerald-900 text-center relative overflow-hidden" id="eq-box-2c">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-emerald-400 uppercase tracking-widest" id="eq-lbl-2c">{mathTrans.johnyTheorem}</div>
              <p className="font-serif text-lg text-emerald-100 font-semibold italic" id="eq-expr-2c">
                ∥ω(·, t)∥_L∞ ≤ M_crit   ,   ∀t ∈ [0, +∞[
              </p>
              <p className="text-xs text-slate-400 mt-1" id="eq-cond-2c">
                {mathTrans.bkmProof}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-emerald-500" id="eq-ref-2c">(Eq. 14)</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 font-sans text-slate-300" id="math-renderer-3">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-3a">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest" id="eq-lbl-3a">{mathTrans.nonlocalCommutator}</div>
              <p className="font-serif text-base text-slate-100 italic" id="eq-expr-3a">
                [P, S](ω) = P(S · ω) − S · P(ω)
              </p>
              <p className="font-serif text-sm text-slate-400 mt-1" id="eq-cond-3a">
                ∥[P, S](ω)∥_H¹ ≤ C ∥S∥_BMO ∥ω∥_L²
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-3a">(Eq. 18 & 19)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-rose-950 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 to-rose-950/20" id="eq-box-3b">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-rose-400 uppercase tracking-widest" id="eq-lbl-3b">{mathTrans.riccatiEq}</div>
              <p className="font-serif text-lg text-rose-200 italic" id="eq-expr-3b">
                d𝜙 / d∥ω∥ = (1 / M_crit) * (1 − 𝜙²)
              </p>
              <p className="text-[11px] text-rose-300 font-mono mt-1" id="eq-cond-3b">
                {mathTrans.hardyBmoConstraint}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-rose-500" id="eq-ref-3b">(Eq. 22)</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-lg border border-rose-900 text-center relative overflow-hidden" id="eq-box-3c">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-rose-400 uppercase tracking-widest" id="eq-lbl-3c">{mathTrans.conformJaugeVanishing}</div>
              <p className="font-serif text-lg text-rose-100 italic" id="eq-expr-3c">
                τ_124 ≡ 𝜙(∥ω∥) = tanh( ∥ω∥ / M_crit )
              </p>
              <p className="font-serif text-xs text-rose-300 mt-1.5" id="eq-cond-3c">
                {"P(ω · ∇u) = (ω · ∇u) · (1.0 − τ_124)  ==>  lim_{∥ω∥→M_crit} (1.0 − τ_124) = 0"}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-rose-500" id="eq-ref-3c">(Eq. 23 & 24)</span>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 font-sans text-slate-300" id="math-renderer-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-4a">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest" id="eq-lbl-4a">{mathTrans.fourierTransform}</div>
              <p className="font-serif text-xs text-slate-100 italic" id="eq-expr-4a">
                {"û(k, t) = (1 / N³) ∑_{x∈𝕋³} u(x, t) e^{−i k · x}"}
              </p>
              <p className="text-[10px] text-slate-500 font-mono" id="eq-cond-4a">
                {mathTrans.invertSingularity}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-4a">(Eq. 26)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-amber-950 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 to-amber-950/20" id="eq-box-4b">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-amber-400 uppercase tracking-widest" id="eq-lbl-4b">{mathTrans.discretProjector}</div>
              <p className="font-serif text-base text-amber-100 italic" id="eq-expr-4b">
                P_discret(f)_i = f_i − (k_i * k_j / |k|²) * f_j
              </p>
              <p className="text-[10px] text-amber-300 font-mono mt-1" id="eq-cond-4b">
                {mathTrans.orthoConstraint}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-amber-500" id="eq-ref-4b">(Eq. 27)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-amber-900 text-center relative overflow-hidden" id="eq-box-4c">
              <div className="absolute left-3 top-2 text-[9px] font-mono text-amber-400 uppercase tracking-widest" id="eq-lbl-4c">{mathTrans.biotSavartInversion}</div>
              <p className="font-serif text-sm text-slate-100 italic" id="eq-expr-4c">
                û(k, t) = i k × 𝜔̂(k, t) / |k|²
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-amber-500" id="eq-ref-4c">(Eq. 28)</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 font-sans text-slate-300" id="math-renderer-5">
            <div className="bg-slate-950 p-5 rounded-lg border border-cyan-950 text-center relative overflow-hidden bg-gradient-to-r from-slate-950 to-cyan-950/20" id="eq-box-5a">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-cyan-400 uppercase tracking-widest" id="eq-lbl-5a">{mathTrans.kolmogorovClosure}</div>
              <p className="font-serif text-base text-cyan-100 font-bold italic" id="eq-expr-5a">
                f_limite = (1 / 2π) * M_crit = (1 / 2π) * √ ( E₀ / ν³ )
              </p>
              <p className="text-[11px] text-cyan-200 mt-1" id="eq-cond-5a">
                {mathTrans.noneFluctuation}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-cyan-500" id="eq-ref-5a">(Eq. 30)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center relative overflow-hidden" id="eq-box-5b">
              <div className="absolute left-2 top-2 text-[9px] font-mono text-slate-400 uppercase tracking-widest" id="eq-lbl-5b">{mathTrans.cfdControl}</div>
              <p className="font-serif text-sm text-slate-100 italic" id="eq-expr-5b">
                ∥𝜔(·, t)∥_L∞ ≪ M_crit
              </p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed" id="eq-cond-5b">
                {mathTrans.cavitationElimination}
              </p>
              <span className="absolute right-3 bottom-2 text-xs font-mono text-slate-500" id="eq-ref-5b">(Eq. 31)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative" id={`math-view-chapter-${chapter.id}`}>
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-4" id="math-header">
        <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg" id="math-icon-badge">
          <Bookmark className="w-5 h-5" />
        </div>
        <div id="math-titles">
          <span className="text-[10px] font-mono font-medium tracking-widest text-slate-500 uppercase">
            {mathTrans.mathFormulations}
          </span>
          <h2 className="text-lg font-bold text-slate-100 truncate flex items-center gap-2">
            <span>{mathTrans.chapterLabel} {chapter.id}</span>
            <span className="text-slate-600 font-normal">|</span>
            <span className="text-slate-300 text-sm font-medium">{chapter.subtitle}</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="math-body-layout">
        {/* Colonne Gauche : Équations clés */}
        <div className="lg:col-span-5 space-y-4" id="equations-col">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Variable className="w-3.5 h-3.5 text-indigo-400" />
            {mathTrans.refOperators}
          </h4>
          {renderMathBlock(chapter.id)}
        </div>

        {/* Colonne Droite : Explications textuelles guidées */}
        <div className="lg:col-span-7 flex flex-col justify-between" id="explanations-col">
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed" id="explanation-text-container">
            <div className="bg-indigo-950/20 border border-indigo-500/10 p-4 rounded-lg flex gap-3" id="objective-box">
              <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-xs font-mono text-indigo-300 uppercase tracking-wider">
                  {mathTrans.demonstrationObjective}
                </h5>
                <p className="text-slate-300 text-xs mt-1 font-sans">{chapter.objective}</p>
              </div>
            </div>

            <div className="space-y-3" id="formatted-paragraphs">
              {chapter.mathExplanation.map((paragraph, index) => (
                <p key={index} className="text-xs text-slate-400 font-sans" id={`para-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Keywords / Tags list */}
          <div className="mt-5 pt-4 border-t border-slate-800" id="tags-container">
            <div className="flex flex-wrap gap-1.5" id="tags-list">
              {chapter.keywords.map((word) => (
                <span
                  key={word}
                  className="px-2 py-0.5 bg-slate-950 text-slate-400 rounded text-[10px] font-mono border border-slate-800"
                  id={`tag-${word}`}
                >
                  {word}
                </span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
