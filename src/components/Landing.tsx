import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  // Mobile par text ko takrane se rokne ke liye ek uniform style array
  const responsiveStyle = {
    fontSize: "clamp(18px, 5.5vw, 32px)",
    lineHeight: "1.2",
  };

  return (
    <>
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
            
            {/* 🎯 INLINE RESPONSIVE SIZING: Bypasses compiler and forces text to shrink on mobile */}
            <h2 className="landing-info-h2" style={responsiveStyle}>
              <div className="landing-h2-1" style={{ fontSize: "inherit" }}>Computer</div>
              <div className="landing-h2-2" style={{ fontSize: "inherit" }}>Professional</div>
            </h2>
            
            <h2 style={responsiveStyle}>
              <div className="landing-h2-info" style={{ fontSize: "inherit" }}>Professional</div>
              <div className="landing-h2-info-1" style={{ fontSize: "inherit" }}>Computer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
