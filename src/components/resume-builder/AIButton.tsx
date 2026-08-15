"use client";

import { Sparkles, Loader2 } from "lucide-react";

interface AIButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const AIButton = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
}: AIButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        px-4
        py-2.5
        text-sm
        font-medium
        transition
        disabled:cursor-not-allowed
        disabled:opacity-60

        ${
          variant === "primary"
            ? "bg-[#3526D9] text-white hover:bg-[#2F21C5]"
            : "border border-[#C8C5DD] bg-white text-[#25233A] hover:bg-[#F8F7FC]"
        }
      `}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}

      {loading ? "Generating..." : children}
    </button>
  );
};

export default AIButton;
