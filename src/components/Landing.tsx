import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* ⚡ BULLETPROOF CSS OVERRIDE: Yeh selectors GSAP ke inline styles ko override karke text ko mobile par chota rakhenge */}
      <style>{`
        @media (max-width: 768px) {
          div.landing-section div.landing-container div.landing-info h3 {
            font-size: 14px !important;
            margin-bottom: 5px !important;
          }
          div.landing-section div.landing-container div.landing-info h2,
          div.landing-section div.landing-container div.landing-info .landing-info-h2 {
            font-size: 24px !important;
            line-height: 1.3 !important;
            height: auto !important;
          }
          div.landing-section div.landing-container div.landing-info div.landing-h2-1,
          div.landing-section div.landing-container div.landing-info div.landing-h2-2,
          div.landing-section div.landing-container div.landing-info div.landing-h2-info,
          div.landing-section div.landing-container div.landing-info div.landing-h2-info-1 {
            font-size: 24px !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            display: inline-block !important;
            width: auto !important;
            margin: 0 4px !important;
            line-height: 1.3 !important;
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
