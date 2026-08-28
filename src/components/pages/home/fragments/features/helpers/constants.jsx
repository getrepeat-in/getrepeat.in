import { Users, QrCode, Smartphone, MessageCircleHeart } from "lucide-react";

export const FEATURES = [
    {
        title: "Actionable Customer CRM",
        description: "Capture visitor data every time a QR code is scanned. Know who your best customers are and what they order.",
        icon: Users,
        image: "/images/features/crm.jpg",
        delay: 0.1,
    },
    {
        title: "Instant Digital Menus",
        description: "Update your menu in real-time. No more expensive reprints or outdated pricing for your restaurant.",
        icon: Smartphone,
        image: "/images/features/menu.jpg",
        delay: 0.2,
    },
    {
        title: "Dynamic QR Codes",
        description: "Beautiful, custom-branded QR codes that never expire and can be updated instantly from your dashboard.",
        icon: QrCode,
        image: "/images/features/qr.jpg",
        delay: 0.3,
    },
    {
        title: "WhatsApp Automation",
        description: "Engage customers after they leave. Send automated messages and personalized offers to turn them into loyal repeat diners.",
        icon: MessageCircleHeart,
        image: "/images/features/whatsapp.jpg",
        delay: 0.4,
    }
];
