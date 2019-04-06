import Link from 'next/link'
import Head from 'next/head'
import '../assets/css/main.css'

export default ({children, title = 'This is the default title'}) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8'/>
            <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        </Head>
        {children}
        <footer>
            {'I`m here to stay'}
        </footer>
    </div>
)

