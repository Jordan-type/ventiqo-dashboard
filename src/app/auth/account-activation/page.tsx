"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from '@/components/ui/toaster/use-toast';
import * as z from "zod";
import { activateAccount } from "@/config/APIConfig";

// Zod schema for form validation
const formSchema = z.object({
  activation_code: z.string().nonempty("Activation code is required"),
});

interface ActivationFormInputs {
  activation_code: string;
}

export default function ActivationPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); // Use Next.js router for redirect
  const searchParams = useSearchParams(); // Hook to access the search parameters
  const token = searchParams.get("token"); // Get the 'token' from the URL

  const form = useForm<ActivationFormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ActivationFormInputs) => {
    setLoading(true);
    try {
      
      // Send activation details to backend
      const response = await activateAccount({
        activation_code: data.activation_code,
        activation_token: token,
      });


      if (response?.success) {
        toast({
          title: "Activation Successful",
          description: response.message,
          variant: "default",
        });
        // Redirect to siginin page or handle success case
      } else {
        toast({
          title: "Error",
          description: response.message || "Activation failed. Please try again.",
          variant: "destructive",
        });
      }
      // Redirect to the next page or handle further actions
      router.push(`/auth/signin`);
    } catch (error) {
      console.error("Error during activation:", error);
      toast({
        title: "Error",
        description: "Activation failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="activation_code"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activation Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your activation code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {loading ? "Activating..." : "Activate Account"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
