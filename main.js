const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const langToggle = document.querySelector(".lang-toggle");

const zhTranslations = {
  "Home": "首页",
  "About": "关于我",
  "Experience": "经历",
  "Projects": "项目",
  "Photos": "照片",
  "Skills": "技能",
  "Contact": "联系我",
  "Hello, I'm": "你好，我是",
  "Actuarial Science · University of Waterloo": "精算学 · 滑铁卢大学",
  "Get in Touch": "联系我",
  "View Experience": "查看经历",
  "Email": "邮箱",
  "Creative Work": "生活影像",
  "Life, travel, and everyday moments.": "记录生活、旅行与日常片刻。",
  "View photos →": "查看照片 →",
  "My Resume": "个人履历",
  "View experience": "查看经历",
  "Professional Work": "职业经历",
  "Fintech, marketing analytics, academic support, and finance.": "涵盖金融科技、营销分析、学业支持与财务。",
  "View roles →": "查看职位 →",
  "Featured Work": "精选项目",
  "Food security analysis, stock screening, and Power BI dashboards.": "食品安全分析、股票筛选与 Power BI 仪表板。",
  "View projects →": "查看项目 →",
  "Current Base": "目前所在地",
  "Location": "所在地",
  "Open Map": "打开地图",
  "Current Study": "目前就读",
  "Education": "教育背景",
  "University of Waterloo · Actuarial Science": "滑铁卢大学 · 精算学",
  "Toolbox": "专业工具",
  "Python, SQL, Excel, Power BI, SAS, SOA P & FM.": "Python、SQL、Excel、Power BI、SAS、SOA P 与 FM。",
  "View skills →": "查看技能 →",
  "Open to co-op and collaborations in actuarial science.": "期待精算领域的实习与合作机会。",
  "Say hello →": "和我聊聊 →",
  "Work Experience": "工作经历",
  "Professional experience across education, fintech, marketing analytics, and finance.": "拥有教育、金融科技、营销分析与财务领域的专业经验。",
  "Current Role": "目前职位",
  "Business Academic Support Associate": "商科学术支持助理",
  "Mississauga, Canada": "加拿大 · 密西沙加",
  "May 2026 – Present": "2026年5月 – 至今",
  "Deliver 35 hours of weekly academic support across Accounting, Finance, Business Mathematics, Economics, and Statistics, assisting 20–25 students weekly.": "每周提供 35 小时学术支持，涵盖会计、金融、商业数学、经济学与统计学，每周帮助 20–25 名学生。",
  "Conduct 20+ individualized academic support sessions per week on quantitative reasoning and exam preparation.": "每周开展 20 余次个性化辅导，重点提升定量推理与考试准备能力。",
  "Collaborate with 12 faculty members to reinforce course materials and improve student engagement.": "与 12 位教师合作巩固课程内容并提升学生参与度。",
  "Integrate AI-powered learning tools into tutoring while promoting responsible academic use.": "将 AI 学习工具融入辅导，同时倡导负责任的学术使用方式。",
  "Business Analyst, Marketing Coordinator": "商业分析师、市场协调员",
  "Beijing, China": "中国 · 北京",
  "May 2025 – Aug 2025": "2025年5月 – 2025年8月",
  "Analyzed the cross-border payment competitive landscape and produced insight reports for a fintech provider processing $1B+ annually.": "分析跨境支付行业竞争格局，为年处理额超过 10 亿美元的金融科技企业产出洞察报告。",
  "Collaborated with a 200+ member sales team to standardize customer data and built a segmentation model.": "与 200 余人的销售团队合作统一客户数据，并建立客户分层模型。",
  "Built a KPI target-setting model driving a 40% QoQ increase and supporting CAD $2M+ in payment processing.": "建立 KPI 目标模型，推动季度环比增长 40%，并支持超过 200 万加元的支付处理额。",
  "Marketing Coordinator": "市场协调员",
  "New York City, United States": "美国 · 纽约",
  "June 2025 – Aug 2025": "2025年6月 – 2025年8月",
  "Planned multi-platform content and tracked performance via HubSpot — 3× views, 1.6× likes, 10% audience growth.": "策划多平台内容并通过 HubSpot 跟踪表现，实现浏览量 3 倍、点赞量 1.6 倍及受众增长 10%。",
  "Created onboarding playbooks and SOPs, reducing ramp-up time by 50%.": "制作入职手册与标准流程，将上手时间缩短 50%。",
  "Accounting Assistant": "会计助理",
  "Ningbo, China": "中国 · 宁波",
  "Jun 2024 – Aug 2024": "2024年6月 – 2024年8月",
  "Cut material losses by 15%, saving $3M+ in raw material costs.": "将材料损耗降低 15%，节省超过 300 万美元原材料成本。",
  "Generated monthly management reports, budgeting, forecasting, and tax reconciliation.": "负责月度管理报告、预算、预测与税务核对。",
  "A few moments from life, travel, and time outside the classroom.": "一些关于生活、旅行与课堂之外的片刻。",
  "Selected academic and analytical projects demonstrating research and quantitative skills.": "精选学术与分析项目，展示研究和定量分析能力。",
  "Data-Driven Student Food Security Analysis": "数据驱动的学生食品安全分析",
  "Apr 2025 – Jul 2025": "2025年4月 – 2025年7月",
  "Analyzed Statistics Canada data and visualized insights in interactive Power BI dashboards.": "分析加拿大统计局数据，并通过交互式 Power BI 仪表板呈现洞察。",
  "Delivered actionable recommendations to the client with strong positive feedback.": "向客户提交可执行建议，并获得积极反馈。",
  "North American Stock Screening Model": "北美股票筛选模型",
  "Sep 2024 – Dec 2024": "2024年9月 – 2024年12月",
  "Built a fundamentals-driven model using P/E, ROE, Debt-to-Equity, and Dividend Yield.": "基于市盈率、净资产收益率、负债权益比与股息率构建基本面筛选模型。",
  "Produced investor-ready evaluation tables for structured decision-making.": "制作面向投资者的评估表，支持结构化决策。",
  "Technical tools and analytical capabilities developed through coursework and professional experience.": "通过课程与专业实践积累的技术工具和分析能力。",
  "Programming & Tools": "编程与工具",
  "Actuarial Exams": "精算考试",
  "SOA Exam P — Passed": "SOA P 考试 — 已通过",
  "SOA Exam FM — Passed": "SOA FM 考试 — 已通过",
  "Probability (P) and Financial Mathematics (FM), Society of Actuaries.": "美国精算师协会概率论（P）与金融数学（FM）考试。",
  "Business Analytics": "商业分析",
  "KPI design, dashboarding, variance analysis, customer segmentation, financial reporting, and stakeholder reporting.": "KPI 设计、仪表板、差异分析、客户分层、财务报告与利益相关方汇报。",
  "Coursework": "相关课程",
  "Financial Mathematics, Actuarial Science Practice, Financial Accounting, Statistics, Microeconomics.": "金融数学、精算实务、财务会计、统计学与微观经济学。",
  "Open to co-op opportunities, collaborations, and conversations about actuarial science and analytics.": "期待实习、合作，以及关于精算与数据分析的交流。",
  "Phone": "电话",
  "© 2026 Lucienne Zhang · All rights reserved": "© 2026 Lucienne Zhang · 保留所有权利"
};

const heroTagline = document.querySelector(".hero-tagline");
const heroTaglineEn = heroTagline ? heroTagline.innerHTML : "";
const heroTaglineZh = "拥有精算学习、金融科技与商业分析经验的定量思考者，专注于风险、洞察与可衡量的成果。已通过 <strong>SOA P 与 FM 考试</strong>。";

const translatableElements = [...document.body.querySelectorAll("*")].filter((element) => {
  if (element.children.length > 0 || element === heroTagline) return false;
  return Object.hasOwn(zhTranslations, element.textContent.trim());
});

translatableElements.forEach((element) => {
  element.dataset.en = element.textContent.trim();
});

function currentLanguage() {
  return document.documentElement.lang === "zh-CN" ? "zh" : "en";
}

function updateControlLabels() {
  const isZh = currentLanguage() === "zh";
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const menuOpen = navLinks?.classList.contains("open");

  if (langToggle) {
    langToggle.querySelector(".lang-current").textContent = isZh ? "EN" : "中";
    langToggle.querySelector(".lang-next").textContent = isZh ? "中" : "EN";
    langToggle.setAttribute("aria-label", isZh ? "Switch to English" : "切换到中文");
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isZh
        ? (isDark ? "切换到浅色模式" : "切换到深色模式")
        : (isDark ? "Switch to light mode" : "Switch to dark mode")
    );
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-label",
      isZh
        ? (menuOpen ? "关闭菜单" : "打开菜单")
        : (menuOpen ? "Close menu" : "Open menu")
    );
  }
}

function setLanguage(language) {
  const isZh = language === "zh";
  document.documentElement.lang = isZh ? "zh-CN" : "en";

  translatableElements.forEach((element) => {
    element.textContent = isZh ? zhTranslations[element.dataset.en] : element.dataset.en;
  });

  if (heroTagline) {
    heroTagline.innerHTML = isZh ? heroTaglineZh : heroTaglineEn;
  }

  localStorage.setItem("language", language);
  updateControlLabels();
}

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    updateControlLabels();
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      updateControlLabels();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      updateControlLabels();
      toggle.focus();
    }
  });
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  document.documentElement.setAttribute("data-theme", storedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateControlLabels();
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    setLanguage(currentLanguage() === "zh" ? "en" : "zh");
  });
}

setLanguage(localStorage.getItem("language") === "zh" ? "zh" : "en");

const navLinkEls = document.querySelectorAll(".nav-link");
const sections = [...navLinkEls]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section, index, all) => section && all.indexOf(section) === index);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinkEls.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));
