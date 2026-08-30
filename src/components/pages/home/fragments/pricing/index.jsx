"use client";
import { usePricing } from "@/hooks/use-pricing";
import PricingCard from "./fragments/pricing-card";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";

export default function PricingSection() {
    const { plans, isLoading, error } = usePricing({ type: "subscription" });

    return (
        <div id="pricing">
            <SectionWrapper
                title={
                    <>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
                            Simple, transparent{" "}
                            <Highlighter action="highlight" color="var(--primary)">
                                <span className="relative z-10 px-2 text-white">pricing</span>
                            </Highlighter>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                            Choose the perfect plan for your restaurant. No hidden fees, no surprises.
                        </p>
                    </>
                }
            >
                {error ? (
                    <div className="col-span-full text-center p-8 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                        <p className="font-bold mb-2">Failed to load pricing</p>
                        <p className="text-sm">Please try refreshing the page or check your connection.</p>
                        <p className="text-xs mt-2 opacity-70 font-mono">{error}</p>
                    </div>
                ) : isLoading ? (
                    <div className="col-span-full flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : plans.length === 0 ? (
                    <div className="col-span-full text-center p-8 text-neutral-500">
                        <p>No pricing plans found. Please seed the database.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto items-stretch w-full">
                        {plans.map((plan, index) => (
                            <PricingCard key={plan._id} plan={plan} index={index} />
                        ))}
                    </div>
                )}
            </SectionWrapper>
        </div>
    );
}