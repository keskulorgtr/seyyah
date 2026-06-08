"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Script from "next/script";
import "./ar-explore.css";

interface Country {
  id: number;
  name: string;
  nameEn: string | null;
  emoji: string | null;
}

interface Landmark {
  id: number;
  countryId: number;
  name: string;
  nameEn: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  modelUrl: string;
}

export default function ARExplorePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [loading, setLoading] = useState(true);
  const [landmarksLoading, setLandmarksLoading] = useState(false);
  const [arSupported, setArSupported] = useState<boolean | null>(null);
  const [arActive, setArActive] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const modelViewerRef = useRef<HTMLElement | null>(null);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/ar/countries");
        if (res.ok) {
          const data = await res.json();
          setCountries(data);
          if (data.length > 0) {
            setSelectedCountry(data[0]);
          }
        }
      } catch {
        /* silent */
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  // Fetch landmarks when selected country changes
  const fetchLandmarks = useCallback(async (countryId: number) => {
    setLandmarksLoading(true);
    try {
      const res = await fetch(`/api/ar/landmarks?countryId=${countryId}`);
      if (res.ok) {
        const data = await res.json();
        setLandmarks(data);
      }
    } catch {
      /* silent */
    }
    setLandmarksLoading(false);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchLandmarks(selectedCountry.id);
    }
  }, [selectedCountry, fetchLandmarks]);

  // Check AR support & wire up model-viewer events when landmark selected
  useEffect(() => {
    if (!selectedLandmark) {
      setModelReady(false);
      setArActive(false);
      setArSupported(null);
      return;
    }

    // Wait a tick for DOM to render
    const timer = setTimeout(() => {
      const mv = document.getElementById("ar-model-viewer") as HTMLElement & {
        activateAR?: () => void;
        canActivateAR?: boolean;
      } | null;

      if (mv) {
        modelViewerRef.current = mv;

        // Listen for model load
        const onLoad = () => setModelReady(true);
        mv.addEventListener("load", onLoad);

        // Check AR support (model-viewer sets canActivateAR after load)
        const checkAR = () => {
          // model-viewer exposes canActivateAR property
          const canAR = (mv as unknown as { canActivateAR: boolean }).canActivateAR;
          setArSupported(canAR === true);
        };
        mv.addEventListener("load", checkAR);

        // Listen for AR status events
        const onArStatus = (event: Event) => {
          const detail = (event as CustomEvent).detail;
          if (detail?.status === "session-started") {
            setArActive(true);
          } else if (detail?.status === "not-presenting") {
            setArActive(false);
          }
        };
        mv.addEventListener("ar-status", onArStatus);

        return () => {
          mv.removeEventListener("load", onLoad);
          mv.removeEventListener("load", checkAR);
          mv.removeEventListener("ar-status", onArStatus);
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedLandmark]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setSelectedLandmark(null);
  };

  const handleLandmarkClick = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    setModelReady(false);
  };

  const closeViewer = () => {
    setSelectedLandmark(null);
    setModelReady(false);
    setArActive(false);
  };

  const launchAR = () => {
    const mv = modelViewerRef.current as HTMLElement & {
      activateAR?: () => void;
    } | null;

    if (mv?.activateAR) {
      mv.activateAR();
    }
  };

  if (loading) {
    return (
      <div className="ar-page">
        <div className="ar-loading">
          <div className="ar-loading__spinner" />
          <span className="ar-loading__text">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ar-page">
      {/* model-viewer web component script */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {/* ─── Top Bar ─── */}
      <header className="ar-topbar">
        <a href="/" className="ar-topbar__back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Geri
        </a>
        <span className="ar-topbar__title">Seyyah</span>
        <span className="ar-topbar__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
          3D / AR
        </span>
      </header>

      {/* ─── Hero Intro ─── */}
      <section className="ar-hero">
        <div className="ar-hero__icon">
          {/* Camera icon instead of 3D box */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
        <h1 className="ar-hero__title">
          Dünyayı <em>Kameranla</em> Keşfet
        </h1>
        <p className="ar-hero__desc">
          Bir yapıya dokun, kameranı aç ve tarihi yapıları odanın ortasında gerçek boyutlarıyla gör. Piramitleri salonunda, Tac Mahal&apos;i bahçende keşfet!
        </p>
      </section>

      {/* ─── Country Categories ─── */}
      {countries.length > 0 && (
        <section className="ar-countries">
          <div className="ar-countries__label">Ülke Seçin</div>
          <div className="ar-countries__scroll">
            {countries.map((country) => (
              <button
                key={country.id}
                className={`ar-country-chip ${selectedCountry?.id === country.id ? "ar-country-chip--active" : ""}`}
                onClick={() => handleCountryClick(country)}
              >
                {country.emoji && (
                  <span className="ar-country-chip__emoji">{country.emoji}</span>
                )}
                {country.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ─── Landmarks Grid ─── */}
      {selectedCountry && (
        <section className="ar-landmarks">
          <div className="ar-landmarks__header">
            <h2 className="ar-landmarks__title">
              {selectedCountry.emoji} {selectedCountry.name}
            </h2>
            <span className="ar-landmarks__count">
              {landmarks.length} yapı
            </span>
          </div>

          {landmarksLoading ? (
            <div className="ar-loading">
              <div className="ar-loading__spinner" />
              <span className="ar-loading__text">Yapılar yükleniyor...</span>
            </div>
          ) : landmarks.length === 0 ? (
            <div className="ar-empty">
              <div className="ar-empty__icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <h3 className="ar-empty__title">Henüz yapı eklenmemiş</h3>
              <p className="ar-empty__desc">Bu ülke için yakında 3D modeller eklenecek.</p>
            </div>
          ) : (
            <div className="ar-landmarks__grid">
              {landmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className="ar-landmark-card"
                  onClick={() => handleLandmarkClick(landmark)}
                >
                  <div className="ar-landmark-card__thumb">
                    {landmark.thumbnailUrl ? (
                      <img src={landmark.thumbnailUrl} alt={landmark.name} />
                    ) : (
                      <span className="ar-landmark-card__placeholder">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                      </span>
                    )}
                    {/* AR camera badge */}
                    <div className="ar-landmark-card__ar-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ar-landmark-card__body">
                    <h3 className="ar-landmark-card__name">{landmark.name}</h3>
                    {landmark.description && (
                      <p className="ar-landmark-card__desc">{landmark.description}</p>
                    )}
                    <div className="ar-landmark-card__tap-hint">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                      Dokun → Kamerada Gör
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ─── Empty State when no countries ─── */}
      {countries.length === 0 && !loading && (
        <div className="ar-empty">
          <div className="ar-empty__icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h3 className="ar-empty__title">Yakında burada</h3>
          <p className="ar-empty__desc">3D yapılar ve AR deneyimleri yakında eklenecek.</p>
        </div>
      )}

      {/* ─── AR Launch Fullscreen Overlay ─── */}
      {selectedLandmark && (
        <div className="ar-launch-overlay">
          {/* Close / Back button */}
          <button className="ar-launch__close" onClick={closeViewer}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Hidden model-viewer — only exists to facilitate AR */}
          <div className="ar-launch__model-container">
            {/* @ts-expect-error model-viewer is a web component not recognized by React types */}
            <model-viewer
              id="ar-model-viewer"
              src={selectedLandmark.modelUrl}
              alt={selectedLandmark.name}
              auto-rotate
              camera-controls
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              shadow-intensity="1"
              environment-image="neutral"
              touch-action="pan-y"
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            >
              {/* Custom AR button — hidden, triggered programmatically */}
              <button
                slot="ar-button"
                style={{ display: "none" }}
              />
            {/* @ts-expect-error model-viewer is a web component */}
            </model-viewer>
          </div>

          {/* AR Launch Content */}
          <div className="ar-launch__content">
            {/* Animated camera icon */}
            <div className="ar-launch__camera-ring">
              <div className="ar-launch__camera-ring-pulse" />
              <div className="ar-launch__camera-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            </div>

            <h2 className="ar-launch__title">{selectedLandmark.name}</h2>
            {selectedLandmark.description && (
              <p className="ar-launch__desc">{selectedLandmark.description}</p>
            )}

            {/* Big AR Launch Button */}
            <button
              className="ar-launch__button"
              onClick={launchAR}
              disabled={!modelReady}
            >
              {!modelReady ? (
                <>
                  <div className="ar-launch__button-spinner" />
                  Model Hazırlanıyor...
                </>
              ) : (
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  KAMERAYI AÇ — Odanda Gör
                </>
              )}
            </button>

            {arSupported === false && (
              <div className="ar-launch__fallback">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>
                  Bu cihaz AR desteklemiyor. 3D modeli yukarıda döndürerek inceleyebilirsin.
                </span>
              </div>
            )}

            <p className="ar-launch__hint">
              {arSupported === false
                ? "Modeli döndürmek için sürükle • Yakınlaştırmak için iki parmakla kıstır"
                : "Kameranı düz bir yüzeye doğrult • Model otomatik olarak yerleşecek"
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
