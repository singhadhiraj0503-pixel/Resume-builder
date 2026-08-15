import { Dispatch, SetStateAction } from "react";
import { IResume } from "@/types/resume.types";

export interface ResumeBuilderStepProps {
  resume: IResume;
  updateResume: (updates: Partial<IResume>) => void;
}

export interface ResumeBuilderStateProps {
  resume: IResume;
  setResume: Dispatch<SetStateAction<IResume>>;
}
