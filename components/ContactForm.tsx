"use client";

import { useState } from "react";
import { site } from "@/data/site";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!endpoint) {
      const subject = encodeURIComponent(`${data.get("topic") ?? "Message"} from ${data.get("name") ?? "the website"}`);
      const body = encodeURIComponent(
        `${data.get("message") ?? ""}\n\nFrom: ${data.get("name") ?? ""} <${data.get("email") ?? ""}>\nOrder: ${data.get("order") ?? ""}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-ink pt-6" role="status">
        <p className="display text-3xl">Thank you, we have your note</p>
        <p className="mt-2 text-ink-2">We answer every message within two business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {!endpoint && (
        <p className="border-l-2 border-oxblood bg-paper px-4 py-3 text-sm text-ink-2">
          This form opens your email app for now. Once a form address is set up, messages send straight from here. You
          can also write to{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm">Your name</span>
          <input name="name" required autoComplete="name" className="field mt-2" />
        </label>
        <label className="block">
          <span className="text-sm">Email</span>
          <input name="email" type="email" required autoComplete="email" className="field mt-2" />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm">What it&apos;s about</span>
          <select name="topic" className="field mt-2">
            <option>Sizing advice</option>
            <option>A repair</option>
            <option>An order</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm">
            Order number <span className="text-muted">(optional)</span>
          </span>
          <input name="order" className="field mt-2" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm">Message</span>
        <textarea name="message" required rows={6} className="field mt-2" />
      </label>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : endpoint ? "Send message" : "Write to us by email"}
      </button>
      {status === "error" && (
        <p className="text-sm text-oxblood" role="alert">
          That didn&apos;t go through. Please try again, or email us at{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
