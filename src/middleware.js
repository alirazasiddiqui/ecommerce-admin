import { authMiddleware } from "@clerk/nextjs";
 
// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
 
export default authMiddleware({
  // Allow signed out users to access the specified routes:
   publicRoutes: ['/api/:path*'],
  // Prevent the specified routes from accessing
  // authentication information:
  // ignoredRoutes: ['/no-auth-in-this-route'],
});
 
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};