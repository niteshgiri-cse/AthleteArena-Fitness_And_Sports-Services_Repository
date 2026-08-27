import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X, Sparkles, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessageAction } from "@/redux/features/chat/chatActions";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { messages, loading } = useSelector(
    (state) => state.chat
  );

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [open]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    dispatch(
      sendChatMessageAction(trimmedMessage)
    );

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-blue-500 text-white shadow-2xl shadow-violet-300/50 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Open AthleteArena AI"
      >
        {open ? (
          <X size={23} />
        ) : (
          <MessageCircle size={24} />
        )}

        {!open && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-4 z-[79] w-[calc(100%-2rem)] max-w-[390px] origin-bottom-right transition-all duration-300 sm:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.20)]">

          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 px-5 py-4 text-white">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
                <Bot size={23} />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black">
                    AthleteArena AI
                  </h3>

                  <Sparkles size={13} />
                </div>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                  <span className="text-[11px] text-white/75">
                    AI Coach
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="h-[390px] overflow-y-auto bg-slate-50/70 px-4 py-4">
            <div className="space-y-4">

              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-end gap-2 ${
                    item.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {item.type === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[78%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${
                      item.type === "user"
                        ? "rounded-br-md bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-sm"
                        : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {item.text}
                  </div>

                  {item.type === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <Bot size={14} />
                  </div>

                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">

                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400"
                        style={{
                          animationDelay: "120ms",
                        }}
                      />

                      <span
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400"
                        style={{
                          animationDelay: "240ms",
                        }}
                      />

                      <span className="ml-1 text-[11px] text-slate-400">
                        AI is thinking...
                      </span>

                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />

            </div>
          </div>

          <div className="border-t border-slate-100 bg-white p-3">

            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {[
                "Training Plan",
                "Improve Performance",
                "Find Events",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    if (!loading) {
                      dispatch(
                        sendChatMessageAction(prompt)
                      );
                    }
                  }}
                  className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">

              <textarea
                ref={inputRef}
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={loading}
                rows={1}
                placeholder="Ask AthleteArena AI..."
                className="max-h-24 min-h-[40px] flex-1 resize-none bg-transparent px-3 py-2 text-[13px] leading-5 text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={sendMessage}
                disabled={!message.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>

            </div>

            <p className="mt-2 text-center text-[9px] text-slate-400">
              AthleteArena AI can make mistakes. Verify important information.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}