import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Header from "./components/layout/header/header";
import { FilterProvider } from "@/store/FilterContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizes Builder",
  description: "A platform for creating and managing quizzes, creating for practice task",
  icons: {
    icon: "/icons/quiz.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${montserrat.variable} antialiased`}
      >
        <FilterProvider>
          <Header />
          {children}
          <Toaster position='top-right' reverseOrder={false}/>
        </FilterProvider>
      </body>
    </html>
  );
}
