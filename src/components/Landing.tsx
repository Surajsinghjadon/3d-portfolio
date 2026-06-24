import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* ⚡ MASTER CSS OVERRIDE: Child classes ko direct target karke overlap khatam karega */}
      <style>{`
        @media (max-width: 768px) {
          .landing-info-h2, 
          .landing-info h2 {
            font-size: 26px !important;
            height: auto !important;
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .landing-h2-1, 
          .landing-h2-2, 
          .landing-h2-info, 
          .landing-h2-info-1 {
            font-size: 26px !important;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            display: block !important;
            text-align: center !important;
            width: 100% !important;
            line-height: 1.3 !important;
          }
          /* Duplicate layer ko mobile par hide mardega taaki khichdi na bane, par DOM me rahega jisse GSAP chalta rahe */
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
