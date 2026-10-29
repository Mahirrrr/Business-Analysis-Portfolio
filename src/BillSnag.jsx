// HTML-built BillSnag product visuals for the incoming-projects showcase.
// The numbers mirror the labeled example on billsnag.com; they are not a real case.

const BILL_LINES = [
  { code: '99283', label: 'ER VISIT, LEVEL 3', amount: '1,140.00' },
  { code: '80053', label: 'LAB PANEL', amount: '214.00' },
  { code: '96360', label: 'IV HYDRATION', amount: '410.00', flagged: true },
  { code: '96374', label: 'IV PUSH', amount: '296.00' },
];

export function BillCard() {
  return (
    <div className="bill">
      <div className="bill__head">
        <span>EXAMPLE MEDICAL CENTER</span>
        <span>ITEMIZED BILL · EXAMPLE ONLY</span>
      </div>
      <div className="bill__lines">
        <span className="bill__scan" aria-hidden="true" />
        {BILL_LINES.map((line, i) => (
          <div
            className={`bill__row${line.flagged ? ' bill__row--flagged' : ''}`}
            style={{ '--i': i }}
            key={line.code}
          >
            <span className="bill__code">{line.code}</span>
            <span className="bill__label">{line.label}</span>
            <span className="bill__amount">{line.amount}</span>
          </div>
        ))}
      </div>
      <div className="bill__flag">
        <span className="bill__flag-mark" aria-hidden="true">✕</span>
        <span>
          <strong>IV hydration · $410.</strong> Billed on top of the IV push in the same visit. You may not owe it.
        </span>
      </div>
      <div className="bill__total">
        <span>YOU MAY OWE</span>
        <span>
          <s>2,060.00</s> 1,650.00
        </span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Snap it',
    text: 'A photo or PDF of the bill, plus the EOB if you have it.',
    chips: ['Claude Haiku', 'Zod schema'],
  },
  {
    title: 'We check it',
    text: 'Every flagged line, with the reason, before you sign anything.',
    chips: ['8 checks', '19 unit tests'],
  },
  {
    title: 'We call',
    text: 'You approve, and a real person on our team disputes it with the billing office.',
    chips: ['Signed authorization'],
  },
];

// `progress` is how far the reader has scrolled through this page (0–1).
// The line between steps fills in, and each step lights up as the line reaches it.
export function Pipeline({ progress }) {
  const filled = Math.min(1, progress / 0.7) * (STEPS.length - 1);
  return (
    <div className="pipeline">
      <ol className="pipeline__steps">
        {STEPS.map((step, i) => (
          <li
            className={`pipeline__step${filled >= i ? ' is-reached' : ''}`}
            style={{ '--seg': Math.min(1, Math.max(0, filled - i)) }}
            key={step.title}
          >
            <span className="pipeline__dot">{i + 1}</span>
            <div className="pipeline__card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="pipeline__chips">
                {step.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="pipeline__price">Free to check · 20% of what we save, max $500 · only if we save</p>
    </div>
  );
}
