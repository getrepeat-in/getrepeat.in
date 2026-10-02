import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";
import { capturePostHogLog } from "@/lib/posthog-logs";

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount, currency, receipt } = body;

        const order = await backendPaymentService.createOrder(amount, currency, receipt);

        await capturePostHogLog("payment_order_created");

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        await capturePostHogLog("payment_order_creation_failed");
        console.error("Razorpay order creation error:", error);
        if (error.message && error.message.includes("Invalid amount")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
