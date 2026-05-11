/**
 * Brand-accurate accent colors for technologies surfaced on skill pills.
 * Returns an HSL string so we can interpolate alpha cleanly in JSX.
 *
 * Falls back through:
 *   1. Exact match
 *   2. Lowercase normalised match
 *   3. Category-derived fallback hue
 *   4. Foreground (the design-system neutral)
 */

export type TechAccent = {
  /** CSS color (HSL preferred) */
  color: string;
  /** Soft tinted background for the hover pill */
  bg: string;
  /** Soft border for the hover pill */
  border: string;
  /** Glow box-shadow */
  glow: string;
};

const PALETTE: Record<string, string> = {
  // Languages
  python: "47 95% 60%",
  java: "16 95% 56%",
  c: "210 70% 55%",
  "c++": "215 75% 60%",
  javascript: "47 95% 60%",
  typescript: "212 75% 55%",
  r: "210 75% 55%",
  shell: "150 60% 55%",

  // AI / ML
  pytorch: "16 90% 56%",
  tensorflow: "30 95% 55%",
  keras: "0 75% 55%",
  "scikit-learn": "30 95% 60%",
  "hugging face": "47 95% 60%",
  langchain: "150 65% 50%",
  langgraph: "150 65% 50%",
  transformers: "265 75% 65%",
  llms: "265 75% 65%",
  rag: "265 75% 65%",
  graphrag: "210 80% 60%",
  sbert: "265 75% 65%",
  opencv: "210 80% 60%",
  spacy: "150 65% 55%",
  nltk: "150 65% 55%",

  // Backend
  "node.js": "120 50% 45%",
  "express.js": "0 0% 70%",
  fastapi: "165 80% 40%",
  flask: "0 0% 25%",
  "rest apis": "265 60% 65%",
  sqlalchemy: "0 80% 55%",
  pyspark: "16 90% 56%",
  postman: "16 90% 56%",

  // Frontend
  "react.js": "195 90% 55%",
  "next.js": "0 0% 0%",
  html: "16 90% 56%",
  css: "215 80% 60%",
  streamlit: "0 80% 60%",
  "android studio": "150 65% 50%",
  xml: "210 75% 55%",
  vite: "265 80% 65%",

  // Databases
  postgresql: "210 70% 50%",
  mysql: "210 70% 50%",
  mongodb: "120 60% 45%",
  firebase: "35 95% 55%",
  neo4j: "210 80% 60%",
  sql: "210 70% 55%",
  nosql: "150 60% 50%",

  // Cloud / DevOps
  "aws (ec2, s3, elastic beanstalk)": "30 95% 55%",
  "google cloud platform": "210 80% 60%",
  docker: "200 80% 55%",
  kubernetes: "215 80% 60%",
  "github actions": "265 65% 65%",
  "ci/cd": "150 65% 55%",

  // Tools
  git: "16 90% 56%",
  github: "265 50% 60%",
  matlab: "16 90% 56%",
  jupyter: "30 95% 55%",
  "vs code": "210 80% 55%",

  // Research
  "self-attention": "265 75% 65%",
  "neural odes": "200 80% 55%",
  "autoencoders / vaes": "265 75% 65%",
  gans: "305 80% 65%",
  "time-series forecasting": "150 65% 55%",
  "facebook prophet": "210 70% 55%",
};

const CATEGORY_HUE: Record<string, string> = {
  Languages: "47 95% 60%",
  "AI / ML": "265 75% 65%",
  Backend: "150 65% 50%",
  Frontend: "195 90% 55%",
  Databases: "210 75% 55%",
  "Cloud / DevOps": "30 95% 55%",
  Tools: "265 65% 60%",
  Research: "305 80% 65%",
};

export function getTechAccent(
  name: string,
  category?: string
): TechAccent {
  const key = name.toLowerCase().trim();
  const hsl =
    PALETTE[key] ??
    PALETTE[key.split(" ")[0]] ??
    (category ? CATEGORY_HUE[category] : undefined) ??
    "0 0% 90%";

  return {
    color: `hsl(${hsl})`,
    bg: `hsl(${hsl} / 0.12)`,
    border: `hsl(${hsl} / 0.55)`,
    glow: `0 0 16px -2px hsl(${hsl} / 0.55), inset 0 0 0 1px hsl(${hsl} / 0.25)`,
  };
}

export function getCategoryAccent(category: string): TechAccent {
  const hsl = CATEGORY_HUE[category] ?? "0 0% 90%";
  return {
    color: `hsl(${hsl})`,
    bg: `hsl(${hsl} / 0.12)`,
    border: `hsl(${hsl} / 0.55)`,
    glow: `0 0 20px -2px hsl(${hsl} / 0.5)`,
  };
}
