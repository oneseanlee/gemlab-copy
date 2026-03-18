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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './BookingPage.css';

/* ── Constants ── */
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const highlights = [
  { Icon: TrendingUp, title: '20% Recurring', desc: 'Commissions on every referral, every month' },
  { Icon: Shield, title: 'Public Company', desc: 'Backed by BHIC — real credibility & trust' },
  { Icon: Users, title: '50K+ Customers', desc: 'Proven demand across all product lines' },
  { Icon: CheckCircle, title: 'Dedicated Manager', desc: 'Your own partner success point-of-contact' },
];

const socialProof = [
  { name: 'Derek M.', role: 'Health Influencer', quote: 'Partnering with Best365 was a no-brainer. My audience loves the products.' },
  { name: 'Sarah K.', role: 'Clinic Owner', quote: 'The recurring commissions have become a reliable revenue stream for us.' },
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

function formatSelectedDate(dateKey: string) {
  const d = new Date(dateKey + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
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

  // Group slots into morning/afternoon/evening
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

  // Step state
  const step = !selectedDate ? 1 : !selectedSlot ? 2 : 3;

  return (
    <div className="bp-page">
      {/* ── Minimal Nav ── */}
      <nav className="bp-nav">
        <a href="/" className="bp-nav-logo">
          <img src="/images/best365labs-logo.png" alt="Best 365 Labs" width={140} height={36} loading="eager" />
        </a>
      </nav>

      {/* ── Hero Banner ── */}
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
              Strategic Partnerships
            </span>
            <h1>Let's Build Something <em>Together</em></h1>
            <p>
              Schedule a 1-on-1 strategy call with our partnerships team. We'll explore how we can grow together — whether you're an influencer, clinic, or affiliate marketer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="bp-main">
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

        {/* Calendar + Slots Card */}
        <div className="bp-card">
          <div className={`bp-card-inner ${selectedDate ? 'bp-card-inner--split' : ''}`}>
            {/* Calendar Panel */}
            <div className="bp-cal-panel">
              <div className="bp-cal-head">
                <button className="bp-cal-nav" onClick={goToPrevMonth} disabled={isPrevDisabled} aria-label="Previous month">
                  <ChevronLeft size={18} />
                </button>
                <h2 className="bp-cal-title">{MONTHS[viewMonth]} {viewYear}</h2>
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

            {/* Slots Panel */}
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
                      <p>No times available on this date.</p>
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

        {/* Highlights Grid */}
        <div className="bp-highlights">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              className="bp-highlight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="bp-highlight-icon">
                <h.Icon size={20} />
              </div>
              <div>
                <strong>{h.title}</strong>
                <span>{h.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bp-social-proof">
          {socialProof.map((t, i) => (
            <motion.div
              key={i}
              className="bp-testimonial"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bp-testimonial-stars">
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p>"{t.quote}"</p>
              <div className="bp-testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="bp-trust">
          <Shield size={14} />
          <span>Your information is kept confidential and will only be used to prepare for our call.</span>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
};

export default BookingPage;
