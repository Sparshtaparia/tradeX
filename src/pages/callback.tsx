// src/pages/auth/callback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase"; // Ensure you export supabase client here
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      const { error } = await supabase.auth.getSession(); // Alternatively: supabase.auth.exchangeCodeForSession()
      
      if (error) {
        toast.error("Failed to complete sign-in.");
      } else {
        toast.success("Email verified! Logging you in...");
        navigate("/dashboard");
      }
    }

    handleAuth();
  }, [navigate]);

  return <p className="text-white text-center mt-10">Verifying your email, please wait...</p>;
};

export default AuthCallback;
