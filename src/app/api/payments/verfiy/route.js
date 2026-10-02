import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";
import { capturePostHogLog } from "@/lib/posthog-logs";

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const isValid = backendPaymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            await capturePostHogLog("payment_signature_rejected");
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }

        await capturePostHogLog("payment_signature_verified");
        return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    } catch (error) {
        await capturePostHogLog("payment_verification_failed");
        console.error("Payment verification error:", error);
        if (error.message && error.message.includes("Missing required fields")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
