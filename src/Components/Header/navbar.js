"use client"
import React, { useState } from 'react';
import { Search, Menu, X, Bell, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <nav style={{backgroundColor:"#ffe6ff"}} className="bg-white border-b border-gray-300 fixed w-full top-0 z-50">
      <div className="max-w-[1264px] mx-auto h-[50px]">
        <div className="flex h-full items-center px-4">
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-md"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="hidden md:block font-bold text-xl ml-0 md:ml-2">
                LowScore.Club
              </span>
              <span className="md:hidden font-bold text-xl">
                {/* LSC */}
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center ml-4 space-x-1">
            {/* <button className="px-3 py-2 hover:bg-gray-100 rounded-md text-sm">Products</button>
            <a href="/questions" className="px-3 py-2 hover:bg-gray-100 rounded-md text-sm">Questions</a>
            <a href="/tags" className="px-3 py-2 hover:bg-gray-100 rounded-md text-sm">Tags</a>
            <a href="/users" className="px-3 py-2 hover:bg-gray-100 rounded-md text-sm">Users</a> */}
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`w-full pl-8 pr-4 py-1.5 border rounded-md 
                  ${searchFocused 
                    ? 'border-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
                    : 'border-gray-300'
                  }
                  focus:outline-none`}
              />
              <Search className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Side Icons/Buttons */}
          <div className="flex items-center space-x-2">
            {/* Notification Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-md relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </button>

            {/* Messages Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MessageSquare size={20} />
            </button>

            {/* Login/Signup Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <a href="/login" className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                Log in
              </a>
              <a href="/signup" className="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/questions" className="block px-3 py-2 text-base hover:bg-gray-100 rounded-md">Questions</a>
            <a href="/tags" className="block px-3 py-2 text-base hover:bg-gray-100 rounded-md">Tags</a>
            <a href="/users" className="block px-3 py-2 text-base hover:bg-gray-100 rounded-md">Users</a>
            <a href="/login" className="block px-3 py-2 text-base text-blue-600 hover:bg-gray-100 rounded-md">Log in</a>
            <a href="/signup" className="block px-3 py-2 text-base text-blue-600 hover:bg-gray-100 rounded-md">Sign up</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;