import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './PartnerFAQ.css';

const FAQS = [
  {
    q: 'How much do partners actually earn?',
    a: 'You earn 20% commission on every qualified sale your link generates. On our flagship NHTO Bundle that\'s $50 per referral — and many partners send 20–50+ per month.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Payouts go out monthly via PayPal or direct deposit, on the 15th of the month following the sale. Minimum payout is $50.',
  },
  {
    q: 'How long is the cookie window?',
    a: 'We use a 60-day cookie. If someone clicks your link and purchases within 60 days, you get credit — even if they come back through a different channel.',
  },
  {
    q: 'Where am I allowed to promote?',
    a: 'Owned channels (social, email, podcast, blog, website, in-person/clinic). Paid traffic is allowed with approval. We do not allow trademark bidding or unauthorized coupon sites.',
  },
  {
    q: 'How long does approval take?',
    a: 'Most applications are reviewed within 48 hours. We approve partners whose audience aligns with men\'s health, performance, longevity, or wellness.',
  },
  {
    q: 'Do I get marketing assets?',
    a: 'Yes — approved partners receive a starter kit: tracking link, swipe copy for email and social, product imagery, UGC video clips, and a live performance dashboard.',
  },
];

const PartnerFAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="partner-faq">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`partner-faq-item ${isOpen ? 'open' : ''}`} key={i}>
            <button
              type="button"
              className="partner-faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <div className="partner-faq-a-wrap" hidden={!isOpen}>
              <p className="partner-faq-a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerFAQ;