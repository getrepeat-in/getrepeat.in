"use client";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { CART_TEXT } from "./helper/constants";
import { usePayment } from "@/hooks/use-payment";
import { usePricing } from "@/hooks/use-pricing";
import { useState, useEffect, useMemo } from "react";
import PlanSelector from "./fragments/plan-selector";
import OrderSummary from "./fragments/order-summary";
import Loader from "@/components/global/states/loader";
import ErrorState from "@/components/global/states/error";
import { calculateCartData } from "./helper/calculations";

export default function CartPageUI() {
    const { plans, isLoading: loading, error } = usePricing({ type: "subscription" });
    const { isProcessing, handlePayment } = usePayment();
    const [selectedPlanId, setSelectedPlanId] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (!loading && plans && plans.length > 0 && !selectedPlanId) {
            let targetPlanId = null;
            if (typeof window !== 'undefined') {
                const searchParams = new URLSearchParams(window.location.search);
                const planFromUrl = searchParams.get('plan');

                if (planFromUrl) {
                    if (plans.find(p => p._id === planFromUrl)) {
                        targetPlanId = planFromUrl;
                    } else {
                        router.push('/');
                        return;
                    }
                }
            }
            const defaultPlan = targetPlanId ? (plans.find(p => p._id === targetPlanId) || plans[0]) : plans[0];
            setSelectedPlanId(defaultPlan._id);
        }
    }, [plans, loading, selectedPlanId, router]);

    const selectedPlan = plans?.find(p => p._id === selectedPlanId) || (plans && plans[0]);

    const computedData = useMemo(() => {
        return calculateCartData(selectedPlan);
    }, [selectedPlan]);

    if (error) {
        return (
            <ErrorState
                title="Failed to Load Cart"
                message="We couldn't load the subscription plans. Please check your connection."
                onRetry={() => window.location.reload()}
                fullscreen={false}
                className="min-h-screen bg-[#f7f8f9]"
            />
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f8f9] flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    if (!selectedPlan || !computedData) {
        return (
            <ErrorState
                title="No Plans Available"
                message={CART_TEXT.NO_PLANS}
                fullscreen={false}
                className="min-h-screen bg-[#f7f8f9]"
            />
        );
    }

    const onContinue = () => {
        handlePayment({
            planTitle: selectedPlan.title,
            price: computedData.finalTotal,
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f8f9] text-neutral-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 tracking-tight">{CART_TEXT.PAGE_TITLE}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <PlanSelector
                            plans={plans}
                            selectedPlanId={selectedPlanId}
                            setSelectedPlanId={setSelectedPlanId}
                            selectedPlan={selectedPlan}
                            saveAmount={computedData.saveAmount}
                            originalPrice={computedData.originalPrice}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        <OrderSummary
                            selectedPlan={selectedPlan}
                            originalPrice={computedData.originalPrice}
                            saveAmount={computedData.saveAmount}
                            taxes={computedData.taxes}
                            finalTotal={computedData.finalTotal}
                            finalOriginalTotal={computedData.finalOriginalTotal}
                            isProcessing={isProcessing}
                            onContinue={onContinue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
