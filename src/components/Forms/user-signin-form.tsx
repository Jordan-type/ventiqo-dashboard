"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { signInUser } from "@/config/APIConfig";
import { useToast } from "@/components/ui/toaster/use-toast";

// Zod schema for form validation
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type FormData = z.infer<typeof schema>;

export default function UserSignInForm() {
  const router = useRouter(); // Use Next.js router for redirect
  const { toast } = useToast(); // Use the useToast hook to get the toast method

  const { data: session, status } = useSession();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      redirectUserBasedOnRole(session?.user?.role);
    }
  }, [status]);

  const redirectUserBasedOnRole = (role: string | undefined) => {
    switch (role) {
      case "User":
        router.push("/user");
        break;
      case "Admin":
        router.push("/admin/dashboard");
        break;
      case "Organizer":
        router.push("/organizer/dashboard");
        break;
      default:
        router.push("/guest/dashboard");
    }
  };

  // handle login
  const handleLogin = async (data: FormData) => {
    try {
      const userDetails = { email: data.email, password: data.password };
      const res = await signInUser(userDetails);
      if (res && !res?.error) {
        console.log("Login successful");
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
          variant: "default", // Use 'default' for success
        });
        redirectUserBasedOnRole(session?.user?.role);
      } else {
        const errorMessage =
          res?.error || "Login failed. Please check your credentials.";
        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive", // Use 'destructive' for errors
        });
      }
    } catch (error) {
      console.log("Error during sign-in:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive", // Use 'destructive' for errors
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleLogin)} className="w-full space-y-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Forgot Password and Sign Up Links */}
          <div className="flex justify-between items-center">
            <Link href="/auth/forgot-password" className="underline underline-offset-4 hover:text-primary">
              Forgot Password?
            </Link>
            <Link href="/auth/signup" className="underline underline-offset-4 hover:text-primary">
              Don't have an account? Sign Up
            </Link>
          </div>

          <Button disabled={loading} type="submit" className="w-full">
            Sign In
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
