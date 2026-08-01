"use client";
import Link from "next/link";
import { AlertTriangle,House } from "lucide-react";

export default function notFound(){



  return (
    <div className="flex md:min-h-screen items-center p-9 mb-4 justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 md:p-10 p-3 text-center shadow-2xl backdrop-blur">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <h1 className="mb-3 md:text-3xl text-2xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mb-8 text-slate-400">
          An unexpected error occurred 
          Please return to the home page.
        </p>

        <div className="flex flex-col pb-3 gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex  items-center justify-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            <House size={18} />
            Go Home
          </Link>
        </div>

        <div className="mt-5 border-t border-slate-800 pt-5 text-sm text-slate-500">
          Error Boundary • Social Hub
        </div>
      </div>
    </div>
    
  );
}

