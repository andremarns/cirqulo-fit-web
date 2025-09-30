import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { GamificationProvider } from "@/contexts/GamificationContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CirquloFit",
  description: "Gamificação dos treinos de academia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <NotificationProvider>
            <GamificationProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </GamificationProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
