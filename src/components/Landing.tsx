import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* ⚡ MOBILE RESPONSIVE CSS PATCH: Animation tode bina text overlap ko mobile par theek karega */}
      <style>{`
        @media (max-width: 768px) {
          .landing-info h2, 
          .landing-info-h2,
          .landing-h2-1, 
          .landing-h2-2, 
          .landing-h2-info, 
          .landing-h2-info-1 {
            font-size: 6vw !important;
            line-height: 1.2 !important;
          }
          .landing-info {
            margin-top: 10px !important;
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
