//src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const { AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, AZURE_AD_TENANT_ID } =
  process.env;
if (!AZURE_AD_CLIENT_ID || !AZURE_AD_CLIENT_SECRET || !AZURE_AD_TENANT_ID) {
  throw new Error("The Azure AD environment variables are not set.");
}
const handler = NextAuth({
  secret: AZURE_AD_CLIENT_SECRET,
  providers: [
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
        console.log(session);
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };