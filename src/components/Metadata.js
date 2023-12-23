import Head from 'next/head'

function Metadata({ title, description, keywords }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords.join(", ")}/>
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="theme-color" content="#ffffff"/>
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://soundground.vercel.app/" />
            <meta property="og:title" content="SoundGround" />
            <meta property="og:description" content="Download music from SoundCloud and YouTube for free!" />
            <meta property="og:image" content="https://soundground.vercel.app/img/meta-tags.png" />

            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://soundground.vercel.app/" />
            <meta property="twitter:title" content="SoundGround" />
            <meta property="twitter:description" content="Download music from SoundCloud and YouTube for free!" />
            <meta property="twitter:image" content="https://soundground.vercel.app/img/meta-tags.png" />


        </Head>
    )
}

export default Metadata