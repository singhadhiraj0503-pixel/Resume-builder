"use client";

import { useState } from "react";
import { WandSparkles, Sparkles } from "lucide-react";

import { generateSummary, improveContent } from "@/services/ai.service";
import { ResumeBuilderStepProps } from "../types";
import AIButton from "../AIButton";

const experienceLevels = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior-level (6+ years)",
];

const SummaryStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    "Mid-level (3-5 years)",
  );
  const [skillsInput, setSkillsInput] = useState("");

  const [generating, setGenerating] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    try {
      setError("");

      const skills = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      if (!jobTitle || !skills.length || !experienceLevel) {
        setError("Please fill all AI generation fields.");
        return;
      }

      setGenerating(true);

      const response = await generateSummary({
        experienceLevel,
        skills,
        jobTitle,
      });

      updateResume({
        summary: response.data.summary,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate summary",
      );
    } finally {
      setGenerating(false);
    }
  };

  const improve = async () => {
    if (!resume.summary.trim()) {
      setError("Write a summary before improving it.");
      return;
    }

    try {
      setError("");
      setImproving(true);

      const response = await improveContent({
        content: resume.summary,
      });

      updateResume({
        summary: response.data.improvedContent,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to improve summary",
      );
    } finally {
      setImproving(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Professional Summary
      </h1>

      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-[#44445A]">
        Write a brief overview of your professional background, key skills, and
        career goals. This is often the first thing recruiters read.
      </p>

      {/* AI Generation */}
      <div className="mt-8 rounded-lg border border-[#BDBBFF] bg-[#F1F2FF] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E0E1FF] text-[#3F32D8]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-[16px] font-semibold text-[#202033]">
              Need inspiration?
            </h3>

            <p className="mt-1 text-sm text-[#44445A]">
              Let our AI craft a tailored summary based on your experience.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#242438]">
              Target Job Title
            </label>

            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Engineer"
              className="h-12 w-full rounded-lg border border-[#C9C6D8] bg-white px-4 text-sm outline-none focus:border-[#5141E5]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#242438]">
              Experience Level
            </label>

            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#C9C6D8] bg-white px-4 text-sm outline-none focus:border-[#5141E5]"
            >
              {experienceLevels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-[#242438]">
            Key Skills (comma separated)
          </label>

          <input
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, TypeScript, AWS"
            className="h-12 w-full rounded-lg border border-[#C9C6D8] bg-white px-4 text-sm outline-none focus:border-[#5141E5]"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end">
          <AIButton onClick={generate} loading={generating}>
            Generate Summary
          </AIButton>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-[#242438]">
          Summary Text
        </label>

        <div className="relative">
          <textarea
            value={resume.summary || ""}
            onChange={(e) =>
              updateResume({
                summary: e.target.value.slice(0, 500),
              })
            }
            maxLength={500}
            rows={7}
            placeholder="Write your professional summary..."
            className="
              w-full
              resize-none
              rounded-lg
              border
              border-[#C9C6D8]
              bg-white
              px-4
              py-4
              pb-16
              text-[16px]
              leading-7
              text-[#202034]
              outline-none
              focus:border-[#5141E5]
              focus:ring-2
              focus:ring-[#5141E5]/10
            "
          />

          <button
            type="button"
            onClick={improve}
            disabled={improving || !resume.summary}
            className="
              absolute
              bottom-3
              right-3
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-[#C9C6D8]
              bg-white
              px-3
              py-2
              text-xs
              font-medium
              text-[#29283B]
              hover:bg-[#F8F7FC]
              disabled:opacity-50
            "
          >
            <WandSparkles className="h-4 w-4" />

            {improving ? "Improving..." : "Improve with AI"}
          </button>
        </div>

        <div className="mt-2 text-right text-sm text-[#48475A]">
          {resume.summary?.length || 0} / 500 characters
        </div>
      </div>
    </section>
  );
};

export default SummaryStep;
