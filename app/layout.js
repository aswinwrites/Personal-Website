import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Aswin Sampath Kumar | Growth Specialist',
  description: 'Figuring out what actually moves metrics in meaningful ways',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
