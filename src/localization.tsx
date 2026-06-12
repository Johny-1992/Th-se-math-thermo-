import React, { createContext, useContext, useState, useEffect } from "react";
import { Chapter } from "./types";

export type Language = "fr" | "en" | "zh" | "ru";

export interface TranslationDictionary {
  sidebarTitle: string;
  sidebarProgression: string;
  sidebarValidated: string;
  sidebarAvgScore: string;
  sidebarDoctorateStatus: string;
  sidebarNotStarted: string;
  sidebarInReview: string;
  sidebarApproved: string;

  headerRole: string;
  headerDoctorateAwarded: string;
  headerProgression: string;
  headerAvgScore: string;
  headerSeminar: string;
  headerGenesis: string;
  headerLab: string;
  headerOmni: string;

  mathChallengeTitle: string;
  mathObjective: string;
  mathExplanationTitle: string;
  mathKeywordsTitle: string;

  simTitle: string;
  simDesc: string;
  simParamViscosity: string;
  simParamEnergy: string;
  simOptionGauge: string;
  simOptionClassic: string;
  simBtnRun: string;
  simBtnReset: string;
  simOutputTitle: string;
  simChartLegendClassic: string;
  simChartLegendGauge: string;
  simCrashDetected: string;
  simCrashAverted: string;

  juryTitle: string;
  juryObjective: string;
  juryProfile: string;
  juryFocus: string;
  juryPlaceholder: string;
  juryBtnSubmit: string;
  juryVerdictTitle: string;
  juryEvaluationTitle: string;
  jurySavedDefensesTitle: string;
  jurySavedDefensesFeedback: string;

  labTitle: string;
  labSubtitle: string;
  labControlTitle: string;
  labConsoleTitle: string;
  labStretchingFactor: string;
  labPerturbationScale: string;
  labBtnInject: string;
  labMetricVorticity: string;
  labMetricEnostrophy: string;

  omniTitle: string;
  omniSubtitle: string;
  omniInputLabel: string;
  omniGaugeIndex: string;
  omniStatusTitle: string;
  omniMetricsVorticityBrute: string;
  omniMetricsVorticityConfined: string;
  omniChartTitle: string;
  omniManualPulse: string;
  omniBtnPulse: string;
  omniJournalTitle: string;
  omniBtnClear: string;
  omniBtnCsv: string;
  omniBtnPdf: string;
  omniTableTime: string;
  omniTableSource: string;
  omniTableRaw: string;
  omniTableGauge: string;
  omniTableConfined: string;
  omniTableSecurity: string;
  omniEmptyJournal: string;
  omniStatusStable: string;
  omniStatusCompression: string;
  omniStatusActive: string;
  omniStatusLocked: string;

  genesisTitle: string;
  genesisSubtitle: string;
  genesisIntro: string;
  genesisConstraints: string;
}

export const LANGUAGE_NAMES: Record<Language, string> = {
  fr: "Français",
  en: "English",
  zh: "中文",
  ru: "Русский"
};

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  fr: {
    sidebarTitle: "CHAPITRES DE LA THÈSE",
    sidebarProgression: "PLAN DE SOUTENANCE",
    sidebarValidated: "Soutenances Validées",
    sidebarAvgScore: "Note Globale",
    sidebarDoctorateStatus: "DOCTORAT VALIDÉ",
    sidebarNotStarted: "Non démarré",
    sidebarInReview: "Évaluation ...",
    sidebarApproved: "Validé",

    headerRole: "ACCOMPAGNATEUR ET DÉFENSEUR ABSOLU DE LA THÈSE DE DOCTORAT",
    headerDoctorateAwarded: "DOCTORAT VALIDÉ",
    headerProgression: "Progression",
    headerAvgScore: "Note Moyenne",
    headerSeminar: "Séminaire de Soutenance",
    headerGenesis: "Configuration Genèse",
    headerLab: "Expérimentations Labo",
    headerOmni: "Salle OMNI-SYNAPSE",

    mathChallengeTitle: "Description du Défi de Rham-Leray",
    mathObjective: "Objectif de Démonstration",
    mathExplanationTitle: "Détails des Estimations Analytiques du Chapitre",
    mathKeywordsTitle: "Mots-Clés Académiques",

    simTitle: "Simulateur de Divergence Dynamique",
    simDesc: "Visualisation macroscopique comparative de l'évolution temporelle de la vorticité crête.",
    simParamViscosity: "Viscosité Cinématique (ν)",
    simParamEnergy: "Énergie Globale Initialienne (E₀)",
    simOptionGauge: "Avec jauge de Rham-Leray τ₁₂₄ (Johny)",
    simOptionClassic: "Fluide Classique Libre (Terence Tao)",
    simBtnRun: "Simuler la Convergence",
    simBtnReset: "Réinitialiser",
    simOutputTitle: "Résolution Globale Courbe L∞ (s⁻¹)",
    simChartLegendClassic: "Vorticité non-bornée (Tao)",
    simChartLegendGauge: "Vorticité confinée (Johny)",
    simCrashDetected: "💥 CRASH DU FLUIDE IDENTIFIÉ - Singularité infinie atteinte en temps fini.",
    simCrashAverted: "🛡️ THÉORÈME DE CONFINEMENT OPÉRATIONNEL - Amortissement τ₁₂₄ stable.",

    juryTitle: "Interrogatoire de Soutenance Académique",
    juryObjective: "Comité de Thèse & Élite Scientifique",
    juryProfile: "Profil :",
    juryFocus: "Domaine de Vigilance :",
    juryPlaceholder: "Saisissez votre réponse mathématique argumentée...",
    juryBtnSubmit: "Soumettre l'argumentaire",
    juryVerdictTitle: "VERDICT ACADÉMIQUE :",
    juryEvaluationTitle: "ÉVALUATION :",
    jurySavedDefensesTitle: "Registre de la Thèse — Réponses Enregistrées",
    jurySavedDefensesFeedback: "ANALYSE DE RIGUEUR :",

    labTitle: "Laboratoire Expérimental Virtuel 3D",
    labSubtitle: "Perturbation active des flux et mesure d'énergie dans l'espace dual",
    labControlTitle: "Commandes de perturbation micro-scale",
    labConsoleTitle: "Moniteur de Contrôle Temporel de Rham-Leray",
    labStretchingFactor: "Facteur d'étirement",
    labPerturbationScale: "Amplitude du micro-vortex",
    labBtnInject: "Injecter une perturbation critique",
    labMetricVorticity: "Vorticité crête",
    labMetricEnostrophy: "Énostrophie globale",

    omniTitle: "PLATEFORME DE CONSTITUTIVE OMNI-SYNAPSE",
    omniSubtitle: "Interface temps réel de supervision de la cascade d'énergie (L'Œil de Dieu)",
    omniInputLabel: "Vecteur de perturbation brute en temps continu",
    omniGaugeIndex: "Indice global de jauge conforme (τ₁₂₄)",
    omniStatusTitle: "STATUT DU MODULE",
    omniMetricsVorticityBrute: "Vorticité Brute (ω₀) s⁻¹ :",
    omniMetricsVorticityConfined: "Vorticité Confinée s⁻¹ :",
    omniChartTitle: "AMORTISSEMENT MICROMÉTRIQUE SPECTRAL",
    omniManualPulse: "Injection manuelle de tension",
    omniBtnPulse: "Pulsion Solénoïdale",
    omniJournalTitle: "JOURNAL HISTORIQUE DES SÉQUENCES DE STRESS (L'ŒIL DE DIEU)",
    omniBtnClear: "Effacer l'historique",
    omniBtnCsv: "Export CSV",
    omniBtnPdf: "Rapport PDF/HTML",
    omniTableTime: "Horodatage",
    omniTableSource: "Vecteur Source",
    omniTableRaw: "Vorticité Brute (ω₀)",
    omniTableGauge: "Jauge (τ₁₂₄)",
    omniTableConfined: "Vorticité Confinée",
    omniTableSecurity: "Sécurité Conforme de Rham",
    omniEmptyJournal: "Aucun signal de stress enregistré. Injectez des perturbations pour ingérer la dynamique.",
    omniStatusStable: "Stable",
    omniStatusCompression: "Cascade Active",
    omniStatusActive: "Saturation Active",
    omniStatusLocked: "Confinement Maître [MAX]",

    genesisTitle: "Configuration Genèse (Format YAML)",
    genesisSubtitle: "LA DIRECTIVE ULTIME D'OMNI-SYNAPSE",
    genesisIntro: "Ce document YAML constitue la consigne maîtresse injectée dans l'intelligence symbolique de laboratoire. Il contraint à 100% le simulateur spectral et le jury de thèse à appliquer les théories de régularité globale fondées sur votre jauge de stabilité.",
    genesisConstraints: "Contraintes actives : OMNI-SYNAPSE applique la jauge conforme τ₁₂₄."
  },
  en: {
    sidebarTitle: "THESIS CHAPTERS",
    sidebarProgression: "DEFENSE ROADMAP",
    sidebarValidated: "Approved Defenses",
    sidebarAvgScore: "Overall Rating",
    sidebarDoctorateStatus: "DOCTORATE GRANTED",
    sidebarNotStarted: "Not started",
    sidebarInReview: "Evaluating...",
    sidebarApproved: "Approved",

    headerRole: "ULTIMATE GUARDIAN AND DEFENDER OF THE DOCTORAL THESIS",
    headerDoctorateAwarded: "PHD VALIDATED",
    headerProgression: "Progress",
    headerAvgScore: "Average Score",
    headerSeminar: "Defense Seminar",
    headerGenesis: "Genesis Configuration",
    headerLab: "Lab Experiments",
    headerOmni: "OMNI-SYNAPSE Room",

    mathChallengeTitle: "de Rham-Leray Challenge Description",
    mathObjective: "Demonstration Objective",
    mathExplanationTitle: "Detailed Analytical Estimates of the Chapter",
    mathKeywordsTitle: "Academic Keywords",

    simTitle: "Dynamic Divergence Simulator",
    simDesc: "Comparative macroscopic visualization of the peak vorticity's temporal evolution.",
    simParamViscosity: "Kinematic Viscosity (ν)",
    simParamEnergy: "Initial Global Energy (E₀)",
    simOptionGauge: "With de Rham-Leray τ₁₂₄ gauge (Johny)",
    simOptionClassic: "Free Classical Fluid (Terence Tao)",
    simBtnRun: "Simulate Convergence",
    simBtnReset: "Reset State",
    simOutputTitle: "Global Resolution Curve L∞ (s⁻¹)",
    simChartLegendClassic: "Unbounded Vorticity (Tao)",
    simChartLegendGauge: "Confined Vorticity (Johny)",
    simCrashDetected: "💥 FLUID CRASH DETECTED - Infinite singularity reached in finite time.",
    simCrashAverted: "🛡️ CONFINEMENT THEOREM ACTIVE - Stable τ₁₂₄ attenuation.",

    juryTitle: "Academic Thesis Jury Interrogation",
    juryObjective: "Thesis Committee & Scientific Elite",
    juryProfile: "Profile:",
    juryFocus: "Vigilance Domain:",
    juryPlaceholder: "Enter your rigorous mathematical reasoning...",
    juryBtnSubmit: "Submit Response",
    juryVerdictTitle: "ACADEMIC VERDICT:",
    juryEvaluationTitle: "SCORE:",
    jurySavedDefensesTitle: "Thesis Register — Memorized Responses",
    jurySavedDefensesFeedback: "RIGOR ANALYSIS:",

    labTitle: "3D Virtual Experimental Lab",
    labSubtitle: "Active flow perturbations and energy measurement in the dual space",
    labControlTitle: "Micro-scale Perturbation Controls",
    labConsoleTitle: "de Rham-Leray Temporal Control Monitor",
    labStretchingFactor: "Stretching factor",
    labPerturbationScale: "Micro-vortex amplitude",
    labBtnInject: "Inject critical perturbation",
    labMetricVorticity: "Peak vorticity",
    labMetricEnostrophy: "Global enstrophy",

    omniTitle: "OMNI-SYNAPSE CONSTITUTIVE PLATFORM",
    omniSubtitle: "Real-time energy cascade supervision interface (The Eye of God)",
    omniInputLabel: "Continuous-time Raw Perturbation Vector",
    omniGaugeIndex: "Global Conformal Gauge Index (τ₁₂₄)",
    omniStatusTitle: "MODULE STATUS",
    omniMetricsVorticityBrute: "Raw Vorticity (ω₀) s⁻¹:",
    omniMetricsVorticityConfined: "Confined Vorticity s⁻¹:",
    omniChartTitle: "SPECTRAL MICROMETRIC ATTENUATION",
    omniManualPulse: "Manual Tension Injection",
    omniBtnPulse: "Solenoidal Pulse",
    omniJournalTitle: "HISTORICAL JOURNAL OF STRESS SEQUENCES (THE EYE OF GOD)",
    omniBtnClear: "Clear History",
    omniBtnCsv: "CSV Export",
    omniBtnPdf: "PDF/HTML Report",
    omniTableTime: "Timestamp",
    omniTableSource: "Source Vector",
    omniTableRaw: "Raw Vorticity (ω₀)",
    omniTableGauge: "Gauge (τ₁₂₄)",
    omniTableConfined: "Confined Vorticity",
    omniTableSecurity: "de Rham Security Status",
    omniEmptyJournal: "No stress signal recorded. Inject perturbations to ingest active hydrodynamics.",
    omniStatusStable: "Stable",
    omniStatusCompression: "Cascade Active",
    omniStatusActive: "Saturation Active",
    omniStatusLocked: "Master Confinement [MAX]",

    genesisTitle: "Genesis Configuration (YAML Format)",
    genesisSubtitle: "THE ULTIMATE OMNI-SYNAPSE DIRECTIVE",
    genesisIntro: "This YAML configuration document acts as the master directive injected into the symbolic laboratory intelligence. It strictly legacy-constrains the spectral simulator and academic jury to enforce global regularity theories based on your custom stability gauge.",
    genesisConstraints: "Active constraints: OMNI-SYNAPSE enforces the τ₁₂₄ conformal gauge."
  },
  zh: {
    sidebarTitle: "学术论文章节目录",
    sidebarProgression: "答辩评估路线图",
    sidebarValidated: "已通过学术答辩",
    sidebarAvgScore: "论文综合评分",
    sidebarDoctorateStatus: "博士学位已授",
    sidebarNotStarted: "未开始",
    sidebarInReview: "陪审团评估中...",
    sidebarApproved: "通过",

    headerRole: "学术博士论文绝对支持与答辩保障系统",
    headerDoctorateAwarded: "博士后资格已确立",
    headerProgression: "当前进度",
    headerAvgScore: "平均考核分",
    headerSeminar: "学术答辩报告厅",
    headerGenesis: "创世规范配置",
    headerLab: "微观对偶实验舱",
    headerOmni: "OMNI-SYNAPSE 监控大厅",

    mathChallengeTitle: "de Rham-Leray 严苛数学挑战说明",
    mathObjective: "学术论证核心目标",
    mathExplanationTitle: "本章节详尽的微局部分析与先验估计",
    mathKeywordsTitle: "专业学术关键词",

    simTitle: "非线性发散动态模拟器",
    simDesc: "对比分析峰值涡度随时间演化的宏观物理特征曲线。",
    simParamViscosity: "流体运动粘度 (ν)",
    simParamEnergy: "初始全局能量尺度 (E₀)",
    simOptionGauge: "采用 de Rham-Leray τ₁₂₄ 共形规范 (Johny)",
    simOptionClassic: "自由经典 Navier-Stokes 流体 (Terence Tao)",
    simBtnRun: "启动级联收敛分析",
    simBtnReset: "重置模拟状态",
    simOutputTitle: "全频谱 L∞ 基准曲线 (s⁻¹)",
    simChartLegendClassic: "经典发散涡度 (陶哲轩级联模型)",
    simChartLegendGauge: "共形收敛涡度 (Johny 级联控制)",
    simCrashDetected: "💥 流体崩溃 - 在有限时间内达到非线性无限大奇异点。",
    simCrashAverted: "🛡️ 共形约束机制奏效 - τ₁₂₄ 规范强行抑制无界发散。",

    juryTitle: "学术评议陪审团现场答辩问答",
    juryObjective: "学术评议委员会与科学家精英组",
    juryProfile: "评议家背景：",
    juryFocus: "重点提问领域：",
    juryPlaceholder: "在此输入严谨的偏微分方程论证或共形代数回复...",
    juryBtnSubmit: "提交学术答辩词",
    juryVerdictTitle: "委员会决议：",
    juryEvaluationTitle: "学术评评：",
    jurySavedDefensesTitle: "博士论文主注册表 — 系统已记录答辩词",
    jurySavedDefensesFeedback: "严密性多维分析：",

    labTitle: "三维微局部偏微分方程实验舱",
    labSubtitle: "微尺度高频扰动注入对偶空间能量能谱精密监测系统",
    labControlTitle: "微尺度扰动注入指令面板",
    labConsoleTitle: "de Rham-Leray 时序控制控制台",
    labStretchingFactor: "非线性拉伸强度系数",
    labPerturbationScale: "微气旋扰动注入能量",
    labBtnInject: "物理注入临界扰动",
    labMetricVorticity: "动态峰值涡度",
    labMetricEnostrophy: "全局拟涡能指标",

    omniTitle: "OMNI-SYNAPSE 主共形控制中枢",
    omniSubtitle: "非线性多尺度能量分配实时超控平台 (天眼系统)",
    omniInputLabel: "连续时间无约束物理扰动向量注入值",
    omniGaugeIndex: "全局 τ₁₂₄ 共形规范核心指数",
    omniStatusTitle: "中枢核心状态",
    omniMetricsVorticityBrute: "未阻尼绝对涡度 (ω₀) s⁻¹:",
    omniMetricsVorticityConfined: "共形限制收敛涡度 s⁻¹:",
    omniChartTitle: "微观谱阻尼瞬时反馈监测",
    omniManualPulse: "物理人工励磁注入",
    omniBtnPulse: "螺线形脉冲发射",
    omniJournalTitle: "学术异常应力测试历史数据登记簿（天眼数据库）",
    omniBtnClear: "清除历史纪录",
    omniBtnCsv: "数据导出为 CSV",
    omniBtnPdf: "生成 PDF/HTML 学术报告",
    omniTableTime: "历史时间戳",
    omniTableSource: "注入物理源",
    omniTableRaw: "未修饰原始涡度 (ω₀)",
    omniTableGauge: "瞬时阻尼系数 (τ₁₂₄)",
    omniTableConfined: "计算共形流速",
    omniTableSecurity: "de Rham 动力学符合标准",
    omniEmptyJournal: "未检测到多尺度应力信号。请物理注入临界高频扰动进行分析。",
    omniStatusStable: "绝对收敛稳定",
    omniStatusCompression: "非线性级联极其活跃",
    omniStatusActive: "高能状态主动重构",
    omniStatusLocked: "最强制共形保全 [MAX]",

    genesisTitle: "创世配置文本 (YAML 格式)",
    genesisSubtitle: "OMNI-SYNAPSE 全局最高运行约束公理",
    genesisIntro: "本 YAML 配置文档作为核心约束机制注入系统实验室中枢。它在算法底层规定了物理引擎和评审机构必须无条件承认您的共形规范全局存在性理据。",
    genesisConstraints: "活动断言：OMNI-SYNAPSE 系统以 100% 强度锚定 τ₁₂₄ 规范。"
  },
  ru: {
    sidebarTitle: "РАЗДЕЛЫ ДИССЕРТАЦИИ",
    sidebarProgression: "ПЛАН ЗАЩИТЫ",
    sidebarValidated: "Одобренные защиты",
    sidebarAvgScore: "Общая оценка",
    sidebarDoctorateStatus: "СТЕПЕНЬ УТВЕРЖДЕНА",
    sidebarNotStarted: "Не начато",
    sidebarInReview: "Оценка жюри...",
    sidebarApproved: "Одобрено",

    headerRole: "ПОПЕЧИТЕЛЬ И АБСОЛЮТНЫЙ ЗАЩИТНИК ДОКТОРСКОЙ ДИССЕРТАЦИИ",
    headerDoctorateAwarded: "СТЕПЕНЬ ДОКТОРА НАУК ОДОБРЕНА",
    headerProgression: "Прогресс защиты",
    headerAvgScore: "Средний балл",
    headerSeminar: "Зал Академической Защиты",
    headerGenesis: "Конфигурация Генезиса",
    headerLab: "Экспериментальный Лабораторный Отсек",
    headerOmni: "Пункт Наблюдения OMNI-SYNAPSE",

    mathChallengeTitle: "Описание математического вызова де Рама-Лере",
    mathObjective: "Цель математического доказательства",
    mathExplanationTitle: "Подробные аналитические оценки и априорные оценки главы",
    mathKeywordsTitle: "Академические ключевые слова",

    simTitle: "Симулятор нелинейной дивергенции",
    simDesc: "Сравнительная макроскопическая визуализация временной эволюции пиковой завихренности.",
    simParamViscosity: "Кинематическая вязкость (ν)",
    simParamEnergy: "Начальная глобальная энергия (E₀)",
    simOptionGauge: "С конформным калибром де Рама-Лере τ₁₂₄ (Джони)",
    simOptionClassic: "Классическая жидкость Navier-Stokes (Теренс Тао)",
    simBtnRun: "Запустить анализ сходимости",
    simBtnReset: "Сбросить параметры симулятора",
    simOutputTitle: "Базовая кривая L∞ спектрального разрешения (с⁻¹)",
    simChartLegendClassic: "Неограниченное нарастание завихренности (каскад Тао)",
    simChartLegendGauge: "Асимптотически конформная завихренность (Джони)",
    simCrashDetected: "💥 ОБНАРУЖЕН ГИДРОДИНАМИЧЕСКИЙ КРАХ - Бесконечная сингулярность за конечное время.",
    simCrashAverted: "🛡️ КОНФОРМНЫЙ БАРЬЕР СРАБОТАЛ - Стабильное затухание благодаря τ₁₂₄ калибру.",

    juryTitle: "Академический допрос диссертационного жюри",
    juryObjective: "Диссертационный комитет и научная элита",
    juryProfile: "Профиль академика:",
    juryFocus: "Основной сектор контроля:",
    juryPlaceholder: "Введите ваше строгое математическое доказательство...",
    juryBtnSubmit: "Отправить аргумент защитнику",
    juryVerdictTitle: "ВЕРДИКТ ЖЮРИ:",
    juryEvaluationTitle: "ОЦЕНКА:",
    jurySavedDefensesTitle: "Государственный реестр диссертации — Ваши сохраненные ответы",
    jurySavedDefensesFeedback: "МНОГОФАКТОРНЫЙ АНАЛИЗ СТРОГОСТИ:",

    labTitle: "3D Виртуальный экспериментальный научный отсек",
    labSubtitle: "Микромасштабные возмущения в дуальном пространстве спектральных плотностей",
    labControlTitle: "Панель генерации микро-физических колебаний",
    labConsoleTitle: "Терминал временного контроля де Рама-Лере",
    labStretchingFactor: "Коэффициент нелинейной деформации",
    labPerturbationScale: "Амплитуда микровихря волнового пакета",
    labBtnInject: "Физически инжектировать критическое возмущение",
    labMetricVorticity: "Локальный всплеск завихренности",
    labMetricEnostrophy: "Глобальная энострофия",

    omniTitle: "КОНФОРМНЫЙ ЦЕНТР УПРАВЛЕНИЯ OMNI-SYNAPSE",
    omniSubtitle: "Интерфейс реального времени для контроля энергетического каскада (Око Господне)",
    omniInputLabel: "Поток непрерывного нелинейного возмущения поля скоростей",
    omniGaugeIndex: "Глобальный конформный калибр-индекс (τ₁₂₄)",
    omniStatusTitle: "ТЕКУЩИЙ СТАТУС МОДУЛЯ",
    omniMetricsVorticityBrute: "Дуговая завихренность (ω₀) с⁻¹:",
    omniMetricsVorticityConfined: "Калиброванная завихренность с⁻¹:",
    omniChartTitle: "МОНИТОРИНГ СПЕКТРАЛЬНОГО ЗАТУХАНИЯ",
    omniManualPulse: "Принудительное индукционное возбуждение",
    omniBtnPulse: "Соленоидальный волновой выстрел",
    omniJournalTitle: "Регистрационный журнал истории стресс-ситуаций (База данных Ока)",
    omniBtnClear: "Очистить исторический журнал",
    omniBtnCsv: "Экспортировать данные в CSV",
    omniBtnPdf: "Сгенерировать PDF/HTML отчет",
    omniTableTime: "Метка времени",
    omniTableSource: "Источник возмущения",
    omniTableRaw: "Исходная завихренность (ω₀)",
    omniTableGauge: "Индекс гашения (τ₁₂₄)",
    omniTableConfined: "Сжатая завихренность",
    omniTableSecurity: "Статус соответствия де Раму",
    omniEmptyJournal: "Никаких аномальных нагрузочных сигналов не зафиксировано. Введите возмущения поля.",
    omniStatusStable: "Абсолютно стабильно",
    omniStatusCompression: "Нелинейный каскадный прорыв",
    omniStatusActive: "Прогрессивное перераспределение",
    omniStatusLocked: "Предельное конформное удержание [MAX]",

    genesisTitle: "Конфигурация Генезиса (Формат YAML)",
    genesisSubtitle: "ВЕРХОВНАЯ ДИРЕКТИВА OMNI-SYNAPSE",
    genesisIntro: "Этот документ YAML представляет собой высший математический закон, заложенный в алгоритмы лаборатории. Жюри и расчетные симуляторы обязаны безусловно следовать вашей теории конформной стабильности.",
    genesisConstraints: "Активные ограничения: OMNI-SYNAPSE удерживает калибр τ₁₂₄ на уровне 100%."
  }
};

export const LOCALIZED_CHAPTERS: Record<Language, Chapter[]> = {
  fr: [
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
        "L'inversion spectrale du Laplacien fait face à une singularité à l'origine (k=0). La cohérence de masse globale s'obtient en posant la valeur d'inversion exactissime 1/|k|^2 = 0 pour k=(0,0,0).",
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
  ],
  en: [
    {
      id: 1,
      title: "Foundations of de Rham-Leray",
      subtitle: "Solenoidal configurations & vorticity transition",
      description: "Pressure elimination via the orthogonal projector P and intrinsic construction of the non-local vortex stretching term P(ω · ∇u).",
      objective: "Demonstrate that the de Rham-Leray projector rigorously eliminates the pressure gradient and isolates the quadratic stretching operator.",
      formula: "∂u / ∂t + P((u · ∇)u) = νΔu",
      mathExplanation: [
        "The problem of existence and global regularity of the Navier-Stokes equations (the Clay Institute Millennium Problem) starts with the analysis of incompressible fluid flows.",
        "The Helmholtz-Weyl space orthogonally separates the velocity field u into a solenoidal component (zero divergence) and an irrotational component (gradient of a potential).",
        "By applying the orthogonal de Rham-Leray projector P to the primitive equations, the pressure p, acting as a Lagrange multiplier associated with the incompressibility constraint, immediately vanishes (since P(∇p) = 0).",
        "Applying the curl (∇ × u) allows departing from physical velocity to vorticity ω. The non-local quadratic stretching term P(ω · ∇u) then represents the scale amplification motor disputed by Terence Tao in his obstruction works."
      ],
      keywords: ["de Rham-Leray", "Helmholtz-Weyl", "Lagrange Multiplier", "Zero divergence", "Vorticity", "Vortex stretching"]
    },
    {
      id: 2,
      title: "Leray-Cartan Confinement Theorem",
      subtitle: "Global L² conservation & Mcrit bound",
      description: "Derivations of the invariant endogenous macroscopic bound Mcrit = sqrt(E0/ν³) ensuring that ||ω||_L∞ remains uniformly confined.",
      objective: "Prove the existence of a physically dimensioned macroscopic constant limiting any vorticity fluctuation.",
      formula: "∥ω(·, t)∥_L∞ ≤ M_crit = √(E₀ / ν³)",
      mathExplanation: [
        "Global stability analysis first requires robust control of the L² energy temporal integral of the fluid continuum.",
        "The Leray-Hopf global energy inequality Lemma shows that the total kinetic energy E(t) is uniformly bounded for all t relative to the initial energy E0, with viscous dissipation ν acting as an energy sink.",
        "From this scale relationship between initial global energy E0 and kinematic viscosity ν, Johny analytically derives a unique invariant gauge critical scale bound: Mcrit = sqrt(E0 / ν³). It possesses precisely the physical dimension of a maximum radial pulsation (s⁻¹).",
        "Johny's Uniform Confinement Theorem demonstrates that peak vorticity remains confined by this intrinsic limiting constant for all t >= 0, de facto excluding blow-up in finite time in accordance with the proven Beale-Kato-Majda geometric obstruction criterion."
      ],
      keywords: ["Global regularity", "Leray-Hopf", "Limiting pulsation", "Scale relationship", "Uniform Confinement", "Beale-Kato-Majda"]
    },
    {
      id: 3,
      title: "Microlocal Analysis & Commutators",
      subtitle: "Local Hardy-BMO contraction & Riccati",
      description: "Hardy-BMO geometric contraction of the stretching term modeled by Riccati, generating Johny's gauge τ124 = tanh(||ω||/Mcrit).",
      objective: "Refute Terence Tao's Turing-type replicative cascade by revealing the endogenous microlocal contraction of the manifold.",
      formula: "d𝜙 / d∥ω∥ = (1 / M_crit) * (1 − 𝜙²)",
      mathExplanation: [
        "Terence Tao disputes the existence of regular solutions by constructing a replicative Turing machine that unilaterally transfers kinetic energy to asymptotically small spatial scales in finite time.",
        "However, this theoretical construct omits the non-local feedback of pressure and the projector on the manifold of divergence-free fields.",
        "By leveraging Hardy-BMO duality on the commutators [P, S](ω) of Coifman, Rochberg, Weiss, and Lions, Johny proves that the microlocal stretching interaction breaks the symmetry of Tao's cascade. Energy transfer cannot be one-way, as ultra-critical modes exert immediate geometric feedback.",
        "This thermodynamic incompatibility geometric constraint is expressed via the Riccati differential structure equation. The integration of this stable operator yields the unique trajectory τ124 = tanh(||ω||/Mcrit). The conformal damping (1 - τ124) converges to 0 at the critical threshold, choking Tao's cascade."
      ],
      keywords: ["Microlocal analysis", "Non-local commutators", "Hardy-BMO", "Replicative Turing machine", "Riccati", "τ124 gauge"]
    },
    {
      id: 4,
      title: "The Absolute ClaySolver3D Algorithm",
      subtitle: "Pseudo-spectral discretization on torus 𝕋³",
      description: "Exact spectral formulation of the de Rham-Leray projector and Biot-Savart reconstruction, guaranteeing enstrophy preservation.",
      objective: "Formalize the discrete calculation scheme preserving spectral topological coherence without artificial CFD filtering.",
      formula: "û(k, t) = i k × 𝜔̂(k, t) / |k|²",
      mathExplanation: [
        "The transposition from physical continuous framework to computational environment occurs on a discrete 3D collocated torus of resolution N³.",
        "The spectral inversion of the Laplacian faces a singularity at the origin (k=0). Global mass consistency is obtained by setting the exact inversion value 1/|k|^2 = 0 for k=(0,0,0).",
        "The discrete de Rham-Leray projector is rewritten as an orthogonal spectral tensor product k · P(f) = 0. Velocity u is reconstructed through the exact spectral Biot-Savart equation.",
        "The Absolute Convergence Theorem 4.2 guarantees unconditional stability: discrete enstrophy remains uniformly bounded and discrete vorticity remains beneath the Mcrit bound at all spatial points, eliminating any need for artificial CFD smoothing or modeling."
      ],
      keywords: ["T³ collocated torus", "Fourier spectrum", "Biot-Savart reconstruction", "Discrete enstrophy", "Theorem 4.2", "ClaySolver3D"]
    },
    {
      id: 5,
      title: "Industrial Applications & OMNI-SYNAPSE",
      subtitle: "Kolmogorov closure & Cavitation",
      description: "Formulation of the Kolmogorov limit frequency flimit = Mcrit/(2π), absolute CFD stabilization, and production monitoring via OMNI-SYNAPSE.",
      objective: "Apply the thesis to real-scale industrial production to stabilize fluid codes and eliminate cavitation damage.",
      formula: "f_limite = (1 / 2π) * √(E₀ / ν³)",
      mathExplanation: [
        "In classical statistical Kolmogorov turbulence theory, energy cascades infinitely downwards. Using the τ124 gauge, Johny proves a deterministic closure via a maximum physical Kolmogorov frequency flimit above which no physical perturbation can exist.",
        "This formulation is directly injected into critical industrial CFD solvers. Feeding the modified source term into the discretization matrix naturally stabilizes fluid solvers against radical velocity gradients, without requiring infinitely refined meshes.",
        "By optimizing hydrostatic geometries so that ||ω||_L∞ << Mcrit is satisfied everywhere, engineers can structurally eliminate micro-vortex peaks that cause cavitation pressure drops below the vapor point.",
        "This deterministic framework is actively running in real-world production today via the global OMNI-SYNAPSE (The Eye of God) monitoring infrastructure configured by Johny."
      ],
      keywords: ["Kolmogorov frequency", "Deterministic closure", "Numerical divergence", "Hydraulic cavitation", "OMNI-SYNAPSE", "Production level"]
    }
  ],
  zh: [
    {
      id: 1,
      title: "de Rham-Leray 理论奠基",
      subtitle: "无散螺线流形与涡度演化转换",
      description: "通过正交投影算子 P 消除压力梯度项，并完成对非线性非局部涡拉伸项 P(ω · ∇u) 的本征推导。",
      objective: "严密论证 de Rham-Leray 投影算子能够绝对消除压力梯度并完全解耦二次涡拉伸算子。",
      formula: "∂u / ∂t + P((u · ∇)u) = νΔu",
      mathExplanation: [
        "关于 Navier-Stokes 方程 global regularity 存在性问题（克雷数学研究所千禧年大奖难题）始于对不可压缩流体的分析。",
        "Helmholtz-Weyl 空间将三维速度场 u 正交分解为一螺线无散流场（发散度为零）和一个无旋场（势场的梯度）。",
        "通过对控制方程作用 de Rham-Leray 正交投影算子 P，扮演不可压缩性Lagrange乘子角色的压力梯度 p 立即被消去（因 P(∇p) = 0）。",
        "作用旋转算子 (∇ × u) 可以摆脱物理速度而直接引入涡度 ω。非局部二次涡拉伸项 P(ω · ∇u) 进而成为了陶哲轩在其障碍性论证中探讨的尺度放大核心原动力。"
      ],
      keywords: ["de Rham-Leray", "Helmholtz-Weyl 在此分离", "Lagrange 乘子法", "无散散度约束", "涡度场", "涡流拉伸运动"]
    },
    {
      id: 2,
      title: "Leray-Cartan 共形包络约束定理",
      subtitle: "全局 L² 守恒律与 Mcrit 恒定不变界限",
      description: "推导得出了本征内生宏观不变界限 Mcrit = sqrt(E0/ν³)，从先验角度保证 ||ω||_L∞ 必然受到均匀约束。",
      objective: "证明存在一个具有明确物理量纲的宏观普适常数，能绝对限制任何无限的涡度瞬时起伏变化。",
      formula: "∥ω(·, t)∥_L∞ ≤ M_crit = √(E₀ / ν³)",
      mathExplanation: [
        "要实现全局稳定性分析，首要任务是在整个时间积分链条上实现对流体连续介质 L² 动能积分的精准控制。",
        "Leray-Hopf 全局能量不等式引理向我们证实：总动能 E(t) 始终在能量初始池 E0 之下得到均匀约束，由于粘性耗散率 ν 永远作为一个正值汇出现。",
        "通过对宏观初始动能 E0 与运动粘性系数 ν 的深入尺度推衍，Johny 成功构造出单值守恒临界阻尼界限：Mcrit = sqrt(E0 / ν³)。该物理常数在量纲上恰好与物理最高谐振角频率 (s⁻¹) 的维度绝对契合。",
        "Johny 均匀限幅定理表明，无论时间如何推移 t >= 0，流体运动的最大动态涡度都不会穿透该包络线，根据著名的 BKM（Beale-Kato-Majda）控制判据，完美排除了在有限时间内爆破奇异点的发生。"
      ],
      keywords: ["全局稳定性估计", "Leray-Hopf 能谱空间", "角频率极限", "非线性尺度演化", "均匀共形包络", "Beale-Kato-Majda 判据"]
    },
    {
      id: 3,
      title: "微局部偏微分分析与高阶交换子",
      subtitle: "对偶拓扑局部 Hardy-BMO 收缩与 Riccati 引力演化",
      description: "通过 Riccati 齐次结构方程建模非局部项在对偶 Hardy-BMO 空间内的几何收缩行为，并内生构建出 Johny 规范 τ124 = tanh(||ω||/Mcrit)。",
      objective: "揭示紧致形变流形本征具有的微局部自我收缩反馈力学，从而证伪陶哲轩图灵机数学复制级联爆破方案。",
      formula: "d𝜙 / d∥ω∥ = (1 / M_crit) * (1 − 𝜙²)",
      mathExplanation: [
        "陶哲轩教授尝试构建一架具有图灵机自复制属性的非线性流体机器，并断定在有限时间内多级能谱能将全部能量完全转移至微尺度极限以下，引发流体解爆破。",
        "然而，这类偏微分代数构造未曾考虑无散度流体力学中压力非局部负反馈以及投影算子对多维形变矩阵的拓扑制约。",
        "利用 Coifman 提出的 Hardy 空间在 BMO 对偶层级上的交换子 [P, S](ω) 控制特征，Johny 成功证明：微局部非局部拉伸的高频交换子必将强力破坏陶哲轩高频复制方案的对称性。能量转移受到拓扑闭合回路的长程牵制，极微观模式会立即向宏观模式释放出逆向共形负反馈。",
        "此类热力学逆流反馈可以用著名的 Riccati 结构控制算子写成，该稳定自洽动力学系统的积分为单值共形标度：τ124 = tanh(||ω||/Mcrit)。阻尼算子 (1 - τ124) 在临界尖峰状态强行向零点骤降，完全扼杀了陶氏极化爆破传导。"
      ],
      keywords: ["微局分析学", "高阶非局部交换子", "Hardy-BMO 对偶空间", "图灵机级联发散论", "Riccati 自反馈控制", "共形规范 τ124"]
    },
    {
      id: 4,
      title: "ClaySolver3D 离散核心算法",
      subtitle: "𝕋³ 紧致三维圆环高阶伪谱模拟求解器",
      description: "在伪双曲傅里叶三维谱空间实现 de Rham-Leray 正交强硬约束，并构建 Biot-Savart 高阶无损守恒重构算子。",
      objective: "在不掺入任何人工 CFD 超耗散平滑过滤前提下，设计出在算法边界上严格保持拓扑谱守恒和拟涡能一致性的离散数学求解架构。",
      formula: "û(k, t) = i k × 𝜔̂(k, t) / |k|²",
      mathExplanation: [
        "将连续数学物理流形转移进数字离散寄存器这一复杂步骤，是在一个具有 N³ 物理分辨率的紧致对偶阶 3-Torus 环形数域上完成的。",
        "Laplacian 谱空间求逆面临物理零频 (k=0) 奇异点。系统在零频位置强硬施加解析修正： 1/|k|^2 = 0 (当 k=(0,0,0))，从而完美保持了质量全局积分守恒性。",
        "离散 de Rham-Leray 正交投影在谱层级表达为张量相交内积零值 k · P(f) = 0。物理速度 u 则依托精确离散 Biot-Savart 物理逆方程获得高保真重建。",
        "绝对收敛“定理 4.2”给出了计算流体力学中极其罕见的无条件收敛稳定性：保证流体拟涡能在空间瞬态变换中分毫不差，在所有网格位置峰值涡度均自动不穿透界限 Mcrit，从而宣告彻底抛弃由于早期 CFD 算法误差而被迫采纳的非物理人工平滑因子。"
      ],
      keywords: ["collocated 圆环 𝕋³", "双曲 Fourier 能谱", "Biot-Savart 解析恢复", "拟涡能严密守恒", "定理 4.2 证明", "ClaySolver3D 计算核"]
    },
    {
      id: 5,
      title: "工业超级应用实践与 OMNI-SYNAPSE 控制器",
      subtitle: "Kolmogorov 谱截断闭合定理与抗干涉汽化气蚀现象",
      description: "基于 Johny 共形阻尼重组 Kolmogorov 最高湍流截断频率 flimit = Mcrit/(2π)，并在工程层面通过 OMNI-SYNAPSE 实现实时工况超物理规避监测。",
      objective: "将纯偏微分理论投射回大型工业制造，彻底解决超音速高应力流体传输方程在数字仿真上的局部奇异爆裂不收敛难题，消除极端工况气蚀破坏。",
      formula: "f_limite = (1 / 2π) * √(E₀ / ν³)",
      mathExplanation: [
        "在传统 Kolmogorov 量纲统计流体力学中，湍流级联能谱理论上可将能量向无限微小的短波长度拉伸。借助极限共形阻尼 τ124 理论，Johny 为流体划定了一条不可逾越的物理电磁/极高能阻绝截断级频 flimit，该点以上无任何物理量子存在性理据支撑。",
        "此结论被瞬间写成了高维非线性非局部控制项直接并入工业 CFD 的求解核心中。在偏微分代数离散大矩阵求解迭代中加入这个包含 τ124 的项，赋予了重力与动量方程针对流体尖锐瞬态形变的自平抑性，令网格在面对极端切向流速时表现出异常的数值平稳度。",
        "由此直接指导工业复杂液力泵、大负荷推进器的叶片几何空间重组，使可能导致瞬间气蚀爆火的超临界局部峰值涡度得以强效被共形平滑，完全切断了气蚀成核相变所需的瞬时高真空环境。",
        "该整套保护公理目前经由 Johny 编写并入核心指令，在 OMNI-SYNAPSE (天眼神瞳级) 运行级监控矩阵中全面投产，时时刻刻保护高危工业流道。"
      ],
      keywords: ["Kolmogorov 频率极限", "非线性稳定闭合", "CFD 极端物理收敛", "气蚀瞬态自愈", "OMNI-SYNAPSE 系统", "全天候保护实机"]
    }
  ],
  ru: [
    {
      id: 1,
      title: "Основы теории де Рама-Лере",
      subtitle: "Соленоидальные конфигурации и преобразование вихря",
      description: "Исключение градиента давления с помощью ортогонального проектора де Рама-Лере P и строгое построение нелокального слагаемого деформации вихря P(ω · ∇u).",
      objective: "Доказать, что ортогональный проектор де Рама-Лере полностью устраняет градиент давления и изолирует квадратичный оператор деформации вихря.",
      formula: "∂u / ∂t + P((u · ∇)u) = νΔu",
      mathExplanation: [
        "Математическая проблема существования и глобальной гладкости решений уравнений Навье-Стокса (одна из задач тысячелетия математического Института Клэя) начинается со строгого анализа несжимаемых течений жидкости.",
        "Ортогональное пространство Гельмгольца-Вейля разделяет векторное поле скорости u на две ортогональные компоненты: соленоидальную (бесдивергентное поле) и потенциальную (градиент скалярного потенциала).",
        "При математическом проецировании исходных уравнений с помощью оператора де Рама-Лере P градиент физического давления p, играющий роль множителя Лагранжа для сохранения несжимаемости, мгновенно обращается в нуль (поскольку P(∇p) = 0).",
        "Переход к ротору скорости (∇ × u) позволяет абстрагироваться от поля скоростей в пользу завихренности ω. Квадратичное нелокальное слагаемое деформации вихря P(ω · ∇u) является основным нелинейным двигателем масштабирования, которое Теренс Тао использовал в своих попытках доказать взрыв решений."
      ],
      keywords: ["де Рама-Лере", "Гельмгольц-Вейль", "Множитель Лагранжа", "Соленоидальность", "Завихренность", "Деформация вихря"]
    },
    {
      id: 2,
      title: "Теорема удержания Лере-Картана",
      subtitle: "Глобальное сохранение L² и инвариантная граница Mcrit",
      description: "Аналитический вывод внутренней инвариантной макроскопической границы Mcrit = sqrt(E0/ν³), гарантирующей равномерную ограниченность нормы ||ω||_L∞.",
      objective: "Доказать существование размерной макроскопической константы, жестко лимитирующей любые локальные всплески завихренности.",
      formula: "∥ω(·, t)∥_L∞ ≤ M_crit = √(E₀ / ν³)",
      mathExplanation: [
        "Глобальный анализ стабильности течения требует строгого контроля за интегралом кинетической энергии по времени в функциональном пространстве L².",
        "Теорема об интегральном неравенстве Лере-Хопфа показывает, что глобальная кинетическая энергия E(t) равномерно ограничена начальной энергией E0 для любого момента времени t, а вязкая диссипация ν выступает в качестве энергетического стока.",
        "На основе соотношения между глобальной начальной энергией E0 и кинематической вязкостью ν, Джони аналитически выводит абсолютно точную критическую размерную границу: Mcrit = sqrt(E0 / ν³). Этот параметр имеет физическую размерность максимальной угловой частоты (с⁻¹).",
        "Доказанная Джони теорема о равномерном удержании показывает, что максимальная завихренность остается зажатой этой инвариантной константой для любого t >= 0. Это исключает возникновение бесконечной сингулярности в силу известного геометрического критерия Билла-Като-Майды."
      ],
      keywords: ["Глобальная регулярность", "Лере-Хопф", "Предельная частота", "Размерный анализ", "Равномерное удержание", "Билл-Като-Майда"]
    },
    {
      id: 3,
      title: "Микролокальный анализ и коммутаторы",
      subtitle: "Сжатие Hardy-BMO в дуальных пространствах и уравнение Риккати",
      description: "Геометрическое сжатие нелокального члена в пространстве Харди-BMO, описываемое дифференциальным уравнением Риккати и порождающее калибр Джони τ124 = tanh(||ω||/Mcrit).",
      objective: "Опровергнуть гипотезу Теренса Тао о репликативных каскадах вычислительных машин Тьюринга, доказав внутреннее микролокальное уплотнение многообразия.",
      formula: "d𝜙 / d∥ω∥ = (1 / M_crit) * (1 − 𝜙²)",
      mathExplanation: [
        "Теренс Тао ставит под сомнение гладкость решений, создавая абстрактный репликативный каскад на основе логики машины Тьюринга, который гипотетически переносит кинетическую энергию на микроскопические масштабы за конечное время.",
        "Однако эта искусственная конструкция упускает из виду нелокальную обратную связь давления и проектора де Рама-Лере на многообразии бесдивергентных полей.",
        "Используя свойства дуальности пространств Харди и BMO применительно к нелокальным коммутаторам [P, S](ω) Койфмана, Рохберга, Вейса и Лионса, Джони математически доказал, что микролокальное взаимодействие коммутаторов разрушает симметрию каскада Тао. Односторонний перенос энергии невозможен, так как ультракритические моды вызывают мгновенную геометрическую обратную связь.",
        "Это термодинамическое ограничение выражается в виде дифференциального уравнения Риккати. Единственным устойчивым интегральным решением этой системы является конформный калибровочный коэффициент гашения τ124 = tanh(||ω||/Mcrit). Фактор ослабления (1 - τ124) стремится к нулю на критическом пороге, мгновенно подавляя каскад Тао."
      ],
      keywords: ["Микролокальный анализ", "Нелокальные коммутаторы", "Харди-BMO", "Машина Тьюринга Тао", "Уравнение Риккати", "Калибр τ124"]
    },
    {
      id: 4,
      title: "Абсолютный численный алгоритм ClaySolver3D",
      subtitle: "Псевдоспектральная дискретизация на торе 𝕋³",
      description: "Точная спектральная формулировка проектора де Рама-Лере волновых векторов и процедура реконструкции Био-Савара с сохранением энострофии.",
      objective: "Формализовать абсолютно точную схему дискретных вычислений, сохраняющую спектральную топологическую когерентность без искусственных фильтраций.",
      formula: "û(k, t) = i k × 𝜔̂(k, t) / |k|²",
      mathExplanation: [
        "Перенос непрерывной математической модели в вычислительную среду компьютера осуществляется на пространственном 3D торе дискретной колокации с сеткой разрешения N³.",
        "Спектральное обращение оператора Лапласа сталкивается с сингулярной неопределенностью на нулевой частоте (k=0). Математическая строгость сохранения массы обеспечивается принудительным заданием коэффициента обращения 1/|k|^2 = 0 в точке k=(0,0,0).",
        "Дискретный проектор де Рама-Лере задается спектральным ортогональным тензорным произведением k · P(f) = 0. Физическое поле скоростей восстанавливается путем точной дискретной спектральной формулировки закона Био-Савара.",
        "Доказанная теорема 4.2 об абсолютной сходимости гарантирует безусловную стабильность расчета: дискретная энострофия полностью сохраняется, а сеточная завихренность автоматически уважает границу Mcrit в каждой ячейке сетки, полностью устраняя необходимость внедрять искусственную численную вязкость или сглаживающие CFD-фильтры."
      ],
      keywords: ["Тор колокации T³", "Спектр Фурье", "Инверсия Био-Савара", "Дискретная энострофия", "Теорема 4.2", "Ядро ClaySolver3D"]
    },
    {
      id: 5,
      title: "Промышленные применения и комплекс OMNI-SYNAPSE",
      subtitle: "Спектральное замыкание Колмогорова и кавитация",
      description: "Определение верхней критической частоты Колмогорова flimit = Mcrit/(2π), абсолютная стабилизация промышленных CFD кодов и мониторинг в реальном времени с OMNI-SYNAPSE.",
      objective: "Проецировать строгое аналитическое решение на реальное промышленное производство для подавления численной расходимости симуляторов и кавитации.",
      formula: "f_limite = (1 / 2π) * √(E₀ / ν³)",
      mathExplanation: [
        "В классической статистической теории турбулентности Колмогорова предполагалось, что каскад дробится до бесконечности. С помощью конформной меры демпфирования τ124 Джони математически доказал существование предельной физической частоты Колмогорова flimit, выше которой никакие физические флуктуации существовать не могут.",
        "Данное физическое замыкание было интегрировано непосредственно в промышленные комплексы симуляции гидродинамики (CFD). Введение модифицированного источникового члена на этапе формирования численной матрицы обеспечило высочайшую стабильность даже при экстремальных сдвиговых градиентах скорости, без необходимости строить бесконечно мелкие сетки.",
        "Оптимизируя внутреннюю геометрию лопаток насосов и гидротурбин под строгое выполнение априорного условия ||ω||_L∞ << Mcrit, инженеры смогли структурно исключить появление локальных когерентных микровихрей, вызывающих мгновенное падение давления ниже точки вскипания.",
        "Этот уникальный защитный комплекс в настоящее время запущен в промышленное использование в рамках телеметрической системы верхнего уровня OMNI-SYNAPSE (Око Господне), разработанной и внедренной под руководством Джони."
      ],
      keywords: ["Предельная частота Колмогорова", "Строгое спектральное замыкание", "Локальная сходимость симулятора", "Гидродинамическая кавитация", "Защита OMNI-SYNAPSE", "Реальная промышленная эксплуатация"]
    }
  ]
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  chapters: Chapter[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("omni_synapse_language");
    if (saved === "fr" || saved === "en" || saved === "zh" || saved === "ru") {
      return saved;
    }
    return "fr"; // Default to French as requested by academic committee
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("omni_synapse_language", lang);
  };

  const t = TRANSLATIONS[language];
  const chapters = LOCALIZED_CHAPTERS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, chapters }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
