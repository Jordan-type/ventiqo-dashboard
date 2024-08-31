import { HTMLAttributes, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PinInput, PinInputField } from "@/components/ui/pin-input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/toaster/use-toast";
import { activateAccount } from "@/config/APIConfig";

interface ActivationFormInputs {
  activation_code: string;
}

// Zod schema for form validation
const formSchema = z.object({
  activation_code: z
    .string()
    .min(1, { message: "Please enter your Activation code." }),
});

export function AccountActivationForm({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { toast } = useToast();
  const router = useRouter(); // Use Next.js router for redirect
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const searchParams = useSearchParams(); // Hook to access the search parameters
  const token = searchParams.get("token"); // Get the 'token' from the URL

  const form = useForm<ActivationFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: { activation_code: "" },
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
          description:
            response.message || "Activation failed. Please try again.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="activation_code"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <PinInput
                    {...field}
                    className="flex h-10 justify-between"
                    onComplete={() => setDisabledBtn(false)}
                    onIncomplete={() => setDisabledBtn(true)}
                  >
                    {Array.from({ length: 7 }, (_, i) => {
                      if (i === 3)
                        return <Separator key={i} orientation="vertical" />;
                      return (
                        <PinInputField
                          key={i}
                          component={Input}
                          className={`${form.getFieldState("activation_code").invalid ? "border-red-500" : ""}`}
                        />
                      );
                    })}
                  </PinInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Activating..." : "Activate Account"}
        </Button>
      </form>
    </Form>
  );
}
