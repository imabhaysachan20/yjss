"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function FormComponent() {
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    mob: "",
    whatno: "",
    address: "",
    state: ""
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lname.trim()) {
      newErrors.lname = "Last name is required";
    } else if (formData.lname.length < 2) {
      newErrors.lname = "Last name must be at least 2 characters";
    }

    // Phone validation
    if (!formData.mob) {
      newErrors.mob = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mob)) {
      newErrors.mob = "Invalid phone number (must be 10 digits)";
    }

    // WhatsApp validation
    if (!formData.whatno) {
      newErrors.whatno = "WhatsApp number is required";
    } else if (!/^[0-9]{10}$/.test(formData.whatno)) {
      newErrors.whatno = "Invalid WhatsApp number (must be 10 digits)";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    // State validation
    if (!formData.state) {
      newErrors.state = "State is required";
    }

    // Consent validation
    if (!consent) {
      newErrors.consent = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  const handlePayNow = () => {
    if (validateForm()) {
      const message = `
Form Details:
-------------
Name: ${formData.name} ${formData.lname}
Phone: ${formData.mob}
WhatsApp: ${formData.whatno}
Address: ${formData.address}
State: ${formData.state}
ID: JYS70847876
Member Type: New Member
      `;
      alert(message);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== "") && consent;
  };

  return (
    <div className="shadow-2xl mb-16 w-[100%]">
    <div className="text-center pt-2 text-xl font-bold">
      <h1>ऑनलाइन सदस्यता फार्म</h1>
      <hr/>
    </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      <div>
        <Label htmlFor="ORDER_ID">ID:</Label>
        <Input id="ORDER_ID" name="ORDER_ID" value="JYS70847876" readOnly />
      </div>
      <div>
        <Label htmlFor="member">Select Member Type:</Label>
        <Input id="member" name="member" value="New Member" readOnly />
      </div>
        <div>
          <Label htmlFor="amount">Payment Amount:</Label>
          <Input id="amount" name="amount" value="₹100" readOnly />
        </div>
      <div>
        <Label htmlFor="name">First Name</Label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Your First Name" 
            value={formData.name}
            onChange={handleInputChange}
            required 
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="lname">Last Name</Label>
          <Input 
            id="lname" 
            name="lname" 
            placeholder="Your Last Name" 
            value={formData.lname}
            onChange={handleInputChange}
            required 
          />
          {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
      </div>
      <div>
        <Label htmlFor="mob">Phone Number</Label>
          <Input 
            id="mob" 
            name="mob" 
            type="number" 
            placeholder="Your Phone Number" 
            value={formData.mob}
            onChange={handleInputChange}
            required 
          />
          {errors.mob && <p className="text-red-500 text-sm">{errors.mob}</p>}
      </div>
      <div>
        <Label htmlFor="whatno">Whatsapp No.</Label>
          <Input 
            id="whatno" 
            name="whatno" 
            type="number" 
            placeholder="Enter Whatsapp No." 
            value={formData.whatno}
            onChange={handleInputChange}
            required 
          />
          {errors.whatno && <p className="text-red-500 text-sm">{errors.whatno}</p>}
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            name="address" 
            placeholder="Your Full Address" 
            value={formData.address}
            onChange={handleInputChange}
            required 
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>
      <div>
        <Label htmlFor="sts">Select State</Label>
          <Select 
            name="state"
            value={formData.state}
            onValueChange={(value) => handleInputChange({ target: { name: 'state', value } })}
          >
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>

        <div className="col-span-full mt-4">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="consent" 
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                मैं भारत का नागरिक हूँ मैं 18 साल से ऊपर हूं, और सरकारी कर्मचारी के रूप में नामांकित नहीं हूं मैं भारत के चुनाव आयोग के साथ पंजीकृत किसी भी अन्य राजनीतिक दल का सदस्य नहीं हूं। मैं किसी ऐसे संगठन के सदस्य नहीं हूं जिसका विचार, नीतियां या क्रिया पार्टी के उद्देश्य से संघर्ष में हैं। नैतिक अधमता से जुड़े किसी भी अपराध के लिए मुझे दोषी नहीं ठहराया गया है मुझे संगठन के उद्देश्य और दृष्टि का पूर्ण विश्वास है। मैं एतद्द्वारा पार्टी से लिखित, इलेक्ट्रॉनिक रूप से और / या फोन के माध्यम से किसी भी ऑडियो-विज़ुअल प्रारूप में (एसएमएस / एमएमएस), ईमेल और / या मेरे पते पर कोई भी संचार प्राप्त करने की सहमति देता हूं। ऊपर दिए गए विवरण और कथन मेरे ज्ञान का सबसे अच्छा है और कुछ भी छिपाया नहीं गया है या रोका नहीं गया है
              </label>
            </div>
          </div>
          {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
      </div>

        <div className="col-span-full flex justify-end space-x-4">
          
          <Button 
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={!isFormValid()}
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
      </div>
    </form>
    </div>
  );
}
