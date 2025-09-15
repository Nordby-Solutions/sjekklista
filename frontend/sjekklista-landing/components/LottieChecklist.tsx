"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function LottieChecklist() {
  return (
    <div className="flex justify-center mb-8">
      <Player
        autoplay
        loop
        src="/lottie/checklist.json"
        style={{ width: "390px" }}
      />
    </div>
  );
}
