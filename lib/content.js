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

export const site = {
  name: "Yakov Tome",
  email: "yakovtome@outlook.com",
  github: "https://github.com/yakov-tome",
  linkedin: "https://linkedin.com/in/yakov-tome",
  maps: "https://maps.app.goo.gl/1y3qNw7qzeYQhoQG9",
  cv: "/cv.pdf",
};

/* ------------------------------------------------------------------ skills */
// Logos are the files already in public/svg from the previous site.
export const skills = [
  { id: "react", name: "React", logo: "/svg/react.svg" },
  { id: "next", name: "Next.js", logo: "/svg/next.svg" },
  { id: "node", name: "Node.js", logo: "/svg/node.svg" },
  { id: "js", name: "JavaScript", logo: "/svg/js.svg" },
  { id: "mongo", name: "MongoDB", logo: "/svg/mongo.svg" },
  { id: "pg", name: "PostgreSQL", logo: "/svg/pg.svg" },
  { id: "tailwind", name: "Tailwind CSS", logo: "/svg/twcss.svg" },
  { id: "api", name: "REST API", logo: "/svg/api.svg" },
  { id: "fb", name: "Firebase", logo: "/svg/fb.svg" },
  { id: "supabase", name: "Supabase", logo: "/svg/supabase.png" },
  { id: "query", name: "React Query", logo: "/svg/query.png" },
  { id: "redux", name: "Redux", logo: "/svg/redux.svg" },
  { id: "rrd", name: "React Router", logo: "/svg/rrd.svg" },
  { id: "motion", name: "Framer Motion", logo: "/svg/farmer.png" },
  { id: "html", name: "HTML", logo: "/svg/html.svg" },
  { id: "css", name: "CSS", logo: "/svg/css.svg" },
  { id: "mui", name: "Material UI", logo: "/svg/mui.svg" },
  { id: "ant", name: "Ant Design", logo: "/svg/ant.svg" },
  { id: "daisy", name: "DaisyUI", logo: "/svg/daisyui.png" },
  { id: "bs", name: "Bootstrap", logo: "/svg/bs.svg" },
  { id: "ejs", name: "EJS", logo: "/svg/ejs.png" },
  { id: "ps", name: "Photoshop", logo: "/svg/ps.svg" },
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
export const experience = [
  { id: "cloud247", company: "Cloud247", period: "Feb 2024 – Present" },
  { id: "primo", company: "Primo Water Corporation", period: "Jun 2021 – Feb 2024" },
  { id: "lab", company: "Self-employed", period: "Jun 2017 – Jun 2021" },
  { id: "it", company: "Center District", period: "Oct 2006 – Oct 2009" },
];

export const education = [
  {
    id: "bootcamp",
    date: "Nov 2024",
    provider: "Udemy",
    image: "/cert/DEV.jpg",
    credential: "UC-52774641-1666-4987-ad4a-1a867d2a5e58",
    link: "https://www.udemy.com/certificate/UC-52774641-1666-4987-ad4a-1a867d2a5e58/",
  },
  {
    id: "css",
    date: "Sep 2024",
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
  nav: { home: "Home", about: "About", stack: "Stack", projects: "Projects", blog: "Blog", contact: "Contact" },

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
    // button. Deliberately null: the number is a factual claim about Yakov's
    // work and nobody has supplied one, so the row does not render. Set
    // { label: "35+ Happy Clients", avatars: ["/clients/a.jpg", …] } to turn it
    // on — avatars are optional and the geometry holds without them.
    clients: null,
    // Runs around the back of the portrait, revealed on hover. The Framer node
    // spells it with the same two stars: "✦  SCROLL DOWN  ✦ AND KNOW ME BETTER".
    photoRing: "✦  SCROLL DOWN  ✦ AND KNOW ME BETTER ",
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

  experience: {
    title: "Experience",
    items: {
      cloud247: {
        role: "IT Support Expert",
        detail: "Trained teams, improved IT processes, managed servers and SCCM, and solved complex technical issues.",
      },
      primo: {
        role: "IT Specialist",
        detail: "Computer and server support, hardware and infrastructure maintenance.",
      },
      lab: {
        role: "IT Consultant & Lab Owner",
        detail: "Led lab staff, managed systems and networks, supported clients and contributed to business growth.",
      },
      it: {
        role: "IT Specialist",
        detail: "Provided IT services: networks, servers, websites, diagnostics, support and cloud backups.",
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
    roleValue: "Full-Stack Developer | React & Node.js",
    country: "Country",
    countryValue: "Israel",
    languages: "Languages",
    languagesValue: "Hebrew, English",
    experienceLabel: "Experience",
    experienceValue: "5+ years in tech & web dev",
    freelance: "Freelance",
    freelanceValue: "Available",
    specialties: "Specialties",
    specialtiesValue: "React, Node.js, Tailwind, REST APIs",
  },

  contact: {
    title: "Let's work together",
    lead: "Have a project in mind, or just want to say hello? I read every message.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Location",
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
  nav: { home: "בית", about: "אודות", stack: "טכנולוגיות", projects: "פרויקטים", blog: "בלוג", contact: "צור קשר" },

  hero: {
    greeting: "היי, אני יעקב!",
    greetingLead: "היי, אני ",
    greetingName: "יעקב",
    greetingTail: "!",
    role: "מפתח Full Stack",
    skillsTicker: ["React", "Node.js", "Next.js", "MongoDB"],
    cta: "בוא נעבוד יחד!",
    ctaMobile: "צור קשר",
    ticker: "יעקב תומא ",
    // See the English dictionary: null until a real number is supplied.
    clients: null,
    photoRing: "✦  גלול למטה  ✦ ובוא נכיר יותר טוב ",
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

  experience: {
    title: "ניסיון",
    items: {
      cloud247: {
        role: "מומחה תמיכת IT",
        detail: "הדרכת צוותים, שיפור תהליכי IT, ניהול שרתים ו-SCCM ופתרון תקלות טכניות מורכבות.",
      },
      primo: {
        role: "איש IT",
        detail: "תמיכה במחשבים ובשרתים, תחזוקת חומרה ותשתיות.",
      },
      lab: {
        role: "יועץ IT ובעל מעבדה",
        detail: "ניהול צוות המעבדה, ניהול מערכות ורשתות, תמיכה בלקוחות ותרומה לצמיחת העסק.",
      },
      it: {
        role: "איש IT",
        detail: "מתן שירותי IT: רשתות, שרתים, אתרים, אבחון תקלות, תמיכה וגיבויים בענן.",
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
    roleValue: "מפתח Full-Stack | React ו-Node.js",
    country: "מדינה",
    countryValue: "ישראל",
    languages: "שפות",
    languagesValue: "עברית, אנגלית",
    experienceLabel: "ניסיון",
    experienceValue: "5+ שנים בהייטק ובפיתוח web",
    freelance: "פרילנס",
    freelanceValue: "פנוי",
    specialties: "התמחויות",
    specialtiesValue: "React, Node.js, Tailwind, REST APIs",
  },

  contact: {
    title: "בוא נעבוד יחד",
    lead: "יש לך פרויקט בראש, או סתם בא לך להגיד שלום? אני קורא כל הודעה.",
    email: "אימייל",
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "מיקום",
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
