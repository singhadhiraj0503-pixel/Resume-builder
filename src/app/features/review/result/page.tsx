"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileWarning,
  Tags,
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

const AtsResultPage = () => {
  const [data, setData] = useState<StoredAtsResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("resumeCraftAtsResult");

    if (!stored) return;

    try {
      setData(JSON.parse(stored));
    } catch {
      console.error("Invalid ATS result");
    }
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9ff] px-5">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">ATS Result Not Found</h1>

          <p className="mt-3 text-sm text-[#52617c]">
            Please upload your resume again.
          </p>

          <Link
            href="/features/review"
            className="mt-6 inline-flex rounded-md bg-[#382bd2] px-5 py-3 text-sm text-white"
          >
            Review Resume
          </Link>
        </div>
      </main>
    );
  }

  const { result, fileName } = data;

  const score = Number(result.atsScore) || 0;

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* Header */}
      <header className="border-b border-[#d8d7e4] bg-[#faf9ff]">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[85px]">
          <Link href="/" className="text-[18px] font-semibold text-[#3125cf]">
            ResumeCraft
          </Link>

          <Link
            href="/features/review"
            className="flex items-center gap-2 text-[13px] text-[#30384d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Review Another Resume
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="px-5 py-[55px] sm:px-8">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center">
            <h1 className="text-[38px] font-semibold tracking-[-1px]">
              Your ATS Resume Score
            </h1>

            <p className="mt-3 text-[15px] text-[#52617c]">
              Analysis for{" "}
              <span className="font-medium text-[#222839]">{fileName}</span>
            </p>
          </div>

          {/* Score card */}
          <div className="mt-[40px] rounded-[10px] border border-[#c9c8d8] bg-white p-[35px]">
            <div className="flex flex-col items-center">
              <div className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full border-[15px] border-[#e7e6fb]">
                <div
                  className="absolute inset-[-15px] rounded-full border-[15px] border-transparent border-t-[#4537dd] border-r-[#4537dd]"
                  style={{
                    transform: `rotate(${score * 3.6 - 45}deg)`,
                  }}
                />

                <div className="text-center">
                  <p className="text-[48px] font-semibold text-[#4032d6]">
                    {score}
                  </p>

                  <p className="text-[12px] text-[#687188]">/ 100</p>
                </div>
              </div>

              <h2 className="mt-[25px] text-[21px] font-semibold">
                ATS Compatibility Score
              </h2>

              <p className="mt-[12px] max-w-[650px] text-center text-[14px] leading-[1.7] text-[#52617c]">
                {result.overallAssessment}
              </p>
            </div>
          </div>

          {/* Strengths / weaknesses */}
          <div className="mt-[20px] grid grid-cols-1 gap-5 md:grid-cols-2">
            <ResultList
              title="Key Strengths"
              icon={<CheckCircle2 className="h-5 w-5" />}
              items={result.strengths}
              iconClass="text-green-600"
            />

            <ResultList
              title="Key Weaknesses"
              icon={<AlertTriangle className="h-5 w-5" />}
              items={result.weaknesses}
              iconClass="text-orange-500"
            />
          </div>

          {/* Improvements */}
          <div className="mt-[20px] rounded-[10px] border border-[#c9c8d8] bg-white p-[28px]">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-[#4537dd]" />

              <h2 className="text-[18px] font-semibold">
                Recommended Improvements
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {result.improvements?.map((improvement, index) => (
                <div
                  key={index}
                  className="rounded-md bg-[#f7f6ff] px-4 py-3 text-[13px] leading-[1.55] text-[#35405a]"
                >
                  {improvement}
                </div>
              ))}
            </div>
          </div>

          {/* Missing sections */}
          <div className="mt-[20px] rounded-[10px] border border-[#c9c8d8] bg-white p-[28px]">
            <div className="flex items-center gap-3">
              <FileWarning className="h-5 w-5 text-[#4537dd]" />

              <h2 className="text-[18px] font-semibold">
                Missing / Weak Sections
              </h2>
            </div>

            {result.missingSections?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {result.missingSections.map((section, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#f0efff] px-4 py-2 text-[12px] text-[#4034cf]"
                  >
                    {section}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[13px] text-[#52617c]">
                No major missing sections were detected.
              </p>
            )}
          </div>

          {/* Keywords */}
          <div className="mt-[20px] rounded-[10px] border border-[#c9c8d8] bg-white p-[28px]">
            <div className="flex items-center gap-3">
              <Tags className="h-5 w-5 text-[#4537dd]" />

              <h2 className="text-[18px] font-semibold">
                Keyword Recommendations
              </h2>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {result.keywordRecommendations?.map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-full border border-[#d0cee5] bg-[#faf9ff] px-4 py-2 text-[12px] text-[#39435b]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="mt-[35px] flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/features/review"
              className="flex h-[45px] items-center justify-center rounded-md border border-[#c9c8d8] px-7 text-[13px] text-[#30384d]"
            >
              Review Another Resume
            </Link>

            <Link
              href="/dashboard"
              className="flex h-[45px] items-center justify-center rounded-md bg-[#382bd2] px-7 text-[13px] font-medium text-white"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

interface ResultListProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  iconClass: string;
}

const ResultList = ({ title, icon, items, iconClass }: ResultListProps) => {
  return (
    <div className="rounded-[10px] border border-[#c9c8d8] bg-white p-[28px]">
      <div className="flex items-center gap-3">
        <span className={iconClass}>{icon}</span>

        <h2 className="text-[18px] font-semibold">{title}</h2>
      </div>

      <div className="mt-5 space-y-3">
        {items?.map((item, index) => (
          <div
            key={index}
            className="text-[13px] leading-[1.55] text-[#35405a]"
          >
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AtsResultPage;
