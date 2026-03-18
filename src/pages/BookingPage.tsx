import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SharedFooter from '../components/SharedFooter/SharedFooter';
import { Calendar, Shield, TrendingUp, Users, CheckCircle, ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';

import './BookingPage.css';

const highlights = [
  { Icon: TrendingUp, text: '20% recurring commissions on every referral' },
  { Icon: Shield, text: 'Publicly traded company (BHIC) — real credibility' },
  { Icon: Users, text: '50,000+ satisfied customers across all products' },
  { Icon: CheckCircle, text: 'Dedicated partner success manager' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface SlotsMap {
  [date: string]: { slots: string[] };
}

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

const BookingPage: React.FC = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotsMap, setSlotsMap] = useState<SlotsMap>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Fetch slots for the current month view
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
        {
          headers: {
            Authorization: `Bearer ${anonKey}`,
            apikey: anonKey,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to load availability');
      }

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
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const isPastDate = (day: number) => {
    const key = toDateKey(viewYear, viewMonth, day);
    return key < todayKey;
  };

  const hasSlots = (day: number) => {
    const key = toDateKey(viewYear, viewMonth, day);
    return slotsMap[key]?.slots?.length > 0;
  };

  const selectedSlots = selectedDate ? slotsMap[selectedDate]?.slots || [] : [];

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  const isPrevDisabled =
    viewYear === today.getFullYear() && viewMonth <= today.getMonth();

  return (
    <div className="booking-page">
      <nav className="booking-nav">
        <a href="/">
          <img
            src="/images/best365labs-logo.png"
            alt="Best 365 Labs"
            width={140}
            height={36}
            loading="eager"
          />
        </a>
      </nav>

      <main className="booking-main">
        {/* Left — Value Prop */}
        <section className="booking-info">
          <span className="booking-badge">
            <Calendar size={14} />
            Strategic Partnerships
          </span>
          <h1>
            Let's Build Something <em>Together</em>
          </h1>
          <p className="booking-subtitle">
            Schedule a 1-on-1 strategy call with our partnerships team. We'll explore how we can grow together — whether you're an influencer, clinic, or affiliate marketer.
          </p>

          <ul className="booking-highlights">
            {highlights.map((h, i) => (
              <li key={i}>
                <span className="booking-highlight-icon">
                  <h.Icon size={18} />
                </span>
                {h.text}
              </li>
            ))}
          </ul>

          <div className="booking-trust-note">
            <Shield size={16} />
            <span>Your information is kept confidential and will only be used to prepare for our call.</span>
          </div>
        </section>

        {/* Right — Custom Calendar */}
        <section className="booking-calendar-custom">
          {/* Calendar header */}
          <div className="cal-header">
            <button
              className="cal-nav-btn"
              onClick={goToPrevMonth}
              disabled={isPrevDisabled}
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="cal-month-label">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <button
              className="cal-nav-btn"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="cal-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="cal-weekday">
                {w}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div className="cal-grid">
            {loading && (
              <div className="cal-loading-overlay">
                <Loader2 size={28} className="cal-spinner" />
              </div>
            )}
            {days.map((day, i) =>
              day === null ? (
                <span key={`empty-${i}`} className="cal-day cal-day-empty" />
              ) : (
                <button
                  key={day}
                  className={[
                    'cal-day',
                    isPastDate(day) ? 'cal-day-past' : '',
                    !isPastDate(day) && hasSlots(day) ? 'cal-day-available' : '',
                    selectedDate === toDateKey(viewYear, viewMonth, day) ? 'cal-day-selected' : '',
                    toDateKey(viewYear, viewMonth, day) === todayKey ? 'cal-day-today' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={isPastDate(day) || !hasSlots(day)}
                  onClick={() => {
                    const key = toDateKey(viewYear, viewMonth, day);
                    setSelectedDate(key);
                    setSelectedSlot(null);
                  }}
                >
                  {day}
                </button>
              )
            )}
          </div>

          {error && <p className="cal-error">{error}</p>}

          {/* Time slots */}
          {selectedDate && !loading && (
            <div className="cal-slots-section">
              <h3 className="cal-slots-title">
                <Clock size={16} />
                Available Times —{' '}
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {selectedSlots.length === 0 ? (
                <p className="cal-no-slots">No available times for this date.</p>
              ) : (
                <div className="cal-slots-grid">
                  {selectedSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`cal-slot ${selectedSlot === slot ? 'cal-slot-selected' : ''}`}
                      onClick={() => handleSelectSlot(slot)}
                    >
                      {formatSlotTime(slot)}
                    </button>
                  ))}
                </div>
              )}

              {selectedSlot && (
                <a
                  href={`https://api.leadconnectorhq.com/widget/booking/3d6bWBAUBH4knTmsIyaX`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cal-confirm-btn"
                >
                  Continue to Book — {formatSlotTime(selectedSlot)}
                </a>
              )}
            </div>
          )}
        </section>
      </main>

      <SharedFooter />
    </div>
  );
};

export default BookingPage;
