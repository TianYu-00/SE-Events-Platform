import React, { useEffect } from "react";
import { TbUser, TbHome } from "react-icons/tb";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function Header({ toggleTheme, theme }) {
  const { user } = useUser();

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <header className="text-copy-primary h-20">
      <div className="flex flex-row h-full w-full p-4">
        <div className="flex justify-center">
          <ul className="flex flex-row justify-center items-center space-x-4">
            <li>
              <Link to="/" className="flex flex-row p-2">
                <TbHome size={17} />
                <span className="font-medium text-sm pl-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/events" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Events</span>
              </Link>
            </li>
            <li>
              <Link to="/playground" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Playground</span>
              </Link>
            </li>
            <li>
              <Link to="/create-event" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Create Event</span>
              </Link>
            </li>
            <li>
              <Link to="/manage-events" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Manage Events</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-grow justify-end">
          <div className="mx-2 hover:bg-background-opp/10 rounded flex">
            <ThemeSwitcher isToggled={theme === "light"} toggleSwitch={toggleTheme} />
          </div>

          <SignedOut>
            <SignInButton>
              <button className="mx-2 flex items-center p-2 hover:bg-background-opp/10 rounded cursor-pointer">
                <TbUser size={25} />
                <span className="pl-2">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="mx-2 flex items-center p-2 rounded">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
