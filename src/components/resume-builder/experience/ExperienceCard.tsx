"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  generateExperienceDescription,
  improveContent,
} from "@/services/ai.service";

import { IWorkExperience } from "@/types/resume.types";
import AIButton from "../AIButton";

interface Props {
  experience: IWorkExperience;
  index: number;
  onChange: (index: number, data: Partial<IWorkExperience>) => void;
  onRemove: () => void;
}

const levels = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior-level (6+ years)",
];

const ExperienceCard = ({ experience, index, onChange, onRemove }: Props) => {
  const [experienceLevel, setExperienceLevel] = useState(
    "Mid-level (3-5 years)",
  );
  const [yearsOfExperience, setYearsOfExperience] = useState(3);
  const [techStack, setTechStack] = useState("");

  const [generating, setGenerating] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");

  const generateDescription = async () => {
    try {
      setError("");

      const stack = techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (
        !experienceLevel ||
        !yearsOfExperience ||
        !experience.position ||
        !stack.length
      ) {
        setError("Enter job role, experience level, years and tech stack.");
        return;
      }

      setGenerating(true);

      const response = await generateExperienceDescription({
        experienceLevel,
        yearsOfExperience,
        jobRole: experience.position,
        techStack: stack,
      });

      onChange(index, {
        description: response.data.workExperienceDescription,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate description",
      );
    } finally {
      setGenerating(false);
    }
  };

  const improveDescription = async () => {
    if (!experience.description.trim()) return;

    try {
      setImproving(true);

      const response = await improveContent({
        content: experience.description,
      });

      onChange(index, {
        description: response.data.improvedContent,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to improve description",
      );
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="rounded-lg border border-[#D3D0DF] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-[#202034]">
          Experience {index + 1}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-2 text-red-400 transition hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Company"
          value={experience.company}
          onChange={(value) => onChange(index, { company: value })}
        />

        <Field
          label="Job Role"
          value={experience.position}
          onChange={(value) => onChange(index, { position: value })}
        />

        <Field
          label="Start Date"
          value={experience.startDate}
          type="month"
          onChange={(value) => onChange(index, { startDate: value })}
        />

        <Field
          label="End Date"
          value={experience.endDate}
          type="month"
          onChange={(value) => onChange(index, { endDate: value })}
        />
      </div>

      {/* AI panel */}
      <div className="mt-6 rounded-lg border border-[#BDBBFF] bg-[#F1F2FF] p-5">
        <h4 className="font-semibold text-[#202034]">
          Generate Experience Description
        </h4>

        <p className="mt-1 text-sm text-[#55556A]">
          AI will use these fields to generate an 80–120 word description.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

          <div>
            <label className="mb-2 block text-sm font-medium">
              Years of Experience
            </label>

            <input
              type="number"
              min={1}
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(Number(e.target.value))}
              className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium">Tech Stack</label>

            <input
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="React, Node.js, MongoDB, AWS"
              className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

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
            value={experience.description}
            onChange={(e) =>
              onChange(index, {
                description: e.target.value,
              })
            }
            rows={7}
            className="w-full resize-none rounded-lg border border-[#C9C6D8] bg-white px-4 py-4 pb-14 text-sm leading-6 outline-none focus:border-[#5141E5]"
            placeholder="Describe your responsibilities and technical contributions..."
          />

          <button
            type="button"
            onClick={improveDescription}
            disabled={improving || !experience.description}
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
  type?: string;
  onChange: (value: string) => void;
}

const Field = ({ label, value, type = "text", onChange }: FieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-[#242438]">
      {label}
    </label>

    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
    />
  </div>
);

export default ExperienceCard;
