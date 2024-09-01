import { HTMLAttributes, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/config/APIConfig";
import { useToast } from "@/components/ui/toaster/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ResetPasswordFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function UserResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const { toast } = useToast();
  const router = useRouter(); // Use Next.js router for redirect
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams(); // Hook to access the search parameters
  const token = searchParams.get("token"); // Get the 'token' from the URL

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!token) {
      toast({
        title: "Error",
        description: "Invalid or missing token.",
      });
      return;
    }

    try {
      const response = await resetPassword(token, data.password);

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "default", // Use 'default' for success
        });

        router.push(`/auth/signin`);
      } else {
        toast({
          title: "Error",
          description:
            response.message || "Password reset failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      toast({
        title: "Error",
        description: "Password reset failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
}
