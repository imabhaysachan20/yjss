"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

export default function MemberForm() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    memberType: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsappNumber: "",
    address: "",
    state: "",
    city: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card className="max-w-md mx-auto w-full  mt-10 p-4 mb-10">
      <CardHeader>
        <CardTitle className="text-xl">सहयोग फार्म</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 md:grid md:grid-cols-2 gap-x-6 gap-y-0">
          <div>
            <Label>ID:</Label>
            <Input value={formData.id} disabled />
          </div>
          <div>
            <Label>Select Member Type:</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, memberType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>First Name:</Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Last Name:</Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Phone Number:</Label>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div>
            <Label>Whatsapp No.:</Label>
            <Input name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
          </div>
          <div>
            <Label>Address:</Label>
            <Input name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div>
            <Label>Select State:</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, state: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="state1">State 1</SelectItem>
                <SelectItem value="state2">State 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Select City:</Label>
            <Select  onValueChange={(value) => setFormData({ ...formData, city: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city1">City 1</SelectItem>
                <SelectItem value="city2">City 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount:</Label>
            <Input name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
          <Button type="submit" className="w-full">Pay Now</Button>
        </form>
      </CardContent>
    </Card>
  );
}