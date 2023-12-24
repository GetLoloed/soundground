import '@/styles/globals.css'
import {Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({Component, pageProps}) {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen">
            <Component {...pageProps} />
            <Analytics/>
            <SpeedInsights/>
        </div>
    );
}