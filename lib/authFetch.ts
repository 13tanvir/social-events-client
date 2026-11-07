import { authClient } from "./auth-client";
import { API_URL } from "./api";

// প্রতিটা প্রাইভেট রিকোয়েস্টে JWT টোকেন যোগ করে সার্ভারে পাঠায়
export async function authFetch(path: string, options: RequestInit = {}) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new Error("Not authenticated");
  }
  return fetch(API_URL + path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: "Bearer " + data.token,
    },
  });
}