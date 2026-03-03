"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { WorkspaceNavbar } from '@/components/navbar';
import { PromptInputBox } from '@/components/prompt-input';

export default function WorkspacePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If we've finished checking authentication and there is no user, kick them out to /auth
        if (!isLoading && !user) {
            router.push('/auth');
        }
    }, [user, isLoading, router]);

    // Loading state while checking auth
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#171717]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
            </div>
        );
    }

    // If not loading and no user, we render nothing while the useEffect redirects
    if (!user) return null;

    return (
        <div className="flex min-h-screen flex-col bg-[#171717] font-sans text-white">
            <WorkspaceNavbar />

            {/* Main Workspace Area */}
            <main className="flex-1 p-8 flex flex-col justify-end">
                <div className="mx-auto w-full max-w-3xl">
                    <PromptInputBox />
                </div>
            </main>
        </div>
    );
}
