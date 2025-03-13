import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";

const districts = ["Saharanpur", "Shamli", "Muzaffarnagar", "Bijnor", "Moradabad", "Sambhal", "Rampur", "Amroha", "Meerut", "Bagpat", "Ghaziabad", "Hapur", "Gautam Budh Nagar", "Bulandshahr", "Aligarh", "Hathras", "Mathura", "Sonbhadra", "Mirzapur", "Bhadohi", "Varanasi", "Chandauli", "Ghazipur", "Jaunpur", "Ballia", "Mau", "Azamgarh", "Deoria", "Kushinagar", "Gorakhpur", "Maharajganj", "Sant Kabir Nagar", "Basti", "Siddharthnagar", "Gonda", "Balrampur", "Shrawasti", "Bahraich", "Ambedkar Nagar", "Faizabad", "Barabanki", "Allahabad", "Kaushambi", "Fatehpur", "Kanpur Dehat", "Kanpur Nagar", "Jalaun", "Pratapgarh", "Chitrakoot", "Banda", "Mahoba", "Hamirpur", "Lalitpur", "Jhansi", "Auraiya", "Etawah", "Kannauj", "Farrukhabad", "Sultanpur", "Amethi", "Raebareli", "Lucknow", "Unnao", "Hardoi", "Sitapur", "Shahjahanpur", "Pilibhit", "Bareilly", "Budaun", "Lakhimpur Kheri", "Mainpuri", "Etah", "Kasganj", "Firozabad", "Agra"];

const states = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh"];

export default function FormComponent() {
  return (
    <div className="shadow-2xl mb-16 w-full">
      <div className="text-center pt-2 text-xl font-bold">
        <h1>ऑनलाइन सदस्यता फार्म</h1>
        <hr/>
      </div>
      <form className="flex flex-col gap-4 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ORDER_ID">ID:</Label>
            <Input id="ORDER_ID" name="ORDER_ID" value="JYS70847876" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="member">Select Member Type:</Label>
            <Input id="member" name="member" value="New Member" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">First Name</Label>
            <Input id="name" name="name" placeholder="Your First Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lname">Last Name</Label>
            <Input id="lname" name="lname" placeholder="Your Last Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mob">Phone Number</Label>
            <Input id="mob" name="mob" type="number" placeholder="Your Phone Number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatno">Whatsapp No.</Label>
            <Input id="whatno" name="whatno" type="number" placeholder="Enter Whatsapp No." required />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="Your Full Address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="countySel">District:</Label>
            <Select name="district">
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateSel">Loksabha</Label>
            <Select name="loksabha">
              <SelectTrigger>
                <SelectValue placeholder="Please select Loksabha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none" disabled>Please select Loksabha</SelectItem>
                <SelectItem value="Loksabha1">Loksabha 1</SelectItem>
                <SelectItem value="Loksabha2">Loksabha 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="districtSel">Select Vidansabha</Label>
            <Select name="vidansabha">
              <SelectTrigger>
                <SelectValue placeholder="Please select Vidansabha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none" disabled>Please select Vidansabha</SelectItem>
                <SelectItem value="Vidansabha1">Vidansabha 1</SelectItem>
                <SelectItem value="Vidansabha2">Vidansabha 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sts">Select State</Label>
            <Select name="state">
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
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" className="w-full sm:w-auto">Submit</Button>
        </div>
      </form>
    </div>
  );
}
