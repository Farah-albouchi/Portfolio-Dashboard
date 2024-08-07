"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiResetPass } from "@/app/api/ResetPassApi";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/app/verif/LoginVerif";
import { useRouter } from "next/router";


export default function Email() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const router = useRouter();


  const onSubmit = async (e) => {
    
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError({ message: "Email is not valid!" });
      return;
    }

    const rep = await ApiResetPass(email);
    if (rep?.message === "success") {
      router.push(`/verification?email=${encodeURIComponent(email)}`); 
    } else {
      setError(rep);
    }
  };


  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center ">
        <img
          src="/assets/Email.svg"
          alt="Collaborative work"
          className="h-screen w-full object-cover"
          width={300}
        />
      </div>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto space-y-6 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Enter your Email</h1>
            <p className="mt-2 text-muted-foreground">
              Please enter your Email to send the code.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2 w-80">
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.message && (
                <span className="text-red flex justify-start text-sm">
                  {error.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full bg-customblue">
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
