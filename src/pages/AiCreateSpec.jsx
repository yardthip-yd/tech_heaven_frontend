import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Sparkles } from 'lucide-react';
import AiVideo from "@/assets/video/auth.mp4";

// Import Option for Form Create Spec
import BudgetOpt from "@/components/gai/BudgetOpt";
import UseOpt from "@/components/gai/UseOpt";

// Import AI Prompt and Service
import { createChatSession } from "@/components/gai/GAiService";
import AI_PROMPT from "@/components/gai/AiGen";

import useAuthStore from "@/stores/authStore";
import GenerateResult from "@/components/gai/GenerateResult";
import LoginModal from "@/components/auth/LoginModal";

const AiCreateSpec = () => {
    const { token, user } = useAuthStore();

    const [formData, setFormData] = useState({
        budget: "",
        useCase: "",
    });
    const [specData, setSpecData] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!user && !token) {
            toast.info("Please log in to generate computer specifications");
        }
    }, [user, token]);

    const hdlInputChange = (name, value) => {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const generateSpec = async () => {
        if (!user || !token) {
            setShowLoginModal(true);
            return;
        }

        if (!formData.budget || !formData.useCase) {
            toast.info("Please select a budget and use case");
            return;
        }

        const FINAL_PROMPT = AI_PROMPT
            .replace("{budget}", formData.budget)
            .replace("{useCase}", formData.useCase);

        try {
            setIsGenerating(true);
            const chatSession = await createChatSession();
            if (!chatSession) {
                throw new Error("Chat session is undefined");
            }
            const result = await chatSession.sendMessage(FINAL_PROMPT);

            if (!result?.response?.text()) {
                throw new Error("Invalid response from AI");
            }

            const jsonResponse = JSON.parse(result.response.text());
            setSpecData(jsonResponse);
            toast.success("Specifications generated successfully!");

        } catch (error) {
            console.error("Error generating specifications:", error);
            toast.error("Error generating specifications. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        generateSpec();
    };

    return (
        <div className="min-h-screen w-full flex items-center bg-gradient-to-b from-slate-50 to-slate-100">

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover md:object-center object-left"
                src={AiVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="flex flex-col mx-auto">
                <div className="w-full my-8 px-4 flex flex-col items-center relative z-10 ">
                    <div className="bg-white p-6 pb-10 rounded-xl">
                        <div className="text-center max-w-3xl mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-black via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 relative inline-block">
                                Recommend Spec by AI
                                <span className="absolute -right-8 -top-1">
                                    <Sparkles className="w-6 h-6 text-yellow-400" />
                                </span>
                            </h2>
                            <p className="text-slate-600 text-lg">
                                Select your preferences, and we'll create a tailored computer build just for you.
                            </p>
                        </div>

                        <div className="relative z-10">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                                <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col gap-6 shadow-xl">
                                    <div className="flex flex-row gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Select Your Budget
                                            </label>
                                            <select
                                                className="w-full md:w-80 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg
                        text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200 hover:bg-slate-100"
                                                value={formData.budget}
                                                onChange={(e) => hdlInputChange("budget", e.target.value)}
                                            >
                                                <option value="" disabled>Select budget...</option>
                                                {BudgetOpt.map((item, index) => (
                                                    <option key={index} value={item.title}>{item.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Select Use Case
                                            </label>
                                            <select
                                                className="w-full md:w-80 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg
                        text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        transition-all duration-200 hover:bg-slate-100"
                                                value={formData.useCase}
                                                onChange={(e) => hdlInputChange("useCase", e.target.value)}
                                            >
                                                <option value="" disabled>Select use case...</option>
                                                {UseOpt.map((item, index) => (
                                                    <option key={index} value={item.title}>{item.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Generate Spec Button */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%-25px)]">
                                    <button
                                        onClick={generateSpec}
                                        className={`px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${isGenerating
                                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-xl hover:scale-105"
                                            }`}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? "Generating..." : "Generate Spec"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full mt-12">
                        <GenerateResult specData={specData} />
                    </div>
                </div>

                {/* Show LoginModal if user is not logged in */}
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onLogin={handleLoginSuccess}
                />
            </div>
        </div>
    );
};

export default AiCreateSpec;
