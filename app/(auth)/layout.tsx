'use client'
import React, { useEffect } from 'react';
import { useSession, useAuth } from '@clerk/nextjs';

const AuthLayout = ({
    children
} : {
    children: React.ReactNode
}) => {
    const { session } = useSession();
    const { signOut } = useAuth();

    useEffect(() => {
        const refreshSession = async () => {
            try {
                // Fetch a new token or refresh session here
                if (session) {
                    await session.getToken();
                    console.log('Session refreshed successfully');
                }
            } catch (error) {
                console.error('Failed to refresh session:', error);
                await signOut();
            }
        };

        // Refresh session every 5 minutes (300000 ms)
        const intervalId = setInterval(refreshSession, 300000);

        return () => clearInterval(intervalId);
    }, [session, signOut]);

    return ( 
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    );
}
 
export default AuthLayout;
