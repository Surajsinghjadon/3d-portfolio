import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
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
          
          {/* 🎯 GSAP ANIMATION & MOBILE LAYOUT FIXED */}
          {/* Sahi layout aur fixed constraints taaki GSAP scroll triggers perfectly calculate ho sakein */}
          <div className="landing-info" style={{ width: "100%", maxWidth: "360px", margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 8px 0", letterSpacing: "1px" }}>
              Data Analyst &
            </h3>
            
            {/* Clamp lagane se text mobile par automatically chota ho jayega aur overlap nahi hoga */}
            <h2 className="landing-info-h2" style={{ fontSize: "clamp(24px, 6vw, 38px)", lineHeight: "1.2", fontWeight: 800 }}>
              <div className="landing-h2-1">Computer</div>
              <div className="landing-h2-2">Professional</div>
            </h2>
            
            <h2 style={{ fontSize: "clamp(24px, 6vw, 38px)", lineHeight: "1.2", fontWeight: 800 }}>
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
