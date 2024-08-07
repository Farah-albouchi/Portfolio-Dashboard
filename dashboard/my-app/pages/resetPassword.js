"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiNewPass, ApiResetPass } from "@/app/api/ResetPassApi";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/app/verif/LoginVerif";
import { useRouter } from "next/router";
import { validatePassword } from "@/app/verif/passwordVerif";


export default function resetPassword() {

  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState({});
  const router = useRouter();


  const onSubmit = async (e) => {
    
    e.preventDefault();
   const err = validatePassword(password,confirmPassword) ;
    if(Object.keys(err).length===0){
        const token = localStorage.getItem("token"); 
        console.log("Stored Token:", localStorage.getItem('token'));
      if (!token) {
        setError({ message: "Token not found, please try again." });
        return;
      }
        const rep = await ApiNewPass(password,token) ;
        if(rep?.message =="success"){
            console.log("khw")
            router.push("/login");
        } else {
            setError(rep);
        }
    }else {
        setError(err);
    }
 
  };


  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center ">
        <img
          src="/assets/Reset.svg"
          alt="Collaborative work"
          width={500}
        />
      </div>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto space-y-6 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Reset your password</h1>
            
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2 w-80">
              <Input
                id="password"
                type="password"
                placeholder="Enter password "
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              {error.password && (
                <span className="text-red flex justify-start text-sm">
                  {error.password}
                </span>
              )}
            </div>
            <div className="space-y-2 w-80">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              {error.confirmPassword && (
                <span className="text-red flex justify-start text-sm">
                  {error.confirmPassword}
                </span>
              )}
            </div>
            {error.error && <p className="text-red">{error.error}</p>}
            <Button type="submit" className="w-full bg-customblue">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
