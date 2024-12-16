import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the GET method handler
export async function GET() {
  try {
    // Fetch all purchases with status PROCESSING
    const purchases = await db.purchase.findMany();

    // Enrich purchases with Clerk user details
    const enrichedPurchases = await Promise.all(
      purchases.map(async (purchase) => {
        const user = await clerkClient.users.getUser(purchase.userId);
        return {
          ...purchase,
          user: {
            email: user?.emailAddresses?.[0]?.emailAddress || "Unknown",
            firstName: user?.firstName || "Unknown",
            lastName: user?.lastName || "Unknown",
          },
        };
      })
    );

    return NextResponse.json(enrichedPurchases, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch purchases:", error);
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
  }
}
