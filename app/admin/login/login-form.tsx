"use client";

import { useState, type FormEvent } from "react";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
      window.location.assign("/admin");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to sign in.");
      setPending(false);
    }
  }
  return <form onSubmit={submit}><label className="form-field"><span>Email</span><input name="email" type="email" autoComplete="username" required /></label><label className="form-field"><span>Password</span><input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="login-error" role="alert">{error}</p>}<button className="button button-dark" style={{ marginTop: 22 }} disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button></form>;
}
