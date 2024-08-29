import NextAuth from 'next-auth';
import authConfig from './auth.config';

// NextAuth handler
const handler = NextAuth(authConfig);

// Named exports for HTTP methods
export { handler as GET, handler as POST };
