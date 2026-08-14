import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "@/types/auth.types";

const registerUser = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  let data: AuthResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Registration failed (${response.status})`,
    );
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  let data: AuthResponse | null = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Server returned an invalid response (${response.status})`);
  }

  if (!response.ok) {
    throw new Error(data?.message || `Login failed (${response.status})`);
  }

  if (!data) {
    throw new Error("Server returned an empty response");
  }

  return data;
};

export { registerUser, loginUser };
