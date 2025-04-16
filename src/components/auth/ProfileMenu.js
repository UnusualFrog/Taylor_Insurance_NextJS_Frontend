'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';

export default function ProfileMenu() {
  const { isLoggedIn, username } = useAuth();

  const handleLogout = () => {
    Cookies.remove('loggedin');
    Cookies.remove('username');
    Cookies.remove('role');
    Cookies.remove('customerId');
    Cookies.remove('employeeId');
    Cookies.remove('isAdmin');
    window.location.href = '/'; 
  };

  if (!isLoggedIn) return null;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          {username}
          <ChevronDownIcon className="ml-1 h-5 w-5 text-white" />
        </MenuButton>
      </div>
      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        
        <MenuItem>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`w-full text-left block px-4 py-2 text-sm ${
                active ? 'bg-gray-100' : 'text-gray-700'
              }`}
            >
              Sign out
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
