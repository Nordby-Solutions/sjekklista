"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export type LottiePlayerProps = {
  lottiePath: string;
  width?: number; // Optional override in pixels
};

export default function LottiePlayer({
  lottiePath,
  width = 200,
}: LottiePlayerProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="mx-auto">
        <Player
          autoplay
          loop
          src={lottiePath}
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
