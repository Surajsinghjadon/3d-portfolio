import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv" style={{ position: "relative", overflow: "hidden" }}>
        <div className="landing-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", zIndex: 10, position: "relative", padding: "0 20px" }}>
          
          {/* INTRO BLOCK */}
          <div className="landing-intro" style={{ textAlign: "center", marginBottom: "15px" }}>
            <h2 style={{ fontSize: "18px", color: "#94a3b8", fontWeight: 500, margin: 0, letterSpacing: "1px" }}>Hello! I'm</h2>
            <h1 style={{ fontSize: "clamp(38px, 8vw, 56px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "10px 0 0 0", letterSpacing: "0.5px" }}>
              SURAJ SINGH<br />
              <span style={{ color: "#5eead4" }}>JADON</span>
            </h1>
          </div>
          
          {/* ⚡ FIXED: Inline flex layout completely bypasses buggy CSS to prevent any text overlapping */}
          <div className="landing-info" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", width: "100%" }}>
            <h3 style={{ fontSize: "16px", color: "#94a3b8", fontWeight: 600, margin: "0 0 8px 0", letterSpacing: "0.5px" }}>
              Data Analyst &
            </h3>
            
            <h2 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, color: "#5eead4", textTransform: "uppercase", margin: 0, display: "flex", gap: "8px", justifyContent: "center", width: "100%", flexWrap: "wrap", lineHeight: "1.2" }}>
              <span>Computer</span>
              <span>Professional</span>
            </h2>
          </div>

        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
