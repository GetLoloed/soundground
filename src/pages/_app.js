import '@/styles/globals.css'
import {Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { gsap } from 'gsap';
import { useEffect } from 'react';

export default function App({Component, pageProps}) {
    useEffect(() => {
        gsap.to('.gradient', {
            background: 'linear-gradient(to bottom right, #1A202C, #000000)',
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: 'sine.inOut'
        });
    }, []);

    return (
        <div className="gradient min-h-screen animate-gradient bg-gradient-to-r animation-3">
            <Component {...pageProps} />
            <Analytics/>
            <SpeedInsights/>
        </div>
    );
}