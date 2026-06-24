const Career = () => {
  // 🎯 Aapka asli experience data
  const experiences = [
    {
      role: "Invoice SAP Executive",
      company: "Polyhose India Private Limited",
      year: "2025–26",
      desc: "Overseeing high-volume invoice processing inside corporate SAP environment log structures and reconciling corporate transactions and ledger accuracy validations."
    },
    {
      role: "Store Data Analysis Operations",
      company: "Hettich",
      year: "2024–25",
      desc: "Managed analytical validation, stock parsing, and inventory logs in database catalogs."
    },
    {
      role: "Machine Operator",
      company: "Rahul Precision Work Pvt Ltd",
      year: "2022–24",
      desc: "Managed industrial machine system calibrations and automated equipment logs."
    }
  ];

  return (
    <div className="career-section section-container" id="experience">
      <div className="career-header" style={{ marginBottom: "50px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff" }}>
          My career & <br />
          <span style={{ color: "#5eead4" }}>experience</span>
        </h2>
      </div>

      <div className="timeline-matrix" style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
        {/* TIMELINE VERTICAL LINE */}
        <div className="timeline-bar" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "rgba(94, 234, 212, 0.2)" }}>
          <div className="timeline-glowing-dot" style={{ position: "absolute", bottom: 0, left: "-4px", width: "10px", height: "10px", background: "#5eead4", borderRadius: "50%", boxShadow: "0 0 10px #5eead4" }}></div>
        </div>

        {/* MAPPING THE CORRECT EXPERIENCES */}
        {experiences.map((exp, index) => (
          <div className="timeline-row" key={index} style={{ display: "flex", marginBottom: "40px", alignItems: "center", justifyContent: "space-between" }}>
            
            {/* LEFT BLOCK: ROLE & COMPANY */}
            <div className="timeline-left-block" style={{ width: "40%", textAlign: "right", paddingRight: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", margin: "0 0 5px 0" }}>{exp.role}</h3>
              <p style={{ fontSize: "14px", color: "#5eead4", margin: 0 }}>{exp.company}</p>
            </div>

            {/* CENTER BLOCK: YEAR */}
            <div className="timeline-center-block" style={{ width: "10%", textAlign: "center", zIndex: 2 }}>
              <span style={{ display: "block", textAlign: "center", fontSize: "20px", fontWeight: 800, color: "#fff" }}>{exp.year}</span>
            </div>

            {/* RIGHT BLOCK: DESCRIPTION */}
            <div className="timeline-right-block" style={{ width: "40%", paddingLeft: "30px", textAlign: "left" }}>
              <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>{exp.desc}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
