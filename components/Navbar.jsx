"use client"
import React, { useState, useEffect } from "react";
import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

// Local CartIcon component based on assets/cart_icon.svg
const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3259_361)">
      <path d="M0.75 0.75H3.75L5.76 10.7925C5.82858 11.1378 6.01643 11.448 6.29066 11.6687C6.56489 11.8895 6.90802 12.0067 7.26 12H14.55C14.902 12.0067 15.2451 11.8895 15.5193 11.6687C15.7936 11.448 15.9814 11.1378 16.05 10.7925L17.25 4.5H4.5M7.5 15.75C7.5 16.1642 7.16421 16.5 6.75 16.5C6.33579 16.5 6 16.1642 6 15.75C6 15.3358 6.33579 15 6.75 15C7.16421 15 7.5 15.3358 7.5 15.75ZM15.75 15.75C15.75 16.1642 15.4142 16.5 15 16.5C14.5858 16.5 14.25 16.1642 14.25 15.75C14.25 15.3358 14.5858 15 15 15C15.4142 15 15.75 15.3358 15.75 15.75Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_3259_361">
        <rect width="18" height="18" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Local HomeIcon component (simple house SVG)
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.75L12 3L21 9.75V20.25C21 20.6642 20.6642 21 20.25 21H15.75C15.3358 21 15 20.6642 15 20.25V15.75C15 15.3358 14.6642 15 14.25 15H9.75C9.33579 15 9 15.3358 9 15.75V20.25C9 20.6642 8.66421 21 8.25 21H3.75C3.33579 21 3 20.6642 3 20.25V9.75Z" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Local BoxIcon component based on assets/box_icon.svg
const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3493_120)">
      <path d="M68.5 0.5H4.5C2.29086 0.5 0.5 2.29086 0.5 4.5V68.5C0.5 70.7091 2.29086 72.5 4.5 72.5H68.5C70.7091 72.5 72.5 70.7091 72.5 68.5V4.5C72.5 2.29086 70.7091 0.5 68.5 0.5Z" fill="#FF532E" fillOpacity="0.1" stroke="#FF532E" strokeOpacity="0.3"/>
      <path d="M40.8879 36.8843L39 37.9971V58L56 48.003V28L40.8879 36.8843Z" fill="#FF532E"/>
      <path d="M44 18.8198L37.1926 15L19 25.1803L25.8165 29L44 18.8198Z" fill="#FF532E"/>
      <path d="M55 25.4772L47.1636 21L29 31.5228L30.0364 32.0608L36.8364 36L43.6 32.0882L55 25.4772Z" fill="#FF532E"/>
      <path d="M27.6489 38.5887L24.4971 36.939V31.8105L18 28V48.003L35 58V37.997L27.6489 33.6844V38.5887Z" fill="#FF532E"/>
    </g>
    <defs>
      <clipPath id="clip0_3493_120">
        <rect width="73" height="73" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
        width={128}
        height={40}
        priority
        style={{ width: '7rem', height: 'auto' }}
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        { isSignedIn
          ? <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label ="Home" labelIcon={<HomeIcon />} onClick={()=> router.push('/')} />
            </UserButton.MenuItems>

            <UserButton.MenuItems>
              <UserButton.Action label ="Products" labelIcon={<BoxIcon />} onClick={()=> router.push('/all-products')} />
            </UserButton.MenuItems>

            <UserButton.MenuItems>
              <UserButton.Action label ="Cart" labelIcon={<CartIcon />} onClick={()=> router.push('/cart')} />
            </UserButton.MenuItems>

            <UserButton.MenuItems>
              <UserButton.Action label ="My Orders" labelIcon={<CartIcon />} onClick={()=> router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        { isSignedIn
          ? <UserButton />
          : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
        }
      </div>
    </nav>
  );
};

export default Navbar;