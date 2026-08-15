"use client";

import { useState } from "react";

import { generateATSScore } from "@/services/ai.service";
import { ResumeBuilderStepProps } from "../types";
import ResumePreview from "../preview/ResumePreview";
import AIButton from "../AIButton";

interface ATSResult {
  atsScore: number;
  overallAssessment: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  missingSections: string[];
  keywordRecommendations: string[];
}

const ReviewStep = ({ resume }: ResumeBuilderStepProps) => {
  const [ats, setAts] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const buildResumeText = () => {
    const personal = resume.personalInfo;

    return [
      personal.fullname,
      personal.email,
      personal.mobile,
      personal.location,
      personal.github,
      personal.linkedIn,
      personal.portfolio,

      resume.title,
      resume.summary,

      "Skills:",
      resume.skills.join(", "),

      "Experience:",
      ...(resume.workExperience || []).map(
        (item) =>
          `${item.position} at ${item.company}
${item.startDate} - ${item.endDate}
${item.description}`,
      ),

      "Education:",
      ...resume.education.map(
        (item) =>
          `${item.degree} - ${item.institute}
${item.startDate} - ${item.endDate}`,
      ),

      "Projects:",
      ...resume.projects.map(
        (item) =>
          `${item.title}
${item.description}
Technologies: ${item.techStack.join(", ")}`,
      ),

      "Certifications:",
      ...(resume.certifications || []).join(", "),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const runATS = async () => {
    try {
      setLoading(true);

      const resumeText = buildResumeText();

      const response = await generateATSScore({
        resumeText,
      });

      const result = response.data.atsScore;

      setAts(typeof result === "string" ? JSON.parse(result) : result);
    } catch (error) {
      console.error("ATS analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Review Your Resume
      </h1>

      <p className="mt-2 text-[16px] leading-7 text-[#44445A]">
        Review your completed resume and check its ATS compatibility before
        finishing.
      </p>

      <div className="mt-8">
        <ResumePreview resume={resume} />
      </div>

      <div className="mt-7 flex justify-end">
        <AIButton onClick={runATS} loading={loading}>
          Generate ATS Score
        </AIButton>
      </div>

      {ats && (
        <div className="mt-7 rounded-lg border border-[#C8C5DD] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#666477]">ATS Compatibility</p>

              <p className="mt-1 text-4xl font-bold text-[#3428B9]">
                {ats.atsScore}
                <span className="text-lg text-[#777589]">/100</span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Overall Assessment</h3>

            <p className="mt-2 text-sm leading-6 text-[#55556A]">
              {ats.overallAssessment}
            </p>
          </div>

          <ATSList title="Strengths" items={ats.strengths} />

          <ATSList title="Weaknesses" items={ats.weaknesses} />

          <ATSList title="Improvements" items={ats.improvements} />

          <ATSList
            title="Keyword Recommendations"
            items={ats.keywordRecommendations}
          />
        </div>
      )}
    </section>
  );
};

const ATSList = ({ title, items }: { title: string; items: string[] }) => {
  if (!items?.length) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-[#202034]">{title}</h3>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-[#55556A]">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewStep;
