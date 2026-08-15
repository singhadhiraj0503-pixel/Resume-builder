"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  generateProjectDescription,
  improveContent,
} from "@/services/ai.service";

import { IProjects } from "@/types/resume.types";
import AIButton from "../AIButton";

interface Props {
  project: IProjects;
  index: number;
  onChange: (index: number, data: Partial<IProjects>) => void;
  onRemove: () => void;
}

const levels = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior-level (6+ years)",
];

const ProjectCard = ({ project, index, onChange, onRemove }: Props) => {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    "Mid-level (3-5 years)",
  );
  const [techStackInput, setTechStackInput] = useState(
    project.techStack.join(", "),
  );

  const [generating, setGenerating] = useState(false);
  const [improving, setImproving] = useState(false);

  const updateTechStack = (value: string) => {
    setTechStackInput(value);

    const techStack = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    onChange(index, { techStack });
  };

  const generateDescription = async () => {
    try {
      if (!jobTitle || !experienceLevel || !project.techStack.length) {
        return;
      }

      setGenerating(true);

      const response = await generateProjectDescription({
        experienceLevel,
        jobTitle,
        techStack: project.techStack,
      });

      onChange(index, {
        description: response.data.projectDescription,
      });
    } catch (error) {
      console.error("Project description generation failed:", error);
    } finally {
      setGenerating(false);
    }
  };

  const improveDescription = async () => {
    if (!project.description) return;

    try {
      setImproving(true);

      const response = await improveContent({
        content: project.description,
      });

      onChange(index, {
        description: response.data.improvedContent,
      });
    } catch (error) {
      console.error("Project improvement failed:", error);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#D3D0DF] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#202034]">
          Project {index + 1}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-2 text-red-400 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Project Title"
          value={project.title}
          onChange={(value) => onChange(index, { title: value })}
        />

        <Field
          label="GitHub URL"
          value={project.githubUrl}
          onChange={(value) => onChange(index, { githubUrl: value })}
        />

        <Field
          label="Live URL"
          value={project.liveUrl}
          onChange={(value) => onChange(index, { liveUrl: value })}
        />

        <Field
          label="Tech Stack"
          value={techStackInput}
          placeholder="React, Node.js, MongoDB"
          onChange={updateTechStack}
        />
      </div>

      {/* AI */}
      <div className="mt-6 rounded-lg border border-[#BDBBFF] bg-[#F1F2FF] p-5">
        <h4 className="font-semibold text-[#202034]">
          Generate Project Description
        </h4>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Target Job Title
            </label>

            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Engineer"
              className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Experience Level
            </label>

            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
            >
              {levels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <AIButton onClick={generateDescription} loading={generating}>
            Generate Description
          </AIButton>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">Description</label>

        <div className="relative">
          <textarea
            value={project.description}
            onChange={(e) =>
              onChange(index, {
                description: e.target.value,
              })
            }
            rows={6}
            className="w-full resize-none rounded-lg border border-[#C9C6D8] px-4 py-4 pb-14 text-sm leading-6 outline-none focus:border-[#5141E5]"
            placeholder="Describe the project..."
          />

          <button
            type="button"
            onClick={improveDescription}
            disabled={improving || !project.description}
            className="absolute bottom-3 right-3 rounded-md border border-[#C9C6D8] bg-white px-3 py-2 text-xs disabled:opacity-50"
          >
            {improving ? "Improving..." : "Improve with AI"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Field = ({ label, value, placeholder, onChange }: FieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>

    <input
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
    />
  </div>
);

export default ProjectCard;
