'use client';

import { useCallback, useMemo, useState } from 'react';

export type CodeLanguage = 'bash' | 'js' | 'ts';

export interface CodeSampleProps {
  language: CodeLanguage;
  code: string;
  /** Optional filename rendered in the header bar (left-aligned). */
  filename?: string;
  /** Editorial caption rendered below the surface in Source Serif italic. */
  caption?: string;
}

/**
 * Code sample for the Developers landing (§6.4). Espresso ink surface so it
 * reads as a developer artefact against the warm cream page floor. JetBrains
 * Mono 13px, a tiny header bar that hosts the optional filename + the copy
 * button, and a lightweight regex-driven syntax theme (no Prism / Shiki — we
 * keep the bundle weight off this surface). Mint keyword accent + warm string
 * tone are the only saturated hues; the rest of the theme is greyscale on
 * the espresso ground.
 *
 * Hex values in the syntax theme are intentional and called out in the
 * brief — code samples are the one place raw hex is allowed.
 */
export function CodeSample({ language, code, filename, caption }: CodeSampleProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard rejected — silently no-op rather than blow up the page */
    }
  }, [code]);

  // Highlighted markup is computed once per code+language combo. Tokenisation
  // is deliberately small — keyword / string / comment / number / built-in —
  // tuned to read cleanly at body copy size, not to compete with a full IDE
  // theme.
  const tokens = useMemo(() => highlight(code, language), [code, language]);

  return (
    <figure className="not-prose">
      <div
        className="relative overflow-hidden rounded-[1.5rem] bg-[#0B0C0F]
                   ring-1 ring-white/[0.08] shadow-e2"
      >
        {/* Header bar — filename pinned left, copy button right. The bar
            uses a hairline rule rather than a heavier divider so it reads as
            quiet metadata, not chrome. */}
        <div className="flex items-center justify-between gap-4 px-5 h-11 border-b border-white/[0.06]">
          <span className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40"
            >
              {language}
            </span>
            {filename ? (
              <span className="font-mono text-[12.5px] text-white/70 truncate">
                {filename}
              </span>
            ) : null}
          </span>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            aria-live="polite"
            className="inline-flex items-center gap-2 h-8 px-3 rounded-pill
                       text-[11px] font-mono uppercase tracking-[0.18em]
                       text-white/70 ring-1 ring-white/[0.08]
                       transition-[color,background-color,border-color] duration-base ease-expressive
                       hover:text-white hover:ring-white/20
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-default)]"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Code surface. overflow-x for long lines; whitespace-pre to honour
            the source. We render via dangerouslySetInnerHTML on a string we
            built ourselves from a token list — no consumer string ever
            reaches innerHTML directly. */}
        <pre
          className="overflow-x-auto px-5 py-5 text-[13px] leading-[1.65] font-mono text-[#E6E1D4]"
        >
          <code
            className={`language-${language}`}
            // Markup is built from escape() + a small set of <span class="..."> wrappers below.
            dangerouslySetInnerHTML={{ __html: tokens }}
          />
        </pre>
      </div>

      {caption ? (
        <figcaption className="mt-4 font-serif italic text-body-sm text-fg-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default CodeSample;

// ────────────────────────────────────────────────────────────────────────
// Tiny syntax highlighter. Returns an HTML string with <span class="tok-*">
// wrappers around tokens. Inline color via style attribute keeps the
// component self-contained — no global stylesheet required.
//
// Theme:
//   keyword  → mint  (#62D3B3)
//   string   → warm  (#F4D29A)
//   comment  → dim   (#7A828D)
//   number   → cool  (#7E9FD4)
//   builtin  → soft  (#B0C4E7)
// ────────────────────────────────────────────────────────────────────────

const KEYWORDS_JS = new Set([
  'await', 'async', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for',
  'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new',
  'of', 'return', 'static', 'super', 'switch', 'this', 'throw', 'try',
  'typeof', 'var', 'void', 'while', 'yield',
]);
const KEYWORDS_TS = new Set([
  ...KEYWORDS_JS,
  'as', 'enum', 'implements', 'interface', 'is', 'keyof', 'namespace',
  'readonly', 'satisfies', 'type', 'public', 'private', 'protected',
  'declare', 'abstract', 'override', 'unknown', 'never',
]);
const BUILTINS_JS = new Set([
  'console', 'document', 'window', 'fetch', 'JSON', 'Math', 'Object',
  'Array', 'String', 'Number', 'Boolean', 'Promise', 'Date', 'Map', 'Set',
  'Error', 'undefined', 'null', 'true', 'false',
]);
const KEYWORDS_BASH = new Set([
  'if', 'then', 'else', 'elif', 'fi', 'for', 'in', 'do', 'done', 'while',
  'until', 'case', 'esac', 'function', 'return', 'export', 'local',
  'readonly', 'declare', 'echo', 'cd', 'curl', 'wget', 'sudo', 'npm',
  'pnpm', 'yarn', 'node', 'git', 'docker', 'kubectl',
]);

const COLOR = {
  keyword: '#62D3B3',
  string:  '#F4D29A',
  comment: '#7A828D',
  number:  '#7E9FD4',
  builtin: '#B0C4E7',
} as const;

type TokenKind = keyof typeof COLOR;

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function wrap(kind: TokenKind, text: string): string {
  return `<span style="color:${COLOR[kind]}">${escape(text)}</span>`;
}

// Single-pass tokeniser. Regex alternatives are ordered so longer matches
// win (string before identifier, etc). Anything that doesn't match a
// pattern falls through as escaped plain text.
function highlight(code: string, language: CodeLanguage): string {
  const isBash = language === 'bash';
  const keywords = isBash
    ? KEYWORDS_BASH
    : language === 'ts'
      ? KEYWORDS_TS
      : KEYWORDS_JS;
  const builtins = isBash ? new Set<string>() : BUILTINS_JS;

  // Order: comments → strings → numbers → identifiers → other.
  const pattern = isBash
    ? /(#[^\n]*)|('[^'\\]*(?:\\.[^'\\]*)*')|("[^"\\]*(?:\\.[^"\\]*)*")|(\$\w+|\$\{[^}]+\})|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][\w-]*\b)|([\s\S])/g
    : /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|('[^'\\]*(?:\\.[^'\\]*)*')|("[^"\\]*(?:\\.[^"\\]*)*")|(`[^`\\]*(?:\\.[^`\\]*)*`)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)|([\s\S])/g;

  let out = '';
  for (const match of code.matchAll(pattern)) {
    const [, comment, sq, dq, third, num, ident, other] = match;
    if (comment) {
      out += wrap('comment', comment);
    } else if (sq) {
      out += wrap('string', sq);
    } else if (dq) {
      out += wrap('string', dq);
    } else if (third) {
      // bash → variable, js/ts → template literal. Both render as warm
      // string tone since they're values-with-substitution.
      out += wrap('string', third);
    } else if (num) {
      out += wrap('number', num);
    } else if (ident) {
      if (keywords.has(ident)) out += wrap('keyword', ident);
      else if (builtins.has(ident)) out += wrap('builtin', ident);
      else out += escape(ident);
    } else if (other) {
      out += escape(other);
    }
  }
  return out;
}
