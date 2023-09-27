import './globals.css'


export const metadata = {
  title: 'Savindu Supun Sathsara',
  description: 'Savindu Supun Sathsara | a Software Engineer, Web Developer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className='overflow-x-hidden'>{children}</body>
    </html>
  )
}
