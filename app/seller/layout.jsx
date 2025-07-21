'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React, { useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import { useUser } from '@clerk/nextjs'

const Layout = ({ children }) => {
  const { isSeller, router } = useAppContext()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    // Wait for user and context to load
    if (isLoaded && user) {
      // If user is loaded but not a seller, redirect to home
      if (!isSeller) {
        router.push('/')
      }
    }
  }, [isLoaded, user, isSeller, router])

  // Show loading or redirect if not a seller
  if (!isLoaded || !user || !isSeller) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  }

  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout