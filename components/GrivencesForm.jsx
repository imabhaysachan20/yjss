"use client"
import React, { useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";

const districts = {
  "Lucknow": { 
    loksabha: ["Lucknow"],
    vidansabha: {
      "Lucknow": ["Lucknow East", "Lucknow Central", "Lucknow North"]
    },
    ward: {
      "Lucknow East": ["Ward 1", "Ward 2"],
      "Lucknow Central": ["Ward 3", "Ward 4"],
      "Lucknow North": ["Ward 5", "Ward 6"]
    }
  },
  "Kanpur": {
    loksabha: ["Kanpur"],
    vidansabha: {
      "Kanpur": ["Govind Nagar", "Arya Nagar"]
    },
    ward: {
      "Govind Nagar": ["Ward 7", "Ward 8"],
      "Arya Nagar": ["Ward 9", "Ward 10"]
    }
  }
};

export default function SupportForm() {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLoksabha, setSelectedLoksabha] = useState("");
  const [selectedVidansabha, setSelectedVidansabha] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(phone)) newErrors.phone = "Invalid phone number";
    if (!selectedDistrict) newErrors.district = "District is required";
    if (!selectedLoksabha) newErrors.loksabha = "Lok Sabha is required";
    if (!selectedVidansabha) newErrors.vidansabha = "Vidhan Sabha is required";
    if (!selectedWard) newErrors.ward = "Ward is required";
    if (!problem) newErrors.problem = "Problem description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully");
    }
  };

  return (<div className="mb-24">
  <div className="flex justify-center mt-8 md:mt-16 mb-16">
  <h1 className="text-lg md:text-3xl  font-bold bg-yellow-200 px-4 py-2 inline-block rounded-md -mb-8 md:mb-8">
    <div className="flex items-center gap-x-2">

          <PenTool className="relative -top-0.5 w-4 md:w-8"/>
          <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'अपनी बात मानस भाई तक पहुँचाएं',
        5000, // wait 1s before replacing "Mice" with "Hamsters"
        'सपोर्ट फॉर्म भर के',3000
      ]}
      wrapper="span"
      speed={50}
      style={{ display: 'inline-block' }}
      repeat={Infinity}
    />
          </div>
        </h1>
        </div>
  <div className="flex justify-between items-center">
  <div className="hidden md:block w-[20%] grow-1">
        <img className="w-full" src="/contact.png"/>
    </div>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg grow-1 rounded-xl">
      {/* Highlighted Text in Hindi */}
      <div className="text-center mb-4">
        
      </div>

      <h2 className="text-xl font-bold mb-4">Support Form</h2>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3 w-full" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      
      <Input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="mb-3 w-full" type="tel" />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      
      <Select onValueChange={setSelectedDistrict}>
        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select District" /></SelectTrigger>
        <SelectContent>
          {Object.keys(districts).map((district) => (
            <SelectItem key={district} value={district}>{district}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}

      {selectedDistrict && (
        <Select onValueChange={setSelectedLoksabha}>
          <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Lok Sabha" /></SelectTrigger>
          <SelectContent>
            {districts[selectedDistrict].loksabha.map((ls) => (
              <SelectItem key={ls} value={ls}>{ls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors.loksabha && <p className="text-red-500 text-sm">{errors.loksabha}</p>}

      {selectedLoksabha && districts[selectedDistrict]?.vidansabha?.[selectedLoksabha] && (
        <Select onValueChange={setSelectedVidansabha}>
          <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Vidhan Sabha" /></SelectTrigger>
          <SelectContent>
            {districts[selectedDistrict]?.vidansabha?.[selectedLoksabha]?.map((vs) => (
              <SelectItem key={vs} value={vs}>{vs}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors.vidansabha && <p className="text-red-500 text-sm">{errors.vidansabha}</p>}

      {selectedVidansabha && districts[selectedDistrict]?.ward?.[selectedVidansabha] && (
        <Select onValueChange={setSelectedWard}>
          <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Ward" /></SelectTrigger>
          <SelectContent>
            {districts[selectedDistrict]?.ward?.[selectedVidansabha]?.map((w) => (
              <SelectItem key={w} value={w}>{w}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}

      <Textarea placeholder="Write your problem..." value={problem} onChange={(e) => setProblem(e.target.value)} className="mb-3 w-full" />
      {errors.problem && <p className="text-red-500 text-sm">{errors.problem}</p>}
      
      <Button type="submit" className="w-full">Submit</Button>
    </form>
 
    </div>
    </div>
  );
}
