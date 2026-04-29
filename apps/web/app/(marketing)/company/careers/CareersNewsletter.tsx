'use client';

// Thin client wrapper around NewsletterCTA for the Careers page.
// NewsletterCTA itself is a client component requiring an async onSubmit
// callback — wrapping here keeps the parent CareersPage server-rendered and
// avoids leaking the form handler into every other section of the page.

import { NewsletterCTA } from '@systemspecs/brand-stsl';

export function CareersNewsletter() {
  return (
    <NewsletterCTA
      eyebrow="Talent pool"
      headline="Get notified about future openings."
      description="A quiet note when we open roles in engineering, product, design, or operations. No marketing — just roles."
      placeholder="name@email.com"
      onSubmit={async (email: string) => {
        // Placeholder submit — wire to the talent pool API in a later phase.
        // We log to the browser console so the form's success state still
        // resolves on dev.
        // eslint-disable-next-line no-console
        console.info('[careers-newsletter] subscribed:', email);
        await new Promise((r) => setTimeout(r, 350));
      }}
    />
  );
}
