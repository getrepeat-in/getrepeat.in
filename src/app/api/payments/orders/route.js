import { NextResponse } from "next/server";
import { backendPaymentService } from "@/services/backend/payment.service";

export async function POST(req) {
    try {
        const body = await req.json();
        const { amount, currency, receipt } = body;

        const order = await backendPaymentService.createOrder(amount, currency, receipt);

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        if (error.message && error.message.includes("Invalid amount")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
