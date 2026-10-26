"use client";

import { generateTextAction } from "@/app/action/AiAction";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setOutput("");

    try {
      const response = await generateTextAction(prompt);
      setOutput(response);
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">AI Assistant</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {!output && !isLoading && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                How can I help you?
              </h2>
              <p className="text-gray-500">Ask anything and Ill respond.</p>
            </div>
          )}

          {/* User Message */}
          {prompt && (
            <div className="flex justify-end">
              <div className="bg-gray-900 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                <p className="text-sm">{prompt}</p>
              </div>
            </div>
          )}

          {/* AI Response */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}

          {output && !isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300 text-sm"
            style={{ maxHeight: "150px" }}
          />
          <Button
            onClick={handleSendPrompt}
            disabled={isLoading || !prompt.trim()}
            className="h-12 w-12 rounded-xl p-0"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </main>
  );
}
