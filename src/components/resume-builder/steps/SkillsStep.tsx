"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { generateSkills } from "@/services/ai.service";
import { ResumeBuilderStepProps } from "../types";
import AIButton from "../AIButton";

const levels = [
  "Entry-level (0-2 years)",
  "Mid-level (3-5 years)",
  "Senior-level (6+ years)",
];

const SkillsStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    "Mid-level (3-5 years)",
  );

  const [skillInput, setSkillInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addSkill = (skill: string) => {
    const normalized = skill.trim();

    if (!normalized) return;

    if (resume.skills.includes(normalized)) {
      setSkillInput("");
      return;
    }

    updateResume({
      skills: [...resume.skills, normalized],
    });

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateResume({
      skills: resume.skills.filter((item) => item !== skill),
    });
  };

  const generate = async () => {
    try {
      setError("");

      if (!jobTitle || !experienceLevel) {
        setError("Enter target job title and experience level.");
        return;
      }

      setLoading(true);

      const response = await generateSkills({
        jobTitle,
        experienceLevel,
      });

      setSuggestions(response.data.skills);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to generate skills",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Skills
      </h1>

      <p className="mt-2 text-[16px] leading-7 text-[#44445A]">
        Add your technical skills or let AI suggest relevant technical keywords.
      </p>

      <div className="mt-8 rounded-lg border border-[#BDBBFF] bg-[#F1F2FF] p-6">
        <h3 className="font-semibold text-[#202034]">
          Generate Skills with AI
        </h3>

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

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <div className="mt-5 flex justify-end">
          <AIButton onClick={generate} loading={loading}>
            Generate Skills
          </AIButton>
        </div>
      </div>

      {/* Manual skills */}
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium">Add Skill</label>

        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(skillInput);
            }
          }}
          placeholder="React"
          className="h-12 w-full rounded-lg border border-[#C9C6D8] bg-white px-4 text-sm outline-none focus:border-[#5141E5]"
        />
      </div>

      {/* Selected skills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {resume.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 rounded-full bg-[#E7E4FF] px-3 py-2 text-sm text-[#3428B9]"
          >
            {skill}

            <button type="button" onClick={() => removeSkill(skill)}>
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
      </div>

      {/* AI suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-7">
          <h3 className="text-sm font-semibold text-[#202034]">
            AI Suggestions
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="rounded-full border border-[#C9C6D8] bg-white px-3 py-2 text-sm text-[#333247] hover:border-[#5141E5]"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillsStep;
