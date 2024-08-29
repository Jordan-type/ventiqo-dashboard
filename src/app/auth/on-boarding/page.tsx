"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toaster/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    // Implement your final submission logic here, e.g., saving the data to the database
    toast({
      title: "Onboarding Complete",
      description: "Your profile is set up successfully.",
      variant: "default",
    });
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome! Let&apos;s Get Started</h2> {/* Use double quotes around Let's */}
          <p className="mb-6">Please provide your full name:</p>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className="mt-6 flex justify-end">
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Choose a Username</h2>
          <p className="mb-6">Pick a unique username:</p>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Previous
            </Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Email Address</h2>
          <p className="mb-6">We need your email for account recovery:</p>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Previous
            </Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Tell Us About Your Interests</h2>
          <p className="mb-6">This will help us personalize your experience:</p>
          <Input
            type="text"
            placeholder="Your Interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              Previous
            </Button>
            <Button onClick={handleFinish}>Finish</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;