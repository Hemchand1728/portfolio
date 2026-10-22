import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} {...p}><path d="M12 4v16M6 14l6 6 6-6" /></svg>
);
export const Download = (p: P) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} {...p}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
);
export const Sun = (p: P) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...stroke} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Moon = (p: P) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...stroke} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...stroke} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
);
export const Seal = (p: P) => (
  <svg viewBox="0 0 24 24" width="30" height="30" {...stroke} strokeWidth={1.2} {...p}><circle cx="12" cy="9" r="6" /><circle cx="12" cy="9" r="3.5" /><path d="M15.5 14 17 22l-5-3-5 3 1.5-8" /></svg>
);
export const GitHub = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" /></svg>
);
export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></svg>
);
export const LeetCode = (p: P) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}><path d="M13.5 0a1.4 1.4 0 0 0-1 .4L7 6.3l-2.6 2.8a5.3 5.3 0 0 0-1.3 2.2 5.6 5.6 0 0 0 0 2.4 5.4 5.4 0 0 0 1.4 2.5l4.3 4.4a5.6 5.6 0 0 0 7.8 0l2.6-2.5a1.4 1.4 0 0 0-1.9-2l-2.6 2.5a2.8 2.8 0 0 1-3.9 0l-4.3-4.4a2.7 2.7 0 0 1 0-3.8l4.3-4.6 4.6-4.9a1.4 1.4 0 0 0-1-2.3zM9.3 13.5a1.4 1.4 0 0 0 0 2.8H20a1.4 1.4 0 0 0 0-2.8z" /></svg>
);
