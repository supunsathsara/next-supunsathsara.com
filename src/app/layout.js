import './globals.css'


export const metadata = {
  title: 'Savindu Supun Sathsara',
  description: 'Savindu Supun Sathsara | a Software Engineer, Web Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
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
      </head>
      <body className='overflow-x-hidden'>{children}</body>
    </html>
  )
}
