import './globals.css'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full bg-primary dark:bg-primaryDark">

        {children}
        </body>
    </html>
  )
}
