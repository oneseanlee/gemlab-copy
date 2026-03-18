import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import {
  Calendar as CalendarIcon,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  ArrowRight,
  Globe,
  Star,
  Sparkles,
  DollarSign,
  Zap,
  Target,
  MessageCircle,
  Award,
  BarChart3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './BookingPage.css';

/* ── Constants ── */
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const callAgenda = [
  { Icon: Target, title: 'Your Audience & Niche', desc: 'We learn about your platform, audience demographics, and content style' },
  { Icon: DollarSign, title: 'Commission Structure', desc: '20% recurring commissions — we\'ll break down your earning potential' },
  { Icon: Zap, title: 'Custom Launch Plan', desc: 'Tailored strategy for your first 30 days as a Best365 partner' },
  { Icon: MessageCircle, title: 'Creative & Support', desc: 'Content assets, tracking links, and your dedicated success manager' },
];

const partnerTypes = [
  { emoji: '🎥', label: 'Content Creators', desc: 'YouTube, TikTok, Instagram, Podcasters' },
  { emoji: '🏥', label: 'Health Clinics', desc: 'Functional medicine, anti-aging, wellness' },
  { emoji: '📧', label: 'Affiliate Marketers', desc: 'Email lists, paid media, niche sites' },
  { emoji: '💪', label: 'Fitness Pros', desc: 'Trainers, coaches, gym owners' },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '20%', label: 'Recurring Commission' },
  { value: '$147', label: 'Avg. Order Value' },
  { value: 'BHIC', label: 'Publicly Traded' },
];

const testimonials = [
  {
    name: 'Derek M.',
    role: 'Health Influencer · 120K followers',
    quote: 'Partnering with Best365 was a no-brainer. My audience loves the products and the commissions are consistent every single month.',
    stars: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Functional Medicine Clinic',
    quote: 'The recurring commissions have become a reliable revenue stream. Their team makes it incredibly easy to get started.',
    stars: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Fitness YouTuber · 85K subscribers',
    quote: 'The product quality sells itself. I just share my honest experience and the conversions follow. Best partner program I\'ve joined.',
    stars: 5,
  },
];

/* ── Helpers ── */
interface SlotsMap { [date: string]: { slots: string[] } }

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function formatSlotTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatShortDate(dateKey: string) {
  const d = new Date(dateKey + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/* ── Component ── */
const BookingPage: React.FC = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotsMap, setSlotsMap] = useState<SlotsMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const slotsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const fetchSlots = useCallback(async (year: number, month: number) => {
    setLoading(true);
    setError(null);
    try {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const params = new URLSearchParams({
        startDate: start.getTime().toString(),
        endDate: end.getTime().toString(),
        timezone,
      });
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/ghl-calendar-slots?${params}`,
        { headers: { Authorization: `Bearer ${anonKey}`, apikey: anonKey } }
      );
      if (!res.ok) throw new Error('Failed to load availability');
      const slots: SlotsMap = await res.json();
      setSlotsMap(slots);
    } catch (err) {
      console.error('Slots fetch error:', err);
      setError('Unable to load availability. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [timezone]);

  useEffect(() => {
    fetchSlots(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchSlots]);

  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const goToPrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
    setSelectedDate(null);
    setSelectedSlot(null);
  };
  const goToNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const isPastDate = (day: number) => toDateKey(viewYear, viewMonth, day) < todayKey;
  const hasSlots = (day: number) => (slotsMap[toDateKey(viewYear, viewMonth, day)]?.slots?.length ?? 0) > 0;
  const selectedSlots = selectedDate ? slotsMap[selectedDate]?.slots || [] : [];
  const isPrevDisabled = viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  const handleDateClick = (day: number) => {
    const key = toDateKey(viewYear, viewMonth, day);
    setSelectedDate(key);
    setSelectedSlot(null);
    setTimeout(() => slotsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
  };

  // Group slots
  const groupedSlots = useMemo(() => {
    const groups: { label: string; icon: string; slots: string[] }[] = [
      { label: 'Morning', icon: '☀️', slots: [] },
      { label: 'Afternoon', icon: '🌤️', slots: [] },
      { label: 'Evening', icon: '🌙', slots: [] },
    ];
    selectedSlots.forEach(slot => {
      const hour = new Date(slot).getHours();
      if (hour < 12) groups[0].slots.push(slot);
      else if (hour < 17) groups[1].slots.push(slot);
      else groups[2].slots.push(slot);
    });
    return groups.filter(g => g.slots.length > 0);
  }, [selectedSlots]);

  const step = !selectedDate ? 1 : !selectedSlot ? 2 : 3;

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bp-page">
      {/* ── Nav ── */}
      <nav className="bp-nav">
        <a href="/" className="bp-nav-logo">
          <img src="/images/best365labs-logo.png" alt="Best 365 Labs" width={140} height={36} loading="eager" />
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="bp-hero">
        <div className="bp-hero-inner">
          <motion.div
            className="bp-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bp-badge">
              <Sparkles size={14} />
              Partner Program
            </span>
            <h1>Earn <em>20% Recurring</em> Commissions</h1>
            <p className="bp-hero-sub">
              Join 200+ creators, clinics, and affiliates earning passive income with Best365 Labs — a publicly traded health company your audience already wants.
            </p>
            <div className="bp-hero-cta-row">
              <button onClick={scrollToCalendar} className="bp-hero-cta">
                Book Your Strategy Call <ArrowRight size={16} />
              </button>
              <span className="bp-hero-cta-note">
                <Clock size={13} />
                15-minute call · No commitment
              </span>
            </div>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            className="bp-stats-strip"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="bp-stat">
                <span className="bp-stat-value">{s.value}</span>
                <span className="bp-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Who This Is For ── */}
      <section className="bp-who">
        <div className="bp-who-inner">
          <h2>Who This Is For</h2>
          <div className="bp-who-grid">
            {partnerTypes.map((p, i) => (
              <motion.div
                key={i}
                className="bp-who-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="bp-who-emoji">{p.emoji}</span>
                <strong>{p.label}</strong>
                <span>{p.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calendar Section ── */}
      <section className="bp-calendar-section" ref={calendarRef}>
        <div className="bp-calendar-section-inner">
          <div className="bp-section-header">
            <h2>Pick a Time That Works</h2>
            <p>Select a date and time for your free 15-minute strategy call.</p>
          </div>

          {/* Progress Steps */}
          <div className="bp-steps">
            {[
              { num: 1, label: 'Select Date' },
              { num: 2, label: 'Choose Time' },
              { num: 3, label: 'Confirm' },
            ].map(({ num, label }) => (
              <div key={num} className={`bp-step ${step >= num ? 'bp-step--active' : ''} ${step > num ? 'bp-step--done' : ''}`}>
                <div className="bp-step-circle">
                  {step > num ? <CheckCircle size={16} /> : num}
                </div>
                <span className="bp-step-label">{label}</span>
                {num < 3 && <div className="bp-step-line" />}
              </div>
            ))}
          </div>

          {/* Calendar Card */}
          <div className="bp-card">
            <div className={`bp-card-inner ${selectedDate ? 'bp-card-inner--split' : ''}`}>
              {/* Calendar */}
              <div className="bp-cal-panel">
                <div className="bp-cal-head">
                  <button className="bp-cal-nav" onClick={goToPrevMonth} disabled={isPrevDisabled} aria-label="Previous month">
                    <ChevronLeft size={18} />
                  </button>
                  <h3 className="bp-cal-title">{MONTHS[viewMonth]} {viewYear}</h3>
                  <button className="bp-cal-nav" onClick={goToNextMonth} aria-label="Next month">
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="bp-cal-weekdays">
                  {WEEKDAYS.map(w => <span key={w}>{w}</span>)}
                </div>

                <div className="bp-cal-grid">
                  {loading && (
                    <div className="bp-cal-overlay">
                      <Loader2 size={24} className="bp-spinner" />
                    </div>
                  )}
                  {days.map((day, i) =>
                    day === null ? (
                      <span key={`e-${i}`} className="bp-day bp-day--empty" />
                    ) : (
                      <button
                        key={day}
                        className={[
                          'bp-day',
                          isPastDate(day) && 'bp-day--past',
                          !isPastDate(day) && hasSlots(day) && 'bp-day--avail',
                          selectedDate === toDateKey(viewYear, viewMonth, day) && 'bp-day--selected',
                          toDateKey(viewYear, viewMonth, day) === todayKey && 'bp-day--today',
                        ].filter(Boolean).join(' ')}
                        disabled={isPastDate(day) || !hasSlots(day)}
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>

                {error && <p className="bp-cal-error">{error}</p>}

                <div className="bp-cal-tz">
                  <Globe size={12} />
                  <span>{timezone.replace(/_/g, ' ')}</span>
                </div>
              </div>

              {/* Slots */}
              <AnimatePresence>
                {selectedDate && !loading && (
                  <motion.div
                    className="bp-slots-panel"
                    ref={slotsRef}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="bp-slots-head">
                      <div className="bp-slots-head-icon">
                        <Clock size={16} />
                      </div>
                      <div>
                        <span className="bp-slots-title">Available Times</span>
                        <span className="bp-slots-date">{formatShortDate(selectedDate)}</span>
                      </div>
                    </div>

                    {selectedSlots.length === 0 ? (
                      <div className="bp-slots-empty">
                        <CalendarIcon size={32} strokeWidth={1.2} />
                        <p>No times available</p>
                        <span>Try selecting another day.</span>
                      </div>
                    ) : (
                      <div className="bp-slots-body">
                        {groupedSlots.map(group => (
                          <div key={group.label} className="bp-slot-group">
                            <div className="bp-slot-group-label">
                              <span>{group.icon}</span>
                              <span>{group.label}</span>
                              <span className="bp-slot-group-count">{group.slots.length}</span>
                            </div>
                            <div className="bp-slot-grid">
                              {group.slots.map(slot => (
                                <button
                                  key={slot}
                                  className={`bp-slot ${selectedSlot === slot ? 'bp-slot--active' : ''}`}
                                  onClick={() => setSelectedSlot(slot)}
                                >
                                  {formatSlotTime(slot)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Confirm Bar */}
                    <AnimatePresence>
                      {selectedSlot && (
                        <motion.div
                          className="bp-confirm-bar"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          <div className="bp-confirm-info">
                            <span className="bp-confirm-date">{formatShortDate(selectedDate)}</span>
                            <span className="bp-confirm-time">{formatSlotTime(selectedSlot)}</span>
                          </div>
                          <a
                            href="https://api.leadconnectorhq.com/widget/booking/3d6bWBAUBH4knTmsIyaX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bp-confirm-btn"
                          >
                            Confirm Booking <ArrowRight size={16} />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We'll Cover ── */}
      <section className="bp-agenda">
        <div className="bp-agenda-inner">
          <div className="bp-section-header">
            <h2>What We'll Cover on the Call</h2>
            <p>In just 15 minutes, we'll map out your partnership opportunity.</p>
          </div>
          <div className="bp-agenda-grid">
            {callAgenda.map((item, i) => (
              <motion.div
                key={i}
                className="bp-agenda-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="bp-agenda-icon">
                  <item.Icon size={20} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bp-reviews">
        <div className="bp-reviews-inner">
          <div className="bp-section-header">
            <h2>What Our Partners Say</h2>
          </div>
          <div className="bp-reviews-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bp-review"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="bp-review-stars">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p>"{t.quote}"</p>
                <div className="bp-review-author">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bp-bottom-cta">
        <div className="bp-bottom-cta-inner">
          <Award size={28} />
          <h2>Ready to Start Earning?</h2>
          <p>Book your free 15-minute strategy call and let's build your partnership plan.</p>
          <button onClick={scrollToCalendar} className="bp-bottom-cta-btn">
            Select a Time Above <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Trust ── */}
      <div className="bp-trust">
        <Shield size={14} />
        <span>Your information is kept confidential and will only be used to prepare for our call.</span>
      </div>

      <SharedFooter />
    </div>
  );
};

export default BookingPage;
