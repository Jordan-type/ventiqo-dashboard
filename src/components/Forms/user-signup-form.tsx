"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "@/components/ui/google-auth-button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { signUpUser } from "@/config/APIConfig";
import { useToast } from '@/components/ui/toaster/use-toast';


// Zod schema for form validation
const formSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  username: z.string().nonempty("Username is required"),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirm_password: z.string().min(6, "Password confirmation is required"),
}).refine((data) => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords do not match",
});


interface SignupFormInputs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;  // Added this to match the form field
  country?: string; // Optional since it is automatically added
}

export default function UserSignUpForm() {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string>("");

  const { toast } = useToast();  // Use the useToast hook to get the toast method
  const router = useRouter(); // Use Next.js router for redirect

  // fetch the user's country using IP info
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://ipinfo.io/json?token=${process.env.IP_TOKEN}`,
        );
        console.log("response", response)
        setCountry(response.data.country);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry();
  }, []);

  // form setup with React Hook Form and Zod resolver
  const form = useForm<SignupFormInputs>({
    resolver: zodResolver(formSchema),
  });

  // form submission handler
  const onSubmit = async (data: SignupFormInputs) => {

    setLoading(true);
    try {
      // Include country in the data
      const { confirm_password, ...userData } = { ...data, country };
      const response = await signUpUser(userData);
      const token = response.activationToken; // Assume the token is returned from the API

      toast({
        title: "Success",
        description: response.message,
        variant: "default",  // Use 'default' for success
      });
      // Handle response, redirect, show a message, etc.
      // Redirect to activation page with token
      router.push(`/auth/account-activation?token=${token}`);
    } catch (error) {
      console.error("Error during sign-up:", error);
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive", // Use 'destructive' for errors
      });
    } else {
      toast({
        title: "Error",
        description: "An unknown error occurred",
        variant: "destructive", 
      });
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirm_password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                    {/* Forgot Password and Sign Up Links */}
                    <div className="flex items-center justify-between text-sm">
            <Link
              href="/auth/forgot-password"
              className="underline underline-offset-4 hover:text-primary"
            >
              Forgot Password?
            </Link>
            <Link
              href="/auth/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Already have an account? Sign In
            </Link>
          </div>

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton />
    </>
  );
}
