"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { validateLogin } from "../app/verif/LoginVerif";
import { Apilog } from "../app/api/LoginApi";
import { userContext } from '../app/Context/userContext'
const { useEffect, useContext } = require("react")

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const {user , setUser} = useContext(userContext);
  const [loading , setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user != null) {
       router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validateLogin(email, password);
    if (Object.keys(err).length === 0) {
      const rep = await Apilog(email, password);
      if (rep?.message === "success") {
        
         router.push('/dashboard');
         
        console.log("sahyyt");
      } else {
        setError(rep);
      }
    } else {
      setError(err);
    }
  };

  return (

    <div className="grid  min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src="/assets/login.svg"
          alt="Collaborative work"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="flex   items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <span className="text-red flex justify-start text-sm">
                  {error.email}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/email"
                  className="text-sm font-medium underline"
                  prefetch={false}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <span className="text-red flex justify-start text-sm">
                  {error.password}
                </span>
              )}
            </div>
            {error.error && <p className="text-red">{error.error}</p>}
            <Button
              type="submit"
              className="w-full bg-customblue hover:bg-customBlue2"
            >
              Login
            </Button>
            <div className="flex flex-row ">
            <p>Don't have an account ?  </p>
            <a
                  href="./signup"
                  className="text-sm font-medium underline text-customblue"
                  
                >
                  Sign up
                </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
