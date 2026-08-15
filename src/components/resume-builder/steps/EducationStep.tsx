"use client";

import { Plus } from "lucide-react";
import { IEducation } from "@/types/resume.types";

import { ResumeBuilderStepProps } from "../types";
import EducationCard from "../education/EducationCard";

const emptyEducation: IEducation = {
  institute: "",
  degree: "",
  startDate: "",
  endDate: "",
};

const EducationStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const education = resume.education || [];

  const addEducation = () => {
    updateResume({
      education: [...education, { ...emptyEducation }],
    });
  };

  const updateEducation = (index: number, data: Partial<IEducation>) => {
    const updated = [...education];

    updated[index] = {
      ...updated[index],
      ...data,
    };

    updateResume({
      education: updated,
    });
  };

  const removeEducation = (index: number) => {
    updateResume({
      education: education.filter((_, i) => i !== index),
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Education
      </h1>

      <p className="mt-2 text-[16px] leading-7 text-[#44445A]">
        Add your academic background.
      </p>

      <div className="mt-8 space-y-5">
        {education.map((item, index) => (
          <EducationCard
            key={index}
            education={item}
            index={index}
            onChange={updateEducation}
            onRemove={() => removeEducation(index)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={addEducation}
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#9B98B5] px-5 py-3 text-sm text-[#3526D9]"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </button>
    </section>
  );
};

export default EducationStep;
