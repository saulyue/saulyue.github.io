import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const dataDir = path.join(process.cwd(), "content/data");

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Experience {
  company: string;
  company_en: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  techs: string[];
  url: string;
  image: string;
}

export function getSkills(): Record<string, SkillGroup> {
  const filePath = path.join(dataDir, "skills.yaml");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw) as Record<string, SkillGroup>;
  return parsed;
}

export function getExperiences(): Experience[] {
  const filePath = path.join(dataDir, "experiences.yaml");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw) as Experience[];
  return parsed;
}

export function getProjects(): Project[] {
  const filePath = path.join(dataDir, "projects.yaml");
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = yaml.load(raw) as Project[];
  return parsed;
}
