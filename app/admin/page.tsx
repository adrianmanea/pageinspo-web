"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { createClient } from "@/utils/supabase/client";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { Loader2, Save } from "lucide-react";
import { cn } from "@/utils/cn";

export default function AdminClientPage() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [originalApp, setOriginalApp] = useState("");
  const [code, setCode] = useState(`export default function Component() {
  return (
    <div className="p-4 bg-white text-black">
      <h1>Hello World</h1>
    </div>
  )
}`);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async () => {
    if (!name) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const { error } = await supabase.from("components").insert({
        name,
        code_string: code,
        original_app: originalApp || null,
        tags: tagArray,
      });

      if (error) throw error;

      setMessage({ type: "success", text: "Component saved successfully!" });
      setName("");
      setTags("");
      setOriginalApp("");
    } catch (e: any) {
      console.error(e);
      setMessage({
        type: "error",
        text: "Error saving component: " + e.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start bg-zinc-950 text-zinc-100 font-sans antialiased">
      <Sidebar className="sticky top-0 h-screen" />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">
              Add Component
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#292929]/40 border border-zinc-800 rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">
                      Component Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                      placeholder="e.g. Login Card"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">
                      Original App{" "}
                      <span className="text-zinc-600">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={originalApp}
                      onChange={(e) => setOriginalApp(e.target.value)}
                      className="w-full h-10 px-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                      placeholder="e.g. Uber"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Tags{" "}
                    <span className="text-zinc-600">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                    placeholder="e.g. auth, form, card"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">
                    Code
                  </label>
                  <div className="h-[400px] border border-zinc-800 rounded-lg overflow-hidden bg-[#1e1e1e]">
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', monospace",
                        padding: { top: 16 },
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </div>
                </div>

                {message && (
                  <div
                    className={cn(
                      "p-3 rounded-lg text-xs leading-relaxed",
                      message.type === "error"
                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-green-500/10 text-green-500 border border-green-500/20"
                    )}
                  >
                    {message.text}
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 rounded-lg text-sm font-medium hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Save Component"}
                </button>
              </div>
            </div>

            {/* Sidebar / Instructions */}
            <div className="space-y-6">
              <div className="bg-[#292929]/40 border border-zinc-800 rounded-2xl p-6">
                <h2 className="font-semibold text-zinc-200 mb-4 text-sm">
                  Instructions
                </h2>
                <ul className="space-y-3 text-xs text-zinc-400 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="bg-zinc-800 rounded-full h-4 w-4 flex items-center justify-center text-[10px] text-zinc-300 flex-shrink-0 mt-0.5">
                      1
                    </span>
                    Write your component as a default export function or named{" "}
                    <code>Component</code>.
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-zinc-800 rounded-full h-4 w-4 flex items-center justify-center text-[10px] text-zinc-300 flex-shrink-0 mt-0.5">
                      2
                    </span>
                    Tailwind CSS is available for styling.
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-zinc-800 rounded-full h-4 w-4 flex items-center justify-center text-[10px] text-zinc-300 flex-shrink-0 mt-0.5">
                      3
                    </span>
                    Lucide React icons are not yet available in the sandbox.
                  </li>
                  <li className="flex gap-2">
                    <span className="bg-zinc-800 rounded-full h-4 w-4 flex items-center justify-center text-[10px] text-zinc-300 flex-shrink-0 mt-0.5">
                      4
                    </span>
                    Imports will be stripped, so use standard HTML elements or
                    ensure dependencies are in global scope.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
