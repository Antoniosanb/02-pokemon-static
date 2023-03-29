import Head from "next/head"
import { FC, ReactElement, ReactNode } from "react"
import { Navbar } from '../ui';

interface Props {
    title?: string,
    children: ReactNode
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? title : 'Pokemon App'}</title>
                <meta name="author" content="Antonio Santafe (tony)" />
                <meta name="description" content={`Información sobre el ${ title }`} />
                <meta name="keywors" content={`${ title }, pokemon, pokedex`} />

                <meta property="og:title" content={`Informacion sobre ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>
            <Navbar />
            <main style={{
                padding: '0 20px'
            }}>
                { children }
            </main>
        </>
    )
}