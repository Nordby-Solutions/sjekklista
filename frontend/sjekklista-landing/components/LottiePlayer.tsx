"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export type LottiePlayerProps = {
  lottiePath: string;
  width?: string; // Optional override
};

export default function LottiePlayer({ lottiePath, width }: LottiePlayerProps) {
  return (
    <div className="flex justify-center mb-8">
      <Player
        autoplay
        loop
        src={lottiePath}
        className="sm:w-[250px] md:w-[300px] lg:w-[390px]"
      />
    </div>
  );
}
