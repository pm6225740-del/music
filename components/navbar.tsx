"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Search, LogOut } from 'lucide-react';

export const WorkspaceNavbar = () => {
    const { user, signOut } = useAuth();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 flex h-20 w-full items-center justify-between px-8 bg-transparent">
            {/* Left: Logo */}
            <div className="flex items-center">
                <div className="text-2xl tracking-wider text-white font-[family-name:var(--font-quintessential)] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    MUSIC
                </div>
            </div>

            {/* Center: Search Bar (Glassmorphism) */}
            <div className="hidden flex-1 items-center justify-center md:flex px-8">
                <div className="relative w-full max-w-md group">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/50 transition-colors group-focus-within:text-white/80 z-10">
                        <Search className="h-4 w-4" />
                    </div>
                    {/* Glass background for input */}
                    <div className="absolute inset-0 z-0 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"></div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="relative z-10 h-11 w-full rounded-2xl bg-transparent pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none transition-all placeholder:font-light focus:bg-white/5 hover:bg-white/5"
                    />
                </div>
            </div>

            {/* Right: User Profile Popover */}
            <div className="relative flex items-center justify-end">
                <button
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 pr-4 transition-all hover:bg-white/10 active:scale-95"
                >
                    {user?.user_metadata?.avatar_url ? (
                        <img
                            src={user.user_metadata.avatar_url}
                            alt="Profile"
                            className="h-8 w-8 rounded-full border border-white/20 object-cover"
                        />
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 font-medium text-white shadow-inner">
                            {user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                    )}
                    <span className="hidden text-sm font-light text-white/80 md:block">
                        {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}
                    </span>
                </button>

                {/* Popover Dropdown */}
                <AnimatePresence>
                    {isPopoverOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-14 mt-2 w-48 overflow-hidden rounded-2xl border border-white/10 bg-[#222222]/80 p-2 shadow-2xl backdrop-blur-xl"
                        >
                            <div className="mb-2 border-b border-white/10 px-3 pb-3 pt-2">
                                <p className="truncate text-sm font-medium text-white">
                                    {user?.user_metadata?.full_name || 'My Profile'}
                                </p>
                                <p className="truncate text-xs font-light text-white/50">
                                    {user?.email}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setIsPopoverOpen(false);
                                    signOut();
                                }}
                                className="group flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-white/5"
                            >
                                <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Sign Out
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};
