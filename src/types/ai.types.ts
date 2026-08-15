export interface GenerateSummaryBody {
  experienceLevel: string;
  skills: string[];
  jobTitle: string;
}

export interface GenerateSkillsBody {
  experienceLevel: string;
  jobTitle: string;
}

export interface GenerateProjectDescriptionBody {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
}

export interface GenerateExperienceDescriptionBody {
  experienceLevel: string;
  yearsOfExperience: number;
  techStack: string[];
  jobRole: string;
}

export interface ImproveContentBody {
  content: string;
}

export interface AtsScoreBody {
  resumeText: string;
}

// ================================
// AI RESPONSE TYPES
// ================================

export interface GenerateSummaryResponse {
  success: boolean;
  message: string;
  data: {
    summary: string;
  };
}

export interface GenerateSkillsResponse {
  success: boolean;
  message: string;
  data: {
    skills: string[];
  };
}

export interface GenerateProjectDescriptionResponse {
  success: boolean;
  message: string;
  data: {
    projectDescription: string;
  };
}

export interface GenerateExperienceDescriptionResponse {
  success: boolean;
  message: string;
  data: {
    workExperienceDescription: string;
  };
}

export interface ImproveContentResponse {
  success: boolean;
  message: string;
  data: {
    improvedContent: string;
  };
}

export interface ATSScore {
  atsScore: number;
  overallAssessment: string;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  missingSections: string[];
  keywordRecommendations: string[];
}

export interface AtsScoreResponse {
  success: boolean;
  message: string;
  data: {
    atsScore: ATSScore;
  };
}
