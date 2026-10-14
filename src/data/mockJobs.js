export const initialJobs = [
  {
    id: "job-1",
    title: "Frontend Engineer Intern",
    company: "CloudScale Inc.",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CloudScale",
    location: "Remote",
    type: "internship", // "internship" | "entry-level" | "project"
    workMode: "remote", // "remote" | "hybrid" | "onsite"
    compensation: "$35 - $45 / hr",
    description: "We are seeking a proactive front-end intern to help build next-generation cloud monitoring dashboards using React and Tailwind CSS.",
    requirements: [
      "Familiar with React basics and JavaScript (ES6+)",
      "Understanding of HTML/CSS and responsive design",
      "Git version control experience"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Git"],
    postedAt: "2 hours ago",
    applyUrl: "https://example.com/apply/1"
  },
  {
    id: "job-2",
    title: "Junior Backend Developer",
    company: "DataNode Solutions",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=DataNode",
    location: "Austin, TX (Hybrid)",
    type: "entry-level",
    workMode: "hybrid",
    compensation: "$75,000 - $85,000 / yr",
    description: "Join our team to build lightweight, high-throughput microservices in Node.js and PostgreSQL. Great mentorship program for early-career devs.",
    requirements: [
      "Degree in CS or completed coding bootcamp",
      "Proficient in Node.js/Express and RESTful APIs",
      "Basic SQL knowledge (PostgreSQL preferred)"
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "REST API"],
    postedAt: "1 day ago",
    applyUrl: "https://example.com/apply/2"
  },
  {
    id: "job-3",
    title: "AI Search Assistant (Open Source)",
    company: "Community Tech Lab",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=CommunityTech",
    location: "Global / Remote",
    type: "project",
    workMode: "remote",
    compensation: "Collaborative / Portfolio Project",
    description: "Looking for 3 student developers to co-build an open-source research assistant using Python and FastAPI. Perfect for building your GitHub portfolio.",
    requirements: [
      "Intermediate Python skills",
      "Interest in LLMs and AI integrations",
      "Willingness to commit 5-10 hours/week"
    ],
    tags: ["Python", "FastAPI", "Open Source", "AI"],
    postedAt: "3 days ago",
    applyUrl: "https://github.com"
  }
];