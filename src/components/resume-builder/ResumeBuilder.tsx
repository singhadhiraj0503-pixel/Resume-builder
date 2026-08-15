"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserRound,
  FileText,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  FolderGit2,
  BadgeCheck,
  Eye,
  Download,
  Loader2,
} from "lucide-react";

import { getResume, updateResume } from "@/services/resume.service";

import { IResume } from "@/types/resume.types";

import ResumeStepper from "./ResumeStepper";
import StepNavigation from "./StepNavigation";

import PersonalInfoStep from "./steps/PersonalInfoStep";
import SummaryStep from "./steps/SummaryStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ProjectsStep from "./steps/ProjectsStep";
import CertificationsStep from "./steps/CertificationsStep";
import ReviewStep from "./steps/ReviewStep";

interface Props {
  resumeId: string;
}

const steps = [
  {
    id: "personal",
    title: "Personal Info",
    icon: UserRound,
  },
  {
    id: "summary",
    title: "Summary",
    icon: FileText,
  },
  {
    id: "experience",
    title: "Experience",
    icon: BriefcaseBusiness,
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Code2,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderGit2,
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: BadgeCheck,
  },
  {
    id: "review",
    title: "Review",
    icon: Eye,
  },
];

const ResumeBuilder = ({ resumeId }: Props) => {
  const router = useRouter();

  const [resume, setResume] = useState<IResume | null>(null);

  const [currentStep, setCurrentStep] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /*
   * Fetch resume
   */
  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getResume(resumeId);

        setResume(response.data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load resume",
        );
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      loadResume();
    }
  }, [resumeId]);

  /*
   * Update local resume state
   */
  const updateResumeState = (updates: Partial<IResume>) => {
    setResume((previous) =>
      previous
        ? {
            ...previous,
            ...updates,
          }
        : previous,
    );
  };

  /*
   * Save resume
   */
  const saveResume = async () => {
    if (!resume) return;

    await updateResume(resumeId, resume);
  };

  /*
   * Next
   */
  const handleNext = async () => {
    try {
      setSaving(true);
      setError("");

      await saveResume();

      setCurrentStep((previous) => Math.min(previous + 1, steps.length - 1));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save resume",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleFinish = async () => {
    try {
      setSaving(true);
      setError("");

      await saveResume();

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save resume:", error);

      setError(
        error instanceof Error ? error.message : "Failed to save resume",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * Back
   */
  const handleBack = () => {
    setCurrentStep((previous) => Math.max(previous - 1, 0));
  };

  /*
   * Progress
   */
  const progress = useMemo(() => {
    if (!resume) return 0;

    const totalFields = [
      Boolean(resume.title),
      Boolean(resume.personalInfo?.fullname),
      Boolean(resume.personalInfo?.email),
      Boolean(resume.personalInfo?.mobile),
      Boolean(resume.summary),
      Boolean(resume.workExperience?.length),
      Boolean(resume.education?.length),
      Boolean(resume.skills?.length),
      Boolean(resume.projects?.length),
      Boolean(resume.certifications?.length),
    ];

    const completed = totalFields.filter(Boolean).length;

    return Math.round((completed / totalFields.length) * 100);
  }, [resume]);

  /*
   * Current step
   */
  const renderStep = () => {
    if (!resume) return null;

    const props = {
      resume,
      updateResume: updateResumeState,
    };

    switch (currentStep) {
      case 0:
        return <PersonalInfoStep {...props} />;

      case 1:
        return <SummaryStep {...props} />;

      case 2:
        return <ExperienceStep {...props} />;

      case 3:
        return <EducationStep {...props} />;

      case 4:
        return <SkillsStep {...props} />;

      case 5:
        return <ProjectsStep {...props} />;

      case 6:
        return <CertificationsStep {...props} />;

      case 7:
        return <ReviewStep {...props} />;

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF]">
        <Loader2 className="h-6 w-6 animate-spin text-[#3526D9]" />
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F7F7FF]">
        <p className="text-sm text-red-500">{error || "Resume not found"}</p>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-lg bg-[#3526D9] px-5 py-3 text-sm text-white"
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#F7F7FF]">
      {/* ================= HEADER ================= */}

      <header className="shrink-0 border-b border-[#D8D5E5] bg-white">
        <div className="flex h-[68px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Logo */}

          <div className="flex items-center gap-7">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="text-[22px] font-bold tracking-[-0.5px] text-[#3025C7]"
            >
              ResumeCraft
            </button>

            <nav className="hidden items-center gap-7 md:flex">
              <button className="text-[15px] text-[#27263A]">Dashboard</button>

              <button className="text-[15px] text-[#27263A]">My Resumes</button>

              <button className="text-[15px] text-[#27263A]">Templates</button>
            </nav>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-lg border border-[#C8C5D8] bg-white px-5 py-2.5 text-sm text-[#29283B] sm:block"
            >
              Preview
            </button>

            <button
              type="button"
              className="hidden items-center gap-2 rounded-lg bg-[#3526D9] px-5 py-2.5 text-sm font-medium text-white sm:flex"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E6F2]">
              <UserRound className="h-5 w-5 text-[#55556A]" />
            </div>
          </div>
        </div>
      </header>

      {/* ================= BODY ================= */}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <ResumeStepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          progress={progress}
        />

        {/* Main */}
        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[920px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="rounded-xl border border-[#CFCBD9] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-7 lg:p-9">
              {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {renderStep()}

              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                saving={saving}
                onBack={handleBack}
                onNext={handleNext}
                onFinish={handleFinish}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumeBuilder;
