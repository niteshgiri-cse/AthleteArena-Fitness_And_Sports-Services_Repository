import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { useState, useEffect } from "react";

import { createPortal } from "react-dom";

import {
  Bell,
  User,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Trophy,
  X,
  Settings,
} from "lucide-react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { getProfileAction } from "@/redux/features/user/userActions";

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
    name: "News",
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
    if (!token || token === "undefined" || token === "null") {
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
  const [openProfile, setOpenProfile] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.user || {});

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      const valid = isTokenValid(token);

      if (!valid) {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");

        setIsLoggedIn(false);
        setIsAdmin(false);
        setOpenProfile(false);

        return;
      }

      const decoded = getDecodedToken(token);

      setIsLoggedIn(true);

      let roles = decoded?.roles || [];

      if (typeof roles === "string") {
        roles = roles
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((role) => role.trim());
      }

      setIsAdmin(Array.isArray(roles) && roles.includes("ADMIN"));
    };

    checkToken();

    const interval = setInterval(checkToken, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfileAction());
    }
  }, [dispatch, isLoggedIn]);

  const profileImage = userProfile?.profileImageUrl;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    setIsLoggedIn(false);
    setIsAdmin(false);
    setOpenProfile(false);

    window.location.href = "/auth";
  };

  const filteredNavigation = navigation.filter(
    (item) => !item.protected || isLoggedIn,
  );

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Disclosure
        as="nav"
        className="
          sticky
          top-0
          z-50
          w-full
          border-b
          border-slate-200/70
          bg-white/85
          backdrop-blur-2xl
        "
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
              <div className="flex h-[68px] items-center justify-between">
                {/* LEFT */}

                <div className="flex min-w-0 items-center">
                  {/* Mobile menu */}

                  <div className="mr-2 lg:hidden">
                    <DisclosureButton
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        text-slate-600
                        transition
                        hover:bg-slate-100
                        hover:text-slate-950
                        focus:outline-none
                      "
                    >
                      {open ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" />
                      )}
                    </DisclosureButton>
                  </div>

                  {/* Logo */}

                  <NavLink to="/" className="group flex shrink-0 items-center">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-indigo-600
                          to-violet-600
                          shadow-lg
                          shadow-indigo-500/20
                          transition
                          duration-300
                          group-hover:scale-105
                        "
                      >
                        <Trophy
                          size={18}
                          strokeWidth={2.3}
                          className="text-white"
                        />
                      </div>

                      <div className="leading-[0.9]">
                        <div
                          className="
                            text-[16px]
                            font-black
                            tracking-[-0.05em]
                            text-slate-950
                            sm:text-[17px]
                          "
                        >
                          ATHLETE
                        </div>

                        <div
                          className="
                            bg-gradient-to-r
                            from-indigo-600
                            to-violet-600
                            bg-clip-text
                            text-[16px]
                            font-black
                            tracking-[-0.05em]
                            text-transparent
                            sm:text-[17px]
                          "
                        >
                          ARENA
                        </div>
                      </div>
                    </div>
                  </NavLink>

                  {/* Desktop navigation */}

                  <div
                    className="
                      ml-8
                      hidden
                      items-center
                      gap-0.5
                      lg:flex
                      xl:ml-10
                    "
                  >
                    {filteredNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `
                            relative
                            rounded-xl
                            px-3
                            py-2
                            text-[13px]
                            font-semibold
                            transition-all
                            duration-200

                            ${
                              isActive
                                ? "bg-slate-100 text-slate-950"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                            }
                            `
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {item.name}

                            {isActive && (
                              <span
                                className="
                                    absolute
                                    bottom-0.5
                                    left-1/2
                                    h-0.5
                                    w-4
                                    -translate-x-1/2
                                    rounded-full
                                    bg-indigo-600
                                  "
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}

                <div
                  className="
                    ml-3
                    flex
                    shrink-0
                    items-center
                    gap-2
                  "
                >
                  {/* Notification */}

                  {isLoggedIn && (
                    <button
                      type="button"
                      aria-label="Notifications"
                      className="
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        text-slate-500
                        transition
                        hover:border-slate-300
                        hover:bg-slate-50
                        hover:text-slate-950
                      "
                    >
                      <Bell size={18} strokeWidth={1.8} />

                      <span
                        className="
                          absolute
                          right-2
                          top-2
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-indigo-600
                          ring-2
                          ring-white
                        "
                      />
                    </button>
                  )}

                  {/* Login */}

                  {!isLoggedIn && (
                    <NavLink
                      to="/auth"
                      className="
                        group
                        inline-flex
                        h-10
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-950
                        px-4
                        text-[13px]
                        font-bold
                        text-white
                        shadow-sm
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:bg-indigo-600
                        hover:shadow-lg
                        hover:shadow-indigo-500/20
                        sm:px-5
                      "
                    >
                      Login
                      <span
                        className="
                          text-slate-400
                          transition
                          group-hover:translate-x-0.5
                          group-hover:text-white
                        "
                      >
                        →
                      </span>
                    </NavLink>
                  )}

                  {/* Profile button */}

                  {isLoggedIn && (
                    <button
                      type="button"
                      onClick={() => setOpenProfile(true)}
                      className="
                        group
                        flex
                        h-10
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-1
                        pr-2
                        transition
                        hover:border-indigo-200
                        hover:bg-indigo-50/40
                      "
                    >
                      <div
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-lg
                          bg-gradient-to-br
                          from-indigo-100
                          to-violet-100
                        "
                      >
                        {profileImage ? (
                          <img
                            src={profileImage}
                            className="h-full w-full object-cover"
                            alt="profile"
                          />
                        ) : (
                          <User size={16} className="text-indigo-600" />
                        )}
                      </div>

                      <span
                        className="
                          hidden
                          text-[13px]
                          font-semibold
                          text-slate-700
                          sm:block
                        "
                      >
                        Profile
                      </span>

                      <ChevronDown
                        size={15}
                        className="
                          hidden
                          text-slate-400
                          transition
                          group-hover:text-indigo-600
                          sm:block
                        "
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                MOBILE NAVIGATION
            ================================================= */}

            <DisclosurePanel
              className="
                border-t
                border-slate-200/70
                bg-white/95
                px-4
                pb-4
                pt-3
                shadow-lg
                backdrop-blur-xl
                lg:hidden
              "
            >
              <div className="space-y-1">
                {filteredNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `
                        flex
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        transition

                        ${
                          isActive
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }
                        `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.name}</span>

                        {isActive && (
                          <span
                            className="
                                h-2
                                w-2
                                rounded-full
                                bg-indigo-600
                              "
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {!isLoggedIn && (
                <NavLink
                  to="/auth"
                  className="
                    mt-3
                    flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-950
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-indigo-600
                  "
                >
                  Get Started →
                </NavLink>
              )}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* =====================================================
          PROFILE OVERLAY + DRAWER
      ===================================================== */}

      {isLoggedIn &&
        openProfile &&
        createPortal(
          <div className="fixed inset-0 z-[100]">
            {/* BACKDROP */}

            <div
              onClick={() => setOpenProfile(false)}
              className="
                absolute
                inset-0
                bg-slate-950/40
                backdrop-blur-sm
              "
            />

            {/* =================================================
                DESKTOP DRAWER
            ================================================= */}

            <aside
              className="
                absolute
                right-0
                top-0
                hidden
                h-full
                w-[390px]
                max-w-[92vw]
                overflow-y-auto
                border-l
                border-slate-200
                bg-white
                shadow-2xl
                lg:block
              "
            >
              {/* Drawer top gradient */}

              <div
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-slate-950
                  via-slate-900
                  to-indigo-950
                  px-6
                  pb-8
                  pt-6
                "
              >
                {/* Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    bg-indigo-500/20
                    blur-3xl
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-48
                    w-48
                    rounded-full
                    bg-violet-500/20
                    blur-3xl
                  "
                />

                {/* Header */}

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                      Athlete Arena
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-white">
                      My Account
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenProfile(false)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/10
                      text-slate-300
                      transition
                      hover:bg-white/20
                      hover:text-white
                    "
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Profile */}

                <div className="relative mt-7 flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border-2
                      border-white/20
                      bg-gradient-to-br
                      from-indigo-100
                      to-violet-100
                      shadow-xl
                    "
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        className="h-full w-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <User size={28} className="text-indigo-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-lg font-bold text-white">
                        Athlete
                      </h3>

                      {isAdmin && (
                        <span
                          className="
                            rounded-full
                            bg-indigo-400/15
                            px-2.5
                            py-1
                            text-[9px]
                            font-black
                            tracking-wider
                            text-indigo-300
                          "
                        >
                          ADMIN
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      Your Athlete Arena account
                    </p>
                  </div>
                </div>
              </div>

              {/* Drawer body */}

              <div className="p-5">
                <p
                  className="
                    mb-3
                    px-1
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-slate-400
                  "
                >
                  Account
                </p>

                {/* Profile button */}

                <NavLink
                  to="/userProfile"
                  onClick={() => setOpenProfile(false)}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-100
                    bg-slate-50
                    p-4
                    transition
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-indigo-100
                    hover:bg-indigo-50/50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-slate-500
                      shadow-sm
                      ring-1
                      ring-slate-100
                      transition
                      group-hover:bg-indigo-600
                      group-hover:text-white
                    "
                  >
                    <User size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">
                      My Profile
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      View and manage your profile
                    </p>
                  </div>

                  <ChevronDown
                    size={17}
                    className="
                      -rotate-90
                      text-slate-300
                      transition
                      group-hover:translate-x-0.5
                      group-hover:text-indigo-500
                    "
                  />
                </NavLink>

                {/* Admin button */}

                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setOpenProfile(false)}
                    className="
                      group
                      mt-3
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-indigo-100
                      bg-indigo-50/60
                      p-4
                      transition
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-indigo-100
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-600
                        text-white
                        shadow-lg
                        shadow-indigo-500/20
                      "
                    >
                      <LayoutDashboard size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-indigo-900">
                        Admin Dashboard
                      </p>

                      <p className="mt-0.5 text-xs text-indigo-600/70">
                        Manage Athlete Arena
                      </p>
                    </div>

                    <ChevronDown
                      size={17}
                      className="
                        -rotate-90
                        text-indigo-300
                        transition
                        group-hover:translate-x-0.5
                      "
                    />
                  </NavLink>
                )}

                {/* Settings placeholder */}

                <button
                  type="button"
                  className="
                    group
                    mt-3
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-slate-100
                    bg-white
                    p-4
                    text-left
                    transition
                    duration-200
                    hover:border-slate-200
                    hover:bg-slate-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-500
                    "
                  >
                    <Settings size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-800">Settings</p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Account preferences
                    </p>
                  </div>

                  <ChevronDown
                    size={17}
                    className="
                      -rotate-90
                      text-slate-300
                    "
                  />
                </button>

                {/* Divider */}

                <div className="my-6 h-px bg-slate-100" />

                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-red-100
                    bg-red-50/50
                    p-4
                    text-left
                    transition
                    duration-200
                    hover:border-red-200
                    hover:bg-red-50
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-red-500
                      shadow-sm
                    "
                  >
                    <LogOut size={19} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-red-600">Logout</p>

                    <p className="mt-0.5 text-xs text-red-400">
                      Sign out from your account
                    </p>
                  </div>
                </button>
              </div>
            </aside>

            {/* =================================================
                MOBILE BOTTOM SHEET
            ================================================= */}

            <div
              className="
                absolute
                bottom-0
                left-0
                w-full
                overflow-hidden
                rounded-t-[28px]
                border-t
                border-slate-200
                bg-white
                shadow-2xl
                lg:hidden
              "
            >
              {/* Drag indicator */}

              <div className="flex justify-center pt-3">
                <div className="h-1 w-10 rounded-full bg-slate-200" />
              </div>

              {/* Mobile header */}

              <div className="flex items-center justify-between px-5 pb-4 pt-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600">
                    Athlete Arena
                  </p>

                  <h2 className="mt-1 text-lg font-black text-slate-950">
                    My Account
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenProfile(false)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-500
                    transition
                    hover:bg-slate-200
                    hover:text-slate-950
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Mobile profile card */}

              <div className="mx-5 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-100
                      to-violet-100
                      ring-1
                      ring-indigo-100
                    "
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        className="h-full w-full object-cover"
                        alt="profile"
                      />
                    ) : (
                      <User size={24} className="text-indigo-600" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-bold text-slate-900">
                        Athlete
                      </p>

                      {isAdmin && (
                        <span
                          className="
                            rounded-full
                            bg-indigo-100
                            px-2
                            py-0.5
                            text-[8px]
                            font-black
                            tracking-wider
                            text-indigo-600
                          "
                        >
                          ADMIN
                        </span>
                      )}
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      Athlete Arena account
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile actions */}

              <div className="grid grid-cols-2 gap-3 p-5">
                <NavLink
                  to="/userProfile"
                  onClick={() => setOpenProfile(false)}
                  className="
                    flex
                    min-h-[82px]
                    flex-col
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    transition
                    hover:border-indigo-200
                    hover:bg-indigo-50
                  "
                >
                  <User size={19} className="text-indigo-600" />

                  <div>
                    <p className="text-sm font-bold text-slate-800">Profile</p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Manage profile
                    </p>
                  </div>
                </NavLink>

                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setOpenProfile(false)}
                    className="
                      flex
                      min-h-[82px]
                      flex-col
                      justify-between
                      rounded-2xl
                      border
                      border-indigo-100
                      bg-indigo-50
                      p-4
                      transition
                      hover:bg-indigo-100
                    "
                  >
                    <LayoutDashboard size={19} className="text-indigo-600" />

                    <div>
                      <p className="text-sm font-bold text-indigo-900">
                        Dashboard
                      </p>

                      <p className="mt-0.5 text-[10px] text-indigo-500">
                        Admin panel
                      </p>
                    </div>
                  </NavLink>
                )}
              </div>

              {/* Mobile logout */}

              <div className="px-5 pb-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    text-sm
                    font-bold
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
