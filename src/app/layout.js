import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'


export const metadata = {
  title: 'Savindu Supun Sathsara',
  description: 'A Developer based in Sri Lanka, specializing in building exceptional websites, applications, and everything in between.',
  themeColor: '#121212',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://supunsathsara.com/" />
        <meta name="keywords" 
        content="supun sathsara, savindu, Web Developer, Software Engineer, Node.js, Express.js, Next.js, Python, SQL, NoSQL, Tailwind, Redis, Responsive Web Design, Cybersecurity" />
        <meta name="author" content="Supun Sathsara" />

        {/* favicon */}
        <link rel="apple-touch-icon" sizes="57x57" href="favicon/dark/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="favicon/dark/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="favicon/dark/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="favicon/dark/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="favicon/dark/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="favicon/dark/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="favicon/dark/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="favicon/dark/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/dark/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="favicon/dark/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/dark/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicon/dark/favicon-96x96.png" />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://supunsathsara.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Savindu Supun Sathsara"
        />
        <meta
          property="og:description"
          content="A Developer specializing in building exceptional websites, applications, and everything in between."
        />
        <meta
          property="og:image"
          content="https://supunsathsara.com/social-card.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://supunsathsara.com" />
        <meta
          name="twitter:title"
          content="Savindu Supun Sathsara"
        />
        <meta
          name="twitter:description"
          content="A Developer based specializing in building exceptional websites, applications, and everything in between."
        />
        <meta
          name="twitter:image"
          content="https://supunsathsara.com/social-card.png"
        />
      </head>
      <body className='overflow-x-hidden'>
      <main className="flex min-h-screen flex-col bg-[#121212] scroll-smooth">
      <Navbar />
        {children}
        <Footer />
      </main>
        </body>
    </html>
  )
}
