import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation is not configured." }, { status: 404 });

  const { isValidSignature } = await parseBody(request, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature." }, { status: 401 });

  revalidateTag("content", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
