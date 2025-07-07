'use client';

import { useRef, useEffect, useState } from 'react';
import domtoimage from 'dom-to-image-more';

const FIELD_LABELS = [
  { key: 'userId', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'mob', label: 'Mobile Number' },
  { key: 'loksabha', label: 'Lok Sabha' },
  { key: 'vidansabha', label: 'Vidhan Sabha' },
  { key: 'district', label: 'District' },
  { key: 'state', label: 'State' },
];

export default function ScreenshotComponent() {
  const captureRef = useRef(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cardData = localStorage.getItem('card');
        if (cardData) {
          setCard(JSON.parse(cardData));
        }
      } catch (e) {
        setCard(null);
      }
    }
  }, []);

  const handleCapture = () => {
    if (!captureRef.current) return;

    domtoimage.toPng(captureRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'screenshot.png';
        link.click();   
      })
      .catch((err) => {
        console.error('Screenshot failed', err);
      });
  };

  return (
    <div className="">
      <div
        ref={captureRef}
        className="rounded w-[600px] overflow-hidden bg-white border-none"
      >
        <img src='banner.png' alt="Banner" />
        <div className="mt-4">
          <div className="font-semibold text-lg mb-2">Member Details</div>
          {card && FIELD_LABELS.map(({ key, label }) => (
            card[key] ? (
              <div className="flex mb-1" key={key}>
                <div className="w-40 font-semibold">{label}</div>
                <div className="flex-1">{key === 'membershipDate' ? new Date(card[key]).toLocaleDateString('hi-IN') : card[key]}</div>
              </div>
            ) : null
          ))}
          <div className='flex items-center justify-center text-center bg-green-200 p-2'>
            "Thank You For Accepting The Membership."<br/>
            Contact Number: 7376366014		
          </div>
        </div>
      </div>

      <button
        onClick={handleCapture}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download
      </button>
    </div>
  );
}
