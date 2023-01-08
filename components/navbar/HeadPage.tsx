import Head from "next/head"

interface X {
    title :string
    description:string
}

const HeadPage = ({title , description}:X) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Head>
    )
}

export default HeadPage
