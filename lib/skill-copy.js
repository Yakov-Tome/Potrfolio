/**
 * The back face of each flip card in the Stack section.
 *
 * One honest line per technology — what Yakov actually uses it for, not a
 * marketing blurb. Keyed by the skill ids in content.js.
 */
export const skillCopy = {
  m365: {
    en: "Tenant administration end to end — licensing, groups, mail flow and the policies that keep it all in line.",
    he: "ניהול טננט מקצה לקצה — רישוי, קבוצות, זרימת דואר והמדיניות ששומרת על הסדר.",
  },
  entra: {
    en: "Identity as the perimeter. Users, groups, conditional access and the sign-in logs you read when something looks wrong.",
    he: "זהות בתור קו ההגנה. משתמשים, קבוצות, גישה מותנית, ויומני ההתחברות שקוראים כשמשהו נראה חשוד.",
  },
  intune: {
    en: "Devices enrolled, configured and kept compliant without touching them — the fleet managed from one place.",
    he: "מכשירים נרשמים, מוגדרים ונשמרים תואמי מדיניות בלי לגעת בהם — כל הצי מנוהל ממקום אחד.",
  },
  azure: {
    en: "Where the infrastructure lives now: virtual machines, networking and the identity plane the rest of it hangs off.",
    he: "המקום שבו יושבות התשתיות היום: מכונות וירטואליות, רשתות, ושכבת הזהות שכל השאר תלוי בה.",
  },
  sharepoint: {
    en: "Sites, libraries and permissions — the place a company's documents actually live, and the sharing rules around them.",
    he: "אתרים, ספריות והרשאות — המקום שבו המסמכים של הארגון באמת יושבים, וכללי השיתוף סביבם.",
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
    en: "Mailboxes, distribution groups and mail flow rules — plus the transport logs you read when a message did not arrive.",
    he: "תיבות דואר, קבוצות תפוצה וכללי זרימת דואר — ויומני התעבורה שקוראים כשהודעה לא הגיעה.",
  },
  autopilot: {
    en: "A device out of its box and onto the domain without anyone touching it. The user signs in and it is already theirs.",
    he: "מכשיר יוצא מהקופסה ומגיע לדומיין בלי שאף אחד נגע בו. המשתמש מתחבר וזה כבר שלו.",
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
