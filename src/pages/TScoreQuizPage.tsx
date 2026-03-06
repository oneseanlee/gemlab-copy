import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Lock, Check, Shield, Clock, FlaskConical, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import './TScoreQuizPage.css';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  context: string;
  options: { label: string; score: number }[];
}

const questions: QuizQuestion[] = [
  {
    id: 'energy', category: 'Energy',
    question: 'How would you describe your energy levels throughout the day?',
    context: "Think about a typical weekday — not your best or worst day.",
    options: [
      { label: 'Strong and steady from morning to evening', score: 0 },
      { label: 'Good mornings, but I hit a wall by mid-afternoon', score: 2 },
      { label: 'I rely on caffeine to get through most days', score: 4 },
      { label: "Exhausted before lunch — no amount of coffee helps", score: 6 },
    ],
  },
  {
    id: 'bodyComposition', category: 'Body Composition',
    question: 'Have you noticed changes in your body composition over the past 1–2 years?',
    context: "Even if your diet and exercise habits haven't changed.",
    options: [
      { label: 'No real changes — I maintain muscle and stay lean', score: 0 },
      { label: 'Slightly softer around the midsection, but nothing major', score: 2 },
      { label: 'Gaining fat and losing muscle despite working out', score: 4 },
      { label: 'Significant weight gain, especially belly fat — exercise barely moves the needle', score: 6 },
    ],
  },
  {
    id: 'mentalClarity', category: 'Mental Clarity',
    question: 'How sharp is your mental focus and decision-making?',
    context: 'Compare how you feel now to how you felt 5 years ago.',
    options: [
      { label: 'Just as sharp as ever — no noticeable decline', score: 0 },
      { label: 'Occasionally foggy, but I can push through it', score: 2 },
      { label: 'Brain fog is a regular thing — focus drops by early afternoon', score: 4 },
      { label: 'I struggle to concentrate, make decisions, or remember things clearly', score: 6 },
    ],
  },
  {
    id: 'libido', category: 'Libido & Drive',
    question: 'How would you describe your sex drive compared to a few years ago?',
    context: 'This is one of the most sensitive and most telling indicators.',
    options: [
      { label: 'Still strong — no real change', score: 0 },
      { label: 'Somewhat lower, but not a major concern', score: 2 },
      { label: 'Noticeably reduced — it takes more effort to feel interested', score: 4 },
      { label: "Significantly diminished — it feels like it's mostly gone", score: 6 },
    ],
  },
  {
    id: 'sleep', category: 'Sleep Quality',
    question: 'How well are you sleeping?',
    context: 'Testosterone production peaks during deep sleep — this matters more than most men realize.',
    options: [
      { label: 'I fall asleep easily and wake up rested', score: 0 },
      { label: 'I sleep okay but rarely feel fully refreshed', score: 2 },
      { label: 'I wake up during the night and feel groggy in the morning', score: 4 },
      { label: "My sleep is broken — I'm tired no matter how long I'm in bed", score: 6 },
    ],
  },
  {
    id: 'mood', category: 'Mood & Motivation',
    question: 'How stable is your mood, and how motivated do you feel day to day?',
    context: 'Testosterone directly influences emotional regulation and drive.',
    options: [
      { label: 'Stable mood, strong motivation — I feel like myself', score: 0 },
      { label: 'Some irritability or low motivation creeping in', score: 2 },
      { label: 'Noticeable mood swings, lower ambition, less drive', score: 4 },
      { label: 'Flat, unmotivated, or emotionally reactive most days', score: 6 },
    ],
  },
  {
    id: 'age', category: 'Age & Awareness',
    question: 'What age range are you in?',
    context: 'Testosterone begins declining around age 30 — about 1–2% per year.',
    options: [
      { label: 'Under 30', score: 0 },
      { label: '30–39', score: 2 },
      { label: '40–49', score: 4 },
      { label: '50+', score: 5 },
    ],
  },
];

const symptomCategories = ['energy', 'bodyComposition', 'mentalClarity', 'libido', 'sleep', 'mood'] as const;

const categoryLabels: Record<string, string> = {
  energy: 'Energy',
  bodyComposition: 'Body Composition',
  mentalClarity: 'Mental Clarity',
  libido: 'Libido & Drive',
  sleep: 'Sleep Quality',
  mood: 'Mood & Motivation',
};

const categoryBenefits: Record<string, string> = {
  energy: "TPrime365's 4-in-1 formula supports mitochondrial energy production at the cellular level",
  bodyComposition: 'Optimized testosterone directly supports lean tissue maintenance and fat metabolism',
  mentalClarity: 'Testosterone receptors in the brain govern focus, processing speed, and cognitive sharpness',
  libido: 'Testosterone is the primary hormonal driver of male libido — optimization restores the signal',
  sleep: 'Men with optimized T levels consistently report deeper, more restorative sleep',
  mood: 'Stable testosterone supports emotional regulation, drive, and resilience',
};

type Phase = 'landing' | 'quiz' | 'capture' | 'results';

interface TScoreResult {
  email: string;
  firstName: string;
  totalScore: number;
  percentage: number;
  tier: 'green' | 'yellow' | 'red';
  categories: Record<string, number>;
  topConcerns: string[];
  completedAt: string;
  source: string;
}

/* ═══════════════════════════════════════════
   HELPER: Animated counter
   ═══════════════════════════════════════════ */
const useAnimatedCounter = (target: number, duration = 1500, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
};

/* ═══════════════════════════════════════════
   PHASE 1: LANDING
   ═══════════════════════════════════════════ */
const LandingPhase = ({ onStart }: { onStart: () => void }) => (
  <div className="tsq-landing">
    <span className="tsq-brand">BEST 365 LABS</span>
    <h1 className="tsq-landing-headline">What's Your T-Score?</h1>
    <p className="tsq-landing-sub">
      Take this 2-minute assessment to find out if declining testosterone is behind your symptoms — and what you can do about it.
    </p>
    <div className="tsq-landing-trust">
      <span><Clock size={14} /> Takes 2 Minutes</span>
      <span><FlaskConical size={14} /> Physician-Reviewed</span>
      <span><Lock size={14} /> 100% Confidential</span>
    </div>
    <button className="tsq-cta-gold" onClick={onStart}>
      Start Your Assessment <ArrowRight size={18} />
    </button>
    <p className="tsq-landing-social">50,000+ men have optimized through Best 365 Labs</p>
  </div>
);

/* ═══════════════════════════════════════════
   PHASE 2: QUIZ
   ═══════════════════════════════════════════ */
const QuizPhase = ({
  currentIndex,
  answers,
  onSelect,
  onBack,
  direction,
}: {
  currentIndex: number;
  answers: (number | null)[];
  onSelect: (score: number) => void;
  onBack: () => void;
  direction: 'forward' | 'back';
}) => {
  const q = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const [selected, setSelected] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setSelected(answers[currentIndex] ?? null);
    setAnimKey((k) => k + 1);
  }, [currentIndex, answers]);

  const handleSelect = (score: number) => {
    setSelected(score);
    setTimeout(() => onSelect(score), 500);
  };

  return (
    <div className="tsq-quiz-card">
      {/* Progress */}
      <div className="tsq-progress-wrap">
        <div className="tsq-progress-bar">
          <div className="tsq-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="tsq-progress-label">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      {/* Back */}
      {currentIndex > 0 && (
        <button className="tsq-back" onClick={onBack}>
          <ArrowLeft size={14} /> Back
        </button>
      )}

      {/* Question */}
      <div
        key={animKey}
        className={`tsq-question-anim ${direction === 'forward' ? 'tsq-slide-in-right' : 'tsq-slide-in-left'}`}
      >
        <span className="tsq-q-number">QUESTION {String(currentIndex + 1).padStart(2, '0')}</span>
        <h2 className="tsq-q-text">{q.question}</h2>
        <p className="tsq-q-context">{q.context}</p>

        <div className="tsq-options">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`tsq-option ${selected === opt.score ? 'tsq-option-selected' : ''}`}
              onClick={() => handleSelect(opt.score)}
            >
              <span className="tsq-option-label">{opt.label}</span>
              {selected === opt.score && (
                <span className="tsq-option-check"><Check size={16} /></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PHASE 3: EMAIL CAPTURE
   ═══════════════════════════════════════════ */
const CapturePhase = ({
  onSubmit,
  submitting,
}: {
  onSubmit: (email: string, firstName: string) => void;
  submitting: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubmit(email.trim().toLowerCase(), firstName.trim());
  };

  return (
    <div className="tsq-quiz-card tsq-capture-card">
      <div className="tsq-capture-icon">📊</div>
      <h2 className="tsq-capture-headline">Your Results Are Ready</h2>
      <p className="tsq-capture-sub">
        Enter your email to see your personalized T-Score breakdown and optimization recommendations.
      </p>
      <form className="tsq-capture-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="tsq-capture-input"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="text"
          className="tsq-capture-input tsq-capture-input-sm"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit" className="tsq-cta-gold" disabled={submitting}>
          {submitting ? 'Calculating…' : 'See My T-Score'} <ArrowRight size={18} />
        </button>
      </form>
      <p className="tsq-capture-disclaimer">
        <Lock size={12} /> We respect your privacy. No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PHASE 4: RESULTS
   ═══════════════════════════════════════════ */
const ResultsPhase = ({ result }: { result: TScoreResult }) => {
  const animatedPct = useAnimatedCounter(result.percentage, 1500, true);

  const tierConfig = {
    green: {
      label: 'OPTIMIZED RANGE',
      color: '#276749',
      headline: `Your T-Score: ${result.percentage}% — You're in the Optimized Range`,
      body: "Based on your responses, your symptoms suggest your testosterone levels are likely within a healthy range. That said, optimization is about staying ahead of the decline — not waiting until symptoms become severe. Men in your range who begin proactive optimization report sustained energy, sharper focus, and better body composition for years longer than those who wait.",
      cta: "Even men in the optimized range see measurable improvement with TPrime365. 28% more free testosterone in the first week from boron alone.",
    },
    yellow: {
      label: 'DECLINING — ACTION RECOMMENDED',
      color: '#C8982E',
      headline: `Your T-Score: ${result.percentage}% — You're in the Declining Zone`,
      body: "Your symptoms are consistent with measurable testosterone decline. This is the range where most men notice the changes — lower energy, stubborn body fat, reduced drive — but haven't yet taken action. The good news: men in your range typically respond the fastest to optimization. Clinical observations show 60–200%+ improvement within 2–4 weeks when addressing the root hormonal signal.",
      cta: "Men in your range are the ideal candidates for TPrime365. A licensed physician can confirm your eligibility in days.",
    },
    red: {
      label: 'SIGNIFICANT DECLINE — OPTIMIZE NOW',
      color: '#C53030',
      headline: `Your T-Score: ${result.percentage}% — You're in the Critical Decline Zone`,
      body: "Your responses indicate significant symptoms consistent with substantially low testosterone. At this level, the decline is likely compounding — poor sleep suppresses T further, low T disrupts sleep more, and the cycle accelerates. The longer this goes unaddressed, the harder it becomes to reverse. But here's the important part: even men with the most severe decline have seen dramatic improvement. Clinical observations include men going from 120 ng/dL to 917 ng/dL in 3 weeks.",
      cta: "This is exactly what TPrime365 was designed for. See if you qualify for physician-supervised optimization today.",
    },
  };

  const tier = tierConfig[result.tier];
  const highCategories = symptomCategories.filter((c) => result.categories[c] >= 4);

  const getBarColor = (score: number) => {
    if (score <= 2) return '#276749';
    if (score <= 4) return '#C8982E';
    return '#C53030';
  };

  return (
    <div className="tsq-results">
      {/* Score gauge */}
      <div className="tsq-gauge-wrap">
        <svg className="tsq-gauge" viewBox="0 0 200 120" fill="none">
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            stroke="#e2e8f0"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            stroke={tier.color}
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${(animatedPct / 100) * 251.3} 251.3`}
            className="tsq-gauge-fill"
          />
        </svg>
        <div className="tsq-gauge-value" style={{ color: tier.color }}>{animatedPct}%</div>
        <span className="tsq-gauge-label" style={{ color: tier.color }}>{tier.label}</span>
      </div>

      {/* Explanation */}
      <div className="tsq-results-card">
        <h2 className="tsq-results-headline">{tier.headline}</h2>
        <p className="tsq-results-body">{tier.body}</p>

        {/* Category breakdown */}
        <h3 className="tsq-breakdown-title">Your Symptom Breakdown</h3>
        <div className="tsq-bars">
          {symptomCategories.map((cat, i) => {
            const score = result.categories[cat] || 0;
            const pct = (score / 6) * 100;
            return (
              <div className="tsq-bar-row" key={cat} style={{ animationDelay: `${i * 80}ms` }}>
                <span className="tsq-bar-label">{categoryLabels[cat]}</span>
                <div className="tsq-bar-track">
                  <div
                    className="tsq-bar-fill"
                    style={{ width: `${pct}%`, backgroundColor: getBarColor(score) }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Concerns callout */}
        {result.topConcerns.length > 0 && (
          <div className="tsq-callout">
            <strong>Your biggest areas of concern:</strong>{' '}
            {result.topConcerns.map((c) => categoryLabels[c] || c).join(', ')}.
            These are directly linked to testosterone levels and are typically the first areas to improve with optimization.
          </div>
        )}

        {/* Product bridge */}
        {highCategories.length > 0 && (
          <div className="tsq-bridge">
            <h3 className="tsq-bridge-title">How TPrime365 Addresses Your Results</h3>
            <ul className="tsq-bridge-list">
              {highCategories.map((cat) => (
                <li key={cat}>
                  <ChevronRight size={14} className="tsq-bridge-icon" />
                  {categoryBenefits[cat]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA framing */}
        <p className="tsq-cta-framing">{tier.cta}</p>

        {/* Stat row */}
        <div className="tsq-stats-row">
          <div className="tsq-stat">
            <span className="tsq-stat-value">60–664%</span>
            <span className="tsq-stat-label">Testosterone increase in 2–4 weeks</span>
          </div>
          <div className="tsq-stat">
            <span className="tsq-stat-value">$4.97/day</span>
            <span className="tsq-stat-label">Less than your daily coffee</span>
          </div>
          <div className="tsq-stat">
            <span className="tsq-stat-value">100%</span>
            <span className="tsq-stat-label">Refund if not approved</span>
          </div>
        </div>

        {/* Primary CTA */}
        <a href="/tprime365" className="tsq-cta-gold tsq-cta-final">
          See If You Qualify → $149/mo <ArrowRight size={18} />
        </a>
        <p className="tsq-cta-reassurance">
          Licensed physician review included · Full refund if not approved · No injections · No hormonal shutdown
        </p>

        {/* Trust strip */}
        <div className="tsq-trust-strip">
          <span><FlaskConical size={14} /> Physician-Reviewed</span>
          <span>🇺🇸 Made in USA</span>
          <span><Shield size={14} /> FDA-Registered Facility</span>
          <span>📦 Free Shipping</span>
        </div>
      </div>

      {/* Footer disclaimer */}
      <div className="tsq-disclaimer">
        <p>
          This assessment is for educational purposes only and does not constitute medical advice, diagnosis, or treatment. Individual results may vary. All medical evaluations are provided by independent licensed healthcare professionals through the happyMD telehealth platform. Best 365 Labs does not provide medical advice, diagnoses, or prescriptions.
        </p>
        <p>
          *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
const TScoreQuizPage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [result, setResult] = useState<TScoreResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on phase change
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase, currentQ]);

  const handleStart = () => setPhase('quiz');

  const handleSelectAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = score;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setDirection('forward');
      setCurrentQ((i) => i + 1);
    } else {
      setPhase('capture');
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setDirection('back');
      setCurrentQ((i) => i - 1);
    }
  };

  const handleCapture = async (email: string, firstName: string) => {
    setSubmitting(true);

    const categories: Record<string, number> = {};
    questions.forEach((q, i) => {
      categories[q.id] = answers[i] ?? 0;
    });

    const totalScore = Object.values(categories).reduce((a, b) => a + b, 0);
    const percentage = Math.round((totalScore / 41) * 100);

    let tier: 'green' | 'yellow' | 'red' = 'green';
    if (percentage > 60) tier = 'red';
    else if (percentage > 30) tier = 'yellow';

    const symptomScores = symptomCategories.map((c) => ({ id: c, score: categories[c] || 0 }));
    symptomScores.sort((a, b) => b.score - a.score);
    const topConcerns = symptomScores.filter((s) => s.score >= 4).slice(0, 3).map((s) => s.id);

    const r: TScoreResult = {
      email,
      firstName,
      totalScore,
      percentage,
      tier,
      categories,
      topConcerns,
      completedAt: new Date().toISOString(),
      source: 'tscore-quiz-v1',
    };

    console.log('T-Score Quiz Result:', r);

    // Save to leads table
    try {
      await supabase.from('leads').insert({
        first_name: firstName || 'Quiz User',
        email,
        source: 'tscore-quiz',
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }

    setResult(r);
    setSubmitting(false);
    setPhase('results');
  };

  return (
    <div className="tsq-page" ref={containerRef}>
      <div className="tsq-bg" aria-hidden="true" />
      <div className="tsq-container">
        {phase === 'landing' && <LandingPhase onStart={handleStart} />}
        {phase === 'quiz' && (
          <QuizPhase
            currentIndex={currentQ}
            answers={answers}
            onSelect={handleSelectAnswer}
            onBack={handleBack}
            direction={direction}
          />
        )}
        {phase === 'capture' && <CapturePhase onSubmit={handleCapture} submitting={submitting} />}
        {phase === 'results' && result && <ResultsPhase result={result} />}
      </div>
    </div>
  );
};

export default TScoreQuizPage;
