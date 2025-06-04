"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { Mail, Lock, Eye, EyeOff, Shield, Clock, Zap, Globe, MapPin, Users, X } from "lucide-react"
import backgroundImage from "../components/images/BackgroundImage.jpg"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  
  const roles = ["Staff", "Manager", "Area Manager", "Reviewer"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!role) {
      setError("Please select your role")
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // For demo purposes, let's check for a demo account
      if (username === "demo@example.com" && password === "demo123") {
        // Store user info in localStorage
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userRole', role)
        
        navigate("/dashboard")
      } else {
        setError("Invalid Username or password. Try demo@example.com / demo123")
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

  const formVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: -20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={() => !showForm && setShowForm(true)}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={formVariants}
            className="w-full max-w-[400px] bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">EasyFin</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-[14px] rounded"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="text-[14px] font-normal text-gray-700 mb-1.5 block">
                  Username
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 pl-10 bg-white border-gray-200 rounded-md focus:border-gray-400 focus:ring-0 text-[15px]"
                    placeholder="you@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="text-[14px] font-normal text-gray-700 mb-1.5 block">
                  Role
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 pl-10 w-full bg-white border-gray-200 rounded-md focus:border-gray-400 focus:ring-0 text-[15px]"
                    required
                  >
                    <option value="">Select Role</option>
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
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
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  type="submit"
                  className={cn(
                    "w-full h-11 bg-custom hover:bg-indigo-600 text-white font-normal rounded-md transition-all duration-200 text-[15px]",
                    isLoading && "opacity-90 cursor-not-allowed"
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
            </form>

            <div className="mt-6 text-center">
              <p className="text-[13px] text-gray-500">
                By signing in, you agree to our{" "}
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 