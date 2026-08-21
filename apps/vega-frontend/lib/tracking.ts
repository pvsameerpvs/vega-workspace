type TrackParams = Record<string, string | number | boolean | undefined>;

/**
 * Lightweight event tracking for landing pages.
 * Pushes to an existing Google Tag Manager / GA4 dataLayer or gtag queue
 * when present. Does nothing if no analytics is installed.
 */
export function track(event: string, params?: TrackParams) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...params });
  }
  if (typeof w.gtag === "function") {
    w.gtag("event", event, params || {});
  }
}

export function getTrackingParams(search: string) {
  const params = new URLSearchParams(search);
  const pick = (key: string) => params.get(key) || undefined;
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmTerm: pick("utm_term"),
    utmContent: pick("utm_content"),
    gclid: pick("gclid"),
  };
}