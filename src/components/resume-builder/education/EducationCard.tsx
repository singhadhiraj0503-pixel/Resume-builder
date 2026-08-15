"use client";

import { Trash2 } from "lucide-react";
import { IEducation } from "@/types/resume.types";

interface Props {
  education: IEducation;
  index: number;
  onChange: (index: number, data: Partial<IEducation>) => void;
  onRemove: () => void;
}

const EducationCard = ({ education, index, onChange, onRemove }: Props) => {
  return (
    <div className="rounded-lg border border-[#D3D0DF] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#202034]">
          Education {index + 1}
        </h3>

        <button
          type="button"
          onClick={onRemove}
          className="rounded-md p-2 text-red-400 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Institute"
          value={education.institute}
          onChange={(value) => onChange(index, { institute: value })}
        />

        <Field
          label="Degree"
          value={education.degree}
          onChange={(value) => onChange(index, { degree: value })}
        />

        <Field
          label="Start Date"
          type="month"
          value={education.startDate}
          onChange={(value) => onChange(index, { startDate: value })}
        />

        <Field
          label="End Date"
          type="month"
          value={education.endDate}
          onChange={(value) => onChange(index, { endDate: value })}
        />
      </div>
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}

const Field = ({ label, value, type = "text", onChange }: FieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-medium">{label}</label>

    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-lg border border-[#C9C6D8] bg-white px-3 text-sm outline-none focus:border-[#5141E5]"
    />
  </div>
);

export default EducationCard;
