'use client';

// Client-only dynamic import shim for the cobe-driven Globe.
//
// Why this file exists:
//   • The marketing homepage is a server component, but next/dynamic with
//     `ssr: false` is only valid in client components.
//   • Wrapping the import here keeps page.tsx server-rendered while pushing
//     the cobe runtime + Globe component into a separate client chunk that
//     loads only on the homepage.
//   • The placeholder reserves the 1:1 aspect frame so layout doesn't shift
//     when the canvas mounts — same outer shape as the real globe wrapper.

import dynamic from 'next/dynamic';

export const Globe = dynamic(
  () => import('@systemspecs/brand-stsl').then((m) => ({ default: m.Globe })),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative aspect-square w-full max-w-full mx-auto bg-bg-surface"
        aria-hidden="true"
      />
    ),
  },
);
