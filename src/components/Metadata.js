import Head from 'next/head'

function Metadata({ title, description, keywords }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords.join(", ")} />
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
    )
}

export default Metadata