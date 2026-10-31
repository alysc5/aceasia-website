import Link from "next/link";
import type { Brand } from "@/lib/catalogue";
import Placeholder from "./Placeholder";

export default function BrandCard({ b, i = 0 }: { b: Brand; i?: number }) {
  return (
    <Link href={`/brands/${b.slug}`} className={`bCard rise d${Math.min(3, i)}`} style={{ ["--accent" as string]: b.accent }}>
      <Placeholder label={b.name} />
      <div className="body">
        <div><h3>{b.name}</h3><p>{b.category}</p></div>
        <span className="arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
