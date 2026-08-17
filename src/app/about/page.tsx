"use client";

import Link from "next/link";
import { Brain, Crosshair, TrendingUp, ArrowRight } from "lucide-react";

const principles = [
  {
    icon: Brain,
    title: "AI Precision",
    description:
      "Our intelligent engine analyzes job descriptions and tailors your phrasing to ensure maximum ATS compatibility without losing your authentic voice.",
  },
  {
    icon: Crosshair,
    title: "User-Centric Design",
    description:
      "We prioritize a distraction-free, gallery-like canvas. Minimal UI clutter means you can focus entirely on your content and career narrative.",
  },
  {
    icon: TrendingUp,
    title: "Career Excellence",
    description:
      "Your success is our metric. We build tools that don't just secure interviews, but position you as a premium candidate in any competitive market.",
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="border-b border-[#dcdbe7] bg-[#faf9ff]">
        <div className="mx-auto flex h-[40px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[50px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-[13px] font-semibold tracking-[-0.3px] text-[#3427c7]"
          >
            ResumeCraft
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="text-[10px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Dashboard
            </Link>

            <Link
              href="/templates"
              className="text-[10px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Templates
            </Link>

            <Link
              href="/ai-writer"
              className="text-[10px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              AI Writer
            </Link>

            <Link
              href="/preview"
              className="text-[10px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Preview
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="rounded-[5px] border border-[#c9c8d7] bg-white px-3 py-[5px] text-[9px] text-[#34415e] transition hover:border-[#4335d4]"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="rounded-[5px] bg-[#4335d4] px-3 py-[6px] text-[9px] font-medium text-white transition hover:bg-[#3628c2]"
            >
              Build Now
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-5 pb-0 pt-[92px] sm:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center">
            <h1 className="mx-auto max-w-[540px] text-[37px] font-semibold leading-[1.08] tracking-[-1.5px] text-[#101526] sm:text-[42px]">
              Empowering Your Career
              <br />
              Journey
            </h1>

            <p className="mx-auto mt-6 max-w-[470px] text-[12px] leading-[1.65] tracking-[0.1px] text-[#303a55]">
              We blend human expertise with advanced AI precision to create a
              resume builder that doesn&apos;t just format documents—it crafts
              compelling career narratives designed to bypass ATS filters and
              captivate recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          ORIGIN SECTION
      ===================================================== */}
      <section className="px-5 pt-[62px] sm:px-8 lg:px-[50px]">
        <div className="mx-auto grid max-w-[710px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Text */}
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-[#101526]">
              The Origin of Precision
            </h2>

            <p className="mt-4 text-[10px] leading-[1.55] text-[#3d465f]">
              ResumeCraft was born out of frustration. We watched talented
              professionals get passed over by automated Applicant Tracking
              Systems (ATS) simply because their resumes weren&apos;t formatted
              to the strict, often arbitrary standards of modern recruitment
              software.
            </p>

            <p className="mt-3 text-[10px] leading-[1.55] text-[#3d465f]">
              Our founders—a mix of former technical recruiters and AI
              engineers—realized that the hiring process needed an equalizer. We
              built a platform that handles the complex, technical constraints
              of resume building under the hood, leaving users free to focus
              entirely on articulating their value.
            </p>
          </div>

          {/* Image */}
          <div className="overflow-hidden rounded-[7px] border border-[#d0cfdd] bg-white">
            <img
              src="https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ResumeCraft workspace"
              className="h-[255px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE PRINCIPLES
      ===================================================== */}
      <section className="px-5 pt-[78px] sm:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-[710px]">
          <h2 className="text-center text-[20px] font-semibold tracking-[-0.4px] text-[#101526]">
            Our Core Principles
          </h2>

          <div className="mt-[22px] grid grid-cols-1 gap-4 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="min-h-[166px] rounded-[7px] border border-[#d0cfdd] bg-white p-5"
                >
                  {/* Icon */}
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] bg-[#eeeeff]">
                    <Icon className="h-[14px] w-[14px] text-[#4235d7]" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-[12px] font-medium text-[#111725]">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[9.5px] leading-[1.55] text-[#46506a]">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS / MISSION
      ===================================================== */}
      <section className="px-5 pt-[80px] sm:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-[710px] rounded-[8px] border border-[#d0d0e2] bg-[#f1f1ff] px-5 py-[40px] text-center sm:px-10">
          <h2 className="text-[20px] font-semibold text-[#101526]">
            Empowering Millions
          </h2>

          <p className="mx-auto mt-3 max-w-[450px] text-[10px] leading-[1.55] text-[#3d465f]">
            Our mission extends beyond a single document. We are dedicated to
            democratizing access to professional resume writing, aiming to help
            1 million job seekers land their dream roles by 2025.
          </p>

          {/* Statistics */}
          <div className="mt-7 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
            {/* Stat 1 */}
            <div className="min-w-[125px] sm:border-r sm:border-[#d0d0dc] sm:pr-7">
              <div className="text-[29px] font-semibold leading-none text-[#3023cc]">
                250k+
              </div>

              <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.4px] text-[#31384d]">
                Resumes Built
              </p>
            </div>

            {/* Stat 2 */}
            <div className="min-w-[125px] sm:border-r sm:border-[#d0d0dc] sm:px-7">
              <div className="text-[29px] font-semibold leading-none text-[#3023cc]">
                98%
              </div>

              <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.4px] text-[#31384d]">
                ATS Pass Rate
              </p>
            </div>

            {/* Stat 3 */}
            <div className="min-w-[125px] sm:pl-7">
              <div className="text-[29px] font-semibold leading-none text-[#3023cc]">
                4.9/5
              </div>

              <p className="mt-2 text-[7px] font-medium uppercase tracking-[0.4px] text-[#31384d]">
                User Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="px-5 pb-[92px] pt-[78px] sm:px-8 lg:px-[50px]">
        <div className="mx-auto max-w-[710px] text-center">
          <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-[#101526]">
            Ready to Elevate Your Career?
          </h2>

          <p className="mx-auto mt-3 max-w-[390px] text-[10px] leading-[1.55] text-[#4b556f]">
            Join the professionals who have already transformed their job
            search. Start building a premium resume today.
          </p>

          <Link
            href="/dashboard"
            className="mx-auto mt-5 inline-flex h-[38px] items-center justify-center gap-2 rounded-[5px] bg-[#4335d4] px-5 text-[10px] font-medium text-white transition hover:bg-[#3527c4]"
          >
            Start Building Now
            <ArrowRight className="h-[12px] w-[12px]" />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#d5d4df] bg-[#f0f0ff]">
        <div className="mx-auto flex min-h-[58px] max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-4 sm:flex-row sm:px-8 lg:px-[50px]">
          {/* Logo */}
          <span className="text-[10px] font-semibold text-[#101526]">
            ResumeCraft
          </span>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[7px] text-[#4d556b]">
            <Link href="/privacy" className="transition hover:text-[#3427c7]">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-[#3427c7]">
              Terms of Service
            </Link>

            <Link href="/help" className="transition hover:text-[#3427c7]">
              Help Center
            </Link>

            <Link href="/contact" className="transition hover:text-[#3427c7]">
              Contact Us
            </Link>
          </div>

          {/* Copyright */}
          <span className="text-[7px] text-[#5a6073]">
            © 2024 ResumeCraft. Precision in every pixel.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default AboutPage;
