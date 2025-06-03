"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { Mail, Lock, Eye, EyeOff, Shield, Clock, Zap, Globe } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In a real app, you would validate credentials here
      // For demo purposes, let's check for a demo account
      if (email === "demo@example.com" && password === "demo123") {
        localStorage.setItem('isAuthenticated', 'true')
        navigate("/dashboard")
      } else {
        setError("Invalid email or password. Try demo@example.com / demo123")
      }
    } catch (err) {
      setError("We couldn't verify your credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left panel - branding */}
      <div className="hidden md:flex md:w-5/12 bg-[#FAFAFA] items-center justify-center p-12">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-md">
          <motion.div variants={iconVariants} className="mb-12">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-10"
            >
              <rect width="32" height="32" rx="8" fill="#F0F0F0" />
              <path
                d="M22 10H10V22H22V10Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 14V18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 16H18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <motion.h1 variants={itemVariants} className="text-[32px] leading-[1.2] font-light text-gray-900 mb-6">
              Loan Management System
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-500 text-[15px] leading-relaxed">
              Efficiently manage loans, track payments, and handle member information with our comprehensive loan management solution.
            </motion.p>
          </motion.div>

          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-[15px] text-gray-700">Secure loan processing</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-[15px] text-gray-700">Real-time tracking</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Zap className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-[15px] text-gray-700">Fast processing</span>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Globe className="h-5 w-5 text-gray-700" />
              </div>
              <span className="text-[15px] text-gray-700">Multi-branch support</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right panel - login form */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-6 md:p-20 bg-white">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-[400px]">
          <motion.div variants={iconVariants} className="md:hidden mb-10">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#F0F0F0" />
              <path
                d="M22 10H10V22H22V10Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M16 14V18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 16H18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-[22px] font-normal text-gray-900 mb-1">
            Staff Sign in
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[15px] text-gray-500 mb-10">
            Enter your credentials to access your account
          </motion.p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[14px] rounded"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="text-[14px] font-normal text-gray-700 mb-1.5 block">
                  Email
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 bg-white border-gray-200 rounded-md focus:border-gray-400 focus:ring-0 text-[15px]"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[14px] font-normal text-gray-700">
                    Password
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#"
                    className="text-[14px] font-normal text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Forgot password?
                  </motion.a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 bg-white border-gray-200 rounded-md focus:border-gray-400 focus:ring-0 text-[15px]"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    type="submit"
                    className={cn(
                      "w-full h-11 bg-custom hover:bg-indigo-600 text-white font-normal rounded-md transition-all duration-200 text-[15px]",
                      isLoading && "opacity-90 cursor-not-allowed",
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        <span>Signing in</span>
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-10 pt-6 border-t border-gray-100">
            <p className="text-[14px] text-gray-500 text-center">
              Don't have an account?{" "}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="font-normal text-gray-900 hover:text-gray-700 transition-colors"
              >
                Contact your administrator
              </motion.a>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            <p className="text-[13px] text-gray-400 text-center">
              By signing in, you agree to our{" "}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Terms
              </motion.a>{" "}
              and{" "}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Privacy Policy
              </motion.a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 