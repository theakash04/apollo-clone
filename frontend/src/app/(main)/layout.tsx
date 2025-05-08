import { DoctorProvider } from "@/context/doctorContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors | Apollo Clone",
  description: "Find and consult with top doctors online. Book appointments, get medical advice, and access healthcare from home.",
  keywords: "doctors, online consultation, healthcare, Apollo, medical specialists",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: "Doctors | Apollo Clone",
    description: "Find and consult with top doctors online. Book appointments and access healthcare from home.",
    url: "/doctors",
    siteName: "Apollo Clone",
    images: [
      {
        url: "/apollo.svg",
        width: 1200,
        height: 630,
        alt: "Doctors at Apollo Clone",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DoctorProvider>{children}</DoctorProvider>;
}

