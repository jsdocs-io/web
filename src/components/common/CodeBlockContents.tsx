import React from "react";
import trimNewlines from "trim-newlines";
import { SyntaxHighlight } from "./SyntaxHighlight";

export function CodeBlockContents({
  code: rawCode,
  language,
}: {
  code: string;
  language: string;
}) {
  // Trim newlines to prevent rendering empty space surrounding content
  // but preserve other whitespace that may be used for alignment.
  const code = trimNewlines(rawCode);

  const copyCodeToClipboard = () => {
    navigator.clipboard?.writeText(code);
  };

  return (
    <div className="relative">
      <button
        className="absolute right-0 p-2 text-gray-100 opacity-25 hover:opacity-100 active:text-green-500"
        title="Copy to clipboard"
        onClick={copyCodeToClipboard}
      >
        <svg viewBox="0 0 20 20" className="w-6 h-6 fill-current">
          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
          <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
        </svg>
      </button>

      <SyntaxHighlight code={code} language={language} />
    </div>
  );
}
