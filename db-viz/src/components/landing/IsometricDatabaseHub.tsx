'use client';

import React from 'react';

/**
 * 3D Isometric Database Hub Scene (Static & Crystal-Clear)
 * Inspired directly by NexDash's 3D isometric autonomous carrier depot illustration.
 * Custom crafted for database concepts:
 * - Elevated matte-black network roadways / query tracks with beveled 3D edges & soft ground shadows
 * - Autonomous "Data Carriers" with elongated trailers and prominent, high-contrast, perfectly readable "SCHEMA VIEW" signboards
 * - Multi-tiered architectural Database Depot with stepped dark platforms
 * - Luminous mint-green relational core basin with holographic database oracle sphere & orbiting rings
 * - Clustered matte-black server rack monoliths with green status lines
 * - Completely static (no hover tilt, no continuous movement) for 100% stability, crispness, and readability
 */
export default function IsometricDatabaseHub() {
  return (
    <div className="relative w-full max-w-[1050px] mx-auto select-none pointer-events-none">
      <div className="w-full">
        <svg
          viewBox="0 0 1000 580"
          width="100%"
          height="auto"
          className="w-full h-auto overflow-hidden lg:overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Ambient Ground Shadow Filter */}
            <filter id="ground-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.027   0 0 0 0 0.067   0 0 0 0 0.043  0 0 0 0.22 0" />
              <feOffset dx="0" dy="16" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>

            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.03   0 0 0 0 0.07   0 0 0 0 0.05  0 0 0 0.18 0" />
              <feOffset dx="-2" dy="8" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>

            {/* Glowing Mint Green Gradient for the Relational Core Basin */}
            <radialGradient id="mint-basin-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#a7f3d0" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#6ee7b7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.5" />
            </radialGradient>

            {/* Dark Metallic Platform Gradients */}
            <linearGradient id="road-surface" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a332d" />
              <stop offset="50%" stopColor="#202723" />
              <stop offset="100%" stopColor="#171d19" />
            </linearGradient>

            <linearGradient id="road-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141815" />
              <stop offset="100%" stopColor="#0a0d0b" />
            </linearGradient>

            <linearGradient id="server-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38433c" />
              <stop offset="100%" stopColor="#252d28" />
            </linearGradient>

            <linearGradient id="server-side-left" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#151a17" />
              <stop offset="100%" stopColor="#101412" />
            </linearGradient>

            <linearGradient id="server-side-right" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1d2420" />
              <stop offset="100%" stopColor="#121714" />
            </linearGradient>

            <linearGradient id="carrier-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c3530" />
              <stop offset="50%" stopColor="#1e2421" />
              <stop offset="100%" stopColor="#131715" />
            </linearGradient>
          </defs>

          {/* ══════════════════════════════════════════════════
              LAYER 1: GROUND DROP SHADOWS
              Cast shadows onto the #f3f5f4 background
              ══════════════════════════════════════════════════ */}
          <g opacity="0.32">
            {/* Shadow under main foreground track */}
            <polygon
              points="280,560 620,380 660,390 320,575"
              fill="#07110b"
              filter="url(#ground-shadow)"
            />
            {/* Shadow under platform depot */}
            <polygon
              points="530,370 760,240 980,330 750,465"
              fill="#07110b"
              filter="url(#ground-shadow)"
            />
            {/* Shadow under upper branch track */}
            <polygon
              points="750,330 960,225 1010,240 800,345"
              fill="#07110b"
              filter="url(#ground-shadow)"
            />
            {/* Shadow under server towers */}
            <ellipse cx="650" cy="350" rx="90" ry="35" fill="#07110b" filter="url(#ground-shadow)" />
            {/* Shadow under front carrier */}
            <ellipse cx="420" cy="515" rx="88" ry="24" fill="#07110b" filter="url(#ground-shadow)" />
          </g>

          {/* ══════════════════════════════════════════════════
              LAYER 2: NETWORK TRACKS & ROADWAYS (Isometric)
              Dark matte lanes carrying data shuttles
              ══════════════════════════════════════════════════ */}
          <g>
            {/* Main Foreground Elevated Track (Side Bevel / Thickness) */}
            <polygon
              points="300,540 610,360 610,374 300,554"
              fill="url(#road-bevel)"
            />
            <polygon
              points="300,554 440,473 440,460 300,540"
              fill="#0d110f"
            />

            {/* Main Foreground Elevated Track (Top Surface) */}
            <polygon
              points="300,540 610,360 680,400 370,580"
              fill="url(#road-surface)"
              stroke="#313d36"
              strokeWidth="1"
            />

            {/* Track Center Guidance Line */}
            <path
              d="M 335 560 L 645 380"
              stroke="#38AA78"
              strokeWidth="2.5"
              strokeDasharray="14 10"
              opacity="0.7"
            />

            {/* Branching Junction to Central Depot */}
            <polygon
              points="550,395 690,314 740,343 600,424"
              fill="url(#road-surface)"
              stroke="#2e3a33"
              strokeWidth="0.8"
            />

            {/* Upper Highway Track (heading to top-right) */}
            <polygon
              points="820,300 990,202 1000,208 830,306"
              fill="url(#road-bevel)"
            />
            <polygon
              points="780,323 990,202 1030,225 820,346"
              fill="url(#road-surface)"
              stroke="#313d36"
              strokeWidth="0.8"
            />
            <path
              d="M 800 334 L 1010 213"
              stroke="#57C258"
              strokeWidth="1.5"
              strokeDasharray="10 8"
              opacity="0.6"
            />
          </g>

          {/* ══════════════════════════════════════════════════
              LAYER 3: MULTI-TIERED ARCHITECTURAL DEPOT
              Stepped concentric dark platforms + glowing basin
              ══════════════════════════════════════════════════ */}
          <g>
            {/* Base Tier 1: Outer Dark Stepped Foundation */}
            <polygon
              points="540,360 760,230 960,320 740,450"
              fill="url(#road-bevel)"
            />
            <polygon
              points="540,352 760,222 960,312 740,442"
              fill="#18201b"
              stroke="#2d3a32"
              strokeWidth="1.2"
            />

            {/* Tier 2: Mid Platform */}
            <polygon
              points="580,350 750,250 910,322 740,422"
              fill="#0f1411"
            />
            <polygon
              points="580,342 750,242 910,314 740,414"
              fill="#222b25"
              stroke="#344339"
              strokeWidth="1"
            />

            {/* Tier 3: Inner Inset Frame */}
            <polygon
              points="630,345 745,278 860,328 745,395"
              fill="#0b0e0c"
            />

            {/* Central Recessed Mint-Green Data Basin */}
            <polygon
              points="640,342 745,282 850,326 745,386"
              fill="url(#mint-basin-glow)"
              stroke="#a7f3d0"
              strokeWidth="1.5"
            />

            {/* Inner Basin Refraction Rings */}
            <polygon
              points="660,342 745,294 830,326 745,374"
              fill="none"
              stroke="#38AA78"
              strokeWidth="1"
              strokeDasharray="6 4"
              opacity="0.4"
            />

            {/* ── Central Relational Core Totem (Sculptural Database Node) ── */}
            <g transform="translate(745, 335)">
              {/* Core Pedestal Shadow */}
              <ellipse cx="0" cy="18" rx="28" ry="12" fill="#041c15" opacity="0.4" />

              {/* Sculpted 3D Obsidian Relational Core */}
              {/* Lower Tier */}
              <ellipse cx="0" cy="12" rx="24" ry="10" fill="#121814" stroke="#2a3830" strokeWidth="1" />
              <path d="M -24 6 C -24 12 24 12 24 6 L 24 12 C 24 18 -24 18 -24 12 Z" fill="#18221c" />
              <ellipse cx="0" cy="6" rx="24" ry="10" fill="#24322a" stroke="#3d5244" strokeWidth="1" />

              {/* Mid Tier */}
              <path d="M -18 -4 C -18 2 18 2 18 -4 L 18 4 C 18 10 -18 10 -18 4 Z" fill="#1b2620" />
              <ellipse cx="0" cy="-4" rx="18" ry="8" fill="#2e3f35" stroke="#486352" strokeWidth="1" />

              {/* Top Tier with Database Oracle Sphere */}
              <circle cx="0" cy="-18" r="13" fill="#0e1411" stroke="#38AA78" strokeWidth="2" />
              <ellipse cx="-3" cy="-21" rx="4" ry="2" fill="#86efac" opacity="0.8" />

              {/* Orbiting Relational Rings */}
              <ellipse
                cx="0"
                cy="-18"
                rx="28"
                ry="8"
                fill="none"
                stroke="#57C258"
                strokeWidth="1.5"
                transform="rotate(-25 0 -18)"
                strokeDasharray="12 6"
                opacity="0.85"
              />
              <ellipse
                cx="0"
                cy="-18"
                rx="24"
                ry="7"
                fill="none"
                stroke="#38AA78"
                strokeWidth="1.2"
                transform="rotate(35 0 -18)"
                strokeDasharray="8 6"
                opacity="0.7"
              />

              {/* Central Core Beacon */}
              <circle cx="0" cy="-18" r="3.5" fill="#57C258" opacity="0.9" />
            </g>
          </g>

          {/* ══════════════════════════════════════════════════
              LAYER 4: ISOMETRIC DATABASE SERVER MONOLITHS
              Matte-black server rack blocks with green status lines
              ══════════════════════════════════════════════════ */}
          <g>
            {/* ── Server Tower 1 (Tall Main Tower) ── */}
            <g transform="translate(620, 250)">
              <polygon points="0,60 45,86 45,156 0,130" fill="url(#server-side-left)" />
              <polygon points="45,86 100,54 100,124 45,156" fill="url(#server-side-right)" />
              <polygon points="0,60 55,28 100,54 45,86" fill="url(#server-top)" stroke="#4a5950" strokeWidth="0.8" />
              {/* Server Bays */}
              <line x1="48" y1="98" x2="97" y2="70" stroke="#0a0d0b" strokeWidth="1.5" />
              <line x1="48" y1="112" x2="97" y2="84" stroke="#0a0d0b" strokeWidth="1.5" />
              <line x1="48" y1="126" x2="97" y2="98" stroke="#0a0d0b" strokeWidth="1.5" />
              <line x1="48" y1="140" x2="97" y2="112" stroke="#0a0d0b" strokeWidth="1.5" />
              {/* Vertical LED Strips */}
              <line x1="52" y1="92" x2="52" y2="148" stroke="#38AA78" strokeWidth="1.5" opacity="0.9" />
              <circle cx="52" cy="100" r="1.5" fill="#57C258" />
              <circle cx="52" cy="115" r="1.5" fill="#57C258" />
              <circle cx="52" cy="130" r="1.5" fill="#57C258" />
            </g>

            {/* ── Server Tower 2 (Medium Front Block) ── */}
            <g transform="translate(635, 305)">
              <polygon points="0,40 38,62 38,112 0,90" fill="url(#server-side-left)" />
              <polygon points="38,62 82,37 82,87 38,112" fill="url(#server-side-right)" />
              <polygon points="0,40 44,15 82,37 38,62" fill="url(#server-top)" stroke="#4a5950" strokeWidth="0.8" />
              <line x1="41" y1="72" x2="79" y2="50" stroke="#0e1411" strokeWidth="1.2" />
              <line x1="41" y1="84" x2="79" y2="62" stroke="#0e1411" strokeWidth="1.2" />
              <line x1="41" y1="96" x2="79" y2="74" stroke="#0e1411" strokeWidth="1.2" />
              <circle cx="44" cy="74" r="1.5" fill="#38AA78" />
              <circle cx="44" cy="86" r="1.5" fill="#57C258" />
            </g>

            {/* ── Server Tower 3 (Back Monolith) ── */}
            <g transform="translate(590, 240)">
              <polygon points="0,35 30,52 30,102 0,85" fill="#121714" />
              <polygon points="30,52 65,32 65,82 30,102" fill="#19201c" />
              <polygon points="0,35 35,15 65,32 30,52" fill="#303b34" stroke="#4a5950" strokeWidth="0.7" />
            </g>

            {/* ── High-Density Storage Tower (Slender Right Pillar) ── */}
            <g transform="translate(810, 270)">
              <polygon points="0,30 20,42 20,92 0,80" fill="url(#server-side-left)" />
              <polygon points="20,42 42,29 42,79 20,92" fill="url(#server-side-right)" />
              <polygon points="0,30 22,17 42,29 20,42" fill="url(#server-top)" stroke="#4a5950" strokeWidth="0.7" />
              <line x1="20" y1="42" x2="20" y2="92" stroke="#38AA78" strokeWidth="1.2" opacity="0.8" />
            </g>
          </g>

          {/* ══════════════════════════════════════════════════
              LAYER 5: AUTONOMOUS DATA CARRIERS (Static & Crisp)
              Featuring clear, high-contrast, perfectly readable
              "SCHEMA VIEW" side boards like the NexDash truck
              ══════════════════════════════════════════════════ */}

          {/* ── FOREGROUND HERO CARRIER ── */}
          <g>
            {/* Carrier Contact Ground Shadow */}
            <ellipse cx="430" cy="510" rx="95" ry="25" fill="#07110b" opacity="0.38" filter="url(#soft-shadow)" />

            {/* Autonomous Data Carrier Body */}
            <g transform="translate(325, 410)">
              {/* --- Lower Chassis / Undercarriage --- */}
              <polygon points="0,65 130,-10 185,22 40,92" fill="#0a0e0c" />
              <polygon points="0,65 40,92 40,98 0,71" fill="#050706" />
              <polygon points="40,92 185,22 185,28 40,98" fill="#0c100d" />

              {/* Aerodynamic Front Cab */}
              <polygon points="0,48 40,71 40,92 0,65" fill="#181f1b" />
              <polygon points="40,71 75,51 75,72 40,92" fill="#222b26" />
              <polygon points="0,48 35,28 75,51 40,71" fill="#2e3831" stroke="#3f4d44" strokeWidth="0.8" />
              {/* Dark Autonomous Visor */}
              <polygon points="10,48 35,34 55,46 30,60" fill="#050807" stroke="#38AA78" strokeWidth="0.8" />

              {/* --- Main Server Container / Database Cargo Body (Elongated Trailer) --- */}
              <polygon points="35,28 35,-15 145,-78 145,-35" fill="#131916" />
              <polygon points="40,71 40,15 185,-68 185,-12" fill="url(#carrier-body)" stroke="#2f3b33" strokeWidth="0.8" />
              <polygon points="35,-15 75,-38 185,-68 145,-78" fill="#313d35" stroke="#495a4f" strokeWidth="0.9" />

              {/* ════ PROMINENT HIGH-CONTRAST SIDE BOARD ════ */}
              {/* Dedicated Recessed Signboard Panel on Trailer Side */}
              <polygon
                points="48,22 176,-51 176,-11 48,62"
                fill="#070b09"
                stroke="#324238"
                strokeWidth="1.2"
              />

              {/* Crisp, Bold, Crystal-Clear Signboard Content */}
              <g transform="translate(54, 46) skewY(-29.8)">
                {/* Green 4-layer Stacked Schema View Logo Mark */}
                <g transform="translate(3, -13) scale(0.15)" fill="none" stroke="#57C258" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 50 21.5 L 92 32.9 L 50 44.3 L 8 32.9 Z" />
                  <path d="M 29 38.6 L 8 44.3 L 50 55.7 L 92 44.3 L 71 38.6" />
                  <path d="M 29 50.0 L 8 55.7 L 50 67.1 L 92 55.7 L 71 50.0" />
                  <path d="M 29 61.4 L 8 67.1 L 50 78.5 L 92 67.1 L 71 61.4" />
                </g>

                {/* Highly Readable White Text: SCHEMA VIEW */}
                <text
                  x="26"
                  y="-3"
                  fill="#FFFFFF"
                  fontSize="13.5"
                  fontWeight="900"
                  fontFamily="'DM Sans', sans-serif"
                  letterSpacing="0.09em"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                >
                  SCHEMA VIEW
                </text>
              </g>

              {/* Front Autonomous Light Bar */}
              <line x1="42" y1="88" x2="68" y2="73" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>

          {/* ── SECONDARY DATA CARRIER (Distant, on Upper Highway Track) ── */}
          <g>
            {/* Distant Carrier Shadow */}
            <ellipse cx="895" cy="285" rx="52" ry="14" fill="#07110b" opacity="0.32" filter="url(#soft-shadow)" />

            {/* Distant Autonomous Carrier (Static & Clean) */}
            <g transform="translate(835, 225) scale(0.64)">
              <polygon points="0,65 130,-10 185,22 40,92" fill="#0a0e0c" />
              <polygon points="0,48 40,71 40,92 0,65" fill="#181f1b" />
              <polygon points="40,71 75,51 75,72 40,92" fill="#222b26" />
              <polygon points="0,48 35,28 75,51 40,71" fill="#2e3831" />
              <polygon points="40,71 40,15 185,-68 185,-12" fill="#1b221e" stroke="#313d35" strokeWidth="1" />
              <polygon points="35,-15 75,-38 185,-68 145,-78" fill="#313d35" />

              {/* Recessed Signboard */}
              <polygon
                points="48,22 176,-51 176,-11 48,62"
                fill="#070b09"
                stroke="#324238"
                strokeWidth="1.2"
              />

              {/* Crisp Readable Logo & Text */}
              <g transform="translate(54, 46) skewY(-29.8)">
                {/* Green 4-layer Stacked Schema View Logo Mark */}
                <g transform="translate(3, -13) scale(0.15)" fill="none" stroke="#57C258" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 50 21.5 L 92 32.9 L 50 44.3 L 8 32.9 Z" />
                  <path d="M 29 38.6 L 8 44.3 L 50 55.7 L 92 44.3 L 71 38.6" />
                  <path d="M 29 50.0 L 8 55.7 L 50 67.1 L 92 55.7 L 71 50.0" />
                  <path d="M 29 61.4 L 8 67.1 L 50 78.5 L 92 67.1 L 71 61.4" />
                </g>
                <text
                  x="26"
                  y="-3"
                  fill="#FFFFFF"
                  fontSize="13.5"
                  fontWeight="900"
                  fontFamily="'DM Sans', sans-serif"
                  letterSpacing="0.09em"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
                >
                  SCHEMA VIEW
                </text>
              </g>

              {/* Front Light */}
              <line x1="42" y1="88" x2="68" y2="73" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
