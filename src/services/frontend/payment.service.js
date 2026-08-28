export const paymentService = {
    createOrder: async (amount) => {
        const response = await fetch("/api/payments/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to create order");
        }
        
        return response.json();
    },

    verifyPayment: async (paymentDetails) => {
        const response = await fetch("/api/payments/verfiy", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Failed to verify payment");
        }

        return response.json();
    },

    initiateCheckout: async ({ planTitle, price, onSuccess, onError, onDismiss }) => {
        try {
            const orderData = await paymentService.createOrder(price * 100);
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Get Repeat",
                description: `${planTitle} Plan Subscription`,
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        const verifyData = await paymentService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        
                        if (verifyData.success) {
                            if (onSuccess) onSuccess(verifyData);
                        } else {
                            if (onError) onError(new Error("Payment verification failed. Please contact support."));
                        }
                    } catch (error) {
                        if (onError) onError(new Error("Error verifying payment."));
                    }
                },
                modal: {
                    ondismiss: function() {
                        if (onDismiss) onDismiss();
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#f2715b"
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response) {
                if (onError) onError(new Error(response.error.description || "Payment failed!"));
            });

            rzp.open();
        } catch (error) {
            console.error(error);
            if (onError) onError(new Error("Checkout failed to initialize. Please try again."));
        }
    }
};
