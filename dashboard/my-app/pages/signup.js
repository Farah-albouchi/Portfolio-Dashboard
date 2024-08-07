"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { validateRegister } from "../app/verif/RegisterVerif";
import { Apireg } from "../app/api/RegisterApi";
import { userContext } from '../app/Context/userContext'
const { useEffect, useContext } = require("react")

export default function Register() {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("  ");
  const [phone, setPhone] = useState("  ");
  const [FBlink, setFBlink] = useState("  ");
  const [INSTAlink, setINSTAlink] = useState("  ");
  const [LinkedIN, setLinkedIN] = useState("  ");
  const [error, setError] = useState({});
  const router = useRouter();
  const {user , setUser} = useContext(userContext);
  const [loading , setLoading] = useState(true);

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
    const err = validateRegister(email, password);
    if (Object.keys(err).length === 0) {
      const rep = await Apireg({
        Firstname,
        Lastname,
        email,
        password,
        address,
        phone,
        FBlink,
        INSTAlink,
        LinkedIN,
      });
      if (rep?.message === "success") {
        console.log("success");
        router.push('/');
      } else {
        setError(rep);
      }
    } else {
      setError(err);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block">
        <img
          src="/assets/signup.svg"
          alt="Collaborative work"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account!</h1>
            <p className="text-muted-foreground">
              Enter your details to sign up.
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-row space-x-16">
              <div className="space-y-2">
                <Label htmlFor="Firstname">Firstname *</Label>
                <Input
                  id="Firstname"
                  type="text"
                  placeholder="Your Firstname"
                  required
                  value={Firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="Lastname">Lastname *</Label>
                <Input
                  id="Lastname"
                  type="text"
                  placeholder="Your Lastname"
                  required
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && (
                <span className="text-red-500 flex justify-start text-sm">
                  {error.email}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <span className="text-red-500 flex justify-start text-sm">
                  {error.password}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="FBlink">Facebook Link</Label>
              <Input
                id="FBlink"
                type="text"
                value={FBlink}
                onChange={(e) => setFBlink(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="INSTAlink">Instagram Link</Label>
              <Input
                id="INSTAlink"
                type="text"
                value={INSTAlink}
                onChange={(e) => setINSTAlink(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="LinkedIN">LinkedIn</Label>
              <Input
                id="LinkedIN"
                type="text"
                value={LinkedIN}
                onChange={(e) => setLinkedIN(e.target.value)}
              />
            </div>
            {error.error && <p className="text-red">{error.error}</p>}
            <Button
              type="submit"
              className="w-full bg-customblue hover:bg-customBlue2"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
