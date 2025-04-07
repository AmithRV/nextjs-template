import { handleGetMethod, handlePostMethod } from "@/lib/api-config/methods";

export function userLogin(data) {
  return handlePostMethod("/api/auth/login", data);
}

export function userSignup(data) {
  return handlePostMethod("/api/auth/signup", data);
}

export function userLogout() {
  return handleGetMethod("/api/auth/logout");
}

export function passwordReset(data) {
  return handlePostMethod("/api/auth/forgot-password", data);
}
