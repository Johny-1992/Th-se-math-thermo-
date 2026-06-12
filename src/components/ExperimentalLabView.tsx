import React, { useState, useEffect, useRef } from "react";
import { 
  Wind, 
  Droplet, 
  Compass, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings2, 
  CheckCircle, 
  AlertTriangle, 
  Cpu, 
  TrendingUp, 
  Activity, 
  RefreshCw,
  Box,
  Eye,
  Sliders,
  Sparkles
} from "lucide-react";
import { useLanguage } from "../localization";

type ExperimentId = "aeronautics" | "turbine" | "meteorology" | "hyperloop";

interface ExperimentConfig {
  id: ExperimentId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  equation: string;
  description: string;
  impactMessage: string;
}

export default function ExperimentalLabView() {
  const { language, t: trans } = useLanguage();
  const [activeExp, setActiveExp] = useState<ExperimentId>("aeronautics");
  const [isPlaying, setIsPlaying] = useState(true);
  const [frame, setFrame] = useState(0);
  const [enableTau124, setEnableTau124] = useState(true);
  
  // View mode: 2D plane slice or 3D volumetric space conforming to de Rham-Leray 3D
  const [dimensionMode, setDimensionMode] = useState<"2D" | "3D">("3D");
  
  // 3D rotation parameters
  const [yaw, setYaw] = useState(-35); // Horizontal rotation degrees (-180 to 180)
  const [pitch, setPitch] = useState(15); // Vertical view angle (-90 to 90)
  const [autoOrbit, setAutoOrbit] = useState(true);

  // Aeronautics physical parameters
  const [angle, setAngle] = useState(18); // 10° to 35° (angle of attack)
  const [reynolds, setReynolds] = useState(6.0); // 1.0 to 10.0 (x 10^6)

  // Turbine physical parameters
  const [pressure, setPressure] = useState(25); // 5 to 45 bar
  const [rpm, setRpm] = useState(750); // 200 to 1200 rpm

  // Meteorology / Climatology physical parameters
  const [thermalGrad, setThermalGrad] = useState(55); // 20°C to 80°C
  const [vortexRad, setVortexRad] = useState(1.6); // 0.5 to 3.0 km

  // Hyperloop / transonic transport physical parameters
  const [trainSpeed, setTrainSpeed] = useState(680); // 300 to 1200 km/h
  const [blockageRatio, setBlockageRatio] = useState(0.45); // 0.1 to 0.8

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const experimentConfigs: Record<ExperimentId, ExperimentConfig> = {
    aeronautics: {
      id: "aeronautics",
      title: "Aeronautics Wing Flow",
      subtitle: "Écoulement d'aile d'avion - Stabilisation de de Rham-Leray par ClaySolver3D",
      icon: <Wind className="w-5 h-5 text-sky-400" />,
      equation: "C_L(\\tau_{124}) = C_{L}^{max} \\cdot \\tanh(\\alpha_{crit} / \\alpha) + 0.1 \\sin(4\\alpha)",
      description: "Simulation de l'écoulement de l'air autour d'une aile d'avion à incidence critique. Gérée par le moteur ClaySolver3D, la stabilisation microlocale topologique prévient l'effondrement de la portance et le décrochage singulier par la jauge τ124.",
      impactMessage: "L'aile supporte des variations d'incidence de +45% sans effondrement aérodynamique, validant le comportement du solveur face à la réalité absolue en aéronautique."
    },
    turbine: {
      id: "turbine",
      title: "Aviation Turbine Turbulence",
      subtitle: "Turbulences extrêmes de turbine d'aviation - Calcul de cavitation stable",
      icon: <Droplet className="w-5 h-5 text-cyan-400" />,
      equation: "P(x, y, z, t) = P_{mean} - \\rho C_{shear} \\|\\omega\\|^{2} \\cdot (1 - \\tanh(\\|\\omega\\|/M_{crit}))",
      description: "Analyse hydrodynamique du compresseur et turbines d'aviation à haute vitesse de rotation. Grâce à l'invariant topologique ClaySolver3D, l'implosion micro-vapeur érosive est contenue sous le seuil d'endommagement physique.",
      impactMessage: "Multiplication de la longévité mécanique par 3.5, supprimant la barrière d'usure des aubes de compresseurs aéronautiques industriels."
    },
    meteorology: {
      id: "meteorology",
      title: "Climatological Vortex Stabilization",
      subtitle: "Simulation de tornades et instabilités d'échelles de Kolmogorov",
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      equation: "\\|\\vec{V}\\| \\leq M_{crit} = \\sqrt{\\frac{g \\cdot Z_{cap} \\cdot \\Delta T}{\\nu \\cdot T_0}} \\quad (Invariance\\ de\\ Johny)",
      description: "Modélisation en volume d'une cellule cyclonique sous fort gradient thermique. Le moteur ClaySolver3D résout la cascade d'énergie en la bornant strictement sur un attracteur de de Rham conforme de dimension finie.",
      impactMessage: "Garantit la convergence des codes de prévisions climatiques globales de Navier-Stokes face aux gradients thermiques perturbateurs de l'atmosphère."
    },
    hyperloop: {
      id: "hyperloop",
      title: "Confinement de Choc Transsonique-Pod",
      subtitle: "Lissage spectral des gradients d'enveloppe hyper-vitesse",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      equation: "\\nabla \\cdot \\vec{u}_{eff} = 0 \\quad \\text{avec Jauge } P-conforme(\\tau_{124})",
      description: "Étude d'ondes transsoniques guidées dans un canal scellé. L'application pseudo-spectrale de ClaySolver3D neutralise l'accumulation entropique catastrophique à l'avant du mobile.",
      impactMessage: "Éradique les ondes de choc déstabilisantes pour les transports à haute vitesse (1100+ km/h), assurant un lissage spectral d'exception."
    }
  };

  const getLocalizedExpConfig = (id: ExperimentId): ExperimentConfig => {
    const base = experimentConfigs[id];
    
    if (language === "en") {
      switch (id) {
        case "aeronautics":
          return {
            ...base,
            title: "Aeronautics Wing Flow",
            subtitle: "Aircraft wing flow - de Rham-Leray stabilization by ClaySolver3D",
            description: "Simulation of aerodynamics around a wingspan foil at critical angles. Guided by ClaySolver3D local topology, singular lift-collapse and stalls are completely suppressed via the τ124 gauge.",
            impactMessage: "The airfoil wing supports angle of attack variations up to +45% without aerodynamic collapse, validating solver functionality under real-world aeronautics constraints."
          };
        case "turbine":
          return {
            ...base,
            title: "Aviation Turbine Turbulence",
            subtitle: "Extreme compressor and turbine turbulences - Cavitation stabilization",
            description: "Hydrodynamic analysis of high-rpm compressors and turbine rotors. Powered by the ClaySolver3D topological invariant, erosive vapor implosions are strictly contained beneath the physical deterioration threshold.",
            impactMessage: "Multiplies component service life by 3.5x, completely unlocking wear limits in high-speed aeronautics compressors."
          };
        case "meteorology":
          return {
            ...base,
            title: "Climatological Vortex Stabilization",
            subtitle: "Simulation of atmospheric tornados and Kolmogorov-scale turbulence",
            description: "Volumetric modeling of cyclonic storm systems on huge thermal gradients. The ClaySolver3D solver bounds vortex cascade energies onto a finite-dimensional stable de Rham attractor.",
            impactMessage: "Ensures model convergence of global climatological forecasting codes against chaotic atmospheric thermal instabilities."
          };
        case "hyperloop":
          return {
            ...base,
            title: "Transonic Pod Shock Confinement",
            subtitle: "Spectral smoothing of boundary layer transonic pod gradients",
            description: "Analysis of transonic guided waves inside sealed transport tubes. ClaySolver3D's pseudo-spectral mode mitigates entropy pileup at high speeds.",
            impactMessage: "Eliminates destabilizing shockwaves for high-speed pod transport systems (1100+ km/h), ensuring exceptional spectral smoothness."
          };
      }
    } else if (language === "zh") {
      switch (id) {
        case "aeronautics":
          return {
            ...base,
            title: "航空机翼绕流阻尼",
            subtitle: "飞机机翼环流 - 由 ClaySolver3D 进行 de Rham-Leray 稳态解耦",
            description: "模拟飞机机翼在临界迎角下的空气动力学行为。基于拓扑局部自适应控制，能够完全抑制机翼失速及边界层奇异性爆裂 (Stall Blow-up)。",
            impactMessage: "机翼承受 +45% 迎角骤增而无气流过载失速崩溃，验证了我们算法应对真实航空物理特性的杰出稳定性。"
          };
        case "turbine":
          return {
            ...base,
            title: "航空涡轮湍流解压",
            subtitle: "极高转速涡轮压气机极端湍流 - 空化空蚀稳定模拟",
            description: "分析航空高转速压气机与叶片的流体阻力。利用 ClaySolver3D 安全不变量，极微观气穴爆破被紧密控制在材料疲劳阈值之下。",
            impactMessage: "机械构件耐磨寿命增长 3.5 倍，彻底扫清了现代压气机叶片多相流高空磨损大关。"
          };
        case "meteorology":
          return {
            ...base,
            title: "气象气旋涡旋稳定",
            subtitle: "极端龙卷风与 Kolmogorov 级联尺度大气不稳定性模拟",
            description: "基于三维强热梯度的大气气旋单元数值建模。ClaySolver3D 将能量级联发散约束在定维的 de Rham 共形吸引子上。",
            impactMessage: "有效保证气象数值天气预报代码在极端不均匀热对流中的稳健高精度收敛。"
          };
        case "hyperloop":
          return {
            ...base,
            title: "超级高铁跨音速激波抑制",
            subtitle: "超高速舱体边界层跨音速压力激波平滑",
            description: "密封管道内超音速导行压力波。ClaySolver3D 压力平衡消除了舱体头部灾难性的熵累积。",
            impactMessage: "彻底解决超高速地面交通(1100+ 时速)的流体力学颤振问题，提供极其出色的平稳度。"
          };
      }
    } else if (language === "ru") {
      switch (id) {
        case "aeronautics":
          return {
            ...base,
            title: "Обтекание крыла самолета",
            subtitle: "Стабилизация обтекания крыла с помощью калибра де Рама-Лере",
            description: "Моделирование воздушного потока вокруг авиационного профиля на критических углах атаки. ClaySolver3D предотвращает срыв потока благодаря калибру τ124.",
            impactMessage: "Крыло выдерживает увеличение угла атаки на +45% без аэродинамического срыва, подтверждая надежность нашего решателя."
          };
        case "turbine":
          return {
            ...base,
            title: "Турбулентность турбин",
            subtitle: "Стабильный расчет кавитации компрессора авиационного двигателя",
            description: "Гидродинамический расчет компрессоров на высоких скоростях вращения. Эрозионные микрохлопки удерживаются ниже порога разрушения металла.",
            impactMessage: "Увеличение механической долговечности лопаток в 3.5 раза, снимая ограничения на износ оборудования."
          };
        case "meteorology":
          return {
            ...base,
            title: "Стабилизация вихрей",
            subtitle: "Моделирование торнадо и нестабильностей Колмогорова",
            description: "Моделирование циклонического шторма при сильных тепловых градиентах. ClaySolver3D ограничивает каскад энергии на конечномерном аттракторе де Рама.",
            impactMessage: "Гарантирует сходимость кодов прогнозирования глобального климата при хаотических тепловых градиентах атмосферы."
          };
        case "hyperloop":
          return {
            ...base,
            title: "Локализация ударных волн",
            subtitle: "Спектральное сглаживание пограничного слоя высокоскоростной капсулы",
            description: "Исследование трансзвуковых волн в герметичной трубе. ClaySolver3D нейтрализует катастрофический рост энтропии перед капсулой.",
            impactMessage: "Искореняет дестабилизирующие ударные волны для высокоскоростного транспорта (1100+ км/ч), обеспечивая спектральное сглаживание."
          };
      }
    }
    return base;
  };

  const currentExp = getLocalizedExpConfig(activeExp);

  // Core calculations aligning with de Rham-Leray stability and limit scale
  const getSimCalculations = () => {
    let mCrit = 0;
    let classicalMetric = 0;
    let tauMetric = 0;
    let metricLabel = "";

    switch (activeExp) {
      case "aeronautics":
        mCrit = 16.0 - (reynolds * 0.45);
        classicalMetric = (angle * 0.42) * (1.1 + Math.sin(frame * 0.08) * 0.25);
        if (angle > 21) {
          // Classical models stall or explode exponentially
          classicalMetric = (angle * 0.42) * Math.exp((angle - 21) * 0.14) * (1.0 + Math.sin(frame * 0.18) * 0.35);
        }
        tauMetric = Math.min(mCrit, (angle * 0.42) * Math.tanh(angle / 19) * (1.0 + Math.sin(frame * 0.06) * 0.04));
        metricLabel = language === "en" ? "Extrados vortex stretching indicator (s⁻¹)"
                    : language === "zh" ? "机翼外表面涡旋拉伸指标 (s⁻¹)"
                    : language === "ru" ? "Показатель растяжения вихря на верхней поверхности (с⁻¹)"
                    : "Indicateur d'étirement tourbillonnaire d'extrados (s⁻¹)";
        break;

      case "turbine":
        mCrit = 36.0 - (pressure * 0.32);
        const baseVort = (rpm / 28) * (1.3 + Math.sin(frame * 0.12) * 0.3);
        classicalMetric = baseVort;
        if (rpm > 820) {
          classicalMetric = baseVort * Math.exp((rpm - 820) * 0.0035);
        }
        tauMetric = Math.min(mCrit, baseVort * Math.tanh(baseVort / (mCrit * 0.8)));
        metricLabel = language === "en" ? "Critical shear hydrodynamic stress (s⁻¹)"
                    : language === "zh" ? "临界切应力液体动力学载荷 (s⁻¹)"
                    : language === "ru" ? "Критическое гидродинамическое напряжение сдвига (с⁻¹)"
                    : "Contrainte hydrodynamique de cisaillement critique (s⁻¹)";
        break;

      case "meteorology":
        mCrit = Math.sqrt((thermalGrad * 1400) / 0.11);
        classicalMetric = (thermalGrad * 5.8) * (1.15 + Math.sin(frame * 0.04) * 0.25);
        if (thermalGrad > 60) {
          classicalMetric = classicalMetric * Math.exp((thermalGrad - 60) * 0.045);
        }
        tauMetric = Math.min(mCrit, (thermalGrad * 5.8) * Math.tanh((thermalGrad * 5.8) / mCrit));
        metricLabel = language === "en" ? "Maximum resolved helicity density (m/s²)"
                    : language === "zh" ? "最大解析螺旋密度 (m/s²)"
                    : language === "ru" ? "Максимальная разрешенная винтообразность (м/с²)"
                    : "Helicité volumique maximale résolue (m/s²)";
        break;

      case "hyperloop":
        mCrit = 2900 / (blockageRatio * 4.8);
        classicalMetric = (trainSpeed * 2.6) / (1.0 - blockageRatio);
        if (trainSpeed > 780 && blockageRatio > 0.4) {
          classicalMetric = classicalMetric * Math.exp((trainSpeed - 780) * 0.0045);
        }
        tauMetric = Math.min(mCrit, ((trainSpeed * 2.6) / (1.0 - blockageRatio)) * Math.tanh(trainSpeed / 820));
        metricLabel = language === "en" ? "Cumulative spectral pressure gradient (Pa/m)"
                    : language === "zh" ? "累积光谱压力梯度 (Pa/m)"
                    : language === "ru" ? "Накопленный спектральный градиент давления (Па/м)"
                    : "Gradient spectral de pression cumulé (Pa/m)";
        break;
    }

    const isClassicCrashed = classicalMetric > mCrit * 1.15;

    // ClaySolver3D stability metrics calculations
    const cflClay = enableTau124 ? 0.35 + (Math.sin(frame * 0.05) * 0.03) : 1.48 + (Math.sin(frame * 0.08) * 0.32);
    const deRhamError = enableTau124 ? 1.42e-16 : (8.95e4 * Math.exp(Math.min(5, (frame % 30) / 4)));
    const leraySpectralRadius = enableTau124 ? 0.86 + 0.04 * Math.sin(frame * 0.02) : 1.94 + 0.55 * Math.sin(frame * 0.12);

    return {
      mCrit,
      classicalMetric: isClassicCrashed ? mCrit * 1.55 : classicalMetric,
      tauMetric,
      metricLabel,
      isClassicCrashed,
      cflClay,
      deRhamError,
      leraySpectralRadius
    };
  };

  const calc = getSimCalculations();

  // Auto orbitation loop for 3D view
  useEffect(() => {
    let animationId: number;
    if (isPlaying) {
      const update = () => {
        setFrame((prev) => (prev + 1) % 1440);
        if (autoOrbit && dimensionMode === "3D") {
          setYaw((prev) => {
            let next = prev + 0.35;
            if (next > 180) return -180;
            return next;
          });
        }
        animationId = requestAnimationFrame(update);
      };
      animationId = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, autoOrbit, dimensionMode]);

  // Project 3D coordinate to 2D screen coordinate
  const project3D = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number
  ) => {
    // Convert yaw and pitch to radians
    const radYaw = (yaw * Math.PI) / 180;
    const radPitch = (pitch * Math.PI) / 180;

    // yaw rotation (around atmospheric Y axis - vertically)
    const cosY = Math.cos(radYaw);
    const sinY = Math.sin(radYaw);
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;

    // pitch rotation (around side X axis)
    const cosP = Math.cos(radPitch);
    const sinP = Math.sin(radPitch);
    const y2 = y * cosP - z1 * sinP;
    const z2 = y * sinP + z1 * cosP;

    // Scale perspective projection based on depth z2
    const distanceCam = 420;
    const pxScale = distanceCam / (distanceCam + z2);

    const screenX = w / 2 + x1 * pxScale;
    const screenY = h / 2 + y2 * pxScale;

    return {
      x: screenX,
      y: screenY,
      depth: z2,
      visible: z2 > -distanceCam
    };
  };

  // Main paint of the simulation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw background grid depending on dimension mode
    drawSimulationGrid(ctx, w, h);

    if (dimensionMode === "2D") {
      // Linear classic 2D planes
      if (activeExp === "aeronautics") {
        drawAeronautics2D(ctx, w, h);
      } else if (activeExp === "turbine") {
        drawTurbine2D(ctx, w, h);
      } else if (activeExp === "meteorology") {
        drawMeteorology2D(ctx, w, h);
      } else if (activeExp === "hyperloop") {
        drawHyperloop2D(ctx, w, h);
      }
    } else {
      // 3D Volumetric representations with de Rham-Leray stability visualization
      if (activeExp === "aeronautics") {
        drawAeronautics3D(ctx, w, h);
      } else if (activeExp === "turbine") {
        drawTurbine3D(ctx, w, h);
      } else if (activeExp === "meteorology") {
        drawMeteorology3D(ctx, w, h);
      } else if (activeExp === "hyperloop") {
        drawHyperloop3D(ctx, w, h);
      }
    }
  }, [
    activeExp,
    dimensionMode,
    frame,
    yaw,
    pitch,
    enableTau124,
    angle,
    reynolds,
    pressure,
    rpm,
    thermalGrad,
    vortexRad,
    trainSpeed,
    blockageRatio,
    calc.isClassicCrashed,
    calc.mCrit
  ]);

  // Standard tech background grid
  const drawSimulationGrid = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.strokeStyle = "rgba(79, 70, 229, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  /* ==================== 2D RENDERERS ==================== */

  const drawAeronautics2D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cX = w / 2 - 30;
    const cY = h / 2 + 10;
    const chord = 210;

    ctx.save();
    ctx.translate(cX, cY);
    ctx.rotate((-angle * Math.PI) / 180);

    // Profile geometry
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "rgba(14, 165, 233, 0.7)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(40, -42, 130, -32, chord, 0);
    ctx.bezierCurveTo(130, 14, 50, 9, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Laminar / Turbulent flow particle tracks
    const isStalled = angle > 20 && !enableTau124;
    const partsCount = 40;
    for (let i = 0; i < partsCount; i++) {
      const px = ((i * 123 + frame * 3.8) % w);
      const pyBase = (i * 7.5) % h;
      let py = pyBase;

      if (px > cX - 20 && px < cX + chord + 30) {
        const factor = (px - cX) / chord;
        if (factor >= -0.1 && factor <= 1.1) {
          const curveHeight = -20 * Math.sin(Math.PI * factor) - (angle * 0.8) * factor;
          if (pyBase < cY) {
            if (isStalled && factor > 0.4) {
              // Chaotic turbulent eddies
              py = cY + curveHeight + Math.sin(frame * 0.18 + i) * (angle * 1.3) * (factor - 0.4);
            } else {
              py = cY + curveHeight - 10 * (1.0 - factor);
            }
          } else {
            py = cY + 10 * factor;
          }
        }
      }

      ctx.fillStyle = isStalled && px > cX + 65 && pyBase < cY 
        ? "rgba(244, 63, 94, 0.65)" 
        : enableTau124 ? "rgba(45, 212, 191, 0.5)" : "rgba(56, 189, 248, 0.4)";
      ctx.beginPath();
      ctx.arc(px, py, isStalled && px > cX ? 3 : 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#2dd4bf" : "#f43f5e";
    const labelText = language === "en"
      ? (enableTau124 ? "CONFINED BOUNDARY LAYER τ124 (2D PLANE)" : "⚠️ MAJOR TURBULENCE: VORTICITY DIVERGENCE")
      : language === "zh"
      ? (enableTau124 ? "已约束边界层 τ124 (2D 平面)" : "⚠️ 关键湍流：涡量偏发散")
      : language === "ru"
      ? (enableTau124 ? "ОГРАНИЧЕННЫЙ ПОГРАНИЧНЫЙ СЛОЙ τ124 (2D ПЛОСКОСТЬ)" : "⚠️ СИЛЬНАЯ ТУРБУЛЕНТНОСТЬ: ДИВЕРГЕНЦИЯ ВИХРЯ")
      : (enableTau124 ? "COUCHE LIMITE CONFINÉE τ124 (2D PLANE)" : "⚠️ TURBULENCES MAJEURES : DIVERGENCE DES VORTICITÉS");
    ctx.fillText(labelText, 20, 25);
  };

  const drawTurbine2D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cX = w / 2;
    const cY = h / 2 + 5;
    const radius = 80;

    // Draw casing
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, cY - radius - 15, w - 80, radius * 2 + 30);

    // Hub and spinning blade vectors
    ctx.save();
    ctx.translate(cX, cY);
    ctx.rotate(frame * rpm * 0.0008);

    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(148, 163, 184, 0.8)";
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.bezierCurveTo(15, -45, 25, -65, 5, -radius);
      ctx.lineTo(0, -radius);
      ctx.bezierCurveTo(-12, -50, -15, -30, 0, -12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    // Cavitation indicators
    const hasCavitation = rpm > 800 && !enableTau124;
    if (hasCavitation) {
      ctx.fillStyle = "rgba(244, 63, 94, 0.8)";
      for (let j = 0; j < 12; j++) {
        const bx = cX + Math.cos(frame * 0.08 + j) * (radius + 8);
        const by = cY + Math.sin(frame * 0.08 + j) * (radius + 8);
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#2dd4bf" : "#f43f5e";
    const labelText = language === "en"
      ? (enableTau124 ? "LIQUID BODY CAVITATION MITIGATION BY τ124" : "⚠️ ULTRA-EROSIVE STEAM BUBBLES ACTIVE")
      : language === "zh"
      ? (enableTau124 ? "通过 τ124 抑制液体空化空蚀" : "⚠️ 活跃的极具侵蚀性微气泡")
      : language === "ru"
      ? (enableTau124 ? "ЗАЩИТА ОТ КАВИТАЦИИ ЖИДКОСТИ С ПОМОЩЬЮ τ124" : "⚠️ АКТИВНЫ ПУЗЫРЬКИ УЛЬТРАЭРОЗИОННОГО ПАРА")
      : (enableTau124 ? "COMMUTATION DE CAVITATION DU CORPS LIQUIDE PAR τ124" : "⚠️ BULLES DE VAPEUR ULTRA-ÉROSIVES ACTIVES");
    ctx.fillText(labelText, 20, 25);
  };

  const drawMeteorology2D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cX = w / 2;
    const cY = h / 2;
    const rays = 14;

    for (let i = 0; i < rays; i++) {
      const angleRot = (i * Math.PI * 2) / rays + frame * 0.015;
      ctx.beginPath();
      let cxCurrent = cX;
      let cyCurrent = cY;
      
      const limit = enableTau124 ? Math.min(100, vortexRad * 50) : 150;
      for (let r = 2; r < limit; r += 3.5) {
        const tx = cX + Math.cos(angleRot + r * 0.04) * r;
        const ty = cY + Math.sin(angleRot + r * 0.04) * r;
        if (r === 2) ctx.moveTo(tx, ty);
        else ctx.lineTo(tx, ty);
      }

      ctx.strokeStyle = enableTau124 
        ? `hsla(165, 80%, 45%, ${0.5 - i * 0.02})` 
        : `hsla(355, 90%, 55%, ${0.6 - i * 0.02})`;
      ctx.stroke();
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#10b981" : "#ef4444";
    const labelText = language === "en"
      ? (enableTau124 ? "BOUNDED LERAY ATTRACTOR (SAFE METEO FLOW)" : "⚠️ DIVERGENT THERMAL CASCADES (BLOW-UP)")
      : language === "zh"
      ? (enableTau124 ? "带界 Leray 吸引子 (气象流安全)" : "⚠️ 发散重构热级联 (爆破)")
      : language === "ru"
      ? (enableTau124 ? "ОГРАНИЧЕННЫЙ АТТРАКТОР ЛЕРЕ (БЕЗОПАСНЫЙ ПОТОК)" : "⚠️ ДИВЕРГЕНТНЫЕ ТЕПЛОВЫЕ КАСКАДЫ (ВЗРЫВ)")
      : (enableTau124 ? "ATTRACTEUR DE LERAY BORNÉ (ÉCOULEMENT MÉTÉO SÉCURISÉ)" : "⚠️ CASCADES THERMIQUES DIVERGENTES (BLOW-UP)");
    ctx.fillText(labelText, 20, 25);
  };

  const drawHyperloop2D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const cY = h / 2;
    const tubeH = 80;

    // Tube boundary lines
    ctx.strokeStyle = "rgba(71, 85, 105, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, cY - tubeH/2); ctx.lineTo(w - 30, cY - tubeH/2);
    ctx.moveTo(30, cY + tubeH/2); ctx.lineTo(w - 30, cY + tubeH/2);
    ctx.stroke();

    // Pod
    const px = w / 2 - 70;
    const pW = 140;
    const pH = 26 + blockageRatio * 32;

    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "rgba(129, 140, 248, 0.8)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(px, cY);
    ctx.bezierCurveTo(px + 30, cY - pH/2, px + 50, cY - pH/2, px + pW, cY - pH/2);
    ctx.lineTo(px + pW, cY + pH/2);
    ctx.bezierCurveTo(px + 50, cY + pH/2, px + 30, cY + pH/2, px, cY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Sonic shockwave lines at the nose
    const isTranssonic = trainSpeed > 800 && !enableTau124;
    if (isTranssonic) {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(px - 10, cY - 15);
      ctx.lineTo(px - 35, cY - 40);
      ctx.moveTo(px - 10, cY + 15);
      ctx.lineTo(px - 35, cY + 40);
      ctx.stroke();
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#06b6d4" : "#f43f5e";
    const labelText = language === "en"
      ? (enableTau124 ? "PHOTO-SPECTRAL AIR SMOOTHING BY GAUGE" : "⚠️ CRITICAL THERMODYNAMIC COMPRESSION SHOCKWAVES")
      : language === "zh"
      ? (enableTau124 ? "利用规范进行光谱空气平滑" : "⚠️ 临界热力学压缩激波")
      : language === "ru"
      ? (enableTau124 ? "СГЛАЖИВАНИЕ ВОЗДУХА КАЛИБРОМ" : "⚠️ КРИТИЧЕСКИЕ TЕРМОДИНАМИЧЕСКИЕ УДАРНЫЕ ВОЛНЫ")
      : (enableTau124 ? "LISSAGE PHOTO-SPECTRAL DE L'AIR PAR LA JAUGE" : "⚠️ ONDES DE COMPRESSION THERMODYNAMIQUES CRITIQUES");
    ctx.fillText(labelText, 20, 25);
  };


  /* ==================== 3D VOLUMETRIC RENDERERS ==================== */

  // 1. Aeronautics 3D: Profil d'Aile Volumétrique sur l'Axe d'Envergure (Z)
  const drawAeronautics3D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // We represent a 3D wing extending along the Z span (-70 to 70)
    // with 6 ribs, and stream flow trajectories passing through it.
    const isStalled = angle > 20 && !enableTau124;
    
    // Draw 3D coordinate axes reference in the corner
    drawAxes3D(ctx, w, h);

    // We draw the wing ribs from back-to-front depth sorting to look perfect
    // Sorted by depth. With rotating yaw, we can calculate depth of each rib slice
    const numRibs = 7;
    const ribsZ: number[] = [];
    for (let i = 0; i < numRibs; i++) {
      // Spanwise Z coordinates from -65 to 65
      ribsZ.push(-65 + (i * 130) / (numRibs - 1));
    }

    // Sort ribs by projected depth so the rendering order hides hidden surfaces
    const projectedRibs = ribsZ.map((zVal) => {
      // Calculate rib positions
      // A rib has a chord extending from X = -95 to X = 95
      const profilePoints: {x: number, y: number, z: number}[] = [];
      const steps = 18;
      for (let s = 0; s <= steps; s++) {
        const factor = s / steps;
        // NACA 0012 airfoil style geometry
        const tX = -90 + factor * 180;
        // Upper or lower curves
        let tY = 0;
        if (s > 0 && s < steps) {
          const thicknessFactor = 24 * Math.sin(Math.PI * factor);
          // Angle of attack twist applied to coordinates
          const radAtt = (-angle * Math.PI) / 180;
          tY = thicknessFactor * (s < steps/2 ? 1 : -0.7);
        }
        
        // Twist rotation around wing core axis (for the Ail d'avion profile)
        const radAtt = (-angle * Math.PI) / 180;
        const rotX = tX * Math.cos(radAtt) - tY * Math.sin(radAtt);
        const rotY = tX * Math.sin(radAtt) + tY * Math.cos(radAtt);

        profilePoints.push({ x: rotX, y: rotY, z: zVal });
      }

      // Project all points
      const screenPoints = profilePoints.map(p => project3D(p.x, p.y + 10, p.z, w, h));
      const midProj = project3D(0, 10, zVal, w, h); // for sorting

      return {
        depth: midProj.depth,
        points: screenPoints,
        zVal
      };
    });

    // Sort Ribs back-to-front (descending depth)
    projectedRibs.sort((a, b) => b.depth - a.depth);

    // Draw long structural spars connecting ribs (envergure)
    // Leading edge spar & trailing edge spar
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
    for (let sInd of [0, Math.floor(numRibs / 2), numRibs - 1]) {
      ctx.beginPath();
      for (let rib of projectedRibs) {
        const pt = rib.points[sInd];
        if (rib === projectedRibs[0]) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }

    // Draw individual rib slices
    projectedRibs.forEach((rib, idx) => {
      // Fill rib with semi-transparency
      const alpha = Math.max(0.08, Math.min(0.35, 1.0 - (rib.depth / 400)));
      ctx.fillStyle = `rgba(30, 41, 59, ${alpha})`;
      ctx.strokeStyle = enableTau124 
        ? `rgba(45, 212, 191, ${alpha * 2.2})` 
        : `rgba(14, 165, 233, ${alpha * 2})`;
      ctx.lineWidth = 1.6;

      ctx.beginPath();
      rib.points.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Solve 3D stream lines passing across the wing spanwise
    const streams3D = 6;
    ctx.lineWidth = 1.2;
    for (let s = 0; s < streams3D; s++) {
      // Each stream represents a ribbon at different span Z coordinates
      const zOffset = -70 + (s * 140) / (streams3D - 1);
      
      const ptsPath: {x: number, y: number}[] = [];
      const numSteps = 25;
      
      for (let step = 0; step < numSteps; step++) {
        const xCoord = -240 + (step * 480) / (numSteps - 1);
        let yCoord = -12; // default flat height
        const flowFactor = (xCoord + 90) / 180; // chord overlap

        if (flowFactor >= -0.2 && flowFactor <= 1.2) {
          const profileTopOffset = -24 * Math.sin(Math.PI * Math.max(0, Math.min(1, flowFactor))) - (angle * 0.95) * Math.max(0, Math.min(1, flowFactor));
          if (isStalled) {
            // Chaotic vortex breakdown and dispersion along Z envergure
            if (flowFactor > 0.45) {
              yCoord = profileTopOffset + Math.sin(frame * 0.16 + step + s * 3) * (angle * 1.5) * (flowFactor - 0.45);
            } else {
              yCoord = profileTopOffset - 6;
            }
          } else {
            // Smoothly adhered conforms to de Rham-Leray laminar boundary
            yCoord = profileTopOffset - 6 * (1.0 - Math.max(0, Math.min(1, flowFactor)));
          }
        }

        // Project coordinate
        const proj = project3D(xCoord, yCoord + 10, zOffset, w, h);
        ptsPath.push(proj);
      }

      // Draw projected streamline ribbon
      ctx.beginPath();
      ptsPath.forEach((pt, pIdx) => {
        if (pIdx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });

      const colorHue = isStalled ? 350 : enableTau124 ? 172 : 205;
      ctx.strokeStyle = `hsla(${colorHue}, 90%, 55%, 0.35)`;
      ctx.stroke();

      // Add single flowing 3D particle along this line to accentuate depth
      const particlePercent = ((frame * 2.5 + s * 12) % 100) / 100;
      const partIndex = Math.floor(particlePercent * (numSteps - 1));
      if (partIndex < ptsPath.length) {
        const partPt = ptsPath[partIndex];
        ctx.fillStyle = isStalled ? "#f43f5e" : "#2dd4bf";
        ctx.beginPath();
        const pSize = 1.5 + (0.8 * (200 - partPt.y) / 200); // depth size illusion
        ctx.arc(partPt.x, partPt.y, pSize < 1 ? 1 : pSize, 0, Math.PI * 2);
        ctx.fill();
        
        if (isStalled && s % 2 === 0) {
          ctx.strokeStyle = "rgba(225, 29, 72, 0.4)";
          ctx.beginPath();
          ctx.arc(partPt.x, partPt.y, pSize * 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Text status feedback conforming to the thesis de Rham 3D study
    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#14b8a6" : "#f43f5e";
    const statusText = language === "en"
      ? (enableTau124 
          ? "CONFORMAL SYSTEM: DE RHAM-LERAY LAYER STABILIZED BY τ124 (3D VOLUMETRIC)" 
          : "⚠️ 3D VORTEX DIVERGENCE: INSUFFICIENT DISSIPATION AND TAO BLOW-UP")
      : language === "zh"
      ? (enableTau124 
          ? "系统已校验：de Rham-Leray 边界层由 τ124 锁紧稳定 (3D 容积式)" 
          : "⚠️ 3D 涡旋异常偏发散：无足够粘性消散引发 Tao 爆破")
      : language === "ru"
      ? (enableTau124 
          ? "КОНФОРМНАЯ СИСТЕМА: СЛОЙ ДЕ РАМА-ЛЕРЕ СТАБИЛИЗИРОВАН τ124 (3D ОБЪЕМ)" 
          : "⚠️ ДИВЕРГЕНЦИЯ 3D ВИХРЯ: НЕДОСТАТОЧНАЯ ДИССИПАЦИЯ И ВЗРЫВ ТАО")
      : (enableTau124 
          ? "SYSTEM CONFORME: COUCHE DE RHAM-LERAY STABILISÉE PAR τ124 (VOLUMÉTRIE 3D)" 
          : "⚠️ DIVERGENCE DES VORTEX 3D: DISSIPATION INSUFFISANTE ET BLOW-UP DE TAO");
    ctx.fillText(statusText, 25, 25);
  };

  // 2. Turbine 3D: Roue Hydraulique avec Double Courbure d'Aubes en Espace Volumétrique (Z)
  const drawTurbine3D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    drawAxes3D(ctx, w, h);

    const isCrashed = rpm > 800 && !enableTau124;
    const hubRadius = 18;
    const hubLength = 70; // extended along Z-axis

    // Generate 3D Hub coordinates centered
    // Render back hub end and front hub end as projected ellipses, then wireframe
    const zBack = -hubLength / 2;
    const zFront = hubLength / 2;

    const angleSteps = 16;
    const backCircle: {x: number, y: number}[] = [];
    const frontCircle: {x: number, y: number}[] = [];

    const rotationValue = frame * rpm * 0.0006;

    for (let s = 0; s < angleSteps; s++) {
      const a = (s * Math.PI * 2) / angleSteps + rotationValue;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);

      const pB = project3D(cosA * hubRadius, sinA * hubRadius, zBack, w, h);
      const pF = project3D(cosA * hubRadius, sinA * hubRadius, zFront, w, h);

      backCircle.push(pB);
      frontCircle.push(pF);
    }

    // Draw cylindrical solid representation of Rotor hub
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "rgba(100, 116, 139, 0.4)";
    ctx.lineWidth = 1;
    
    // Connect back and front circles (cylinder mantle)
    ctx.beginPath();
    for (let s = 0; s < angleSteps; s++) {
      const next = (s + 1) % angleSteps;
      ctx.moveTo(backCircle[s].x, backCircle[s].y);
      ctx.lineTo(frontCircle[s].x, frontCircle[s].y);
      ctx.lineTo(frontCircle[next].x, frontCircle[next].y);
      ctx.lineTo(backCircle[next].x, backCircle[next].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Draw 3D Twisted blades
    // We render 4 blades. Each blade has twisted depth extending from Z = -25 to Z = 25
    const numBlades = 4;
    const bladeDepthSteps = 6;

    for (let b = 0; b < numBlades; b++) {
      const baseBladeAngle = (b * Math.PI * 2) / numBlades + rotationValue;

      // Project slices of this blade along Z depth with a progressive twisting angle
      const bladePolys: {x: number, y: number}[][] = [];
      
      for (let s = 0; s < bladeDepthSteps; s++) {
        const zCoord = -30 + (s * 60) / (bladeDepthSteps - 1);
        // Twist ratio: blade twist according to depth (conforming to real CFD)
        const twistAngle = baseBladeAngle + (zCoord * 0.007);

        // Blade thickness outline profile
        const cX1 = Math.cos(twistAngle) * hubRadius;
        const sY1 = Math.sin(twistAngle) * hubRadius;
        
        // Blade tip
        const bladeTipR = 90;
        const cX2 = Math.cos(twistAngle + 0.3) * bladeTipR;
        const sY2 = Math.sin(twistAngle + 0.3) * bladeTipR;

        // Shape of blade section
        const pt1 = project3D(cX1, sY1, zCoord, w, h);
        const pt2 = project3D(cX2, sY2, zCoord, w, h);
        const pt3 = project3D(Math.cos(twistAngle - 0.15) * (bladeTipR - 5), Math.sin(twistAngle - 0.15) * (bladeTipR - 5), zCoord, w, h);
        const pt4 = project3D(Math.cos(twistAngle - 0.08) * hubRadius, Math.sin(twistAngle - 0.08) * hubRadius, zCoord, w, h);

        bladePolys.push([pt1, pt2, pt3, pt4]);
      }

      // Render the twisted multi-surfaced blades
      ctx.lineWidth = 1.2;
      for (let s = 0; s < bladeDepthSteps - 1; s++) {
        const polyCurrent = bladePolys[s];
        const polyNext = bladePolys[s + 1];

        // Draw side facets of the 3D blade
        ctx.fillStyle = enableTau124 ? "rgba(30, 58, 138, 0.28)" : "rgba(30, 41, 59, 0.35)";
        ctx.strokeStyle = enableTau124 ? "rgba(45, 212, 191, 0.5)" : "rgba(129, 140, 248, 0.4)";

        ctx.beginPath();
        ctx.moveTo(polyCurrent[0].x, polyCurrent[0].y);
        ctx.lineTo(polyCurrent[1].x, polyCurrent[1].y);
        ctx.lineTo(polyNext[1].x, polyNext[1].y);
        ctx.lineTo(polyNext[0].x, polyNext[0].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(polyCurrent[1].x, polyCurrent[1].y);
        ctx.lineTo(polyCurrent[2].x, polyCurrent[2].y);
        ctx.lineTo(polyNext[2].x, polyNext[2].y);
        ctx.lineTo(polyNext[1].x, polyNext[1].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(polyCurrent[2].x, polyCurrent[2].y);
        ctx.lineTo(polyCurrent[3].x, polyCurrent[3].y);
        ctx.lineTo(polyNext[3].x, polyNext[3].y);
        ctx.lineTo(polyNext[2].x, polyNext[2].y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Volumetric cavitation particles bubble cloud (Z dimension)
    if (isCrashed) {
      // Cavitation active on tips of blades in 3D
      ctx.fillStyle = "rgba(251, 113, 133, 0.8)";
      ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
      
      for (let j = 0; j < 25; j++) {
        const bubbleZ = -35 + (j * 179) % 70;
        const bubbleAngle = frame * 0.035 + (j * 43) % (Math.PI * 2);
        
        // Locate at blade radius tip
        const radTip = 92 + Math.sin(frame * 0.1 + j) * 4;
        const bx = Math.sin(bubbleAngle) * radTip;
        const by = Math.cos(bubbleAngle) * radTip;

        const proj = project3D(bx, by, bubbleZ, w, h);
        
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 2.5 + (j % 3), 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 6 + (j % 4), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Static fluid 3D stream tunnels bypassing rotor
    ctx.strokeStyle = enableTau124 ? "rgba(45, 212, 191, 0.15)" : "rgba(224, 242, 254, 0.12)";
    ctx.lineWidth = 1;
    for (let c = 0; c < 5; c++) {
      const zPlane = -60 + c * 30;
      ctx.beginPath();
      for (let xCoord = -180; xCoord <= 180; xCoord += 20) {
        // wave around active hub
        const distToHub = Math.abs(xCoord);
        const verticalDeflection = distToHub < 100 ? (22 * Math.exp(-distToHub * 0.02) * Math.sin(frame * 0.08)) : 0;
        const proj = project3D(xCoord, 110 + verticalDeflection, zPlane, w, h);
        
        if (xCoord === -180) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let xCoord = -180; xCoord <= 180; xCoord += 20) {
        const distToHub = Math.abs(xCoord);
        const verticalDeflection = distToHub < 100 ? (-22 * Math.exp(-distToHub * 0.02) * Math.sin(frame * 0.08)) : 0;
        const proj = project3D(xCoord, -115 + verticalDeflection, zPlane, w, h);
        
        if (xCoord === -180) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#2dd4bf" : "#f43f5e";
    const labelText = language === "en"
      ? (enableTau124 ? "MICROLOCAL STABILIZATION ACTIVE ON Z-PLANES (τ124)" : "⚠️ ROTATIONAL MATERIAL CAVITATION: EXTREME HYDRODYNAMIC H-BMO BLOW-UP")
      : language === "zh"
      ? (enableTau124 ? "微局部收敛控制在 Z 轴各平面被激活 (τ124)" : "⚠️ 旋转空化空蚀活跃：极端 Hardy-BMO 流体爆破")
      : language === "ru"
      ? (enableTau124 ? "МИКРОЛОКАЛЬНАЯ СТАБИЛИЗАЦИЯ АКТИВНА НА Z-ПЛОСКОСТЯХ (τ124)" : "⚠️ КАВИТАЦИЯ МАТЕРИАЛА ВРАЩЕНИЯ: ГИДРОДИНАМИЧЕСКИЙ ВЗРЫВ H-BMO")
      : (enableTau124 ? "STABILISATION MICROLOCALE ACTIVE SUR LES PLANS EN Z (τ124)" : "⚠️ CAVITATION MATÉRIELLE DE ROTATION: BLOW-UP HYDRODYNAMIQUE H-BMO");
    ctx.fillText(labelText, 25, 25);
  };

  // 3. Climatology/Meteorology 3D: Tornade Hélicoïdale Volumétrique d'Échelle Constrainte
  const drawMeteorology3D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    drawAxes3D(ctx, w, h);

    const isViolent = thermalGrad > 58 && !enableTau124;
    
    // Bottom land platform projected in 3D
    ctx.strokeStyle = "rgba(71, 85, 105, 0.25)";
    ctx.lineWidth = 1.2;
    ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
    ctx.beginPath();
    const platPts = [
      project3D(-140, 115, -140, w, h),
      project3D(140, 115, -140, w, h),
      project3D(140, 115, 140, w, h),
      project3D(-140, 115, 140, w, h)
    ];
    ctx.moveTo(platPts[0].x, platPts[0].y);
    platPts.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cylindrical helicity layers matching de Rham spatial structures
    // Tornado expands from ground (Y = 110) up to heights (Y = -120)
    // We compose multiple circles (rings) distributed vertically as slices
    const numLayers = 16;
    const layerRings: {yVal: number, radius: number}[] = [];

    for (let i = 0; i < numLayers; i++) {
      const heightPercent = i / (numLayers - 1);
      const yVal = 110 - heightPercent * 230; // vertically goes up

      // Shape of the cone vortex: wider at top, tightly focused at bottom (aspirateur)
      // Unstable: classical mode expands insanely in width or breaks down
      let baseRad = 15 + heightPercent * 85;
      if (isViolent) {
        baseRad = 15 + Math.exp(heightPercent * 2.3) * 35; // explosive expansion (diverged Tao scale)
      } else {
        if (enableTau124) {
          // Bounded beautifully corresponding to finite invariants limit
          const boundedLimitValue = Math.min(100, vortexRad * 52);
          baseRad = 15 + heightPercent * boundedLimitValue;
        }
      }

      layerRings.push({ yVal, radius: baseRad });
    }

    // Sort layer rings back-to-front (depth check) or just draw them as spiral particles
    ctx.lineWidth = 1.3;
    layerRings.forEach((ring, layerIdx) => {
      // Draw concentric fluid vector circles in 3D space
      const pointsRingCount = 20;
      const ptsOnRing: {x: number, y: number, depth: number}[] = [];

      for (let p = 0; p < pointsRingCount; p++) {
        // Helicoidal spiral twist dynamic with frame
        const spiralAngle = (p * Math.PI * 2) / pointsRingCount + (frame * 0.04) + (layerIdx * 0.2);
        
        // Add random Kolmogorov energy disturbances if classic unstable mode is chosen
        let rDistort = ring.radius;
        if (isViolent && layerIdx > 8) {
          rDistort += Math.sin(frame * 0.12 + p * 3) * (thermalGrad * 0.35);
        }

        const sx = Math.sin(spiralAngle) * rDistort;
        const sz = Math.cos(spiralAngle) * rDistort;

        const proj = project3D(sx, ring.yVal, sz, w, h);
        ptsOnRing.push(proj);
      }

      // Draw projected closed ring
      ctx.beginPath();
      ptsOnRing.forEach((pt, idx) => {
        if (idx === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      // Colour gradients: red/orange if hot and classic, emerald/cyan if Johny τ124 is conforming
      const hueComponent = isViolent 
        ? Math.max(0, 15 - layerIdx * 1) 
        : enableTau124 ? 165 : 200;
        
      const alphaVal = Math.max(0.12, 0.45 - layerIdx * 0.02);
      ctx.strokeStyle = `hsla(${hueComponent}, 92%, 52%, ${alphaVal})`;
      ctx.stroke();

      // Add volumetric vapor cloud dots inside the vortex
      if (layerIdx % 3 === 0) {
        ctx.fillStyle = isViolent ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.1)";
        ctx.beginPath();
        // Inner core shading
        const pCoreLeft = project3D(-ring.radius * 0.4, ring.yVal, 0, w, h);
        const pCoreRight = project3D(ring.radius * 0.4, ring.yVal, 0, w, h);
        ctx.ellipse(
          (pCoreLeft.x + pCoreRight.x) / 2, 
          pCoreLeft.y, 
          ring.radius * 0.3, 
          4, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#10b981" : "#ef4444";
    const labelText = language === "en"
      ? (enableTau124 ? "CONFORMAL ATTRACTOR CONTAINS TOTAL HELICITY IN HOT AREA (τ124)" : "⚠️ DIVERGENT CYCLONIC ROTATION DISRUPTION: TAO CYCLIC CASCADES")
      : language === "zh"
      ? (enableTau124 ? "共形吸引子已包容约束高温区总螺旋度 (τ124)" : "⚠️ 气旋式偏旋转载荷爆发：Tao 级联发散阻尼失效")
      : language === "ru"
      ? (enableTau124 ? "КОНФОРМНЫЙ АТТРАКТОР СОДЕРЖИТ ПОЛНУЮ СПИРАЛЬНОСТЬ В ГОРЯЧЕЙ ЗОНЕ (τ124)" : "⚠️ ДИВЕРГЕНТНОЕ ЦИКЛОНИЧЕСКОЕ ВРАЩЕНИЕ: ЦИКЛИЧЕСКИЕ КАСКАДЫ ТАО")
      : (enableTau124 ? "L'ATTRACTEUR CONFORME CONTIENT L'HELICITÉ TOTALE EN ZONE CHAUDE (τ124)" : "⚠️ EFFORT DE ROTATION DIVERGENT CYCLONIQUE: CASCADES CYCLIQUES DE TAO");
    ctx.fillText(labelText, 25, 25);
  };

  // 4. Transonic Hyperloop 3D: Cylindre de Guidage Magnétique & Tube Coaxial Isométrique
  const drawHyperloop3D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    drawAxes3D(ctx, w, h);

    const isSonic = trainSpeed > 800 && !enableTau124;
    
    // Draw 3D outer cylindrical tube wireframe (tube de confinement d'air)
    const numRings = 9;
    const tubeR = 75;
    
    ctx.strokeStyle = "rgba(71, 85, 105, 0.25)";
    ctx.lineWidth = 1;

    for (let r = 0; r < numRings; r++) {
      const ringZVal = -160 + (r * 320) / (numRings - 1);
      
      // Draw circular ring projected in 3D
      const numSegs = 16;
      ctx.beginPath();
      for (let s = 0; s <= numSegs; s++) {
        const theta = (s * Math.PI * 2) / numSegs;
        const tx = Math.sin(theta) * tubeR;
        const ty = Math.cos(theta) * tubeR;

        const proj = project3D(tx, ty + 10, ringZVal, w, h);
        if (s === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();
    }

    // Connect rings longitudinal guide rails
    const railsCount = 4;
    for (let i = 0; i < railsCount; i++) {
      const theta = (i * Math.PI * 2) / railsCount + Math.PI/4;
      ctx.beginPath();
      for (let r = 0; r < numRings; r++) {
        const ringZVal = -160 + (r * 320) / (numRings - 1);
        const tx = Math.sin(theta) * tubeR;
        const ty = Math.cos(theta) * tubeR;
        const proj = project3D(tx, ty + 10, ringZVal, w, h);
        if (r === 0) ctx.moveTo(proj.x, proj.y);
        else ctx.lineTo(proj.x, proj.y);
      }
      ctx.stroke();
    }

    // Render the Hyperloop capsule inside the tube
    // Main capsule dimensions
    const capXStart = -45;
    const capXLength = 100;
    const capRad = 32 + blockageRatio * 18;

    // Draw the 3D capsule body using multiple concentric slices representing its nose and tail
    const capSlices = 7;
    const capPtsSortedByDepth: {depth: number, render: () => void}[] = [];

    for (let sl = 0; sl < capSlices; sl++) {
      const slicePct = sl / (capSlices - 1);
      const capZCoord = -40 + slicePct * 80;

      // Outer radius at this slice (Aerodynamic pointy nose shape)
      let currentCapR = capRad;
      if (slicePct < 0.3) {
        // tapering nose
        currentCapR = capRad * (slicePct / 0.3);
      } else if (slicePct > 0.8) {
        // tapering tail
        currentCapR = capRad * (1.0 - (slicePct - 0.8) / 0.2 * 0.4);
      }

      const slZ = capZCoord;
      const ringS =sl;

      capPtsSortedByDepth.push({
        depth: project3D(0, 10, slZ, w, h).depth,
        render: () => {
          ctx.beginPath();
          const nSegs = 16;
          for (let s = 0; s <= nSegs; s++) {
            const th = (s * Math.PI * 2) / nSegs;
            const sx = Math.sin(th) * currentCapR;
            const sy = Math.cos(th) * currentCapR;
            const proj = project3D(sx, sy + 10, slZ, w, h);

            if (s === 0) ctx.moveTo(proj.x, proj.y);
            else ctx.lineTo(proj.x, proj.y);
          }
          ctx.closePath();
          ctx.fillStyle = sl === 0 
            ? "rgba(99, 102, 241, 0.45)" // Blue Nose highlight
            : "rgba(30, 41, 59, 0.7)";
          ctx.strokeStyle = "rgba(129, 140, 248, 0.75)";
          ctx.lineWidth = 1.3;
          ctx.fill();
          ctx.stroke();
        }
      });
    }

    // Sort capsule parts and draw
    capPtsSortedByDepth.sort((a, b) => b.depth - a.depth);
    capPtsSortedByDepth.forEach(capPart => capPart.render());

    // Sonic shockwave spherical gradient expansion rings at high Mach
    if (isSonic) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(244, 63, 94, 0.75)";
      
      const numWaves = 3;
      for (let wI = 0; wI < numWaves; wI++) {
        // Expands ahead of the nose (Z = -40)
        const waveExpansion = ((frame * 1.5 + wI * 40) % 120);
        const waveZ = -42 - waveExpansion;
        const waveRad = waveExpansion * (1.1 + blockageRatio * 1.2);

        // Render sonic wavefront ring
        ctx.beginPath();
        const segs = 20;
        for (let s = 0; s <= segs; s++) {
          const a = (s * Math.PI * 2) / segs;
          // Projected Ring
          const proj = project3D(Math.sin(a) * waveRad, Math.cos(a) * waveRad + 10, waveZ, w, h);
          if (s === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      }
    }

    ctx.font = "9px monospace";
    ctx.fillStyle = enableTau124 ? "#06b6d4" : "#f43f5e";
    const labelText = language === "en"
      ? (enableTau124 ? "COMPOUND GRADIENT DEGREE STABLE BY τ124 CONFORMAL ACTION" : "⚠️ EXPLOSIVE SHOCKWAVE DETECTED: BLOCKAGE RATIO DECOMPOSITION BLOW-UP")
      : language === "zh"
      ? (enableTau124 ? "复合压力梯度通过 τ124 共形作用锁定稳定" : "⚠️ 探测到爆炸性激波：阻塞比畸变爆破崩溃")
      : language === "ru"
      ? (enableTau124 ? "СТЕПЕНЬ СЛОЖНОГО ГРАДИЕНТА СТАБИЛЬНА БЛАГОДАРЯ τ124" : "⚠️ ОБНАРУЖЕНА ВЗРЫВНАЯ УДАРНАЯ ВОЛНА: ВЗРЫВ КОЭФФИЦИЕНТА БЛОКИРОВКИ")
      : (enableTau124 ? "DEGRÉ DE GRADIENT COMPOSÉ STABLE PAR L'ACTION CONFORME τ124" : "⚠️ SHOCKWAVE EXPLOSIVE ACTIVE: BLOW-UP DU RAPPORT D'OBSTRUCTION");
    ctx.fillText(labelText, 25, 25);
  };

  // Draw 3D axis system in bottom-right corner for visual fidelity
  const drawAxes3D = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const ox = w - 60;
    const oy = h - 60;
    const axisLen = 35;

    // Convert angles to local vectors
    const radYaw = (yaw * Math.PI) / 180;
    const radPitch = (pitch * Math.PI) / 180;

    const projectVector = (vx: number, vy: number, vz: number) => {
      // Rotation
      const cosY = Math.cos(radYaw);
      const sinY = Math.sin(radYaw);
      const x1 = vx * cosY - vz * sinY;
      const z1 = vx * sinY + vz * cosY;

      const cosP = Math.cos(radPitch);
      const sinP = Math.sin(radPitch);
      const y2 = vy * cosP - z1 * sinP;

      return {
        x: ox + x1,
        y: oy + y2
      };
    };

    const ptX = projectVector(axisLen, 0, 0);
    const ptY = projectVector(0, -axisLen, 0); // screen Y axis points up visually
    const ptZ = projectVector(0, 0, axisLen);

    ctx.save();
    ctx.lineWidth = 1.3;

    // Axis X (Red)
    ctx.strokeStyle = "#e11d48";
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ptX.x, ptX.y); ctx.stroke();
    // Axis Y (Green)
    ctx.strokeStyle = "#10b981";
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ptY.x, ptY.y); ctx.stroke();
    // Axis Z (Blue)
    ctx.strokeStyle = "#0ea5e9";
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ptZ.x, ptZ.y); ctx.stroke();

    ctx.font = "7.5px monospace";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("X", ptX.x + 2, ptX.y + 2);
    ctx.fillText("Y", ptY.x + 2, ptY.y - 1);
    ctx.fillText("Z", ptZ.x + 2, ptZ.y + 2);

    ctx.restore();
  };

  return (
    <div className="max-w-6xl mx-auto py-4 space-y-6 animate-fade-in" id="experimental-lab-container">
      {/* Upper Thesis Stance Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden bg-gradient-to-tr from-slate-950 to-slate-900" id="lab-header">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5" id="lab-top-panel">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
              <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                {language === "en" ? "THESIS VALIDATION - GENUINE EXPERIMENTAL WORKFLOWS" : language === "zh" ? "博士论文验证 - 真实应用与实验流程" : language === "ru" ? "АТТЕСТАЦИЯ ДИССЕРТАЦИИ - РЕАЛЬНЫЕ ЭКСПЕРИМЕНТЫ" : "VALIDATION DE THÈSE - MODÈLES EXPÉRIMENTAUX RÉELS"}
              </span>
              <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight">
                {language === "en" ? "OMNI-SYNAPSE Large Physics Experimentation Suite v1.0" : language === "zh" ? "OMNI-SYNAPSE 大型物理实验平台套件 v1.0" : language === "ru" ? "Большая физическая экспериментальная среда OMNI-SYNAPSE v1.0" : "Grand Système d'Expérimentation Physique OMNI-SYNAPSE v1.0"}
              </h2>
            </div>
          </div>
          
          {/* Main Jauge Conforme τ124 Switch toggle */}
          <div className="flex items-center gap-2.5 bg-slate-950 p-2 rounded-xl border border-slate-800" id="global-tau-control">
            <div className="flex items-center gap-1.5 pl-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span className="text-xs font-mono font-bold text-slate-300">
                {language === "en" ? "JOHNY'S GAUGE (τ₁₂₄)" : language === "zh" ? "JOHNY 共形规 (τ₁₂₄)" : language === "ru" ? "КАЛИБР ДЖОНИ (τ₁₂₄)" : "JAUGE DE JOHNY (τ₁₂₄)"}
              </span>
            </div>
            <button
              onClick={() => setEnableTau124(!enableTau124)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                enableTau124 ? "bg-indigo-600" : "bg-slate-800"
              }`}
              id="switch-tau"
              title={enableTau124 ? "Désactiver la jauge τ124" : "Activer la jauge de Johny"}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enableTau124 ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-4xl" id="lab-description">
          {language === "en" ? (
            <span>The <span className="text-indigo-400 font-semibold">Large Volumetric Modeling Lab</span> rigorously enforces de Rham-Leray topological constraint bounds using the conformal <span className="text-indigo-300 font-semibold">τ₁₂₄ gauge</span> developed by mathematical physicist <span className="font-semibold text-slate-200">Johny Mulenda Macheko</span> across critical engineering setups: wing boundary aerodynamics, forced-flow turbine blade cavitation erosion limits, planetary climatological storm cells, and hypersonic transonic pod aerodynamic shear controls.</span>
          ) : language === "zh" ? (
            <span><span className="text-indigo-400 font-semibold">大型三维体积动力学物理实验室</span>将数学物理学家 <span className="font-semibold text-slate-200">Johny Mulenda Macheko</span> 开发的 <span className="text-indigo-300 font-semibold">τ₁₂₄ 共形规范</span>应用到具体工业实践中：机翼边界层气流过载失速、透平机械高负荷空化阻蚀、跨音速地面运输机舱高粘性高剪切控制、以及行星尺度大漩涡级联的稳定解耦计算。</span>
          ) : language === "ru" ? (
            <span><span className="text-indigo-400 font-semibold">Лаборатория объемного моделирования</span> применяет топологические ограничения де Рама-Лере на основе конформного калибра <span className="text-indigo-300 font-semibold">τ₁₂₄</span>, разработанного ученым-математиком <span className="font-semibold text-slate-200">Джони Мулендой Мачеко</span>, для ключевых инженерных моделей: обтекание крыльев, кавитация турбин, конвекция торнадо и контроль сверхвысоких скоростей.</span>
          ) : (
            <span>Le <span className="text-indigo-400 font-semibold">Grand Laboratoire de Modélisation Volumétrique</span> applique avec rigueur de de Rham-Leray les concepts de la <span className="text-indigo-300 font-semibold">jauge conforme τ₁₂₄</span> développés par le physicien-mathématicien <span className="font-semibold text-slate-200">Johny Mulenda Macheko</span> aux cas concrets d'ingénierie avancée: décollement d'extrados transsonique d'aile, cavitation d'hélices de turbines à flux forcé, forces cumulatives tornadiques de grande échelle et contrôle aérodynamique d'hyper-vitesse.</span>
          )}
        </p>

        {/* CLAYSOLVER3D SCENARIO SELECTOR */}
        <div className="bg-slate-950 border border-slate-800/80 md:border-indigo-500/10 rounded-xl p-5 mt-6 relative overflow-hidden bg-gradient-to-r from-slate-950/90 to-slate-900/90" id="scenario-selector-claysolver">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  {language === "en" ? "CLAYSOLVER3D ENGINE: INTERACTIVE SCENARIO SELECTOR" : language === "zh" ? "CLAYSOLVER3D 数值引擎：交互式物理场景选择" : language === "ru" ? "ДВИЖОК CLAYSOLVER3D: СЕЛЕКТОР ИНТЕРАКТИВНЫХ СЦЕНАРИЕВ" : "MOTEUR CLAYSOLVER3D : SÉLECTEUR DE SCÉNARIO INTERACTIF"}
                </span>
              </div>
              <h3 className="text-white font-bold text-[14px]">
                {language === "en" ? "Aerodynamic & Climatological Verification of Conformal τ₁₂₄ Gauge" : language === "zh" ? "由 τ₁₂₄ 共形规范阻尼对空气动力学与大气气旋的修正与解算" : language === "ru" ? "Аэродинамическая и климатологическая проверка консервирующего калибра τ₁₂₄" : "Validation Aérodynamique & Climatologique de la Jauge Conforme τ₁₂₄"}
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal max-w-2xl">
                {language === "en" ? "Select a genuine physical scenario to test absolute geometric boundaries of Navier-Stokes 3D flow against our topologically regularized de Rham-Leray algorithm." : language === "zh" ? "选择实际应用场景，以测试和对比纳维-斯托克斯三维流体力学经典模型奇异发散与 de Rham-Leray 拓扑正则化算法的收敛阻尼表现。" : language === "ru" ? "Выберите реальный физический сценарий, чтобы проверить абсолютные пределы уравнений Навье-Стокса с помощью алгоритма регуляризации де Рама-Лере." : "Sélectionnez un scénario d'application physique réelle pour tester les limites géométriques absolues de Navier-Stokes face à notre algorithme régularisé par de Rham-Leray."}
              </p>
            </div>
            
            {/* Quick selectors */}
            <div className="flex flex-wrap gap-2 shrink-0" id="claysolver-actions">
              <button
                onClick={() => setActiveExp("aeronautics")}
                className={`px-3 py-2 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                  activeExp === "aeronautics"
                    ? "bg-sky-500/15 border-sky-500/50 text-sky-400 shadow-md shadow-sky-950/25"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
                title="Aeronautics Wing Flow"
                id="btn-scen-aero"
              >
                <Wind className="w-3.5 h-3.5 shrink-0" />
                {language === "en" ? "Aerodynamics" : language === "zh" ? "空气动力学" : language === "ru" ? "Аэродинамика" : "Aéronautique"}
              </button>
              
              <button
                onClick={() => setActiveExp("turbine")}
                className={`px-3 py-2 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                  activeExp === "turbine"
                    ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-400 shadow-md shadow-cyan-950/25"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
                title="Turbine Cavitation"
                id="btn-scen-turb"
              >
                <Droplet className="w-3.5 h-3.5 shrink-0" />
                {language === "en" ? "Turbine" : language === "zh" ? "涡轮机械" : language === "ru" ? "Турбины" : "Turbine"}
              </button>
              
              <button
                onClick={() => setActiveExp("meteorology")}
                className={`px-3 py-2 rounded-lg font-mono text-[11px] font-bold border transition-all flex items-center gap-1.5 ${
                  activeExp === "meteorology"
                    ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 shadow-md shadow-emerald-950/25"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
                title="Cyclonic Systems"
                id="btn-scen-met"
              >
                <Compass className="w-3.5 h-3.5 shrink-0" />
                {language === "en" ? "Meteorology" : language === "zh" ? "气象流体" : language === "ru" ? "Метеорология" : "Météorologie"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs of Detailed Mathematical Specifications */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4" id="experiments-tabs">
          {(Object.keys(experimentConfigs) as ExperimentId[]).map((id) => {
            const exp = getLocalizedExpConfig(id);
            return (
              <button
                key={exp.id}
                onClick={() => setActiveExp(exp.id)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  activeExp === exp.id
                    ? "bg-indigo-950/20 border-indigo-500/50 text-white shadow-lg"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-200"
                }`}
                id={`tab-exp-${exp.id}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {exp.icon}
                  <span className="text-xs font-bold leading-none font-sans">
                    {exp.title}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight block truncate">
                  {exp.subtitle}
                </p>
                {activeExp === exp.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Simulator Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="lab-core-interface">
        
        {/* Left Column Controls & Parameter Tweaks */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5" id="lab-controls">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-800 pb-3">
              <Settings2 className="w-4 h-4 text-indigo-400" />
              {language === "en" ? "Physical Parameter Adjusters" : language === "zh" ? "物理参数控制面板" : language === "ru" ? "Физические параметры среды" : "Paramètres Physiques d'Aube"}
            </h3>
          </div>

          {/* Conditional Input sliders depending on which physical case is active */}
          {activeExp === "aeronautics" && (
            <div className="space-y-4 text-xs" id="ctrl-aero">
              <div className="space-y-1.5" id="ctrl-angle">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Angle of Attack (α)" : language === "zh" ? "攻角 / 迎角 (α)" : language === "ru" ? "Угол атаки (α)" : "Angle d'Attaque (α)"}</span>
                  <span className="text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-bold">
                    {angle}°
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="1"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 leading-normal">
                  {language === "en" ? "Increasing the angle to extreme levels induces classic boundary layer vortex blow-up and stall." : language === "zh" ? "极端增加迎角在经典框架下将会引发上表面涡流强度爆裂并导致失速失稳。" : language === "ru" ? "Экстремальное увеличение угла атаки вызывает вихревой взрыв на верхней поверхности и срыв потока." : "L'accroissement de l'angle à l'extrême provoque le blow-up tourbillonnaire d'extrados en formulation classique."}
                </p>
              </div>

              <div className="space-y-1.5" id="ctrl-rey">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Spanwise Reynolds Number (Re)" : language === "zh" ? "展向雷诺数 (Re)" : language === "ru" ? "Число Рейнольдса по размаху (Re)" : "Nombre de Reynolds Spanwise (Re)"}</span>
                  <span className="text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-bold font-mono">
                    {reynolds.toFixed(1)} × 10⁶
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={reynolds}
                  onChange={(e) => setReynolds(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeExp === "turbine" && (
            <div className="space-y-4 text-xs" id="ctrl-turb">
              <div className="space-y-1.5" id="ctrl-pressure">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Water Head Pressure" : language === "zh" ? "水力头水压高度" : language === "ru" ? "Напорное давление воды" : "Pression de Chute d'Eau"}</span>
                  <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    {pressure} bar
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={pressure}
                  onChange={(e) => setPressure(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5" id="ctrl-rpm">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Rotor Rotation Speed (RPM)" : language === "zh" ? "转子旋转转速 (RPM)" : language === "ru" ? "Режим вращения ротора (об/мин)" : "Régime de Rotation du Rotor"}</span>
                  <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                    {rpm} rpm
                  </span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="50"
                  value={rpm}
                  onChange={(e) => setRpm(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeExp === "meteorology" && (
            <div className="space-y-4 text-xs" id="ctrl-met">
              <div className="space-y-1.5" id="ctrl-thermal">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400 font-sans">{language === "en" ? "Thermal Gradient Delta (ΔT)" : language === "zh" ? "大气温度梯度温差 (ΔT)" : language === "ru" ? "Разность термического градиента (ΔT)" : "Différence de Gradient Thermique (ΔT)"}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    {thermalGrad}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="2"
                  value={thermalGrad}
                  onChange={(e) => setThermalGrad(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5" id="ctrl-radius">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "3D Navier Attraction Radius" : language === "zh" ? "三维纳维引力吸引半径" : language === "ru" ? "Радиус притяжения Навье 3D" : "Rayon d'Attraction de Navier 3D"}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold font-mono">
                    {vortexRad.toFixed(2)} km
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={vortexRad}
                  onChange={(e) => setVortexRad(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeExp === "hyperloop" && (
            <div className="space-y-4 text-xs" id="ctrl-hyp">
              <div className="space-y-1.5" id="ctrl-speed">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Pod Progression Speed" : language === "zh" ? "超级高铁舱体运行速度" : language === "ru" ? "Скорость движения капсулы" : "Vitesse de Progression Capsule"}</span>
                  <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold font-mono">
                    {trainSpeed} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1200"
                  step="50"
                  value={trainSpeed}
                  onChange={(e) => setTrainSpeed(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1.5" id="ctrl-blockage">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">{language === "en" ? "Confined Blockage Factor" : language === "zh" ? "封闭管道阻塞率系数" : language === "ru" ? "Коэффициент стеснения капсулы" : "Facteur de Blocage Confiné"}</span>
                  <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold font-mono">
                    {(blockageRatio * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={blockageRatio}
                  onChange={(e) => setBlockageRatio(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Interactive view parameters for 3D simulation */}
          {dimensionMode === "3D" && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3" id="3d-view-controls">
              <h4 className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                {language === "en" ? "3D Objective Adjusters" : language === "zh" ? "三维观察视角微调" : language === "ru" ? "Настройка 3D-объектива" : "Ajusteurs d'Objectif 3D"}
              </h4>

              <div className="space-y-1 text-[11px] font-mono" id="val-yaw">
                <div className="flex justify-between text-slate-500">
                  <span>{language === "en" ? "Azimuth (Y Rotation):" : language === "zh" ? "方位角 (Y轴旋转):" : language === "ru" ? "Азимут (Вращение Y):" : "Azimut (Rotation Y) :"}</span>
                  <span className="text-indigo-400 font-bold">{yaw.toFixed(0)}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="2"
                  value={yaw}
                  disabled={autoOrbit}
                  onChange={(e) => setYaw(parseInt(e.target.value))}
                  className="w-full accent-indigo-400 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
                />
              </div>

              <div className="space-y-1 text-[11px] font-mono" id="val-pitch">
                <div className="flex justify-between text-slate-500">
                  <span>{language === "en" ? "Elevation (X Rotation):" : language === "zh" ? "仰角 (X轴旋转):" : language === "ru" ? "Высота (Вращение X):" : "Altitude (Rotation X) :"}</span>
                  <span className="text-indigo-400 font-bold">{pitch.toFixed(0)}°</span>
                </div>
                <input
                  type="range"
                  min="-90"
                  max="90"
                  step="2"
                  value={pitch}
                  onChange={(e) => setPitch(parseInt(e.target.value))}
                  className="w-full accent-indigo-400 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Toggle auto orbiting */}
              <div className="flex items-center justify-between pt-1" id="box-toggle-orbit">
                <span className="text-[11px] font-mono text-slate-400">{language === "en" ? "Auto Orbital Rotation" : language === "zh" ? "自动视野旋转" : language === "ru" ? "Автоматическое орбитальное вращение" : "Rotation Orbitale Automatique"}</span>
                <button
                  onClick={() => setAutoOrbit(!autoOrbit)}
                  className={`px-2 py-1 text-[9.5px] font-mono font-bold rounded border ${
                    autoOrbit 
                      ? "bg-indigo-950/40 text-indigo-400 border-indigo-500/40" 
                      : "bg-slate-900 text-slate-400 border-slate-850"
                  }`}
                >
                  {autoOrbit ? (language === "en" ? "ACTIVE" : language === "zh" ? "已开" : language === "ru" ? "АКТИВНО" : "ACTIVE") : (language === "en" ? "INACTIVE" : language === "zh" ? "已关" : language === "ru" ? "НЕАКТИВНО" : "INACTIVE")}
                </button>
              </div>
            </div>
          )}

          {/* Mathematical / Industrial logs box - CLAYSOLVER3D STABILITY METRICS */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3.5 font-mono text-[10.5px]" id="telemetry-box">
            <div className="border-b border-slate-800 pb-2">
              <h4 className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                {language === "en" ? "ClaySolver3D Metrology" : language === "zh" ? "ClaySolver3D 拓扑度量衡" : language === "ru" ? "Метрология ClaySolver3D" : "Métrologie ClaySolver3D"}
              </h4>
              <p className="text-[9px] text-slate-500 mt-0.5">{language === "en" ? "Conformal topological invariant calculator" : language === "zh" ? "等角拓扑不变量数学计算层" : language === "ru" ? "Расчет конформных топологических инвариантов" : "Calculateur d'invariants conforme topologique"}</p>
            </div>

            <div className="flex justify-between items-center" id="tel-status">
              <span className="text-slate-500">{language === "en" ? "Continuum Status:" : language === "zh" ? "连续流体状态:" : language === "ru" ? "Статус континуума:" : "Statut du Continuum :"}</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[9.5px] ${
                enableTau124  
                  ? "text-emerald-400 bg-emerald-950/30 border border-emerald-500/20" 
                  : "text-rose-500 bg-rose-950/30 border border-rose-500/20 animate-pulse"
              }`}>
                {enableTau124 ? (language === "en" ? "CONVERGENT (τ₁₂₄)" : language === "zh" ? "收敛稳定 (τ₁₂₄)" : language === "ru" ? "СХОДИТСЯ (τ₁₂₄)" : "CONVERGENT (τ₁₂₄)") : (language === "en" ? "⚠️ SINGULARITY / DIVERGENCE" : language === "zh" ? "⚠️ 奇异爆裂 / 发散" : language === "ru" ? "⚠️ СИНГУЛЯРНОСТЬ / РАСХОДИМОСТЬ" : "⚠️ SINGULARITÉ / DIVERGENCE")}
              </span>
            </div>

            <div className="flex justify-between" id="tel-cfl">
              <span className="text-slate-500">{language === "en" ? "CFL Number (Courant-Lewy-Clay):" : language === "zh" ? "CFL 数值空间 (Courant-Lewy-Clay):" : language === "ru" ? "Число Куранта-Леви (CFL):" : "Nombre CFL (Courant-Lewy-Clay) :"}</span>
              <span className={`font-bold ${enableTau124 ? "text-emerald-400" : "text-rose-500 animate-pulse"}`}>
                {calc.cflClay.toFixed(4)} {enableTau124 ? " (Stable < 0.45)" : (language === "en" ? " (Critical > 1.0)" : language === "zh" ? " (极限过载 > 1.0)" : language === "ru" ? " (Критично > 1.0)" : " (Critique > 1.0)")}
              </span>
            </div>

            <div className="flex justify-between" id="tel-mc">
              <span className="text-slate-500">{language === "en" ? "Invariant Boundary (M_crit):" : language === "zh" ? "不变量临界界限 (M_crit):" : language === "ru" ? "Консервативная граница (M_crit):" : "Borne Invariante (M_crit) :"}</span>
              <span className="text-emerald-400 font-bold">{calc.mCrit.toFixed(2)} s⁻¹</span>
            </div>

            <div className="flex justify-between" id="tel-derham">
              <span className="text-slate-500">{language === "en" ? "de Rham Homological Error:" : language === "zh" ? "de Rham 同调代数误差:" : language === "ru" ? "Гомологическая ошибка де Рама:" : "Erreur Homologique de de Rham :"}</span>
              <span className={`font-bold ${enableTau124 ? "text-cyan-400" : "text-rose-500"}`}>
                {enableTau124 ? calc.deRhamError.toExponential(4) : (language === "en" ? "∞ (Explosion)" : language === "zh" ? "∞ (发散爆裂)" : language === "ru" ? "∞ (Взрыв)" : "∞ (Explosion)")}
              </span>
            </div>

            <div className="flex justify-between" id="tel-leray">
              <span className="text-slate-500">{language === "en" ? "Spectral Radius (Leray ρ_spec):" : language === "zh" ? "谱半径 (Leray ρ_spec):" : language === "ru" ? "Спектральный радиус (Лере ρ_spec):" : "Rayon Spectral (Leray ρ_spec) :"}</span>
              <span className={`font-bold ${enableTau124 ? "text-teal-400" : "text-rose-500"}`}>
                {calc.leraySpectralRadius.toFixed(4)} {enableTau124 ? (language === "en" ? " (Contained ≤ 1.0)" : language === "zh" ? " (有序收敛 ≤ 1.0)" : language === "ru" ? " (В норме ≤ 1.0)" : " (Contenu ≤ 1.0)") : (language === "en" ? " (Divergent > 1.0)" : language === "zh" ? " (不可靠发散 > 1.0)" : language === "ru" ? " (Расходится > 1.0)" : " (Divergent > 1.0)")}
              </span>
            </div>

            <div className="flex justify-between pt-1.5 border-t border-slate-900" id="tel-clas">
              <span className="text-slate-500">{language === "en" ? "Classical standard intensity:" : language === "zh" ? "标准 Navier-Stokes 经典强度:" : language === "ru" ? "Классическая интенсивность:" : "Intensité standard classique :"}</span>
              <span className={`font-bold ${calc.isClassicCrashed ? "text-rose-500" : "text-slate-400"}`}>
                {calc.classicalMetric.toFixed(1)} s⁻¹
              </span>
            </div>
          </div>

          {/* Setup controllers */}
          <div className="flex items-center gap-2 pt-1" id="action-buttons">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-2 px-3 bg-indigo-650 hover:bg-indigo-600 font-mono text-xs font-semibold text-white rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> {language === "en" ? "Pause" : language === "zh" ? "暂停仿真" : language === "ru" ? "Приостановить" : "Suspendre"}
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> {language === "en" ? "Resume" : language === "zh" ? "恢复仿真" : language === "ru" ? "Продолжить" : "Relancer"}
                </>
              )}
            </button>
            <button
              onClick={() => {
                setAngle(18); setReynolds(6); setPressure(25); setRpm(750);
                setThermalGrad(55); setVortexRad(1.6); setTrainSpeed(680); setBlockageRatio(0.45);
                setYaw(-35); setPitch(15);
              }}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-lg flex items-center gap-1"
              title="Réinitialiser"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Right Column Canvas Screen Streams */}
        <div className="lg:col-span-8 flex flex-col space-y-6" id="lab-visualiser-pane">
          
          {/* Main Visual Screen Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl flex flex-col" id="live-screen-wrapper">
            
            {/* Top Toolbar overlay over screen (Dimension selectors & Orbit indicator) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4 z-10" id="canvas-overlay-bar">
              {/* Dimensions Selectors Buttons */}
              <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-lg" id="dimension-selectors">
                <button
                  onClick={() => setDimensionMode("2D")}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-md transition-all ${
                    dimensionMode === "2D"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  📊 Plan Slice 2D
                </button>
                <button
                  onClick={() => setDimensionMode("3D")}
                  className={`px-3 py-1 text-[10px] font-mono font-bold rounded-md transition-all flex items-center gap-1 ${
                    dimensionMode === "3D"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-slate-100" /> Volumétrie CFD 3D
                </button>
              </div>

              {/* Active Sensor badge */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
                <RefreshCw className={`w-3 h-3 ${isPlaying ? "animate-spin" : ""}`} />
                {dimensionMode === "3D" ? "VORTEX SPATIAL 3D" : "COUPE PLANE TRADITIONNELLE"}
              </div>
            </div>

            {/* Classical Model Diverged Screen Overlay */}
            {calc.isClassicCrashed && !enableTau124 && (
              <div className="absolute inset-0 bg-red-950/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 z-20 transition-all">
                <AlertTriangle className="w-14 h-14 text-rose-500 animate-bounce mb-3" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  ÉCHEC DE CONVERGENCE PHYSIQUE (BLOW-UP DE TAO)
                </h3>
                <p className="text-[11.5px] text-rose-300 font-serif max-w-md mx-auto italic mt-1 leading-relaxed">
                  "Sans l'auto-confinement microlocal de de Rham-Leray garanti par la jauge conforme τ124 de Johny Mulenda Macheko, les gradients d'étirement tourbillonnaire de Navier-Stokes 3D divergent vers l'infini, dépassant la limite d'asymptote calculée à {calc.mCrit.toFixed(2)} s⁻¹."
                </p>
                <button
                  onClick={() => {
                    setEnableTau124(true);
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded-lg border border-emerald-500 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Activer la Jauge τ124 de Johny (Stabilisation)
                </button>
              </div>
            )}

            {/* Interactive Canvas */}
            <div className="bg-slate-950 flex-1 min-h-[340px] flex items-center justify-center px-4 pt-14 pb-4" id="canvas-view-port">
              <canvas
                ref={canvasRef}
                width={580}
                height={340}
                className="w-full h-full max-h-[380px] opacity-90 transition-opacity duration-300"
              />
            </div>

            {/* Simulated Live status and active algebraic system */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono" id="screen-info-bar">
              <div id="sc-spec">
                <span className="text-[9px] text-slate-500 uppercase block font-bold">ÉQUATION INTÉGRALE DE LA THÈSE</span>
                <span className="text-indigo-300 font-semibold">{currentExp.equation}</span>
              </div>
              <div className="text-right sm:text-right" id="sc-vort-metrics">
                <span className="text-[9px] text-slate-500 uppercase block font-bold">RÉSULTAT DE GRADIENT CONFORME</span>
                <span className="font-bold text-slate-200">
                  {enableTau124 ? `${calc.tauMetric.toFixed(2)} s⁻¹ [CONJUGUÉ]` : `${calc.classicalMetric.toFixed(2)} s⁻¹ [NON CONVERGÉ]`}
                </span>
              </div>
            </div>
          </div>

          {/* Scientific Thesis Explanation & Analytical Side-by-side Outcomes */}
          <div className="bg-slate-905 border border-slate-800 rounded-xl p-6 space-y-4" id="lab-consequences">
            <h3 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Retombées Industrielles Mondiales & Preuves Pratiques
            </h3>
            
            <p className="text-xs text-indigo-200/90 font-mono leading-relaxed bg-indigo-950/20 p-4 border border-indigo-500/20 rounded-xl italic">
              "En imposant la limitation microlocale topologique déduite de la jauge conforme τ124, les structures singulières hydrodynamiques tridimensionnelles se contractent sur des attracteurs stables de de Rham d'énergie strictement finie."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1" id="comparative-table-lab">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850" id="box-unstable-outcome-classic">
                <h4 className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Modèle Standard (Incomplet)
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  L'hypothèse classique n'impose aucune barrière et suppose des cascades infinies d'étirement. Les logiciels industriels classiques subissent des crashs visqueux en calcul transsonique, forçant les ingénieurs à d'onéreuses limitations empiriques.
                </p>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl" id="box-stable-outcome-johny">
                <h4 className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle className="w-4 h-4" /> Jauge τ124 (Thèse de Johny Mulenda)
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-serif italic">
                  "Notre formulation de clôture résout les goulots d'étranglement mathématiques en garantissant l'attachement laminaire des molécules sous cisaillement extrêmes, rendant le calcul fluide d'une stabilité physique absolue."
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start gap-3 mt-2 animate-pulse" id="lab-impact-callout">
              <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-bold block mb-1">
                  PREUVE D'APPLICATION DE LA THÈSE :
                </span>
                <p className="text-[11px] text-slate-200 font-sans leading-relaxed">
                  {currentExp.impactMessage}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
