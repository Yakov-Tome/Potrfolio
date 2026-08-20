/**
 * The back face of each flip card in the Stack section.
 *
 * One honest line per technology — what Yakov actually uses it for, not a
 * marketing blurb. Keyed by the skill ids in content.js.
 */
export const skillCopy = {
  m365: {
    en: "Running an organisation's Microsoft 365 estate from one place — users, licensing, groups, permissions, apps and cloud services.",
    he: "ניהול סביבת Microsoft 365 ארגונית — משתמשים, רישוי, קבוצות, הרשאות, יישומים ושירותי ענן ממקום מרכזי.",
  },
  entra: {
    en: "Identity and access management — users, groups, permissions, MFA, access policy and securing the sign-in path.",
    he: "ניהול זהויות וגישה — משתמשים, קבוצות, הרשאות, MFA, מדיניות גישה ואבטחת תהליכי התחברות.",
  },
  intune: {
    en: "Managing and securing endpoints — policy, applications, updates, compliance, configuration and automation from one system.",
    he: "ניהול ואבטחת תחנות קצה — מדיניות, אפליקציות, עדכונים, תאימות, תצורה ואוטומציה ממערכת מרכזית.",
  },
  azure: {
    en: "Working with Azure services, enterprise applications, permissions, integrations and cloud resources across the Microsoft estate.",
    he: "עבודה עם שירותי Azure, יישומים ארגוניים, הרשאות, אינטגרציות ומשאבי ענן בסביבת Microsoft.",
  },
  sharepoint: {
    en: "Running SharePoint sites, document libraries, permissions and the sharing of company information, securely and in order.",
    he: "ניהול אתרי SharePoint, ספריות מסמכים, הרשאות ושיתוף מידע ארגוני בצורה מאובטחת ומסודרת.",
  },
  winserver: {
    en: "Administering and maintaining Windows servers — roles, services, permissions, updates, monitoring and troubleshooting in a corporate environment.",
    he: "ניהול ותחזוקת שרתי Windows — תפקידים, שירותים, הרשאות, עדכונים, ניטור ופתרון תקלות בסביבה ארגונית.",
  },
  ad: {
    en: "Running an Active Directory environment — users, groups, computers, organisational units, permissions and group policy.",
    he: "ניהול סביבת Active Directory — משתמשים, קבוצות, מחשבים, יחידות ארגוניות, הרשאות ומדיניות קבוצתית.",
  },
  dns: {
    en: "DNS administration and configuration — zones, records, name resolution, and diagnosing network and service faults across a corporate environment.",
    he: "ניהול ותצורת DNS — אזורים, רשומות, פתרון שמות ואבחון תקלות תקשורת ושירותים בסביבה ארגונית.",
  },
  hyperv: {
    en: "Building and running virtual environments — virtual machines, resources, networks, storage and the upkeep of the infrastructure.",
    he: "הקמה וניהול של סביבות וירטואליות — מכונות וירטואליות, משאבים, רשתות, אחסון ותחזוקת תשתיות.",
  },
  // The two \u200f in the Hebrew line are RIGHT-TO-LEFT MARKs, and they are
  // load-bearing: without them the bidi algorithm pulls "VLAN," and "VPN," out
  // of the list and the commas land on the wrong side. Written as escapes
  // rather than as the invisible characters themselves so they survive an edit.
  networking: {
    en: "Managing and troubleshooting connectivity — LAN/WAN, VLAN, VPN, switches, routers, IP addressing and site-to-site links.",
    he: "ניהול ופתרון תקלות תקשורת — LAN/WAN, \u200fVLAN, \u200fVPN, מתגים, נתבים, כתובות IP וקישוריות בין אתרים.",
  },
  exchange: {
    en: "Exchange Online administration — mailboxes, distribution groups, permissions, shared mailboxes and organisation-wide mail settings.",
    he: "ניהול Exchange Online — תיבות דואר, קבוצות תפוצה, הרשאות, תיבות משותפות והגדרות דואר ארגוניות.",
  },
  autopilot: {
    en: "Automated build and deployment of Windows machines — from switching the thing on to a corporate desktop ready for its user.",
    he: "הקמה ופריסה אוטומטית של מחשבי Windows — מהפעלת המחשב ועד סביבת עבודה ארגונית מוכנה למשתמש.",
  },
  react: {
    en: "Interactive, dynamic interfaces built from components and hooks, with state managed modularly and efficiently.",
    he: "פיתוח ממשקים אינטראקטיביים ודינמיים באמצעות Components, Hooks וניהול State בצורה מודולרית ויעילה.",
  },
  tailwind: {
    en: "Modern, responsive interfaces designed quickly with utility classes, and a UI that stays consistent, clean and maintainable.",
    he: "עיצוב ממשקים מודרניים ורספונסיביים במהירות, תוך עבודה עם utility classes ובניית UI עקבי, נקי וניתן לתחזוקה.",
  },
  js: {
    en: "Logic and interactivity on both the client and the server, including APIs, the DOM and asynchronous work.",
    he: "פיתוח לוגיקה ואינטראקטיביות בצד הלקוח והשרת, כולל עבודה עם APIs, DOM ותהליכים אסינכרוניים.",
  },
  powershell: {
    en: "Automating and administering IT environments, Microsoft 365, Entra ID and Active Directory through scripts and advanced management tooling.",
    he: "אוטומציה וניהול של סביבות IT, Microsoft 365, Entra ID ו־Active Directory באמצעות סקריפטים וכלי ניהול מתקדמים.",
  },
  git: {
    en: "Orderly version control — branches, commits and the workflows that make development safe and collaborative.",
    he: "ניהול גרסאות וקוד בצורה מסודרת, כולל Branches, Commits ותהליכי עבודה המאפשרים פיתוח בטוח ושיתופי.",
  },
  node: {
    en: "Server-side development, APIs and integrations between systems, including third-party services and backend processes.",
    he: "פיתוח צד שרת, APIs ואינטגרציות בין מערכות, כולל עבודה עם שירותים חיצוניים ותהליכי Backend.",
  },
  pg: {
    en: "Designing and running relational databases, writing SQL queries and working with data for systems and applications.",
    he: "תכנון וניהול מסדי נתונים רלציוניים, כתיבת שאילתות SQL ועבודה עם נתונים עבור מערכות ואפליקציות.",
  },
  html: {
    en: "Semantic, accessible, well-ordered structure for websites and web apps, with performance and SEO in mind.",
    he: "בניית מבנה סמנטי, נגיש ומסודר לאתרי אינטרנט ואפליקציות Web, עם דגש על ביצועים ו־SEO.",
  },
  css: {
    en: "Precise, responsive layouts built with Flexbox, Grid and animation, fitted properly to every screen size.",
    he: "בניית עיצובים רספונסיביים ומדויקים באמצעות Flexbox, Grid, אנימציות והתאמה מלאה למגוון מסכים.",
  },
};
