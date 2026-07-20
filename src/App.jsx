const socials = {
  github: "https://github.com/3mrZain7agag",
  linkedin: "https://www.linkedin.com/in/amrhagag-dataeng",
  email: "mailto:amr.hagag.prof@gmail.com",
};

const resumeUrl =
  "https://drive.google.com/drive/folders/10CThsvtWydyQaGhwSJLCj0nMcdP9qp0v?usp=sharing";

function Icon({ name }) {
  const paths = {
    github:
      "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z",
    linkedin:
      "M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.5 8.25h4.3v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.7c0-1.6-.03-3.66-2.23-3.66-2.24 0-2.58 1.75-2.58 3.55V23H8.5V8.25z",
    mail:
      "M2 4h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm10 9L2.4 6H21.6L12 13zm0 2.4L2 8.1V18h20V8.1l-10 7.3z",
    external:
      "M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z",
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function ExternalIcon({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="exp-link-icon"
      aria-hidden="true"
    >
      <path d="M14 3h7v7" />
      <path d="M21 3 10 14" />
      <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function Strata() {
  return (
    <div className="strata" aria-hidden="true">
      <span className="b1" />
      <span className="b2" />
      <span className="b3" />
    </div>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" href="#top">
          Amr <span>Hagag</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a className="nav-resume" href={resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="wrap hero-grid">
        <div className="fade-up">
          <p className="eyebrow">Data Engineer</p>
          <h1 className="hero-name">Amr Hagag</h1>
          <p className="hero-role">Building pipelines people can trust</p>
          <p className="hero-bio">
            I design and build end-to-end data platforms — from raw
            ingestion through orchestration, transformation, and quality
            checks, to analytics and machine learning. Strong foundation in
            Python, SQL, Airflow, and Spark, with a focus on reliable,
            well-tested pipelines over quick hacks.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Work
            </a>
            <a className="btn btn-secondary" href={resumeUrl} target="_blank" rel="noreferrer">
              View Resume
            </a>
            <a className="btn btn-secondary" href="#contact">
              Get In Touch
            </a>
          </div>
          <div className="hero-social">
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
            <a href={socials.email} aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>

        <div className="hero-visual fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="hero-photo-frame">
            <img src="/photos/hero-photo.jpg" alt="Amr Hagag" />
          </div>
          <div className="pipeline-strip" aria-hidden="true">
            <div className="pipeline-row raw">
              <span className="pipeline-row-label">Ingest</span>
              <span className="pipeline-row-value">Raw APIs, files, streams</span>
            </div>
            <div className="pipeline-row refined">
              <span className="pipeline-row-label">Transform</span>
              <span className="pipeline-row-value">Cleaned, validated, modeled</span>
            </div>
            <div className="pipeline-row curated">
              <span className="pipeline-row-label">Serve</span>
              <span className="pipeline-row-value">Dashboards, features, predictions</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function About() {
  const skillGroups = [
    { title: "Languages", items: ["Python", "C++", "SQL"] },
    {
      title: "Data Engineering",
      items: [
        "ETL/ELT",
        "Data Warehousing",
        "Apache Airflow",
        "Apache Spark",
        "dbt",
        "Apache Iceberg",
        "Apache Kafka",
        "SSIS",
      ],
    },
    { title: "Machine Learning", items: ["scikit-learn", "XGBoost", "MLflow", "Feature Engineering"] },
    { title: "Databases & Storage", items: ["PostgreSQL", "SQL Server", "MySQL", "MinIO"] },
    { title: "Cloud & Infrastructure", items: ["Azure", "Databricks", "Docker", "GitHub Codespaces"] },
    { title: "Visualization", items: ["Power BI"] },
  ];

  return (
    <section id="about">
      <div className="wrap">
        <Strata />
        <div className="section-head">
          <h2 className="section-title">About</h2>
        </div>
        <p className="about-text">
          I'm a Junior Data Engineer and DEPI graduate with hands-on
          experience building ETL pipelines, designing data warehouses, and
          implementing cloud-based and lakehouse-style data workflows. I've
          applied these skills across projects in fraud detection, sales
          analytics, and a full end-to-end sports-data platform spanning
          orchestration, streaming, and ML. Awarded 2nd Place in the DEPI
          Data Engineering Track. I'm looking to contribute to teams
          building reliable, production-style data systems.
        </p>
        <div className="skills-block">
          {skillGroups.map((g) => (
            <div className="skill-group" key={g.title}>
              <p className="skill-group-title">{g.title}</p>
              <div className="skill-tags">
                {g.items.map((i) => (
                  <span className="skill-tag" key={i}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const items = [
    {
      date: "Jun 2025 – Dec 2025",
      role: "Data Engineer Trainee",
      org: "DEPI (Digital Egypt Pioneers Initiative)",
      desc:
        "Built ETL pipelines and managed data workflows using Python, SQL Server, and SSIS. Designed scalable workflows with Apache Airflow, Spark, and Azure. Automated daily processes, improving data quality and reporting efficiency. Applied data validation rules across pipelines supporting ML-based fraud detection.",
      tags: ["Python", "SQL Server", "SSIS", "Airflow", "Spark", "Azure"],
    },
    {
      date: "Jul 2024",
      role: "ICPC Regional Contest Participant",
      org: "Menoufia University",
      desc: "Solved algorithmic problems in C++; ranked 104th on Day 2 of the Regional Contest.",
      tags: ["C++", "Algorithms", "Data Structures"],
      link: "https://drive.google.com/file/d/1qRZV10o9HuP--ORBBa01wD4In4DF8B3i/view?usp=sharing",
    },
  ];

  return (
    <section id="experience">
      <div className="wrap">
        <Strata />
        <div className="section-head">
          <h2 className="section-title">Experience</h2>
        </div>
        {items.map((it) => (
          <div className="exp-item" key={it.role}>
            <div className="exp-date">{it.date}</div>
            <div>
              {it.link ? (
                <a className="exp-role" href={it.link} target="_blank" rel="noreferrer">
                  {it.role} <ExternalIcon />
                </a>
              ) : (
                <h3 className="exp-role">{it.role}</h3>
              )}
              <p className="exp-org">{it.org}</p>
              <p className="exp-desc">{it.desc}</p>
              <div className="project-tags">
                {it.tags.map((t) => (
                  <span className="project-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      featured: true,
      badge: "Flagship",
      title: "F1 Data Engineering Platform",
      desc:
        "End-to-end personal platform ingesting Formula 1 historical data (2015–2025) through orchestration, a lakehouse, quality checks, streaming, BI, and machine learning.",
      stats: [
        { value: "10", label: "Pipeline Stages" },
        { value: "0.93", label: "ROC-AUC" },
        { value: "90%", label: "Live Accuracy" },
      ],
      tags: ["Airflow", "PySpark", "Iceberg", "dbt", "Kafka", "Power BI", "XGBoost", "MLflow"],
      link: "https://github.com/3mrZain7agag/f1-data-engineering",
    },
    {
      badge: "2nd Place — DEPI",
      title: "Payment Security – Smart Fraud Detection & Analysis",
      desc:
        "Cleaned and preprocessed a bank transaction dataset, designed a normalized SQL Server database, and built ETL pipelines into a star-schema warehouse. Implemented cloud workflows in Azure & Databricks supporting ML-based fraud prediction.",
      tags: ["Python", "SQL Server", "ETL", "Azure", "Databricks"],
      link: "https://drive.google.com/drive/folders/1EB2G468VK8F-VR88Zhe6v8Zdb13dawSt?usp=sharing",
    },
    {
      title: "Sales Data Mart – SSIS Project",
      desc:
        "ETL from AdventureWorks2022 into a Sales Data Mart, with transformations, validation, and optimized loads for efficiency.",
      tags: ["SSIS", "SQL Server", "Data Warehousing"],
      link: "https://github.com/3mrZain7agag/Building-sales-Data-Mart-using-SSIS",
    },
    {
      title: "Smart E-Commerce Sales Management System",
      desc:
        "Designed a SQL transactional database and built Python preprocessing for data cleaning and validation, improving query performance and reporting efficiency.",
      tags: ["Python", "SQL", "Database Design"],
      link: "https://drive.google.com/drive/folders/1mdo9n3ijctK0-tlSMgBJPRZO2uVhvWKt?usp=sharing",
    },
  ];

  return (
    <section id="projects">
      <div className="wrap">
        <Strata />
        <div className="section-head">
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <div className={`project-card${p.featured ? " featured" : ""}`} key={p.title}>
              <div className="project-title-row">
                <h3 className="project-title">{p.title}</h3>
                {p.badge && <span className="project-badge">{p.badge}</span>}
              </div>
              <p className="project-desc">{p.desc}</p>
              {p.stats && (
                <div className="project-stats">
                  {p.stats.map((s) => (
                    <div className="project-stat" key={s.label}>
                      <span className="project-stat-value">{s.value}</span>
                      <span className="project-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span className="project-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                  View Project <Icon name="external" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const certs = [
    ["Data Engineering Track", "DEPI", "https://drive.google.com/file/d/1OXhOmZftMy6rgAnEVRZCLkfCRreyhoS2/view?usp=sharing"],
    ["Introduction to Data Engineering", "IBM", "https://coursera.org/share/266f1261314964e9b0b4dca283d0c7fe"],
    ["Data Engineer Associate Track", "DataCamp", "https://www.datacamp.com/certificate/DEA0017900181117"],
    ["Introduction to Databases", "Meta", "https://drive.google.com/file/d/1N-DpDZ2TIriJjncvHOy2jlDtK7tb81d5/view?usp=sharing"],
    ["SQL Advanced/Intermediate/Basic", "HackerRank", "https://drive.google.com/file/d/1IcjMyk1EQwzLrYAKITfRWQ1Gh3lOYRfW/view?usp=sharing"],
    ["Machine Learning with Python", "IBM", "https://drive.google.com/file/d/1IcjMyk1EQwzLrYAKITfRWQ1Gh3lOYRfW/view?usp=sharing"],
    ["HCIA-AI", "Huawei", "https://drive.google.com/file/d/1pssvvJFd7aBNq8ilXuT3rD7xX9JNetn9/view?usp=sharing"],
  ];
  return (
    <section id="certificates">
      <div className="wrap">
        <Strata />
        <div className="section-head">
          <h2 className="section-title">Certificates</h2>
        </div>
        <div className="cert-grid">
          {certs.map(([name, issuer, link]) => (
            <a className="cert-item" key={name} href={link} target="_blank" rel="noreferrer">
              <span className="cert-name">
                {name} <ExternalIcon size={12} />
              </span>
              <span className="cert-issuer">{issuer}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="wrap contact">
        <Strata />
        <div className="contact-photo">
          <img src="/photos/contact-photo.jpg" alt="Amr Hagag" />
        </div>
        <h2 className="contact-title">Let's Connect</h2>
        <p className="contact-text">
          I'm always interested in hearing about new opportunities in data
          engineering — whether that's a full-time role, contract work, or
          just a chat about data systems. Feel free to reach out.
        </p>
        <a className="contact-email" href={socials.email}>
          amr.hagag.prof@gmail.com
        </a>
        <div className="contact-social">
          <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href={socials.email} aria-label="Email">
            <Icon name="mail" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">© {new Date().getFullYear()} Amr Hagag.</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
