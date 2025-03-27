import { VscPassFilled } from "react-icons/vsc";

const educationContent = [
  {
    year: "2015",
    degree: "ENGINEERING DEGREE",
    institute: "OXFORD UNIVERSITY",
    details: `Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore
        adipisicing elit`,
  },
  {
    year: "2012",
    degree: "MASTER DEGREE",
    institute: "KIEV UNIVERSITY",
    details: `Lorem incididunt dolor sit amet, consectetur eiusmod dunt doldunt dol
        elit, tempor incididunt`,
  },
  {
    year: "2009",
    degree: "BACHELOR DEGREE",
    institute: "TUNIS HIGH SCHOOL",
    details: `Lorem ipsum dolor sit amet, tempor incididunt ut laboreconsectetur
        elit, sed do eiusmod tempor duntt`,
  },
];

const Timeline = ({ list = educationContent }) => {
  return (
    <>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {list.map((item, index) => (
          <li key={index}>
            <div className="timeline-middle">
              <span className="timeline-icon">
                <i>
                  <img src="/svg/pass.svg" width={30} />
                </i>
              </span>
            </div>
            <div
              className={`mb-10  ${
                index % 2 === 0
                  ? "timeline-start md:text-end"
                  : "timeline-end md:text-start"
              }`}
            >
              <time className="font-mono italic">{item.year}</time>
              <div className="text-lg font-black">{item.institute}</div>
              {item.details}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Timeline;
