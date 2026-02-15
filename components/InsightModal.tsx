"use client";

import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "@/services/firebase";
import { useAuth } from "@/services/AuthContext";

type Props = {
  user: { uid: string } | null; // pass user as prop to avoid coupling with AuthContext
  questionId: string;
  open: boolean;
  onClose: () => void;
};

type AnswerItem = {
  key: string;
  encoded: string;
  decoded: string;
  date: string;
};

export default function InsightModal({ user, questionId, open, onClose }: Props) {
  // const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const uid = user?.uid || "default";
        const ref = doc(db, uid, questionId || "default");
        const snap = await getDoc(ref);
        if (!mounted) return;
        if (!snap.exists()) {
          setAnswers([]);
          return;
        }
        const data = snap.data() as Record<string, any>;
        const items: AnswerItem[] = Object.entries(data || {})
          .map(([k, v]) => {
            const raw = String(v ?? "");
            const split = raw.split(":");
            // stored as `${btoa(response)}:${date}`
            const encoded = split[0] ?? "";
            const date = split.slice(1).join(":") || "";
            let decoded = "";
            try {
              decoded = encoded ? atob(encoded) : "";
            } catch (err) {
              decoded = encoded;
            }
            return { key: k, encoded, decoded, date };
          })
          .sort((a, b) => {
            const ta = new Date(a.date).getTime() || 0;
            const tb = new Date(b.date).getTime() || 0;
            return tb - ta;
          });
        setAnswers(items);
      } catch (err) {
        console.error("InsightModal load error", err);
        setAnswers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [open, questionId, user]);

  if (!open) return null;

  const total = answers.length;
  const mostRecent = answers[0];
  const samples = answers.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onClose()}
      />
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-lg p-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Insights — Question #{questionId}</h3>
            <p className="text-sm text-gray-600 mt-1">
              A quick summary of responses you've saved for this question
            </p>
          </div>
          <div>
            <button
              onClick={() => onClose()}
              className="inline-flex items-center px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
            >
              Close
            </button>
          </div>
        </header>

        <div className="mt-4">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-700">Total saved responses: <span className="font-semibold">{total}</span></p>
              </div>

              {mostRecent ? (
                <div className="mb-4 p-4 rounded-lg bg-gray-50 border">
                  <p className="text-sm text-gray-500">Most recent</p>
                  <p className="mt-1 text-gray-800">{mostRecent.decoded}</p>
                  <p className="mt-2 text-xs text-gray-500">{mostRecent.date}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No responses yet for this question.</p>
              )}

              {samples.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Sample recent responses</p>
                  <ul className="space-y-2 max-h-48 overflow-auto">
                    {samples.map((s) => (
                      <li key={s.key} className="p-3 rounded-md bg-white border">
                        <p className="text-sm text-gray-800">{s.decoded}</p>
                        <p className="text-xs text-gray-500 mt-1">{s.date}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
