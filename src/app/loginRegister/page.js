'use client'
import Cookies from 'js-cookie';
import { loginCustomer } from "@/lib/auth"
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
  const [formType, setFormType] = useState("login")
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formType === "register") { // TODO: Handle registration functionality, focusing on login now.
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!"); // TODO: update to a nicer look maybe
        return
      }

      const data = await registerCustomer({
        // Fields for when register is put in here
      })

      if (data.success) {
        console.log("register success");
      } else {
        alert(data.message || "Registration Failed");
      }

    } else {
      const data = await loginCustomer(formData.username, formData.password);

      if (data.message && data.customerId) {
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
          {/* TODO: register and log in need to be two separate forms, they have different required info and function */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
              <Input
                type="username"
                name="username"
                placeholder="User Name"
                value={formData.email}
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
