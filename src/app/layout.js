"use client";

import "./globals.css";
import AuthMenu from "@/components/auth/AuthMenu";
import ProfileMenu from "@/components/auth/ProfileMenu";
import { AuthProvider } from "@/components/auth/AuthContext";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Note: We can't use export const metadata in a client component
// This needs to be handled differently in a client component layout

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [navigation, setNavigation] = useState([
    { name: 'Home', href: '/', current: false },
    { name: 'Get a Quote', href: 'get_quote', current: false },
    { name: 'Account', href: 'account', current: false },
    { name: 'Contact', href: 'contact', current: false },
  ]);

  useEffect(() => {
    // Check user authentication status from cookies
    const loggedInStatus = Cookies.get('loggedin') === 'true';
    const userRoleValue = Cookies.get('role');
    const adminStatus = Cookies.get('isAdmin') === 'true';
    
    setIsLoggedIn(loggedInStatus);
    setUserRole(userRoleValue);
    setIsAdmin(adminStatus);
    
    // Update navigation based on user status
    let updatedNavigation = [
      { name: 'Home', href: '/', current: false },
      { name: 'Get a Quote', href: 'get_quote', current: false },
      { name: 'Account', href: 'account', current: false },
      { name: 'Contact', href: 'contact', current: false },
    ];
    
    if (loggedInStatus) {
      if (userRoleValue === 'employee') {
        updatedNavigation.push({ name: 'Employee Portal', href: 'employeePortal', current: false });
      }
      
      if (adminStatus) {
        updatedNavigation.push({ name: 'Admin Portal', href: 'adminPortal', current: false });
      }
    }
    
    setNavigation(updatedNavigation);
  }, []);

  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-blue-500 to-indigo-600">
        <AuthProvider>
          <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex shrink-0 items-center">
                    <img
                      alt="Your Company"
                      src="favicon.ico"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? 'page' : undefined}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <AuthMenu />
                  {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button> */}

                  {/* Profile dropdown */}
                  <ProfileMenu />
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium',
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        </AuthProvider>
        {children}
      </body>
    </html>
  );
}