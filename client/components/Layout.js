
import Nav from './Nav'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'  


Router.onRouteChangeStart = url => NProgress.start() // when route change happens Nprogress will exec start function
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

//passing in children which is our application that is passed into the layout
export default function Layout({children}) {
  return (
    <div>
        <Head>
            Add key words
        </Head>
        
        <Nav/>
            <div className='container pt-5 pb-5'>
                {children}
            </div>
        </div>
    )
}
