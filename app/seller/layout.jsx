'use client'
import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React, { useEffect } from 'react'
import { useAppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Layout = ({ children }) => {
  const { user, isSeller } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and has seller permissions
    if (user && !isSeller) {
      toast.error('You need seller permissions to access this area')
      router.push('/')
      return
    }
    
    // If no user is logged in, redirect to home
    if (!user) {
      toast.error('Please log in to access the seller dashboard')
      router.push('/')
      return
    }
  }, [user, isSeller, router])

  // Don't render the seller dashboard if user doesn't have permissions
  if (!user || !isSeller) {
    return null
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