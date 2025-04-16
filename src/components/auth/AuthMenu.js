'use client'

import { useAuth } from './AuthContext'

export default function AuthMenu() {
  const { isLoggedIn, username } = useAuth();

  if(isLoggedIn) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <a
        href="/loginRegister"
        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
      >
        Login / Register
      </a>
    )
  }
}

