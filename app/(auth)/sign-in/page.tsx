'use client'

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { signInWithEmail } from "@/lib/auth-actions/auth.actions"
import AuthFooter from "@/components/ui/AuthFooter"

type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log("Data", data)
      const result = await signInWithEmail(data)
      if (result.success) router.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black/80 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-xl dark:bg-slate-900/95 dark:border-slate-800/50">
        <CardHeader className="text-center space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent dark:from-yellow-400 dark:to-orange-400">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground/80 dark:text-slate-400">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl border-2 bg-background/50 dark:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-yellow-400/50 dark:focus-visible:ring-yellow-400/50 transition-all duration-200"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email"
                  }
                })}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1">
                  <span className="w-4 h-4 bg-destructive/20 rounded-full shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 rounded-xl border-2 bg-background/50 dark:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-yellow-400/50 dark:focus-visible:ring-yellow-400/50 transition-all duration-200"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1">
                  <span className="w-4 h-4 bg-destructive/20 rounded-full shrink-0" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 text-lg"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
              <AuthFooter 
                  text = "Don't have an account"
                  linkText="Sign up"
                  href = "sign-up"
              />
      </Card>
    </div>
  )
}

export default SignIn
