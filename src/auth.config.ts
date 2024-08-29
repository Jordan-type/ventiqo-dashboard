import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import { VentiqoBackendAPI } from "@/constants/ventiqo-backend-api";

// 987550

interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    loginDomain: string;
    entity: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    age: string;
    gender: string;
    preferred_language: string;
    country: string;
    role: string;
    isEmailVerified: boolean;
    isPhoneNumberVerified: boolean;
    isVerified: boolean;
    isAdmin: boolean;
    isPaid: boolean;
    nextPaymentAmount: number;
    resetVerified: boolean;
    isSuspended: boolean;
    profileState: string;
    preferences: any[];
    eventsBooked: any[];
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    schemaVersion: number;
    nextPaymentDate: string;
    history: any[];
    deletedAt: string;
    id: string;
  };
}

const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const res = await fetch(`${VentiqoBackendAPI}/auth/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Authentication failed');
          }

          const data: AuthResponse = await res.json();
          console.log("credentials", data)

          if (data.success && data.user) {
            console.log("User logged in successfully. User details:", data.user)
            return {
              ...data.user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
          } else {
            throw new Error('Authentication failed');
          }
        } catch (err: any) {
          throw new Error(err.message || 'Internal server error');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    // Add other providers if necessary.....
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        
        token.user = {
          ...user,
          email: user.email,
          fullname: user.first_name + " " + user.last_name,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          role: user.role,
        }

        console.log("JWT Callback: token", token)
        console.log("user", user)
      } else {
        console.log("JWT Callback on subsequent request: token", token);
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      console.log("Session Callback: session", session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "your_generated_secret",
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day // 30 days ToDo: get it from the expire token
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/error",
    verifyRequest: "/auth/verify-request",
  },
};

export default authConfig;
