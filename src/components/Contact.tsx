import { useState, useEffect } from "react";
import "./styles/Contact.css";

type RequestItem = {
  id: string;
  userEmail: string;
  docLabel: string;
  fileName: string;
  status: "approved" | "pending" | "deleted";
  timestamp: string;
};

const Contact = () => {
  const [authScreen, setAuthScreen] = useState<"signin" | "signup" | "authenticated">("signin");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [allRequests, setAllRequests] = useState<RequestItem[]>([]);

  const availableDocs = [
    { id: "dca_dip", label: "DCA Main Diploma", fileName: "dca_diploma.pdf" },
    { id: "dca_s1", label: "DCA 1st Semester Marksheet", fileName: "dca_1Sam.pdf" },
    { id: "dca_s2", label: "DCA 2nd Semester Marksheet", fileName: "dca_2Sam.pdf" },
    { id: "m12", label: "12th Class Marksheet", fileName: "12th_marksheet.pdf" },
    { id: "m10", label: "10th Class Marksheet", fileName: "10th_marksheet.pdf" },
    { id: "res", label: "Professional Resume", fileName: "resume.pdf" }
  ];

  const publicCertificates = [
    { label: "Data Analytics with AI", file: "Data Analytics with AI_certificate.pdf" },
    { label: "Introduction to SQL", file: "Introduction to SQL_certificate.pdf" },
    { label: "ChatGPT for Everyone", file: "ChatGPT for Everyone_certificate.pdf" },
    { label: "Generative AI for Beginners", file: "Generative_AI_for_Beginners.pdf" },
    { label: "Intro to Generative AI", file: "Introduction_to_Generative_AI_Studio.pdf" },
    { label: "Intro to Prompt Engineering", file: "Introduction_to_Prompt_Engineering.pdf" }
  ];

  useEffect(() => {
    const savedRequests = localStorage.getItem("suraj_portfolio_db");
    if (savedRequests) {
      setAllRequests(JSON.parse(savedRequests));
    } else {
      const dummyData: RequestItem[] = [
        { id: "req_1", userEmail: "hr_verification@polyhose.com", docLabel: "Professional Resume", fileName: "resume.pdf", status: "pending", timestamp: "2026" }
      ];
      setAllRequests(dummyData);
      localStorage.setItem("suraj_portfolio_db", JSON.stringify(dummyData));
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    setCurrentUserEmail(cleanEmail);
    setAuthScreen("authenticated");
    setIsAdmin(cleanEmail === "surajsinghrajput5040@gmail.com");
  };

  const handleSocialLogin = (platform: string) => {
    setCurrentUserEmail(`authorized_${platform.toLowerCase()}@node.com`);
    setIsAdmin(false);
    setAuthScreen("authenticated");
  };

  const handleRequestAccess = (docLabel: string, fileName: string) => {
    const newReq: RequestItem = {
      id: "req_" + Date.now(),
      userEmail: currentUserEmail,
      docLabel: docLabel,
      fileName: fileName,
      status: "pending",
      timestamp: "2026"
    };
    const updated = [newReq, ...allRequests];
    setAllRequests(updated);
    localStorage.setItem("suraj_portfolio_db", JSON.stringify(updated));
  };

  const handleApproveRequest = (reqId: string) => {
    const updated = allRequests.map(r => 
      r.id === reqId ? { ...r, status: "approved" as const } : r
    );
    setAllRequests(updated);
    localStorage.setItem("suraj_portfolio_db", JSON.stringify(updated));
  };

  return (
    <div className="contact-section section-container" id="contact" style={{ background: "#05070c", padding: "60px 20px" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "0 0 10px 0" }}>Get In Touch & Gateway Portal</h2>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Access enterprise cloud system log nodes and secure verification channels</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", maxWidth: "1040px", margin: "0 auto" }}>
        
        {/* LEFT COLUMN: CONTACT DETAILS */}
        <div style={{ background: "linear-gradient(145deg, #0e1426 0%, #050811 100%)", padding: "35px", borderRadius: "24px", border: "1px solid rgba(56, 189, 248, 0.15)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: "0 0 25px 0", color: "#38bdf8", fontSize: "18px", textTransform: "uppercase", letterSpacing: "1px" }}>📡 Contact Node Infrastructure</h3>
            
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
              <div style={{ background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)", width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>✉️</div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>Email Address</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>surajsinghrajput5040@gmail.com</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
              <div style={{ background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)", width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8" }}>📞</div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>Contact Number</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginTop: "2px" }}>+91 78795 95821</div>
              </div>
            </div>
          </div>

          <div style={{ background: "#080a12", border: "1px solid rgba(255,255,255,0.04)", padding: "20px", borderRadius: "16px", textAlign: "center", marginTop: "20px" }}>
            <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700, marginBottom: "8px" }}>Operational Base Location</div>
            <span style={{ display: "inline-block", background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)", padding: "8px 16px", borderRadius: "50px", fontSize: "11px", fontWeight: 800, color: "#38bdf8" }}>
              📍 PITHAMPUR, MADHYA PRADESH
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: SECURE LOGIN PANEL */}
        <div style={{ background: "linear-gradient(145deg, #0e1426 0%, #050811 100%)", padding: "35px", borderRadius: "24px", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "15px", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, color: "#fff", fontSize: "18px" }}>🔒 Secure Documents Gate</h3>
            {authScreen === "authenticated" && (
              <button onClick={() => setAuthScreen("signin")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "5px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>Logout</button>
            )}
          </div>

          {authScreen === "signin" && (
            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" required style={{ width: "100%", background: "#0c101d", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "10px", color: "#fff", fontSize: "14px", boxSizing: "border-box" }} />
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Account Password" required style={{ width: "100%", background: "#0c101d", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "10px", color: "#fff", fontSize: "14px", boxSizing: "border-box" }} />
              <button type="submit" style={{ background: "#38bdf8", color: "#05070c", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "800", textTransform: "uppercase", fontSize: "12px", cursor: "pointer", marginTop: "5px" }}>Sign In</button>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "5px" }}>
                <button type="button" onClick={() => handleSocialLogin("Google")} style={{ background: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>Google</button>
                <button type="button" onClick={() => handleSocialLogin("LinkedIn")} style={{ background: "rgba(255,255,255,0.04)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "10px", borderRadius: "10px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>LinkedIn</button>
              </div>
              <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", margin: "10px 0 0 0" }}>
                New clearance terminal node? <span onClick={() => setAuthScreen("signup")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
              </p>
            </form>
          )}

          {authScreen === "signup" && (
            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input type="text" placeholder="Full Name Identity" required style={{ width: "100%", background: "#0c101d", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "10px", color: "#fff", fontSize: "14px" }} />
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Secure Email Address" required style={{ width: "100%", background: "#0c101d", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "10px", color: "#fff", fontSize: "14px" }} />
              <input type="password" placeholder="Create Access Password" required style={{ width: "100%", background: "#0c101d", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 16px", borderRadius: "10px", color: "#fff", fontSize: "14px" }} />
              <button type="submit" style={{ background: "#4ade80", color: "#05070c", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "800", textTransform: "uppercase", fontSize: "12px", cursor: "pointer" }}>Create Account</button>
              <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", margin: "5px 0 0 0" }}>
                Already registered? <span onClick={() => setAuthScreen("signin")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign In</span>
              </p>
            </form>
          )}

          {authScreen === "authenticated" && (
            <div>
              {isAdmin ? (
                <div style={{ background: "rgba(5,7,12,0.5)", border: "1px solid #fbbf24", padding: "15px", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fbbf24", margin: "0 0 10px 0", fontSize: "14px" }}>System Master Console — {currentUserEmail}</h4>
                  {allRequests.map((req) => (
                    <div key={req.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "8px 0" }}>
                      <span style={{ color: "#fff" }}>{req.userEmail} ({req.docLabel})</span>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <button onClick={() => handleApproveRequest(req.id)} style={{ background: "#4ade80", border: "none", color: "#000", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>Approve</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: "rgba(5,7,12,0.5)", border: "1px solid #38bdf8", padding: "15px", borderRadius: "12px" }}>
                  <h4 style={{ color: "#38bdf8", margin: "0 0 12px 0", fontSize: "14px" }}>Clearance Verified Node: {currentUserEmail}</h4>
                  {availableDocs.map((doc) => {
                    const userReq = allRequests.find(r => r.userEmail === currentUserEmail && r.fileName === doc.fileName);
                    return (
                      <div key={doc.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                        <span style={{ color: "#e2e8f0", fontSize: "13px" }}>{doc.label}</span>
                        {!userReq ? (
                          <button onClick={() => handleRequestAccess(doc.label, doc.fileName)} style={{ background: "transparent", color: "#38bdf8", border: "1px solid #38bdf8", borderRadius: "6px", padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>Request Access</button>
                        ) : (
                          <div>
                            {userReq.status === "approved" ? (
                              <button onClick={() => window.open(`/Portfolio/${doc.fileName}`, "_blank")} style={{ background: "#4ade80", color: "#000", border: "none", borderRadius: "6px", padding: "4px 10px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>Download</button>
                            ) : (
                              <span style={{ color: "#fbbf24", fontSize: "11px", fontWeight: "bold" }}>⏳ Pending Admin</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1040px", margin: "30px auto 0 auto", background: "linear-gradient(145deg, #0e1426 0%, #050811 100%)", padding: "25px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.04)" }}>
        <h4 style={{ margin: "0 0 15px 0", color: "#94a3b8", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>🎓 Public Achievements & Verifications Matrix</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {publicCertificates.map((cert, index) => (
            <a key={index} href={`/Portfolio/${cert.file}`} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#0c101d", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", color: "#f8fafc", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
              <span>🏆 {cert.label}</span>
              <span style={{ color: "#38bdf8" }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
