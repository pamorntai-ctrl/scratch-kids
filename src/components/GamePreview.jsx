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
  const GY = H - 32
  const APPLE_XS = [W * 0.65, W * 0.22, W * 0.52, W * 0.82]

  /* ── Apple x position per step ── */
  let appleX
  if (previewStep === 4) {
    appleX = W * 0.60  // fixed centre-right (Create Apple step)
  } else if (previewStep === 5) {
    appleX = APPLE_XS[Math.floor(frame / 65) % APPLE_XS.length]  // cycles (Randomize step)
  } else if (previewStep >= 8) {
    appleX = APPLE_XS[Math.floor(frame / 80) % APPLE_XS.length]  // cycles (Respawn step)
  } else {
    appleX = APPLE_XS[0]  // fixed for guided collision steps 6 & 7
  }
  const appleY = GY - 14

  /* ── Character x position ── */
  let charX
  if (previewStep === 6 || previewStep === 7) {
    // Guided path: character walks toward apple at W*0.65 and back
    const t = (frame % 120) / 120
    const prog = t < 0.5 ? t * 2 : (1 - t) * 2
    charX = W * 0.10 + W * 0.68 * prog
  } else if (previewStep >= 2) {
    charX = W / 2 + Math.sin(frame * 0.027) * (W * 0.33)
  } else {
    charX = W * 0.28
  }

  /* ── Collision state (steps 6 & 7) ── */
  const isColliding = (previewStep === 6 || previewStep === 7) && Math.abs(charX - appleX) < 22

  /* ── Sky ── */
  const sky = ctx.createLinearGradient(0, 0, 0, GY)
  sky.addColorStop(0, '#4d9fdb')
  sky.addColorStop(1, '#aadbf5')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GY)
  drawCloud(ctx, (W * 0.18 + frame * 0.16) % (W + 90) - 45, 22, 38)
  drawCloud(ctx, (W * 0.60 + frame * 0.09) % (W + 90) - 45, 38, 28)

  /* ── Ground ── */
  ctx.fillStyle = '#5a8a3a'
  ctx.fillRect(0, GY, W, H - GY)
  ctx.fillStyle = '#6aaa4a'
  for (let gx = 0; gx < W; gx += 11) ctx.fillRect(gx, GY, 7, 4)

  /* ── Score HUD (steps 7 & 8) ── */
  if (previewStep >= 7) {
    const score = previewStep >= 8
      ? Math.floor(frame / 80) % 10
      : Math.floor(frame / 120) % 6
    ctx.fillStyle = 'rgba(0,0,0,0.42)'
    ctx.fillRect(4, 4, 72, 22)
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 11px Nunito, sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Score: ${score}`, 8, 15)
  }

  /* ── Apple (step 4+) ── */
  if (previewStep >= 4) {
    const teleportFlash = previewStep === 5 && (frame % 65) < 8
    const respawnFlash  = previewStep >= 8  && (frame % 80) < 10

    if (isColliding) {
      // Collision sparkle
      const proximity = 1 - Math.abs(charX - appleX) / 22
      ctx.save()
      ctx.globalAlpha = proximity * 0.9
      const SPARK_COLS = ['#ffd700', '#ff6b35', '#ff6bff', '#6366f1', '#0cf', '#ffcc00']
      for (let p = 0; p < 6; p++) {
        const a = (p / 6) * Math.PI * 2
        const r = 10 + (1 - proximity) * 16
        ctx.fillStyle = SPARK_COLS[p]
        ctx.beginPath()
        ctx.arc(appleX + Math.cos(a) * r, appleY + Math.sin(a) * r, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    } else if (respawnFlash) {
      // Respawn sparkle burst
      const t = frame % 80
      ctx.save()
      ctx.globalAlpha = (10 - t) / 10
      const SPARK_COLS = ['#ffd700', '#ff6b35', '#ff6bff', '#60f', '#0cf', '#ff0']
      for (let p = 0; p < 6; p++) {
        const a = (p / 6) * Math.PI * 2
        const r = 12 + t * 1.8
        ctx.fillStyle = SPARK_COLS[p]
        ctx.beginPath()
        ctx.arc(appleX + Math.cos(a) * r, appleY + Math.sin(a) * r, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    } else if (!teleportFlash) {
      // Soft glow on "Create Apple" step to draw attention
      if (previewStep === 4) {
        const g = 0.25 + 0.15 * Math.abs(Math.sin(frame * 0.05))
        ctx.save(); ctx.globalAlpha = g
        ctx.fillStyle = '#e63946'
        ctx.beginPath(); ctx.arc(appleX, appleY, 22, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
      drawApple(ctx, appleX, appleY)
    }

    /* ── "pick random x" label (Randomize step) ── */
    if (previewStep === 5 && !teleportFlash) {
      ctx.save()
      ctx.globalAlpha = 0.65 + 0.35 * Math.abs(Math.sin(frame * 0.07))
      ctx.fillStyle = 'rgba(16,185,129,0.92)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(appleX - 40, appleY - 30, 80, 14, 4)
      else ctx.rect(appleX - 40, appleY - 30, 80, 14)
      ctx.fill()
      ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('🎲 pick random x', appleX, appleY - 23)
      ctx.restore()
    }

    /* ── "touching [Hero]? ✓" tooltip (Detect Collision step) ── */
    if (previewStep === 6 && isColliding) {
      const a = 1 - Math.abs(charX - appleX) / 22
      ctx.save(); ctx.globalAlpha = a
      ctx.fillStyle = 'rgba(92,177,214,0.92)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(appleX - 42, appleY - 30, 84, 14, 4)
      else ctx.rect(appleX - 42, appleY - 30, 84, 14)
      ctx.fill()
      ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('touching [Hero]? ✓', appleX, appleY - 23)
      ctx.restore()
    }
  }

  /* ── Character (step 1+) ── */
  if (previewStep >= 1) {
    // Jump arc: only on the Jump step (previewStep 3)
    let yOff = 0
    if (previewStep === 3) {
      const jp = frame % 90
      if (jp < 46) yOff = -Math.sin((jp / 46) * Math.PI) * 40
    }

    const headY = GY - 48 + yOff
    const facingRight = previewStep < 2
      ? true
      : (previewStep === 6 || previewStep === 7)
        ? charX < appleX
        : Math.sin(frame * 0.027) >= 0
    const leg = (previewStep >= 2 && yOff === 0) ? Math.sin(frame * 0.22) * 7 : 0

    if (yOff < -5) {
      ctx.save(); ctx.globalAlpha = 0.2
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.ellipse(charX, GY - 2, 13 + yOff * 0.12, 4, 0, 0, Math.PI * 2)
      ctx.fill(); ctx.restore()
    }

    drawCharacter(ctx, charX, headY, leg, facingRight)

    /* ── Speech bubble "🍎 Got it!" (Detect Collision step) ── */
    if (previewStep === 6 && isColliding) {
      const a = 1 - Math.abs(charX - appleX) / 22
      ctx.save(); ctx.globalAlpha = a * 0.95
      ctx.fillStyle = 'rgba(255,255,255,0.96)'
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(charX - 30, GY - 90, 60, 17, 5)
      else ctx.rect(charX - 30, GY - 90, 60, 17)
      ctx.fill(); ctx.stroke()
      // pointer
      ctx.beginPath()
      ctx.moveTo(charX - 4, GY - 73); ctx.lineTo(charX + 4, GY - 73); ctx.lineTo(charX, GY - 68)
      ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,0.96)'; ctx.fill()
      ctx.fillStyle = '#333'; ctx.font = 'bold 8px Nunito,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('🍎 Got it!', charX, GY - 81)
      ctx.restore()
    }

    /* ── Costumes-editor overlay (step 1 only) ── */
    if (previewStep === 1) {
      const SHIRT_COLS = ['#ff6b9d', '#4C97FF', '#ffd700', '#ff6b35', '#2dc653', '#9966FF']
      const shirtCycle = Math.floor(frame / 28) % SHIRT_COLS.length
      ctx.fillStyle = SHIRT_COLS[shirtCycle]
      if (ctx.roundRect) {
        ctx.beginPath(); ctx.roundRect(charX - 10, headY + 10, 20, 18, 3); ctx.fill()
      } else {
        ctx.fillRect(charX - 10, headY + 10, 20, 18)
      }
      const starPulse = 0.85 + Math.sin(frame * 0.12) * 0.15
      ctx.save(); ctx.translate(charX, headY + 20); ctx.scale(starPulse, starPulse)
      ctx.fillStyle = '#ffd700'; ctx.font = '11px serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('★', 0, 0); ctx.restore()

      const PAL_X = charX + 30; const PAL_Y = headY - 30
      ctx.save()
      ctx.fillStyle = 'rgba(0,0,0,0.18)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X + 2, PAL_Y + 2, 44, 44, 7)
      else ctx.rect(PAL_X + 2, PAL_Y + 2, 44, 44)
      ctx.fill()
      ctx.fillStyle = '#ffffff'; ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X, PAL_Y, 44, 44, 7)
      else ctx.rect(PAL_X, PAL_Y, 44, 44)
      ctx.fill(); ctx.stroke()
      const SWATCHES = ['#ff6b9d', '#4C97FF', '#2dc653', '#ffd700', '#9966FF', '#ff6b35']
      SWATCHES.forEach((c, i) => {
        const sx = PAL_X + 7 + (i % 3) * 13; const sy = PAL_Y + 7 + Math.floor(i / 3) * 13
        if (c === SHIRT_COLS[shirtCycle]) {
          ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5
          ctx.beginPath(); ctx.arc(sx, sy, 5.5, 0, Math.PI * 2); ctx.stroke()
        }
        ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sx, sy, 4.5, 0, Math.PI * 2); ctx.fill()
      })
      ctx.strokeStyle = '#7B3F00'; ctx.lineWidth = 1.8; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.moveTo(PAL_X + 38, PAL_Y + 6); ctx.lineTo(PAL_X + 30, PAL_Y + 18); ctx.stroke()
      ctx.fillStyle = '#ffcc44'; ctx.beginPath(); ctx.arc(PAL_X + 38, PAL_Y + 6, 2.5, 0, Math.PI * 2); ctx.fill()
      ctx.restore()

      ctx.save(); ctx.fillStyle = 'rgba(217,70,239,0.9)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(PAL_X - 2, PAL_Y - 16, 48, 14, 4)
      else ctx.rect(PAL_X - 2, PAL_Y - 16, 48, 14)
      ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 8px Nunito, sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('COSTUMES', PAL_X + 22, PAL_Y - 9); ctx.restore()

      const SPARKLE_OFFSETS = [{ dx: -26, dy: -22 }, { dx: 22, dy: -28 }, { dx: -30, dy: 10 }, { dx: 28, dy: 12 }]
      const SPARKLE_COLS = ['#ffd700', '#ff6bff', '#6bffff', '#ff6b35']
      SPARKLE_OFFSETS.forEach(({ dx, dy }, i) => {
        const pulse = Math.sin(frame * 0.10 + i * 1.6) * 0.5 + 0.5
        ctx.save(); ctx.globalAlpha = 0.45 + pulse * 0.55; ctx.fillStyle = SPARKLE_COLS[i]
        const sr = 2.5 + pulse * 2
        ctx.translate(charX + dx + Math.sin(frame * 0.06 + i) * 4, headY + dy + Math.cos(frame * 0.07 + i) * 3)
        ctx.rotate(frame * 0.04 + i)
        ctx.beginPath()
        for (let p = 0; p < 4; p++) {
          const a = (p / 4) * Math.PI * 2
          ctx.lineTo(Math.cos(a) * sr, Math.sin(a) * sr)
          ctx.lineTo(Math.cos(a + Math.PI / 4) * (sr * 0.38), Math.sin(a + Math.PI / 4) * (sr * 0.38))
        }
        ctx.closePath(); ctx.fill(); ctx.restore()
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

  // Starfield
  for (let i = 0; i < 55; i++) {
    const speed = i % 3 === 0 ? 0.22 : 0.1
    const sx = (i * 97 + frame * speed) % W
    const sy = (i * 73) % H
    const bright = 0.25 + 0.75 * Math.abs(Math.sin(frame * 0.05 + i))
    ctx.fillStyle = `rgba(255,255,255,${bright * 0.8})`
    ctx.fillRect(sx, sy, i % 7 === 0 ? 2 : 1.5, i % 7 === 0 ? 2 : 1.5)
  }

  // Spaceship (oscillates from step 1 onward)
  const shipX = previewStep >= 1 ? W / 2 + Math.sin(frame * 0.025) * 55 : W / 2
  const shipY = H - 30
  drawShip(ctx, shipX, shipY, frame)

  /* ── Step 2: arrow key hints ── */
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

  /* ── Step 3: ghost Ball sprite (hidden template) ── */
  if (previewStep === 2) {
    const ghostPulse = 0.22 + 0.18 * Math.abs(Math.sin(frame * 0.07))
    // Dashed circle showing the hidden sprite location
    ctx.save()
    ctx.globalAlpha = ghostPulse * 2
    ctx.strokeStyle = '#ffff00'
    ctx.lineWidth = 1.5
    ctx.setLineDash([3, 3])
    ctx.beginPath(); ctx.arc(shipX, shipY - 22, 12, 0, Math.PI * 2); ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = ghostPulse
    ctx.fillStyle = '#ffff00'
    ctx.beginPath(); ctx.arc(shipX, shipY - 22, 7, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
    // "hide" label
    ctx.save()
    ctx.globalAlpha = 0.55 + 0.25 * Math.abs(Math.sin(frame * 0.06))
    ctx.fillStyle = 'rgba(255,255,100,0.18)'; ctx.strokeStyle = 'rgba(255,255,100,0.5)'; ctx.lineWidth = 1
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(shipX - 36, shipY - 48, 72, 13, 3)
    else ctx.rect(shipX - 36, shipY - 48, 72, 13)
    ctx.fill(); ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,100,0.9)'; ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('Ball sprite (hidden)', shipX, shipY - 41)
    ctx.restore()
  }

  /* ── Step 4: SPACE hint + single clone spawning ── */
  if (previewStep === 3) {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.1))
    ctx.save(); ctx.globalAlpha = pulse * 0.8
    ctx.fillStyle = 'rgba(255,255,0,0.15)'; ctx.strokeStyle = 'rgba(255,255,0,0.5)'; ctx.lineWidth = 1
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 22, H - 14, 44, 12, 3)
    else ctx.rect(W / 2 - 22, H - 14, 44, 12)
    ctx.fill(); ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,0,0.9)'; ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText('SPACE', W / 2, H - 8)
    ctx.restore()
    // Single slow bolt (showing the clone appearing at ship)
    const bt = frame % 100
    if (bt > 6) {
      const by = shipY - 18 - (bt / 100) * (H * 0.85)
      if (by > -20) drawBolt(ctx, shipX, by)
    }
  }

  /* ── Steps 5+: twin laser bolts ── */
  if (previewStep >= 4) {
    const PERIOD = 55
    for (const offset of [0, 28]) {
      const t = (frame + offset) % PERIOD
      if (t > 4) {
        const by = shipY - 18 - (t / PERIOD) * (H + 20)
        if (by > -24) drawBolt(ctx, shipX, by)
      }
    }
  }

  /* ── Steps 6+: alien ships ── */
  if (previewStep >= 5) {
    const count = previewStep >= 7 ? 4 : 2
    const PERIOD = 160
    for (let a = 0; a < count; a++) {
      const phase = (frame + a * (PERIOD / count)) % PERIOD
      const ay = (phase / PERIOD) * (H + 30) - 20
      const ax = (W / (count + 1)) * (a + 1) + Math.sin(frame * 0.014 + a * 1.4) * 22

      if (ay < -22 || ay >= H + 20) continue

      const bt = frame % 55
      const bulletY = shipY - 18 - (bt / 55) * (H + 20)
      const nearBullet = Math.abs(ay - bulletY) < 20 && Math.abs(ax - shipX) < 24

      // Step 7: detection glow + tooltip (no explosion yet)
      if (previewStep === 6 && nearBullet) {
        const glow = 0.45 + 0.4 * Math.abs(Math.sin(frame * 0.18))
        ctx.save(); ctx.globalAlpha = glow * 0.65
        ctx.fillStyle = '#5CB1D6'
        ctx.beginPath(); ctx.arc(ax, ay, 20, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
        ctx.save(); ctx.globalAlpha = glow * 0.95
        ctx.fillStyle = 'rgba(92,177,214,0.92)'
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(ax - 40, ay - 26, 80, 12, 3)
        else ctx.rect(ax - 40, ay - 26, 80, 12)
        ctx.fill()
        ctx.fillStyle = '#fff'; ctx.font = 'bold 6px Nunito,sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('touching [Ball]? ✓', ax, ay - 20)
        ctx.restore()
        drawAlienShip(ctx, ax, ay, frame, a * 77)
        continue
      }

      // Steps 8+: explosion
      if (previewStep >= 7 && nearBullet) {
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
        continue
      }

      drawAlienShip(ctx, ax, ay, frame, a * 77)
    }
  }

  /* ── Step 8: Score HUD ── */
  if (previewStep >= 7) {
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

  /* ── Step 9: Lives HUD ── */
  if (previewStep >= 8) {
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

  // Start marker
  ctx.fillStyle = 'rgba(80,220,80,0.22)'
  ctx.fillRect(11, 11, 26, 26)
  ctx.fillStyle = 'rgba(80,220,80,0.55)'
  ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('▶', 24, 24)

  // ── Step 0: paint-brush drawing animation ──
  if (previewStep === 0) {
    const prog = (frame % 120) / 100
    const [ax, ay, aw, ah] = WALLS[4]
    ctx.fillStyle = 'rgba(150,60,255,0.6)'
    ctx.fillRect(ax, ay, aw, ah * Math.min(1, prog))
    const tipY = ay + ah * Math.min(1, prog)
    const bpulse = Math.sin(frame * 0.22) * 1.5
    ctx.fillStyle = '#d946ef'
    ctx.beginPath(); ctx.arc(ax + aw / 2, tipY, 4 + bpulse, 0, Math.PI * 2); ctx.fill()
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
    let heroX, heroY, heroMoving = true

    if (previewStep === 1) {
      // Static at start — show size constraint
      heroX = 24; heroY = 45; heroMoving = false
    } else if (previewStep === 2) {
      // Up/Down only: oscillate Y, fixed X
      heroX = 24
      heroY = 90 + Math.sin(frame * 0.04) * 60
    } else if (previewStep === 3) {
      // All 4 directions: small figure-eight loop
      const t = (frame * 0.016) % (Math.PI * 2)
      heroX = 24 + Math.sin(t) * 12
      heroY = 50 + Math.cos(t * 0.8) * 16
    } else if (previewStep === 4) {
      // Sense wall: hero approaches and passes through wall at x≈40
      const t = (frame % 130) / 130
      const prog = t < 0.5 ? t * 2 : (1 - t) * 2
      heroX = 24 + prog * 36  // 24 → 60 → 24 (crosses wall)
      heroY = 50
    } else if (previewStep === 5) {
      // Bounce back: hero stops cleanly at wall boundary
      const t = (frame % 80) / 80
      const prog = t < 0.5 ? t * 2 : (1 - t) * 2
      heroX = 24 + prog * 13  // 24 → 37 → 24 (stops before wall)
      heroY = 50
    } else {
      // ps6+: loop around corridor
      const t = (frame * 0.016) % (Math.PI * 2)
      heroX = 24 + Math.sin(t) * 12
      heroY = 50 + Math.cos(t * 0.8) * 16
    }

    // ── Size constraint overlay (step 1) ──
    if (previewStep === 1) {
      ctx.save()
      ctx.strokeStyle = 'rgba(245,158,11,0.7)'; ctx.lineWidth = 1.5; ctx.setLineDash([2, 3])
      ctx.beginPath(); ctx.arc(heroX, heroY, 11, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle = 'rgba(245,158,11,0.9)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(heroX + 14, heroY - 7, 52, 12, 3)
      else ctx.rect(heroX + 14, heroY - 7, 52, 12)
      ctx.fill()
      ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
      ctx.fillText('size: 25 ✓', heroX + 18, heroY - 1)
      ctx.restore()
    }

    // ── ↑↓ key hints (step 2 only) ──
    if (previewStep === 2) {
      const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.07))
      ctx.save(); ctx.globalAlpha = pulse * 0.75
      const ks = 13; const kx = heroX + 18
      for (const [ky2, arrow] of [[heroY - 18, '▲'], [heroY + 18, '▼']]) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(kx - ks / 2, ky2 - ks / 2, ks, ks, 2)
        else ctx.rect(kx - ks / 2, ky2 - ks / 2, ks, ks)
        ctx.fill(); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = '9px sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(arrow, kx, ky2)
      }
      ctx.restore()
    }

    // ── ←→↑↓ key hints (step 3 only) ──
    if (previewStep === 3) {
      const pulse = 0.4 + 0.4 * Math.abs(Math.sin(frame * 0.07))
      ctx.save(); ctx.globalAlpha = pulse * 0.65
      const ks = 11
      for (const [ddx, ddy, arrow] of [[0, -18, '▲'], [0, 18, '▼'], [-18, 0, '◀'], [18, 0, '▶']]) {
        ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(heroX + ddx - ks / 2, heroY + ddy - ks / 2, ks, ks, 2)
        else ctx.rect(heroX + ddx - ks / 2, heroY + ddy - ks / 2, ks, ks)
        ctx.fill(); ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = '8px sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(arrow, heroX + ddx, heroY + ddy)
      }
      ctx.restore()
    }

    // ── Colour detection glow + tooltip (step 4: sense wall, no rollback) ──
    if (previewStep === 4 && heroX > 35) {
      const depth = Math.min(1, (heroX - 35) / 18)
      ctx.save(); ctx.globalAlpha = depth * 0.55
      ctx.fillStyle = '#5CB1D6'
      ctx.beginPath(); ctx.arc(heroX, heroY, 16, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
      ctx.save(); ctx.globalAlpha = depth * 0.9
      ctx.fillStyle = 'rgba(92,177,214,0.92)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(heroX - 36, heroY - 24, 72, 13, 3)
      else ctx.rect(heroX - 36, heroY - 24, 72, 13)
      ctx.fill()
      ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('touching color? ✓', heroX, heroY - 17)
      ctx.restore()
    }

    // ── Wall collision flash + rollback tooltip (step 5: bounce back) ──
    if (previewStep === 5) {
      const cycle = frame % 70
      if (cycle < 14) {
        ctx.save()
        ctx.globalAlpha = (14 - cycle) / 14 * 0.75
        ctx.fillStyle = '#ff4444'
        ctx.beginPath(); ctx.arc(heroX, heroY, 17, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }
      if (cycle < 35) {
        const a = Math.sin((cycle / 35) * Math.PI)
        ctx.save(); ctx.globalAlpha = a * 0.9
        ctx.fillStyle = 'rgba(255,60,60,0.85)'
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(heroX - 42, heroY - 24, 84, 13, 3)
        else ctx.rect(heroX - 42, heroY - 24, 84, 13)
        ctx.fill()
        ctx.fillStyle = '#fff'; ctx.font = 'bold 7px Nunito,sans-serif'
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText('touching color? → go back!', heroX, heroY - 17)
        ctx.restore()
      }
    }

    drawMazeHero(ctx, heroX, heroY, frame, heroMoving)
  }

  // ── Exit star (step 6+) ──
  if (previewStep >= 6) {
    const sx = W - 24; const sy = H - 24
    const glow = 0.35 + 0.35 * Math.abs(Math.sin(frame * 0.07))
    ctx.save(); ctx.globalAlpha = glow * 0.4
    ctx.fillStyle = '#ffd700'
    ctx.beginPath(); ctx.arc(sx, sy, 18, 0, Math.PI * 2); ctx.fill()
    ctx.restore()
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
    ctx.fillStyle = 'rgba(255,215,0,0.65)'; ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'
    ctx.fillText('EXIT', sx, sy - 13)

    // Win flash (step 7+ only)
    if (previewStep >= 7 && frame % 130 > 100) {
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

  // ── Timer HUD (step 8) ──
  if (previewStep >= 8) {
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

/* ──────────────── Catch the Stars helpers ──────────────── */

function drawBowl(ctx, cx, y) {
  // Rim
  ctx.fillStyle = '#818cf8'
  ctx.fillRect(cx - 26, y - 5, 52, 7)
  // Body (trapezoid)
  ctx.fillStyle = '#6366f1'
  ctx.beginPath()
  ctx.moveTo(cx - 24, y + 2)
  ctx.lineTo(cx + 24, y + 2)
  ctx.lineTo(cx + 18, y + 20)
  ctx.quadraticCurveTo(cx, y + 24, cx - 18, y + 20)
  ctx.closePath()
  ctx.fill()
  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.22)'
  ctx.fillRect(cx - 20, y + 4, 14, 4)
}

function drawCollectStar(ctx, cx, cy, r, color = '#ffd700') {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 10
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2
    const b = a + Math.PI / 5
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
    ctx.lineTo(Math.cos(b) * r * 0.4, Math.sin(b) * r * 0.4)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

/* ──────────────── Catch the Stars ──────────────── */
function drawCatchStars(ctx, W, H, frame, previewStep) {
  // Deep space background
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#050515')
  bg.addColorStop(1, '#0a0a2a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Static twinkling starfield (40 dots)
  for (let i = 0; i < 40; i++) {
    const sx = (i * 113 + 7) % W
    const sy = (i * 79 + 11) % (H - 30)
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.05 + i * 0.7))
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.fillRect(sx, sy, i % 5 === 0 ? 2 : 1, i % 5 === 0 ? 2 : 1)
  }

  // Ground line near bottom
  ctx.fillStyle = 'rgba(99,102,241,0.3)'
  ctx.fillRect(0, H - 12, W, 12)

  const GY = H - 28  // bowl y position
  const RANDOM_XS = [W * 0.2, W * 0.5, W * 0.8]

  // ── Step 0: Night sky backdrop label + shooting star ──
  if (previewStep === 0) {
    // Shooting star streak
    const st = frame % 80
    if (st < 60) {
      const sx0 = W * 0.1 + st * 2.5
      const sy0 = H * 0.1 + st * 0.5
      ctx.save()
      ctx.strokeStyle = 'rgba(255,255,200,0.8)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(sx0, sy0)
      ctx.lineTo(sx0 - 30, sy0 - 12)
      ctx.stroke()
      ctx.restore()
    }
    // Label pill
    ctx.fillStyle = 'rgba(99,102,241,0.88)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 58, H - 22, 116, 14, 5)
    else ctx.rect(W / 2 - 58, H - 22, 116, 14)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🌌 Choose Backdrop', W / 2, H - 15)
    return
  }

  // ── Bowl position ──
  let bowlX
  if (previewStep === 2 || previewStep >= 5) {
    bowlX = W / 2 + Math.sin(frame * 0.04) * 70
  } else if (previewStep === 6) {
    // Bowl moves toward the falling star
    const starX = W / 2
    const t = (frame % 100) / 100
    bowlX = W * 0.15 + (starX - W * 0.15) * Math.min(1, t * 1.5)
  } else {
    bowlX = W / 2
  }

  // Draw bowl (step 1+)
  if (previewStep >= 1) {
    drawBowl(ctx, bowlX, GY)

    // "size: 80 ✓" pill (step 1)
    if (previewStep === 1) {
      ctx.fillStyle = 'rgba(245,158,11,0.9)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(bowlX + 28, GY - 6, 54, 12, 3)
      else ctx.rect(bowlX + 28, GY - 6, 54, 12)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 7px Nunito,sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText('size: 80 ✓', bowlX + 32, GY)
    }

    // ← → key hints (step 2)
    if (previewStep === 2) {
      const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.07))
      ctx.save()
      ctx.globalAlpha = pulse * 0.8
      const ks = 14
      for (const [kx, arrow] of [[bowlX - 30, '◀'], [bowlX + 30, '▶']]) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.strokeStyle = 'rgba(255,255,255,0.4)'
        ctx.lineWidth = 1
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(kx - ks / 2, GY - 25, ks, ks, 2)
        else ctx.rect(kx - ks / 2, GY - 25, ks, ks)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.font = '9px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(arrow, kx, GY - 18)
      }
      ctx.restore()
    }
  }

  // ── Step 3: Ghost star template at top-centre ──
  if (previewStep === 3) {
    ctx.save()
    ctx.globalAlpha = 0.28
    drawCollectStar(ctx, W / 2, 25, 10, '#ffd700')
    ctx.restore()
    // Dashed circle outline
    ctx.save()
    ctx.strokeStyle = '#ffd700'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    ctx.arc(W / 2, 25, 13, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
    // "Star (hidden)" pill
    ctx.fillStyle = 'rgba(245,158,11,0.85)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 42, 42, 84, 12, 4)
    else ctx.rect(W / 2 - 42, 42, 84, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Star (hidden)', W / 2, 48)
    return
  }

  // ── Steps 4+: Falling stars ──
  if (previewStep >= 4) {
    const numStars = previewStep >= 8 ? 4 : previewStep >= 5 ? 3 : 1
    const phases = [0, 40, 80, 20]
    const xPositions = previewStep >= 5
      ? RANDOM_XS
      : [W / 2]

    for (let s = 0; s < numStars; s++) {
      const xPos = xPositions[s % xPositions.length]
      const period = 120
      const t = (frame + phases[s]) % period
      const starY = (t / period) * (H + 20) - 10

      // Caught flash: step 6, star near bowl
      if (previewStep === 6 || previewStep >= 7) {
        const catchPhase = frame % 100
        if (catchPhase > 70 && s === 0) {
          // "⭐ Caught!" bubble
          ctx.save()
          const a = Math.sin(((catchPhase - 70) / 30) * Math.PI)
          ctx.globalAlpha = a
          ctx.fillStyle = 'rgba(255,255,255,0.95)'
          ctx.beginPath()
          if (ctx.roundRect) ctx.roundRect(bowlX - 30, GY - 45, 60, 16, 5)
          else ctx.rect(bowlX - 30, GY - 45, 60, 16)
          ctx.fill()
          ctx.fillStyle = '#333'
          ctx.font = 'bold 8px Nunito,sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('⭐ Caught!', bowlX, GY - 37)
          ctx.restore()
          // Sparkle burst
          const SPARK_COLS = ['#ffd700', '#ff6bff', '#6bffff', '#ff6b35']
          for (let p = 0; p < 6; p++) {
            const angle = (p / 6) * Math.PI * 2
            const r = 8 + a * 14
            ctx.save()
            ctx.globalAlpha = a * 0.8
            ctx.fillStyle = SPARK_COLS[p % 4]
            ctx.beginPath()
            ctx.arc(bowlX + Math.cos(angle) * r, GY - 5 + Math.sin(angle) * r, 2.5, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
          // "touching [Catcher]? ✓" tooltip (step 6)
          if (previewStep === 6) {
            ctx.save()
            ctx.globalAlpha = a
            ctx.fillStyle = 'rgba(92,177,214,0.92)'
            ctx.beginPath()
            if (ctx.roundRect) ctx.roundRect(bowlX - 50, GY - 65, 100, 13, 4)
            else ctx.rect(bowlX - 50, GY - 65, 100, 13)
            ctx.fill()
            ctx.fillStyle = '#fff'
            ctx.font = 'bold 6.5px Nunito,sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText('touching [Catcher]? ✓', bowlX, GY - 58)
            ctx.restore()
          }
          continue
        }
      }

      drawCollectStar(ctx, xPos, starY, 8)
    }
  }

  // ── Score HUD (steps 7+) ──
  if (previewStep >= 7) {
    const score = Math.floor(frame / 60) % 12
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(4, 4, 72, 20, 3)
    else ctx.rect(4, 4, 72, 20)
    ctx.fill()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Score: ${score}`, 8, 14)
  }

  // ── Lives HUD (step 8) ──
  if (previewStep >= 8) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W - 60, 4, 56, 20, 3)
    else ctx.rect(W - 60, 4, 56, 20)
    ctx.fill()
    ctx.fillStyle = '#ff6b6b'
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('♥ ♥ ♥', W - 54, 14)
  }
}

/* ──────────────── Whack-a-Mole helpers ──────────────── */

function drawMoleHead(ctx, cx, cy, r = 15) {
  // head
  ctx.fillStyle = '#8B5E2A'
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
  // snout
  ctx.fillStyle = '#c49a3c'
  ctx.beginPath()
  ctx.ellipse(cx, cy + r * 0.4, r * 0.55, r * 0.38, 0, 0, Math.PI * 2)
  ctx.fill()
  // nose
  ctx.fillStyle = '#1a1a1a'
  ctx.beginPath()
  ctx.ellipse(cx, cy + r * 0.25, 3.5, 2.5, 0, 0, Math.PI * 2)
  ctx.fill()
  // eyes
  for (const ex of [cx - r * 0.38, cx + r * 0.38]) {
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.arc(ex, cy - r * 0.3, 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(ex + 0.8, cy - r * 0.35, 1, 0, Math.PI * 2)
    ctx.fill()
  }
}

/* ──────────────── Whack-a-Mole ──────────────── */
function drawWhackAMole(ctx, W, H, frame, previewStep) {
  // Warm brown dirt background
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#7c5c3a')
  bg.addColorStop(1, '#5c3d1e')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Holes grid
  const HOLES = [
    [W * 0.22, H * 0.45], [W * 0.50, H * 0.45], [W * 0.78, H * 0.45],
    [W * 0.22, H * 0.72], [W * 0.50, H * 0.72], [W * 0.78, H * 0.72],
  ]

  // Draw each hole as a dark oval
  const drawHole = (hx, hy) => {
    // Shadow below hole
    ctx.save()
    ctx.globalAlpha = 0.4
    ctx.fillStyle = '#1a0a00'
    ctx.beginPath()
    ctx.ellipse(hx, hy + 3, 22, 11, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    // Hole
    ctx.fillStyle = '#3a2510'
    ctx.beginPath()
    ctx.ellipse(hx, hy, 20, 9, 0, 0, Math.PI * 2)
    ctx.fill()
    // Rim highlight
    ctx.strokeStyle = 'rgba(100,60,20,0.5)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.ellipse(hx, hy - 1, 20, 8, 0, 0, Math.PI)
    ctx.stroke()
  }

  HOLES.forEach(([hx, hy]) => drawHole(hx, hy))

  // ── Step 0: Paint Editor animation ──
  if (previewStep === 0) {
    // Animate drawing one hole
    const prog = Math.min(1, (frame % 90) / 60)
    const [hx, hy] = HOLES[1]
    ctx.save()
    ctx.globalAlpha = 0.7
    ctx.fillStyle = '#2a1505'
    ctx.beginPath()
    ctx.ellipse(hx, hy, 20 * prog, 9 * prog, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    // Brush cursor
    const bpulse = Math.sin(frame * 0.2) * 2
    ctx.fillStyle = '#d946ef'
    ctx.beginPath()
    ctx.arc(hx + 20 * prog, hy, 4 + bpulse, 0, Math.PI * 2)
    ctx.fill()
    // Label pill
    ctx.fillStyle = 'rgba(217,70,239,0.88)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 44, H - 20, 88, 14, 5)
    else ctx.rect(W / 2 - 44, H - 20, 88, 14)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('✏️ Paint Editor', W / 2, H - 13)
    return
  }

  // ── Step 1: Ghost mole at top-centre hole ──
  if (previewStep === 1) {
    const [hx, hy] = HOLES[1]
    ctx.save()
    ctx.globalAlpha = 0.25
    drawMoleHead(ctx, hx, hy - 8)
    ctx.restore()
    // "Mole sprite (hidden)" pill
    ctx.fillStyle = 'rgba(245,158,11,0.88)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(hx - 52, hy - 32, 104, 12, 4)
    else ctx.rect(hx - 52, hy - 32, 104, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Mole sprite (hidden)', hx, hy - 26)
    return
  }

  // ── Step 2: Mole clone appears at random hole (flash) ──
  if (previewStep === 2) {
    const holeIdx = Math.floor(frame / 70) % HOLES.length
    const [hx, hy] = HOLES[holeIdx]
    const flashT = frame % 70
    const alpha = flashT < 10 ? flashT / 10 : flashT < 55 ? 1 : (70 - flashT) / 15
    ctx.save()
    ctx.globalAlpha = Math.max(0, alpha)
    drawMoleHead(ctx, hx, hy - 8)
    ctx.restore()
    // Tooltip
    const tipAlpha = Math.min(1, alpha)
    ctx.save()
    ctx.globalAlpha = tipAlpha * 0.85
    ctx.fillStyle = 'rgba(92,177,214,0.9)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(hx - 52, hy - 32, 104, 12, 4)
    else ctx.rect(hx - 52, hy - 32, 104, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('go to random hole', hx, hy - 26)
    ctx.restore()
    return
  }

  // ── Step 3: Mole pops up at HOLES[4] (animate emergence) ──
  if (previewStep === 3) {
    const [hx, hy] = HOLES[4]
    // Oscillate: visible when offset < 0
    const cycleT = frame % 120
    let yOff
    if (cycleT < 50) {
      yOff = -14 * Math.min(1, cycleT / 20)  // emerge
    } else if (cycleT < 80) {
      yOff = -14  // visible
    } else {
      yOff = -14 + 14 * Math.min(1, (cycleT - 80) / 20)  // retreat
    }
    ctx.save()
    // Clip to hole region so mole appears to emerge from underground
    ctx.beginPath()
    ctx.ellipse(hx, hy, 20, 10, 0, 0, Math.PI * 2)
    ctx.rect(hx - 22, hy - 30, 44, 30)
    ctx.clip()
    if (yOff < 0) drawMoleHead(ctx, hx, hy + yOff)
    ctx.restore()
    return
  }

  // ── Step 4: Cursor (hand pointer) over mole at HOLES[1] ──
  if (previewStep === 4) {
    const [hx, hy] = HOLES[1]
    drawMoleHead(ctx, hx, hy - 10)
    // Wider eyes (alarmed)
    ctx.fillStyle = '#ff4444'
    ctx.beginPath()
    ctx.arc(hx - 5.7, hy - 13, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(hx + 5.7, hy - 13, 3, 0, Math.PI * 2)
    ctx.fill()
    // Hand cursor (simplified arrow)
    const cpulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.1))
    const cx = hx + 18, cy = hy - 25
    ctx.save()
    ctx.globalAlpha = cpulse
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx, cy + 16)
    ctx.lineTo(cx + 4, cy + 12)
    ctx.lineTo(cx + 7, cy + 18)
    ctx.lineTo(cx + 9, cy + 17)
    ctx.lineTo(cx + 6, cy + 11)
    ctx.lineTo(cx + 11, cy + 11)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
    ctx.restore()
    // "click!" label
    ctx.save()
    ctx.globalAlpha = cpulse
    ctx.fillStyle = 'rgba(236,72,153,0.9)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(hx + 10, hy - 44, 42, 12, 4)
    else ctx.rect(hx + 10, hy - 44, 42, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('click!', hx + 31, hy - 38)
    ctx.restore()
    return
  }

  // ── Step 5: Hit sparkle burst on HOLES[4] + score HUD ──
  if (previewStep === 5) {
    const [hx, hy] = HOLES[4]
    const hitT = frame % 60
    const prog = hitT / 60
    const SPARK_COLS = ['#ffd700', '#ff6b35', '#ff6bff', '#6bffff']
    for (let p = 0; p < 8; p++) {
      const angle = (p / 8) * Math.PI * 2
      const r = prog * 22
      ctx.save()
      ctx.globalAlpha = (1 - prog) * 0.85
      ctx.fillStyle = SPARK_COLS[p % 4]
      ctx.beginPath()
      ctx.arc(hx + Math.cos(angle) * r, hy + Math.sin(angle) * r, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
    const score = Math.floor(frame / 60)
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(4, 4, 72, 20, 3)
    else ctx.rect(4, 4, 72, 20)
    ctx.fill()
    ctx.fillStyle = '#ffd700'
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Score: ${score}`, 8, 14)
    return
  }

  // ── Steps 6+: Multiple moles cycling simultaneously ──
  if (previewStep >= 6) {
    const phases = [0, 40, 80, 20, 60, 100]
    HOLES.forEach(([hx, hy], i) => {
      const cycleT = (frame + phases[i]) % 100
      if (cycleT < 70) {
        const yOff = cycleT < 15 ? -12 * (cycleT / 15) : cycleT < 55 ? -12 : -12 + 12 * ((cycleT - 55) / 15)
        if (yOff < 0) {
          ctx.save()
          ctx.beginPath()
          ctx.ellipse(hx, hy, 20, 10, 0, 0, Math.PI * 2)
          ctx.rect(hx - 22, hy - 30, 44, 30)
          ctx.clip()
          drawMoleHead(ctx, hx, hy + yOff)
          ctx.restore()
        }
      }
    })

    // ── Step 7: Timer HUD ──
    if (previewStep >= 7) {
      const timerVal = Math.max(0, 30 - Math.floor(frame / 30))
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(W - 70, 4, 66, 20, 3)
      else ctx.rect(W - 70, 4, 66, 20)
      ctx.fill()
      ctx.fillStyle = timerVal < 10 ? '#ff6b6b' : '#ffd700'
      ctx.font = 'bold 10px Nunito,sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`⏱ ${timerVal}s`, W - 64, 14)
    }

    // ── Step 8: Full game — score + timer ──
    if (previewStep >= 8) {
      const score = Math.floor(frame / 40) % 20
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.beginPath()
      if (ctx.roundRect) ctx.roundRect(4, 4, 72, 20, 3)
      else ctx.rect(4, 4, 72, 20)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 10px Nunito,sans-serif'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      ctx.fillText(`Score: ${score}`, 8, 14)
    }
  }
}

/* ──────────────── Sky Drifter helpers ──────────────── */

function drawSkyBird(ctx, x, y, flapAngle) {
  ctx.save()
  ctx.translate(x, y)
  // wing
  ctx.fillStyle = '#fbbf24'
  ctx.save()
  ctx.rotate(flapAngle)
  ctx.beginPath()
  ctx.ellipse(0, -8, 13, 5, -0.4, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  // body
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2)
  ctx.fill()
  // tail
  ctx.fillStyle = '#d97706'
  ctx.beginPath()
  ctx.moveTo(-13, 0)
  ctx.lineTo(-21, -5)
  ctx.lineTo(-21, 5)
  ctx.closePath()
  ctx.fill()
  // eye
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(6, -2, 5, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#111'
  ctx.beginPath()
  ctx.arc(7, -2, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(8, -3, 1.2, 0, Math.PI * 2)
  ctx.fill()
  // beak
  ctx.fillStyle = '#f97316'
  ctx.beginPath()
  ctx.moveTo(14, -1)
  ctx.lineTo(21, 0)
  ctx.lineTo(14, 4)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawPipes(ctx, x, gapCY, gapH, H) {
  const pw = 28, cap = 14
  const gapTop = gapCY - gapH / 2
  const gapBot = gapCY + gapH / 2
  // top pipe
  ctx.fillStyle = '#22c55e'
  ctx.fillRect(x - pw / 2, 0, pw, gapTop - cap)
  ctx.fillStyle = '#16a34a'
  ctx.fillRect(x - pw / 2 - 3, gapTop - cap, pw + 6, cap)
  // bottom pipe
  ctx.fillStyle = '#22c55e'
  ctx.fillRect(x - pw / 2, gapBot + cap, pw, H - gapBot - cap)
  ctx.fillStyle = '#16a34a'
  ctx.fillRect(x - pw / 2 - 3, gapBot, pw + 6, cap)
}

/* ──────────────── Sky Drifter ──────────────── */
function drawSkyDrifter(ctx, W, H, frame, previewStep) {
  // Sky gradient background
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0, '#87ceeb')
  bg.addColorStop(1, '#b0e0ff')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Scrolling clouds (3 clouds)
  const cloudData = [
    { baseX: W * 0.15, y: H * 0.12, r: 22, speed: 0.18 },
    { baseX: W * 0.55, y: H * 0.22, r: 18, speed: 0.11 },
    { baseX: W * 0.82, y: H * 0.08, r: 26, speed: 0.15 },
  ]
  cloudData.forEach(({ baseX, y, r, speed }) => {
    const cx = (baseX + frame * speed) % (W + 80) - 40
    drawCloud(ctx, cx, y, r)
  })

  // ── Step 0: pure sky + "Choose Backdrop" pill ──
  if (previewStep === 0) {
    ctx.fillStyle = 'rgba(99,102,241,0.88)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(W / 2 - 58, H - 22, 116, 14, 5)
    else ctx.rect(W / 2 - 58, H - 22, 116, 14)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🌤️ Choose Backdrop', W / 2, H - 15)
    return
  }

  const GAP_H = 60

  // ── Bird position ──
  let birdY, birdFlap = 0
  if (previewStep === 1) {
    // Static
    birdY = H / 2
  } else if (previewStep === 2) {
    // Falls with simulated gravity (loops)
    birdY = H * 0.3 + ((frame % 80) / 80) * H * 0.5
    birdFlap = 0
  } else if (previewStep === 3) {
    // Flapping: oscillates up and down
    birdY = H / 2 - Math.sin(frame * 0.08) * 40
    birdFlap = Math.sin(frame * 0.2) * 0.5
  } else if (previewStep === 7) {
    // Bird hits pipe flash
    birdY = H / 2 + Math.sin(frame * 0.05) * 20
    birdFlap = Math.sin(frame * 0.2) * 0.4
  } else {
    // Normal flapping flight
    birdY = H / 2 - Math.sin(frame * 0.06) * 30
    birdFlap = Math.sin(frame * 0.2) * 0.5
  }

  const birdX = W * 0.25

  // ── Step 1: "size: 50 ✓" pill ──
  if (previewStep === 1) {
    ctx.fillStyle = 'rgba(245,158,11,0.9)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(birdX + 22, birdY - 8, 52, 12, 3)
    else ctx.rect(birdX + 22, birdY - 8, 52, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText('size: 50 ✓', birdX + 26, birdY - 2)
  }

  // ── Step 3: SPACE key hint ──
  if (previewStep === 3) {
    const pulse = 0.5 + 0.5 * Math.abs(Math.sin(frame * 0.08))
    ctx.save()
    ctx.globalAlpha = pulse * 0.85
    ctx.fillStyle = 'rgba(255,255,0,0.15)'
    ctx.strokeStyle = 'rgba(255,255,0,0.5)'
    ctx.lineWidth = 1
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(birdX - 22, H - 18, 44, 12, 3)
    else ctx.rect(birdX - 22, H - 18, 44, 12)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,0,0.9)'
    ctx.font = 'bold 8px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('SPACE', birdX, H - 12)
    ctx.restore()
  }

  // ── Steps 4+: Pipes ──
  if (previewStep === 4) {
    // Ghost pipe pair at right (dashed outlines)
    const gpX = W * 0.85
    const gpCY = H / 2
    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.strokeStyle = '#22c55e'
    ctx.lineWidth = 2
    ctx.setLineDash([4, 4])
    // top pipe outline
    ctx.strokeRect(gpX - 14, 0, 28, gpCY - GAP_H / 2 - 14)
    ctx.strokeRect(gpX - 17, gpCY - GAP_H / 2 - 14, 34, 14)
    // bottom pipe outline
    ctx.strokeRect(gpX - 14, gpCY + GAP_H / 2, 28, H - (gpCY + GAP_H / 2 + 14))
    ctx.strokeRect(gpX - 17, gpCY + GAP_H / 2, 34, 14)
    ctx.setLineDash([])
    ctx.restore()
    // "Pipe sprite (hidden)" faded pill
    ctx.save()
    ctx.globalAlpha = 0.5
    ctx.fillStyle = 'rgba(34,197,94,0.85)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(gpX - 50, H / 2 - 6, 100, 12, 4)
    else ctx.rect(gpX - 50, H / 2 - 6, 100, 12)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 7px Nunito,sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('Pipe sprite (hidden)', gpX, H / 2)
    ctx.restore()
  } else if (previewStep === 5) {
    // Single pipe pair scrolling left
    const px = W - ((frame % (W + 50)) / (W + 50)) * (W + 50)
    drawPipes(ctx, px, H / 2, GAP_H, H)
  } else if (previewStep >= 6) {
    // Two pipe pairs at different heights
    const pipeData = [
      { offset: 0, gapCY: H * 0.4 },
      { offset: (W + 50) / 2, gapCY: H * 0.6 },
    ]
    pipeData.forEach(({ offset, gapCY }) => {
      const px = W - ((frame + offset) % (W + 50)) / (W + 50) * (W + 50)
      if (px > -40 && px < W + 40) drawPipes(ctx, px, gapCY, GAP_H, H)
    })
  }

  // ── Step 7: Bird hits pipe — red flash + "Game Over 💥" overlay ──
  if (previewStep === 7) {
    const cycleT = frame % 150
    if (cycleT > 100) {
      const prog = (cycleT - 100) / 50
      ctx.save()
      ctx.globalAlpha = Math.sin(prog * Math.PI) * 0.7
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#ff4444'
      ctx.font = 'bold 12px Nunito,sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Game Over 💥', W / 2, H / 2)
      ctx.restore()
    }
    // Red flash on bird when near collision frame
    if (cycleT > 90 && cycleT < 110) {
      const flashAlpha = Math.sin(((cycleT - 90) / 20) * Math.PI) * 0.6
      ctx.save()
      ctx.globalAlpha = flashAlpha
      ctx.fillStyle = '#ff4444'
      ctx.beginPath()
      ctx.arc(birdX, birdY, 16, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  // ── Draw Bird (all steps 1+) ──
  drawSkyBird(ctx, birdX, birdY, birdFlap)

  // ── Step 8: Score HUD + pipes scroll, score increments ──
  if (previewStep >= 8) {
    const score = Math.floor(frame / 90)
    ctx.fillStyle = 'rgba(0,0,50,0.55)'
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(4, 4, 72, 20, 3)
    else ctx.rect(4, 4, 72, 20)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 10px Nunito,sans-serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Score: ${score}`, 8, 14)
  }
}

const RENDERERS = {
  'apple-collector': drawAppleCollector,
  'space-shooter':  drawSpaceShooter,
  'maze-runner':    drawMaze,
  'catch-stars':    drawCatchStars,
  'whack-a-mole':   drawWhackAMole,
  'sky-drifter':    drawSkyDrifter,
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
