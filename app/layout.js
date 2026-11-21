export const metadata = {
  title: 'Kovak AI',
  description: 'My Personal AI Assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
