"use client";

import Link from "next/link";
import {
  FileText,
  Pencil,
  Eye,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const FeaturesPage = () => {
  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="border-b border-[#dcdbe8] bg-[#faf9ff]">
        <div className="mx-auto flex h-[58px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[66px]">
          {/* Logo */}
          <Link href="/" className="text-[16px] font-semibold text-[#101526]">
            ResumeCraft
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/features"
              className="relative py-[21px] text-[11px] font-medium text-[#3024d0]"
            >
              Features
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3024d0]" />
            </Link>

            <Link
              href="/templates"
              className="text-[11px] text-[#40506d] transition hover:text-[#3024d0]"
            >
              Templates
            </Link>

            <Link
              href="/pricing"
              className="text-[11px] text-[#40506d] transition hover:text-[#3024d0]"
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className="text-[11px] text-[#40506d] transition hover:text-[#3024d0]"
            >
              About
            </Link>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="rounded-[7px] border border-[#c9c8d8] px-4 py-[7px] text-[10px] text-[#151a27] transition hover:border-[#3024d0]"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="rounded-[6px] bg-[#4032dc] px-4 py-[8px] text-[10px] font-medium text-white shadow-sm transition hover:bg-[#3024c9]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-5 pb-[75px] pt-[105px] sm:px-8">
        <div className="mx-auto max-w-[850px] text-center">
          <h1 className="text-[38px] font-semibold leading-[1.12] tracking-[-1.5px] sm:text-[40px]">
            Tools built for the
            <br />
            <span className="text-[#4a3be0]">modern professional.</span>
          </h1>

          <p className="mx-auto mt-[18px] max-w-[610px] text-[13px] leading-[1.7] text-[#40506d]">
            Craft a resume that bypasses ATS filters and catches the
            recruiter&apos;s eye.
            <br className="hidden sm:block" />
            Powerful AI, minimal effort.
          </p>

          <Link
            href="/features/review"
            className="mt-[27px] inline-flex h-[37px] items-center justify-center rounded-[6px] bg-[#4838e3] px-[25px] text-[10px] font-medium text-white shadow-[0_2px_5px_rgba(60,45,220,0.2)] transition hover:bg-[#3729d0]"
          >
            Start Now
          </Link>
        </div>
      </section>

      {/* =====================================================
          ATS OPTIMIZER FEATURE
      ===================================================== */}
      <section className="px-5 sm:px-8 lg:px-[66px]">
        <div className="mx-auto flex max-w-[930px] flex-col overflow-hidden rounded-[10px] border border-white bg-white shadow-[0_10px_35px_rgba(45,40,100,0.07)] lg:flex-row">
          {/* Left Content */}
          <div className="flex flex-1 flex-col justify-center px-[40px] py-[45px] sm:px-[42px]">
            {/* Badge */}
            <div className="mb-[22px] inline-flex w-fit items-center gap-2 rounded-full bg-[#e7e9ff] px-[11px] py-[5px] text-[9px] font-medium text-[#4538d6]">
              <Sparkles className="h-[11px] w-[11px]" />
              AI ATS Optimizer
            </div>

            <h2 className="text-[26px] font-semibold tracking-[-0.7px]">
              Beat the bots with precision.
            </h2>

            <p className="mt-[15px] max-w-[410px] text-[12px] leading-[1.65] text-[#40506d]">
              Our advanced AI scans your resume against job descriptions,
              providing a compatibility score, identifying key strengths, and
              pinpointing critical weaknesses. Get actionable recommendations
              based on proven ATS logic to ensure your resume lands on a
              human&apos;s desk.
            </p>

            {/* Feature points */}
            <div className="mt-[26px] space-y-[18px]">
              <div className="flex items-start gap-3">
                <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eceeff]">
                  <CheckCircle2 className="h-[14px] w-[14px] text-[#493be0]" />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-[#151923]">
                    Instant Compatibility Score
                  </p>

                  <p className="mt-[2px] text-[9px] text-[#52617c]">
                    See exactly how well you match the job description.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#eceeff]">
                  <TrendingUp className="h-[14px] w-[14px] text-[#493be0]" />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-[#151923]">
                    Actionable Recommendations
                  </p>

                  <p className="mt-[2px] text-[9px] text-[#52617c]">
                    Step-by-step guidance on keywords and formatting.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ATS Mockup */}
          <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-white via-white to-[#e4e1ff] p-[40px]">
            <div className="w-full max-w-[400px] overflow-hidden rounded-[6px] border border-[#c7c7da] bg-[#faf9ff] shadow-sm">
              {/* Browser bar */}
              <div className="flex h-[35px] items-center gap-[7px] border-b border-[#d2d1df] bg-[#f7f7ff] px-3">
                <span className="h-[9px] w-[9px] rounded-full bg-[#c92525]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#d7ddf5]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#d7ddf5]" />

                <span className="ml-3 text-[8px] text-[#40506d]">
                  ATS_Scan_Report.pdf
                </span>
              </div>

              <div className="flex min-h-[290px] flex-col items-center justify-center px-8">
                {/* Score */}
                <div className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full border-[7px] border-[#e5e7ff]">
                  <div className="absolute inset-[-7px] rounded-full border-[7px] border-transparent border-t-[#4b3ee1] border-r-[#4b3ee1] rotate-[30deg]" />

                  <span className="text-[27px] font-medium text-[#4b3ee1]">
                    86
                  </span>
                </div>

                {/* Bars */}
                <div className="mt-[25px] w-[170px] space-y-[8px]">
                  <div className="h-[7px] rounded-full bg-[#e4e6fa]">
                    <div className="h-full w-[85%] bg-[#4b3ee1]" />
                  </div>

                  <div className="h-[7px] rounded-full bg-[#e4e6fa]">
                    <div className="h-full w-[70%] bg-[#4b3ee1]" />
                  </div>

                  <div className="h-[7px] rounded-full bg-[#e4e6fa]">
                    <div className="h-full w-[42%] bg-[#bd2020]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MORE POWERFUL TOOLS
      ===================================================== */}
      <section className="px-5 pb-[105px] pt-[80px] sm:px-8 lg:px-[66px]">
        <div className="mx-auto max-w-[930px]">
          <h2 className="text-center text-[17px] font-semibold">
            More powerful tools
          </h2>

          <div className="mt-[40px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
            {/* AI Writing */}
            <div className="min-h-[225px] rounded-[9px] border border-[#c9c8d8] bg-transparent px-[27px] py-[27px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[7px] bg-[#f0f1ff]">
                <Pencil className="h-[17px] w-[17px] text-[#4234db]" />
              </div>

              <h3 className="mt-[25px] text-[15px] font-medium">
                AI Writing Assistant
              </h3>

              <p className="mt-[10px] text-[11px] leading-[1.55] text-[#40506d]">
                Struggling with words? Generate impactful, action-oriented
                bullet points tailored to your role and industry instantly.
              </p>
            </div>

            {/* Templates */}
            <div className="min-h-[225px] rounded-[9px] border border-[#c9c8d8] bg-transparent px-[27px] py-[27px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[7px] bg-[#f0f1ff]">
                <FileText className="h-[17px] w-[17px] text-[#4234db]" />
              </div>

              <h3 className="mt-[25px] text-[15px] font-medium">
                Professional Templates
              </h3>

              <p className="mt-[10px] text-[11px] leading-[1.55] text-[#40506d]">
                Choose from a curated selection of minimalist, highly readable
                templates explicitly designed to pass ATS parsers flawlessly.
              </p>
            </div>

            {/* Preview */}
            <div className="min-h-[225px] rounded-[9px] border border-[#c9c8d8] bg-transparent px-[27px] py-[27px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[7px] bg-[#f0f1ff]">
                <Eye className="h-[17px] w-[17px] text-[#4234db]" />
              </div>

              <h3 className="mt-[25px] text-[15px] font-medium">
                Real-time Preview
              </h3>

              <p className="mt-[10px] text-[11px] leading-[1.55] text-[#40506d]">
                See your changes applied instantly. Adjust spacing, fonts, and
                layout on the fly with our responsive side-by-side editor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#d8d8e5] bg-[#f0f1ff]">
        <div className="mx-auto flex min-h-[72px] max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-8 lg:px-[66px]">
          <p className="text-[10px] font-semibold text-[#151923]">
            ResumeCraft
          </p>

          <p className="text-[9px] text-[#52617c]">
            © 2024 ResumeCraft. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-[9px] text-[#40506d]">
            <Link href="/privacy" className="hover:text-[#3024d0]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-[#3024d0]">
              Terms of Service
            </Link>

            <Link href="/contact" className="hover:text-[#3024d0]">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default FeaturesPage;
