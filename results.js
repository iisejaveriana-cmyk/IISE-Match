/* ============================================================
   IISE MATCH — Results Page Logic
   Renders personalized profile, recommendations, and route
   ============================================================ */

class ResultsPage {
  constructor() {
    this.results = null;
    this.recs = null;
    this._bindButtons();
  }

  _bindButtons() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this._share());
    }
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this._download());
    }
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        try { localStorage.removeItem('iise_match_answers'); } catch (e) { /* ignore */ }
        location.reload();
      });
    }
  }

  /* ── Main Render Entry ─── */
  render(results, recs) {
    this.results = results;
    this.recs = recs;

    // Show local mode notice if no Apps Script URL configured
    if (!CONFIG.APPS_SCRIPT_URL) {
      const notice = document.getElementById('local-notice');
      if (notice) notice.style.display = 'flex';
    }

    this._renderHeader(results);
    this._renderPrimaryProfile(results);
    this._renderSecondaryProfiles(results);
    this._renderInterests(results.topTags);
    this._renderRecommendations(recs.topRecommendations);
    this._renderRoute(recs.route);
  }

  /* ── Results Header ─── */
  _renderHeader(results) {
    const profile = results.topProfile;
    const pct = results.percentages[profile.code];
    const title = document.querySelector('.results-title');
    if (title) {
      title.innerHTML = `¡Eres un <span class="gradient-text">${profile.name}</span>!`;
    }
  }

  /* ── Primary Profile Card ─── */
  _renderPrimaryProfile(results) {
    const profile = results.topProfile;
    const pct = results.percentages[profile.code];
    const combined = results.combinedProfile;
    const container = document.getElementById('primary-profile');

    // Apply glow color based on profile
    container.style.setProperty('--profile-glow', `${profile.color}10`);
    container.style.setProperty('--profile-stroke', `${profile.color}40`);
    container.style.borderColor = `${profile.color}25`;

    let combinedHTML = '';
    if (combined) {
      combinedHTML = `
        <div class="combined-badge">
          ✨ Perfil combinado: ${combined.name}
        </div>
      `;
    }

    container.innerHTML = `
      <!-- SVG Ring -->
      <div class="profile-score">
        <svg viewBox="0 0 36 36" class="circular-chart" role="img" aria-label="${pct}% de afinidad">
          <path class="circle-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path class="circle"
            stroke="${profile.color}"
            stroke-dasharray="${pct}, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="19" class="percentage-text" fill="${profile.color}">
            <tspan id="main-pct">0</tspan>%
          </text>
        </svg>
      </div>

      <!-- Profile Info -->
      <div class="profile-info">
        <span class="profile-emoji-big">${profile.emoji}</span>
        <h1 class="profile-main-name">${profile.name}</h1>
        ${combinedHTML}
        <p class="profile-desc">
          ${combined ? combined.description : profile.description}
        </p>
      </div>
    `;

    // Animate percentage counter
    this._animateCounter('main-pct', 0, pct, 1800);
  }

  /* ── Secondary Profiles ─── */
  _renderSecondaryProfiles(results) {
    const container = document.getElementById('secondary-profiles');
    // Show all 8 profiles sorted by score, excluding the top one
    const sorted = Object.entries(results.percentages)
      .sort((a, b) => b[1] - a[1])
      .filter(([code]) => code !== results.topProfile.code)
      .slice(0, 4); // Top 4 secondary

    container.innerHTML = sorted.map(([code, pct]) => {
      const p = PROFILES[code];
      if (!p) return '';
      return `
        <div class="secondary-card" style="--card-color:${p.color}">
          <div class="secondary-card-left">
            <span class="secondary-emoji">${p.emoji}</span>
            <span class="secondary-name">${p.name}</span>
          </div>
          <span class="secondary-score" style="color:${p.color}">${pct}%</span>
        </div>
      `;
    }).join('');
  }

  /* ── Interests / Tags ─── */
  _renderInterests(tags) {
    const container = document.getElementById('tags-container');
    if (!tags || tags.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No se detectaron tags específicos.</p>';
      return;
    }
    container.innerHTML = tags.map(tag => `
      <span class="tag">${tag.replace(/_/g, ' ')}</span>
    `).join('');
  }

  /* ── Recommendations ─── */
  _renderRecommendations(recs) {
    const container = document.getElementById('recommendations-container');
    if (!recs || recs.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No hay actividades disponibles en el catálogo.</p>';
      return;
    }

    container.innerHTML = recs.map((act, i) => `
      <div class="rec-card" style="animation-delay:${i * 0.1}s">
        <div class="rec-header">
          <span class="rec-emoji">${act.emoji || '📌'}</span>
          <span class="rec-match">${act.compatibility}% match</span>
        </div>
        <h4>${act.nombre}</h4>
        <p class="rec-desc">${act.descripcion}</p>
        <div class="rec-meta">
          <span class="meta-tag">${act.tipo}</span>
          <span class="meta-tag">${act.modalidad}</span>
          <span class="meta-tag">${act.nivel}</span>
          <span class="meta-tag">${act.duracion}</span>
        </div>
      </div>
    `).join('');
  }

  /* ── Route Timeline ─── */
  _renderRoute(route) {
    const container = document.getElementById('route-container');
    if (!route || route.length === 0) {
      container.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">Ruta no disponible con las actividades actuales.</p>';
      return;
    }

    const stepIcons = ['🎓', '🔬', '🤝', '🚀'];

    container.innerHTML = route.map((step, i) => `
      <div class="route-step" style="animation: fadeInUp 0.5s ease forwards; animation-delay:${i * 0.15}s; opacity:0">
        <div class="step-number">${stepIcons[i] || (i + 1)}</div>
        <div class="step-content">
          <div class="step-label">${step.stepTitle}</div>
          <h5>${step.nombre}</h5>
          <p>${step.tipo} · ${step.duracion}</p>
        </div>
      </div>
    `).join('');
  }

  /* ── Download Result Summary as Image ─── */
  async _download() {
    if (!this.results) return;
    const btn = document.getElementById('download-btn');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '⏳ Generando imagen…';

    try {
      const canvas = await this._drawSummaryCard();
      const fileName = `IISE-Match-${this.results.topProfile.name.replace(/\s+/g, '-')}.png`;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = blob && typeof File === 'function' ? new File([blob], fileName, { type: 'image/png' }) : null;

      // On phones, open the share sheet so it can be saved to the gallery or posted
      if (file && navigator.canShare && navigator.canShare({ files: [file] }) && /Android|iPhone|iPad/i.test(navigator.userAgent)) {
        try {
          await navigator.share({ files: [file], title: 'Mi perfil IISE Match' });
          return;
        } catch (e) {
          if (e && e.name === 'AbortError') return;
        }
      }

      const link = document.createElement('a');
      link.download = fileName;
      link.href = blob ? URL.createObjectURL(blob) : canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (blob) setTimeout(() => URL.revokeObjectURL(link.href), 2000);
    } catch (err) {
      console.error('Error generando la imagen:', err);
      alert('No se pudo generar la imagen. Intenta de nuevo.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  }

  /* Draws a 1080x1920 (story format) summary card with the same look as the results page */
  async _drawSummaryCard() {
    const W = 1080, H = 1920;
    const C = {
      bg: '#f5f8fa', white: '#ffffff', gold: '#df951a', blue: '#084c76', cyan: '#009fe3',
      text: '#1a2d42', text2: '#4a5d73', muted: '#7e91a6', border: 'rgba(8, 76, 118, 0.08)', success: '#00bfa6'
    };
    const FONT = "'Inter', system-ui, sans-serif";
    const MONO = "'JetBrains Mono', monospace";

    // Make sure the page fonts are ready before drawing text
    try {
      await Promise.all([
        document.fonts.load(`800 72px ${FONT}`), document.fonts.load(`700 40px ${FONT}`),
        document.fonts.load(`400 28px ${FONT}`), document.fonts.load(`700 60px ${MONO}`)
      ]);
    } catch (e) { /* use fallback fonts */ }

    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    const r = this.results;
    const recs = (this.recs && this.recs.topRecommendations) || [];
    const profile = r.topProfile;
    const pct = r.percentages[profile.code];
    const combined = r.combinedProfile;

    const roundRect = (x, y, w, h, rad) => {
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.arcTo(x + w, y, x + w, y + h, rad);
      ctx.arcTo(x + w, y + h, x, y + h, rad);
      ctx.arcTo(x, y + h, x, y, rad);
      ctx.arcTo(x, y, x + w, y, rad);
      ctx.closePath();
    };
    const card = (x, y, w, h, rad, fill, stroke) => {
      ctx.save();
      ctx.shadowColor = 'rgba(8, 76, 118, 0.10)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 12;
      roundRect(x, y, w, h, rad);
      ctx.fillStyle = fill || C.white;
      ctx.fill();
      ctx.restore();
      roundRect(x, y, w, h, rad);
      ctx.strokeStyle = stroke || C.border;
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    const wrap = (text, maxW, maxLines) => {
      const words = String(text).split(' ');
      const lines = [];
      let line = '';
      words.forEach(w => {
        const test = line ? line + ' ' + w : w;
        if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
        else line = test;
      });
      if (line) lines.push(line);
      if (lines.length > maxLines) {
        const cut = lines.slice(0, maxLines);
        let last = cut[maxLines - 1];
        while (ctx.measureText(last + '…').width > maxW && last.length) last = last.slice(0, -1);
        cut[maxLines - 1] = last.trim() + '…';
        return cut;
      }
      return lines;
    };
    const fit = (text, maxW) => {
      let t = String(text);
      if (ctx.measureText(t).width <= maxW) return t;
      while (ctx.measureText(t + '…').width > maxW && t.length) t = t.slice(0, -1);
      return t.trim() + '…';
    };

    // ── Background with soft orbs (like the page) ──
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, W, H);
    const orb = (x, y, rad, color) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(245, 248, 250, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    };
    orb(120, 160, 520, 'rgba(223, 149, 26, 0.10)');
    orb(980, 1100, 600, 'rgba(0, 159, 227, 0.09)');
    orb(200, 1800, 500, 'rgba(8, 76, 118, 0.06)');

    ctx.textBaseline = 'alphabetic';

    // ── Logo card ──
    const logoW = 260, logoH = 150, logoX = (W - logoW) / 2, logoY = 60;
    card(logoX, logoY, logoW, logoH, 28, C.white, 'rgba(223, 149, 26, 0.35)');
    const logoImg = document.querySelector('.results-logo-img') || document.querySelector('.main-logo-img');
    if (logoImg && logoImg.complete && logoImg.naturalWidth) {
      const s = Math.min((logoW - 50) / logoImg.naturalWidth, (logoH - 40) / logoImg.naturalHeight);
      const lw = logoImg.naturalWidth * s, lh = logoImg.naturalHeight * s;
      ctx.drawImage(logoImg, logoX + (logoW - lw) / 2, logoY + (logoH - lh) / 2, lw, lh);
    }

    // ── Badge ──
    ctx.font = `700 26px ${FONT}`;
    const badge = 'TU PERFIL IISE MATCH';
    ctx.letterSpacing = '3px';
    const bw = ctx.measureText(badge).width + 64;
    roundRect((W - bw) / 2, 245, bw, 58, 29);
    ctx.fillStyle = 'rgba(233, 69, 96, 0.10)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(233, 69, 96, 0.22)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#f0a0b0';
    ctx.textAlign = 'center';
    ctx.fillText(badge, W / 2, 284);
    ctx.letterSpacing = '0px';

    // ── Title: "¡Eres un <name>!" with the gradient name ──
    ctx.font = `800 64px ${FONT}`;
    const nameLines = wrap(profile.name, 900, 2);
    let titleY = 395;
    ctx.fillStyle = C.text;
    ctx.fillText('¡Eres un', W / 2, titleY);
    nameLines.forEach((line, i) => {
      titleY += 74;
      const isLast = i === nameLines.length - 1;
      const full = isLast ? line + '!' : line;
      const fullW = ctx.measureText(full).width;
      const lineW = ctx.measureText(line).width;
      const startX = W / 2 - fullW / 2;
      const grad = ctx.createLinearGradient(startX, 0, startX + lineW, 0);
      grad.addColorStop(0, C.cyan);
      grad.addColorStop(0.6, C.gold);
      ctx.textAlign = 'left';
      ctx.fillStyle = grad;
      ctx.fillText(line, startX, titleY);
      if (isLast) {
        ctx.fillStyle = C.text;
        ctx.fillText('!', startX + lineW, titleY);
      }
      ctx.textAlign = 'center';
    });

    // ── Main profile card ──
    const mainY = titleY + 56, mainH = 410;
    card(60, mainY, W - 120, mainH, 36, C.white, profile.color + '40');
    ctx.save();
    roundRect(60, mainY, W - 120, mainH, 36);
    ctx.clip();
    orb(W - 120, mainY + 40, 320, profile.color + '18');
    ctx.restore();

    // Ring
    const cx = 250, cy = mainY + mainH / 2, rad = 120;
    ctx.lineCap = 'round';
    ctx.lineWidth = 22;
    ctx.strokeStyle = 'rgba(8, 76, 118, 0.07)';
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = profile.color;
    ctx.beginPath();
    ctx.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (pct / 100));
    ctx.stroke();
    ctx.fillStyle = profile.color;
    ctx.font = `700 64px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${pct}%`, cx, cy + 2);
    ctx.font = `600 20px ${FONT}`;
    ctx.fillStyle = C.muted;
    ctx.fillText('afinidad', cx, cy + 52);
    ctx.textBaseline = 'alphabetic';

    // Profile info
    const infoX = 430, infoW = W - 120 - (infoX - 60) - 40;
    ctx.textAlign = 'left';
    let iy = mainY + 90;
    ctx.font = `64px ${FONT}`;
    ctx.fillText(profile.emoji, infoX, iy);
    iy += 70;
    ctx.font = `800 46px ${FONT}`;
    ctx.fillStyle = C.text;
    wrap(profile.name, infoW, 2).forEach(line => { ctx.fillText(line, infoX, iy); iy += 54; });
    if (combined) {
      ctx.font = `600 22px ${FONT}`;
      const chip = fit(`✨ Perfil combinado: ${combined.name}`, infoW - 36);
      const cw = ctx.measureText(chip).width + 36;
      roundRect(infoX, iy - 18, cw, 46, 23);
      ctx.fillStyle = 'rgba(76, 201, 240, 0.10)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(76, 201, 240, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = C.cyan;
      ctx.fillText(chip, infoX + 18, iy + 13);
      iy += 72;
    } else {
      iy += 16;
    }
    ctx.font = `400 26px ${FONT}`;
    ctx.fillStyle = C.text2;
    const descLines = Math.max(1, Math.floor((mainY + mainH - 30 - iy) / 38) + 1);
    wrap(combined ? combined.description : profile.description, infoW, Math.min(descLines, 4))
      .forEach(line => { ctx.fillText(line, infoX, iy); iy += 38; });

    // ── Section helper ──
    const sectionTitle = (text, y) => {
      ctx.textAlign = 'left';
      ctx.font = `800 40px ${FONT}`;
      ctx.fillStyle = C.text;
      ctx.fillText(text, 70, y);
    };

    // ── Secondary profiles (top 3 after the main one) ──
    let y = mainY + mainH + 76;
    sectionTitle('Tu combinación de perfiles', y);
    y += 30;
    const secondary = Object.entries(r.percentages)
      .sort((a, b) => b[1] - a[1])
      .filter(([code]) => code !== profile.code && PROFILES[code])
      .slice(0, 3);
    secondary.forEach(([code, val]) => {
      const p = PROFILES[code];
      const rowH = 84;
      card(60, y, W - 120, rowH, 22);
      ctx.save();
      roundRect(60, y, W - 120, rowH, 22);
      ctx.clip();
      ctx.fillStyle = p.color;
      ctx.fillRect(60, y, 8, rowH);
      ctx.restore();
      ctx.font = `38px ${FONT}`;
      ctx.fillStyle = C.text;
      ctx.fillText(p.emoji, 100, y + 56);
      ctx.font = `700 30px ${FONT}`;
      ctx.fillText(fit(p.name, 420), 160, y + 53);
      // Bar
      const barX = 610, barW = 260, barY = y + 36;
      roundRect(barX, barY, barW, 12, 6);
      ctx.fillStyle = 'rgba(8, 76, 118, 0.07)';
      ctx.fill();
      roundRect(barX, barY, Math.max(12, barW * val / 100), 12, 6);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.font = `700 32px ${MONO}`;
      ctx.textAlign = 'right';
      ctx.fillStyle = p.color;
      ctx.fillText(`${val}%`, W - 90, y + 54);
      ctx.textAlign = 'left';
      y += rowH + 14;
    });

    // ── Top recommended activities ──
    y += 56;
    sectionTitle('Actividades recomendadas para ti', y);
    y += 30;
    recs.slice(0, 3).forEach(act => {
      const rowH = 96;
      card(60, y, W - 120, rowH, 22);
      ctx.font = `40px ${FONT}`;
      ctx.fillStyle = C.text;
      ctx.fillText(Array.from(act.emoji || '📌')[0], 92, y + 62);
      ctx.font = `700 28px ${FONT}`;
      ctx.fillText(fit(act.nombre, 600), 160, y + 44);
      ctx.font = `400 22px ${FONT}`;
      ctx.fillStyle = C.muted;
      ctx.fillText(fit(`${act.tipo} · ${act.modalidad} · ${act.duracion}`, 600), 160, y + 76);
      // Match pill
      ctx.font = `700 24px ${MONO}`;
      const m = `${act.compatibility}% match`;
      const mw = ctx.measureText(m).width + 32;
      roundRect(W - 90 - mw, y + 26, mw, 44, 22);
      ctx.fillStyle = 'rgba(0, 217, 163, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 217, 163, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = C.success;
      ctx.textAlign = 'center';
      ctx.fillText(m, W - 90 - mw / 2, y + 57);
      ctx.textAlign = 'left';
      y += rowH + 14;
    });

    // ── Footer ──
    ctx.textAlign = 'center';
    ctx.font = `600 24px ${FONT}`;
    ctx.fillStyle = C.blue;
    ctx.fillText('Capítulo IISE 771 · Pontificia Universidad Javeriana', W / 2, H - 70);
    ctx.font = `700 26px ${FONT}`;
    ctx.fillStyle = C.gold;
    ctx.fillText('@iisejaveriana', W / 2, H - 32);

    return canvas;
  }

  /* ── Share ─── */
  _share() {
    if (!this.results) return;
    const p = this.results.topProfile;
    const pct = this.results.percentages[p.code];
    const combined = this.results.combinedProfile;
    const combText = combined ? ` (${combined.name})` : '';

    const text =
      `🎯 Mi perfil IISE Match es: ${p.emoji} ${p.name}${combText} — ${pct}% de afinidad\n` +
      `\nDescubre tu perfil en el Capítulo IISE de la Javeriana. Responde 18 preguntas y obtén recomendaciones personalizadas de cursos, visitas y experiencias.\n` +
      `\n#IISE #Javeriana #IISEMatch`;

    if (navigator.share) {
      navigator.share({ title: 'Mi perfil IISE Match', text }).catch(() => this._copyToClipboard(text));
    } else {
      this._copyToClipboard(text);
    }
  }

  _copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('share-btn');
      const orig = btn.innerHTML;
      btn.innerHTML = '✅ ¡Copiado al portapapeles!';
      btn.style.background = 'linear-gradient(135deg, var(--success), #00a87a)';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
      }, 2500);
    }).catch(() => {
      alert('Para compartir, copia este texto:\n\n' + text);
    });
  }

  /* ── Animated Counter ─── */
  _animateCounter(elementId, from, to, durationMs) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let startTs = null;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / durationMs, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

// Init
window.resultsPage = new ResultsPage();
