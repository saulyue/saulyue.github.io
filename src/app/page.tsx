import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SectionHead from "@/components/SectionHead";
import SkillCloud from "@/components/SkillCloud";
import Timeline from "@/components/Timeline";
import ProjectCard from "@/components/ProjectCard";
import { getSkills, getExperiences, getProjects } from "@/lib/data";

export default function HomePage() {
  const skillsRaw = getSkills();
  const skills = Object.entries(skillsRaw).map(([, group]) => ({
    category: group.label,
    skills: group.items,
  }));
  const experiences = getExperiences();
  const projects = getProjects();

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Stats */}
      <Stats />

      {/* About */}
      <section id="about" className="py-24 relative z-[1]">
        <div className="max-w-[1080px] mx-auto px-8">
          <SectionHead num="01" title="关于我" />

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 items-start">
            {/* Avatar */}
            <div>
              <div className="w-full aspect-square rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)] flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl relative z-[1]">🧑‍💻</span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.68rem] text-[var(--t-secondary)] tracking-wider">
                  saulyue
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {["湖北美术学院", "艺术设计", "2016 届"].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[0.68rem] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--t-secondary)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4 text-[var(--t-secondary)] text-[0.97rem] leading-relaxed">
              <p>
                我是{" "}
                <strong className="text-[var(--t-primary)] font-medium">
                  乐祥孚（saulyue）
                </strong>
                ，腾讯云前端开发工程师，专注于
                <strong className="text-[var(--t-primary)] font-medium">
                  云市场 / 云应用
                </strong>
                平台的前端基础建设与核心业务交付。
              </p>
              <p>
                拥有
                <strong className="text-[var(--t-primary)] font-medium">
                  艺术设计专业背景
                </strong>
                ，对视觉细节有执念；同时热衷工程效能，在 CI/CD
                优化、性能诊断与 DevOps 实践上均有实际落地。
              </p>
              <p>
                日常以{" "}
                <strong className="text-[var(--t-primary)] font-medium">
                  React / Vue 3 / TypeScript
                </strong>{" "}
                构建复杂 B 端中台；用{" "}
                <strong className="text-[var(--t-primary)] font-medium">
                  Node.js / Go
                </strong>{" "}
                搭建 BFF 与微服务。近年来积极探索{" "}
                <strong className="text-[var(--t-primary)] font-medium">
                  AI 辅助开发
                </strong>
                （Claude Code、MCP Server）在真实研发场景中的落地。
              </p>
              <p className="italic text-[var(--t-primary)]">
                相信好的前端工程师既是设计师又是建筑师——让用户感觉不到技术的存在，才是最好的技术。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 relative z-[1]">
        <div className="max-w-[1080px] mx-auto px-8">
          <SectionHead num="02" title="技术栈" />
          <SkillCloud groups={skills} />
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 relative z-[1]">
        <div className="max-w-[1080px] mx-auto px-8">
          <SectionHead num="03" title="工作经历" />
          <Timeline experiences={experiences} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 relative z-[1]">
        <div className="max-w-[1080px] mx-auto px-8">
          <SectionHead num="04" title="项目" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.name}
                project={{
                  title: project.name,
                  description: project.description,
                  tags: project.techs,
                  image: project.image || undefined,
                  href: project.url || undefined,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-24 relative z-[1] border-t border-[var(--border)]"
      >
        <div className="max-w-[1080px] mx-auto px-8">
          <div className="max-w-[520px] mx-auto text-center">
            <SectionHead num="05" title="联系我" />
            <h3 className="font-serif text-4xl md:text-5xl font-normal tracking-tight leading-tight mt-8 mb-4">
              一起构建
              <br />
              更好的产品
            </h3>
            <p className="text-[var(--t-secondary)] leading-relaxed mb-10">
              欢迎技术交流、项目合作或工作机会探讨。
              <br />
              我通常在 24 小时内回复。
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="mailto:saulcsy@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-[var(--accent)] text-[var(--accent-text)] hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                ✉ 发邮件
              </a>
              <a
                href="https://github.com/saulyue"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border-strong)] text-[var(--t-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all"
              >
                ↗ GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
