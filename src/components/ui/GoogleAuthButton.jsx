import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function GoogleAuthButton({ onErrorToast }) {
  const { setUser } = useAuth();

  const login = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (tokenResponse) => {
      // ⚠️ Bu hook access_token beradi (API scope uchun)
      // Sign-In (ID token) uchun biz "Google Identity Services button" yo‘lini ishlatamiz.
      // Shu sababli biz bu komponentni GIS "credential" bilan ishlaydigan variantga o‘zgartiramiz.
    },
  });

  // ✅ GIS credential (ID token) olish uchun: @react-oauth/google -> GoogleLogin komponenti ishlatiladi.
  // Biz dizayn 1:1 bo‘lishi uchun custom button + pop-up xohlaymiz, shuning uchun GoogleLogin'ni "render" bilan ishlatamiz.
  // Pastda SignUp/Login content ichida ishlatamiz.

  return null;
}
