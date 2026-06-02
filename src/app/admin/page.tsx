"use client";

import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "seyyah2026";

interface RequestItem {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  reservationDate: string;
  destination: string;
  pax: number;
  status: string;
  createdAt: string;
}

const STATUS_OPTIONS = ["Yeni", "İletişime Geçildi", "Onaylandı", "İptal"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      fetchRequests();
    } else {
      setError("Yanlış parola.");
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/requests");
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch {
      /* silent */
    }
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      // Optimistic update
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );

      const res = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
        // Revert on failure
        fetchRequests();
        alert("Durum güncellenemedi.");
      }
    } catch {
      fetchRequests();
    }
  };

  const exportToCSV = () => {
    if (requests.length === 0) return;

    const headers = ["ID", "İsim Soyisim", "E-posta", "Telefon", "Ülke", "Tarih", "Kişi", "Durum", "Oluşturulma"];
    const csvContent = [
      headers.join(","),
      ...requests.map(req => {
        return [
          req.id,
          `"${req.fullName}"`,
          `"${req.email || ""}"`,
          `"${req.phone || ""}"`,
          `"${req.destination}"`,
          req.reservationDate,
          req.pax,
          `"${req.status || "Yeni"}"`,
          `"${new Date(req.createdAt).toLocaleString('tr-TR')}"`
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" }); // UTF-8 BOM
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `seyyah_talepler_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#151518] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="w-10 h-10 border border-brand-turquoise rotate-45 mx-auto mb-6" />
            <h1 className="font-serif text-3xl text-white mb-2">Admin Panel</h1>
            <p className="font-sans text-xs text-white/40 tracking-widest uppercase">Seyyah Travel</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parola"
              className="bg-white/5 border border-white/10 px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors w-full"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
            <button
              type="submit"
              className="bg-brand-turquoise text-brand-anthracite font-sans text-xs tracking-[0.2em] font-bold py-4 hover:bg-white transition-colors"
            >
              GİRİŞ YAP
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#151518] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="font-serif text-4xl text-white mb-2">Yönetim Paneli</h1>
            <p className="font-sans text-sm text-brand-turquoise tracking-widest uppercase">Gelen Talepler</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-white/40 text-sm font-sans mr-4">
              Toplam: {requests.length} talep
            </div>
            <button
              onClick={fetchRequests}
              className="text-brand-turquoise text-xs font-sans tracking-widest uppercase border border-brand-turquoise/30 px-4 py-2 hover:bg-brand-turquoise hover:text-brand-anthracite transition-colors"
            >
              Yenile
            </button>
            <button
              onClick={exportToCSV}
              className="text-white text-xs font-sans tracking-widest uppercase border border-white/30 px-4 py-2 hover:bg-white hover:text-brand-anthracite transition-colors"
            >
              CSV İndir
            </button>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 text-xs text-white/50 uppercase tracking-wider bg-white/5">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">İsim Soyisim</th>
                  <th className="px-6 py-4">E-posta</th>
                  <th className="px-6 py-4">Telefon</th>
                  <th className="px-6 py-4">Ülke</th>
                  <th className="px-6 py-4">Tarih / Kişi</th>
                  <th className="px-6 py-4">Durum</th>
                  <th className="px-6 py-4">Oluşturulma</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/80">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-white/40">Yükleniyor...</td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-white/40">Henüz talep bulunmuyor.</td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white/40">#{req.id}</td>
                      <td className="px-6 py-4 font-medium">{req.fullName}</td>
                      <td className="px-6 py-4 text-white/60">{req.email || "—"}</td>
                      <td className="px-6 py-4 text-white/60">{req.phone || "—"}</td>
                      <td className="px-6 py-4 text-brand-turquoise">{req.destination}</td>
                      <td className="px-6 py-4">
                        {req.reservationDate} <br/>
                        <span className="text-xs text-white/40">{req.pax} Kişi</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={req.status || "Yeni"}
                          onChange={(e) => updateStatus(req.id, e.target.value)}
                          className={`bg-brand-anthracite border border-white/20 text-xs py-1.5 px-2 rounded focus:outline-none focus:border-brand-turquoise transition-colors cursor-pointer ${
                            req.status === 'Onaylandı' ? 'text-green-400 border-green-400/30' : 
                            req.status === 'İptal' ? 'text-red-400 border-red-400/30' :
                            req.status === 'İletişime Geçildi' ? 'text-brand-gold border-brand-gold/30' : 'text-white'
                          }`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-white/50 text-xs">{new Date(req.createdAt).toLocaleString('tr-TR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
