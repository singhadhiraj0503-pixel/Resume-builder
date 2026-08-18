"use client";

import Link from "next/link";
import { CheckCircle2, UserRound } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Minimal" | "Professional" | "Creative";

type Template = {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  tags: string[];
  image: string;
  featured?: boolean;
};

const templates: Template[] = [
  {
    id: "modernist",
    name: "The Modernist",
    category: "Minimal",
    tags: ["Minimal", "ATS-Friendly"],
    image:
      "https://plus.unsplash.com/premium_photo-1771777895332-f9f89ddfe157?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9kZXJuaXN0JTIwcmVzdW1lfGVufDB8fDB8fHww",
  },
  {
    id: "executive",
    name: "Executive",
    category: "Professional",
    tags: ["Professional", "Dense"],
    image:
      "https://images.unsplash.com/photo-1698047681432-006d2449c631?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhlY3V0aXZlJTIwcmVzdW1lfGVufDB8fDB8fHww",
    featured: true,
  },
  {
    id: "innovator",
    name: "The Innovator",
    category: "Creative",
    tags: ["Creative", "Visual"],
    image:
      "https://plus.unsplash.com/premium_photo-1661779134041-9d618ec4c812?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5ub3ZhdG9yJTIwcmVzdW1lfGVufDB8fDB8fHww",
  },
  {
    id: "clean-slate",
    name: "Clean Slate",
    category: "Minimal",
    tags: ["Minimal", "ATS-Friendly"],
    image:
      "https://images.unsplash.com/photo-1693045181178-d5d83fb070c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYW4lMjByZXN1bWV8ZW58MHx8MHx8fDA%3D",
  },
];

const categories: Category[] = ["All", "Minimal", "Professional", "Creative"];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredTemplates =
    activeCategory === "All"
      ? templates
      : templates.filter((template) => template.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#faf9ff] text-[#111827]">
      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <header className="border-b border-[#dedde8] bg-[#faf9ff]">
        <div className="mx-auto flex h-[52px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-[14px] font-semibold tracking-[-0.4px] text-[#3024c9]"
          >
            ResumeCraft
          </Link>

          {/* Navigation */}
          <nav className="hidden h-full items-center gap-7 md:flex">
            <Link
              href="/dashboard"
              className="flex h-full items-center text-[10px] text-[#27324a] transition hover:text-[#3024c9]"
            >
              Dashboard
            </Link>

            <Link
              href="/templates"
              className="relative flex h-full items-center text-[10px] font-medium text-[#3024c9]"
            >
              Templates
              {/* Active underline */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3024c9]" />
            </Link>

            <Link
              href="/ai-writer"
              className="flex h-full items-center text-[10px] text-[#27324a] transition hover:text-[#3024c9]"
            >
              AI Writer
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="rounded-[4px] bg-[#3428d1] px-4 py-[7px] text-[9px] font-medium text-white transition hover:bg-[#2c21ba]"
            >
              Build Resume
            </Link>

            <Link
              href="/profile"
              aria-label="Profile"
              className="text-[#111827] transition hover:text-[#3024c9]"
            >
              <UserRound className="h-[15px] w-[15px]" />
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-5 pt-[52px] sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[900px] text-center">
          <h1 className="text-[32px] font-semibold leading-tight tracking-[-1.2px] text-[#111827] sm:text-[38px]">
            Choose Your Foundation
          </h1>

          <p className="mx-auto mt-3 max-w-[650px] text-[12px] leading-[1.55] text-[#3d4964] sm:text-[13px]">
            Select from our gallery of professionally designed, ATS-optimized
            templates. Each layout is meticulously crafted to highlight your
            strengths with a sophisticated, modern aesthetic.
          </p>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}
      <section className="px-5 pt-[38px] sm:px-8 lg:px-16">
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={[
                    "rounded-full px-4 py-[7px] text-[10px] transition",
                    active
                      ? "bg-[#382bd2] text-white"
                      : "bg-[#eceeff] text-[#41506d] hover:bg-[#e2e3ff]",
                  ].join(" ")}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          TEMPLATE GRID
      ===================================================== */}
      <section className="px-5 pb-[100px] pt-[38px] sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group overflow-hidden rounded-[8px] border border-[#cac9d8] bg-[#faf9ff] shadow-[0_2px_5px_rgba(30,35,70,0.04)]"
            >
              {/* Template Preview */}
              <div className="relative h-[397px] overflow-hidden bg-[#edf0f5]">
                <img
                  src={template.image}
                  alt={`${template.name} resume template`}
                  className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.01]"
                />

                {/* Featured badge/icon */}
                {template.featured && (
                  <div className="absolute right-3 bottom-3 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                    <CheckCircle2 className="h-4 w-4 text-[#3428d1]" />
                  </div>
                )}
              </div>

              {/* Template Information */}
              <div className="px-[14px] pb-[13px] pt-[12px]">
                <h2 className="text-[14px] font-medium text-[#111827]">
                  {template.name}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#e9ebff] px-[10px] py-[4px] text-[8px] text-[#42506b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="mx-auto mt-10 max-w-[900px] rounded-lg border border-dashed border-[#c9c8d8] bg-white py-16 text-center">
            <p className="text-sm text-[#566078]">No templates found.</p>
          </div>
        )}
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="border-t border-[#d4d3df] bg-[#faf9ff]">
        <div className="mx-auto flex min-h-[75px] max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-8 lg:px-16">
          {/* Logo */}
          <Link href="/" className="text-[14px] font-semibold text-[#3024c9]">
            ResumeCraft
          </Link>

          {/* Footer links */}
          <div className="flex flex-wrap justify-center gap-5 text-[9px] text-[#5b6376]">
            <Link
              href="/privacy"
              className="underline-offset-2 hover:text-[#3024c9] hover:underline"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="underline-offset-2 hover:text-[#3024c9] hover:underline"
            >
              Terms of Service
            </Link>

            <Link
              href="/help"
              className="underline-offset-2 hover:text-[#3024c9] hover:underline"
            >
              Help Center
            </Link>

            <Link
              href="/contact"
              className="underline-offset-2 hover:text-[#3024c9] hover:underline"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-[9px] text-[#5b6376]">
            © 2024 ResumeCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
