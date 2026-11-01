"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/catalogue";

export default function ContactForm() {
  const sp = useSearchParams();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok) setState("sent");
    else { setErr(j.error ?? "Something went wrong."); setState("error"); }
  }

  if (state === "sent") return (
    <div className="storyCard rise" role="status" style={{ margin: "0 auto" }}>
      <h2>Thank you! 🐾</h2>
      <p>We&apos;ve received your message and sent a confirmation to your email. We&apos;ll get back to you soon.</p>
    </div>
  );

  return (
    <form className="contactForm storyCard" onSubmit={submit} style={{ margin: "0 auto" }}>
      <h2>Send us a message</h2>
      <div className="formRow">
        <label>Your name<input name="name" className="field" required maxLength={100} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" className="field" required maxLength={200} autoComplete="email" /></label>
      </div>
      <div className="formRow">
        <label>Phone (optional)<input name="phone" type="tel" className="field" maxLength={30} autoComplete="tel" /></label>
        <label>Topic
          <select name="topic" className="field" defaultValue={sp.get("type") === "stockist" ? "Become a stockist" : "General question"}>
            <option>General question</option><option>Product question</option><option>Order help</option><option>Become a stockist</option>
          </select>
        </label>
      </div>
      <label>Message<textarea name="message" className="field" required rows={6} maxLength={3000} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="srOnly" aria-hidden="true" />
      <p className="small muted" style={{ margin: 0 }}>We only use your details to reply to you.</p>
      {state === "error" && <p role="alert" className="small" style={{ color: "#a33", margin: 0 }}>{err} You can also email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
      <button className="btn primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button>
    </form>
  );
}
