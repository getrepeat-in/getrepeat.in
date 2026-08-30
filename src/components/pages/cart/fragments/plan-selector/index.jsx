import { useState } from "react";
import { cn } from "@/lib/utils";
import { CART_TEXT } from "../../helper/constants";
import { Check, ChevronDown, Zap } from "lucide-react";

export default function PlanSelector({ plans, selectedPlanId, setSelectedPlanId, selectedPlan, saveAmount, originalPrice }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{CART_TEXT.PLAN_SELECTOR_TITLE}</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="w-full md:w-auto relative z-20">
                    <label className="block text-sm font-bold mb-2 text-neutral-700">{CART_TEXT.SELECT_PERIOD_LABEL}</label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={cn(
                                "w-full sm:w-72 bg-white border-2 rounded-xl py-3 pl-4 pr-10 text-left focus:outline-none transition-all flex items-center justify-between shadow-sm",
                                isDropdownOpen ? "border-primary shadow-primary/10 shadow-md" : "border-neutral-200 hover:border-neutral-300"
                            )}
                        >
                            <span className="flex items-center gap-2 overflow-hidden pr-2">
                                <span className="font-bold text-neutral-900 truncate">{selectedPlan.title}</span>
                                <span className="text-neutral-500 text-sm whitespace-nowrap flex-shrink-0 hidden sm:inline">- ₹{selectedPlan.price}{CART_TEXT.PER_MONTH}</span>
                            </span>
                            <ChevronDown className={cn("absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 transition-transform duration-200 flex-shrink-0", isDropdownOpen ? "rotate-180 text-primary" : "")} />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="absolute z-20 w-full sm:w-80 mt-2 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                                    {plans.map(plan => (
                                        <button
                                            key={plan._id}
                                            onClick={() => {
                                                setSelectedPlanId(plan._id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-3 flex items-center transition-colors",
                                                selectedPlanId === plan._id ? "bg-primary text-white" : "hover:bg-neutral-50 text-neutral-700"
                                            )}
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden w-full">
                                                {selectedPlanId === plan._id ? (
                                                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                                                ) : (
                                                    <div className="w-4 h-4 flex-shrink-0" />
                                                )}
                                                <span className={cn("font-medium truncate flex-1", selectedPlanId === plan._id ? "font-bold text-white" : "")}>
                                                    {plan.title}
                                                </span>
                                                <span className={cn("text-sm whitespace-nowrap flex-shrink-0", selectedPlanId === plan._id ? "text-white/90" : "text-neutral-500")}>
                                                    - ₹{plan.price}/month
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-6 md:mt-0 text-right flex flex-col items-start md:items-end w-full md:w-auto">
                    <div className="flex items-center gap-3 mb-1">
                        {saveAmount > 0 && (
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
                                Save ₹{saveAmount}
                            </span>
                        )}
                        <div className="text-2xl font-extrabold">
                            ₹{selectedPlan.price}<span className="text-sm font-medium text-neutral-500">{CART_TEXT.PER_MONTH}</span>
                        </div>
                    </div>
                    {saveAmount > 0 && (
                        <div className="text-sm font-medium text-neutral-400 line-through">
                            ₹{Math.round(originalPrice / (selectedPlan._id === '3-month' ? 3 : selectedPlan._id === '1-year' ? 12 : 1))}{CART_TEXT.PER_MONTH}
                        </div>
                    )}
                </div>
            </div>

            <p className="text-sm text-neutral-500 mb-6 border-b border-neutral-100 pb-6">
                {selectedPlan.billingCycle}{CART_TEXT.CANCEL_ANYTIME}
            </p>

            <ul className="space-y-3">
                {selectedPlan.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[15px] font-medium text-neutral-800">
                        <div className="rounded-full bg-[#10b981] p-[3px] text-white flex-shrink-0 shadow-sm shadow-green-500/20">
                            <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}