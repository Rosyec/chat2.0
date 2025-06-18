"use client";

import { Mail, Github } from "lucide-react";
import { loginWithGithub, loginWithGoogle } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const handleGithubLogin = () => {
    loginWithGithub();
    router.push(`/chat`);
    // Implementar lógica de login con Facebook
    console.log("Login with Facebook");
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
    router.push(`/chat`);
    // Implementar lógica de login con Google
    console.log("Login with Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 text-sm">
              Accede a tu cuenta con tus redes sociales
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4">
            {/* Facebook Button */}
            <button
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
            >
              <Github className="w-5 h-5" />
              Continuar con Github
            </button>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <Mail className="w-5 h-5 text-[#4285F4]" />
              Continuar con Gmail
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Al continuar, aceptas nuestros términos de servicio y política de
              privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
