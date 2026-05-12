/**
 * Single source of truth for portfolio content.
 * Extracted verbatim from Shubham Hadawle's resume (Dec 2025) and elevated
 * for recruiter readability without inventing experience.
 */

export const personal = {
  name: "Shubham Hadawle",
  initials: "SH",
  title: "MS in Computer Science · Software · AI/ML · Data Science",
  tagline:
    "Engineering AI systems, scalable backends, and production-grade software at the intersection of research and product.",
  location: "Boston, MA · Open to relocation",
  email: "hadawle.s@northeastern.edu",
  phone: "+1 857-200-0738",
  availability:
    "Open to Summer 2027 SWE/ML Internships & Spring 2027 / Fall 2027 Co-ops",
  roles: [
    "Software Engineer",
    "ML Engineer",
    "Data Scientist",
    "AI Researcher",
    "Fullstack Developer",
  ],
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/shubham-hadawle",
    linkedin: "https://www.linkedin.com/in/shubham-hadawle/",
    androidPortfolio:
      "https://play.google.com/store/apps/dev?id=5140541035203910219&pli=1",
    site: "https://hadawles.sites.northeastern.edu/",
    email: "mailto:hadawle.s@northeastern.edu",
  },
} as const;

export const education = [
  {
    school: "Northeastern University · Khoury College of Computer Sciences",
    degree: "Master of Science in Computer Science",
    location: "Boston, MA",
    period: "Expected Dec 2027",
    courses: [
      "Programming Design Paradigms",
      "Database Management Systems",
      "Algorithms",
      "ML Ops",
      "Natural Language Processing",
    ],
  },
  {
    school: "University of Mumbai",
    degree: "Bachelor of Engineering, Artificial Intelligence & Data Science",
    location: "Mumbai, India",
    period: "Jul 2020 – Jun 2024",
    courses: [
      "Machine Learning",
      "Artificial Intelligence",
      "Python",
      "Data Structures",
      "Object Oriented Programming (Java)",
    ],
  },
] as const;

export const stats = [
  { label: "Years engineering", value: "4+" },
  { label: "Research experiences", value: "2" },
  { label: "App downloads", value: "1,000+" },
  { label: "Model accuracy", value: "96.7%" },
] as const;

export const techStack = {
  Languages: [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "R",
    "Shell",
  ],
  "AI / ML": [
    "PyTorch",
    "TensorFlow",
    "Keras",
    "Scikit-Learn",
    "Hugging Face",
    "LangChain",
    "LangGraph",
    "Transformers",
    "LLMs",
    "RAG",
    "GraphRAG",
    "SBERT",
    "OpenCV",
    "spaCy",
    "NLTK",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "FastAPI",
    "Flask",
    "REST APIs",
    "SQLAlchemy",
    "PySpark",
    "Postman",
  ],
  Frontend: [
    "React.js",
    "Next.js",
    "HTML",
    "CSS",
    "Streamlit",
    "Android Studio",
    "XML",
    "Vite",
  ],
  Databases: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Neo4j",
    "SQL",
    "NoSQL",
  ],
  "Cloud / DevOps": [
    "AWS (EC2, S3, Elastic Beanstalk)",
    "Google Cloud Platform",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "CI/CD",
  ],
  Tools: ["Git", "GitHub", "MATLAB", "Postman", "Jupyter", "VS Code"],
  Research: [
    "Self-Attention",
    "Transformers",
    "Neural ODEs",
    "Autoencoders / VAEs",
    "GANs",
    "Time-Series Forecasting",
    "Facebook Prophet",
  ],
} as const;

export const experience = [
  {
    company: "Motilal Oswal Financial Services",
    role: "Software Engineer · Machine Learning Intern",
    period: "Sept 2025 – Nov 2025",
    location: "Mumbai, India",
    summary:
      "Built a hybrid spatial–semantic clustering pipeline that powered an internal RAG retrieval stack for large-scale financial research PDFs.",
    bullets: [
      "Designed a hybrid spatial-semantic document clustering pipeline that automated processing of thousands of financial research PDFs, materially lifting retrieval quality for the firm's internal RAG systems.",
      "Implemented hierarchical agglomerative clustering on SBERT transformer embeddings to produce accurate, context-preserving chunks with 72% chunk coverage on noisy long-document corpora.",
      "Hardened the pipeline with rigorous error analysis and instrumented debugging to keep ingestion deterministic across heterogeneous document layouts.",
    ],
    stack: [
      "Python",
      "SBERT",
      "Transformers",
      "HAC",
      "RAG",
      "scikit-learn",
      "PyTorch",
    ],
  },
  {
    company: "Axis Bank",
    role: "AI / ML Engineer Intern",
    period: "May 2025 – Aug 2025",
    location: "Mumbai, India",
    summary:
      "Engineered a GraphRAG-backed Text-to-SQL layer over the bank's investment-reporting knowledge graph, reducing structured query load on analysts.",
    bullets: [
      "Engineered a GraphRAG system that fused knowledge graphs with retrieval-augmented LLM prompting to deliver context-aware answers across regulatory and investment documents.",
      "Mapped natural-language analyst queries to SQL over Neo4j schema graphs of financial and investment data, reducing manual SQL authoring load for downstream analytics teams.",
      "Iterated on graph construction, prompt grounding, and evaluation harnesses to keep response faithfulness high on adversarial finance prompts.",
    ],
    stack: [
      "GraphRAG",
      "LLMs",
      "Neo4j",
      "LangChain",
      "Python",
      "Text-to-SQL",
    ],
  },
  {
    company: "Bhabha Atomic Research Centre (BARC)",
    role: "Software Engineer Intern · Data Science",
    period: "Nov 2023 – Jan 2024",
    location: "Mumbai, India",
    summary:
      "Applied deep neural networks to solve point kinetic equations governing Uranium-235 reactor dynamics — a research-driven simulation engineering role.",
    bullets: [
      "Built LSTM, Autoencoder, VAE, and Neural-ODE models (torchdyn / torchdiffeq) to solve the point kinetic equations governing Uranium-235 nuclear reactor behaviour.",
      "Automated previously manual numerical workflows in NumPy / SciPy / TensorFlow / PyTorch, materially shortening simulation iteration cycles for the research team.",
      "Tuned Adam-optimized loss landscapes via cross-domain adaptation, driving training loss from 1.19520 down to 0.00062.",
    ],
    stack: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "torchdiffeq",
      "Neural ODEs",
      "LSTMs",
      "VAEs",
      "Python",
    ],
  },
  {
    company: "Stocc Guru",
    role: "Software Development Engineer Intern",
    period: "Jul 2021 – Sept 2021",
    location: "Mumbai, India",
    summary:
      "Shipped Android + backend features for a FinTech social platform focused on stock-market literacy and real-time market data.",
    bullets: [
      "Built native Android features for a FinTech social product promoting stock-market literacy, surfacing live equity, derivatives, pricing and news analytics.",
      "Implemented Flask + REST + JSON backends and validated them via Postman, cutting end-to-end request latency by 2.4%.",
      "Wired CI/CD on GitHub Actions and refactored services to SOLID boundaries, making the deployment loop automated and predictable.",
    ],
    stack: [
      "Java",
      "Android",
      "XML",
      "Python",
      "Flask",
      "REST APIs",
      "Postman",
      "GitHub Actions",
    ],
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  links: { label: string; href: string }[];
  featured?: boolean;
  category: "AI / ML" | "Full-Stack" | "Mobile" | "Research";
  /**
   * Optional screenshot/cover image path under /public.
   * Drop a file at /public/projects/<slug>.png and set this string.
   * If absent, an animated artistic placeholder is rendered.
   */
  image?: string;
  /** Natural pixel width of the image — used to pin container aspect-ratio. */
  imageWidth?: number;
  /** Natural pixel height of the image. */
  imageHeight?: number;
  /** Hue (0–360) used to tint the project's placeholder + halo */
  accentHue: number;
};

export const projects: Project[] = [
  {
    slug: "duck-platformer",
    title: "Where is my Duck? — Platformer Game",
    subtitle: "Cross-platform 2D platformer · 1,000+ installs · 4.7★ rating",
    problem:
      "Ship a polished, monetised 2D platformer to both mobile and desktop and validate a real distribution & ads stack end-to-end.",
    solution:
      "Designed, built, and published a GDevelop5 platformer to Google Play, itch.io and standalone Windows/Linux/macOS builds, with AdMob monetisation and CTR-tuned ad placements.",
    highlights: [
      "Designed & published the title to Google Play and as Win/Linux/macOS desktop builds, sustaining a 4.7/5 rating across stores.",
      "Monetised the Android build via Google AdMob with strategically placed interstitial + banner units.",
      "A/B-tested ad frequency to drive a +15% click-through rate without harming retention.",
    ],
    stack: ["GDevelop5", "Android", "Google AdMob", "A/B Testing"],
    metrics: [
      { label: "Installs", value: "1,000+" },
      { label: "Rating", value: "4.7 / 5" },
      { label: "CTR uplift", value: "+15%" },
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.shubhamslab.duck",
      },
      {
        label: "Desktop (itch.io)",
        href: "https://shubham-hadawle.itch.io/where-is-my-duck",
      },
    ],
    featured: true,
    category: "Mobile",
    accentHue: 35,
    image: "/wimd_project_image.png",
    imageWidth: 1024,
    imageHeight: 500,
  },
  {
    slug: "question-paper-t5",
    title: "Question Paper Generation from Handwritten Notes",
    subtitle: "OCR + T5 Transformer · MCQ / Short-Answer / True-False",
    problem:
      "Educators spend hours converting handwritten notes into structured assessments. Automate the loop from scanned page to exam-ready paper.",
    solution:
      "Fused Google Cloud Vision OCR with a fine-tuned T5 transformer for summarisation + question generation, served via a Python application producing exam-ready PDFs.",
    highlights: [
      "Combined Google Cloud Vision OCR with a T5 transformer fine-tuned for text summarisation and question generation.",
      "Generated MCQ / short-answer / True-False questions from scanned notes and emitted formatted PDF / Word papers in under 2 minutes.",
      "Built around an educator-first workflow: upload notes → review questions → export the finished paper.",
    ],
    stack: ["Python", "T5", "Transformers", "Google Cloud Vision", "OCR", "PyTorch"],
    metrics: [
      { label: "Latency", value: "< 2 min" },
      { label: "Question types", value: "3" },
      { label: "Pipeline", value: "OCR → T5" },
    ],
    links: [],
    featured: true,
    category: "AI / ML",
    accentHue: 265,
    image: "/questionpaper_project_image.png",
    imageWidth: 1408,
    imageHeight: 768,
  },
  {
    slug: "anomaly-prophet",
    title: "Anomaly Detection in Multivariate Time-Series",
    subtitle: "Facebook Prophet · Unsupervised ML · AWS Elastic Beanstalk",
    problem:
      "Detect anomalies in advertising KPIs (CPC, CPM) where labels are unreliable and seasonality dominates the signal.",
    solution:
      "Forecast each KPI with Facebook Prophet and flag deviations from predicted intervals as anomalies; deployed as a scalable service on AWS Elastic Beanstalk.",
    highlights: [
      "Built a Prophet-based forecasting model and treated residuals as the anomaly signal — no labels required.",
      "Iteratively tuned seasonality, changepoints and holiday priors to hit 96.7% detection accuracy on real ad-KPI streams.",
      "Deployed to AWS Elastic Beanstalk for real-time, horizontally scalable inference.",
    ],
    stack: ["Python", "Facebook Prophet", "Pandas", "AWS Elastic Beanstalk"],
    metrics: [
      { label: "Accuracy", value: "96.7%" },
      { label: "KPIs covered", value: "CPC · CPM" },
      { label: "Deploy", value: "AWS EB" },
    ],
    links: [
      {
        label: "Research Paper",
        href: "https://link.springer.com/chapter/10.1007/978-3-031-35644-5_16",
      },
    ],
    featured: true,
    category: "AI / ML",
    accentHue: 200,
    image: "/anomaly_project_image.png",
    imageWidth: 1474,
    imageHeight: 605,
  },
  {
    slug: "indic-summarization",
    title: "Text Summarization of Traditional Indian Languages",
    subtitle: "Transformer · Self-Attention · Low-Resource Indic NLP",
    problem:
      "Existing sequential models like IndicBART struggle with morphologically rich, low-resource Indic languages — particularly on summarisation faithfulness.",
    solution:
      "Authored a transformer-based abstractive summariser with a self-attention mechanism re-engineered around morphology-aware positional encoding.",
    highlights: [
      "Led research on transformer-based abstractive summarisation for low-resource regional Indic languages.",
      "Re-engineered positional encoding inside self-attention to respect morphologically rich tokenisations.",
      "Beat IndicBART on ROUGE and reached BLEU 0.62 on a 1,000+ newspaper corpus.",
    ],
    stack: ["PyTorch", "Transformers", "Self-Attention", "Indic NLP"],
    metrics: [
      { label: "BLEU", value: "0.62" },
      { label: "Dataset", value: "1,000+ articles" },
      { label: "Baseline beat", value: "IndicBART" },
    ],
    links: [
      {
        label: "Research Paper",
        href: "https://link.springer.com/chapter/10.1007/978-981-97-9112-5_29",
      },
    ],
    featured: true,
    category: "Research",
    accentHue: 305,
    image: "/transformer_project_image.png",
    imageWidth: 1400,
    imageHeight: 806,
  },
  {
    slug: "mixmaster",
    title: "MixMaster — Full-Stack Cocktail Database Platform",
    subtitle: "React · FastAPI · MySQL · Dockerised full-stack",
    problem:
      "Build a production-grade, normalised full-stack reference app with real CRUD, real auth, and graceful degradation when the API layer fails.",
    solution:
      "Architected a 3NF MySQL schema, FastAPI service layer, and a React + Vite client with optimistic updates and seamless in-memory fallback.",
    highlights: [
      "Architected a 3NF relational schema with complex many-to-many relations across cocktails, users and reviews exposed through RESTful endpoints.",
      "Implemented client-side search, multi-dimensional filtering, session-persistent auth and live analytics dashboards.",
      "Engineered optimistic UI with real-time sync and automatic fallback to in-memory data when the API layer is unavailable.",
    ],
    stack: ["React.js", "FastAPI", "MySQL", "SQLAlchemy", "Vite", "Docker"],
    metrics: [
      { label: "DB form", value: "3NF" },
      { label: "Resilience", value: "Offline fallback" },
      { label: "Container", value: "Dockerised" },
    ],
    links: [
      { label: "Live App", href: "https://cocktails-database.vercel.app/" },
    ],
    featured: true,
    category: "Full-Stack",
    accentHue: 165,
    image: "/cocktail_project_image.jpg",
    imageWidth: 800,
    imageHeight: 400,
  },
];

export const research = [
  {
    title:
      "Anomaly Detection in Multi-variate Time Series Data using Facebook Prophet",
    venue: "Springer · Lecture Notes in Networks and Systems",
    year: "2023",
    doi: "10.1007/978-3-031-35644-5_16",
    href: "https://link.springer.com/chapter/10.1007/978-3-031-35644-5_16",
    abstract:
      "Develops an unsupervised forecasting approach using Facebook (Meta) Prophet to identify anomalies in multivariate advertising KPIs (CPC, CPM). The model reached 96.7% accuracy after iterative tuning and was deployed on AWS Elastic Beanstalk for real-time inference.",
    tags: ["Time-Series", "Prophet", "Unsupervised", "AWS"],
  },
  {
    title:
      "Text Summarization of Traditional Indian Languages using a Self-Attention Mechanism",
    venue: "Springer · Lecture Notes in Networks and Systems",
    year: "2024",
    doi: "10.1007/978-981-97-9112-5_29",
    href: "https://link.springer.com/chapter/10.1007/978-981-97-9112-5_29",
    abstract:
      "Proposes a transformer-based abstractive summariser with a self-attention mechanism tuned for morphologically rich, low-resource Indic languages. The model outperforms IndicBART on ROUGE and achieves BLEU 0.62 on a 1,000+ newspaper dataset.",
    tags: ["NLP", "Transformers", "Self-Attention", "Indic Languages"],
  },
] as const;

export const currentlyExploring = [
  "Agentic LLM systems & tool-use orchestration",
  "Production GraphRAG retrieval over enterprise knowledge graphs",
  "Distributed training & inference for transformer workloads",
  "Evaluation harnesses for grounded, faithful LLM outputs",
] as const;

export const githubStats = {
  username: "shubham-hadawle",
  metrics: [
    { label: "Public repos", value: "30+" },
    { label: "Languages", value: "Python · TS · Java" },
    { label: "Focus", value: "AI · Backend · Full-Stack" },
    { label: "Open to", value: "Collabs · Research" },
  ],
} as const;
