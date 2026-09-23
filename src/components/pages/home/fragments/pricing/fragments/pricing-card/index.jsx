"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Button from "@/components/global/button";
import { Check, Loader2, X } from "lucide-react";
import { usePayment } from "@/hooks/use-payment";
import { PRICING_ADDONS } from "@/constants/pricing";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingCard({ plan, index }) {
    const { _id, title, description, price, billingCycle, isPopular, badge, features } = plan;
    const { isProcessing, handlePayment } = usePayment();
    const router = useRouter();

    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phone, setPhone] = useState("");
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [showAllFeatures, setShowAllFeatures] = useState(false);

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    const addonsTotal = selectedAddons.reduce((sum, id) => {
        const addon = PRICING_ADDONS.find(a => a._id === id);
        return sum + (addon ? addon.price : 0);
    }, 0);

    const basePrice = plan.totalPrice || price;
    const finalPrice = basePrice + addonsTotal;

    const selectedAddonTitles = selectedAddons
        .map(id => PRICING_ADDONS.find(a => a._id === id)?.title)
        .filter(Boolean);

    const displayTitle = selectedAddonTitles.length > 0
        ? `${title} + ${selectedAddonTitles.join(" + ")}`
        : title;

    const onGetStarted = () => {
        setShowPhoneModal(true);
    };

    const submitPhoneAndPay = (e) => {
        e.preventDefault();
        if (phone.length < 10) return;

        setShowPhoneModal(false);
        handlePayment({
            planTitle: displayTitle,
            price: finalPrice,
            phone: phone,
            onSuccess: (res) => {
                router.push(`/success?order_id=${res.razorpay_order_id}&plan=${encodeURIComponent(displayTitle)}&amount=${finalPrice}`);
            },
            onError: (err) => {
                console.error("Payment Error:", err);
            },
            onDismiss: () => {
                console.log("Payment dismissed");
            }
        });
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
                    "relative flex flex-col h-full p-6 rounded-xl transition-all duration-300",
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
                    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wide flex flex-col items-start">
                        <span>
                            <span className="font-bold text-neutral-700 dark:text-neutral-300">₹{finalPrice}</span>
                            {plan.originalPrice && addonsTotal === 0 && (
                                <span className="line-through ml-1 opacity-70">₹{plan.originalPrice}</span>
                            )}
                        </span>
                        {addonsTotal > 0 && (
                            <span className="text-[10px] text-primary lowercase mt-0.5">
                                (includes ₹{addonsTotal} in add-ons)
                            </span>
                        )}
                    </p>
                </div>

                <div className="flex-1">
                    <ul className="space-y-4">
                        {features.slice(0, showAllFeatures ? features.length : 5).map((feature, i) => (
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

                    {features.length > 5 && (
                        <button
                            onClick={() => setShowAllFeatures(!showAllFeatures)}
                            className="mt-4 text-sm font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                            {showAllFeatures ? "View less" : `View ${features.length - 5} more`}
                        </button>
                    )}

                    {PRICING_ADDONS && PRICING_ADDONS.length > 0 && (
                        <div className="mt-8 border-t border-neutral-100 dark:border-neutral-800 pt-6 mb-8">
                            <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wide mb-4">Optional Add-ons</p>
                            <div className="space-y-4">
                                {PRICING_ADDONS.map(addon => (
                                    <label key={addon._id} className="flex items-start gap-3 cursor-pointer group">
                                        <div className={cn(
                                            "relative flex items-center justify-center w-5 h-5 mt-0.5 rounded border transition-colors flex-shrink-0",
                                            selectedAddons.includes(addon._id)
                                                ? "bg-primary border-primary text-white"
                                                : "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 group-hover:border-primary"
                                        )}>
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={selectedAddons.includes(addon._id)}
                                                onChange={() => toggleAddon(addon._id)}
                                            />
                                            {selectedAddons.includes(addon._id) && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 leading-tight">{addon.title}</span>
                                                <span className="text-sm font-bold text-primary whitespace-nowrap">+₹{addon.price}</span>
                                            </div>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-1 leading-snug">{addon.description}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <Button
                        onClick={onGetStarted}
                        disabled={isProcessing}
                        text={isProcessing ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2.5">
                            <span>Get Started</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
                            <span>₹{finalPrice}</span>
                        </span>
                    )}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center",
                            isPopular
                                ? "bg-primary text-white hover:bg-[#e0614c] hover:shadow-lg hover:shadow-primary/30"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
                        )}
                    />
                </div>
            </motion.div>

            <AnimatePresence>
                {showPhoneModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 w-full max-w-md relative border border-neutral-200 dark:border-neutral-800"
                        >
                            <button
                                onClick={() => setShowPhoneModal(false)}
                                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Checkout</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Please enter your phone number to continue with the {title} payment.
                                </p>
                            </div>

                            <form onSubmit={submitPhoneAndPay}>
                                <div className="mb-6">
                                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">+91</span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            placeholder="Enter 10 digit number"
                                            required
                                            minLength={10}
                                            maxLength={10}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    text={`Proceed to Pay ₹${finalPrice}`}
                                    className="w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-[#e0614c] transition-colors"
                                />
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
