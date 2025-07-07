"use client"
import { Download, IdCardIcon, MousePointer2Icon, PenTool, PhoneIcon } from 'lucide-react'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from 'next/navigation';


function Page() {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const handleDownload = async () => {
        if (mobileNumber.length === 10) {
            setIsLoading(true); // Set loading state to true
            try {
                const response = await fetch("/api/generateIdCard", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mobileNumber }),
                });

                if (response.ok) {
                    const resp = await response.json()
                    localStorage.setItem("card",JSON.stringify(resp))
                    setTimeout(()=>{
                        setIsLoading(false); // Reset loading state
                        router.push("/generateCard")
                    },1000)
                    
                    // const blob = await response.blob();
                    // const url = URL.createObjectURL(blob);

                    // // Trigger download
                    // const link = document.createElement("a");
                    // link.href = url;
                    // link.download = "id_card.png";
                    // link.click();
                    // URL.revokeObjectURL(url);
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || "Failed to download ID card.");
                }
            } catch (error) {
                console.log(error)
                alert("An error occurred while downloading the ID card.");
                   setIsLoading(false); // Reset loading state
            } 
        } else {
            alert("Please enter a valid 10-digit mobile number.");
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-evenly'>
            <div className="flex items-center flex-col">
                <h1 className="text-4xl font-bold pt-10 pb-8"><IdCardIcon></IdCardIcon> सदास्यता कार्ड</h1>
                <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-8 relative -top-4"></div>
            </div>

            <div className="text-xl md:text-3xl font-bold pb-16 pt-8  md:w-auto px-2  mb-8 shadow-xl">
                <h1 className="flex items-center gap-x-2 justify-center mb-8 px-4 py-2">
                    <Download className="relative -top-0.5" />
                    पूराना सदास्यता कार्ड डाउनलोड करें
                </h1>
                <div className="flex items-center justify-center">
                    <Card className="w-full p-4">
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">Download Card</h2>
                            <Input
                                type="tel"
                                placeholder="Enter your mobile number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="mb-4"
                            />
                            <Button 
                                onClick={handleDownload} 
                                className="w-full" 
                                disabled={isLoading} // Disable button when loading
                            >
                                {isLoading ? "Downloading..." : "Download"} {/* Show loading text */}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Page
