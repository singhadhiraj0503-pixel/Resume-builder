"use client";

import { Plus } from "lucide-react";
import { IWorkExperience } from "@/types/resume.types";

import { ResumeBuilderStepProps } from "../types";
import ExperienceCard from "../experience/ExperienceCard";

const emptyExperience: IWorkExperience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

const ExperienceStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const experiences = resume.workExperience || [];

  const addExperience = () => {
    updateResume({
      workExperience: [...experiences, { ...emptyExperience }],
    });
  };

  const updateExperience = (index: number, data: Partial<IWorkExperience>) => {
    const updated = [...experiences];

    updated[index] = {
      ...updated[index],
      ...data,
    };

    updateResume({
      workExperience: updated,
    });
  };

  const removeExperience = (index: number) => {
    updateResume({
      workExperience: experiences.filter((_, i) => i !== index),
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Work Experience
      </h1>

      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-[#44445A]">
        Add your professional experience and use AI to create ATS-friendly
        descriptions.
      </p>

      <div className="mt-8 space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            index={index}
            onChange={updateExperience}
            onRemove={() => removeExperience(index)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-dashed
          border-[#9B98B5]
          bg-white
          px-5
          py-3
          text-sm
          font-medium
          text-[#3526D9]
          transition
          hover:border-[#5141E5]
          hover:bg-[#F8F7FF]
        "
      >
        <Plus className="h-4 w-4" />
        Add Experience
      </button>
    </section>
  );
};

export default ExperienceStep;
