"use client";

import { useEffect, useState } from "react";

const DEFAULT_PROJECT_TYPES = [
  "Photography",
  "Brand film / video",
  "Event coverage",
  "Design & identity",
  "Something else",
];

const BUDGETS = ["Not sure yet", "Under ₹10,000", "₹10,000–25,000", "₹25,000–50,000", "₹50,000+"];

const fieldClass =
  "w-full bg-transparent border-b border-zinc-700 focus:border-white outline-none py-3 text-white placeholder:text-zinc-600 transition-colors";
const labelClass = "block text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-1";

// Enquiry form with no backend: it composes the message and hands it to
// WhatsApp or the visitor's email app, so nothing needs storing or sending.
export default function Contact({ email, whatsappNumber, calendlyUrl, services = [] }) {
  const projectTypes = services.length > 0
    ? [...services.map((s) => s.title), "Something else"]
    : DEFAULT_PROJECT_TYPES;

  const [form, setForm] = useState({
    name: "",
    projectType: projectTypes[0],
    budget: BUDGETS[0],
    date: "",
    message: "",
  });
  const [error, setError] = useState("");

  // "Enquire" links in the Services section pre-select their service.
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest?.("[data-enquire]");
      if (link) setForm((f) => ({ ...f, projectType: link.dataset.enquire }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const composeMessage = () =>
    [
      `Hi Vishal, I'm ${form.name.trim()}.`,
      `Project: ${form.projectType}`,
      `Budget: ${form.budget}`,
      form.date.trim() ? `Date / deadline: ${form.date.trim()}` : null,
      "",
      form.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

  const validate = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a few words about the project.");
      return false;
    }
    setError("");
    return true;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composeMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!validate()) return;
    const subject = `Project enquiry: ${form.projectType} — ${form.name.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(composeMessage())}`;
  };

  return (
    <section
      id="contact"
      className="bg-zinc-950 text-white py-24 md:py-32 px-6 md:px-12 relative z-20 scroll-mt-16 selection:bg-white selection:text-black"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-24">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 mb-6">{"// CONTACT"}</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
            Tell me about<br />your project.
          </h2>
          <p className="text-zinc-400 font-medium leading-relaxed mb-10 max-w-md">
            Share a few details and send them on WhatsApp or by email, whichever you prefer. I usually reply within a day.
          </p>

          <div className="space-y-4 text-sm">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors w-fit"
            >
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 w-20">WhatsApp</span>
              +{whatsappNumber}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors w-fit break-all"
            >
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-500 w-20 shrink-0">Email</span>
              {email}
            </a>
            {calendlyUrl && (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-4 border border-zinc-700 hover:border-white text-xs font-bold tracking-widest uppercase px-5 py-3 transition-colors"
              >
                Book a call ↗
              </a>
            )}
          </div>
        </div>

        <form
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            sendWhatsApp();
          }}
          noValidate
        >
          <div className="sm:col-span-2">
            <label htmlFor="c-name" className={labelClass}>Your name *</label>
            <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={update("name")} className={fieldClass} placeholder="Name or company" />
          </div>

          <div>
            <label htmlFor="c-type" className={labelClass}>Project type</label>
            <select id="c-type" value={form.projectType} onChange={update("projectType")} className={`${fieldClass} [&>option]:text-black`}>
              {projectTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="c-budget" className={labelClass}>Budget</label>
            <select id="c-budget" value={form.budget} onChange={update("budget")} className={`${fieldClass} [&>option]:text-black`}>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="c-date" className={labelClass}>Date or deadline</label>
            <input id="c-date" type="text" value={form.date} onChange={update("date")} className={fieldClass} placeholder="e.g. 15 March, or flexible" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="c-message" className={labelClass}>About the project *</label>
            <textarea id="c-message" rows={4} value={form.message} onChange={update("message")} className={`${fieldClass} resize-none`} placeholder="What do you need, where, and what is it for?" />
          </div>

          {error && (
            <p role="alert" className="sm:col-span-2 text-sm text-red-400 -mt-4">{error}</p>
          )}

          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
            <button type="submit" className="bg-white text-black text-xs font-bold tracking-widest uppercase px-7 py-4 hover:bg-zinc-200 transition-colors">
              Send on WhatsApp →
            </button>
            <button type="button" onClick={sendEmail} className="border border-zinc-700 hover:border-white text-xs font-bold tracking-widest uppercase px-7 py-4 transition-colors">
              Send by email
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
