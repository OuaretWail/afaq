import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { purchaseId } = await req.json();

    if (!purchaseId) {
      return NextResponse.json(
        { error: "Purchase ID is required." },
        { status: 400 }
      );
    }

    // Update the purchase status in the database
    const updatedPurchase = await db.purchase.update({
      where: { id: purchaseId },
      data: { status: "ACCEPTED" },
    });

    return NextResponse.json({
      message: "Purchase status updated successfully.",
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error("Error updating purchase:", error);
    return NextResponse.json(
      { error: "Failed to update purchase status." },
      { status: 500 }
    );
  }
}
