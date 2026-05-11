export interface RouteLink {
  title: string;
  url: string;
}

// These are the links that everyone can see
export const publicLinks: RouteLink[] = [
  { title: 'HOME', url: '/' },
  { title: 'PORTFOLIO', url: '/portfolio' },
  { title: 'PRICE', url: '/price' },
  { title: 'TERMS', url: '/terms' },
  { title: 'ZERYUZ_CORP', url: '/zeryuz' },
  { title: 'DEBUT_PAGE', url: '/debut' },
  { title: 'FORM', url: '/form' },
];

// These are your private admin-only links
export const adminLinks: RouteLink[] = [
  { title: 'REVIEW_HUB', url: '/admin/review' },
  { title: 'LIVECHAT_GEN', url: '/admin/livechat' },
  // Add new admin pages here as you create them!
];
