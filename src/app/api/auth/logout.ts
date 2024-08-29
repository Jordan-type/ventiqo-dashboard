import { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie } from 'nookies';
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import authConfig from "@/auth.config";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if a session exists
  const session = await getServerSession(req, res, authConfig);

  if (session) {
    // If there is a session, destroy the session cookies
    destroyCookie({ res }, 'next-auth.session-token');

    // Additional cleanup (e.g., clearing other cookies, etc.) can be done here

    // Redirect to the sign-in page or a custom page
    res.redirect(`${process.env.NEXTAUTH_URL}/auth/signin`);
  } else {
    // If no session exists, just redirect to the sign-in page
    res.redirect('/auth/signin');
  }
}


// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   await signOut({ redirect: false });
//   res.redirect(`${process.env.FRONTEND_URL}/auth/signin`);
// };





// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   destroyCookie({ res }, 'next-auth.session-token');
//   res.redirect('/auth/signin');
// }