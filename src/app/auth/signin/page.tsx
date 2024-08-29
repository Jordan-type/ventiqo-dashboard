"use client"

import React, { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";

import UserSignInForm from "@/components/Forms/user-signin-form"

// export const metadata: Metadata = {
//   title: "Authentication | TailAdmin - Next.js Dashboard Template",
//   description: "Authentication page for Ventiqo",
// };

const SignIn: React.FC = () => {

  return (
      <div className="relative h-screen flex-col items-center justify-between md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="px-26 py-17.5 text-center">
            <h2 className="sm:text-title-xl2 mb-9 text-2xl font-bold text-black dark:text-white">
              Ready to dive back in?
            </h2>

            <p className="2xl:px-20">
              Login to explore, discover, and rediscover your favourite events
              and interests.
            </p>

            <span className="mt-15 inline-block"></span>
          </div>
        </div>

        <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <h2 className="sm:text-title-xl2 mb-9 text-2xl font-bold text-black dark:text-white">
              Welcome Back
            </h2>
            <span className="mb-1.5 block font-medium">
              Login into your account
            </span>
            <UserSignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
