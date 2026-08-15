import {
  CreateResumeResponse,
  GetResumeResponse,
  GetResumesResponse,
  IResume,
  UpdateResumeResponse,
} from "@/types/resume.types";

/**
 * Create a new resume
 */
const createResume = async (): Promise<CreateResumeResponse> => {
  const response = await fetch("/api/resume/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const text = await response.text();

  let data: CreateResumeResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to create resume (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/**
 * Get a resume by ID
 */
const getResume = async (resumeId: string): Promise<GetResumeResponse> => {
  const response = await fetch(`/api/resume/${resumeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const text = await response.text();

  let data: GetResumeResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to fetch resume (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

/**
 * Update a resume by ID
 */
// const updateResume = async (
//   resumeId: string,
//   resumeData: Partial<IResume>,
// ): Promise<UpdateResumeResponse> => {
//   const response = await fetch(`/api/resume/${resumeId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify(resumeData),
//   });

//   const text = await response.text();

//   let data: UpdateResumeResponse | null = null;

//   try {
//     data = text ? JSON.parse(text) : null;
//   } catch {
//     throw new Error(`Server returned an invalid response (${response.status})`);
//   }

//   if (!response.ok) {
//     throw new Error(
//       data?.message || `Failed to update resume (${response.status})`,
//     );
//   }

//   if (!data) {
//     throw new Error("Server returned an empty response");
//   }

//   return data;
// };

const updateResume = async (
  resumeId: string,
  resumeData: Partial<IResume>,
): Promise<UpdateResumeResponse> => {
  const { _id, user_id, createdAt, updatedAt, ...editableResumeData } =
    resumeData as IResume & {
      createdAt?: string;
      updatedAt?: string;
    };

  const response = await fetch(`/api/resume/${resumeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(editableResumeData),
  });

  const text = await response.text();

  let data: UpdateResumeResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to update resume (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

const getAllResumes = async (): Promise<GetResumesResponse> => {
  const response = await fetch("/api/resume", {
    method: "GET",
    credentials: "include",
  });

  const text = await response.text();

  let data: GetResumesResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Failed to fetch resumes (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

export { createResume, getResume, updateResume, getAllResumes };
