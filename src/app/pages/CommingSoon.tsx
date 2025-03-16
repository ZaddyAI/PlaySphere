"use client";
import React, { useState, useEffect } from "react";

import { companyName } from "../constant";

const ComingSoon = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({
        days: 30,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                const { days, hours, minutes, seconds } = prevTime;

                if (seconds > 0) return { ...prevTime, seconds: seconds - 1 };
                if (minutes > 0) return { ...prevTime, minutes: minutes - 1, seconds: 59 };
                if (hours > 0) return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
                if (days > 0) return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };

                clearInterval(countdownInterval);
                return prevTime;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }
        console.log("Subscribed with email:", email);
        setEmail(""); // Clear input after subscribing
    };

    const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

    const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_35%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.1),transparent_35%)]"></div>

            {/* Floating Orbs */}
            <div
                className={cn(
                    "absolute top-20 right-[10%] w-64 h-64 rounded-full bg-neon-blue/5 blur-3xl animate-float",
                    isLoading ? "opacity-0" : "animate-blur-in"
                )}
                style={{ animationDelay: "0.3s" }}
            ></div>
            <div
                className={cn(
                    "absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl animate-float",
                    isLoading ? "opacity-0" : "animate-blur-in"
                )}
                style={{ animationDelay: "0.6s", animationDuration: "7s" }}
            ></div>

            {/* Main Content */}
            <div className={cn("relative z-10 max-w-4xl w-full mx-auto text-center", isLoading ? "opacity-0" : "animate-blur-in")}>
                {/* Logo */}
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl glass animate-glow">
                    <div className="w-8 h-8 rounded-full bg-neon-blue"></div>
                </div>

                {/* Heading */}
                <h2 className="text-sm uppercase tracking-widest text-white font-semibold mb-4">
                    Something amazing is coming
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
                    We're <span className="text-neon-blue neon-text-shadow">launching</span> soon
                </h1>
                <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 tracking-wide mb-10">
                    We're crafting a premium experience with meticulous attention to detail.
                    Join our waitlist to be the first to know when we launch.
                </p>

                {/* Countdown Timer */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto mb-12">
                    {Object.entries(timeLeft).map(([label, value], index) => (
                        <div key={index} className="glass rounded-xl p-4 backdrop-blur-md">
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{formatTime(value)}</div>
                            <div className="text-xs sm:text-sm text-gray-400">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Email Subscription Form */}
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="h-12 px-6 rounded-lg bg-neon-blue text-white font-medium hover:bg-neon-blue/90 transition-all duration-300 animate-pulse-slow neon-border"
                        >
                            Notify Me
                        </button>
                    </div>
                </form>

                {/* Social Links */}
                <div className="flex items-center justify-center space-x-6 mt-6">
                    {["twitter", "instagram", "facebook"].map((social, index) => (
                        <a
                            key={index}
                            href="#"
                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-neon-blue transition-colors duration-300"
                        >
                            <span className="sr-only">{social}</span>
                            <div className="w-5 h-5 rounded-full bg-current"></div>
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
