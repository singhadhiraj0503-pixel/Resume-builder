"use client";

import Link from "next/link";
import {
  FileText,
  Sparkles,
  WandSparkles,
  Target,
  LayoutTemplate,
} from "lucide-react";

const features = [
  {
    icon: WandSparkles,
    title: "AI Writing Assistant",
    description:
      "Improve bullet points and summaries instantly. Our AI suggests impactful verbs and quantifies your achievements.",
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description:
      "Ensure your resume passes through every tracking system. We structure your data exactly how machines want to read it.",
  },
  {
    icon: LayoutTemplate,
    title: "Professional Templates",
    description:
      "Designer-crafted layouts for every industry. Choose from minimal, modern, or traditional styles that frame your content perfectly.",
  },
];

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="border-b border-[#dddbea] bg-[#faf9ff]">
        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="text-[17px] font-bold tracking-[-0.3px] text-[#3427c7]"
          >
            ResumeCraft
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#features"
              className="text-[11px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Features
            </a>

            <Link
              href="/templates"
              className="text-[11px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Templates
            </Link>

            <Link
              href="/pricing"
              className="text-[11px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className="text-[11px] text-[#34415e] transition hover:text-[#3427c7]"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden text-[11px] text-[#34415e] transition hover:text-[#3427c7] sm:block"
            >
              Log In
            </Link>

            <Link
              href="/dashboard"
              className="rounded-[6px] bg-[#4335d4] px-4 py-[9px] text-[11px] font-medium text-white shadow-sm transition hover:bg-[#372bc2]"
            >
              Build My Resume
            </Link>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-6 pb-[72px] pt-[96px] sm:px-10 lg:pt-[96px]">
        <div className="mx-auto max-w-[1400px] text-center">
          {/* Badge */}
          <div className="mb-7 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cdd0e8] bg-[#f8f8ff] px-3 py-[6px] text-[11px] text-[#46516d]">
              <Sparkles className="h-[11px] w-[11px] text-[#4335d4]" />
              <span>AI-Powered Resume Builder</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-[620px] text-[36px] font-bold leading-[1.08] tracking-[-1.5px] text-[#101526] sm:text-[42px] lg:text-[44px]">
            Elevate Your Career with
            <br />
            <span className="text-[#4a3de0]">AI-Precision</span> Resumes.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[610px] text-[14px] leading-[1.55] text-[#40506f]">
            Craft a professional, ATS-optimized resume in minutes with our
            intelligent building suite. Let data-driven design tell your
            professional story.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="flex h-[40px] min-w-[135px] items-center justify-center rounded-[5px] bg-[#4938dd] px-5 text-[11px] font-medium text-white shadow-sm transition hover:bg-[#392bc7]"
            >
              Build My Resume
            </Link>

            <Link
              href="/templates"
              className="flex h-[40px] min-w-[130px] items-center justify-center rounded-[5px] border border-[#c9c9dc] bg-white px-5 text-[11px] text-[#34415e] transition hover:border-[#4938dd] hover:text-[#4938dd]"
            >
              View Templates
            </Link>
          </div>

          {/* =====================================================
              HERO PREVIEW
          ===================================================== */}
          <div className="mx-auto mt-[60px] max-w-[770px]">
            <div className="rounded-[9px] border border-[#c8c8dc] bg-white p-[6px] shadow-[0_18px_45px_rgba(68,55,180,0.10)]">
              <div className="overflow-hidden rounded-[6px]">
                <img
                  src="https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="ResumeCraft AI resume builder preview"
                  className="block h-100 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
        id="features"
        className="border-t border-[#e0deea] px-6 pb-[95px] pt-[72px] sm:px-10"
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Section Heading */}
          <div className="text-center">
            <h2 className="text-[25px] font-semibold tracking-[-0.6px] text-[#101526]">
              Engineered for Success
            </h2>

            <p className="mx-auto mt-3 max-w-[560px] text-[12px] leading-[1.55] text-[#4c5b78]">
              Everything you need to bypass filters and impress recruiters,
              packaged in a beautifully minimal interface.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-[46px] grid grid-cols-1 gap-[17px] md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="min-h-[205px] rounded-[8px] border border-[#d0cfdf] bg-white p-6"
                >
                  {/* Icon */}
                  <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[5px] bg-[#f0f0ff]">
                    <Icon className="h-[17px] w-[17px] text-[#4537dc]" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-[15px] font-semibold text-[#111725]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-[310px] text-[12px] leading-[1.55] text-[#40506f]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="border-t border-[#dddbea] bg-white">
        <div className="mx-auto flex min-h-[66px] max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row sm:px-10 lg:px-[60px]">
          {/* Left */}
          <div className="flex items-center gap-3 text-[10px] text-[#596076]">
            <span className="font-bold text-[#111725]">ResumeCraft</span>

            <span className="h-[14px] w-px bg-[#d1d0dc]" />

            <span>© 2024 ResumeCraft. Precision in every pixel.</span>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-[9px] text-[#596076]">
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
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
