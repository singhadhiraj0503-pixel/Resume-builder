"use client";

import Link from "next/link";
import { Check, CircleX, CircleCheck, FileText } from "lucide-react";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "Perfect for getting started.",
    features: [
      {
        text: "1 professional resume",
        included: true,
      },
      {
        text: "Basic minimal templates",
        included: true,
      },
      {
        text: "Standard PDF export",
        included: true,
      },
      {
        text: "AI-powered writing assistant",
        included: false,
      },
    ],
    buttonText: "Start for Free",
    href: "/auth/register?plan=free",
    highlighted: false,
  },

  {
    name: "Professional",
    price: "$9.99",
    period: "/mo",
    description: "Everything you need to land interviews.",
    features: [
      {
        text: "Unlimited resumes",
        included: true,
      },
      {
        text: "AI-powered writing assistant",
        included: true,
      },
      {
        text: "ATS optimization scanner",
        included: true,
      },
      {
        text: "All premium templates",
        included: true,
      },
    ],
    buttonText: "Get Professional",
    href: "/auth/register?plan=professional",
    highlighted: true,
  },

  {
    name: "Executive",
    price: "$24.99",
    period: "/mo",
    description: "Billed annually at $299.88",
    features: [
      {
        text: "Everything in Professional",
        included: true,
      },
      {
        text: "Expert resume review",
        included: true,
      },
      {
        text: "Cover letter builder",
        included: true,
      },
      {
        text: "Priority 24/7 support",
        included: true,
      },
    ],
    buttonText: "Go Executive",
    href: "/auth/register?plan=executive",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access to your premium features until the end of your current billing cycle.",
  },
  {
    question: "What does the ATS optimization scanner do?",
    answer:
      "Our ATS scanner analyzes your resume against typical Applicant Tracking System algorithms. It suggests keyword improvements, formatting fixes, and readability enhancements to ensure your resume gets past the bots and in front of human eyes.",
  },
  {
    question: "Is the Expert Review included immediately?",
    answer:
      "For Executive plan members, you can request your expert review as soon as you complete your first draft. Our certified resume writers typically provide detailed, actionable feedback within 48 hours.",
  },
];

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#101526]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="border-b border-[#dcdbe8] bg-[#faf9ff]">
        <div className="mx-auto flex h-[58px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-[64px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] font-semibold text-[#3024c9]"
          >
            <FileText className="h-[15px] w-[15px]" />
            <span>ResumeCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/features"
              className="text-[10px] text-[#35415c] transition hover:text-[#3024c9]"
            >
              Features
            </Link>

            <Link
              href="/pricing"
              className="relative py-5 text-[10px] font-medium text-[#3024c9]"
            >
              Pricing
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3024c9]" />
            </Link>

            <Link
              href="/templates"
              className="text-[10px] text-[#35415c] transition hover:text-[#3024c9]"
            >
              Templates
            </Link>

            <Link
              href="/about"
              className="text-[10px] text-[#35415c] transition hover:text-[#3024c9]"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/auth/login"
              className="text-[10px] text-[#35415c] transition hover:text-[#3024c9]"
            >
              Log In
            </Link>

            <Link
              href="/auth/register"
              className="rounded-[5px] bg-[#3428d1] px-[16px] py-[8px] text-[9px] font-medium text-white transition hover:bg-[#2d21bc]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          PAGE INTRO
      ===================================================== */}
      <section className="px-5 pt-[76px] sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[850px] text-center">
          <h1 className="text-[34px] font-semibold leading-[1.15] tracking-[-1.2px] text-[#101526] sm:text-[39px]">
            Plans for Every Career Stage
          </h1>

          <p className="mx-auto mt-[16px] max-w-[570px] text-[12px] leading-[1.65] text-[#40506d] sm:text-[13px]">
            Whether you&apos;re crafting your first resume or aiming for the
            C-suite, we have the tools you need to stand out. Simple,
            transparent pricing.
          </p>
        </div>
      </section>

      {/* =====================================================
          PRICING CARDS
      ===================================================== */}
      <section className="px-5 pb-[75px] pt-[54px] sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[895px] grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative flex flex-col rounded-[10px] border bg-white px-[25px] pb-[25px] pt-[25px]",
                plan.highlighted
                  ? "border-[2px] border-[#4335ff] shadow-[0_7px_25px_rgba(67,53,255,0.14)]"
                  : "border-[#c9c8d8]",
              ].join(" ")}
            >
              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#3428d1] px-[14px] py-[5px] text-[8px] font-semibold uppercase tracking-[0.2px] text-white">
                  Recommended
                </div>
              )}

              {/* Plan Name */}
              <h2
                className={[
                  "text-[15px] font-semibold",
                  plan.highlighted ? "text-[#3024d0]" : "text-[#111827]",
                ].join(" ")}
              >
                {plan.name}
              </h2>

              {/* Price */}
              <div className="mt-[13px] flex items-baseline">
                <span className="text-[39px] font-semibold leading-none tracking-[-1.5px] text-[#101526]">
                  {plan.price}
                </span>

                <span className="ml-2 text-[11px] text-[#40506d]">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="mt-[10px] min-h-[20px] text-[10px] text-[#52617c]">
                {plan.description}
              </p>

              {/* Divider */}
              <div className="my-[14px] h-px bg-[#dfe1ec]" />

              {/* Features */}
              <div className="flex flex-1 flex-col">
                <div className="space-y-[17px]">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <CircleCheck
                          className={[
                            "mt-[1px] h-[14px] w-[14px] shrink-0",
                            plan.highlighted
                              ? "text-[#3428d1]"
                              : "text-[#6e7788]",
                          ].join(" ")}
                        />
                      ) : (
                        <CircleX className="mt-[1px] h-[14px] w-[14px] shrink-0 text-[#d0d2dc]" />
                      )}

                      <span
                        className={[
                          "text-[10px] leading-[1.3]",
                          feature.included
                            ? "text-[#31384b]"
                            : "text-[#a4a7b0]",
                        ].join(" ")}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <Link
                href={plan.href}
                className={[
                  "mt-[27px] flex h-[40px] items-center justify-center rounded-[5px] text-[10px] font-medium transition",
                  plan.highlighted
                    ? "bg-[#382bd2] text-white shadow-[0_2px_5px_rgba(50,40,210,0.2)] hover:bg-[#3024c2]"
                    : "border border-[#c9c8d8] bg-[#faf9ff] text-[#151a27] hover:border-[#4335d4] hover:text-[#3024c9]",
                ].join(" ")}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <section className="px-5 pb-[130px] sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[680px]">
          <h2 className="text-center text-[25px] font-semibold tracking-[-0.7px] text-[#101526]">
            Frequently Asked Questions
          </h2>

          <div className="mt-[27px] space-y-[13px]">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[8px] border border-[#cfd4f0] bg-white px-[20px] py-[20px]"
              >
                <h3 className="text-[13px] font-semibold text-[#151923]">
                  {faq.question}
                </h3>

                <p className="mt-[9px] text-[10px] leading-[1.6] text-[#40506d]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#d7d7e2] bg-[#f0f1ff]">
        <div className="mx-auto flex min-h-[82px] max-w-[1400px] flex-col justify-center gap-4 px-5 py-5 sm:px-8 lg:px-[64px]">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Left */}
            <div>
              <p className="text-[10px] font-semibold text-[#111827]">
                ResumeCraft
              </p>

              <p className="mt-2 text-[9px] text-[#4c556b]">
                © 2024 ResumeCraft. All rights reserved.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-wrap justify-center gap-5 text-[9px] text-[#5a6275]">
              <Link href="/privacy" className="transition hover:text-[#3024c9]">
                Privacy Policy
              </Link>

              <Link href="/terms" className="transition hover:text-[#3024c9]">
                Terms of Service
              </Link>

              <Link href="/contact" className="transition hover:text-[#3024c9]">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default PricingPage;
