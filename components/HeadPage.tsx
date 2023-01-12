import Head from "next/head"

interface X {
    title: string
    description: string
}

const HeadPage = ({ title, description }: X) => {
    return (
        <Head>
            <title>Rate - {title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    )
}

export default HeadPage
