"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

type Booking = { id: string; name: string; email: string; phone: string; pickup: string; dropoff: string; pickupAt: string; vehicle: string; passengers: number; serviceType: string; status: string; createdAt: string };
const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

export function AdminDashboard({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState(initial);
  const [error, setError] = useState("");
  async function update(id: string, status: string) {
    setError("");
    const response = await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error ?? "Booking could not be updated.");
      return;
    }
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
  }
  async function logout() {
    const response = await fetch("/api/admin/logout", { method: "POST" });
    if (response.ok) window.location.assign("/admin/login");
    else setError("Sign out failed. Please try again.");
  }
  return <section className="admin-shell"><div className="admin-header"><div><span className="eyebrow">Maison Motor · Team access</span><h1>Booking requests</h1><p>Review and update your most recent ride requests.</p></div><button className="button button-dark" onClick={logout}>Sign out <LogOut size={14} /></button></div>{error && <p className="form-error" role="alert">{error}</p>}{bookings.length === 0 ? <p>No booking requests yet.</p> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Guest</th><th>Journey</th><th>Pickup</th><th>Vehicle</th><th>Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id}><td>{booking.name}<br /><a href={`mailto:${booking.email}`}>{booking.email}</a><br />{booking.phone}</td><td>{booking.pickup}<br />to {booking.dropoff}</td><td>{new Date(booking.pickupAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Chicago" })}</td><td>{booking.vehicle}<br />{booking.passengers} passenger(s)</td><td><select aria-label={`Update status for ${booking.name}`} value={booking.status} onChange={(event) => update(booking.id, event.target.value)}>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div>}</section>;
}
