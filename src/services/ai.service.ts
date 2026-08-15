import {
  AtsScoreBody,
  AtsScoreResponse,
  GenerateExperienceDescriptionBody,
  GenerateExperienceDescriptionResponse,
  GenerateProjectDescriptionBody,
  GenerateProjectDescriptionResponse,
  GenerateSkillsBody,
  GenerateSkillsResponse,
  GenerateSummaryBody,
  GenerateSummaryResponse,
  ImproveContentBody,
  ImproveContentResponse,
} from "@/types/ai.types";

/* =========================================================
     Generate Summary
     ========================================================= */

export const generateSummary = async (
  body: GenerateSummaryBody,
): Promise<GenerateSummaryResponse> => {
  const response = await fetch("/api/ai/generate-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: GenerateSummaryResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to generate summary (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/* =========================================================
     Generate Skills
     ========================================================= */

export const generateSkills = async (
  body: GenerateSkillsBody,
): Promise<GenerateSkillsResponse> => {
  const response = await fetch("/api/ai/generate-skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: GenerateSkillsResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to generate skills (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/* =========================================================
     Generate Project Description
     ========================================================= */

export const generateProjectDescription = async (
  body: GenerateProjectDescriptionBody,
): Promise<GenerateProjectDescriptionResponse> => {
  const response = await fetch("/api/ai/generate-project-description", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: GenerateProjectDescriptionResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Failed to generate project description (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/* =========================================================
     Generate Experience Description
     ========================================================= */

export const generateExperienceDescription = async (
  body: GenerateExperienceDescriptionBody,
): Promise<GenerateExperienceDescriptionResponse> => {
  const response = await fetch("/api/ai/generate-experience-description", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: GenerateExperienceDescriptionResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Failed to generate experience description (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/* =========================================================
     Improve Content
     ========================================================= */

export const improveContent = async (
  body: ImproveContentBody,
): Promise<ImproveContentResponse> => {
  const response = await fetch("/api/ai/improve-content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: ImproveContentResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to improve content (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/* =========================================================
     ATS Score
     ========================================================= */

export const generateATSScore = async (
  body: AtsScoreBody,
): Promise<AtsScoreResponse> => {
  const response = await fetch("/api/ai/ats-score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const text = await response.text();

  let data: AtsScoreResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to generate ATS score (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};
