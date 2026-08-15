"use client";

import {
  UserRound,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  FolderGit2,
  BadgeCheck,
} from "lucide-react";

interface Step {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface ResumeStepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (index: number) => void;
  progress: number;
}

const ResumeStepper = ({
  steps,
  currentStep,
  onStepChange,
  progress,
}: ResumeStepperProps) => {
  return (
    <aside className="w-full shrink-0 border-b border-[#D8D5E5] bg-[#F9F8FF] lg:w-[318px] lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        {/* Builder Header */}
        <div className="px-6 py-5 lg:px-10 lg:pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#4C3EE4] text-sm font-semibold text-white">
              RC
            </div>

            <div>
              <h2 className="text-[21px] font-semibold text-[#3428B9]">
                Resume Builder
              </h2>

              <p className="text-[14px] text-[#303044]">{progress}% Complete</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <nav className="flex gap-2 overflow-x-auto px-5 pb-5 lg:block lg:px-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const active = index === currentStep;
            const completed = index < currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepChange(index)}
                className={`
                  flex
                  min-w-max
                  items-center
                  gap-4
                  rounded-lg
                  px-4
                  py-3
                  text-left
                  transition
                  lg:w-full
                  ${
                    active
                      ? "bg-[#E8E4FF] text-[#3326D4]"
                      : "text-[#29283B] hover:bg-[#F0EEFA]"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 ${
                    active || completed ? "text-[#3326D4]" : "text-[#303044]"
                  }`}
                  strokeWidth={1.8}
                />

                <span className="text-[15px] font-medium">{step.title}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom AI button */}
        <div className="mt-auto hidden px-10 pb-8 lg:block">
          <button
            type="button"
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#5141E5]
              px-4
              py-3
              text-[15px]
              font-medium
              text-white
              transition
              hover:bg-[#4334D4]
            "
          >
            ✦ Generate with AI
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ResumeStepper;
