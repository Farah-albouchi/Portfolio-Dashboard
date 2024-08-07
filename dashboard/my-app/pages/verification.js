"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ApiCodeOTP } from "@/app/api/ResetPassApi";

export default function verification() {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  const onSubmit = async (e) => {
    e.preventDefault();
   const rep = await ApiCodeOTP(email,value);
   if (rep?.message === "success") {
    console.log(`Verifying OTP for email: ${email}`);
    router.push("/resetPassword");
  } else {
    setError(rep);
  }
  
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center ">
        <img
          src="/assets/OTP.svg"
          alt="Collaborative work"
          className="h-screen "
          width={500}
        />
      </div>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Verify your identity</h1>
            <p className="mt-2 text-muted-foreground">
              Please enter the one-time password (OTP) code sent to your Email.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="otp" className="sr-only">
                OTP Code
              </Label>
              <div className="flex items-center space-x-3">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
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
