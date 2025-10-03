// components/LottieWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("./LottiePlayer"), {
  ssr: false,
});

export default function LottieWrapper({ path }: { path: string }) {
  return <LottiePlayer lottiePath={path} />;
}
