import { cn } from "@/lib/utils";
import { PlusCircle, QrCode } from "lucide-react";

export default function OptionalServices({ paidAddons, selectedAddons, setSelectedAddons }) {
    if (!paidAddons || paidAddons.length === 0) return null;

    const toggleAddon = (addonId) => {
        setSelectedAddons(prev =>
            prev.includes(addonId)
                ? prev.filter(id => id !== addonId)
                : [...prev, addonId]
        );
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
            {paidAddons.map((addon, index) => {
                const Icon = addon.icon === 'qrcode' || addon.title.toLowerCase().includes('menu') ? QrCode : PlusCircle;
                return (
                    <div key={addon._id} className={cn("flex flex-col gap-4", index > 0 && "mt-6 pt-6 border-t border-neutral-100")}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-lg font-bold">{addon.title}</h2>
                        </div>
                        <p className="text-sm text-neutral-600">
                            {addon.description}
                        </p>
                        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl bg-neutral-50 cursor-pointer hover:border-primary/30 transition-colors"
                            onClick={() => toggleAddon(addon._id)}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id={`addon-${addon._id}`}
                                    checked={selectedAddons.includes(addon._id)}
                                    onChange={() => { }}
                                    className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary cursor-pointer pointer-events-none"
                                />
                                <label htmlFor={`addon-${addon._id}`} className="text-sm font-bold text-neutral-800 cursor-pointer pointer-events-none">
                                    Add {addon.title.toLowerCase()}
                                </label>
                            </div>
                            <div className="font-bold text-neutral-900">
                                ₹{addon.price} <span className="text-xs text-neutral-500 font-normal">{addon.duration === 'one-time' ? 'one-time' : '/mo'}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
