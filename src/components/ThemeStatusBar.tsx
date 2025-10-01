"use client";

import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeStatusBar() {
  const { theme } = useTheme();

  useEffect(() => {
    // Aplicar cor da barra de status baseada no tema
    const themeColor = theme === "dark" ? "#0f172a" : "#ffffff";
    
    // Atualizar meta tag theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = themeColor;
      document.head.appendChild(meta);
    }

    // Atualizar meta tag msapplication-navbutton-color
    const metaNavButton = document.querySelector('meta[name="msapplication-navbutton-color"]');
    if (metaNavButton) {
      metaNavButton.setAttribute("content", themeColor);
    } else {
      const meta = document.createElement("meta");
      meta.name = "msapplication-navbutton-color";
      meta.content = themeColor;
      document.head.appendChild(meta);
    }

    // Para Android Chrome
    if (typeof window !== "undefined" && "navigator" in window) {
      // Aplicar cor da barra de status no Android
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute("content", 
          "width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no"
        );
      }
    }
  }, [theme]);

  return null;
}
