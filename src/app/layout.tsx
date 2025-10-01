import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { GamificationProvider } from "@/contexts/GamificationContext";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import ThemeStatusBar from "@/components/ThemeStatusBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CirquloFit - Gamificação de Treinos",
  description: "Transforme seus treinos em uma experiência gamificada e motivadora",
  keywords: ["fitness", "treino", "gamificação", "academia", "saúde"],
  authors: [{ name: "CirquloFit" }],
  creator: "CirquloFit",
  publisher: "CirquloFit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cirqulo-fit.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CirquloFit - Gamificação de Treinos",
    description: "Transforme seus treinos em uma experiência gamificada e motivadora",
    url: "https://cirqulo-fit.vercel.app",
    siteName: "CirquloFit",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "CirquloFit Logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CirquloFit - Gamificação de Treinos",
    description: "Transforme seus treinos em uma experiência gamificada e motivadora",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico",
        color: "#3b82f6",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CirquloFit",
    startupImage: [
      {
        url: "/android-chrome-512x512.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#0f172a",
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-navbutton-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registrado com sucesso:', registration.scope);
                    })
                    .catch(function(registrationError) {
                      console.log('Falha no registro do SW:', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <NotificationProvider>
            <GamificationProvider>
              <AuthProvider>
                <ThemeStatusBar />
                {children}
                <PWAInstallPrompt />
              </AuthProvider>
            </GamificationProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
