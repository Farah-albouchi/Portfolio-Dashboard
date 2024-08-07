"use client";
import { Button } from "@/components/ui/button";
import DrawerMenu from "../../app/components/drawer";
import Box from "@mui/material/Box";
import Link from 'next/link';

export default function Home() {
  return (
    <section className="w-full mt-10  ">
      <Box sx={{ display: "flex" }}>
        <DrawerMenu />
        <Box component="main"  sx={{ flexGrow: 1 ,marginTop:8 }}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create a Stunning Online Portfolio
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our easy-to-use portfolio builder helps you showcase your
                    work and skills in a professional, customizable way.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="./dashboard/PersonalOverview" prefetch={false} passHref>
                  <Button
                 
                    className="inline-flex h-10 items-center justify-center rounded-md bg-customBlue2 px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                   
                  >
                    Get Started
                  </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/assets/Portfolio.svg"
                width="400"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </Box>
      </Box>
    </section>
  );
}
