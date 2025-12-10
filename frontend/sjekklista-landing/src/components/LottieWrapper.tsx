import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface LottieWrapperProps {
  path: string
}

export default function LottieWrapper({ path }: LottieWrapperProps) {
  const [animationData, setAnimationData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load animation:', err)
        setIsLoading(false)
      })
  }, [path])

  if (isLoading) {
    return <div className="w-full h-full bg-gray-100 animate-pulse rounded" />
  }

  return animationData ? (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: '100%', height: '100%' }}
    />
  ) : (
    <div className="w-full h-full bg-gray-100 rounded" />
  )
}
