'use client';

import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter } from '@systemspecs/foundations/primitives';

const STORAGE_KEY = 'stsl.cookie-consent';

type Choice = 'accepted' | 'declined';

/**
 * NDPR-aligned cookie consent banner. Stub implementation: no third-party
 * SDK, no telemetry hookup. Persists user choice to localStorage and
 * suppresses itself on subsequent visits.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== 'accepted' && stored !== 'declined') {
        setVisible(true);
      }
    } catch {
      // localStorage may be unavailable (private mode, ITP); show by default.
      setVisible(true);
    }
  }, []);

  const persist = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Best-effort; banner still dismisses for the session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <Card surface="raised" className="shadow-e3">
        <CardBody>
          <p className="text-body-sm text-fg-primary">
            We use cookies to make this site work and to understand how it is used,
            in line with the Nigeria Data Protection Regulation (NDPR). You can
            accept or decline non-essential cookies.
          </p>
        </CardBody>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => persist('declined')}>
            Decline
          </Button>
          <Button variant="primary" size="sm" onClick={() => persist('accepted')}>
            Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CookieConsent;
