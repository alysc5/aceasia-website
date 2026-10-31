// Stand-in until approved brand photos arrive. Never shows fake product or puppy photos.
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return <div className={`ph ${className}`} role="img" aria-label={`${label} — photo coming soon`}><span><em>{label.charAt(0)}</em>Photo coming soon</span></div>;
}
