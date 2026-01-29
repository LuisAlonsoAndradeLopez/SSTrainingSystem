import axios from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (!axios.isAxiosError(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (data?.errors) {
    return Object.values(data.errors).flat().join("\n");
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  return fallback;
}
