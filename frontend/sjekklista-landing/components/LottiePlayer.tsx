"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export type LottiePlayerProps = {
  lottiePath: string;
  width?: string; // Optional override
};

export default function LottiePlayer({ lottiePath, width }: LottiePlayerProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[390px] lg:h-[390px]">
        <Player
          autoplay
          loop
          src={lottiePath}
          style={{ width: "100%", height: "100%" }}
          renderer="canvas"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
