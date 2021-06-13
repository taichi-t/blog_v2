export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

type CategoryType = 'ui';

type ClickEvent = {
  action: 'click';
  category: CategoryType;
  label: string;
  value: string;
};

export type Event = ClickEvent;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value }: Event) => {
  if (!GA_TRACKING_ID) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default {
  pageview,
  event,
};
