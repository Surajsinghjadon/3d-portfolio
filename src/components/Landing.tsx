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
          
          <div className="landing-info">
            <h3>Data Analyst &</h3>
            
            {/* ⚡ FIXED: Removed the messy duplicate overlapping <h2> block that was breaking the layout */}
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Computer</div>
              <div className="landing-h2-2">Professional</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
