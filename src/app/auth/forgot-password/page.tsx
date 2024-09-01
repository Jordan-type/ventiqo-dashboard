"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import UserForgotPasswordForm from "@/components/Forms/AuthForms/user-forgot-password-form";

export default function ForgotPassword() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="relative z-20 flex items-center text-lg font-medium">
        <Image src={"/images/logo/ventiqo-white-logo.svg"} alt="Ventiqo Logo" width={40} height={40} />
        </div>
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
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your registered email and <br /> we will send you a link
                to reset your password.
              </p>
            </div>

            <UserForgotPasswordForm />
            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
