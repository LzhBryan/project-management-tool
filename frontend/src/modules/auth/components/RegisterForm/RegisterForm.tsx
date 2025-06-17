import { isAxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { axios } from "@core/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "@ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form"
import { Input } from "@ui/input"

export function RegisterForm() {
  const navigate = useNavigate({ from: "/register" })
  const [errorMessage, setErrorMessage] = useState("")

  const registerFormSchema = z
    .object({
      name: z.string(),
      email: z.string().email({ message: "Please enter a valid email" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    })
    .strict()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const response = await axios.post("api/auth/register", values)
      if (response.status === 201) {
        navigate({ to: "/app/today" })
      }
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
        return
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2" aria-label="Register user">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="dark:text-red:900 text -mb-2 text-center font-medium text-red-500">{errorMessage}</p>
        )}
        <Button type="submit" className="my-4">
          Sign up
        </Button>
        <div className="flex gap-x-2">
          <span>Have an account? </span>
          <Link to="/login">Sign in here</Link>
        </div>
      </form>
    </Form>
  )
}
