"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createResume, getAllResumes } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";

const Dashboard = () => {
  const router = useRouter();

  const [resumes, setResumes] = useState<IResume[]>([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllResumes();

        setResumes(response.data || []);
      } catch (error) {
        console.error("Failed to load resumes:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load resumes",
        );
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, []);

  /*
   * Create a new resume
   */
  // const handleCreateResume = async () => {
  //   try {
  //     setCreating(true);
  //     setError("");

  //     const response = await createResume();

  //     const newResume = response.data;

  //     setResumes((prev) => [...prev, newResume]);

  //     // Open the newly created resume
  //     router.push(`/resume/${newResume._id}`);
  //   } catch (error) {
  //     console.error("Failed to create resume:", error);

  //     setError(
  //       error instanceof Error ? error.message : "Failed to create resume",
  //     );
  //   } finally {
  //     setCreating(false);
  //   }
  // };

  const handleCreateResume = async () => {
    try {
      setCreating(true);
      setError("");

      const response = await createResume();

      const newResume = response.data;

      router.push(`/resume/${newResume._id}`);
    } catch (error) {
      console.error("Failed to create resume:", error);

      setError(
        error instanceof Error ? error.message : "Failed to create resume",
      );
    } finally {
      setCreating(false);
    }
  };

  /*
   * Open resume editor
   */
  const handleEdit = (resumeId: string) => {
    router.push(`/resume/${resumeId}`);
  };

  /*
   * Open resume preview
   */
  const handleView = (resumeId: string) => {
    router.push(`/preview/${resumeId}`);
  };

  /*
   * Calculate whether resume is complete
   */
  const isResumeComplete = (resume: IResume) => {
    return Boolean(
      resume.title &&
      resume.summary &&
      resume.personalInfo?.fullname &&
      resume.personalInfo?.email &&
      resume.skills?.length &&
      resume.education?.length,
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9FF]">
        <div className="text-sm text-[#5A6374]">Loading resumes...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF] text-[#172033]">
      {/* ================= HEADER ================= */}

      <header className="border-b border-[#ECEAF2] bg-[#FAF9FF]">
        <div className="mx-auto flex h-[90px] w-full max-w-[1400px] items-center justify-between px-6 sm:px-8 lg:px-10">
          {/* Logo */}

          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="font-serif text-[24px] font-bold tracking-[-0.5px] text-[#3428B9]"
          >
            ResumeCraft
          </button>

          {/* Right side */}

          <div className="flex items-center gap-7">
            <button
              type="button"
              className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#E1E7FA] text-[#424A5B] transition hover:bg-[#D9E0F7]"
              aria-label="Profile"
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="8"
                  r="3.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M5.5 19C6.3 15.9 8.5 14.5 12 14.5C15.5 14.5 17.7 15.9 18.5 19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className="text-[16px] text-[#424A5B] transition hover:text-[#3428B9]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-12 sm:px-8 lg:px-10">
        {/* Welcome */}

        <div>
          <h1 className="font-serif text-[38px] font-bold leading-tight tracking-[-1px] text-[#182033] sm:text-[40px]">
            Welcome back, Alex
          </h1>

          <p className="mt-3 font-serif text-[20px] text-[#4C4F5C]">
            Manage your professional journey.
          </p>
        </div>

        {/* Resume heading */}

        <div className="mt-12">
          <h2 className="font-serif text-[24px] font-bold text-[#182033]">
            Your Resumes
          </h2>
        </div>

        {/* Error */}

        {error && (
          <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ================= RESUME GRID ================= */}

        <div className="mt-6 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {/* Create New Resume */}

          <button
            type="button"
            onClick={handleCreateResume}
            disabled={creating}
            className="group flex min-h-[320px] flex-col items-center justify-center rounded-[9px] border border-dashed border-[#C9C6D2] bg-white transition hover:border-[#5747E7] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#5645E5] text-white transition group-hover:scale-105">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="mt-5 font-serif text-[17px] text-[#3428B9]">
              {creating ? "Creating..." : "Create New Resume"}
            </span>
          </button>

          {/* Existing Resumes */}

          {resumes.map((resume) => {
            const complete = isResumeComplete(resume);

            return (
              <div
                key={resume._id}
                className="flex min-h-[320px] flex-col overflow-hidden rounded-[9px] border border-[#C9C6D2] bg-white"
              >
                {/* Card body */}

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="min-w-0 truncate font-serif text-[25px] font-bold leading-tight text-[#182033]">
                      {resume.title || "Untitled Resume"}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[13px] ${
                        complete
                          ? "bg-[#DDE4F7] text-[#596175]"
                          : "bg-[#D8E8FA] text-[#5A6E8B]"
                      }`}
                    >
                      {complete ? "Complete" : "Draft"}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <p className="font-serif text-[15px] text-[#4C4F5C]">
                      Last updated:{" "}
                      {resume.updatedAt
                        ? new Date(resume.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Not updated"}
                    </p>
                  </div>
                </div>

                {/* Card actions */}

                <div className="grid grid-cols-3 border-t border-[#D8D5DE]">
                  {/* Edit */}

                  <button
                    type="button"
                    onClick={() => handleEdit(resume._id!)}
                    className="flex items-center justify-center gap-2 py-4 text-[15px] text-[#5A6374] transition hover:bg-[#F7F6FB] hover:text-[#3428B9]"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 20H8L19 9C20.1 7.9 20.1 6.1 19 5C17.9 3.9 16.1 3.9 15 5L4 16V20Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M13.5 6.5L17.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    Edit
                  </button>

                  {/* View */}

                  <button
                    type="button"
                    onClick={() => handleView(resume._id!)}
                    className="flex items-center justify-center gap-2 border-x border-[#D8D5DE] py-4 text-[15px] text-[#5A6374] transition hover:bg-[#F7F6FB] hover:text-[#3428B9]"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2.5 12C4.6 7.8 8 5.5 12 5.5C16 5.5 19.4 7.8 21.5 12C19.4 16.2 16 18.5 12 18.5C8 18.5 4.6 16.2 2.5 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="2.8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    View
                  </button>

                  {/* Delete */}

                  <button
                    type="button"
                    disabled
                    className="flex cursor-not-allowed items-center justify-center gap-2 py-4 text-[15px] text-red-400 opacity-70"
                  >
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 7H19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      <path
                        d="M9 7V4.5H15V7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <path
                        d="M7 7L7.8 19.5H16.2L17 7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M10 10.5V16"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />

                      <path
                        d="M14 10.5V16"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}

        {resumes.length === 0 && !creating && (
          <p className="mt-7 text-center font-serif text-[15px] text-[#747783]">
            You haven't created any resumes yet. Create your first resume to get
            started.
          </p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
