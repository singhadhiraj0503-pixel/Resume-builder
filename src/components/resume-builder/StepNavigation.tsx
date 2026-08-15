"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  saving: boolean;
  onBack: () => void;
  onNext: () => void;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  saving,
  onBack,
  onNext,
}: StepNavigationProps) => {
  const lastStep = currentStep === totalSteps - 1;

  return (
    <div className="mt-8 flex items-center justify-between border-t border-[#D8D5E5] pt-5">
      <button
        type="button"
        onClick={onBack}
        disabled={currentStep === 0 || saving}
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          border
          border-[#C9C6D8]
          bg-white
          px-5
          py-3
          text-sm
          text-[#29283B]
          transition
          hover:bg-[#F8F7FC]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      {!lastStep && (
        <button
          type="button"
          onClick={onNext}
          disabled={saving}
          className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-[#3526D9]
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-[#2E20C6]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default StepNavigation;
