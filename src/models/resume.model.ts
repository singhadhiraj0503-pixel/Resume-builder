import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeShema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, default: "" },
    summary: { type: String, default: "" },
    personalInfo: {
      type: {
        fullname: String,
        email: String,
        mobile: String,
        location: String,
        github: String,
        portfolio: String,
      },
      default: {},
    },
    education: {
      type: [
        {
          institute: String,
          degree: String,
          startDate: String,
          endDate: String,
        },
      ],
    },
    workExperience: {
      type: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          githubUrl: String,
          liveUrl: String,
          techStack: [String],
        },
      ],
      default: [],
    },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
  },
  { timestamps: true },
);

const resumeModel = mongoose.model("Resume", resumeShema);
export default resumeModel;
