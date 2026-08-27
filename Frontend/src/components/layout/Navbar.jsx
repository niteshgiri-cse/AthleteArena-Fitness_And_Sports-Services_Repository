import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { BellIcon, User } from "lucide-react";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  getProfileAction,
} from "@/redux/features/user/userActions";


const navigation = [
  {
    name: "Home",
    href: "/",
    protected: false,
  },
  {
    name: "Category",
    href: "/sport-category",
    protected: true,
  },
  {
    name: "Community",
    href: "/community",
    protected: true,
  },
  {
    name: "Recent News",
    href: "/recent-new",
    protected: true,
  },
  {
    name: "Events",
    href: "/live-events",
    protected: true,
  },
  {
    name: "Services",
    href: "/services",
    protected: true,
  },
  {
    name: "Live",
    href: "/live-learning",
    protected: true,
  },
];


const getDecodedToken = (token) => {
  try {
    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
};


const isTokenValid = (token) => {
  const decoded = getDecodedToken(token);

  if (!decoded) {
    return false;
  }

  if (!decoded.exp) {
    return false;
  }

  return decoded.exp * 1000 > Date.now();
};


export default function Navbar() {

  const [openProfile, setOpenProfile] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [isAdmin, setIsAdmin] =
    useState(false);

  const dispatch = useDispatch();

  const { userProfile } = useSelector(
    (state) => state.user || {}
  );


  useEffect(() => {

    const checkToken = () => {

      const token =
        localStorage.getItem("token");

      const valid =
        isTokenValid(token);


      if (!valid) {

        localStorage.removeItem("token");
        localStorage.removeItem("roles");

        setIsLoggedIn(false);
        setIsAdmin(false);
        setOpenProfile(false);

        return;
      }


      const decoded =
        getDecodedToken(token);


      setIsLoggedIn(true);


      let roles =
        decoded?.roles || [];


      if (typeof roles === "string") {

        roles = roles
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((role) => role.trim());

      }


      setIsAdmin(
        Array.isArray(roles) &&
        roles.includes("ADMIN")
      );

    };


    checkToken();


    const interval =
      setInterval(checkToken, 30000);


    return () =>
      clearInterval(interval);

  }, []);


  useEffect(() => {

    if (isLoggedIn) {
      dispatch(getProfileAction());
    }

  }, [dispatch, isLoggedIn]);


  const profileImage =
    userProfile?.profileImageUrl;


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setOpenProfile(false);

    window.location.href = "/auth";

  };


  return (
    <>

      <Disclosure
        as="nav"
        className="sticky top-0 z-40 backdrop-blur-xl bg-white/80"
      >

        {({ open }) => (

          <>

            <div className="mx-auto max-w-7xl px-4">

              <div className="flex h-16 justify-between items-center">


                <div className="flex items-center">


                  <div className="sm:hidden mr-2">

                    <DisclosureButton
                      className="p-2 rounded-lg hover:bg-slate-100"
                    >

                      {open ? (
                        <XMarkIcon
                          className="h-6 w-6"
                        />
                      ) : (
                        <Bars3Icon
                          className="h-6 w-6"
                        />
                      )}

                    </DisclosureButton>

                  </div>


                  <NavLink
                    to="/"
                    className="text-xl sm:text-2xl font-bold text-[#010F31]"
                  >
                    ATHLETE
                    <span className="bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                      ARENA
                    </span>
                  </NavLink>


                  <div className="hidden sm:flex sm:ml-10 space-x-2">

                    {navigation
                      .filter(
                        (item) =>
                          !item.protected ||
                          isLoggedIn
                      )
                      .map((item) => (

                        <NavLink
                          key={item.name}
                          to={item.href}
                          className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                        >
                          {item.name}
                        </NavLink>

                      ))}

                  </div>

                </div>


                <div className="flex items-center space-x-3">


                  {isLoggedIn && (

                    <div className="relative p-2 rounded-full hover:bg-slate-100 cursor-pointer">

                      <BellIcon
                        className="h-6 w-6 text-slate-600"
                      />

                      <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />

                    </div>

                  )}


                  {!isLoggedIn && (

                    <NavLink
                      to="/auth"
                      className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-slate-800 transition"
                    >
                      Login
                    </NavLink>

                  )}


                  {isLoggedIn && (

                    <div
                      onClick={() =>
                        setOpenProfile(true)
                      }
                      className="flex items-center gap-2 rounded-full p-1 pr-3 cursor-pointer hover:bg-slate-100 transition"
                    >

                      <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">

                        {profileImage ? (

                          <img
                            src={profileImage}
                            className="h-full w-full object-cover"
                            alt="profile"
                          />

                        ) : (

                          <User
                            className="h-5 w-5 text-slate-600"
                          />

                        )}

                      </div>


                      <span className="hidden sm:block text-sm font-medium">
                        My Profile
                      </span>

                    </div>

                  )}

                </div>

              </div>

            </div>


            <DisclosurePanel className="sm:hidden px-4 pb-4 space-y-2 bg-white shadow-md">

              {navigation
                .filter(
                  (item) =>
                    !item.protected ||
                    isLoggedIn
                )
                .map((item) => (

                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {item.name}
                  </NavLink>

                ))}

            </DisclosurePanel>

          </>

        )}

      </Disclosure>


      {isLoggedIn &&
        openProfile &&
        createPortal(

          <>

            <div
              onClick={() =>
                setOpenProfile(false)
              }
              className="fixed inset-0 bg-black/40 z-40"
            />


            <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-xl">


              <div className="flex items-center gap-3 p-5 border-b">


                <div className="h-11 w-11 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">

                  {profileImage ? (

                    <img
                      src={profileImage}
                      className="h-full w-full object-cover"
                      alt="profile"
                    />

                  ) : (

                    <User
                      className="h-6 w-6 text-slate-600"
                    />

                  )}

                </div>


                <div className="flex-1">

                  <p className="font-semibold text-slate-800 flex items-center gap-2">

                    Account

                    {isAdmin && (

                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                        ADMIN
                      </span>

                    )}

                  </p>

                </div>


                <button
                  onClick={() =>
                    setOpenProfile(false)
                  }
                  className="text-lg"
                >
                  ✕
                </button>

              </div>


              <div className="p-4 space-y-2">


                <NavLink
                  to="/userProfile"
                  onClick={() =>
                    setOpenProfile(false)
                  }
                  className="block p-3 hover:bg-slate-100 rounded"
                >
                  Profile
                </NavLink>


                {isAdmin && (

                  <NavLink
                    to="/admin"
                    onClick={() =>
                      setOpenProfile(false)
                    }
                    className="block p-3 text-indigo-600 hover:bg-indigo-50 rounded"
                  >
                    Admin Dashboard
                  </NavLink>

                )}


                <button
                  onClick={handleLogout}
                  className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded"
                >
                  Logout
                </button>

              </div>

            </div>

          </>,

          document.body

        )}

    </>
  );
}