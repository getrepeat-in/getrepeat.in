'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';

export default function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const plan = searchParams.get('plan');
    const amount = searchParams.get('amount');

    const whatsappMessage = encodeURIComponent(`Hi Get Repeat Team! I just purchased the ${plan} Plan (Order ID: ${orderId}). Please help me with the onboarding process.`);
    const whatsappLink = `https://wa.me/919311507651?text=${whatsappMessage}`;

    if (!orderId) {
        return (
            <div className="text-center p-8">
                <p className="text-neutral-500 mb-4">No order details found.</p>
                <Link href="/" className="text-primary hover:underline font-medium">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-xl w-full mx-4 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
            
            <div className="flex justify-center mb-6">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full p-4">
                    <CheckCircle2 className="w-16 h-16" />
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white mb-4 tracking-tight">
                Payment Successful!
            </h1>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg mb-8 max-w-sm mx-auto">
                Thank you for choosing Get Repeat. We're thrilled to have you on board.
            </p>

            <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-4 sm:p-6 mb-8 text-left border border-neutral-100 dark:border-neutral-800">
                <h3 className="text-xs sm:text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">Order Summary</h3>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0 gap-1 sm:gap-4">
                    <span className="text-neutral-600 dark:text-neutral-300 font-medium">Plan</span>
                    <span className="text-neutral-900 dark:text-white font-bold">{plan}</span>
                </div>
                
                {amount && (
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0 gap-1 sm:gap-4">
                        <span className="text-neutral-600 dark:text-neutral-300 font-medium">Amount Paid</span>
                        <span className="text-neutral-900 dark:text-white font-bold">₹{amount}</span>
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-neutral-200 dark:border-neutral-700 last:border-0 gap-1 sm:gap-4">
                    <span className="text-neutral-600 dark:text-neutral-300 font-medium">Order ID</span>
                    <span className="text-neutral-900 dark:text-white font-mono text-sm break-all">{orderId}</span>
                </div>
            </div>

            <div className="space-y-4 flex flex-col items-center">
                <p className="text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base">
                    Next step: Let's get your restaurant set up!
                </p>
                <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mx-auto"
                >
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Contact Support on WhatsApp</span>
                    </div>
                    <ArrowRight className="w-5 h-5 hidden sm:block" />
                </a>
                <p className="text-xs sm:text-sm text-neutral-500 mt-4 block">
                    Our team is ready at <span className="font-medium text-neutral-700 dark:text-neutral-300">9311507651</span> to help you with onboarding.
                </p>
            </div>
        </div>
    );
}
