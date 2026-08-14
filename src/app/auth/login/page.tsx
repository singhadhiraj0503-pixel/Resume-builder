"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth.service";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("Login successful:", response);

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);

      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F7FF] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[472px] rounded-[12px] border border-[#E5E1EC] bg-white px-8 py-9 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:px-9 sm:py-10">
        {/* Logo */}
        <div className="mb-9 flex items-center justify-center gap-3">
          <div className="flex h-[24px] w-[24px] items-center justify-center">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3.5H14L18.5 8V20.5H6V3.5Z"
                stroke="#3124E8"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M14 3.5V8H18.5"
                stroke="#3124E8"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 12H15"
                stroke="#3124E8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M9 15.5H15"
                stroke="#3124E8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-[22px] font-bold tracking-[-0.6px] text-[#111827]">
            ResumeCraft
          </span>
        </div>

        {/* Heading */}
        <div className="mb-9 text-center">
          <h1 className="text-[36px] font-semibold leading-[1.15] tracking-[-1.3px] text-[#111827] sm:text-[38px]">
            Welcome Back
          </h1>

          <p className="mx-auto mt-3 max-w-[390px] text-[17px] leading-[1.45] text-[#425577]">
            Log in to your account to continue building your
            <br className="hidden sm:block" />
            professional future.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-[16px] font-medium text-[#111827]"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-[54px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-4 text-[17px] text-[#111827] outline-none transition placeholder:text-[#73758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-[16px] font-medium text-[#111827]"
              >
                Password
              </label>

              <Link
                href="#"
                className="text-[14px] font-medium text-[#1711E8] transition hover:opacity-75"
              >
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="h-[54px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-4 text-[17px] text-[#111827] outline-none transition placeholder:text-[#73758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-[48px] w-full items-center justify-center gap-3 rounded-[7px] bg-[#3728D9] text-[16px] font-medium text-white transition hover:bg-[#3022C5] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}

            {!loading && (
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[#EEEAF5]" />

        {/* Sign Up */}
        <p className="text-center text-[16px] text-[#425577]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[#1711E8] transition hover:opacity-75"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
