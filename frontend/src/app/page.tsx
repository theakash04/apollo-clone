"use client";
import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>MediConnect | Modern Healthcare Solutions</title>
        <meta name="description" content="Connecting patients with healthcare professionals seamlessly. Experience our innovative platform." />
        <meta name="keywords" content="healthcare, doctors, medical, appointments" />
      </Head>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Apollo Clone</h1>
          <p className="text-gray-600 max-w-md px-4">Single page clone of Apollo website to showcase some features</p>
        </div>
        <Link href="/doctors">
          <button className="bg-white border-2 border-blue-500 text-blue-500 font-medium py-3 px-8 rounded-lg shadow-sm transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
            See Demo
          </button>
        </Link>
      </div>
    </>
  );
}

