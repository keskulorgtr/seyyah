"use client";

import { useState, useEffect, useRef } from "react";

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

interface ARCountry {
  id: number;
  name: string;
  nameEn: string | null;
  emoji: string | null;
  sortOrder: number;
}

interface ARLandmark {
  id: number;
  countryId: number;
  name: string;
  nameEn: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  modelUrl: string;
  sortOrder: number;
}

const STATUS_OPTIONS = ["Yeni", "İletişime Geçildi", "Onaylandı", "İptal"];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"requests" | "ar">("requests");

  // ── Request state ──
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(false);

  // ── AR state ──
  const [arCountries, setArCountries] = useState<ARCountry[]>([]);
  const [arLandmarks, setArLandmarks] = useState<ARLandmark[]>([]);
  const [selectedArCountry, setSelectedArCountry] = useState<ARCountry | null>(null);
  const [arLoading, setArLoading] = useState(false);
  const [arLandmarksLoading, setArLandmarksLoading] = useState(false);

  // ── AR Forms ──
  const [newCountryName, setNewCountryName] = useState("");
  const [newCountryNameEn, setNewCountryNameEn] = useState("");
  const [newCountryEmoji, setNewCountryEmoji] = useState("");
  const [newLandmarkName, setNewLandmarkName] = useState("");
  const [newLandmarkNameEn, setNewLandmarkNameEn] = useState("");
  const [newLandmarkDesc, setNewLandmarkDesc] = useState("");
  const [newLandmarkThumb, setNewLandmarkThumb] = useState("");
  const [uploadingModel, setUploadingModel] = useState(false);
  const [uploadedModelUrl, setUploadedModelUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // ══════════════════════════════
  // REQUEST FUNCTIONS
  // ══════════════════════════════

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
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );

      const res = await fetch("/api/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!res.ok) {
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

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `seyyah_talepler_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ══════════════════════════════
  // AR FUNCTIONS
  // ══════════════════════════════

  const fetchArCountries = async () => {
    setArLoading(true);
    try {
      const res = await fetch("/api/ar/countries");
      if (res.ok) {
        const data = await res.json();
        setArCountries(data);
        if (data.length > 0 && !selectedArCountry) {
          setSelectedArCountry(data[0]);
        }
      }
    } catch {
      /* silent */
    }
    setArLoading(false);
  };

  const fetchArLandmarks = async (countryId: number) => {
    setArLandmarksLoading(true);
    try {
      const res = await fetch(`/api/ar/landmarks?countryId=${countryId}`);
      if (res.ok) {
        const data = await res.json();
        setArLandmarks(data);
      }
    } catch {
      /* silent */
    }
    setArLandmarksLoading(false);
  };

  useEffect(() => {
    if (authenticated && activeTab === "ar") {
      fetchArCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, activeTab]);

  useEffect(() => {
    if (selectedArCountry) {
      fetchArLandmarks(selectedArCountry.id);
    }
  }, [selectedArCountry]);

  const addCountry = async () => {
    if (!newCountryName.trim()) return;
    try {
      const res = await fetch("/api/ar/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCountryName, nameEn: newCountryNameEn, emoji: newCountryEmoji }),
      });
      if (res.ok) {
        setNewCountryName("");
        setNewCountryNameEn("");
        setNewCountryEmoji("");
        fetchArCountries();
      }
    } catch {
      alert("Ülke eklenemedi.");
    }
  };

  const deleteCountry = async (id: number) => {
    if (!confirm("Bu ülke ve tüm yapıları silinecek. Emin misiniz?")) return;
    try {
      const res = await fetch(`/api/ar/countries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedArCountry?.id === id) {
          setSelectedArCountry(null);
          setArLandmarks([]);
        }
        fetchArCountries();
      }
    } catch {
      alert("Ülke silinemedi.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingModel(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/ar/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setUploadedModelUrl(data.url);
      } else {
        alert("Dosya yüklenemedi.");
      }
    } catch {
      alert("Dosya yükleme hatası.");
    }
    setUploadingModel(false);
  };

  const addLandmark = async () => {
    if (!selectedArCountry || !newLandmarkName.trim() || !uploadedModelUrl) {
      alert("Yapı adı ve .glb model dosyası zorunludur.");
      return;
    }
    try {
      const res = await fetch("/api/ar/landmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryId: selectedArCountry.id,
          name: newLandmarkName,
          nameEn: newLandmarkNameEn,
          description: newLandmarkDesc,
          thumbnailUrl: newLandmarkThumb,
          modelUrl: uploadedModelUrl,
        }),
      });
      if (res.ok) {
        setNewLandmarkName("");
        setNewLandmarkNameEn("");
        setNewLandmarkDesc("");
        setNewLandmarkThumb("");
        setUploadedModelUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchArLandmarks(selectedArCountry.id);
      }
    } catch {
      alert("Yapı eklenemedi.");
    }
  };

  const deleteLandmark = async (id: number) => {
    if (!confirm("Bu yapı silinecek. Emin misiniz?")) return;
    try {
      const res = await fetch(`/api/ar/landmarks?id=${id}`, { method: "DELETE" });
      if (res.ok && selectedArCountry) {
        fetchArLandmarks(selectedArCountry.id);
      }
    } catch {
      alert("Yapı silinemedi.");
    }
  };

  // ══════════════════════════════
  // LOGIN SCREEN
  // ══════════════════════════════

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

  // ══════════════════════════════
  // MAIN ADMIN PANEL
  // ══════════════════════════════

  return (
    <main className="min-h-screen bg-[#151518] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <h1 className="font-serif text-4xl text-white mb-2">Yönetim Paneli</h1>
            <p className="font-sans text-sm text-brand-turquoise tracking-widest uppercase">Seyyah Travel</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab("requests")}
            className={`font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-all ${
              activeTab === "requests"
                ? "bg-brand-turquoise text-brand-anthracite font-bold"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            Gelen Talepler
          </button>
          <button
            onClick={() => setActiveTab("ar")}
            className={`font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "ar"
                ? "bg-brand-turquoise text-brand-anthracite font-bold"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            AR / 3D Yönetimi
          </button>
        </div>

        {/* ════════════════════════════════════════ */}
        {/* TAB 1: GELEN TALEPLER                   */}
        {/* ════════════════════════════════════════ */}
        {activeTab === "requests" && (
          <>
            <div className="flex items-center gap-4 flex-wrap mb-6">
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
          </>
        )}

        {/* ════════════════════════════════════════ */}
        {/* TAB 2: AR / 3D YÖNETİMİ                */}
        {/* ════════════════════════════════════════ */}
        {activeTab === "ar" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left: Country Management ── */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="font-serif text-xl text-white mb-1">Ülkeler</h2>
                <p className="text-xs text-white/40 mb-6">Ülke kategorileri ekle / düzenle</p>

                {/* Add Country Form */}
                <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-white/10">
                  <input
                    type="text"
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                    placeholder="Ülke adı (Türkçe) *"
                    className="bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg"
                  />
                  <input
                    type="text"
                    value={newCountryNameEn}
                    onChange={(e) => setNewCountryNameEn(e.target.value)}
                    placeholder="Ülke adı (English)"
                    className="bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCountryEmoji}
                      onChange={(e) => setNewCountryEmoji(e.target.value)}
                      placeholder="Emoji 🇹🇷"
                      className="bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg flex-1"
                    />
                    <button
                      onClick={addCountry}
                      className="bg-brand-turquoise text-brand-anthracite font-sans text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-white transition-colors whitespace-nowrap"
                    >
                      + Ekle
                    </button>
                  </div>
                </div>

                {/* Country List */}
                {arLoading ? (
                  <div className="text-center py-6 text-white/40 text-sm">Yükleniyor...</div>
                ) : arCountries.length === 0 ? (
                  <div className="text-center py-6 text-white/30 text-sm">Henüz ülke eklenmemiş.</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {arCountries.map((country) => (
                      <div
                        key={country.id}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
                          selectedArCountry?.id === country.id
                            ? "bg-brand-turquoise/15 border border-brand-turquoise/30"
                            : "bg-white/3 border border-transparent hover:bg-white/5"
                        }`}
                        onClick={() => setSelectedArCountry(country)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{country.emoji || "🌍"}</span>
                          <div>
                            <div className="text-sm text-white font-medium">{country.name}</div>
                            {country.nameEn && (
                              <div className="text-xs text-white/40">{country.nameEn}</div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCountry(country.id);
                          }}
                          className="text-red-400/60 hover:text-red-400 transition-colors p-1"
                          title="Ülkeyi sil"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Landmark Management ── */}
            <div className="lg:col-span-2">
              {!selectedArCountry ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-lg text-white/60 mb-2">Bir ülke seçin</h3>
                  <p className="text-xs text-white/30">Sol taraftan bir ülke seçerek yapıları yönetin.</p>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-serif text-xl text-white mb-1">
                        {selectedArCountry.emoji} {selectedArCountry.name} — Yapılar
                      </h2>
                      <p className="text-xs text-white/40">3D yapılar ekle / düzenle / sil</p>
                    </div>
                    <button
                      onClick={() => fetchArLandmarks(selectedArCountry.id)}
                      className="text-brand-turquoise text-xs font-sans tracking-widest uppercase border border-brand-turquoise/30 px-3 py-1.5 hover:bg-brand-turquoise hover:text-brand-anthracite transition-colors rounded-lg"
                    >
                      Yenile
                    </button>
                  </div>

                  {/* Add Landmark Form */}
                  <div className="bg-white/3 border border-white/8 rounded-xl p-5 mb-6">
                    <h3 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      Yeni Yapı Ekle
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <input
                        type="text"
                        value={newLandmarkName}
                        onChange={(e) => setNewLandmarkName(e.target.value)}
                        placeholder="Yapı adı (Türkçe) *"
                        className="bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg"
                      />
                      <input
                        type="text"
                        value={newLandmarkNameEn}
                        onChange={(e) => setNewLandmarkNameEn(e.target.value)}
                        placeholder="Yapı adı (English)"
                        className="bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg"
                      />
                    </div>
                    <textarea
                      value={newLandmarkDesc}
                      onChange={(e) => setNewLandmarkDesc(e.target.value)}
                      placeholder="Açıklama"
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg mb-3 resize-none"
                    />
                    <input
                      type="text"
                      value={newLandmarkThumb}
                      onChange={(e) => setNewLandmarkThumb(e.target.value)}
                      placeholder="Thumbnail URL (opsiyonel)"
                      className="w-full bg-white/5 border border-white/10 px-3 py-2.5 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-turquoise transition-colors rounded-lg mb-3"
                    />

                    {/* File Upload */}
                    <div className="flex items-center gap-3 mb-4">
                      <label
                        className={`flex-1 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                          uploadedModelUrl
                            ? "border-green-400/40 bg-green-400/5"
                            : "border-white/15 hover:border-brand-turquoise/40 bg-white/3"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".glb,.gltf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        {uploadingModel ? (
                          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                            <div className="w-4 h-4 border-2 border-brand-turquoise/30 border-t-brand-turquoise rounded-full animate-spin" />
                            Yükleniyor...
                          </div>
                        ) : uploadedModelUrl ? (
                          <div className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            Model yüklendi
                          </div>
                        ) : (
                          <div className="text-white/40 text-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-1">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            .glb dosyası seçin *
                          </div>
                        )}
                      </label>
                    </div>

                    <button
                      onClick={addLandmark}
                      disabled={!newLandmarkName.trim() || !uploadedModelUrl}
                      className="w-full bg-brand-turquoise text-brand-anthracite font-sans text-xs font-bold tracking-widest uppercase py-3 rounded-lg hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Yapı Ekle
                    </button>
                  </div>

                  {/* Landmarks List */}
                  {arLandmarksLoading ? (
                    <div className="text-center py-8 text-white/40 text-sm">Yükleniyor...</div>
                  ) : arLandmarks.length === 0 ? (
                    <div className="text-center py-8 text-white/30 text-sm">Bu ülke için henüz yapı eklenmemiş.</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {arLandmarks.map((landmark) => (
                        <div
                          key={landmark.id}
                          className="bg-white/3 border border-white/8 rounded-xl overflow-hidden group hover:border-white/15 transition-all"
                        >
                          {/* Thumbnail / Placeholder */}
                          <div className="h-32 bg-gradient-to-br from-brand-turquoise/10 to-brand-turquoise/3 flex items-center justify-center relative">
                            {landmark.thumbnailUrl ? (
                              <img
                                src={landmark.thumbnailUrl}
                                alt={landmark.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-turquoise/30">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                              </svg>
                            )}
                            {/* 3D badge */}
                            <div className="absolute top-2 right-2 bg-brand-turquoise/80 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur">
                              3D
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-white truncate">{landmark.name}</h4>
                                {landmark.nameEn && (
                                  <p className="text-xs text-white/40 truncate">{landmark.nameEn}</p>
                                )}
                                {landmark.description && (
                                  <p className="text-xs text-white/30 mt-1 line-clamp-2">{landmark.description}</p>
                                )}
                              </div>
                              <button
                                onClick={() => deleteLandmark(landmark.id)}
                                className="text-red-400/50 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                                title="Yapıyı sil"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-3 text-[10px] text-white/25 font-mono truncate">
                              {landmark.modelUrl}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
