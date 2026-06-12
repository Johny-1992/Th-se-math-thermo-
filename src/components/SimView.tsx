import React, { useState, useEffect, useRef } from "react";
import { runDiscreteSimulation, generateVortexTornadoState, calculateMCrit, calculateFLimit, Point3D } from "../mathSolver";
import { SimulationParams, SimulationState } from "../types";
import { Shield, Settings2, Play, Pause, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";
import { useLanguage } from "../localization";

interface SimViewProps {
  currentChapterId: number;
}

export default function SimView({ currentChapterId }: SimViewProps) {
  const { language } = useLanguage();

  const trans = {
    fr: {
      solverTitle: "Solveur Hydrodynamique AbsoluteClayNavierStokesSolver3D",
      play: "Démarrer",
      pause: "Pause",
      reset: "Réinit.",
      resetTitle: "Réinitialiser l'axe temporel",
      fluidParams: "Paramètres du Continuum Fluide",
      viscosityLabel: "Viscosité Cinématique (ν)",
      viscosityDesc: "La baisse de la viscosité ν augmente la turbulence et amplifie la cascade réplicative de Tao.",
      energyLabel: "Énergie Globale Initiale (E₀)",
      energyDesc: "Énergie cinétique globale de la configuration solénoïdale initiale (m/s)².",
      localVortLabel: "Perturbation de Vorticité locale",
      stretchLabel: "Constante d'Étirement (Vortex Stretch)",
      indicators: "Indicateurs Topologiques",
      invariantBound: "Borne Invariante (Mcrit) :",
      kolmogorovClosure: "Clôture de Kolmogorov (flimite) :",
      doubleComparaison: "Double Comparaison",
      classiqueTao: "Classique (Tao)",
      jaugeTau: "Jauge τ124",
      sansJaugeTitle: "SANS JAUGE (CASCADES DE TAO)",
      crashedBannerTitle: "CATASTROPHE TURBULENTE",
      crashedBannerSub: "Singularité Blow-up / Crash CFD détecté !",
      crashedBannerDesc: "Les lignes de tourbillon se contractent vers une section nulle, amplifiant la vorticité vers l'infini en temps fini. Approche BKM heurtée.",
      avecJaugeTitle: "AVEC JAUGE τ124 (JOHNY)",
      autoConfinement: "AUTO-CONFINEMENT",
      peakVorticity: "Vorticité crête :",
      evolutionGraphTitle: "Évolution de l'intensité Crête ||ω(·, t)||_L∞ vs la Borne d'Échelle M_crit",
      lgClassic: "Modèle Classique (Divergence quadratique)",
      lgTau: "Jauge Conforme τ124 (Confinement rigoureux)",
      lgMcrit: "Borne d'existence globale (Leray-Cartan)",
      vorticityLabelChart: "Intensité Crête",
      legendTitle: "Légendes",
      classicalCascade: "Cascade Divergente Classique (Tao)",
      regulationConform: "Régulation Conforme (τ124 de Johny)"
    },
    en: {
      solverTitle: "AbsoluteClayNavierStokes3D Hydrodynamic Solver",
      play: "Start",
      pause: "Pause",
      reset: "Reset",
      resetTitle: "Reset simulation time axis",
      fluidParams: "Fluid Continuum Parameters",
      viscosityLabel: "Kinematic Viscosity (ν)",
      viscosityDesc: "Lowering viscosity ν increases turbulence and amplifies Tao's blow-up cascade.",
      energyLabel: "Initial Global Energy (E₀)",
      energyDesc: "Global kinetic energy of the initial solenoidal flow configuration.",
      localVortLabel: "Local Vorticity Perturbation",
      stretchLabel: "Stretching Constant (Vortex Stretch)",
      indicators: "Topological Indicators",
      invariantBound: "Invariant Bound (Mcrit) :",
      kolmogorovClosure: "Kolmogorov Limit (flimit) :",
      doubleComparaison: "Double Comparison",
      classiqueTao: "Classical (Tao)",
      jaugeTau: "τ124 Conformal Gauge",
      sansJaugeTitle: "WITHOUT GAUGE (TAO'S CASCADES)",
      crashedBannerTitle: "TURBULENT CATASTROPHE",
      crashedBannerSub: "Blow-up singularity / CFD Crash detected!",
      crashedBannerDesc: "Vortex lines contract to a zero cross-section, amplifying vorticity to infinity in finite time. Obstruction target strictly hit (Beale-Kato-Majda).",
      avecJaugeTitle: "WITH τ124 GAUGE (JOHNY)",
      autoConfinement: "AUTO-CONFINEMENT",
      peakVorticity: "Peak vorticity:",
      evolutionGraphTitle: "Evolution of peak intensity ||ω(·, t)||_L∞ vs Scale Bound M_crit",
      lgClassic: "Classical Model (Quadratic divergence)",
      lgTau: "Conformal Gauge τ124 (Rigorous confinement)",
      lgMcrit: "Global existence bound (Leray-Cartan)",
      vorticityLabelChart: "Peak Intensity",
      legendTitle: "Legends",
      classicalCascade: "Classical Divergent Cascade (Tao)",
      regulationConform: "Conformal Regulation (τ124 of Johny)"
    },
    zh: {
      solverTitle: "AbsoluteClayNavierStokes3D 三维流体力学数值求解器",
      play: "运行",
      pause: "暂停",
      reset: "重置",
      resetTitle: "重置时间序列",
      fluidParams: "连续介质流体控制参数",
      viscosityLabel: "运动粘度 (ν - Kinematic Viscosity)",
      viscosityDesc: "运动粘值 ν 降低会加速湍流，导致陶哲轩 (Tao) 描述的级联发散倾向加剧。",
      energyLabel: "初始全局能量尺度 (E₀)",
      energyDesc: "初始螺线型涡场构型的总宏观动能 (m/s)²。",
      localVortLabel: "局部初始扰动涡度",
      stretchLabel: "非局部涡旋拉伸系数 (Vortex Stretch)",
      indicators: "本征拓扑特征指标",
      invariantBound: "内源性不变界限 (Mcrit) :",
      kolmogorovClosure: "柯氏极限截止频率 (flimit) :",
      doubleComparaison: "双向对比模式",
      classiqueTao: "经典 Navier-Stokes 波动方程 (Tao)",
      jaugeTau: "τ124 共形规范模型 (Johny)",
      sansJaugeTitle: "无规范校正 (陶哲轩级联爆破)",
      crashedBannerTitle: "湍流爆破性奇异崩溃",
      crashedBannerSub: "有限时间爆破奇异性 / 求解器崩溃！",
      crashedBannerDesc: "涡管细丝自发收缩至无限小物理截面，导致极值涡度发散至无限大。触碰 Beale-Kato-Majda (BKM) 临界发散极限。",
      avecJaugeTitle: "结合 τ124 共形规范修复 (JOHNY)",
      autoConfinement: "自适应紧致收敛",
      peakVorticity: "峰值极值涡度：",
      evolutionGraphTitle: "极值峰值涡度演化 ||ω(·, t)||_L∞ 对比 内源性守恒极限 M_crit",
      lgClassic: "经典 Navier-Stokes 模型 (二次不可逆发散爆破)",
      lgTau: "τ124 共形规范修正 (严格自限均匀收敛)",
      lgMcrit: "全局光滑存在判定线 (Leray-Cartan 界限)",
      vorticityLabelChart: "峰值强度",
      legendTitle: "图例说明",
      classicalCascade: "传统发散级联场 (Tao 理论)",
      regulationConform: "自约束共形规整 (Johny 提案)"
    },
    ru: {
      solverTitle: "Гидродинамический решатель AbsoluteClayNavierStokesSolver3D",
      play: "Запуск",
      pause: "Пауза",
      reset: "Сброс",
      resetTitle: "Сбросить временную шкалу",
      fluidParams: "Параметры жидкой среды",
      viscosityLabel: "Кинематическая вязкость (ν)",
      viscosityDesc: "Снижение вязкости ν увеличивает турбулентность и усиливает вихревой каскад Тао.",
      energyLabel: "Начальная энергия (E₀)",
      energyDesc: "Полная кинетическая энергия начальной конфигурации завихрения.",
      localVortLabel: "Локальное возмущение завихренности",
      stretchLabel: "Постоянная растяжения (Vortex Stretch)",
      indicators: "Топологические индикаторы",
      invariantBound: "Инвариантный предел (Mcrit) :",
      kolmogorovClosure: "Предел Колмогорова (flimit) :",
      doubleComparaison: "Двойное сравнение",
      classiqueTao: "Классика (Тао)",
      jaugeTau: "Калибр τ124",
      sansJaugeTitle: "БЕЗ КАЛИБРА (КАСКАД ТАО)",
      crashedBannerTitle: "ТУРБУЛЕНТНАЯ КАТАСТРОФА",
      crashedBannerSub: "Обнаружена сингулярность бесконечного взрыва!",
      crashedBannerDesc: "Вихревые линии сжимаются до нулевого сечения, бесконечно увеличивая завихренность за конечное время. Нарушен критерий BKM.",
      avecJaugeTitle: "С КАЛИБРОМ τ124 (ДЖОНИ)",
      autoConfinement: "АВТО-ЛОКАЛИЗАЦИЯ",
      peakVorticity: "Пиковая завихренность:",
      evolutionGraphTitle: "Эволюция пиковой завихренности ||ω(·, t)||_L∞ и лимита M_crit",
      lgClassic: "Классическая модель (квадратичное расхождение)",
      lgTau: "Конформный калибр τ124 (строгое удержание)",
      lgMcrit: "Предел глобального существования (Лере-Картана)",
      vorticityLabelChart: "Пиковая интенсивность",
      legendTitle: "Легенда",
      classicalCascade: "Классический каскад расхождения (Тао)",
      regulationConform: "Конформная регуляция (τ124 Джани)"
    }
  }[language] || {
    solverTitle: "Solveur Hydrodynamique AbsoluteClayNavierStokesSolver3D",
    play: "Démarrer",
    pause: "Pause",
    reset: "Réinit.",
    resetTitle: "Réinitialiser l'axe temporel",
    fluidParams: "Paramètres du Continuum Fluide",
    viscosityLabel: "Viscosité Cinématique (ν)",
    viscosityDesc: "La baisse de la viscosité ν augmente la turbulence et amplifie la cascade réplicative de Tao.",
    energyLabel: "Énergie Globale Initiale (E₀)",
    energyDesc: "La baisse de la viscosité ν engendre des gradients plus prononcés.",
    localVortLabel: "Perturbation de Vorticité locale",
    stretchLabel: "Constante d'Étirement (Vortex Stretch)",
    indicators: "Indicateurs Topologiques",
    invariantBound: "Borne Invariante (Mcrit) :",
    kolmogorovClosure: "Clôture de Kolmogorov (flimite) :",
    doubleComparaison: "Double Comparaison",
    classiqueTao: "Classique (Tao)",
    jaugeTau: "Jauge τ124",
    sansJaugeTitle: "SANS JAUGE (CASCADES DE TAO)",
    crashedBannerTitle: "CATASTROPHE TURBULENTE",
    crashedBannerSub: "Singularité Blow-up / Crash CFD détecté !",
    crashedBannerDesc: "Les lignes de tourbillon se contractent vers une section nulle, amplifiant la vorticité vers l'infini en temps fini. Approche BKM heurtée.",
    avecJaugeTitle: "AVEC JAUGE τ124 (JOHNY)",
    autoConfinement: "AUTO-CONFINEMENT",
    peakVorticity: "Vorticité crête :",
    evolutionGraphTitle: "Évolution de l'intensité Crête ||ω(·, t)||_L∞ vs la Borne d'Échelle M_crit",
    lgClassic: "Modèle Classique (Divergence quadratique)",
    lgTau: "Jauge Conforme τ124 (Confinement rigoureux)",
    lgMcrit: "Borne d'existence globale (Leray-Cartan)",
    vorticityLabelChart: "Intensité Crête",
    legendTitle: "Légendes",
    classicalCascade: "Cascade Divergente Classique (Tao)",
    regulationConform: "Régulation Conforme (τ124 de Johny)"
  };

  // Paramètres de simulation initiaux
  const [params, setParams] = useState<SimulationParams>({
    viscosity: 0.05,
    initialEnergy: 4.5,
    vorticityScale: 1.5,
    enableTau124: true, // par défaut pr la comparaison
    forceStretching: 1.2,
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [simulationTime, setSimulationTime] = useState(0); // l'index temporel de 0 à 99
  const [selectedModelView, setSelectedModelView] = useState<"both" | "classical" | "tau">("both");

  // Calcul du solveur de la thèse
  const simResult = runDiscreteSimulation(params, 100, 0.05);

  // References pour l'animation Canvas
  const canvasRefClassic = useRef<HTMLCanvasElement | null>(null);
  const canvasRefTau = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Animation ticks
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSimulationTime((prev) => (prev + 1) % 100);
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Rendu Canvas pour le Vortex Tornado
  useEffect(() => {
    const drawVortex = (canvas: HTMLCanvasElement, withTau: boolean, timeIndex: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Calcul des points de tourbillon 3D
      const points = generateVortexTornadoState(
        timeIndex,
        { ...params, enableTau124: withTau },
        simResult.mCrit
      );

      // Fond étoilé spectral de colocalisation
      ctx.fillStyle = "rgba(10, 15, 30, 0.4)";
      ctx.fillRect(0, 0, width, height);

      // Dessin des cercles de colocalisation de Fourier
      ctx.strokeStyle = "rgba(30, 50, 100, 0.15)";
      ctx.lineWidth = 1;
      for (let r = 2; r < 6; r++) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, r * 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Projection 3D simple sur l'écran
      const angleRot = timeIndex * 0.02; // Rotation lente de la caméra
      const cosRot = Math.cos(angleRot);
      const sinRot = Math.sin(angleRot);

      // Calcul du centre
      const cX = width / 2;
      const cY = height / 2;

      // Dessin des lignes de tourbillon (Vortex Filaments)
      ctx.lineWidth = 1.8;
      
      // Regrouper par couronne pour dessiner les anneaux transverses
      const pointsPerRing = 16;
      const numRings = Math.floor(points.length / pointsPerRing);

      for (let r = 0; r < numRings; r++) {
        ctx.beginPath();
        // Intensité moyenne de l'anneau
        let avgIntensity = 0;
        for (let p = 0; p < pointsPerRing; p++) {
          avgIntensity += points[r * pointsPerRing + p].intensity;
        }
        avgIntensity /= pointsPerRing;

        // Définition de la couleur de l'anneau
        // En classique : rouge d'alerte / explosion
        // En jauge : bleu/azur de confinement stable
        const normIntensity = Math.min(1.0, avgIntensity / (simResult.mCrit * 0.8));
        let strokeColor = "";
        if (!withTau) {
          // Rouge chaud d'accident vers le violet sombre
          strokeColor = `hsla(${10 - normIntensity * 15}, 90%, ${35 + normIntensity * 25}%, ${0.55 + normIntensity * 0.45})`;
        } else {
          // Émeraude à Cyan de stabilité mathématique
          strokeColor = `hsla(${160 + normIntensity * 40}, 85%, ${40 + normIntensity * 15}%, ${0.6 + normIntensity * 0.4})`;
        }
        ctx.strokeStyle = strokeColor;

        for (let p = 0; p <= pointsPerRing; p++) {
          const ptIdx = r * pointsPerRing + (p % pointsPerRing);
          const pt = points[ptIdx];

          // Transformation de coordonnées 3D (Rotation Y)
          const rotX = pt.x * cosRot - pt.z * sinRot;
          const rotZ = pt.x * sinRot + pt.z * cosRot;

          // Projection Perspective
          const distance = 4;
          const projScale = distance / (distance - rotZ * 0.15);
          const screenX = cX + rotX * 65 * projScale;
          const screenY = cY + pt.y * 30 * projScale; // compressé en vertical

          if (p === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
      }

      // Dessin de l'axe central (colonne d'étirement)
      ctx.strokeStyle = !withTau ? "rgba(239, 68, 68, 0.25)" : "rgba(16, 185, 129, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cX, 20);
      ctx.lineTo(cX, height - 20);
      ctx.stroke();

      // Dessin des particules discrètes ultra-critiques (les modes de Littlewood-Paley haute fréquence)
      points.forEach((pt, j) => {
        // Un filtre pour n'afficher que quelques particules lumineuses
        if (j % 5 !== 0) return;

        const rotX = pt.x * cosRot - pt.z * sinRot;
        const rotZ = pt.x * sinRot + pt.z * cosRot;

        const distance = 4;
        const projScale = distance / (distance - rotZ * 0.15);
        const screenX = cX + rotX * 65 * projScale;
        const screenY = cY + pt.y * 30 * projScale;

        const size = Math.max(1.5, Math.min(6, (pt.intensity / simResult.mCrit) * 4));
        ctx.fillStyle = !withTau 
          ? `rgba(239, 68, 68, ${0.45 + (pt.intensity / simResult.mCrit) * 0.5})` 
          : `rgba(45, 212, 191, ${0.45 + (pt.intensity / simResult.mCrit) * 0.5})`;

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();

        // Éclat flouté pour l'intensité critique
        if (pt.intensity > simResult.mCrit * 0.8) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(screenX, screenY, size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Annotations du goulot critique
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(148, 163, 184, 0.5)";
      const withTauLabel = language === "en" ? "τ124 Gauge (P-Conformal)" : language === "zh" ? "τ124 规范 (P-共形体)" : language === "ru" ? "Калибр τ124 (P-конформный)" : "Jauge τ124 (P-Conforme)";
      const sansTauLabel = language === "en" ? "Without Gauge (Divergent)" : language === "zh" ? "无规范场 (发散爆破)" : language === "ru" ? "Без калибра (расходящийся)" : "Sans Jauge (Divergent)";
      ctx.fillText(`Mode: ${withTau ? withTauLabel : sansTauLabel}`, 10, height - 12);
    };

    if (canvasRefClassic.current && (selectedModelView === "both" || selectedModelView === "classical")) {
      drawVortex(canvasRefClassic.current, false, simulationTime);
    }
    if (canvasRefTau.current && (selectedModelView === "both" || selectedModelView === "tau")) {
      drawVortex(canvasRefTau.current, true, simulationTime);
    }
  }, [simulationTime, params, selectedModelView, simResult.mCrit]);

  // Fonction de réinitialisation de simulation
  const handleReset = () => {
    setSimulationTime(0);
    setIsPlaying(false);
  };

  const updateParam = (field: keyof SimulationParams, value: number) => {
    setParams((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSimulationTime(0); // Réinitialiser le temps pour recalculer proprement
  };

  // --- TRACAGE GRAPHIQUE MAISON EN SVG (Pour une solidité mathématique absolue) ---
  const renderInteractiveSVGGraph = () => {
    const margin = { top: 15, right: 15, bottom: 25, left: 35 };
    const graphWidth = 500;
    const graphHeight = 200;

    const dataLength = simResult.time.length;

    // Définir les extremums pour l'échelle Y
    // On veut afficher au moins jusqu'à Mcrit * 1.5 pour bien voir le confinement
    const maxYVal = Math.max(simResult.mCrit * 1.35, ...simResult.vorticity經典.filter(v => v !== undefined && !Number.isNaN(v)));
    const minYVal = 0;

    // Fonctions de projection pixel
    const getX = (index: number) => margin.left + (index / (dataLength - 1)) * (graphWidth - margin.left - margin.right);
    const getY = (val: number) => {
      const clampedVal = Math.min(maxYVal, Math.max(minYVal, val));
      const range = maxYVal - minYVal || 1;
      return graphHeight - margin.bottom - ((clampedVal - minYVal) / range) * (graphHeight - margin.top - margin.bottom);
    };

    // Construction du chemin SVG (D path) pour le modèle classique
    let classicPath = "";
    simResult.vorticity經典.forEach((val, idx) => {
      // Si c'est crashé, on coupe visuellement après le temps de crash pour simuler la rupture du solveur
      if (simResult.isCrashed && simResult.crashTime !== null && idx * 0.05 > simResult.crashTime) {
        return;
      }
      const x = getX(idx);
      const y = getY(val);
      if (idx === 0) classicPath = `M ${x} ${y}`;
      else classicPath += ` L ${x} ${y}`;
    });

    // Construction du chemin pour la jauge τ124
    let tauPath = "";
    simResult.vorticityτ124.forEach((val, idx) => {
      const x = getX(idx);
      const y = getY(val);
      if (idx === 0) tauPath = `M ${x} ${y}`;
      else tauPath += ` L ${x} ${y}`;
    });

    const mCritY = getY(simResult.mCrit);
    const currX = getX(simulationTime);

    return (
      <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} className="w-full h-full text-slate-400 font-mono select-none" id="vorticity-evolution-chart">
        {/* Grilles de fond */}
        <line x1={margin.left} y1={margin.top} x2={graphWidth - margin.right} y2={margin.top} stroke="rgba(255,255,255,0.05)" />
        <line x1={margin.left} y1={getY(maxYVal / 2)} x2={graphWidth - margin.right} y2={getY(maxYVal / 2)} stroke="rgba(255,255,255,0.05)" />
        <line x1={margin.left} y1={graphHeight - margin.bottom} x2={graphWidth - margin.right} y2={graphHeight - margin.bottom} stroke="rgba(255,255,255,0.1)" />

        {/* Ligne pointillée Mcrit */}
        <line
          x1={margin.left}
          y1={mCritY}
          x2={graphWidth - margin.right}
          y2={mCritY}
          stroke="#10b981"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          id="svg-line-mcrit"
        />
        <text x={graphWidth - margin.right - 80} y={mCritY - 5} fill="#10b981" fontSize="8" fontWeight="bold">
          Mcrit = {simResult.mCrit.toFixed(2)}
        </text>

        {/* Ligne d'indice temporel de simulation en cours */}
        <line
          x1={currX}
          y1={margin.top}
          x2={currX}
          y2={graphHeight - margin.bottom}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="2 1"
        />

        {/* Axes */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={graphHeight - margin.bottom} stroke="#475569" />

        {/* Chemin Classique (Rouge et dramatique) */}
        <path d={classicPath} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chemin Jauge Conforme (Vert rassurant) */}
        <path d={tauPath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Libellés de graduation Y */}
        <text x={margin.left - 5} y={margin.top + 3} textAnchor="end" fontSize="7" fill="#64748b">
          {maxYVal.toFixed(1)}
        </text>
        <text x={margin.left - 5} y={getY(simResult.mCrit)} textAnchor="end" fontSize="7" fill="#10b981">
          M_crit
        </text>
        <text x={margin.left - 5} y={graphHeight - margin.bottom + 3} textAnchor="end" fontSize="7" fill="#64748b">
          0.0
        </text>

        {/* Libellés Axe X */}
        <text x={margin.left} y={graphHeight - margin.bottom + 12} fontSize="7" fill="#64748b">
          t=0
        </text>
        <text x={getX(50)} y={graphHeight - margin.bottom + 12} textAnchor="middle" fontSize="7" fill="#64748b">
          t = 2.5s
        </text>
        <text x={getX(99)} y={graphHeight - margin.bottom + 12} textAnchor="end" fontSize="7" fill="#64748b">
          t = 5.0s
        </text>

        {/* Flèches et labels */}
        <text x={margin.left + 15} y={margin.top + 10} fontSize="8" fill="#ef4444" fontWeight="semibold">
          {trans.classicalCascade}
        </text>
        <text x={margin.left + 15} y={margin.top + 22} fontSize="8" fill="#06b6d4" fontWeight="semibold">
          {trans.regulationConform}
        </text>

        {/* Point de Crash si classique crash */}
        {simResult.isCrashed && simResult.crashTime !== null && (
          <>
            <circle
              cx={getX(Math.floor(simResult.crashTime / 0.05))}
              cy={getY(simResult.mCrit * 2.5)}
              r="4"
              fill="#ef4444"
              className="animate-ping"
            />
            <circle
              cx={getX(Math.floor(simResult.crashTime / 0.05))}
              cy={getY(simResult.mCrit * 2.5)}
              r="3"
              fill="#ef4444"
            />
            <text
              x={getX(Math.floor(simResult.crashTime / 0.05)) - 10}
              y={getY(simResult.mCrit * 2.5) - 8}
              fill="#ef4444"
              fontSize="7"
              fontWeight="bold"
              textAnchor="end"
            >
              {language === "en" ? "CFD CRASH" : language === "zh" ? "有限有限时间爆破崩溃" : language === "ru" ? "СБОЙ CFD" : "CRASH CFD"} t={simResult.crashTime.toFixed(2)}s
            </text>
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6" id="sim-view-parent">
      {/* Header simulateur */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4" id="sim-view-header">
        <div className="flex items-center gap-3" id="sim-title-container">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg" id="sim-icon-box">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-medium tracking-widest text-slate-500 uppercase">
              {language === "en" ? "REAL-TIME INVARIANCE & CONFINEMENT DEMONSTRATION VISUALIZER" : language === "zh" ? "不变性与紧致收敛实时多语数值展示" : language === "ru" ? "ВИЗУАЛИЗАТОР ИНВАРИАНТНОСТИ И УДЕРЖАНИЯ В РЕАЛЬНОМ ВРЕМЕНИ" : "VISUEL DÉMONSTRATEUR D'INVARIANCES ET CONFINEMENT EN TEMPS RÉEL"}
            </span>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              {trans.solverTitle}
            </h2>
          </div>
        </div>

        {/* Commandes d'animation */}
        <div className="flex items-center gap-2" id="animation-controls">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2.5 rounded-lg border flex items-center gap-1.5 text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
              isPlaying
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500"
            }`}
            id="btn-play-pause"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" /> {trans.pause}
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> {trans.play}
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono flex items-center gap-1 cursor-pointer"
            title={trans.resetTitle}
            id="btn-reset-sim"
          >
            <RotateCcw className="w-4 h-4" /> {trans.reset}
          </button>
        </div>
      </div>

      {/* Grid d'affichage principal : Colonne de contrôle (Sliders) / Visualisation 3D en temps réel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="sim-main-grid">
        {/* Panneau de configuration (Curseurs physiques) */}
        <div className="xl:col-span-4 bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-5" id="sliders-panel">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-400" />
            {trans.fluidParams}
          </h4>

          {/* Curseurs */}
          <div className="space-y-4 text-xs" id="sliders-container">
            {/* Viscosité */}
            <div className="space-y-1.5" id="slider-viscosity-box">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400 font-semibold">{trans.viscosityLabel}</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono">
                  {params.viscosity}
                </span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.10"
                step="0.01"
                value={params.viscosity}
                onChange={(e) => updateParam("viscosity", parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                id="range-viscosity"
              />
              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                {trans.viscosityDesc}
              </p>
            </div>

            {/* Invariant Énergie */}
            <div className="space-y-1.5" id="slider-energy-box">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400 font-semibold font-sans">{trans.energyLabel}</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono">
                  {params.initialEnergy} J
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                value={params.initialEnergy}
                onChange={(e) => updateParam("initialEnergy", parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                id="range-energy"
              />
              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                {trans.energyDesc}
              </p>
            </div>

            {/* Échelle de vorticité initiale */}
            <div className="space-y-1.5" id="slider-vScale-box">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400 font-semibold font-sans">{trans.localVortLabel}</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono">
                  ω₀ = {params.vorticityScale} s⁻¹
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={params.vorticityScale}
                onChange={(e) => updateParam("vorticityScale", parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                id="range-voscale"
              />
            </div>

            {/* Force d'étirement en zone ultra-critique */}
            <div className="space-y-1.5" id="slider-stretch-box">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400 font-semibold font-sans">{trans.stretchLabel}</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 font-mono">
                  C = {params.forceStretching}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={params.forceStretching}
                onChange={(e) => updateParam("forceStretching", parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                id="range-stretching"
              />
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-3 font-mono text-[11px]" id="evaluation-constants-box">
            <h5 className="font-semibold text-slate-400 uppercase tracking-widest text-[10px]">{trans.indicators}</h5>
            <div className="flex justify-between" id="ind-mcrit">
              <span className="text-slate-500">{trans.invariantBound}</span>
              <span className="text-emerald-400 font-bold">{simResult.mCrit.toFixed(3)} s⁻¹</span>
            </div>
            <div className="flex justify-between" id="ind-flimit">
              <span className="text-slate-500">{trans.kolmogorovClosure}</span>
              <span className="text-cyan-400 font-bold">{simResult.fLimite.toFixed(3)} Hz</span>
            </div>
          </div>
        </div>

        {/* Visualiseur 3D comparatif en temps réel */}
        <div className="xl:col-span-8 space-y-4" id="visualisation-box">
          {/* Sélecteur de vue de modèle */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 max-w-sm" id="view-mode-selector">
            <button
              onClick={() => setSelectedModelView("both")}
              className={`flex-1 py-1 px-3 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedModelView === "both"
                  ? "bg-slate-800/80 text-white border border-slate-700/80 shadow"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              id="view-both"
            >
              {trans.doubleComparaison}
            </button>
            <button
              onClick={() => setSelectedModelView("classical")}
              className={`flex-1 py-1 px-3 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedModelView === "classical"
                  ? "bg-rose-950/40 text-rose-300 border border-rose-800/20"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              id="view-classic"
            >
              {trans.classiqueTao}
            </button>
            <button
              onClick={() => setSelectedModelView("tau")}
              className={`flex-1 py-1 px-3 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedModelView === "tau"
                  ? "bg-emerald-950/40 text-emerald-300 border border-emerald-800/20"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              id="view-tau"
            >
              {trans.jaugeTau}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="canvas-grid">
            {/* Visualiseur Classique (Divergent) */}
            {(selectedModelView === "both" || selectedModelView === "classical") && (
              <div className="relative bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex flex-col pt-3" id="classic-canvas-container">
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[10px] font-mono text-rose-400 font-bold z-10">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  {trans.sansJaugeTitle}
                </div>

                {/* État de crash */}
                {simResult.isCrashed && simulationTime * 0.05 >= (simResult.crashTime || 0) && (
                  <div className="absolute inset-0 bg-red-950/45 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-20">
                    <AlertTriangle className="w-12 h-12 text-rose-500 animate-bounce mb-2" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      {trans.crashedBannerTitle}
                    </span>
                    <span className="text-xs text-rose-400 block font-mono mt-1">
                      {trans.crashedBannerSub}
                    </span>
                    <p className="text-[10px] text-slate-300 mt-2 max-w-xs font-serif italic">
                      {trans.crashedBannerDesc}
                    </p>
                  </div>
                )}

                <canvas
                  ref={canvasRefClassic}
                  width={340}
                  height={220}
                  className="w-full h-55 opacity-90"
                  id="canvas-classic"
                />

                <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono" id="classic-footer">
                  <span className="text-slate-500">{trans.peakVorticity}</span>
                  <span className={`font-bold ${simResult.vorticity經典[simulationTime] > simResult.mCrit ? 'text-rose-400' : 'text-slate-300'}`}>
                    {simResult.vorticity經典[simulationTime]?.toFixed(3) || "INFINI"} s⁻¹
                  </span>
                </div>
              </div>
            )}

            {/* Visualiseur Jauge τ124 (Stable) */}
            {(selectedModelView === "both" || selectedModelView === "tau") && (
              <div className="relative bg-slate-950 rounded-lg overflow-hidden border border-indigo-950 flex flex-col pt-3" id="tau-canvas-container">
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 font-bold z-10">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {trans.avecJaugeTitle}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded text-[9px] font-mono text-emerald-300 font-semibold z-10">
                  {trans.autoConfinement}
                </div>

                <canvas
                  ref={canvasRefTau}
                  width={340}
                  height={220}
                  className="w-full h-55 opacity-90"
                  id="canvas-tau"
                />

                <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono" id="tau-footer">
                  <span className="text-slate-500">{trans.peakVorticity}</span>
                  <span className="font-bold text-emerald-400 animate-pulse">
                    {simResult.vorticityτ124[simulationTime]?.toFixed(3)} s⁻¹
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Graphique de traçage de la vorticité temporelle */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-5" id="graph-container">
            <h5 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              {trans.evolutionGraphTitle}
            </h5>
            <div className="w-full h-50" id="interactive-graphic-canvas">
              {renderInteractiveSVGGraph()}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 text-[10px] font-mono text-slate-500" id="graph-legend">
              <div className="flex items-center gap-1.5" id="lg-classical">
                <div className="w-3 h-1.5 bg-rose-500 rounded" />
                <span>{trans.lgClassic}</span>
              </div>
              <div className="flex items-center gap-1.5" id="lg-tau">
                <div className="w-3 h-1.5 bg-cyan-500 rounded" />
                <span>{trans.lgTau}</span>
              </div>
              <div className="flex items-center gap-1.5" id="lg-mcrit">
                <div className="h-0 border-t border-dashed border-emerald-500 w-5" />
                <span>{trans.lgMcrit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
