'use client'
import Cookies from 'js-cookie';
import { loginCustomer, registerCustomer } from "@/lib/auth"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function LoginRegister() {
  const router = useRouter()
  const [addressError, setAddressError] = useState(false);
  const [formType, setFormType] = useState("login")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    //following only used for registration
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    addressId:'',
    // following is required for registration to make an address
    unit: '',
    street: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formType === "register") { 

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!"); // TODO: update to a nicer look maybe
        return
      }

      // first create the address
    const addressUrl = new URL("http://localhost:8080/v1/addresses");
    addressUrl.searchParams.append("unit", formData.unit || 0);
    addressUrl.searchParams.append("street", formData.street);
    addressUrl.searchParams.append("city", formData.city);
    addressUrl.searchParams.append("province", formData.province);
    addressUrl.searchParams.append("postalCode", formData.postalCode);

    try {
      const addressResponse = await fetch(addressUrl.toString(), {
        method: "POST",
      });

      const addressData = await addressResponse.json();

      if (!addressData.success) {
        setAddressError(true);
        alert("Failed to create address: " + addressData.message);
        return;
      }

      const addressId = addressData.object.id;

      // Step 2: Register customer with the address ID
      const registerUrl = new URL("http://localhost:8080/v1/customers/register");
      registerUrl.searchParams.append("firstName", formData.firstName);
      registerUrl.searchParams.append("lastName", formData.lastName);
      registerUrl.searchParams.append("birthday", formData.birthday);
      registerUrl.searchParams.append("email", formData.email);
      registerUrl.searchParams.append("username", formData.username);
      registerUrl.searchParams.append("password", formData.password);
      registerUrl.searchParams.append("addressId", addressId);

      const customerResponse = await fetch(registerUrl.toString(), {
        method: "POST",
      });

      const customerData = await customerResponse.json();

      if (customerData.success) {
        alert("Registration successful!");
        // Optionally redirect or auto-login here
        router.push("/loginRegister");
      } else {
        alert("Registration failed: " + customerData.message);
      }

    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Please try again.");
    }

    } 
    
    else {
      const data = await loginCustomer(formData.username, formData.password);

      if (data.message && data.customerId) { //TODO: This probably changes when backend is set to always send 'success' and 'message'
        console.log("successful login");
        console.log(data);
        // Lets bake some cookies, lol.
        Cookies.set('loggedin', 'true');
        Cookies.set('role', data.role);
        Cookies.set('customerId', data.customerId);
        Cookies.set('username', data.username);
        // send them over to the account page.
        router.push("/account"); 
      } else {
        console.log(data);
        alert("login failed");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-3xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="flex flex-col items-center pt-6">
          <Image
            src="/TInsurance-landing-logo.png"
            alt="Taylor Insurance Logo"
            width={90}
            height={90}
            className="mb-2"
          />
          <CardTitle className="text-2xl text-gray-800">Welcome!</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Login or Register an account below
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Login/Register:</label>
            <Select value={formType} onValueChange={setFormType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="register">Register</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <Input
                type="username"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {formType === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                  <Input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="col-span-full font-semibold mt-6 mb-2">Address Info</div>

                <div
                  className={`col-span-full border rounded-xl p-4 space-y-4 ${
                    addressError ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <Input type="number" name="unit" value={formData.unit} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                    <Input name="street" value={formData.street} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                    <Input name="province" value={formData.province} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                    <Input name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                  </div>
                </div>
                {addressError && (
                  <p className="text-red-600 text-sm mt-1">
                      Please review your address details. Something seems off. If this error persists contact support for help.
                  </p>
                )}

              </>
            )}


            <div className="col-span-full">
              <Button type="submit" className="w-full h-[50px] text-lg font-semibold">
                {formType === "login" ? "Sign In" : "Register"}
              </Button>
              {formType === "login" && (
                <p className="text-sm text-gray-600 text-center mt-3">
                  Forgot your password?{" "}
                  <a href="/contact" className="text-blue-500 underline">Contact support</a>
                </p>
              )}
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-8">
            &copy;2025 Taylor Insurance. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
