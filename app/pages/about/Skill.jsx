"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Skills data (tech stack & tools)
const skillsContent = [
  { skillName: "HTML", avatar: "/svg/html.svg" },
  { skillName: "JavaScript", avatar: "/svg/js.svg" },
  { skillName: "CSS", avatar: "/svg/css.svg" },
  { skillName: "Node.js", avatar: "/svg/node.svg" },
  { skillName: "React", avatar: "/svg/react.svg" },
  { skillName: "React Router", avatar: "/svg/rrd.svg" },
  { skillName: "Next.js", avatar: "/svg/next.svg" },
  { skillName: "REST API", avatar: "/svg/api.svg" },
  { skillName: "MongoDB", avatar: "/svg/mongo.svg" },
  { skillName: "PostgreSQL", avatar: "/svg/pg.svg" },
  { skillName: "Firebase", avatar: "/svg/fb.svg" },
  { skillName: "Supabase", avatar: "/svg/supabase.png" },
  { skillName: "Material UI", avatar: "/svg/mui.svg" },
  { skillName: "Ant Design", avatar: "/svg/ant.svg" },
  { skillName: "DaisyUI", avatar: "/svg/daisyui.png" },
  { skillName: "Tailwind CSS", avatar: "/svg/twcss.svg" },
  { skillName: "Framer Motion", avatar: "/svg/farmer.png" },
  { skillName: "Bootstrap", avatar: "/svg/bs.svg" },
  { skillName: "Photoshop", avatar: "/svg/ps.svg" },
  { skillName: "React Query", avatar: "/svg/query.png" },
  { skillName: "EJS", avatar: "/svg/ejs.png" },
  { skillName: "Redux", avatar: "/svg/redux.svg" },
];

// Animation settings
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Skills = ({ items = skillsContent }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-4 text-center p-4 rounded-2xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Skills and technologies list"
    >
      {items.map((val, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          whileHover={{ scale: 1.08 }}
          className="bg-white/20 w-1/5 flex flex-col items-center justify-center p-4 rounded-lg max-w-[110px] min-w-[110px] shadow-md"
        >
          <Image
            src={val.avatar}
            alt={val.skillName}
            width={50}
            height={50}
            className="mb-2 min-w-[60px] max-w-[60px]"
          />
          <h6 className="uppercase text-sm font-medium">{val.skillName}</h6>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Skills;
