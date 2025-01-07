import React, { useEffect } from "react";
import { TbUser, TbHome } from "react-icons/tb";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

function Header({ toggleTheme, theme }) {
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="text-copy-primary h-20">
      <div className="flex flex-row h-full w-full p-4">
        <div className="flex justify-center">
          <ul className="flex flex-row justify-center items-center space-x-4 mr-10">
            <li>
              <Link to="/" className="flex flex-row p-2">
                <TbHome size={17} />
                <span className="font-medium text-sm pl-2">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/randompage" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Nav2</span>
              </Link>
            </li>
            <li>
              <Link to="/randompage" className="flex flex-row p-2">
                <span className="font-medium text-sm pl-2">Nav3</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-grow justify-end">
          <div className="mx-2 hover:bg-background-opp/10 rounded flex">
            <ThemeSwitcher isToggled={theme === "light"} toggleSwitch={toggleTheme} />
          </div>
          <button className="mx-2 p-2 hover:bg-background-opp/10 rounded" aria-label="User Menu">
            <TbUser size={25} />
          </button>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
