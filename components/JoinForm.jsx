"use client"
import { toast } from "sonner"

const kalyanpur =['नवाबगंज ', 'विष्णुपुरी ', 'पुराना कानपुर ', 'ख्योरा ', 'नारामऊ ', 'बेनाझाबर ', 'तिलक नगर ', 'आवास विकास ', 'कल्याणपुर उत्तरी ', 'कल्याणपुर दक्षिण ', 'गीता नगर ', 'कल्याणपुर पश्चिम', 'पनकी ', 'नानकारी ', 'आंबेडकर नगर काकादेव ', 'काकादेव ', 'अशोक नगर']
import { ObjectId } from "bson";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useRef, useEffect } from "react";
import Script from 'next/script';
import districts from "@/utils/data";

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
  const userId = useRef("yjss"+Date.now().toString());
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLoksabha, setSelectedLoksabha] = useState("");
  const [selectedVidansabha, setSelectedVidansabha] = useState("");
  const [areaType, setAreaType] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedGramPanchayat, setSelectedGramPanchayat] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lname: "",
    mob: "",
    whatno: "",
    district: selectedDistrict,
    loksabha: selectedLoksabha,
    vidansabha: selectedVidansabha,
    areaType: "",
    block: "",
    gramPanchayat: "",
    ward: "",
    address: "",
    state: ""
  });

  const validateForm = () => {
    
    let newErrors = {};
    
    // Basic validations for all states
    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "First name must be at least 2 characters";
    }

    if (!formData.lname.trim()) {
      newErrors.lname = "Last name is required";
    } else if (formData.lname.length < 2) {
      newErrors.lname = "Last name must be at least 2 characters";
    }

    if (!formData.mob) {
      newErrors.mob = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mob)) {
      newErrors.mob = "Invalid phone number (must be 10 digits)";
    }

    if (!formData.whatno) {
      newErrors.whatno = "WhatsApp number is required";
    } else if (!/^[0-9]{10}$/.test(formData.whatno)) {
      newErrors.whatno = "Invalid WhatsApp number (must be 10 digits)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    // Additional validations only for Uttar Pradesh
    if (formData.state === "Uttar Pradesh") {
      if (!selectedDistrict) newErrors.district = "District is required";
      if (!selectedLoksabha) newErrors.loksabha = "Lok Sabha is required";
      if (!selectedVidansabha) newErrors.vidansabha = "Vidhan Sabha is required";
      if (!areaType) newErrors.areaType = "Area type is required";
      
      if (areaType === "rural") {
        if (!selectedBlock) newErrors.block = "Block is required";
        if (!selectedGramPanchayat) newErrors.gramPanchayat = "Gram Panchayat is required";
      } else if (areaType === "urban") {
        if (!selectedWard) newErrors.ward = "Ward is required";
      }
    }

    if (!consent) {
      newErrors.consent = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Reset UP-specific fields when state changes
    if (name === 'state' && value !== 'Uttar Pradesh') {
      setSelectedDistrict("");
      setSelectedLoksabha("");
      setSelectedVidansabha("");
      setAreaType("");
      setSelectedBlock("");
      setSelectedGramPanchayat("");
      setSelectedWard("");
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(formData.state === 'Uttar Pradesh' ? {
        district: selectedDistrict,
        loksabha: selectedLoksabha,
        vidansabha: selectedVidansabha,
        areaType: areaType,
        block: selectedBlock,
        gramPanchayat: selectedGramPanchayat,
        ward: selectedWard
      } : {
        district: "",
        loksabha: "",
        vidansabha: "",
        areaType: "",
        block: "",
        gramPanchayat: "",
        ward: ""
      })
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleAreaTypeChange = (type) => {
    setAreaType(type);
    setSelectedBlock("");
    setSelectedGramPanchayat("");
    setSelectedWard("");
    setFormData(prev => ({
      ...prev,
      areaType: type,
      block: "",
      gramPanchayat: "",
      ward: ""
    }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayNow = async () => {
    selectedVidansabha=='कल्याणपुर'?setAreaType("urban"):"";
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      // Create order
      const orderResponse = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId.current,membership_type:"newMember" }),
      });
      const { orderId } = await orderResponse.json();

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 10000,
        currency: "INR",
        name: "YJSS",
        description: "Membership Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/verifyPayment/member', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                formData: {
                  userId: userId.current,
                  ...formData,
                  district: selectedDistrict,
                  loksabha: selectedLoksabha,
                  vidansabha: selectedVidansabha,
                  areaType: areaType,
                  block: selectedBlock,
                  gramPanchayat: selectedGramPanchayat,
                  ward: selectedWard
                }
              }),
            });

            const data = await verifyResponse.json();
            if (data.success) {
              setIsSubmitting(false);
              
              // Reset form
              setFormData({
                name: "",
                lname: "",
                mob: "",
                whatno: "",
                district: "",
                loksabha: "",
                vidansabha: "",
                areaType: "",
                block: "",
                gramPanchayat: "",
                ward: "",
                address: "",
                state: ""
              });
              setSelectedDistrict("");
              setSelectedLoksabha("");
              setSelectedVidansabha("");
              setAreaType("");
              setSelectedBlock("");
              setSelectedGramPanchayat("");
              setSelectedWard("");
              setConsent(false);
              // Generate new userId
              alert("युवा जनता संघर्ष की सदस्यता ग्रहण करने के लिए धन्यवाद। आपके फ़ोन नंबर  से आप अपना सदस्यता कार्ड डाउनलोड कर सकते है।")
              userId.current = "yjss"+Date.now().toString();
            }
          } catch (err) {
            setIsSubmitting(false);
            toast.error("Payment verification failed. Please contact support.")    
          }
       
        },
        prefill: {
          name: `${formData.name} ${formData.lname}`,
          contact: formData.mob,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const isFormValid = () => {
    // Basic fields that are required for all states
    const baseFieldsValid = Object.values({
      name: formData.name,
      lname: formData.lname,
      mob: formData.mob,
      whatno: formData.whatno,
      address: formData.address,
      state: formData.state
    }).every(value => value !== "");

    if (!baseFieldsValid || !consent) return false;

    // Additional validation only for Uttar Pradesh
    if (formData.state === "Uttar Pradesh") {
      const upFieldsValid = selectedDistrict && selectedLoksabha && selectedVidansabha && areaType;
      if (!upFieldsValid) return false;

      if (areaType === "rural") {
        return selectedBlock && selectedGramPanchayat;
      } else if (areaType === "urban") {
        return selectedWard;
      }
      return false;
    }

    return true;
  };

  const showUrbanOption = selectedDistrict && districts[selectedDistrict]?.nagar_nikay?.ward?.length > 0;
  useEffect(()=>{
    selectedVidansabha=='कल्याणपुर'?setAreaType("urban"):"";
  },[selectedVidansabha])
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="shadow-2xl mb-16 w-[100%]">
        <div className="text-center pt-2 text-xl font-bold">
          <h1>ऑनलाइन सदस्यता फार्म</h1>
          <hr/>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          <div>
            <Label htmlFor="ORDER_ID">ID:</Label>
            <Input id="ORDER_ID" name="ORDER_ID" value={userId.current} readOnly />
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
          <div className="w-full">
            <Label htmlFor="sts">Select State</Label>
            <Select className="w-full"
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
          </div>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          {formData.state === "Uttar Pradesh" && (
            <>
              <div>
                <Select onValueChange={(value)=>{setSelectedDistrict(value); formData.district = value}}>
                  <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select District" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(districts).map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
              </div>
              <div>
                {selectedDistrict && (
                  <Select onValueChange={(value)=>{setSelectedLoksabha(value); formData.loksabha = value}}>
                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Lok Sabha" /></SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict].loksabha.map((ls) => (
                        <SelectItem key={ls} value={ls}>{ls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.loksabha && <p className="text-red-500 text-sm">{errors.loksabha}</p>}
              </div>
              <div>
                {selectedLoksabha && districts[selectedDistrict]?.vidansabha?.[selectedLoksabha] && (
                  <Select onValueChange={(value)=>{setSelectedVidansabha(value); formData.vidansabha = value}}>
                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Vidhan Sabha" /></SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict]?.vidansabha?.[selectedLoksabha]?.map((vs) => (
                        <SelectItem key={vs} value={vs}>{vs}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {errors.vidansabha && <p className="text-red-500 text-sm">{errors.vidansabha}</p>}
              </div>
              <div>
                {selectedVidansabha &&  selectedVidansabha!="कल्याणपुर" &&(
                  <div className="mb-4">
                    <RadioGroup value={areaType} onValueChange={handleAreaTypeChange} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rural" id="rural" />
                        <Label htmlFor="rural">Rural</Label>
                      </div>
                      {showUrbanOption && (
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="urban" id="urban" />
                          <Label htmlFor="urban">Urban</Label>
                        </div>
                      )}
                    </RadioGroup>
                    {errors.areaType && <p className="text-red-500 text-sm">{errors.areaType}</p>}
                  </div>
                )}
                {selectedVidansabha=="कल्याणपुर" &&  <>
            <Select onValueChange={setSelectedWard}>
              <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Ward" /></SelectTrigger>
              <SelectContent>
                {kalyanpur.map((ward) => (
                  <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
          </>}
              </div>
              {areaType === "rural" && selectedDistrict && (
                <>
                  <div>
                    <Select onValueChange={(value)=>{setSelectedBlock(value); formData.block = value}}>
                      <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Block" /></SelectTrigger>
                      <SelectContent>
                        {districts[selectedDistrict].blocks.map((block) => (
                          <SelectItem key={block} value={block}>{block}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.block && <p className="text-red-500 text-sm">{errors.block}</p>}
                  </div>
                  <div>
                    {selectedBlock && (
                      <Select onValueChange={(value)=>{setSelectedGramPanchayat(value); formData.gramPanchayat = value}}>
                        <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Gram Panchayat" /></SelectTrigger>
                        <SelectContent>
                          {districts[selectedDistrict].grampanchayat[selectedBlock].map((gp) => (
                            <SelectItem key={gp} value={gp}>{gp}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {errors.gramPanchayat && <p className="text-red-500 text-sm">{errors.gramPanchayat}</p>}
                  </div>
                </>
              )}
              {areaType === "urban" && selectedDistrict &&  selectedVidansabha!="कल्याणपुर" && (
                <div>
                  <Select onValueChange={(value)=>{setSelectedWard(value); formData.ward = value}}>
                    <SelectTrigger className="mb-3 w-full"><SelectValue placeholder="Select Ward" /></SelectTrigger>
                    <SelectContent>
                      {districts[selectedDistrict].nagar_nikay.ward.map((ward) => (
                        <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
                </div>
              )}
            </>
          )}
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
              disabled={!isFormValid() || isSubmitting}
              onClick={handlePayNow}
            >
              {isSubmitting?"...":"Pay Now"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
