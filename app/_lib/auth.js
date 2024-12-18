import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest, getSettings } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; //trick to convert to boolean
    },
    async signIn({ user, account, profile }) {
      try {
        //checks user if in db
        const existingGuest = await getGuest(user.email);
        //adds user if not in db
        if (!existingGuest) {
          //add await to prevent moving to the session callback immediately
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      // No error here! We handle the possibility of no guest in the sign in callback
      const guest = await getGuest(session.user.email);
      //added prop guestId to the session when using await auth()
      session.user.guestId = guest.id;
      session.user.tanginamo = "fuck you!";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
