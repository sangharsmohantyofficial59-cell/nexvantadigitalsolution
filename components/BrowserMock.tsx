/**
 * components/BrowserMock.tsx
 * ---------------------------------------------------------------
 * A small drawing of a browser window showing a sample clinic website.
 * It is built from ordinary HTML and CSS (no image file), so it is sharp on
 * every screen and costs almost nothing to load. It is used on the Home page
 * and the Dental Clinics page as a visual for "sites like this".
 *
 * `aria-hidden` hides it from screen readers because it is purely decorative,
 * and the real information is in the text next to it.
 */
export function BrowserMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mock__page">
        <div className="mock__nav">
          <strong>Your Clinic Name</strong>
          <span>Treatments &nbsp; Doctors &nbsp; Contact</span>
        </div>
        <div className="mock__title">Gentle dentistry for the whole family.</div>
        <div className="mock__text">Online appointments, clear information and a calm, modern clinic experience.</div>
        <div className="mock__buttons">
          <span className="mock__btn mock__btn--solid">Book appointment</span>
          <span className="mock__btn">View treatments</span>
        </div>
      </div>
    </div>
  );
}
