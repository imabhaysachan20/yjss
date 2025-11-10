
"use client";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

let PressReleaseModal=({ isOpen, pressItem, onClose })=>{
  if (!isOpen || !pressItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-2">{pressItem.title}</h2>
          <p className="text-md text-gray-500 mb-6">{pressItem.date}</p>
          
          {/* This will render the detailed content */}
          <div className="prose max-w-none mb-8">
            <p>{pressItem.fullContent}</p>
          </div>

          {pressItem.pdfUrl && (
            <a href={pressItem.pdfUrl} download target="_blank" rel="noopener noreferrer">
              <Button>Download PDF</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
export default PressReleaseModal