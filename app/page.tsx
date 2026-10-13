"use client";

import { FormEvent, useState } from "react";

const conditions = [
  {
    name: "Knee pain",
    label: "Osteoarthritis + stairs",
    image: "/knee-pain.jpg",
    alt: "Hands supporting a painful knee",
    tone: "sage",
  },
  {
    name: "Back care",
    label: "Spine + daily movement",
    image: "/back-pain.jpg",
    alt: "Hands resting on the lower back",
    tone: "sand",
  },
  {
    name: "Shoulder mobility",
    label: "Reach + lift with ease",
    image: "/shoulder-pain.jpg",
    alt: "Person holding a painful shoulder",
    tone: "sky",
  },
  {
    name: "Neck stiffness",
    label: "Posture + range of motion",
    image: "/neck-pain.jpg",
    alt: "Person holding the back of their neck",
    tone: "peach",
  },
];

const plans = [
  {
    name: "Essential Mobility",
    price: "₹2,999",
    description: "For adults who want to stay active, comfortable and mobile.",
    features: ["All condition-based exercise tracks", "3 guided sessions every week", "Exercise kit delivered to your home"],
    featured: false,
  },
  {
    name: "Active Ageing",
    price: "₹5,999",
    description: "Supervised strength, balance and mobility training for everyday confidence.",
    features: ["Everything in Essential Mobility", "Fall prevention + strength programme", "Monthly functional assessment"],
    featured: true,
  },
  {
    name: "Personalised Longevity Care",
    price: "₹9,999",
    description: "Individual assessment, personal exercise and scheduled progress reviews.",
    features: ["Personalised rehabilitation plan", "Priority clinician support", "Family and caregiver updates with consent"],
    featured: false,
  },
];

const redFlags = [
  "Pain that wakes you at night or does not ease with rest",
  "Numbness, tingling, or weakness in an arm or leg",
  "Recent fall, injury, or sudden swelling",
  "Fever, unexplained weight loss, chest pain, or breathlessness",
  "Loss of bladder or bowel control",
];

const faqs = [
  ["Do I need equipment?", "We send a simple home exercise kit with the programme. Every movement also has chair, wall or no-equipment options."],
  ["How often will I exercise?", "Most members follow three 15–25 minute sessions each week, with gentle daily movement encouraged between sessions."],
  ["Can I join if I have more than one problem area?", "Yes. Start with the area that limits you most today. Your plan can expand as your confidence and capacity grow."],
  ["Is this a replacement for seeing a physiotherapist?", "No. Online guidance supports your care, but it does not replace an individual clinical assessment. We will guide you to the right next step."],
];

type AssessmentResult = {
  area: string;
  firstName: string;
  hasSafetyConcern: boolean;
  summary: string;
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-arrow">
      <path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="icon-check">
      <path d="m4 10.3 3.7 3.7L16 5.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function Home() {
  const [selectedArea, setSelectedArea] = useState("Knee pain");
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
      <div className="announcement"><span className="announcement-dot" /> 3 days a week. A stronger, steadier you. <a href="#assessment">Take the 3-minute assessment <ArrowIcon /></a></div>

      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="Momentum After 50+ home">
          <img src="/momentum_logo.jpeg" alt="Momentum After 50+" />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#programmes">Programmes</a>
          <a href="#membership">Membership</a>
          <a href="#team">Our clinicians</a>
          <a className="nav-cta" href="#assessment">Book an assessment <ArrowIcon /></a>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Healthy ageing, made practical</p>
          <h1>Age better.<br /><em>Move better.</em><br />Live better.</h1>
          <p className="hero-lede">Thoughtful physiotherapy and healthy-ageing programmes for adults 50+ who want more confidence in the movement that matters.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#assessment">Find my starting point <ArrowIcon /></a>
            <a className="text-link" href="#how-it-works">See how it works <ArrowIcon /></a>
          </div>
          <div className="hero-proof"><span><CheckIcon /> Clinician-led</span><span><CheckIcon /> Home-friendly</span><span><CheckIcon /> Built for real life</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="/physio-progress-check.jpg" alt="A physiotherapist guiding an older adult through a movement assessment" /></div>
          <div className="hero-sticker"><span>Feel the difference</span><strong>one week<br />at a time.</strong></div>
          <div className="hero-note"><span className="note-number">03</span><span>days a week<br /><strong>is enough to begin</strong></span></div>
          <span className="hero-sun" aria-hidden="true" />
        </div>
      </section>

      <section className="trust-strip" aria-label="Momentum at a glance">
        <div><strong>50+</strong><span>made for the years<br />that matter most</span></div>
        <div><strong>15–25</strong><span>minute sessions<br />that fit your day</span></div>
        <div><strong>01:01</strong><span>personal support<br />at every milestone</span></div>
        <div><strong>∞</strong><span>more of the things<br />you want to do</span></div>
      </section>

      <section className="intro-section section-space" id="how-it-works">
        <div className="section-label">Why Momentum</div>
        <div className="intro-layout"><h2>Your body is not a problem to fix. <em>It is a life to keep living.</em></h2><div><p className="section-lede">Pain, stiffness and reduced confidence can quietly shrink your world. Momentum gives you a clear, kind and clinically grounded way to open it back up.</p><a className="text-link" href="#assessment">Meet your starting point <ArrowIcon /></a></div></div>
      </section>

      <section className="programmes-section section-space" id="programmes">
        <div className="section-heading-row"><div><div className="section-label">Find your programme</div><h2>Support for the movement you miss.</h2></div><p>Start where you are. Build from there.</p></div>
        <div className="condition-grid">
          {conditions.map((condition) => (
            <a className={`condition-card ${condition.tone}`} href="#assessment" key={condition.name} onClick={() => setSelectedArea(condition.name)}>
              <img src={condition.image} alt={condition.alt} />
              <span className="condition-overlay" />
              <span className="condition-copy"><strong>{condition.name}</strong><span>{condition.label}</span></span>
              <span className="card-arrow"><ArrowIcon /></span>
            </a>
          ))}
        </div>
        <div className="programme-foot"><span>Also available: fall prevention · balance + coordination · post-surgery rehabilitation · healthy ageing education</span><a className="text-link" href="#assessment">Explore all programmes <ArrowIcon /></a></div>
      </section>

      <section className="feature-section section-space">
        <div className="feature-image"><img src="/knee-pain.jpg" alt="Hands supporting a knee during a movement assessment" /><span className="feature-tag">Most requested</span></div>
        <div className="feature-copy"><div className="section-label">The confidence programme</div><h2>Feel steadier on your feet.</h2><p>Our fall-prevention pathway combines strength, balance and everyday movement practice to help you feel more at home in your body.</p><ul className="check-list"><li><CheckIcon /> Safer sit-to-stand and walking practice</li><li><CheckIcon /> Strength for stairs, balance and daily tasks</li><li><CheckIcon /> Simple strategies for a more confident home</li></ul><a className="button button-dark" href="#assessment">Explore fall prevention <ArrowIcon /></a></div>
      </section>

      <section className="membership-section section-space" id="membership">
        <div className="section-heading-row membership-heading"><div><div className="section-label">Membership, with clarity</div><h2>Choose the support<br /><em>that fits your life.</em></h2></div><p>No confusing bundles. No pressure to do more than you need. Start with an assessment, then choose your pace.</p></div>
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="plan-badge">A favourite place to start</span>}
              <div className="plan-top"><h3>{plan.name}</h3><div className="plan-price"><strong>{plan.price}</strong><span>/ month</span></div></div>
              <p>{plan.description}</p>
              <ul>{plan.features.map((feature) => <li key={feature}><CheckIcon /> {feature}</li>)}</ul>
              <a className={plan.featured ? "button button-primary" : "button button-outline"} href="#assessment">Choose this path <ArrowIcon /></a>
            </article>
          ))}
        </div>
        <p className="pricing-note">Launch pricing. Plans and inclusions are confirmed after clinical assessment. Cancel anytime.</p>
      </section>

      <section className="assessment-section section-space" id="assessment">
        <div className="assessment-intro"><div className="section-label">Your first step</div><h2>Let&apos;s make a plan for <em>your life.</em></h2><p>Three minutes is all it takes to help us understand where you are and what you want to get back to.</p><div className="assessment-points"><span><b>01</b> Tell us where it hurts</span><span><b>02</b> Share what you want to do again</span><span><b>03</b> Get your recommended next step</span></div></div>
        <form className="assessment-form" onSubmit={handleSubmit}>
          <div className="form-title"><span className="form-number">01</span><div><span className="form-kicker">Three-minute assessment</span><h3>Tell us a little about you.</h3></div></div>
          <div className="form-row"><label>Full name *<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label><label>Age *<input name="age" type="number" min="18" max="110" placeholder="Your age" inputMode="numeric" required /></label></div>
          <div className="form-row"><label>Mobile number *<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit number" aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? "phone-error" : undefined} required />{phoneError && <span className="field-error" id="phone-error">{phoneError}</span>}</label><label>City<input name="city" type="text" placeholder="Where you live" autoComplete="address-level2" /></label></div>
          <fieldset><legend>Where do you need support?</legend><div className="form-choice-grid">{conditions.map((condition) => <button className={selectedArea === condition.name ? "choice-button is-selected" : "choice-button"} key={condition.name} type="button" aria-pressed={selectedArea === condition.name} onClick={() => setSelectedArea(condition.name)}>{condition.name}<span>{selectedArea === condition.name ? "Selected" : "Choose"}</span></button>)}</div></fieldset>
          <input type="hidden" name="area" value={selectedArea} readOnly />
          <div className="form-row"><label>How long has this bothered you?<select name="duration"><option>Under 1 month</option><option>1 to 6 months</option><option>6 months to 2 years</option><option>Over 2 years</option></select></label><label>Pain today, 0 to 10<input name="pain" type="number" min="0" max="10" placeholder="0 to 10" inputMode="numeric" /></label></div>
          <label>What do you want to do again?<textarea name="goal" rows={3} placeholder="Climb stairs, sleep through the night, play with grandchildren" /></label>
          <fieldset className="safety-fieldset"><legend>Before you begin</legend><p className="field-help">Tick anything that applies. These symptoms need a doctor&apos;s opinion before exercise.</p><div className="checkbox-list">{redFlags.map((flag, index) => <label key={flag}><input name={`flag-${index}`} type="checkbox" /><span>{flag}</span></label>)}</div></fieldset>
          <button className="button button-primary form-submit" type="submit">Get my programme match <ArrowIcon /></button>
          <p className="form-privacy"><span aria-hidden="true">●</span> Private, respectful and used only to prepare your next step.</p>
          {assessmentResult && <div className={`form-result ${assessmentResult.hasSafetyConcern ? "form-result-warning" : "form-result-success"}`} role="alert"><strong>{assessmentResult.hasSafetyConcern ? "Please speak with a doctor first." : `Your ${assessmentResult.area.toLowerCase()} starting point is ready.`}</strong><span>{assessmentResult.hasSafetyConcern ? `Thanks, ${assessmentResult.firstName}. Once you are cleared, come back and we will place you in the right programme.` : `Thank you, ${assessmentResult.firstName}. A Momentum team member will follow up with your next step.`}</span><pre className="form-summary">{assessmentResult.summary}</pre><button className="summary-button" type="button" onClick={copySummary}>{copyStatus}</button></div>}
        </form>
      </section>

      <section className="method-section section-space">
        <div className="method-heading"><div className="section-label">The Momentum method</div><h2>Small, consistent actions create <em>stronger days.</em></h2></div>
        <div className="method-steps"><article><span>01</span><div><h3>Calm</h3><p>Understand what feels safe and settle irritation.</p></div></article><article><span>02</span><div><h3>Move</h3><p>Restore useful range for reaching, sitting and walking.</p></div></article><article><span>03</span><div><h3>Strengthen</h3><p>Build capacity for the tasks your day asks of you.</p></div></article><article><span>04</span><div><h3>Keep going</h3><p>Make your progress part of ordinary life.</p></div></article></div>
      </section>

      <section className="team-section section-space" id="team">
        <div className="team-image"><img src="/physio-progress-check.jpg" alt="A clinician checking a patient's shoulder movement" /><span className="team-caption">Care that notices<br /><strong>the small wins.</strong></span></div>
        <div className="team-copy"><div className="section-label">Meet your clinical team</div><h2>Experienced care. <em>Humanly delivered.</em></h2><p>Momentum is created by physiotherapists who understand that ageing well is not about chasing a number. It is about staying present for the people, places and routines that make your life yours.</p><div className="clinician-row"><div className="avatar">AM</div><div><strong>Dr. Ananya Mehta</strong><span>Founder · Sports Physiotherapist</span></div><a href="#assessment" aria-label="Meet the Momentum clinical team"><ArrowIcon /></a></div><a className="text-link" href="#assessment">See qualifications and approach <ArrowIcon /></a></div>
      </section>

      <section className="quote-section section-space"><div className="quote-mark">“</div><blockquote>Momentum helped me stop waiting for a good day. I now know how to make one.</blockquote><p>— Early member, Bengaluru</p><div className="quote-dots"><span className="is-active" /><span /><span /></div></section>

      <section className="faq-section section-space"><div><div className="section-label">A few useful answers</div><h2>Good questions<br /><em>are welcome.</em></h2><a className="text-link" href="#assessment">Still curious? Talk to us <ArrowIcon /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <details open={index === 0} key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <footer className="footer-section">
        <div className="footer-cta"><div className="section-label">Your next chapter starts here</div><h2>More movement.<br /><em>More life.</em></h2><p>Start with a conversation about what you want back.</p><div className="footer-actions"><a className="button button-light" href="#assessment">Book an assessment <ArrowIcon /></a><a className="whatsapp-link" href="https://wa.me/910000000000" target="_blank" rel="noreferrer">WhatsApp support <ArrowIcon /></a></div></div>
        <div className="footer-bottom"><span className="footer-brand">Momentum After 50+</span><span>Healthy ageing and physiotherapy, for real life.</span><span>© 2026 Momentum</span></div>
        <p className="medical-note">Momentum provides exercise guidance and does not replace a medical diagnosis. Stop an exercise that increases sharp pain and speak to your doctor. Online exercises do not replace an individual clinical assessment.</p>
      </footer>

      <div className="mobile-sticky-cta"><span><small>Start with a</small><strong>3-minute assessment</strong></span><a href="#assessment">Begin <ArrowIcon /></a></div>
    </main>
  );
}
