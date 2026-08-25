"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { FileUp, Download, Eye, ChevronDown, Loader2 } from "lucide-react";

// import { generateAtsScore } from "@/services/ai.service";
import { extractResumeText } from "@/lib/extractResumeText";
import { generateATSScore } from "@/services/ai.service";

const ReviewResumePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (selectedFile: File) => {
    setError("");

    const extension = selectedFile.name.split(".").pop()?.toLowerCase();

    if (!extension || !["pdf", "docx"].includes(extension)) {
      setError("Please upload your resume in PDF or DOCX format.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    handleFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (!droppedFile) return;

    handleFile(droppedFile);
  };

  const handleReviewResume = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Extract PDF/DOCX → plain text
      const resumeText = await extractResumeText(file);

      if (!resumeText.trim()) {
        throw new Error("Could not extract text from this resume.");
      }

      // Send extracted text to backend
      const response = await generateATSScore(resumeText);

      if (!response.data?.atsScore) {
        throw new Error("ATS analysis was not returned by the server.");
      }

      let atsResult = response.data.atsScore;

      /*
       * Your current backend receives Gemini's response as
       * a string because generateAIContent() returns response.text.
       */
      if (typeof atsResult === "string") {
        try {
          atsResult = JSON.parse(atsResult);
        } catch {
          throw new Error("The ATS service returned an invalid AI response.");
        }
      }

      // Store result temporarily for the result page
      sessionStorage.setItem(
        "resumeCraftAtsResult",
        JSON.stringify({
          result: atsResult,
          fileName: file.name,
        }),
      );

      // Navigate to the result page
      window.location.href = "/features/review/rewsult";
    } catch (error) {
      console.error("ATS review error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while reviewing your resume.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="border-b border-[#d8d7e4] bg-[#faf9ff]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[85px]">
          {/* Logo */}
          <Link href="/" className="text-[18px] font-semibold text-[#3125cf]">
            ResumeCraft
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/dashboard"
              className="text-[13px] text-[#1b2030] transition hover:text-[#3024d0]"
            >
              Dashboard
            </Link>

            <Link
              href="/resumes"
              className="relative py-[25px] text-[13px] text-[#3024d0]"
            >
              My Resumes
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3024d0]" />
            </Link>

            <Link
              href="/templates"
              className="text-[13px] text-[#1b2030] transition hover:text-[#3024d0]"
            >
              Templates
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/dashboard"
              className="hidden h-[42px] items-center rounded-[7px] border border-[#c8c7d8] px-5 text-[13px] text-[#27304a] transition hover:border-[#3428d1] sm:flex"
            >
              Preview
            </Link>

            <Link
              href="/dashboard"
              className="flex h-[42px] items-center gap-2 rounded-[7px] bg-[#3528d4] px-4 text-[12px] font-medium text-white transition hover:bg-[#2e22c0] sm:px-5"
            >
              <Download className="h-[15px] w-[15px]" />

              <span className="hidden sm:inline">Download PDF</span>
            </Link>

            <button
              type="button"
              className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-[#e8e8f5]"
            >
              <span className="text-[16px]">👩🏻</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-5 pb-[70px] pt-[38px] sm:px-8 sm:pt-[42px]">
        <div className="mx-auto max-w-[850px] text-center">
          <h1 className="text-[38px] font-semibold leading-[1.1] tracking-[-1.5px] sm:text-[48px]">
            Optimize Your Resume for
            <br />
            ATS Success
          </h1>

          <p className="mx-auto mt-[18px] max-w-[730px] text-[17px] leading-[1.55] text-[#30384d] sm:text-[20px]">
            Upload your resume in PDF or DOCX format to see how it performs
            against industry standards.
          </p>
        </div>
      </section>

      {/* =====================================================
          UPLOAD AREA
      ===================================================== */}
      <section className="px-5 pb-[160px] sm:px-8">
        <div className="mx-auto max-w-[825px] rounded-[8px] border border-[#c6c5d8] bg-white p-[34px] sm:p-[36px]">
          {/* Drop zone */}
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => {
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex min-h-[270px] cursor-pointer flex-col items-center justify-center rounded-[9px] border-2 border-dashed transition ${
              isDragging
                ? "border-[#3528d4] bg-[#f5f4ff]"
                : "border-[#c6c5dd] bg-white hover:bg-[#fcfbff]"
            }`}
          >
            <FileUp className="h-[38px] w-[38px] text-[#3024d0]" />

            {file ? (
              <>
                <p className="mt-[18px] text-[17px] font-medium">{file.name}</p>

                <p className="mt-[8px] text-[14px] text-[#4d5870]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setFile(null);

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="mt-[13px] text-[13px] text-red-500 hover:underline"
                >
                  Remove file
                </button>
              </>
            ) : (
              <>
                <p className="mt-[18px] text-[17px] font-medium">
                  Drag & Drop your resume here
                </p>

                <p className="mt-[10px] text-[14px] text-[#4b5367]">
                  or click to browse files (PDF, DOCX)
                </p>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-[18px] rounded-[5px] border border-[#c5c4d7] bg-[#faf9ff] px-[18px] py-[10px] text-[14px] text-[#40506d] transition hover:border-[#3024d0]"
                >
                  Select File
                </button>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Error */}
          {error && (
            <div className="mt-[18px] rounded-[6px] border border-red-200 bg-red-50 px-4 py-3 text-center text-[13px] text-red-600">
              {error}
            </div>
          )}

          {/* Review button */}
          <div className="mt-[35px] flex justify-center">
            <button
              type="button"
              onClick={handleReviewResume}
              disabled={!file || isLoading}
              className={`flex h-[48px] min-w-[185px] items-center justify-center gap-2 rounded-[5px] px-7 text-[14px] font-medium transition ${
                file && !isLoading
                  ? "bg-[#9188e3] text-white hover:bg-[#4033d4]"
                  : "cursor-not-allowed bg-[#9188e3] text-white opacity-80"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-[17px] w-[17px] animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Review Resume"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#d8d7e4] bg-white">
        <div className="mx-auto flex min-h-[88px] max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8 lg:px-[85px]">
          <p className="text-[13px] font-semibold">ResumeCraft</p>

          <p className="text-[13px] text-[#343c51]">
            © 2024 ResumeCraft AI. All rights reserved.
          </p>

          <div className="flex gap-6 text-[13px] text-[#555c70]">
            <Link href="/privacy" className="hover:text-[#3024d0]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#3024d0]">
              Terms of Service
            </Link>

            <Link href="/help" className="hidden hover:text-[#3024d0] sm:block">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ReviewResumePage;
