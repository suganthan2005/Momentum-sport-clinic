"use client";

import { FormEvent, useState } from "react";

const areas = [
  {
    name: "Knee",
    detail: "Stairs, standing up, walking",
    image: "/knee-pain.jpg",
    imageAlt: "Close-up of hands holding a painful knee",
    imagePosition: "60% center",
  },
  {
    name: "Shoulder",
    detail: "Reaching, lifting, sleeping",
    image: "/shoulder-pain.jpg",
    imageAlt: "Close-up of a person holding their painful shoulder",
    imagePosition: "25% center",
  },
  {
    name: "Neck",
    detail: "Stiffness, posture, headaches",
    image: "/neck-pain.jpg",
    imageAlt: "Rear view of a person holding the back of their neck",
    imagePosition: "center 70%",
  },
  {
    name: "Back",
    detail: "Morning stiffness, bending, sitting",
    image: "/back-pain.jpg",
    imageAlt: "Close-up of hands resting on a painful lower back",
    imagePosition: "center center",
  },
];

const redFlags = [
  "Pain that wakes you at night or does not ease with rest",
  "Numbness, tingling, or weakness in an arm or leg",
  "Recent fall, injury, or sudden swelling",
  "Fever, unexplained weight loss, chest pain, or breathlessness",
  "Loss of bladder or bowel control",
];

type AssessmentResult = {
  area: string;
  firstName: string;
  hasSafetyConcern: boolean;
  summary: string;
};

export default function Home() {
  const [selectedArea, setSelectedArea] = useState("Knee");
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [phoneError, setPhoneError] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy summary");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");

    if (phone.length !== 10) {
      setPhoneError("Enter a 10-digit mobile number so the team can reach you.");
      setAssessmentResult(null);
      return;
    }

    setPhoneError("");
    const area = String(formData.get("area") ?? selectedArea);
    const name = String(formData.get("name") ?? "").trim();
    const firstName = name.split(/\s+/)[0] || "there";
    const checkedFlags = redFlags.filter((_, index) => formData.get(`flag-${index}`) === "on");
    const hasSafetyConcern = checkedFlags.length > 0;
    const summary = [
      "Momentum After 50+ assessment",
      `Name: ${name || "-"}`,
      `Age: ${formData.get("age") || "-"}`,
      `Mobile: ${phone}`,
      `City: ${formData.get("city") || "-"}`,
      `Problem area: ${area}`,
      `How long: ${formData.get("duration") || "-"}`,
      `Pain today: ${formData.get("pain") || "-"}/10`,
      `Safety symptoms selected: ${checkedFlags.length}`,
      `Goal: ${formData.get("goal") || "-"}`,
    ].join("\n");

    setCopyStatus("Copy summary");
    setAssessmentResult({ area, firstName, hasSafetyConcern, summary });
  }

  async function copySummary() {
    if (!assessmentResult) return;

    try {
      await navigator.clipboard.writeText(assessmentResult.summary);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Select the summary to copy");
    }
  }

  return (
    <main className="site-shell" id="top">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand-lockup" href="#top" aria-label="Momentum After 50+ home">
          <img src="/momentum_logo.jpeg" alt="Momentum After 50+" />
        </a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#membership">Pricing</a>
          <a className="nav-cta" href="#assessment">Start assessment</a>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Seen us on Instagram? Start here.</p>
          <h1>Move well after 50, from home.</h1>
          <p className="hero-lede">
            Guided physiotherapy for knee, shoulder, neck, and back pain — built around the movement you want back.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment">Find my starting point <span aria-hidden="true">→</span></a>
            <span className="hero-time"><strong>3 min</strong> assessment</span>
          </div>
          <div className="hero-proof" aria-label="Momentum benefits">
            <span><i aria-hidden="true">✓</i> Home-based</span>
            <span><i aria-hidden="true">✓</i> Expert-led</span>
            <span><i aria-hidden="true">✓</i> Cancel anytime</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1500&q=85"
            alt="A woman exercising at home with focused, controlled movement"
          />
          <div className="hero-caption"><span className="caption-dot" /> Small steps. Stronger days.</div>
          <div className="hero-stat"><strong>15–25</strong><span>minute sessions</span></div>
        </div>
      </section>

      <section className="quick-start section-space" id="assessment" aria-labelledby="assessment-heading">
        <div className="quick-start-heading">
          <div>
            <p className="section-kicker">Your first step</p>
            <h2 id="assessment-heading">Let&apos;s find what fits you.</h2>
            <p className="section-lede">Answer a few simple questions. We&apos;ll use your answers to recommend the right place to begin.</p>
          </div>
          <div className="step-marker" aria-label="Step 1 of 2"><span>01</span><i /> <span>02</span></div>
        </div>

        <div className="quick-start-grid">
          <div className="area-picker">
            <div className="subhead-row"><h3>Where do you need support?</h3><span>Pick one</span></div>
            <div className="area-grid" role="group" aria-label="Choose your problem area">
              {areas.map((area) => (
                <button
                  className={`area-card ${selectedArea === area.name ? "is-selected" : ""}`}
                  key={area.name}
                  type="button"
                  aria-pressed={selectedArea === area.name}
                  onClick={() => setSelectedArea(area.name)}
                >
                  <img src={area.image} alt={area.imageAlt} style={{ objectPosition: area.imagePosition }} />
                  <span className="area-card-overlay" />
                  <span className="area-card-content"><strong>{area.name}</strong><span>{area.detail}</span></span>
                  {selectedArea === area.name && <span className="selected-mark" aria-label="Selected">✓</span>}
                </button>
              ))}
            </div>
            <p className="selection-message" aria-live="polite">Starting with your <strong>{selectedArea.toLowerCase()}</strong> program.</p>
          </div>

          <aside className="price-panel" id="membership" aria-labelledby="price-heading">
            <div className="price-topline"><span>Momentum membership</span><span>Cancel anytime</span></div>
            <h3 id="price-heading">A simple plan for steady progress.</h3>
            <div className="price-amount">₹2,999 <small>per month</small></div>
            <ul>
              <li><span aria-hidden="true">✓</span> All four problem-area programs</li>
              <li><span aria-hidden="true">✓</span> Guided 15–25 minute sessions</li>
              <li><span aria-hidden="true">✓</span> Monthly progress check</li>
              <li><span aria-hidden="true">✓</span> Home exercise kit included</li>
            </ul>
            <p className="price-note">Your assessment helps us confirm the best starting program before you pay.</p>
          </aside>
        </div>

        <form className="assessment-form" onSubmit={handleSubmit}>
          <div className="form-heading"><div><span className="form-step">02</span><h3>Tell us a little about you</h3></div><span className="form-required">All fields marked * are required</span></div>
          <div className="form-row">
            <label>Full name *<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
            <label>Age *<input name="age" type="number" min="18" max="110" placeholder="Your age" inputMode="numeric" required /></label>
          </div>
          <div className="form-row">
            <label>Mobile number *
              <input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit number" aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? "phone-error" : undefined} required />
              {phoneError && <span className="field-error" id="phone-error">{phoneError}</span>}
            </label>
            <label>City<input name="city" type="text" placeholder="Where you live" autoComplete="address-level2" /></label>
          </div>
          <input type="hidden" name="area" value={selectedArea} readOnly />
          <div className="form-row">
            <label>How long has this bothered you?
              <select name="duration"><option>Under 1 month</option><option>1 to 6 months</option><option>6 months to 2 years</option><option>Over 2 years</option></select>
            </label>
            <label>Pain today, 0 to 10<input name="pain" type="number" min="0" max="10" placeholder="0 to 10" inputMode="numeric" /></label>
          </div>
          <fieldset>
            <legend>Before you begin</legend>
            <p className="field-help">Tick anything that applies. These symptoms need a doctor&apos;s opinion before exercise.</p>
            <div className="checkbox-list">
              {redFlags.map((flag, index) => <label key={flag}><input name={`flag-${index}`} type="checkbox" /><span>{flag}</span></label>)}
            </div>
          </fieldset>
          <label>What do you want to do again?
            <textarea name="goal" rows={3} placeholder="Climb stairs, sleep through the night, play with grandchildren" />
          </label>
          <button className="button button-primary form-submit" type="submit">Get my program match <span aria-hidden="true">→</span></button>
          <p className="form-privacy"><span aria-hidden="true">▣</span> Your answers stay private and help our team prepare for your call.</p>
          {assessmentResult && (
            <div className={`form-result ${assessmentResult.hasSafetyConcern ? "form-result-warning" : "form-result-success"}`} role="alert">
              <strong>{assessmentResult.hasSafetyConcern ? "Please speak with a doctor first." : `Your ${assessmentResult.area.toLowerCase()} starting point is ready.`}</strong>
              <span>{assessmentResult.hasSafetyConcern ? `Thanks, ${assessmentResult.firstName}. Once you are cleared, come back and we will place you in the right program.` : `Thank you, ${assessmentResult.firstName}. A Momentum team member will follow up with your next step.`}</span>
              <pre className="form-summary">{assessmentResult.summary}</pre>
              <button className="summary-button" type="button" onClick={copySummary}>{copyStatus}</button>
            </div>
          )}
        </form>
      </section>

      <section className="how-section section-space" id="how-it-works" aria-labelledby="how-heading">
        <div className="section-heading-block"><p className="section-kicker">How Momentum works</p><h2 id="how-heading">Care that fits into a real week.</h2><p className="section-lede">Expert physiotherapy, made practical for home. Start gently, build consistency, and keep doing the things that matter.</p></div>
        <div className="principle-list">
          <div><span className="principle-number">01</span><span><strong>Choose your track.</strong> Start with your knee, shoulder, neck, or back.</span></div>
          <div><span className="principle-number">02</span><span><strong>Follow your sessions.</strong> Clear videos with chair and wall options.</span></div>
          <div><span className="principle-number">03</span><span><strong>Check your progress.</strong> A monthly check-in keeps your plan moving with you.</span></div>
        </div>
      </section>

      <section className="method-section section-space" aria-labelledby="method-heading">
        <div className="method-intro"><p className="section-kicker">The Momentum method</p><h2 id="method-heading">Build comfort before you build strength.</h2></div>
        <div className="phase-rail">
          <article><span>01</span><div><h3>Calm</h3><p>Settle irritation and learn what feels safe today.</p></div></article>
          <article><span>02</span><div><h3>Move</h3><p>Restore useful range for reaching, sitting, and walking.</p></div></article>
          <article><span>03</span><div><h3>Strengthen</h3><p>Build the capacity to handle daily tasks with more ease.</p></div></article>
          <article><span>04</span><div><h3>Live fully</h3><p>Bring your new movement into the moments you want back.</p></div></article>
        </div>
      </section>

      <section className="support-section section-space" aria-labelledby="support-heading">
        <div className="support-copy"><p className="section-kicker">Support beyond the session</p><h2 id="support-heading">You do not have to figure it out alone.</h2><p>Once a month, your physiotherapist checks in on how you are moving and adjusts your program as you improve.</p><blockquote>“The goal is not a perfect body. It is to make more of your ordinary day feel possible.”</blockquote><p className="quote-credit">The Momentum clinical team</p></div>
        <div className="support-portrait"><img src="/physio-progress-check.jpg" alt="A clinician checking a patient's shoulder range of motion" loading="lazy" /><div className="support-note"><span>Monthly</span><strong>Progress checks</strong></div></div>
      </section>

      <section className="faq-section section-space" aria-labelledby="faq-heading">
        <div><p className="section-kicker">A few useful answers</p><h2 id="faq-heading">Before you begin.</h2></div>
        <div className="faq-list">
          <details open><summary>Do I need equipment?</summary><p>Your membership includes a simple home exercise kit, and every session also has chair or wall alternatives.</p></details>
          <details><summary>How long are the sessions?</summary><p>Most sessions take 15 to 25 minutes. You can pause, repeat, or take a gentler option whenever you need it.</p></details>
          <details><summary>What if I have more than one problem area?</summary><p>Start with the area that limits you most today. Your membership includes all four tracks, so your program can grow with you.</p></details>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-cta"><p className="section-kicker">Make the next day easier</p><h2>Start with one movement that matters to you.</h2><a className="button button-light" href="#assessment">Start my assessment <span aria-hidden="true">→</span></a></div>
        <div className="footer-bottom"><span>Momentum After 50+</span><span>Exercise guidance for real life, from home.</span><a href="#top">Back to top ↑</a></div>
        <p className="medical-note">Momentum provides exercise guidance and does not replace a medical diagnosis. Stop an exercise that increases sharp pain and speak to your doctor.</p>
      </footer>

      <div className="mobile-sticky-cta"><span><small>From</small><strong>₹2,999 <em>/ month</em></strong></span><a href="#assessment">Start assessment <span aria-hidden="true">→</span></a></div>
    </main>
  );
}
