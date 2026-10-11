/** Inline SVG symbols (replica-90 line icons). */
export function SiteIconSprites() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-globe" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 12h18M12 3c2.6 2.8 3.9 5.8 3.9 9s-1.3 6.2-3.9 9c-2.6-2.8-3.9-5.8-3.9-9S9.4 5.8 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-gear" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2.8l1.6 2.3 2.7-.7.7 2.7 2.6 1-.9 2.6 1.9 2-1.9 2 .9 2.6-2.6 1-.7 2.7-2.7-.7L12 21.2l-1.6-2.3-2.7.7-.7-2.7-2.6-1 .9-2.6-1.9-2 1.9-2-.9-2.6 2.6-1 .7-2.7 2.7.7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 9.5-4.4-1.3-7.5-4.9-7.5-9.5V6z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.6 12.2l2.4 2.4 4.4-4.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-chat" viewBox="0 0 24 24">
        <path d="M20 11.5a7.8 7.8 0 0 1-11.3 7L4 20l1.4-4.3A7.8 7.8 0 1 1 20 11.5z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-file" viewBox="0 0 24 24">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 3v5h5M9 13h6M9 17h6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-flask" viewBox="0 0 24 24">
        <path d="M9.5 3h5M10.5 3v6L5 19a1.4 1.4 0 0 0 1.2 2h11.6a1.4 1.4 0 0 0 1.2-2l-5.5-10V3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.4 15h9.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-truck" viewBox="0 0 24 24">
        <path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.2V16h-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7" cy="17.5" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="17.5" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </symbol>
    </svg>
  );
}

type IconId = "globe" | "gear" | "shield" | "chat" | "file" | "flask" | "truck" | "arrow";

const iconMap: Record<IconId, string> = {
  globe: "i-globe",
  gear: "i-gear",
  shield: "i-shield",
  chat: "i-chat",
  file: "i-file",
  flask: "i-flask",
  truck: "i-truck",
  arrow: "i-arrow",
};

export function SiteIcon({ name, className = "ico-md" }: { name: IconId; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${iconMap[name]}`} />
    </svg>
  );
}
