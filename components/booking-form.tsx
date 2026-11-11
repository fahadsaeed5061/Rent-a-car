"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

const emptyState = { name: "", email: "", phone: "", pickup: "", dropoff: "", date: "", time: "", vehicle: "", passengers: "1", serviceType: "Airport transfer", notes: "" };

export function BookingForm({ initialValues = {} }: { initialValues?: Partial<typeof emptyState> }) {
  const initialState = { ...emptyState, ...initialValues };
  const [form, setForm] = useState(initialState);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, passengers: Number(form.passengers) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "We couldn’t submit your request. Please try again.");
      setState("success");
      setForm(emptyState);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  const field = (name: keyof typeof initialState, label: string, type = "text", required = true) => (
    <label className="form-field" key={name}>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={form[name]}
        required={required}
        min={type === "number" ? "1" : undefined}
        onChange={(event) => setForm({ ...form, [name]: event.target.value })}
        placeholder={type === "date" ? undefined : label}
      />
    </label>
  );

  return (
    <form className="booking-form" onSubmit={submit}>
      {state === "success" ? (
        <div className="form-success" role="status"><span className="success-icon"><Check size={19} /></span><h2>Your request is on its way.</h2><p>Our concierge will be in touch shortly to confirm the details.</p><button className="text-link" type="button" onClick={() => setState("idle")}>Make another request <ArrowRight size={15} /></button></div>
      ) : (
        <>
          <div className="form-intro"><span className="eyebrow">A better ride begins here</span><h2>Tell us where you’re headed.</h2><p>Share a few details and our concierge will be in touch to confirm your ride.</p></div>
          <div className="form-grid">
            {field("name", "Full name")}
            {field("email", "Email address", "email")}
            {field("phone", "Phone number", "tel")}
            <label className="form-field"><span>Service</span><select name="serviceType" value={form.serviceType} onChange={(event) => setForm({ ...form, serviceType: event.target.value })}>{form.serviceType && !["Airport transfer", "Corporate travel", "Hourly chauffeur", "Special occasion", "Wedding", "Other"].includes(form.serviceType) && <option>{form.serviceType}</option>}{["Airport transfer", "Corporate travel", "Hourly chauffeur", "Special occasion", "Wedding", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label>
            {field("pickup", "Pickup location")}
            {field("dropoff", "Drop-off location")}
            {field("date", "Pickup date", "date")}
            {field("time", "Pickup time", "time")}
            <label className="form-field"><span>Vehicle preference</span><select name="vehicle" value={form.vehicle} onChange={(event) => setForm({ ...form, vehicle: event.target.value })} required><option value="" disabled>Select a vehicle</option>{["First Class", "Full Size SUV", "Sprinter Van", "Executive Sedan", "Not sure yet"].map((item) => <option key={item}>{item}</option>)}</select></label>
            {field("passengers", "Passengers", "number")}
            <label className="form-field form-full"><span>Anything else we should know? <small>Optional</small></span><textarea name="notes" rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Flight details, special requests, or other notes" /></label>
          </div>
          {state === "error" && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark form-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending request…" : "Request your ride"} <ArrowRight size={16} /></button>
          <p className="form-disclaimer">Your request is not a confirmed reservation. Our concierge will follow up to confirm availability.</p>
        </>
      )}
    </form>
  );
}
