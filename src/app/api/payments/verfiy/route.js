import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";

export async function POST(req) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const isValid = backendPaymentService.verifySignature(
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Payment verification error:", error);
        if (error.message && error.message.includes("Missing required fields")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
