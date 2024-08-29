'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './button'; // Adjust the path as needed
import { Icons } from '@/components/icons'; // Adjust the path as needed
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";


export default function GoogleSignInButton() {

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  // onClick={() => signIn('google', { callbackUrl: callbackUrl ?? '/user/dashboard' })}

  const googleAuth = () => {
    window.open(`${VentiqoBackendAPI}/auth/google`, "_self");
};

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={googleAuth}
      >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
