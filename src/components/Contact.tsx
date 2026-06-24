import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright, MdLock, MdCheckCircle, MdHourglassTop, MdCancel, MdLogin, MdLogout, MdAdminPanelSettings, MdPerson, MdEmail } from "react-icons/md";
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
  // Auth Screen Flow: 'signin' | 'signup' | 'forgot' | 'authenticated'
  const [authScreen, setAuthScreen] = useState<"signin" | "signup" | "forgot" | "authenticated">("signin");
  
  // Form Inputs
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // OTP Simulation States
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // Password Strength State Animation Nodes
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");
  const [strengthColor, setStrengthColor] = useState("#ef4444");
  const [strengthWidth, setStrengthWidth] = useState("0%");

  // Session States
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [allRequests, setAllRequests] = useState<RequestItem[]>([]);

  const availableDocs = [
    { id: "dca", label: "Diploma in Computer Applications (DCA)", fileName: "dca_diploma.pdf" },
    { id: "m12", label: "12th Grade Marksheet", fileName: "12th_marksheet.pdf" },
    { id: "m10", label: "10th Grade Marksheet", fileName: "10th_marksheet.pdf" },
  ];

  useEffect(() => {
    const savedRequests = localStorage.getItem("suraj_portfolio_db");
    if (savedRequests) {
      setAllRequests(JSON.parse(savedRequests));
    } else {
      const dummyData: RequestItem[] = [
        { id: "req_1", userEmail: "recruiter_node@tata.com", docLabel: "Diploma in Computer Applications (DCA)", fileName: "dca_diploma.pdf", status: "pending", timestamp: "24/06/2026" }
      ];
      setAllRequests(dummyData);
      localStorage.setItem("suraj_portfolio_db", JSON.stringify(dummyData));
    }
  }, []);

  const saveToDB = (updatedList: RequestItem[]) => {
    setAllRequests(updatedList);
    localStorage.setItem("suraj_portfolio_db", JSON.stringify(updatedList));
  };

  // Live Password Strength Bar Calculator & Animation Engine
  const checkPasswordStrength = (pass: string) => {
    setPasswordInput(pass);
    if (!pass) {
      setStrength("");
      setStrengthWidth("0%");
      return;
    }

    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[@$!%*#?&]/.test(pass)) score++;

    if (score <= 2) {
      setStrength("Weak");
      setStrengthColor("#ef4444"); 
      setStrengthWidth("33%");
    } else if (score === 3 || score === 4) {
      setStrength("Medium");
      setStrengthColor("#eab308"); 
      setStrengthWidth("66%");
    } else {
      setStrength("Strong");
      setStrengthColor("#22c55e"); 
      setStrengthWidth("100%");
    }
  };

  // Simulated OTP Trigger Channel
  const handleSendOtp = () => {
    if (!emailInput.trim()) {
      alert("Please enter your email address first!");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      alert(`📨 Success! A secure verification OTP code has been dispatched to: ${emailInput}`);
    }, 1200);
  };

  // Authentication Submission Routing
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    
    if (authScreen === "signup") {
      if (!otpInput) {
        alert("Verification Error: Please input the OTP code received on your email terminal.");
        return;
      }
      if (passwordInput !== confirmPassword) {
        alert("Security Mismatch: Password and Confirm Password do not match.");
        return;
      }
    }

    setCurrentUserEmail(cleanEmail);
    setAuthScreen("authenticated");
    
    if (cleanEmail === "surajsinghrajput5040@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleSocialLogin = (platform: "Google" | "LinkedIn") => {
    alert(`🌐 Initializing continuous handshake with ${platform} OAuth API...`);
    setCurrentUserEmail(`verified_partner@${platform.toLowerCase()}.com`);
    setIsAdmin(false);
    setAuthScreen("authenticated");
  };

  // Recruiter Action: Request Access Token
  const raiseAccessRequest = (docLabel: string, fileName: string) => {
    const existing = allRequests.find(r => r.userEmail === currentUserEmail && r.fileName === fileName);
    if (existing) {
      alert(`⚠️ Request already exists! Current Status: ${existing.status.toUpperCase()}`);
      return;
    }

    const newRequest: RequestItem = {
      id: "req_" + Date.now(),
      userEmail: currentUserEmail,
      docLabel: docLabel,
      fileName: fileName,
      status: "pending",
      timestamp: new Date().toLocaleDateString()
    };

    const updated = [newRequest, ...allRequests];
    saveToDB(updated);
    alert(`🚀 Request for ${docLabel} sent to Suraj Bhaiya's account!`);
  };

  // Recruiter Action: Open Document if Approved
  const openDocument = (fileName: string, status: string) => {
    if (status === "approved") {
      window.open(`/${fileName}`, "_blank");
    } else if (status === "pending") {
      alert("⏳ Access Pending! Suraj bhaiya ne abhi is file ko approve nahi kiya hai.");
    } else {
      alert("❌ Access Revoked! Suraj bhaiya ne is file ka access delete kar diya hai.");
    }
  };

  // Admin Actions: Approve / Pending / Delete
  const updateStatusByAdmin = (id: string, newStatus: "approved" | "pending" | "deleted") => {
    const updated = allRequests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    saveToDB(updated);
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container" style={{ background: "#090d16", borderRadius: "16px", padding: "30px", border: "1px solid #1e293b" }}>
        
        {/* Navigation / Header Session Management */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "15px", marginBottom: "25px" }}>
          <h3 style={{ margin: 0, color: "#fff" }}>🔒 Secure Documents Interface</h3>
          {authScreen === "authenticated" && (
            <button onClick={() => { setAuthScreen("signin"); setPasswordInput(""); setConfirmPassword(""); }} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <MdLogout /> Logout
            </button>
          )}
        </div>

        {/* ---------------- VIEW 1: SIGN IN COMPONENT ---------------- */}
        {authScreen === "signin" && (
          <div style={{ maxWidth: "420px", margin: "20px auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <MdLock size={36} color="#38bdf8" />
              <h4 style={{ color: "#fff", margin: "10px 0 4px 0", fontSize: "18px" }}>Sign In to Account</h4>
              <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>Access verified clearance certificates</p>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <input type="password" placeholder="Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              
              <div style={{ textAlign: "right", marginTop: "-6px" }}>
                <span onClick={() => setAuthScreen("forgot")} style={{ color: "#38bdf8", fontSize: "12px", cursor: "pointer", textDecoration: "underline" }}>Forgot Password?</span>
              </div>

              <button type="submit" style={{ background: "#0284c7", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <MdLogin /> Sign In
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", margin: "20px 0", color: "#475569", fontSize: "11px" }}>
              <div style={{ flex: 1, height: "1px", background: "#334155" }}></div>
              <span style={{ padding: "0 10px" }}>OR CONTINUE WITH</span>
              <div style={{ flex: 1, height: "1px", background: "#334155" }}></div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button onClick={() => handleSocialLogin("Google")} style={{ background: "#fff", color: "#000", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px" }}>Google</button>
              <button onClick={() => handleSocialLogin("LinkedIn")} style={{ background: "#0077b5", color: "#fff", border: "none", padding: "8px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", fontSize: "12px" }}>LinkedIn</button>
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginTop: "20px", marginBottom: 0 }}>
              Don't have an account? <span onClick={() => setAuthScreen("signup")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
            </p>
          </div>
        )}

        {/* ---------------- VIEW 2: ADVANCED SIGN UP COMPONENT ---------------- */}
        {authScreen === "signup" && (
          <div style={{ maxWidth: "440px", margin: "20px auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
            <h4 style={{ color: "#fff", margin: "0 0 4px 0", fontSize: "18px", textAlign: "center" }}>Create Corporate Account</h4>
            <p style={{ color: "#94a3b8", fontSize: "12px", textAlign: "center", margin: "0 0 20px 0" }}>Register verified security credentials</p>

            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Full Name" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter 6-Digit OTP" required style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
                <button type="button" onClick={handleSendOtp} disabled={otpLoading} style={{ background: otpSent ? "#475569" : "#0284c7", color: "#fff", border: "none", padding: "0 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>
                  {otpLoading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
                </button>
              </div>

              <div>
                <input type="password" value={passwordInput} onChange={(e) => checkPasswordStrength(e.target.value)} placeholder="Create Secure Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
                {strength && (
                  <div style={{ marginTop: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                      <span style={{ color: "#94a3b8" }}>Password Security Level:</span>
                      <span style={{ color: strengthColor, fontWeight: "bold" }}>{strength}</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", background: "#334155", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: strengthWidth, height: "100%", background: strengthColor, transition: "width 0.4s ease-in-out, background-color 0.4s ease" }}></div>
                    </div>
                  </div>
                )}
              </div>

              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Secure Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <button type="submit" style={{ background: "#22c55e", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", marginTop: "6px" }}>Register New Node</button>
            </form>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginTop: "20px", marginBottom: 0 }}>
              Already registered? <span onClick={() => setAuthScreen("signin")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign In</span>
            </p>
          </div>
        )}

        {/* ---------------- VIEW 3: RECOVERY SYSTEM ---------------- */}
        {authScreen === "forgot" && (
          <div style={{ maxWidth: "420px", margin: "20px auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155", textAlign: "center" }}>
            <MdEmail size={36} color="#eab308" />
            <h4 style={{ color: "#fff", margin: "10px 0 4px 0", fontSize: "18px" }}>Recover Account Matrix</h4>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: "0 0 20px 0" }}>Enter your email to clear connection path tokens.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("📨 Recovery token sent!"); setAuthScreen("signin"); }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="email" placeholder="Enter Registered Email" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff", textAlign: "center" }} />
              <button type="submit" style={{ background: "#eab308", color: "#000", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>Send Password Reset Link</button>
            </form>
            <p onClick={() => setAuthScreen("signin")} style={{ color: "#38bdf8", fontSize: "13px", cursor: "pointer", textDecoration: "underline", marginTop: "20px", marginBottom: 0 }}>Back to Authorization Log</p>
          </div>
        )}

        {/* ---------------- VIEW 4: AUTHENTICATED SYSTEM TIERS ---------------- */}
        {authScreen === "authenticated" && (
          <div>
            {isAdmin ? (
              /* MASTER ADMIN DASHBOARD - VISIBLE ONLY TO SURAJ */
              <div style={{ background: "#0f172a", border: "1px solid #eab308", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", color: "#eab308" }}>
                  <MdAdminPanelSettings size={24} />
                  <h4 style={{ margin: 0, fontSize: "16px" }}>Master Admin Request Hub — {currentUserEmail}</h4>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                        <th style={{ padding: "8px" }}>User Source Node</th>
                        <th style={{ padding: "8px" }}>Requested Matrix</th>
                        <th style={{ padding: "8px" }}>Current Status</th>
                        <th style={{ padding: "8px" }}>Action Pipeline Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRequests.map((req) => (
                        <tr key={req.id} style={{ borderBottom: "1px solid #1e293b" }}>
                          <td style={{ padding: "10px", color: "#38bdf8" }}>{req.userEmail}</td>
                          <td style={{ padding: "10px", color: "#fff" }}>{req.docLabel}</td>
                          <td style={{ padding: "10px" }}>
                            <span style={{ color: req.status === "approved" ? "#22c55e" : req.status === "pending" ? "#eab308" : "#ef4444" }}>● {req.status.toUpperCase()}</span>
                          </td>
                          <td style={{ padding: "10px", display: "flex", gap: "6px" }}>
                            <button onClick={() => updateStatusByAdmin(req.id, "approved")} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Approve</button>
                            <button onClick={() => updateStatusByAdmin(req.id, "pending")} style={{ background: "#eab308", color: "#000", border: "none", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Hold</button>
                            <button onClick={() => updateStatusByAdmin(req.id, "deleted")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* CORPORATE CLIENT/RECRUITER DASHBOARD */
              <div style={{ background: "#0f172a", border: "1px solid #38bdf8", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", color: "#38bdf8" }}>
                  <MdPerson size={22} />
                  <h4 style={{ margin: 0, fontSize: "15px" }}>Client Active Session: {currentUserEmail}</h4>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {availableDocs.map((doc) => {
                    const userReq = allRequests.find(r => r.userEmail === currentUserEmail && r.fileName === doc.fileName);
                    return (
                      <div key={doc.id} style={{ borderBottom: "1px solid #1e293b", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#f8fafc" }}>{doc.label}</p>
                        </div>
                        <div>
                          {!userReq ? (
                            <button onClick={() => raiseAccessRequest(doc.label, doc.fileName)} style={{ background: "#1e293b", color: "#38bdf8", border: "1px solid #38bdf8", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>Send Access Request</button>
                          ) : (
                            <div>
                              {userReq.status === "approved" && <button onClick={() => openDocument(doc.fileName, "approved")} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>Download File</button>}
                              {userReq.status === "pending" && <span style={{ color: "#eab308", fontSize: "12px" }}><MdHourglassTop /> Pending Approval</span>}
                              {userReq.status === "deleted" && <span style={{ color: "#ef4444", fontSize: "12px" }}><MdCancel /> Access Revoked</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Public Badges Grid Row Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
            <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Public Data Modules</h5>
            <a href="/Introduction to SQL_certificate.pdf" target="_blank" rel="noreferrer" style={{ display: "block", marginBottom: "8px", color: "#38bdf8", textDecoration: "none" }}>SQL Structural Data <MdArrowOutward /></a>
            <a href="/Data Analytics with AI_certificate.pdf" target="_blank" rel="noreferrer" style={{ display: "block", color: "#38bdf8", textDecoration: "none" }}>Analytics Infrastructure <MdArrowOutward /></a>
          </div>
          <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
            <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Pithampur Center Matrix</h5>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Corporate Base: Pithampur, Madhya Pradesh</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Contact Line: +91 78795 95821</p>
          </div>
        </div>

        {/* Legal Structural Footer */}
        <div style={{ marginTop: "40px", borderTop: "1px solid #1e293b", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "13px", margin: 0, color: "#64748b" }}>System Platform Architecture by <span>Suraj Singh Jadon</span></h2>
          <h5 style={{ margin: 0, display: "flex", alignItems: "center", gap: "4px", color: "#475569" }}><MdCopyright /> 2026</h5>
        </div>

      </div>
    </div>
  );
};

export default Contact;
