"use client";

import { IResume } from "@/types/resume.types";

interface Props {
  resume: IResume;
}

const ResumePreview = ({ resume }: Props) => {
  const personal = resume.personalInfo;

  return (
    <div className="rounded-lg border border-[#D2CFDC] bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-[#DDD9E5] pb-5">
        <h1 className="text-3xl font-bold text-[#17182A]">
          {personal.fullname || "Your Name"}
        </h1>

        <p className="mt-1 text-lg text-[#5141E5]">
          {resume.title || "Professional Resume"}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#55556A]">
          {personal.email && <span>{personal.email}</span>}
          {personal.mobile && <span>{personal.mobile}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <ResumeSection title="Professional Summary">
          <p>{resume.summary}</p>
        </ResumeSection>
      )}

      {/* Experience */}
      {!!resume.workExperience?.length && (
        <ResumeSection title="Experience">
          <div className="space-y-5">
            {resume.workExperience.map((experience, index) => (
              <div key={index}>
                <div className="flex flex-col justify-between sm:flex-row">
                  <div>
                    <h3 className="font-semibold text-[#202034]">
                      {experience.position}
                    </h3>

                    <p className="text-sm text-[#5141E5]">
                      {experience.company}
                    </p>
                  </div>

                  <span className="text-xs text-[#666477]">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-[#454456]">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Education */}
      {!!resume.education?.length && (
        <ResumeSection title="Education">
          <div className="space-y-4">
            {resume.education.map((education, index) => (
              <div key={index}>
                <h3 className="font-semibold">{education.degree}</h3>

                <p className="text-sm text-[#5141E5]">{education.institute}</p>

                <p className="text-xs text-[#666477]">
                  {education.startDate} - {education.endDate}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Skills */}
      {!!resume.skills?.length && (
        <ResumeSection title="Skills">
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill) => (
              <span
                key={skill}
                className="rounded bg-[#F0EFF7] px-2 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Projects */}
      {!!resume.projects?.length && (
        <ResumeSection title="Projects">
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.title}</h3>

                <p className="mt-1 text-sm leading-6 text-[#454456]">
                  {project.description}
                </p>

                <p className="mt-2 text-xs text-[#666477]">
                  {project.techStack.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* Certifications */}
      {!!resume.certifications?.length && (
        <ResumeSection title="Certifications">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {resume.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        </ResumeSection>
      )}
    </div>
  );
};

const ResumeSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-7">
    <h2 className="mb-3 border-b border-[#E3E0EA] pb-2 text-sm font-bold uppercase tracking-wider text-[#3428B9]">
      {title}
    </h2>

    <div className="text-sm leading-6 text-[#454456]">{children}</div>
  </section>
);

export default ResumePreview;
