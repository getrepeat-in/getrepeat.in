import { useState } from "react";
import { paymentService } from "@/services/frontend/payment.service";

export const usePayment = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async ({ planTitle, price, onSuccess, onError, onDismiss }) => {
        setIsProcessing(true);
        try {
            await paymentService.initiateCheckout({
                planTitle,
                price,
                onSuccess: (res) => {
                    setIsProcessing(false);
                    if (onSuccess) onSuccess(res);
                    else alert("Payment successful! Welcome to Get Repeat.");
                },
                onError: (err) => {
                    setIsProcessing(false);
                    if (onError) onError(err);
                    else alert(err.message);
                },
                onDismiss: () => {
                    setIsProcessing(false);
                    if (onDismiss) onDismiss();
                }
            });
        } catch (error) {
            setIsProcessing(false);
            if (onError) onError(error);
            else alert(error.message || "Something went wrong during checkout.");
        }
    };

    return {
        isProcessing,
        handlePayment
    };
};
