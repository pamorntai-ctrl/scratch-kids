import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ──────────────── Apple Collector (Platformer) ──────────────── */

function drawCloud(ctx, x, y, r) {
  ctx.save()
  ctx.fillStyle = 'rgba(255,255,255,0.82)'
  ctx.beginPath()
  ctx.arc(x,           y,           r * 0.55, 0, Math.PI * 2)
  ctx.arc(x + r * 0.5, y - r * 0.1, r * 0.42, 0, Math.PI * 2)
  ctx.arc(x + r * 0.9, y + r * 0.05,r * 0.48, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawApple(ctx, x, y, r = 13) {
  // Body
  ctx.fillStyle = '#e63946'
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.28)'
  ctx.beginPath()
  ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2)
  ctx.fill()
  // Stem
  ctx.strokeStyle = '#5c3317'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(x + 1, y - r)
  ctx.lineTo(x + 3, y - r - 6)
  ctx.stroke()
  // Leaf
  ctx.fillStyle = '#2dc653'
  ctx.beginPath()
  ctx.ellipse(x + 6, y - r - 5, 6, 3, 0.55, 0, Math.PI * 2)
  ctx.fill()
}

function drawCharacter(ctx, cx, headY, legSwing, facingRight) {
  const bodyTop = headY + 10
  const dir = facingRight ? 1 : -1

  // Legs
  ctx.fillStyle = '#1a4fa0'
  ctx.fillRect(cx - 8, bodyTop + 16, 7, 16 + legSwing)
  ctx.fillRect(cx + 1,  bodyTop + 16, 7, 16 - legSwing)
  // Shoes
  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(cx - 11 * dir, bodyTop + 30 + legSwing, 13, 5)
  ctx.fillRect(cx - 1,         bodyTop + 30 - legSwing, 13, 5)

  // Body (shirt)
  ctx.fillStyle = '#ff6b9d'
  ctx.beginPath()
  if (ctx.roundRect) ctx.roundRect(cx - 10, bodyTop, 20, 18, 3)
  else ctx.rect(cx - 10, bodyTop, 20, 18)
  ctx.fill()

  // Head
  ctx.fillStyle = '#ffe0bd'
  ctx.beginPath()
  ctx.arc(cx, headY, 11, 0, Math.PI * 2)
  ctx.fill()

  // Hair
  ctx.fillStyle = '#7B3F00'
  ctx.beginPath()
  ctx.arc(cx, headY - 2, 10, Math.PI + 0.25, -0.25)
  ctx.fill()

  // Eye
  ctx.fillStyle = '#333'
  ctx.beginPath()
  ctx.arc(cx + dir * 3.5, headY, 1.8, 0, Math.PI * 2)
  ctx.fill()

  // Smile
  ctx.strokeStyle = '#555'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.arc(cx + dir * 2, headY + 3, 3, 0, Math.PI)
  ctx.stroke()
}

function drawAppleCollector(ctx, W, H, frame, previewStep) {
  const GY = H - 32  // ground y (top surface)

  /* ── Shared animation state ─────────────── */
  // Apple slots: different x positions it can appear at
  const APPLE_XS = [W * 0.70, W * 0.22, W * 0.55, W * 0.83]
  const appleSlot = previewStep >= 5 ? Math.floor(frame / 80) % APPLE_XS.length : 0
  const appleX    = APPLE_XS[appleSlot]
  const appleY    = GY - 14

  /* ── Sky ──────────────────────────────── */
  const sky = ctx.createLinearGradient(0, 0, 0, GY)
  sky.addColorStop(0, '#4d9fdb')
  sky.addColorStop(1, '#aadbf5')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GY)

  // Clouds (scroll slowly)
  drawCloud(ctx, (W * 0.18 + frame * 0.16) % (W + 90) - 45, 22, 38)
  drawCloud(ctx, (W * 0.60 + frame * 0.09) % (W + 90) - 45, 38, 28)

  /* ── Ground ───────────────────────────── */
  ctx.fillStyle = '#5a8a3a'
  ctx.fillRect(0, GY, W, H - GY)
  ctx.fillStyle = '#6aaa4a'
  for (let gx = 0; gx < W; gx += 11) {
    ctx.fillRect(gx, GY, 7, 4)
  }

  /* ── Score HUD (step 5) ───────────────── */
  if (previewStep >= 5) {
    ctx.fillStyle = 'rgba(0,0,0,0.42)'
    ctx.fillRect(4, 4, 72, 22)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 11px Nunito, sans-serif'
    ctx.fillText(`Score: ${Math.floor(frame / 80) % 7}`, 8, 18)
  }

  /* ── Apple (step 4+) ──────────────────── */
  if (previewStep >= 4) {
    const flashPhase = frame % 80
    const isFlashing = previewStep >= 5 && flashPhase < 10

    if (!isFlashing) {
      drawApple(ctx, appleX, appleY)
    } else {
      // Sparkle burst on collection
      ctx.save()
      ctx.globalAlpha = (10 - flashPhase) / 10
      const SPARK_COLS = ['#ffd700', '#ff6b35', '#ff6bff', '#60f', '#0cf', '#ff0']
      for (let p = 0; p < 6; p++) {
        const a = (p / 6) * Math.PI * 2
        const r = 12 + flashPhase * 1.8
        ctx.fillStyle = SPARK_COLS[p]
        ctx.beginPath()
        ctx.arc(appleX + Math.cos(a) * r, appleY + Math.sin(a) * r, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
  }

  /* ── Character (step 1+) ──────────────── */
  if (previewStep >= 1) {
    // Horizontal position
    let charX
    if (previewStep >= 2) {
      charX = W / 2 + Math.sin(frame * 0.027) * (W * 0.33)
    } else {
      charX = W * 0.28
    }

    // Jump arc (step 3+): periodic jump every 90 frames
    let yOff = 0
    if (previewStep >= 3) {
      const jp = frame % 90
      if (jp < 46) yOff = -Math.sin((jp / 46) * Math.PI) * 40
    }

    const headY = GY - 48 + yOff  // head centre
    const facingRight = previewStep < 2 || Math.sin(frame * 0.027) >= 0
    const leg = (previewStep >= 2 && yOff === 0) ? Math.sin(frame * 0.22) * 7 : 0

    // Drop shadow when airborne
    if (yOff < -5) {
      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.ellipse(charX, GY - 2, 13 + yOff * 0.12, 4, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    drawCharacter(ctx, charX, headY, leg, facingRight)

    /* ── Costumes-editor overlay (step 1 only) ── */
    if (previewStep === 1) {
      // Cycling shirt colour swatches painted on the character
      const SHIRT_COLS = ['#ff6b9d', '#4C97FF', '#ffd700', '#ff6b35', '#2dc653', '#9966FF']
      const shirtCycle = Math.floor(frame / 28) % SHIRT_COLS.length
      // Re-paint body in the cycled colour so it feels "live-edited"
      ctx.fillStyle = SHIRT_COLS[shirtCycle]
      if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(charX - 10, headY + 10, 20, 18, 3); ctx.fill()
      } else {
        ctx.fillRect(charX - 10, headY + 10, 20, 18)
      }

      // Gold star decoration on shirt (pulses)
      const starPulse = 0.85 + Math.sin(frame * 0.12) * 0.15
      ctx.save()
      ctx.translate(charX, headY + 20)
      ctx.scale(starPulse, starPulse)
      ctx.fillStyle = '#ffd700'
      ctx.font = '11px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('★', 0, 0)
      ctx.restore()

      // Floating mini palette card
      const PAL_X = charX + 30
      const PAL_Y = headY - 30
      ctx.save()
      // Card shadow
      ctx.fillStyle = 'rgba(0,0,0,0.18)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X + 2, PAL_Y + 2, 44, 44, 7)
      else ctx.rect(PAL_X + 2, PAL_Y + 2, 44, 44)
      ctx.fill()
      // Card background
      ctx.fillStyle = '#ffffff'
      ctx.strokeStyle = 'rgba(0,0,0,0.08)'
      ctx.lineWidth = 1
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X, PAL_Y, 44, 44, 7)
      else ctx.rect(PAL_X, PAL_Y, 44, 44)
      ctx.fill(); ctx.stroke()

      // Colour swatches (3 × 2 grid)
      const SWATCHES = ['#ff6b9d', '#4C97FF', '#2dc653', '#ffd700', '#9966FF', '#ff6b35']
      SWATCHES.forEach((c, i) => {
        const sx = PAL_X + 7  + (i % 3) * 13
        const sy = PAL_Y + 7  + Math.floor(i / 3) * 13
        // Highlight the active colour
        if (c === SHIRT_COLS[shirtCycle]) {
          ctx.strokeStyle = '#222'
          ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.arc(sx, sy, 5.5, 0, Math.PI * 2); ctx.stroke()
        }
        ctx.fillStyle = c
        ctx.beginPath(); ctx.arc(sx, sy, 4.5, 0, Math.PI * 2); ctx.fill()
      })

      // Tiny paintbrush in top-right corner of card
      ctx.strokeStyle = '#7B3F00'
      ctx.lineWidth = 1.8
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(PAL_X + 38, PAL_Y + 6)
      ctx.lineTo(PAL_X + 30, PAL_Y + 18)
      ctx.stroke()
      ctx.fillStyle = '#ffcc44'
      ctx.beginPath(); ctx.arc(PAL_X + 38, PAL_Y + 6, 2.5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      // "Costumes" tab label above palette
      ctx.save()
      ctx.fillStyle = 'rgba(217,70,239,0.9)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X - 2, PAL_Y - 16, 48, 14, 4)
      else ctx.rect(PAL_X - 2, PAL_Y - 16, 48, 14)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 8px Nunito, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('COSTUMES', PAL_X + 22, PAL_Y - 9)
      ctx.restore()

      // Sparkle dots floating around the character (animated)
      const SPARKLE_OFFSETS = [
        { dx: -26, dy: -22 }, { dx: 22, dy: -28 },
        { dx: -30, dy:  10 }, { dx: 28, dy:  12 },
      ]
      const SPARKLE_COLS = ['#ffd700', '#ff6bff', '#6bffff', '#ff6b35']
      SPARKLE_OFFSETS.forEach(({ dx, dy }, i) => {
        const pulse = Math.sin(frame * 0.10 + i * 1.6) * 0.5 + 0.5
        ctx.save()
        ctx.globalAlpha = 0.45 + pulse * 0.55
        ctx.fillStyle = SPARKLE_COLS[i]
        const sr = 2.5 + pulse * 2
        const sx = charX + dx + Math.sin(frame * 0.06 + i) * 4
        const sy = headY + dy + Math.cos(frame * 0.07 + i) * 3
        // 4-point star
        ctx.translate(sx, sy)
        ctx.rotate(frame * 0.04 + i)
        ctx.beginPath()
        for (let p = 0; p < 4; p++) {
          const a = (p / 4) * Math.PI * 2
          ctx.lineTo(Math.cos(a) * sr, Math.sin(a) * sr)
          ctx.lineTo(Math.cos(a + Math.PI / 4) * (sr * 0.38), Math.sin(a + Math.PI / 4) * (sr * 0.38))
        }
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })
    }
  }
}

/* ──────────────── Space Shooter helpers ──────────────── */

function drawShip(ctx, x, y, frame) {
  ctx.save()
  ctx.translate(x, y)
  // Thruster flame
  const flameH = 8 + Math.sin(frame * 0.22) * 4
  const flameAlpha = 0.65 + Math.sin(frame * 0.3) * 0.25
  ctx.fillStyle = `rgba(255,140,0,${flameAlpha})`
  ctx.beginPath(); ctx.moveTo(-5, 10); ctx.lineTo(0, 10 + flameH); ctx.lineTo(5, 10); ctx.closePath(); ctx.fill()
  ctx.fillStyle = `rgba(255,255,180,${flameAlpha})`
  ctx.beginPath(); ctx.moveTo(-2.5, 10); ctx.lineTo(0, 10 + flameH * 0.55); ctx.lineTo(2.5, 10); ctx.closePath(); ctx.fill()
  // Wings
  ctx.fillStyle = '#2a7fb5'
  ctx.beginPath(); ctx.moveTo(-8, 4); ctx.lineTo(-18, 9); ctx.lineTo(-8, 10); ctx.closePath(); ctx.fill()
  ctx.beginPath(); ctx.moveTo(8, 4); ctx.lineTo(18, 9); ctx.lineTo(8, 10); ctx.closePath(); ctx.fill()
  // Body
  ctx.fillStyle = '#4fc3f7'
  ctx.beginPath(); ctx.moveTo(0, -20); ctx.lineTo(8, 8); ctx.lineTo(8, 10); ctx.lineTo(-8, 10); ctx.lineTo(-8, 8); ctx.closePath(); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(4, 0); ctx.lineTo(0, -2); ctx.closePath(); ctx.fill()
  // Cockpit
  ctx.fillStyle = '#b3e5fc'; ctx.beginPath(); ctx.ellipse(0, -6, 5, 7, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = 'rgba(100,200,255,0.5)'; ctx.beginPath(); ctx.ellipse(-1, -9, 2, 3, -0.3, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawAlienShip(ctx, x, y, frame, seed) {
  const bob = Math.sin(frame * 0.05 + seed) * 1.5
  ctx.save()
  ctx.translate(x, y + bob)
  // Saucer body
  ctx.fillStyle = '#4d9e1a'
  ctx.beginPath(); ctx.ellipse(0, 0, 16, 8, 0, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#7ed321'
  ctx.beginPath(); ctx.ellipse(0, -2, 14, 5, 0, 0, Math.PI); ctx.fill()
  // Dome
  ctx.fillStyle = '#99ee33'
  ctx.beginPath(); ctx.ellipse(0, -4, 9, 8, 0, Math.PI, 2 * Math.PI); ctx.fill()
  ctx.fillStyle = 'rgba(200,255,100,0.3)'
  ctx.beginPath(); ctx.ellipse(-2, -7, 3, 4, -0.3, 0, Math.PI * 2); ctx.fill()
  // Red pulsing eyes
  const eyePulse = 0.45 + 0.55 * Math.abs(Math.sin(frame * 0.08 + seed))
  ctx.fillStyle = `rgba(255,30,30,${eyePulse})`
  ctx.beginPath(); ctx.arc(-5, -4, 2.5, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(5, -4, 2.5, 0, Math.PI * 2); ctx.fill()
  // Underside blinking lights
  const LCOLS = ['#ff0', '#0ff', '#f0f']
  for (let l = 0; l < 3; l++) {
    const lp = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.12 + l * 1.2 + seed))
    ctx.globalAlpha = lp
    ctx.fillStyle = LCOLS[l]
    ctx.beginPath(); ctx.arc((l - 1) * 6, 4, 2, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
  ctx.restore()
}

function drawBolt(ctx, x, y) {
  ctx.save()
  ctx.shadowColor = '#ffff00'; ctx.shadowBlur = 10
  ctx.fillStyle = '#ffffaa'; ctx.fillRect(x - 2, y, 4, 14)
  ctx.fillStyle = '#ffff00'; ctx.fillRect(x - 1, y + 2, 2, 10)
  ctx.restore()
}

/* ──────────────── Space Shooter ──────────────── */
function drawSpaceShooter(ctx, W, H, frame, previewStep) {
  // Deep space background
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#010b1a'); bg.addColorStop(1, '#050e20')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

  // Nebula blobs
  ctx.save(); ctx.globalAlpha = 0.07
  ctx.fillStyle = '#5533cc'; ctx.beginPath(); ctx.ellipse(W * 0.75, H * 0.28, 70, 42, 0.4, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#1144ee'; ctx.beginPath(); ctx.ellipse(W * 0.18, H * 0.65, 55, 30, -0.2, 0, Math.PI * 2); ctx.fill()
  ctx.restore()

  // Starfield (two layers at different speeds)
  for (let i = 0; i < 55; i++) {
    const speed = i % 3 === 0 ? 0.22 : 0.1
    const sx = (i * 97 + frame * speed) % W
    const sy = (i * 73) % H
    const bright = 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.05 + i))
    ctx.fillStyle = `rgba(255,255,255,${bright * 0.8})`
    ctx.fillRect(sx, sy, i % 7 === 0 ? 2 : 1.5, i % 7 === 0 ? 2 : 1.5)
  }

  // Spaceship
  const shipX = previewStep >= 1 ? W / 2 + Math.sin(frame * 0.025) * 55 : W / 2
  const shipY = H - 30
  drawShip(ctx, shipX, shipY, frame)

  // Arrow key hints — step 1 only
  if (previewStep === 1) {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.07))
    ctx.save(); ctx.globalAlpha = pulse * 0.7
    const ks = 16; const ky = H - 14
    for (const [kx, arrow] of [[shipX - 30, '◀'], [shipX + 30, '▶']]) {
      ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(kx - ks / 2, ky - ks / 2, ks, ks, 3)
      else ctx.rect(kx - ks / 2, ky - ks / 2, ks, ks)
      ctx.fill(); ctx.stroke()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = '10px sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText(arrow, kx, ky)
    }
    ctx.restore()
  }

  // SPACE key hint — step 2 only
  if (previewStep === 2) {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.1))
    ctx.save(); ctx.globalAlpha = pulse * 0.7
    ctx.fillStyle = 'rgba(255,255,0,0.15)'; ctx.strokeStyle = 'rgba(255,255,0,0.5)'; ctx.lineWidth = 1
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 22, H - 14, 44, 12, 3)
    else ctx.rect(W / 2 - 22, H - 14, 44, 12)
    ctx.fill(); ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,0,0.9)'; ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('SPACE', W / 2, H - 8)
    ctx.restore()
  }

  // Laser bolts (step 2+)
  if (previewStep >= 2) {
    const PERIOD = 55
    for (const offset of [0, 28]) {
      const t = (frame + offset) % PERIOD
      if (t > 4) {
        const by = shipY - 18 - (t / PERIOD) * (H + 20)
        if (by > -24) drawBolt(ctx, shipX, by)
      }
    }
  }

  // Alien ships (step 3+)
  if (previewStep >= 3) {
    const count = previewStep >= 4 ? 4 : 2
    const PERIOD = 160
    for (let a = 0; a < count; a++) {
      const phase = (frame + a * (PERIOD / count)) % PERIOD
      const ay = (phase / PERIOD) * (H + 30) - 20
      const ax = (W / (count + 1)) * (a + 1) + Math.sin(frame * 0.014 + a * 1.4) * 22

      if (ay >= -22 && ay < H + 20) {
        // Hit detection (step 4+)
        let exploding = false
        if (previewStep >= 4) {
          const bt = frame % 55
          const bulletY = shipY - 18 - (bt / 55) * (H + 20)
          if (Math.abs(ay - bulletY) < 18 && Math.abs(ax - shipX) < 22) exploding = true
        }

        if (exploding) {
          const progress = (frame % 20) / 20
          const r = progress * 22
          ctx.save()
          const ECOLS = ['#ffd700', '#ff6b35', '#ff4444', '#ff88ff']
          for (let p = 0; p < 8; p++) {
            const angle = (p / 8) * Math.PI * 2
            ctx.globalAlpha = (1 - progress) * 0.9
            ctx.fillStyle = ECOLS[p % 4]
            ctx.beginPath(); ctx.arc(ax + Math.cos(angle) * r, ay + Math.sin(angle) * r, 3, 0, Math.PI * 2); ctx.fill()
          }
          ctx.restore()
        } else {
          drawAlienShip(ctx, ax, ay, frame, a * 77)
        }
      }
    }
  }

  // Score HUD (step 4+)
  if (previewStep >= 4) {
    ctx.save()
    ctx.fillStyle = 'rgba(0,0,12,0.6)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(4, 4, 92, 20, 3)
    else ctx.rect(4, 4, 92, 20)
    ctx.fill()
    ctx.fillStyle = '#60d4f7'; ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText(`Score: ${Math.min(990, Math.floor(frame / 50) * 10)}`, 8, 14)
    ctx.restore()
  }

  // Lives HUD (step 5+)
  if (previewStep >= 5) {
    ctx.save()
    ctx.fillStyle = 'rgba(0,0,12,0.6)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W - 62, 4, 58, 20, 3)
    else ctx.rect(W - 62, 4, 58, 20)
    ctx.fill()
    const lifePulse = Math.sin(frame * 0.1) > 0.7
    ctx.fillStyle = lifePulse ? '#ff4444' : '#ff9999'
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText('♥ ♥ ♥', W - 56, 14)
    ctx.restore()
  }
}

/* ──────────────── Maze Runner helpers ──────────────── */

function drawMazeHero(ctx, x, y, frame, moving) {
  ctx.save()
  ctx.translate(x, y)
  // Motion glow
  if (moving) {
    const g = 0.25 + 0.25 * Math.abs(Math.sin(frame * 0.15))
    ctx.fillStyle = `rgba(255,107,157,${g})`
    ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill()
  }
  // Body
  ctx.fillStyle = '#ff6b9d'
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill()
  // Face
  ctx.fillStyle = '#ffe0bd'
  ctx.beginPath(); ctx.arc(0, -1, 5, 0, Math.PI * 2); ctx.fill()
  // Eyes (shift direction with motion)
  const eyeShift = moving ? Math.sin(frame * 0.07) * 1.2 : 0
  ctx.fillStyle = '#333'
  ctx.beginPath(); ctx.arc(-2 + eyeShift, -2, 1.5, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(2 + eyeShift, -2, 1.5, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

/* ──────────────── Maze Runner ──────────────── */
function drawMaze(ctx, W, H, frame, previewStep) {
  // Background
  ctx.fillStyle = '#12082a'
  ctx.fillRect(0, 0, W, H)

  // Faint grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.025)'
  ctx.lineWidth = 1
  for (let gx = 20; gx < W; gx += 20) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke() }
  for (let gy = 20; gy < H; gy += 20) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke() }

  // Walls
  const WALLS = [
    [0, 0, W, 10], [0, 0, 10, H], [0, H - 10, W, 10], [W - 10, 0, 10, H],
    [40, 10, 10, 70], [40, 90, 10, 50], [80, 30, 70, 10], [80, 70, 70, 10],
    [120, 10, 10, 80], [130, 50, 60, 10], [60, 110, 10, 50], [100, 120, 60, 10],
    [150, 80, 10, 60], [40, 140, 80, 10],
  ]
  WALLS.forEach(([x, y, w, h]) => {
    ctx.fillStyle = '#2d1458'; ctx.fillRect(x, y, w, h)
    ctx.fillStyle = 'rgba(160,90,255,0.18)'; ctx.fillRect(x, y, w, 2)
  })

  // Start marker (always visible)
  ctx.fillStyle = 'rgba(80,220,80,0.22)'
  ctx.fillRect(11, 11, 26, 26)
  ctx.fillStyle = 'rgba(80,220,80,0.55)'
  ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('▶', 24, 24)

  // ── Step 0: paint-brush drawing animation ──
  if (previewStep === 0) {
    const prog = (frame % 120) / 100
    // Partial highlight on a wall showing it being drawn
    const [ax, ay, aw, ah] = WALLS[4]  // vertical wall [40,10,10,70]
    ctx.fillStyle = 'rgba(150,60,255,0.6)'
    ctx.fillRect(ax, ay, aw, ah * Math.min(1, prog))

    // Brush tip dot at leading edge
    const tipY = ay + ah * Math.min(1, prog)
    const bpulse = Math.sin(frame * 0.22) * 1.5
    ctx.fillStyle = '#d946ef'
    ctx.beginPath(); ctx.arc(ax + aw / 2, tipY, 4 + bpulse, 0, Math.PI * 2); ctx.fill()

    // Label pill
    ctx.fillStyle = 'rgba(217,70,239,0.88)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 40, H - 20, 80, 14, 4)
    else ctx.rect(W / 2 - 40, H - 20, 80, 14)
    ctx.fill()
    ctx.fillStyle = '#fff'; ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('✏️ Paint Editor', W / 2, H - 13)
  }

  // ── Hero (step 1+) ──
  if (previewStep >= 1) {
    let heroX, heroY

    if (previewStep === 1) {
      heroX = 24; heroY = 45  // standing at start
    } else {
      // Navigate a loop around the open corridor near start
      const t = (frame * 0.016) % (Math.PI * 2)
      heroX = 24 + Math.sin(t) * 12
      heroY = 50 + Math.cos(t * 0.8) * 16
    }

    // ── Step 3: wall-collision flash ──
    if (previewStep === 3) {
      const cycle = frame % 70
      if (cycle < 14) {
        ctx.save()
        ctx.globalAlpha = (14 - cycle) / 14 * 0.75
        ctx.fillStyle = '#ff4444'
        ctx.beginPath(); ctx.arc(heroX, heroY, 17, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
      // "touching color!" tooltip
      if (cycle < 35) {
        const a = Math.sin((cycle / 35) * Math.PI)
        ctx.save(); ctx.globalAlpha = a * 0.9
        ctx.fillStyle = 'rgba(255,60,60,0.85)'
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(heroX - 36, heroY - 24, 72, 13, 3)
        else ctx.rect(heroX - 36, heroY - 24, 72, 13)
        ctx.fill()
        ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('touching color? → go back!', heroX, heroY - 17)
        ctx.restore()
      }
    }

    drawMazeHero(ctx, heroX, heroY, frame, previewStep >= 2)
  }

  // ── Exit star (step 4+) ──
  if (previewStep >= 4) {
    const sx = W - 24; const sy = H - 24
    // Halo glow
    const glow = 0.35 + 0.35 * Math.abs(Math.sin(frame * 0.07))
    ctx.save(); ctx.globalAlpha = glow * 0.4
    ctx.fillStyle = '#ffd700'
    ctx.beginPath(); ctx.arc(sx, sy, 18, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    // Spinning star
    ctx.save(); ctx.translate(sx, sy); ctx.rotate(frame * 0.04)
    ctx.fillStyle = '#ffd700'
    for (let p = 0; p < 5; p++) {
      ctx.save(); ctx.rotate((p * Math.PI * 2) / 5 - Math.PI / 2)
      ctx.beginPath()
      ctx.moveTo(0, -10); ctx.lineTo(2.4, -3); ctx.lineTo(9, -3)
      ctx.lineTo(4, 2);   ctx.lineTo(6, 9);   ctx.lineTo(0, 5)
      ctx.lineTo(-6, 9);  ctx.lineTo(-4, 2);  ctx.lineTo(-9, -3)
      ctx.lineTo(-2.4, -3); ctx.closePath(); ctx.fill()
      ctx.restore()
    }
    ctx.restore()
    // EXIT label
    ctx.fillStyle = 'rgba(255,215,0,0.65)'; ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
    ctx.fillText('EXIT', sx, sy - 13)

    // Win flash every 130 frames
    if (frame % 130 > 100) {
      const prog = (frame % 130 - 100) / 30
      ctx.save(); ctx.globalAlpha = Math.sin(prog * Math.PI)
      ctx.fillStyle = 'rgba(0,0,0,0.65)'
      ctx.fillRect(W / 2 - 52, H / 2 - 11, 104, 22)
      ctx.fillStyle = '#ffd700'; ctx.font = 'bold 10px Nunito,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('You escaped! 🎉', W / 2, H / 2)
      ctx.restore()
    }
  }

  // ── Timer HUD (step 5+) ──
  if (previewStep >= 5) {
    const secs = Math.max(0, 30 - Math.floor(frame / 30))
    const urgent = secs < 10
    const timerPulse = urgent && Math.sin(frame * 0.2) > 0.4
    ctx.save()
    ctx.fillStyle = 'rgba(0,0,0,0.62)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(4, 4, 68, 20, 3)
    else ctx.rect(4, 4, 68, 20)
    ctx.fill()
    ctx.fillStyle = timerPulse ? '#ff4444' : (urgent ? '#ff8888' : '#ff6b6b')
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
    ctx.fillText(`⏱ ${secs}s`, 8, 14)
    ctx.restore()
  }
}

const RENDERERS = {
  'apple-collector': drawAppleCollector,
  'space-shooter':  drawSpaceShooter,
  'maze-runner':    drawMaze,
}

export default function GamePreview({ missionId, previewStep, compact = false }) {
  const canvasRef = useRef(null)
  const frameRef  = useRef(0)
  const rafRef    = useRef(null)
  const render    = RENDERERS[missionId]

  useEffect(() => {
    if (!render) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    function loop() {
      frameRef.current += 1
      ctx.clearRect(0, 0, W, H)
      render(ctx, W, H, frameRef.current, previewStep)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(rafRef.current)
  }, [missionId, previewStep, render])

  if (!render) {
    if (compact) return null
    return (
      <div className="w-full aspect-video rounded-xl bg-white/04 border border-white/08 flex items-center justify-center text-white/30 text-sm">
        Preview not available
      </div>
    )
  }

  if (compact) {
    return (
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={280}
          height={190}
          className="w-full block"
          style={{ imageRendering: 'pixelated' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)' }}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-[9px] font-black tracking-wider">LIVE</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50 text-xs font-bold uppercase tracking-wider">Live Preview</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
          <span className="text-green-400 text-xs font-bold">LIVE</span>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
        <canvas
          ref={canvasRef}
          width={280}
          height={190}
          className="w-full block"
          style={{ imageRendering: 'pixelated' }}
        />
        {/* Scanline overlay for retro feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
          }}
        />
      </div>
      <div className="mt-1.5 text-white/25 text-xs text-center">
        This is what your game will look like!
      </div>
    </div>
  )
}
