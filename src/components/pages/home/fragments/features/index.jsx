"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FEATURES } from "./helpers/constants";
import { Highlighter } from "@/components/ui/highlighter";
import SectionWrapper from "@/components/global/section-wrapper";

export default function FeaturesSection() {
    return (
        <SectionWrapper
            id="features"
            title={
                <>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-6">
                        Everything you need to{" "}
                        <Highlighter action="underline" color="var(--primary)">
                            <span className="relative z-10 px-2 text-primary">grow</span>
                        </Highlighter>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Powerful features designed specifically for modern restaurants to boost retention and increase revenue.
                    </p>
                </>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 justify-items-center">
                {FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.5, delay: feature.delay, ease: "easeOut" }}
                            whileHover={{ y: -8 }}
                            className="group relative w-full max-w-[400px] flex flex-col bg-white/60 dark:bg-[#10101a]/70 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/15 transition-all duration-300"
                        >
                            {feature.image && (
                                <div className="relative w-full h-56 overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        sizes="(max-width: 768px) 100vw, 350px"
                                    />
                                    {/* Subtle gradient overlay to make it look premium */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                </div>
                            )}

                            {/* Content Section */}
                            <div className="flex flex-col p-8 flex-grow relative z-10">
                                <div className="absolute -top-10 right-6 w-14 h-14 rounded-2xl bg-white dark:bg-neutral-900 flex items-center justify-center shadow-lg border border-neutral-200 dark:border-neutral-800 group-hover:-translate-y-2 group-hover:shadow-primary/20 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}