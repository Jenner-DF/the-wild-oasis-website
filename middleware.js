// import { NextResponse } from "next/server";

import { auth } from "@/app/_lib/auth";
export const middleware = auth; //auth serves as a middleware function as well
export const config = {
  matcher: ["/account", "/login"], //only runs when the route becomes in the matcher
};
// export function middleware(request) {
//   console.log(request);
//   return NextResponse.redirect(new URL("/about", request.url));
// }
// export const config = {
//   matcher: ["/account", "/cabins"], //only runs when the route becomes in the matcher
// };
