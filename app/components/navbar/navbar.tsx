"use client";
import { useAuth } from "../../context/AuthContext";
import Logo from "./logo";
import SearchBar from "./searchbar";
import UserMenu from "./usermenu";

interface NavbarProps {
  onSearchChange: (query: string) => void;
}

export  function Navbar({ onSearchChange }: NavbarProps) {
  const { user, isLoading, isLoggedIn, logout } = useAuth();

  return (
    <>
   
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          <Logo />

            <SearchBar onSearchChange={onSearchChange} />

          <UserMenu user={user} isLoading={isLoading} isLoggedIn={isLoggedIn} logout={logout} />
        </div>
      </div>
    </header>
    </>
  );
}

