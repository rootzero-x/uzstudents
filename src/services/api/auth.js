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

export function requestPasswordReset({ email }) {
  return apiPost("password_reset/request.php", { email });
}

// 2) Kod tasdiqlanadi -> reset_token olinadi
export function verifyResetCode({ email, code }) {
  return apiPost("password_reset/verify.php", { email, code });
}

// 3) Yangi parol qo‘yiladi -> parol yangilanadi
export function changePassword({ email, reset_token, password }) {
  return apiPost("password_reset/change.php", { email, reset_token, password });
}