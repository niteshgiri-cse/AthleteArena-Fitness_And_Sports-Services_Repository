import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { sendChatMessageAction } from "@/redux/features/chat/chatActions";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Menu,
  Play,
  Trophy,
  Users,
  Video,
  X,
  BookOpen,
  Search,
  Bell,
  MessageCircle,
  Send,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import athleteImg from "../../assets/landingPage.png";

const slides = [
  {
    eyebrow: "ALL-IN-ONE PLATFORM FOR ATHLETES",
    title: "Train. Compete.",
    highlight: "Grow. Succeed.",
    description:
      "Everything athletes need to train smarter, connect with experts, discover opportunities, and become their best.",
  },
  {
    eyebrow: "BUILT FOR EVERY ATHLETE",
    title: "Your Game.",
    highlight: "Your Journey.",
    description:
      "Access structured training, live coaching, sports events, learning resources, and a community built around your goals.",
  },
  {
    eyebrow: "TURN POTENTIAL INTO PERFORMANCE",
    title: "Prepare. Perform.",
    highlight: "Achieve More.",
    description:
      "Build your skills, track your progress, compete in events, and take your athletic journey to the next level.",
  },
];

const stats = [
  {
    value: "50K+",
    label: "Active Athletes",
    icon: Users,
    iconClass: "bg-violet-100 text-violet-600",
  },
  {
    value: "200+",
    label: "Courses",
    icon: BookOpen,
    iconClass: "bg-emerald-100 text-emerald-600",
  },
  {
    value: "500+",
    label: "Events",
    icon: Trophy,
    iconClass: "bg-orange-100 text-orange-600",
  },
  {
    value: "100+",
    label: "Expert Coaches",
    icon: Target,
    iconClass: "bg-blue-100 text-blue-600",
  },
];

const features = [
  {
    title: "Training Programs",
    description:
      "Personalized training programs designed for athletes at every level.",
    icon: Dumbbell,
    iconClass: "bg-violet-100 text-violet-600",
    href: "/training-guides",
  },
  {
    title: "Live Coaching",
    description:
      "Learn directly from experienced coaches through interactive sessions.",
    icon: Video,
    iconClass: "bg-rose-100 text-rose-600",
    href: "/live-learning",
  },
  {
    title: "Courses & Learning",
    description:
      "Explore structured courses and improve your knowledge across sports.",
    icon: BookOpen,
    iconClass: "bg-blue-100 text-blue-600",
    href: "/live-learning",
  },
  {
    title: "Events & Tournaments",
    description:
      "Discover competitions and participate in exciting sporting events.",
    icon: CalendarDays,
    iconClass: "bg-emerald-100 text-emerald-600",
    href: "/live-events",
  },
  {
    title: "Athlete Community",
    description:
      "Connect, share experiences, and grow with athletes worldwide.",
    icon: Users,
    iconClass: "bg-orange-100 text-orange-600",
    href: "/community",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Professional Runner",
    quote:
      "AthleteArena helped me connect with coaches and improve my training. The platform feels built for athletes.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    role: "Football Player",
    quote:
      "The training programs and live events are excellent. I found opportunities I never knew existed.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Yoga Instructor",
    quote:
      "A great community of athletes supporting each other. The learning experience is simple and powerful.",
    rating: 5,
  },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const parts = token.split(".");

        if (parts.length !== 3) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          return;
        }

        const decoded = JSON.parse(atob(parts[1]));

        if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("roles");
          setIsLoggedIn(false);
          return;
        }

        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/sport-category");
    } else {
      navigate("/auth");
    }
  };

  const handleExploreEvents = () => {
    if (isLoggedIn) {
      navigate("/live-events");
    } else {
      navigate("/auth");
    }
  };

  const handleChatSend = () => {
    const value = chatInput.trim();
    if (!value || loading) return;
    setChatInput("");
    dispatch(sendChatMessageAction(value));
  };

  const handleQuickPrompt = (prompt) => {
    if (loading) return;
    setChatInput("");
    dispatch(sendChatMessageAction(prompt));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            <NavLink
              to="/"
              className="group flex shrink-0 items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 shadow-lg shadow-violet-200 transition-transform group-hover:scale-105">
                <span className="text-xl font-black text-white">A</span>
              </div>

              <div className="text-xl font-extrabold tracking-tight text-slate-950">
                ATHLETE
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  ARENA
                </span>
              </div>
            </NavLink>

            <nav className="hidden items-center gap-1 lg:flex">
              <NavLink
                to="/"
                className="rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-600"
              >
                Home
              </NavLink>

              {[
                ["Category", "/sport-category"],
                ["Community", "/community"],
                ["Events", "/live-events"],
                ["Services", "/services"],
                ["Live Learning", "/live-learning"],
                ["News", "/recent-new"],
              ].map(([name, href]) => (
                <NavLink
                  key={name}
                  to={href}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-950"
                >
                  {name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:flex"
                aria-label="Search"
              >
                <Search size={19} />
              </button>

              {isLoggedIn && (
                <button
                  className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 sm:flex"
                  aria-label="Notifications"
                >
                  <Bell size={19} />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-600" />
                </button>
              )}

              {!isLoggedIn ? (
                <button
                  onClick={() => navigate("/auth")}
                  className="hidden items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition-all hover:bg-violet-600 hover:shadow-violet-200 sm:flex"
                >
                  Login
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => navigate("/userProfile")}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-violet-200 hover:bg-violet-50 sm:flex"
                >
                  Profile
                  <ArrowUpRight size={16} />
                </button>
              )}

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              mobileMenu
                ? "max-h-[600px] pb-5 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-2">
              {[
                ["Home", "/"],
                ["Category", "/sport-category"],
                ["Community", "/community"],
                ["Events", "/live-events"],
                ["Services", "/services"],
                ["Live Learning", "/live-learning"],
                ["News", "/recent-new"],
              ].map(([name, href]) => (
                <NavLink
                  key={name}
                  to={href}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-violet-600"
                >
                  {name}
                  <ChevronRight size={16} />
                </NavLink>
              ))}

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    navigate("/auth");
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
                >
                  Login
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenu(false);
                    navigate("/userProfile");
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white"
                >
                  My Profile
                  <ArrowUpRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl" />
          <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid min-h-[650px] items-center gap-10 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
              <div className="relative z-10">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-bold tracking-wide text-violet-600">
                  <Sparkles size={14} />
                  {slides[current].eyebrow}
                </div>

                <h1 className="max-w-2xl text-5xl font-black leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[70px]">
                  {slides[current].title}
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 bg-clip-text text-transparent">
                    {slides[current].highlight}
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                  {slides[current].description}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    onClick={handleGetStarted}
                    className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-200 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-200"
                  >
                    Get Started
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition group-hover:translate-x-1">
                      <ArrowRight size={15} />
                    </span>
                  </button>

                  <button
                    onClick={handleExploreEvents}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all hover:border-violet-200 hover:bg-violet-50"
                  >
                    Explore Events
                    <CalendarDays size={17} />
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["S", "M", "E", "A"].map((letter, index) => (
                      <div
                        key={index}
                        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-blue-500 text-xs font-bold text-white"
                      >
                        {letter}
                      </div>
                    ))}

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-950 text-xs font-bold text-white">
                      +
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      ★★★★★
                    </div>

                    <p className="text-xs text-slate-500">
                      Trusted by athletes worldwide
                    </p>
                  </div>
                </div>

                <div className="mt-9 flex items-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        current === index
                          ? "w-10 bg-violet-600"
                          : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex min-h-[430px] items-center justify-center lg:min-h-[570px]">
                <div className="absolute h-[400px] w-[400px] rounded-full bg-gradient-to-br from-violet-100 via-white to-blue-100 blur-2xl sm:h-[500px] sm:w-[500px]" />

                <div className="absolute right-5 top-10 h-20 w-20 rounded-full border border-violet-100 bg-violet-50/70" />

                <div className="absolute bottom-16 left-5 h-16 w-16 rounded-full border border-blue-100 bg-blue-50/70" />

                <div className="relative z-10 w-full max-w-[620px]">
                  <img
                    src={athleteImg}
                    alt="Athlete Arena"
                    className="h-auto w-full object-contain drop-shadow-[0_30px_50px_rgba(76,29,149,0.16)]"
                  />

                  <div className="absolute left-0 top-16 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:left-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                        <Zap size={17} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-slate-400">
                          Live Events
                        </p>
                        <p className="text-lg font-black text-slate-900">
                          24 / 7
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute right-0 top-12 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-xl shadow-slate-200/70 backdrop-blur-md sm:right-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-[10px] font-medium text-slate-400">
                          Active Athletes
                        </p>
                        <p className="text-lg font-black text-slate-900">
                          50K+
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Users size={17} />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-white bg-white/95 px-5 py-3 shadow-xl shadow-slate-200/70 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Dumbbell size={18} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium text-slate-400">
                          Training Programs
                        </p>
                        <p className="text-lg font-black text-slate-900">
                          120+
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 px-5 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`flex items-center gap-4 px-6 py-6 ${
                      index !== 0
                        ? "border-t border-slate-100 sm:border-l sm:border-t-0"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.iconClass}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div>
                      <p className="text-xl font-black text-slate-950">
                        {stat.value}
                      </p>

                      <p className="text-xs font-medium text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-violet-600">
                Everything you need
              </p>

              <h2 className="max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                One platform.
                <span className="text-violet-600">
                  {" "}
                  Every athletic goal.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              From structured training to live coaching and competitions,
              AthleteArena brings your complete athletic journey together.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <NavLink
                  key={feature.title}
                  to={feature.href}
                  className="group relative min-h-[225px] rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-100/40"
                >
                  <div
                    className={`mb-8 flex h-11 w-11 items-center justify-center rounded-2xl ${feature.iconClass}`}
                  >
                    <Icon size={19} />
                  </div>

                  <h3 className="mb-3 text-base font-bold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all group-hover:border-violet-200 group-hover:bg-violet-600 group-hover:text-white">
                    <ArrowUpRight size={15} />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-50/70">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-violet-600">
                  Our Platform
                </p>

                <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                  Why choose
                  <br />
                  <span className="text-violet-600">AthleteArena?</span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-slate-500">
                  We bring everything an athlete needs into one connected
                  experience — training, learning, opportunities, community,
                  and growth.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "World-class training resources",
                    "Connect with athletes worldwide",
                    "Discover events and opportunities",
                    "Track your progress and goals",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2
                        size={19}
                        className="shrink-0 text-violet-600"
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleGetStarted}
                  className="mt-9 flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-bold text-violet-600 transition hover:bg-violet-600 hover:text-white"
                >
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="group overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative h-72 overflow-hidden bg-slate-900">
                    <img
                      src={athleteImg}
                      alt="Live Events"
                      className="h-full w-full object-cover object-center opacity-80 transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-violet-600 shadow-xl transition group-hover:scale-110">
                        <Play size={19} fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-950">Live Events</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Watch and participate in exciting sporting events.
                    </p>
                  </div>
                </div>

                <div className="group overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-violet-100 to-blue-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-2xl">
                        <Dumbbell size={52} className="text-violet-600" />

                        <div className="absolute -right-3 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg">
                          <Zap size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-950">
                      Expert Coaching
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Learn from experienced coaches and athletes.
                    </p>
                  </div>
                </div>

                <div className="group overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative h-72 overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-700 to-blue-700 opacity-90" />

                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl" />

                    <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-400/20 blur-xl" />

                    <div className="relative flex h-full flex-col items-center justify-center text-white">
                      <Trophy size={54} />

                      <p className="mt-4 text-2xl font-black">500+</p>

                      <p className="text-sm text-white/70">
                        Events & Opportunities
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-slate-950">
                      Achieve Your Goals
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Turn your potential into measurable progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-violet-600">
              Community
            </p>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Trusted by athletes
              <span className="text-violet-600"> worldwide</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
              Real athletes. Real journeys. Real progress.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-sm text-orange-400">
                    {"★".repeat(testimonial.rating)}
                  </div>

                  <span className="text-xs font-medium text-slate-300">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600">
                  “{testimonial.quote}”
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {testimonial.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-10 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 px-7 py-14 text-white shadow-2xl shadow-violet-200 sm:px-12 lg:px-16">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold">
                  <Sparkles size={13} />
                  YOUR NEXT LEVEL STARTS HERE
                </div>

                <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
                  Ready to start your athletic journey?
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                  Join thousands of athletes who are training, competing,
                  learning, and growing together.
                </p>
              </div>

              <button
                onClick={handleGetStarted}
                className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-xl transition hover:-translate-y-0.5"
              >
                {isLoggedIn
                  ? "Explore AthleteArena"
                  : "Join AthleteArena"}

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-600 transition group-hover:translate-x-1">
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
        {chatOpen && (
          <div className="mb-3 flex h-[min(620px,calc(100vh-110px))] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20">
            <div className="shrink-0 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                    <Sparkles size={19} />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">AI Coach</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Ask. Learn. Perform better.</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white"
                  aria-label="Close AI Coach"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 px-4 py-5">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                        <Sparkles size={13} />
                      </div>
                    )}

                    <div className={`max-w-[82%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 text-[13px] leading-5 shadow-sm ${
                          message.role === "user"
                            ? "rounded-br-md bg-violet-600 text-white"
                            : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-end gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <Sparkles size={13} />
                    </div>
                    <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                        <span className="ml-1 text-[11px] text-slate-400">AI Coach is thinking</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-3.5">
              {error && (
                <div className="mb-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-[11px] leading-4 text-red-600">
                  {error}
                </div>
              )}

              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {["Training Plan", "Improve Performance", "Find Events"].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={loading}
                    className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSend();
                    }
                  }}
                  placeholder="Ask your AI Coach..."
                  rows={1}
                  className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-2.5 py-2 text-[13px] leading-5 text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  onClick={handleChatSend}
                  disabled={!chatInput.trim() || loading}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>

              <p className="mt-2 text-center text-[9px] text-slate-400">
                AI Coach can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen((prev) => !prev)}
          className="group relative ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-xl shadow-violet-300/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-300/50 sm:h-15 sm:w-15"
          aria-label="Open AI Coach"
        >
          {chatOpen ? <X size={21} /> : <MessageCircle size={21} />}
          {!chatOpen && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
        </button>
      </div>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <NavLink
            to="/"
            className="text-lg font-black text-slate-950"
          >
            ATHLETE
            <span className="text-violet-600">ARENA</span>
          </NavLink>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AthleteArena. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs font-medium text-slate-500">
            <span className="cursor-pointer hover:text-violet-600">
              Privacy
            </span>

            <span className="cursor-pointer hover:text-violet-600">
              Terms
            </span>

            <span className="cursor-pointer hover:text-violet-600">
              Contact
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}