import React from "react";

const achievementsContent = [
  { title: "12", subTitle1: "years of", subTitle2: "experience" },
  { title: "97", subTitle1: "completed", subTitle2: "projects" },
  { title: "81", subTitle1: "Happy", subTitle2: "customers" },
  { title: "53", subTitle1: "awards", subTitle2: "won" },
];

const Achievements = () => {
  return (
    <div className="flex flex-wrap gap-4 h-full">
      {achievementsContent.map((val, i) => (
        <div className="stats shadow flex-2/6 p-4 bg-gray-600/50" key={i}>
          <div className="stat text-white p-4 rounded-lg">
            <div className="stat-title">{val.subTitle2}</div>
            <div className="stat-value">{val.title}</div>
            <div className="stat-desc">{val.subTitle1}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
