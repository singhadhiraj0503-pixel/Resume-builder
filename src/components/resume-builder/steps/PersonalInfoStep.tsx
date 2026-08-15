"use client";

import { ResumeBuilderStepProps } from "../types";

const PersonalInfoStep = ({ resume, updateResume }: ResumeBuilderStepProps) => {
  const personal = resume.personalInfo;

  const updatePersonal = (field: string, value: string) => {
    updateResume({
      personalInfo: {
        ...personal,
        [field]: value,
      },
    });
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-[-0.8px] text-[#17182A] sm:text-[36px]">
        Personal Information
      </h1>

      <p className="mt-2 max-w-3xl text-[16px] leading-7 text-[#44445A]">
        Add your contact information and the basic details that will appear on
        your resume.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Resume Title"
          value={resume.title}
          placeholder="Software Engineer Resume"
          onChange={(value) => updateResume({ title: value })}
        />

        <Field
          label="Full Name"
          value={personal.fullname}
          placeholder="Alex Johnson"
          onChange={(value) => updatePersonal("fullname", value)}
        />

        <Field
          label="Email"
          value={personal.email}
          placeholder="alex@example.com"
          type="email"
          onChange={(value) => updatePersonal("email", value)}
        />

        <Field
          label="Mobile"
          value={personal.mobile}
          placeholder="+91 9876543210"
          onChange={(value) => updatePersonal("mobile", value)}
        />

        <Field
          label="Location"
          value={personal.location}
          placeholder="New Delhi, India"
          onChange={(value) => updatePersonal("location", value)}
        />

        <Field
          label="GitHub"
          value={personal.github}
          placeholder="github.com/username"
          onChange={(value) => updatePersonal("github", value)}
        />

        <Field
          label="LinkedIn"
          value={personal.linkedIn}
          placeholder="linkedin.com/in/username"
          onChange={(value) => updatePersonal("linkedIn", value)}
        />

        <Field
          label="Portfolio"
          value={personal.portfolio}
          placeholder="yourportfolio.com"
          onChange={(value) => updatePersonal("portfolio", value)}
        />
      </div>
    </section>
  );
};

interface FieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (value: string) => void;
}

const Field = ({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: FieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#242438]">
        {label}
      </label>

      <input
        type={type}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-lg
          border
          border-[#C9C6D8]
          bg-white
          px-4
          text-[15px]
          text-[#202034]
          outline-none
          transition
          placeholder:text-[#9A98A8]
          focus:border-[#5141E5]
          focus:ring-2
          focus:ring-[#5141E5]/10
        "
      />
    </div>
  );
};

export default PersonalInfoStep;
