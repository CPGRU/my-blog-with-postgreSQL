import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    //custom pages
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnManagement = nextUrl.pathname.startsWith('/management');
      if (isOnManagement) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/management', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;