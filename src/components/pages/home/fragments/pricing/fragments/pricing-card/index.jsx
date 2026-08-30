"use client";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/global/button";

export default function PricingCard({ plan, index }) {
    const { _id, title, description, price, billingCycle, isPopular, badge, features } = plan;
    const router = useRouter();

    const onGetStarted = () => {
        router.push(`/cart?plan=${_id}`);
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className={cn(
                    "relative flex flex-col h-full p-8 rounded-xl transition-all duration-300",
                    isPopular
                        ? "bg-white dark:bg-neutral-900 border-2 border-primary shadow-2xl shadow-primary/20 md:scale-105 z-10"
                        : "bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10"
                )}
            >
                {badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg",
                            isPopular ? "bg-primary" : "bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
                        )}>
                            {badge}
                        </span>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2 tracking-tight">{title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed line-clamp-2 h-[44px]">
                        {description}
                    </p>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tighter">₹{price}</span>
                    <span className="text-lg font-medium text-neutral-500 dark:text-neutral-400">/month</span>
                </div>

                <div className="flex flex-col gap-1 mb-8">
                    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                        {billingCycle}
                    </p>
                    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide">
                        <span className="font-bold text-neutral-700 dark:text-neutral-300">₹{plan.totalPrice || price}</span>
                        {plan.originalPrice && (
                            <span className="line-through ml-1 opacity-70">₹{plan.originalPrice}</span>
                        )}
                    </p>
                </div>

                <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className={cn(
                                    "mt-0.5 rounded-full p-1 flex-shrink-0",
                                    isPopular ? "bg-primary/10 text-primary" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                                )}>
                                    <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                                <span className="text-neutral-700 dark:text-neutral-300 text-[15px] font-medium leading-tight">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button
                    onClick={onGetStarted}
                    text="Get Started"
                    className={cn(
                        "w-full py-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center",
                        isPopular
                            ? "bg-primary text-white hover:bg-[#e0614c] hover:shadow-lg hover:shadow-primary/30"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    )}
                />
            </motion.div>
        </>
    );
}
