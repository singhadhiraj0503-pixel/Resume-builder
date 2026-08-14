"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth.service";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
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

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      console.log("Registration successful:", response);

      router.push("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9F7FF] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[472px] rounded-[8px] border border-[#C9C4DD] bg-white px-8 py-9 sm:px-[34px] sm:py-[35px]">
        {/* Logo */}
        <div className="mb-3 text-center">
          <h1 className="text-[22px] font-bold tracking-[-0.6px] text-[#2921D7]">
            ResumeCraft
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-9 text-center">
          <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.5px] text-[#111827]">
            Create your account
          </h2>

          <p className="mt-2 text-[16px] leading-[1.5] text-[#42465B]">
            Precision tools for the modern professional.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-[17px]">
            <label
              htmlFor="name"
              className="mb-[6px] block text-[16px] font-medium text-[#1C2030]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              autoComplete="name"
              className="h-[50px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-[17px] text-[17px] text-[#111827] outline-none transition placeholder:text-[#74758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />
          </div>

          {/* Email */}
          <div className="mb-[17px]">
            <label
              htmlFor="email"
              className="mb-[6px] block text-[16px] font-medium text-[#1C2030]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              autoComplete="email"
              className="h-[50px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-[17px] text-[17px] text-[#111827] outline-none transition placeholder:text-[#74758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />
          </div>

          {/* Password */}
          <div className="mb-[17px]">
            <label
              htmlFor="password"
              className="mb-[6px] block text-[16px] font-medium text-[#1C2030]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete="new-password"
              className="h-[50px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-[17px] text-[17px] text-[#111827] outline-none transition placeholder:text-[#74758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />
          </div>

          {/* Mobile */}
          <div className="mb-[17px]">
            <label
              htmlFor="mobile"
              className="mb-[6px] block text-[16px] font-medium text-[#1C2030]"
            >
              Mobile Number
            </label>

            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: value,
                  }));
                }
              }}
              placeholder="1234567890"
              required
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              className="h-[50px] w-full rounded-[8px] border border-[#C9C4DD] bg-[#FCFAFF] px-[17px] text-[17px] text-[#111827] outline-none transition placeholder:text-[#74758A] focus:border-[#3124E8] focus:ring-2 focus:ring-[#3124E8]/10"
            />

            {/* Mobile requirement */}
            <div className="mt-[7px] flex items-center gap-[6px] text-[14px] text-[#707286]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M12 10.5V16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="7.5" r="1" fill="currentColor" />
              </svg>

              <span>10 characters required</span>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-[8px] h-[47px] w-full rounded-[7px] bg-[#3728D9] text-[16px] font-medium text-white transition hover:bg-[#3022C5] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-[32px] h-px w-full bg-[#EEEAF5]" />

        {/* Login */}
        <p className="text-center text-[16px] text-[#42465B]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-[#1711E8] transition hover:opacity-75"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
