"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pencil, Download, ArrowLeft } from "lucide-react";

import ResumePreview from "@/components/resume-builder/preview/ResumePreview";
import { getResume } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";

const PreviewPage = () => {
  const router = useRouter();
  const params = useParams();

  const resumeId = params.resumeId as string;

  const [resume, setResume] = useState<IResume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resumeId) return;

    const loadResume = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getResume(resumeId);

        setResume(response.data);
      } catch (error) {
        console.error("Failed to load resume:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load resume",
        );
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  const handleEdit = () => {
    router.push(`/resume/${resumeId}`);
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F5FD]">
        <p className="text-sm text-[#55556A]">Loading resume...</p>
      </main>
    );
  }

  if (error || !resume) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F5F5FD] px-6">
        <p className="mb-5 text-red-500">{error || "Resume not found"}</p>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="rounded-md bg-[#3428B9] px-5 py-2.5 text-sm font-medium text-white"
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5FD]">
      {/* ================= HEADER ================= */}

      <header className="no-print sticky top-0 z-50 h-[68px] border-b border-[#D9D6E5] bg-[#FAF9FF]">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8">
          {/* Left */}

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-sm text-[#29293B] transition hover:text-[#3428B9]"
            >
              <ArrowLeft size={17} strokeWidth={1.8} />
              Dashboard
            </button>

            <div className="hidden h-6 w-px bg-[#D5D2DF] sm:block" />

            <h1 className="hidden text-lg font-bold text-[#3428B9] sm:block">
              Resume Preview
            </h1>
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-lg border border-[#CFCBDE] bg-white px-4 py-2.5 text-sm font-medium text-[#202033] transition hover:bg-[#F5F3FC]"
            >
              <Pencil size={16} />

              <span className="hidden sm:inline">Edit Resume</span>

              <span className="sm:hidden">Edit</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-[#3428B9] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2D23A4]"
            >
              <Download size={16} />

              <span className="hidden sm:inline">Download PDF</span>

              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= PREVIEW ================= */}

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <ResumePreview resume={resume} />
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
