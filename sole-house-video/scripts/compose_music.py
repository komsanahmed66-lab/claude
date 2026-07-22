"""
Original instrumental composition for the Sole House promo video.
Synthesized from scratch (sine/triangle oscillators + ADSR envelopes) --
no samples, no external audio, no copyright concerns. Timed to match
the video's section durations exactly (30fps, see SoleHouseVideo.tsx).
"""
import numpy as np
import wave
import struct

SR = 44100
FPS = 30

# Section frame durations, must mirror src/SoleHouseVideo.tsx DURATIONS
DURATIONS_FRAMES = {
    "problem": 55 * 4,
    "problemPunch": 85,
    "intro": 80,
    "sectionHead": 90,
    "services": 50 * 8,
    "statement": 105,
    "quote": 120,
    "closing": 130,
}
TOTAL_FRAMES = sum(DURATIONS_FRAMES.values())
TOTAL_SECONDS = TOTAL_FRAMES / FPS

starts = {}
t = 0.0
for name, frames in DURATIONS_FRAMES.items():
    starts[name] = t
    t += frames / FPS

# --- note frequencies (equal temperament, A4 = 440) ---
def note(n, octave):
    # n: semitone offset from C in that octave (0=C,2=D,4=E,5=F,7=G,9=A,11=B)
    return 440.0 * (2 ** ((octave - 4) + (n - 9) / 12))

C, D, E, F, G, A, B = 0, 2, 4, 5, 7, 9, 11

CHORDS_LOW = {
    "Am": [note(A, 2), note(C, 3), note(E, 3)],
    "F":  [note(F, 2), note(A, 2), note(C, 3)],
    "C":  [note(C, 3), note(E, 3), note(G, 3)],
    "G":  [note(G, 2), note(B, 2), note(D, 3)],
}
CHORDS_ARP = {
    "Am": [note(A, 3), note(C, 4), note(E, 4), note(A, 4)],
    "F":  [note(F, 3), note(A, 3), note(C, 4), note(F, 4)],
    "C":  [note(C, 4), note(E, 4), note(G, 4), note(C, 5)],
    "G":  [note(G, 3), note(B, 3), note(D, 4), note(G, 4)],
}

buffer = np.zeros(int(TOTAL_SECONDS * SR) + SR, dtype=np.float64)


def add_at(start_time, signal):
    start_idx = int(start_time * SR)
    end_idx = start_idx + len(signal)
    if end_idx > len(buffer):
        signal = signal[: len(buffer) - start_idx]
        end_idx = len(buffer)
    if start_idx < 0 or len(signal) <= 0:
        return
    buffer[start_idx:end_idx] += signal


def adsr(n, sr, attack, release, sustain_start=None):
    env = np.ones(n)
    a = int(attack * sr)
    r = int(release * sr)
    a = min(a, n)
    r = min(r, n - a) if n - a > 0 else 0
    if a > 0:
        env[:a] = np.linspace(0, 1, a)
    if r > 0:
        env[n - r :] = np.linspace(1, 0, r)
    return env


def pad_tone(freqs, dur, attack=1.0, release=1.2, amp=0.07, detune_cents=6):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    wave_sig = np.zeros(n)
    for f in freqs:
        detune = f * (2 ** (detune_cents / 1200) - 1)
        wave_sig += np.sin(2 * np.pi * f * tt)
        wave_sig += 0.55 * np.sin(2 * np.pi * (f + detune) * tt)
        wave_sig += 0.3 * np.sin(2 * np.pi * (f - detune) * tt)
    wave_sig /= len(freqs) * 1.85
    env = adsr(n, SR, attack, release)
    return wave_sig * env * amp


def pluck_tone(freq, dur=0.9, amp=0.1, decay=4.2):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    wave_sig = np.sin(2 * np.pi * freq * tt) + 0.28 * np.sin(2 * np.pi * freq * 2 * tt)
    attack_n = int(0.006 * SR)
    env = np.ones(n)
    if attack_n > 0:
        env[:attack_n] = np.linspace(0, 1, attack_n)
    env *= np.exp(-tt * decay)
    return wave_sig * env * amp


def sub_drone(freq, dur, amp=0.05, attack=1.5, release=2.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    wave_sig = np.sin(2 * np.pi * freq * tt)
    env = adsr(n, SR, attack, release)
    return wave_sig * env * amp


# --- 1. problem: sparse tension, low Am drone + soft high plucks per vendor beat ---
add_at(starts["problem"], sub_drone(note(A, 1), DURATIONS_FRAMES["problem"] / FPS, amp=0.045))
item_dur = 55 / FPS
for i in range(4):
    add_at(starts["problem"] + i * item_dur + 0.05, pluck_tone(note(E, 5), dur=0.7, amp=0.045, decay=5.5))

# --- 2. problemPunch: swell from tension into F, resolving toward the reveal ---
add_at(starts["problemPunch"], pad_tone(CHORDS_LOW["F"], DURATIONS_FRAMES["problemPunch"] / FPS, attack=1.4, release=0.6, amp=0.075))
add_at(starts["problemPunch"] + 32 / FPS, pluck_tone(note(A, 4), dur=1.0, amp=0.08, decay=3.0))

# --- 3. intro: resolve to C major, warm open triad for the wordmark reveal ---
add_at(starts["intro"], pad_tone(CHORDS_LOW["C"], DURATIONS_FRAMES["intro"] / FPS, attack=0.9, release=0.8, amp=0.085))

# --- 4. sectionHead: soft sustained C, gentle ascending arpeggio lead-in ---
add_at(starts["sectionHead"], pad_tone(CHORDS_LOW["C"], DURATIONS_FRAMES["sectionHead"] / FPS, attack=0.3, release=1.0, amp=0.07))
arp_c = CHORDS_ARP["C"]
for i, f in enumerate(arp_c[:3]):
    add_at(starts["sectionHead"] + 1.0 + i * 0.35, pluck_tone(f, dur=0.7, amp=0.06, decay=5.0))

# --- 5. services: cycling Am-F-C-G progression + one arpeggio pluck per service item ---
progression = ["Am", "F", "C", "G"]
services_dur = DURATIONS_FRAMES["services"] / FPS
chord_dur = services_dur / len(progression)
service_item_dur = 50 / FPS
for i, chord in enumerate(progression):
    add_at(starts["services"] + i * chord_dur, pad_tone(CHORDS_LOW[chord], chord_dur + 0.4, attack=0.5, release=1.0, amp=0.06))

for i in range(8):
    chord_name = progression[(i // 2) % len(progression)]
    arp_notes = CHORDS_ARP[chord_name]
    freq = arp_notes[i % len(arp_notes)]
    add_at(starts["services"] + i * service_item_dur + 0.04, pluck_tone(freq, dur=0.85, amp=0.075, decay=4.0))

# --- 6. statement: big emotional swell F -> C ---
half = DURATIONS_FRAMES["statement"] / FPS / 2
add_at(starts["statement"], pad_tone(CHORDS_LOW["F"], half + 0.3, attack=0.2, release=0.6, amp=0.08))
add_at(starts["statement"] + half, pad_tone(CHORDS_LOW["C"], half + 0.3, attack=0.3, release=1.2, amp=0.09))

# --- 7. quote: sparse, contemplative Am ---
add_at(starts["quote"], pad_tone(CHORDS_LOW["Am"], DURATIONS_FRAMES["quote"] / FPS, attack=1.2, release=1.8, amp=0.05))

# --- 8. closing: final warm C major resolve, fades to silence ---
closing_dur = DURATIONS_FRAMES["closing"] / FPS
add_at(starts["closing"], pad_tone(CHORDS_LOW["C"], closing_dur, attack=0.6, release=2.5, amp=0.09))
add_at(starts["closing"] + 0.3, pluck_tone(note(C, 5), dur=1.4, amp=0.06, decay=2.2))

# --- finalize: trim to exact video length, normalize, write 16-bit PCM WAV ---
buffer = buffer[: int(TOTAL_SECONDS * SR)]
peak = np.max(np.abs(buffer))
if peak > 0:
    buffer = buffer / peak * 0.55

pcm = (buffer * 32767).astype(np.int16)

with wave.open("public/music/theme.wav", "wb") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())

print(f"Wrote {TOTAL_SECONDS:.3f}s of music to public/music/theme.wav")
