import { apiPost } from "./client";

// Local signup
export function signUp({ fullName, email, password }) {
  return apiPost("auth/register/index.php", {
    full_name: fullName,
    email,
    password,
    agree: true,
  });
}

// Local login (sen ishlatyapsan)
export function login({ email, password }) {
  return apiPost("auth/login/index.php", { email, password });
}

// Google signup/login
export function googleLogin(idToken) {
  return apiPost("auth/google/index.php", { id_token: idToken });
}
