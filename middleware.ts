import { NextRequest, NextResponse } from 'next/server';



// Middleware
export const config = {
  matcher: '/',
}

export async function middleware(req: NextRequest) {
  const { nextUrl: url, tokens } = req;

  // const friendAddress = await getFriendTokenAddress();
  // const friendTokenValue = await getFriendValue(friendAddress);
  // const scrollTokenValue = await getScrollValue(friendAddress);

  // Now set the token details in the URL search parameters
  // url.searchParams.set('friendAddress', friendAddress)
  // url.searchParams.set('friendTokenValue', friendTokenValue);
  // url.searchParams.set('scrollTokenValue', scrollTokenValue);

  return NextResponse.rewrite(url);
}
