"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserHeaderProfileNav() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <Input type="text" placeholder="Search all events" className="w-1/2" />
      <Button className="ml-auto mr-2">California</Button>
      <div className="flex items-center space-x-4">
        {/* Add other header elements like notifications or user profile dropdown */}
      </div>
    </header>
  );
}