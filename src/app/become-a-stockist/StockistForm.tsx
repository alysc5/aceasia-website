"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/catalogue";

export default function StockistForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), kind: "stockist" };
    const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok) setState("sent");
    else { setErr(j.error ?? "Something went wrong."); setState("error"); }
  }

  if (state === "sent") return (
    <div className="storyCard rise" role="status" style={{ margin: "0 auto" }}>
      <h2>Request received! 🐾</h2>
      <p>Thank you for your interest. We&apos;ve emailed you a confirmation. To open your account, please reply to that email with your company&apos;s ACRA business profile.</p>
    </div>
  );

  return (
    <form className="contactForm storyCard" onSubmit={submit} style={{ margin: "0 auto" }}>
      <h2>Stockist enquiry</h2>
      <div className="formRow">
        <label>Your name<input name="name" className="field" required maxLength={100} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" className="field" required maxLength={200} autoComplete="email" /></label>
      </div>
      <div className="formRow">
        <label>Contact number<input name="phone" type="tel" className="field" required maxLength={30} autoComplete="tel" /></label>
        <label>Shop name<input name="shop" className="field" required maxLength={120} autoComplete="organization" /></label>
      </div>
      <label>Shop address<input name="address" className="field" required maxLength={250} autoComplete="street-address" /></label>
      <label>Message<textarea name="message" className="field" required rows={5} maxLength={3000} placeholder="Which brands are you interested in?" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="srOnly" aria-hidden="true" />
      <p className="small muted" style={{ margin: 0 }}>We only use your details to reply and set up your account.</p>
      {state === "error" && <p role="alert" className="small" style={{ color: "#a33", margin: 0 }}>{err} You can also email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
      <button className="btn primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send request"}</button>
    </form>
  );
}
