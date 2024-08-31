"use client";

import React, { useState } from "react";
import Image from "next/image";

import UserResetPasswordForm from "@/components/Forms/user-reset-password-form";

export default function ForgotPassword() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
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
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Please choose your password
              </p>
            </div>
          <UserResetPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
