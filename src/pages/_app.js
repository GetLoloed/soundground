import '@/styles/globals.css'
import '@/styles/search.css'
import {Analytics} from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({Component, pageProps}) {
    return (
        <div className="gradient min-h-screen">
            <Component {...pageProps} />
            <Analytics/>
            <SpeedInsights/>
        </div>
    );
}