import React, { useEffect, useState } from "react";
import { TbUser, TbHome, TbMenu2, TbTicket, TbReceipt } from "react-icons/tb";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { DrawerMenu } from "../components/DrawerMenu";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <header className="text-copy-primary h-20">
      <div className="flex flex-row h-full w-full p-4">
        <div className="hidden md:flex">{LargeNav()}</div>
        <div className="flex md:hidden">{MenuNav()}</div>

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

function LargeNav() {
  const { user } = useUser();
  return (
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

        {user ? (
          <li>
            <Link to="/user/purchases" className="flex flex-row p-2">
              <span className="font-medium text-sm pl-2">Purchases</span>
            </Link>
          </li>
        ) : (
          <></>
        )}

        {user?.publicMetadata?.role === "admin" ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

function MenuNav() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <button
        className="mx-2 flex items-center p-2 hover:bg-background-opp/10 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="navigation menu button"
      >
        <TbMenu2 size={25} />
        <DrawerMenu isOpen={isOpen} setIsOpen={setIsOpen} direction={"left"}>
          <div className="w-full h-full bg-black">
            <ul className="flex flex-col justify-start text-white space-y-2 p-4">
              <li>
                <Link
                  to="/"
                  className="flex flex-row items-center space-x-2 p-4 rounded-md hover:bg-white hover:text-black"
                >
                  <TbHome size={17} strokeWidth={3} />
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="flex flex-row items-center space-x-2 p-4 rounded-md hover:bg-white hover:text-black"
                >
                  <TbTicket size={17} />
                  <span className="font-medium">Events</span>
                </Link>
              </li>

              {user ? (
                <li>
                  <Link
                    to="/user/purchases"
                    className="flex flex-row items-center space-x-2 p-4 rounded-md hover:bg-white hover:text-black"
                  >
                    <TbReceipt size={17} />
                    <span className="font-medium">Purchases</span>
                  </Link>
                </li>
              ) : (
                <></>
              )}

              {user?.publicMetadata?.role === "admin" ? (
                <>
                  <li>
                    <Link
                      to="/create-event"
                      className="flex flex-col items-start p-4 rounded-md hover:bg-white hover:text-black"
                    >
                      <span className="text-xs text-white/60">Admin</span>
                      <span className="font-medium">Create Event</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-events"
                      className="flex flex-col items-start p-4 rounded-md hover:bg-white hover:text-black"
                    >
                      <span className="text-xs text-white/60">Admin</span>
                      <span className="font-medium">Manage Events</span>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </DrawerMenu>
      </button>
    </div>
  );
}
