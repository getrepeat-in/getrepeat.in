import { Suspense } from 'react';
import SuccessContent from './components/success-content';

export const metadata = {
    title: 'Payment Successful - Get Repeat',
    description: 'Your payment was successful.',
};

export default function SuccessPage() {
    return (
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
            <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
