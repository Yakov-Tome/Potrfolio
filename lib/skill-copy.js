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
    en: "Roles, updates and the boxes everything else depends on. Fifteen years of keeping them running is where the rest of this list comes from.",
    he: "תפקידים, עדכונים והמכונות שכל השאר תלוי בהן. חמש עשרה שנה של לשמור עליהן חיות הן המקור לכל השאר ברשימה.",
  },
  ad: {
    en: "Users, groups, OUs and group policy — the directory a company's access rules are actually written in.",
    he: "משתמשים, קבוצות, יחידות ארגוניות ומדיניות קבוצתית — הספרייה שבה כללי הגישה של ארגון באמת כתובים.",
  },
  dns: {
    en: "Records, zones and resolution. The first thing to check when something cannot reach something else, and usually the answer.",
    he: "רשומות, אזורים ותרגום שמות. הדבר הראשון שבודקים כשמשהו לא מגיע למשהו אחר, ובדרך כלל גם התשובה.",
  },
  hyperv: {
    en: "Virtualisation on the host: machines, switches, snapshots — more servers than there is hardware to hold them.",
    he: "וירטואליזציה על המארח: מכונות, מתגים, תמונות מצב — יותר שרתים מהחומרה שיכולה להחזיק אותם.",
  },
  networking: {
    en: "Subnets, routing, VPNs and firewalls. The part that is invisible when it works and the only thing anyone talks about when it does not.",
    he: "רשתות משנה, ניתוב, VPN וחומות אש. החלק שאף אחד לא רואה כשהוא עובד, והיחיד שמדברים עליו כשלא.",
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
