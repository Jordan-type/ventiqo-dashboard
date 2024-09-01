"use client";

// import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
// import "@/css/satoshi.css";
import '@uploadthing/react/styles.css';
import Providers from '@/components/Layouts/providers';
import { Toaster } from '@/components/ui/toaster/toaster';
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // overflow-hidden removed it

  return (
    <html lang="en">
      <body 
       className={`${inter.className}`} 
       suppressHydrationWarning={true}>
        <Providers>
          <Toaster />
          {loading ? <Loader /> : children}
        </Providers>
      </body>
    </html>
  );
}
