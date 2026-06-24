import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* ⚡ NUCLEAR CSS OVERRIDE: Yeh mobile par saari khichdi ko khtam karke text ko ek line me laayega */}
      <style>{`
        @media (max-width: 768px) {
          /* 1. Pure text container ki absolute layout ko khatam karo */
          .landing-info,
          .landing-info h2,
          .landing-info-h2,
          .landing-info div,
          .landing-info span {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            bottom: auto !important;
            right: auto !important;
            transform: none !important;
            display: block !important;
            text-align: center !important;
            margin: 0 auto !important;
            width: 100% !important;
            height: auto !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          /* 2. Sub-heading text size set karo */
          .landing-info h3 {
            font-size: 14px !important;
            color: #94a3b8 !important;
            margin-bottom: 8px !important;
            position: relative !important;
          }

          /* 3. Computer Professional wale lafzon ka size force karo taaki wo phate nahi */
          .landing-h2-1, 
          .landing-h2-2, 
          .landing-h2-info, 
          .landing-h2-info-1 {
            font-size: 26px !important;
            font-weight: 800 !important;
            color: #5eead4 !important;
            line-height: 1.3 !important;
            letter-spacing: 0.5px !important;
          }

          /* White text color assign karo 'Professional' word ke liye agar design me thaa */
          .landing-h2-2, .landing-h2-info {
            color: #ffffff !important;
          }

          /* 4. Dusri duplicate layer ko mobile par bilkul chupa do taaki double text na dikhe */
          .landing-info h2:not(.landing-info-h2) {
            display: none !important;
          }
        }
      `}</style>

      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              SURAJ SINGH
              <br />
              <span>JADON</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Data Analyst &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Computer</div>
              <div className="landing-h2-2">Professional</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Professional</div>
              <div className="landing-h2-info-1">Computer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
