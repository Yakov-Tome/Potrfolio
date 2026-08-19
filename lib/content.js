/**
 * All site content, in both languages.
 *
 * Everything here is Yakov's real information, carried over from the previous
 * site (app/data/*.js and the about pages) — nothing is invented. The Hebrew is
 * a translation of the same facts, not a different story.
 *
 * The one thing deliberately left behind: the old Achievements block claimed
 * "12 years experience / 97 projects / 81 customers / 53 awards", which came
 * from the purchased theme and contradicts the site's own "5+ years". Numbers
 * that cannot be defended do not belong on a portfolio.
 */

export const LOCALES = ["en", "he"];
export const DEFAULT_LOCALE = "en";
export const RTL_LOCALES = ["he"];

/* The canonical origin — the one place the site's own address is written.
 *
 * It feeds metadataBase, the canonical link, the hreflang alternates, the
 * sitemap and robots.txt, so moving the site to a new domain is this line plus
 * DNS, not a search-and-replace.
 *
 * It still says yakov.iresale.co.il on purpose while yakovtome.com resolves to
 * the old Vercel deployment: a canonical pointing at a domain that serves
 * different content is worse than no move at all. Flip it in the same change
 * that flips DNS. `SITE_URL` overrides it at build time for a staging host.
 */
export const SITE_URL = process.env.SITE_URL || "https://yakov.iresale.co.il";

export const site = {
  name: "Yakov Tome",
  url: SITE_URL,
  email: "yakovtome@outlook.com",
  github: "https://github.com/yakov-tome",
  linkedin: "https://linkedin.com/in/yakov-tome",
  maps: "https://maps.app.goo.gl/1y3qNw7qzeYQhoQG9",
  cv: "/cv.pdf",
};

/* ------------------------------------------------------------------ skills */
// Logos are the files already in public/svg from the previous site.
export const skills = [
  // Five, and the icons are the ones from the Figma file "Tech & Design Stack
  // Icons" — pulled through the bridge as SVG from the Light page, at their own
  // 100x100 artboards, so each mark sits in the same square the designer drew
  // it in. The names match that file's: html5, css3, js, react, postgresql.
  { id: "html", name: "HTML5", logo: "/svg/stack/html5.svg" },
  { id: "css", name: "CSS3", logo: "/svg/stack/css3.svg" },
  { id: "js", name: "JavaScript", logo: "/svg/stack/javascript.svg" },
  { id: "react", name: "React", logo: "/svg/stack/react.svg" },
  { id: "pg", name: "PostgreSQL", logo: "/svg/stack/postgresql.svg" },
  { id: "git", name: "Git", logo: "/svg/stack/git.svg" },
];

/* ---------------------------------------------------------------- projects */
export const projects = [
  {
    id: "ora",
    image: "/portfolio/ora.jpg",
    link: "https://www.oraholidayapartments.co.il/",
    preview: "oraholidayapartments.co.il",
    stack: "WIX",
    year: "2024",
  },
  {
    id: "iresale",
    image: "/portfolio/iresale.jpg",
    link: "https://www.iresale.com",
    preview: "iresale.com",
    stack: "React · Firebase · Tailwind",
    year: "2024",
  },
  {
    id: "portfolio",
    image: "/portfolio/portfolio.jpg",
    link: "https://www.yakovtome.com",
    preview: "yakovtome.com",
    stack: "Next.js · Tailwind · Framer Motion",
    year: "2025",
  },
];

/* -------------------------------------------------------------- experience */
// Dates come from the CV PDF, which gives years and not months, so they are
// stored as years and printed as years. Two of them used to be attached to the
// wrong role entirely — Cloud247 was on the site as "Feb 2024 - Present" when
// the CV has it at 2017-2021, and the self-employed years were 2017-2021 when
// the CV has them at 2009-2017. Sorting is a plain string compare, which works
// on "2006"; the CV section orders its slots by `start` and prints it as the
// slot's numeral.
export const experience = [
  {
    id: "mamram",
    company: "Mamram · IDF Technology and Computer Unit",
    start: "2006",
    end: "2009",
  },
  { id: "control", company: "Control · Self-Employed", start: "2009", end: "2017" },
  { id: "cloud247", company: "Cloud247", start: "2017", end: "2021" },
  { id: "primo", company: "Primo Water Corporation", start: "2021", end: "2024" },
];

export const education = [
  {
    id: "bootcamp",
    start: "2024-11",
    provider: "Udemy",
    image: "/cert/DEV.jpg",
    credential: "UC-52774641-1666-4987-ad4a-1a867d2a5e58",
    link: "https://www.udemy.com/certificate/UC-52774641-1666-4987-ad4a-1a867d2a5e58/",
  },
  {
    id: "css",
    start: "2024-09",
    provider: "Udemy",
    image: "/cert/CSS.jpg",
    credential: "UC-11067684-803f-4ef0-86e5-94542b50a039",
    link: "https://www.udemy.com/certificate/UC-11067684-803f-4ef0-86e5-94542b50a039/",
  },
];

/* --------------------------------------------------------------- the words */

const en = {
  dir: "ltr",
  localeName: "English",
  otherLocaleName: "עברית",
  nav: { home: "Home", about: "About", stack: "Stack", resume: "Experience", projects: "Projects", blog: "Blog", contact: "Contact" },

  hero: {
    greeting: "Hi, I'm Yakov!",
    // The Framer heading node is type:MIXED — the plugin withholds it, but the
    // published build renders "Hi, I'm " at weight 500 and the name at weight
    // 700 in italic. Split so the same emphasis is possible here.
    greetingLead: "Hi, I'm ",
    greetingName: "Yakov",
    greetingTail: "!",
    role: "Full Stack Developer",
    skillsTicker: ["React", "Node.js", "Next.js", "MongoDB"],
    cta: "Let's Work Together!",
    ctaMobile: "Contact Me",
    ticker: "YAKOV TOME ",
    // The reference's "80+ Happy Clients" row, between the portrait and the
    // button. PLACEHOLDER, to be replaced.
    //
    // The label says years, not clients, and that is the one liberty taken: the
    // slot, the geometry and the type are the design's, but the sentence in it
    // is read by visitors and employers as a statement of fact, and "80+ happy
    // clients" is not a fact anyone has confirmed. "5+ years" is — it is the
    // same figure the Details block on this page already gives. Swap this one
    // string in each dictionary the moment a real number exists.
    //
    // The avatars are deliberately generic illustrations, not photographs, for
    // the same reason: three invented faces would read as real clients.
    clients: {
      label: "5+ Years Experience",
      avatars: ["/clients/1.svg", "/clients/2.svg", "/clients/3.svg"],
    },
    // Runs around the back of the portrait, revealed on hover. The Framer node
    // spells it with the same two stars: "✦  SCROLL DOWN  ✦ AND KNOW ME BETTER".
    photoRing: "✦  SCROLL DOWN  ✦ AND KNOW ME BETTER ",
  },

  // The Framer " Testimonials Section", filled with an obvious TEMPLATE rather
  // than with invented quotes. Three named strangers praising Yakov would be a
  // fabricated record: visitors and employers read a testimonial as a real
  // person vouching for him, and unlike a placeholder number that is not
  // something a later edit can undo for whoever saw it. So the slot, the
  // geometry and the motion are the design's, and every string here says plainly
  // that it is waiting to be filled in.
  //
  // To make it real: replace name / role / quote per entry and drop the client's
  // photo in place of the generic avatar. Delete the key entirely and the whole
  // section stops rendering.
  testimonials: {
    title: "Testimonials",
    items: [
      { name: "Client name", role: "Role, Company", quote: "Their words about the work go here.", avatar: "/clients/1.svg" },
      { name: "Client name", role: "Role, Company", quote: "Their words about the work go here.", avatar: "/clients/2.svg" },
      { name: "Client name", role: "Role, Company", quote: "Their words about the work go here.", avatar: "/clients/3.svg" },
    ],
  },

  about: {
    title: "About Me",
    cards: [
      "Hi, I'm Yakov — a Full Stack Developer specialising in React, Node.js, MongoDB and Next.js. I'm passionate about building software that genuinely improves the lives of the people who use it.",
      "I didn't start in web development. I spent well over a decade in IT: supporting servers and networks, running my own lab, training teams and solving the kind of problems that only show up in production. That background is why I think about reliability before I think about features.",
      "In 2024 I made the switch deliberately — a full-stack bootcamp, then project after project. Today my stack runs from React, Next.js and Tailwind on the front to Node.js, MongoDB, PostgreSQL and REST APIs on the back.",
    ],
    cv: "Read My CV",
  },

  stack: {
    title: "My Stack",
    flip: "Tap to flip",
    flipBack: "Tap to flip back",
  },

  projects: {
    title: "Projects",
    visit: "Visit site",
    items: {
      ora: {
        name: "ORA Holiday Apartments",
        role: "Client project",
        title: "Vacation Apartment Rental Website",
        description:
          "A modern, informative website for ORA Holiday Apartments. Clean responsive layout showcasing available rentals, local attractions and clear booking information — built for ease of navigation and for turning visitors into guests.",
      },
      iresale: {
        name: "iResale",
        role: "Personal project",
        title: "Second-Hand iPhone Marketplace",
        description:
          "A responsive marketplace for buying and selling second-hand iPhones. Secure sign-up and login with Firebase Authentication, full CRUD over your own listings, dynamic routing with React Router, and server state handled by React Query. Built in React and Tailwind, with Firebase for database and image storage.",
      },
      portfolio: {
        name: "Portfolio",
        role: "Personal project",
        title: "Personal Portfolio Website",
        description:
          "A personal portfolio built with Next.js, Tailwind CSS and Framer Motion — showcasing projects, writing and contact details, with dynamic routing and a fully responsive layout.",
      },
    },
  },

  // The Services-shaped CV section: one heading over a numbered list that runs
  // through experience, education and details. The items themselves are composed
  // in the component from `experience`, `education` and `info`, so nothing here
  // restates content that already exists.
  resume: {
    title: "Experience, Education & Details",
    viewCertificate: "View certificate",
  },

  experience: {
    title: "Experience",
    // Roles, employers, years and substance all come from the CV PDF, which is
    // the authority here. The wording is condensed from its bullets into the
    // one paragraph this layout gives each slot, because the reference's
    // Services slot is a paragraph and not a list.
    items: {
      mamram: {
        role: "Network Administrator",
        detail:
          "Military service at Mamram, the IDF's technology and computer unit. Ran the base's network infrastructure, servers and user accounts, kept them reliable and secure for the personnel who depended on them, carried out network upgrades against operational requirements, and onboarded and trained the new soldiers joining the IT team.",
      },
      control: {
        role: "Owner & IT Service Provider",
        detail:
          "Founded and ran a computer repair and IT service business for private clients and small businesses. On-site and remote support, network setup, server infrastructure and Active Directory, alongside IT consulting and preventive maintenance — built on long client relationships rather than one-off call-outs.",
      },
      cloud247: {
        role: "IT Support Expert",
        detail:
          "Tier 1–3 support for enterprise clients: hardware, software and networking. Managed servers and infrastructure through upgrades and new deployments, installed and configured VMware vSphere for virtualization, and wrote the technical documentation and user training that went with it.",
      },
      primo: {
        role: "IT Support Expert & Projects",
        detail:
          "End-to-end IT support for 300+ employees across Windows and macOS. Managed accounts, permissions and group policy in Active Directory, administered the global SCCM system for software and OS deployment, and led the Israeli support team — onboarding and training new employees into it.",
      },
    },
  },

  education: {
    title: "Education",
    items: {
      bootcamp: { name: "The Complete 2024 Web Development Bootcamp" },
      css: { name: "CSS — The Complete Guide (Flexbox, Grid & Sass)" },
    },
    credential: "Credential ID",
  },

  info: {
    title: "Details",
    fullName: "Full Name",
    role: "Role",
    // Both halves are true and the CV carries the first: its header reads
    // "IT Support Expert · Systems & Infrastructure", and the web development
    // is what the 2024 certificates and the projects below are.
    roleValue: "IT Support Expert · Full-Stack Developer",
    country: "Location",
    countryValue: "Herzliya, Israel",
    languages: "Languages",
    languagesValue: "Hebrew, English",
    experienceLabel: "Experience",
    // The CV's own figure. This said "5+ years in tech & web dev", which the
    // slots above it now contradict outright — they start in 2006.
    experienceValue: "15+ years in technical support, IT infrastructure and system administration",
    freelance: "Freelance",
    freelanceValue: "Available",
    specialties: "Specialties",
    specialtiesValue: "Active Directory, SCCM, VMware, Windows & macOS · React, Node.js, Next.js",
    interests: "Interests",
    interestsValue: "Kitesurfing, swimming, chess, music, writing — and teaching myself whatever comes next",
  },

  contact: {
    title: "Let's work together",
    lead: "Have a project in mind, or just want to say hello? I read every message.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Location",
    columns: { contact: "Contact Me", links: "Useful Links", social: "Social" },
    locationValue: "Israel",
    cta: "Send me an email",
  },

  blog: {
    title: "Blog",
    lead: "Notes on learning to build things on my own.",
    readMore: "Read post",
    back: "All posts",
    by: "By",
  },

  footer: { rights: "All rights reserved.", built: "Designed in Framer, built in Next.js." },
  notFound: { title: "Page not found", lead: "That page doesn't exist.", home: "Back home" },
};

const he = {
  dir: "rtl",
  localeName: "עברית",
  otherLocaleName: "English",
  nav: { home: "בית", about: "אודות", stack: "טכנולוגיות", resume: "ניסיון", projects: "פרויקטים", blog: "בלוג", contact: "צור קשר" },

  hero: {
    greeting: "היי, אני יעקב!",
    greetingLead: "היי, אני ",
    greetingName: "יעקב",
    greetingTail: "!",
    role: "מפתח Full Stack",
    skillsTicker: ["React", "Node.js", "Next.js", "MongoDB"],
    cta: "בוא נעבוד יחד!",
    ctaMobile: "צור קשר",
    ticker: "יעקב תומו ",
    // Placeholder — see the English dictionary for why it says years and not
    // clients, and what to change when a real number exists.
    clients: {
      label: "5+ שנות ניסיון",
      avatars: ["/clients/1.svg", "/clients/2.svg", "/clients/3.svg"],
    },
    photoRing: "✦  גלול למטה  ✦ ובוא נכיר יותר טוב ",
  },

  // Template, not invented quotes — see the English dictionary for why.
  testimonials: {
    title: "המלצות",
    items: [
      { name: "שם הלקוח", role: "תפקיד, חברה", quote: "כאן ייכתב מה שהלקוח אמר על העבודה.", avatar: "/clients/1.svg" },
      { name: "שם הלקוח", role: "תפקיד, חברה", quote: "כאן ייכתב מה שהלקוח אמר על העבודה.", avatar: "/clients/2.svg" },
      { name: "שם הלקוח", role: "תפקיד, חברה", quote: "כאן ייכתב מה שהלקוח אמר על העבודה.", avatar: "/clients/3.svg" },
    ],
  },

  about: {
    title: "קצת עליי",
    cards: [
      "היי, אני יעקב — מפתח Full Stack שמתמחה ב-React, Node.js, MongoDB ו-Next.js. אני אוהב לבנות תוכנה שבאמת משפרת את החיים של מי שמשתמש בה.",
      "לא התחלתי בפיתוח web. ביליתי יותר מעשור ב-IT: תמיכה בשרתים ורשתות, ניהול מעבדה משלי, הדרכת צוותים ופתרון בעיות מהסוג שצץ רק בסביבת ייצור. הרקע הזה הוא הסיבה שאני חושב על אמינות עוד לפני שאני חושב על פיצ'רים.",
      "ב-2024 עשיתי את המעבר במודע — בוטקאמפ פול-סטאק, ומשם פרויקט אחרי פרויקט. היום הסטאק שלי נמתח מ-React, Next.js ו-Tailwind בצד הלקוח ועד Node.js, MongoDB, PostgreSQL ו-REST API בצד השרת.",
    ],
    cv: "קורות החיים שלי",
  },

  stack: {
    title: "הטכנולוגיות שלי",
    flip: "לחץ להיפוך",
    flipBack: "לחץ לחזרה",
  },

  projects: {
    title: "פרויקטים",
    visit: "לאתר",
    items: {
      ora: {
        name: "ORA Holiday Apartments",
        role: "פרויקט ללקוח",
        title: "אתר להשכרת דירות נופש",
        description:
          "אתר מודרני ואינפורמטיבי ל-ORA Holiday Apartments. פריסה נקייה ורספונסיבית שמציגה את הדירות הפנויות, אטרקציות באזור ומידע ברור על הזמנה — בנוי לניווט קל ולהפיכת מבקרים לאורחים.",
      },
      iresale: {
        name: "iResale",
        role: "פרויקט אישי",
        title: "זירת מסחר לאייפונים יד שנייה",
        description:
          "אפליקציית web רספונסיבית לקנייה ומכירה של אייפונים יד שנייה. הרשמה והתחברות מאובטחות עם Firebase Authentication, CRUD מלא על המודעות שלך, ניתוב דינמי עם React Router, וניהול מצב שרת עם React Query. נבנתה ב-React ו-Tailwind, עם Firebase למסד הנתונים ולאחסון התמונות.",
      },
      portfolio: {
        name: "תיק עבודות",
        role: "פרויקט אישי",
        title: "אתר תיק עבודות אישי",
        description:
          "תיק עבודות אישי שנבנה ב-Next.js, Tailwind CSS ו-Framer Motion — מציג פרויקטים, כתיבה ופרטי יצירת קשר, עם ניתוב דינמי ופריסה רספונסיבית מלאה.",
      },
    },
  },

  resume: {
    title: "ניסיון, השכלה ופרטים",
    viewCertificate: "לצפייה בתעודה",
  },

  experience: {
    title: "ניסיון",
    items: {
      mamram: {
        role: "מנהל רשת",
        company: "ממר\"ם · יחידת המחשוב והטכנולוגיה של צה\"ל",
        detail:
          "שירות צבאי בממר\"ם, יחידת המחשוב והטכנולוגיה של צה\"ל. ניהול תשתית הרשת, השרתים וחשבונות המשתמשים בבסיס, שמירה על אמינותם ואבטחתם עבור המשתמשים שהסתמכו עליהם, ביצוע שדרוגי רשת בהתאם לדרישות מבצעיות, וקליטה והדרכה של החיילים החדשים בצוות ה-IT.",
      },
      control: {
        role: "בעלים ונותן שירותי IT",
        company: "Control · עצמאי",
        detail:
          "הקמה וניהול של עסק לתיקון מחשבים ושירותי IT ללקוחות פרטיים ולעסקים קטנים. תמיכה באתר הלקוח ומרחוק, הקמת רשתות, תשתיות שרתים ו-Active Directory, לצד ייעוץ IT ותחזוקה מונעת — על בסיס קשרי לקוחות ארוכי טווח ולא קריאות חד-פעמיות.",
      },
      cloud247: {
        role: "מומחה תמיכת IT",
        detail:
          "תמיכה בדרג 1–3 ללקוחות ארגוניים: חומרה, תוכנה ורשתות. ניהול שרתים ותשתיות לאורך שדרוגים ופריסות חדשות, התקנה והגדרה של VMware vSphere לווירטואליזציה, וכתיבת התיעוד הטכני והדרכות המשתמשים שנלוו לכך.",
      },
      primo: {
        role: "מומחה תמיכת IT ופרויקטים",
        detail:
          "תמיכת IT מקצה לקצה ל-300+ עובדים בסביבות Windows ו-macOS. ניהול חשבונות, הרשאות ומדיניות קבוצתית ב-Active Directory, ניהול מערכת ה-SCCM הגלובלית להפצת תוכנה ומערכות הפעלה, והובלת צוות התמיכה בישראל — קליטה והדרכה של עובדים חדשים.",
      },
    },
  },

  education: {
    title: "הכשרה",
    items: {
      bootcamp: { name: "The Complete 2024 Web Development Bootcamp" },
      css: { name: "CSS — The Complete Guide (Flexbox, Grid & Sass)" },
    },
    credential: "מזהה תעודה",
  },

  info: {
    title: "פרטים",
    fullName: "שם מלא",
    role: "תפקיד",
    roleValue: "מומחה תמיכת IT · מפתח Full-Stack",
    country: "מיקום",
    countryValue: "הרצליה, ישראל",
    languages: "שפות",
    languagesValue: "עברית, אנגלית",
    experienceLabel: "ניסיון",
    experienceValue: "15+ שנים בתמיכה טכנית, תשתיות IT וניהול מערכות",
    freelance: "פרילנס",
    freelanceValue: "פנוי",
    specialties: "התמחויות",
    specialtiesValue: "Active Directory, SCCM, VMware, Windows ו-macOS · React, Node.js, Next.js",
    interests: "תחביבים",
    interestsValue: "גלישת קייט, שחייה, שחמט, מוזיקה, כתיבה — ולימוד עצמי של מה שבא אחר כך",
  },

  contact: {
    title: "בוא נעבוד יחד",
    lead: "יש לך פרויקט בראש, או סתם בא לך להגיד שלום? אני קורא כל הודעה.",
    email: "אימייל",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "מיקום",
    columns: { contact: "צור קשר", links: "קישורים", social: "רשתות" },
    locationValue: "ישראל",
    cta: "שלח לי אימייל",
  },

  blog: {
    title: "בלוג",
    lead: "רשימות על ללמוד לבנות דברים לבד.",
    readMore: "לפוסט",
    back: "כל הפוסטים",
    by: "מאת",
  },

  footer: { rights: "כל הזכויות שמורות.", built: "עוצב ב-Framer, נבנה ב-Next.js." },
  notFound: { title: "הדף לא נמצא", lead: "הדף הזה לא קיים.", home: "חזרה לדף הבית" },
};

const dictionaries = { en, he };

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isRtl(locale) {
  return RTL_LOCALES.includes(locale);
}
