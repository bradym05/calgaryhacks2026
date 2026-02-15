import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { addResponseToQuestion } from "@/services/addNewAnswer";
import { fetchAnswers } from "@/services/getAnswers";
import { useAuth } from "@/services/AuthContext";

type AnswerDisplayProps = {
  questionId: string;
};

type AnswerItem = {
  raw: string; // decodedResponse:date
  text: string;
  date: string; // ISO or string
  time: string; // human time
};

function formatDateKey(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch (e) {
    return dateStr;
  }
}

export default function AnswerDisplay({ questionId }: AnswerDisplayProps) {
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});

  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchAnswers(questionId, user?.uid || "default").then(({ success, decodedSortedAnswers }) => {
      if (!mounted) return;
      if (success && Array.isArray(decodedSortedAnswers)) {
        const items: AnswerItem[] = decodedSortedAnswers.map((s: string) => {
          // split on first ':' to preserve colons in response
          const idx = s.indexOf(":");
          const text = idx >= 0 ? s.slice(0, idx) : s;
          const date = idx >= 0 ? s.slice(idx + 1) : "";
          const time = date ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
          return { raw: s, text, date, time };
        });
        setAnswers(items.reverse()); // show newest first
        // auto-expand the most recent date group
        if (items.length > 0) {
          const key = items[0].date ? new Date(items[0].date).toDateString() : "Unknown";
          setExpandedDates({ [key]: true });
        }
      } else {
        setAnswers([]);
      }
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [questionId]);
   // Add questionId as a dependency
  if (loading) return <p className="text-sm text-gray-500">Loading history…</p>;
  if (answers.length === 0) return <p className="text-sm text-gray-500">No history yet for this question.</p>;

  // Group by date (local date string)
  const groups: Record<string, AnswerItem[]> = {};
  answers.forEach((a) => {
    const key = a.date ? new Date(a.date).toDateString() : "Unknown";
    if (!groups[key]) groups[key] = [];
    groups[key].push(a);
  });

  const dateKeys = Object.keys(groups).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="mt-4">

       <div className="flex my-6 justify-center items-center gap-3">
              <div className="inset-0 flex-1 items-center">
                <div className="w-full border border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 -gray-500">
                    <h3 className="text-sm font-bold text-gray-700 mb-3 ">History</h3>
                </span>
              </div>
              <div className="inset-0 flex-1 items-center">
                <div className="w-full border border-gray-300"></div>
              </div>
            </div>

      <div className="relative pl-8">
        {/* vertical line */}
        <div className="left-3 top-0 bottom-0 w-px bg-gray-200" />

        <div className="space-y-6">
          {dateKeys.map((dk) => {
            const items = groups[dk];
            const isOpen = !!expandedDates[dk];
            return (
              <div key={dk} className="relative">
                <button
                  onClick={() => setExpandedDates((s) => ({ ...s, [dk]: !isOpen }))}
                  className="flex items-center gap-3 w-full text-left"
                >
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{formatDateKey(items[0].date)}</div>
                        <div className="text-xs text-gray-500">{items.length} response{items.length>1?'s':''}</div>
                      </div>
                      <div className="text-xs text-gray-500">{isOpen ? "Hide" : "Show"}</div>
                    </div>
                  </div>
                </button>

                <div className={`mt-3 pl-6 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <div className="space-y-3">
                    {items.map((it, idx) => (
                      <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="text-sm text-gray-800">{it.text}</div>
                        <div className="text-xs text-gray-400 mt-2">{it.time} • {new Date(it.date).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
