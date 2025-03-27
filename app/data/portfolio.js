//Portfolio images
import Image1 from "@/public/portfolio/ora.jpg";
import Image2 from "@/public/portfolio/iresale.jpg";
import Image3 from "@/public/portfolio/portfolio.jpg";

export const portfolio = [
  {
    id: 1,
    type: "ORA Holiday Apartments",
    image: Image1,
    tag: ["customer"],
    delayAnimation: "0",
    modalDetails: [
      {
        project: "Website",
        client: "ORA Holiday Apartments",
        language: "WIX",
        preview: "oraholidayapartments.co.il",
        link: "https://www.oraholidayapartments.co.il/",
        title: "Vacation Apartment Rental Website",
        description:
          "Developed a modern and informative website for ORA Holiday Apartments using WIX. The site features a clean, responsive layout that showcases available vacation rentals, highlights local attractions, and provides clear booking information. Optimized for user experience and ease of navigation, the website helps attract and convert potential guests effectively.",
      },
    ],
  },
  {
    id: 2,
    type: "iResale",
    image: Image2,
    tag: ["projects"],
    delayAnimation: "100",
    modalDetails: [
      {
        project: "Website",
        client: "Myself",
        language: "React",
        preview: "iresale.com",
        link: "https://www.iresale.com",
        title: "Second-Hand iPhone Marketplace Web App",
        description:
          "Second-Hand iPhone Marketplace Web App. Built a responsive web application for buying and selling second-hand iPhones. The platform allows users to register, log in, and fully manage their own listings using full CRUD functionality. Key features include: User Authentication: Secure user sign-up and login using Firebase Authentication. Post Management: Authenticated users can create, read, update, and delete their own iPhone listings. Dynamic Routing: Implemented with React Router DOM (RRD) for smooth navigation and user-specific routes. State & Data Management: Used React Query for efficient server state management and real-time updates. Frontend Technologies: Developed with React and styled using Tailwind CSS for a modern and responsive UI. Backend & Storage: Firebase used for database and image storage.",
      },
    ],
  },
  {
    id: 3,
    type: "Portfolio",
    image: Image3,
    tag: ["projects"],
    delayAnimation: "200",
    modalDetails: [
      {
        project: "Website",
        client: "Myself",
        language: "Next JS",
        preview: "yakovtome.com",
        link: "https://www.yakovtome.com",
        title: "Personal Portfolio Website",
        description:
          "A personal portfolio website built with Next.js and styled using Tailwind CSS and Framer Motion. The site showcases my latest web development projects, professional blog posts, and contact information. It includes dynamic routing, responsive design, and an organized layout featuring About, Portfolio, Blog, and Contact pages. Context API is used for state management to enhance interactivity and user experience.",
      },
    ],
  },
];
