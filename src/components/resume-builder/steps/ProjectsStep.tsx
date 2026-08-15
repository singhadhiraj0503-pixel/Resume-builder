"use client";

import { Plus } from "lucide-react";
import { IProjects } from "@/types/resume.types";

import { ResumeBuilderStepProps } from "../types";
import ProjectCard from "../projects/ProjectCard";

const emptyProject: IProjects = {
  title: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  techStack: [],
};

const ProjectsStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const projects = resume.projects || [];

  const addProject = () => {
    updateResume({
      projects: [...projects, { ...emptyProject }],
    });
  };

  const updateProject = (index: number, data: Partial<IProjects>) => {
    const updated = [...projects];

    updated[index] = {
      ...updated[index],
      ...data,
    };

    updateResume({
      projects: updated,
    });
  };

  const removeProject = (index: number) => {
    updateResume({
      projects: projects.filter((_, i) => i !== index),
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Projects
      </h1>

      <p className="mt-2 text-[16px] leading-7 text-[#44445A]">
        Showcase projects and use AI to create concise technical descriptions.
      </p>

      <div className="mt-8 space-y-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onChange={updateProject}
            onRemove={() => removeProject(index)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#9B98B5] px-5 py-3 text-sm text-[#3526D9]"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </section>
  );
};

export default ProjectsStep;
