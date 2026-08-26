"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Pencil,
} from "lucide-react";

interface AtsResult {
  atsScore: number;
  overallAssessment: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  missingSections: string[];
  keywordRecommendations: string[];
}

interface StoredAtsResult {
  result: AtsResult;
  fileName: string;
}

export default function AtsResultPage() {
  const [data, setData] = useState<StoredAtsResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("resumeCraftAtsResult");

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setData(parsed);
    } catch (error) {
      console.error("Invalid ATS result:", error);
    }
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f9f8ff] px-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#101526]">
            ATS Result Not Found
          </h1>

          <p className="mt-3 text-sm text-[#52617c]">
            Please upload and review your resume again.
          </p>

          <Link
            href="/features/review"
            className="mt-6 inline-flex rounded-md bg-[#382bd2] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#3025bb]"
          >
            Review Resume
          </Link>
        </div>
      </main>
    );
  }

  const { result, fileName } = data;

  const score = Math.min(100, Math.max(0, Number(result?.atsScore) || 0));

  const getScoreColor = () => {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#d97706";
    return "#c81e1e";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent ATS Compatibility";
    if (score >= 60) return "Good ATS Compatibility";
    return "Needs Significant Improvement";
  };

  const scoreColor = getScoreColor();

  return (
    <main className="min-h-screen bg-[#f9f8ff] text-[#101526]">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#d8d7e4] bg-[#faf9ff]">
        <div className="mx-auto flex min-h-[58px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[68px]">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[18px] font-semibold text-[#2820d4]">
              ResumeCraft
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              <Link
                href="/dashboard"
                className="text-[13px] text-[#222839] transition hover:text-[#382bd2]"
              >
                Dashboard
              </Link>

              <Link
                href="/features/review"
                className="relative text-[13px] font-medium text-[#382bd2]"
              >
                Resume Review
                <span className="absolute -bottom-[18px] left-0 h-[2px] w-full bg-[#382bd2]" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="hidden text-[13px] text-[#30384d] transition hover:text-[#382bd2] sm:block"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-md bg-[#382bd2] px-5 py-2.5 text-[12px] font-medium text-white shadow-sm transition hover:bg-[#3025bb]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-[68px] lg:py-[42px]">
        <div className="mx-auto max-w-[1270px]">
          {/* Heading */}
          <div>
            <h1 className="text-[34px] font-semibold tracking-[-1.2px] sm:text-[38px] lg:text-[40px]">
              Your ATS Analysis Result
            </h1>

            <p className="mt-2 text-[15px] text-[#30384d] sm:text-[16px]">
              Comprehensive breakdown of how Applicant Tracking Systems parse
              your resume.
            </p>
          </div>

          {/* ================= RESULT GRID ================= */}
          <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[303px_minmax(0,1fr)]">
            {/* ================= SCORE CARD ================= */}
            <div className="flex min-h-[650px] flex-col items-center justify-center rounded-[10px] border border-[#ddddea] bg-white px-6 py-10">
              <h2 className="mb-5 text-[18px] font-semibold">
                ATS Compatibility Score
              </h2>

              {/* Score circle */}
              <div className="relative h-[166px] w-[166px]">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#edf0f5"
                    strokeWidth="11"
                  />

                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeDasharray={`${score * 3.0159} 301.59`}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-[42px] font-semibold leading-none"
                    style={{ color: scoreColor }}
                  >
                    {score}
                  </span>

                  <span className="mt-1 text-[11px] text-[#30384d]">/ 100</span>
                </div>
              </div>

              <div
                className="mt-5 rounded-full px-4 py-2 text-[12px] font-medium"
                style={{
                  backgroundColor:
                    score >= 80
                      ? "#dcfce7"
                      : score >= 60
                        ? "#fef3c7"
                        : "#ffd9d5",
                  color: scoreColor,
                }}
              >
                {getScoreLabel()}
              </div>

              <p className="mt-5 max-w-[240px] text-center text-[12px] leading-[1.6] text-[#687188]">
                Analysis generated from{" "}
                <span className="font-medium text-[#30384d]">{fileName}</span>
              </p>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="min-w-0">
              {/* Overall Assessment */}
              <div className="rounded-[10px] border border-[#ddddea] border-l-[4px] border-l-[#c81e1e] bg-white px-6 py-5 sm:px-7">
                <div className="flex gap-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#c81e1e]" />

                  <div>
                    <h2 className="text-[18px] font-semibold">
                      Overall Assessment
                    </h2>

                    <p className="mt-2 text-[13px] leading-[1.7] text-[#35405a]">
                      {result.overallAssessment}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths / Weaknesses */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Strengths */}
                <div className="rounded-[10px] border border-[#ddddea] bg-white p-5 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-[#e5e4ed] pb-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2428df]" />

                    <h2 className="text-[18px] font-semibold">Strengths</h2>
                  </div>

                  <div className="mt-4 space-y-4">
                    {result.strengths?.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 text-[12.5px] leading-[1.5] text-[#35405a]"
                      >
                        <span className="mt-1 text-[#687188]">✓</span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="rounded-[10px] border border-[#f2caca] bg-[#fffafa] p-5 sm:p-6">
                  <div className="flex items-center gap-3 border-b border-[#eadede] pb-3">
                    <AlertTriangle className="h-5 w-5 text-[#c81e1e]" />

                    <h2 className="text-[18px] font-semibold">Weaknesses</h2>
                  </div>

                  <div className="mt-4 space-y-4">
                    {result.weaknesses?.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 text-[12.5px] leading-[1.5] text-[#35405a]"
                      >
                        <span className="mt-1 text-[#c81e1e]">×</span>

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actionable Improvements */}
              <div className="mt-5 rounded-[10px] border border-[#ddddea] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3 border-b border-[#e5e4ed] pb-3">
                  <Lightbulb className="h-5 w-5 text-[#2428df]" />

                  <h2 className="text-[18px] font-semibold">
                    Actionable Improvements
                  </h2>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {result.improvements?.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 rounded-md bg-[#f2f2ff] px-4 py-3 text-[12.5px] leading-[1.5] text-[#35405a]"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#382bd2]" />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Keywords */}
              <div className="mt-5 rounded-[10px] border border-[#ddddea] bg-white p-5 sm:p-6">
                <h2 className="text-[18px] font-semibold">
                  Recommended Keywords
                </h2>

                <p className="mt-3 text-[12.5px] text-[#52617c]">
                  Based on your resume analysis, consider incorporating these
                  keywords where applicable:
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {result.keywordRecommendations?.map((keyword, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-[#d7d6e7] bg-[#f7f6ff] px-3.5 py-2 text-[11px] text-[#39435b]"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM ACTIONS ================= */}
          <div className="mt-7 flex flex-col items-stretch justify-end gap-3 border-t border-[#e0dfe8] pt-5 sm:flex-row">
            <Link
              href="/features/review"
              className="flex h-[42px] items-center justify-center rounded-md border border-[#c9c8d8] bg-white px-6 text-[12px] text-[#30384d] transition hover:bg-[#f7f6ff]"
            >
              Review Another Resume
            </Link>

            <Link
              href="/dashboard"
              className="flex h-[42px] items-center justify-center gap-2 rounded-md bg-[#382bd2] px-6 text-[12px] font-medium text-white transition hover:bg-[#3025bb]"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Resume
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#d8d7e4] bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-5 py-7 sm:px-8 md:flex-row lg:px-[68px]">
          <Link href="/" className="text-[17px] font-semibold text-[#2820d4]">
            ResumeCraft
          </Link>

          <p className="text-[12px] text-[#30384d]">
            © 2024 ResumeCraft. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-[11px] text-[#52617c]">
            <Link href="/privacy" className="hover:text-[#382bd2]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#382bd2]">
              Terms of Service
            </Link>

            <Link href="/cookies" className="hover:text-[#382bd2]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
