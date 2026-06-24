const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact" style={{ padding: "80px 20px", background: "transparent" }}>
      
      {/* HEADER SECTION WITH ORIGINAL WEBSITE COLOR */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", margin: "0 0 12px 0" }}>
          Get In <span style={{ color: "#5eead4" }}>Touch</span>
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>
          Let's connect! Feel free to reach out for data audit controls, SAP logging integrations, or professional collaborations.
        </p>
      </div>

      {/* MINIMALIST NODE GRID MATCHING THE WEBSITE THEME */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", maxWidth: "900px", margin: "0 auto" }}>
        
        {/* EMAIL NODE */}
        <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(94, 234, 212, 0.1)", padding: "30px", borderRadius: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "15px" }}>✉️</div>
          <h3 style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", letterSpacing: "1px", margin: "0 0 8px 0" }}>Email Address</h3>
          <a href="mailto:surajsinghrajput5040@gmail.com" style={{ fontSize: "14px", fontWeight: 700, color: "#fff", textDecoration: "none", wordBreak: "break-all" }}>
            surajsinghrajput5040@gmail.com
          </a>
        </div>

        {/* PHONE NODE */}
        <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(94, 234, 212, 0.1)", padding: "30px", borderRadius: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "15px" }}>📞</div>
          <h3 style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", letterSpacing: "1px", margin: "0 0 8px 0" }}>Contact Number</h3>
          <a href="tel:+917879595821" style={{ fontSize: "15px", fontWeight: 700, color: "#fff", textDecoration: "none" }}>
            +91 78795 95821
          </a>
        </div>

        {/* LOCATION NODE */}
        <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(94, 234, 212, 0.1)", padding: "30px", borderRadius: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "15px" }}>📍</div>
          <h3 style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", letterSpacing: "1px", margin: "0 0 8px 0" }}>Operational Base</h3>
          <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", margin: 0 }}>
            Pithampur, Madhya Pradesh
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
