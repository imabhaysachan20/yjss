"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { toast } from 'sonner';

export default function Base64Upload({ value, onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.');
        return;
    }
    
    setUploading(true);
    const reader = new FileReader();
    
    reader.onload = () => {
        // The result is the Base64 encoded string
        onUpload(reader.result);
        toast.success('Image ready to be saved.');
        setUploading(false);
    };
    
    reader.onerror = () => {
        toast.error('Failed to read file.');
        setUploading(false);
    };
    
    // This starts the conversion process
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p className="text-sm text-gray-500">Processing image...</p>}

      {value && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-2">Photo Preview:</p>
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
            {/* The Base64 string works directly as the src */}
            <Image src={value} alt="Uploaded preview" layout="fill" objectFit="cover" />
          </div>
        </div>
      )}
    </div>
  );
}