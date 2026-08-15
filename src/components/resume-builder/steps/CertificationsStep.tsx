"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { ResumeBuilderStepProps } from "../types";

const CertificationsStep = ({
  resume,
  updateResume,
}: ResumeBuilderStepProps) => {
  const [value, setValue] = useState("");

  const certifications = resume.certifications || [];

  const addCertification = () => {
    const certification = value.trim();

    if (!certification) return;

    updateResume({
      certifications: [...certifications, certification],
    });

    setValue("");
  };

  const removeCertification = (index: number) => {
    updateResume({
      certifications: certifications.filter((_, i) => i !== index),
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Certifications
      </h1>

      <p className="mt-2 text-[16px] leading-7 text-[#44445A]">
        Add certifications that are relevant to your professional profile.
      </p>

      <div className="mt-8 flex gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCertification();
            }
          }}
          placeholder="AWS Certified Developer"
          className="h-12 flex-1 rounded-lg border border-[#C9C6D8] bg-white px-4 text-sm outline-none focus:border-[#5141E5]"
        />

        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3526D9] px-5 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {certifications.map((certification, index) => (
          <div
            key={`${certification}-${index}`}
            className="flex items-center justify-between rounded-lg border border-[#D3D0DF] bg-white px-4 py-3"
          >
            <span className="text-sm text-[#29283B]">{certification}</span>

            <button
              type="button"
              onClick={() => removeCertification(index)}
              className="text-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsStep;
