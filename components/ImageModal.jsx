import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function ImageModal({ isOpen, onClose, imageUrl }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative w-full h-[90vh]">
          {!isImageLoaded && (
            <Skeleton className="absolute inset-0" />
          )}
          <Image
            src={imageUrl}
            alt="Full screen image"
            fill
            className={`object-contain transition-all duration-500 ${
              isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            unoptimized
            priority
            onLoad={() => setIsImageLoaded(true)}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 