import { Info } from "lucide-react";
import Button from "@/components/global/button";
import { CART_TEXT } from "../../helper/constants";

export default function OrderSummary({ selectedPlan, originalPrice, saveAmount, taxes, finalTotal, finalOriginalTotal, isProcessing, onContinue }) {
    return (
        <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-neutral-100 sticky top-8">

            <h3 className="font-bold mb-3 text-neutral-900">{selectedPlan.title}</h3>

            <div className="space-y-2.5 text-[13px] sm:text-sm mb-4 border-b border-neutral-100 pb-4">
                <div className="flex justify-between items-center">
                    <span className="text-neutral-600">
                        {selectedPlan.duration == 30 ? '1-month period'
                            : selectedPlan.duration == 90 ? '3-month period'
                                : selectedPlan.duration == 365 ? '1-year period'
                                    : `${selectedPlan.duration || 0}-day period`}
                    </span>
                    <div className="flex items-center gap-2">
                        {saveAmount > 0 && <span className="text-neutral-400 line-through text-xs">₹{originalPrice}</span>}
                        <span className="font-bold">₹{selectedPlan.totalPrice}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-[13px] sm:text-sm mb-4 border-b border-neutral-100 pb-4">
                <span className="text-neutral-600 flex items-center gap-1">
                    {CART_TEXT.TAXES_LABEL} <Info className="w-3.5 h-3.5 text-neutral-400 cursor-pointer hover:text-primary" />
                </span>
                <span className="font-bold">₹{taxes}</span>
            </div>

            <div className="flex justify-between items-end mb-4">
                <span className="font-bold text-base text-neutral-900">{CART_TEXT.TOTAL_LABEL}</span>
                <div className="flex flex-col items-end">
                    {saveAmount > 0 && <span className="text-neutral-400 line-through text-[11px] mb-0.5">₹{finalOriginalTotal}</span>}
                    <span className="font-extrabold text-2xl text-primary leading-none">₹{finalTotal}</span>
                </div>
            </div>

            <Button
                variant="ghost"
                text={CART_TEXT.COUPON_TEXT}
                className="text-primary text-[13px] font-semibold mb-5 hover:underline hover:bg-transparent dark:hover:bg-transparent p-0 h-auto"
            />

            <Button
                onClick={onContinue}
                isLoading={isProcessing}
                text={CART_TEXT.CHECKOUT_BUTTON}
                loadingText={CART_TEXT.PROCESSING_BUTTON}
                className="w-full bg-primary hover:bg-[#e0614c] text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-sm sm:text-base"
            />

            <div className="mt-5 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-600 bg-neutral-50 px-3.5 py-1.5 rounded-full border border-neutral-100">
                    <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    {CART_TEXT.GUARANTEE_TEXT}
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-700">{CART_TEXT.EXCELLENT_RATING}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    {CART_TEXT.SOCIAL_PROOF}
                </div>
            </div>
        </div>
    );
}
