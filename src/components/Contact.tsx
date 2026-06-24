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
  const [authScreen, setAuthScreen] = useState<"signin" | "signup" | "forgot" | "authenticated">("signin");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");
  const [strengthColor, setStrengthColor] = useState("#ef4444");
  const [strengthWidth, setStrengthWidth] = useState("0%");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [allRequests, setAllRequests] = useState<RequestItem[]>([]);

  const availableDocs = [
    { id: "dca", label: "Diploma in Computer Applications (DCA)", fileName: "dca_1Sam.pdf" },
    { id: "m12", label: "12th Grade Marksheet", fileName: "12th_marksheet.pdf" },
    { id: "m10", label: "10th Grade Marksheet", fileName: "10th_marksheet.pdf" },
  ];

  useEffect(() => {
    const savedRequests = localStorage.getItem("suraj_portfolio_db");
    if (savedRequests) {
      setAllRequests(JSON.parse(savedRequests));
    } else {
      const dummyData: RequestItem[] = [
        { id: "req_1", userEmail: "recruiter_node@tata.com", docLabel: "Diploma in Computer Applications (DCA)", fileName: "dca_1Sam.pdf", status: "pending", timestamp: "24/06/2026" }
      ];
      setAllRequests(dummyData);
      localStorage.setItem("suraj_portfolio_db", JSON.stringify(dummyData));
    }
  }, []);

  const saveToDB = (updatedList: RequestItem[]) => {
    setAllRequests(updatedList);
    localStorage.setItem("suraj_portfolio_db", JSON.stringify(updatedList));
  };

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

  const handleSendOtp = () => {
    if (!emailInput.trim()) {
      alert("Please enter your email address first!");
      return;
    }
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
      alert(`📨 OTP sent to: ${emailInput}`);
    }, 1200);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (authScreen === "signup") {
      if (!otpInput) {
        alert("Please enter OTP.");
        return;
      }
      if (passwordInput !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }
    setCurrentUserEmail(cleanEmail);
    setAuthScreen("authenticated");
    setIsAdmin(cleanEmail === "surajsinghrajput5040@gmail.com");
  };

  const handleSocialLogin = (platform: string) => {
    alert(`🌐 Connecting to ${platform}...`);
    setCurrentUserEmail(`partner@${platform.toLowerCase()}.com`);
    setIsAdmin(false);
    setAuthScreen("authenticated");
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container" style={{ background: "#090d16", borderRadius: "16px", padding: "30px", border: "1px solid #1e293b" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "15px", marginBottom: "25px" }}>
          <h3 style={{ margin: 0, color: "#fff" }}>🔒 Secure Documents Interface</h3>
          {authScreen === "authenticated" && (
            <button onClick={() => setAuthScreen("signin")} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}>Logout</button>
          )}
        </div>

        {authScreen === "signin" && (
          <div style={{ maxWidth: "420px", margin: "20px auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <input type="password" placeholder="Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <button type="submit" style={{ background: "#0284c7", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "600" }}>Sign In</button>
            </form>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px" }}>
              <button onClick={() => handleSocialLogin("Google")} style={{ background: "#fff", color: "#000", border: "none", padding: "8px", borderRadius: "6px", fontWeight: "600" }}>Google</button>
              <button onClick={() => handleSocialLogin("LinkedIn")} style={{ background: "#0077b5", color: "#fff", border: "none", padding: "8px", borderRadius: "6px", fontWeight: "600" }}>LinkedIn</button>
            </div>
            <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginTop: "20px" }}>
              Don't have an account? <span onClick={() => setAuthScreen("signup")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign Up</span>
            </p>
          </div>
        )}

        {authScreen === "signup" && (
          <div style={{ maxWidth: "440px", margin: "20px auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
            <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Full Name" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Email Address" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="text" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP" required style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
                <button type="button" onClick={handleSendOtp} style={{ background: "#0284c7", color: "#fff", border: "none", padding: "0 14px", borderRadius: "6px", fontSize: "12px" }}>{otpLoading ? "Sending..." : "Send OTP"}</button>
              </div>
              <div>
                <input type="password" value={passwordInput} onChange={(e) => checkPasswordStrength(e.target.value)} placeholder="Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
                {strength && (
                  <div style={{ marginTop: "6px" }}>
                    <div style={{ width: "100%", height: "4px", background: "#334155", borderRadius: "2px" }}>
                      <div style={{ width: strengthWidth, height: "100%", background: strengthColor, transition: "width 0.4s ease" }}></div>
                    </div>
                  </div>
                )}
              </div>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff" }} />
              <button type="submit" style={{ background: "#22c55e", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", fontWeight: "600" }}>Register Node</button>
            </form>
            <p style={{ textAlign: "center", fontSize: "13px", color: "#94a3b8", marginTop: "20px" }}>
              Already registered? <span onClick={() => setAuthScreen("signin")} style={{ color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }}>Sign In</span>
            </p>
          </div>
        )}

        {authScreen === "authenticated" && (
          <div>
            {isAdmin ? (
              <div style={{ background: "#0f172a", border: "1px solid #eab308", padding: "20px", borderRadius: "12px" }}>
                <h4 style={{ color: "#eab308", margin: "0 0 15px 0" }}>Master Admin Request Hub — {currentUserEmail}</h4>
                <table style={{ width: "100%", fontSize: "13px", color: "#fff" }}>
                  <thead>
                    <tr style={{ color: "#94a3b8", textAlign: "left" }}>
                      <th>User</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allRequests.map((req) => (
                      <tr key={req.id} style={{ borderBottom: "1px solid #1e293b" }}>
                        <td style={{ padding: "8px 0" }}>{req.userEmail}</td>
                        <td>{req.docLabel}</td>
                        <td style={{ color: req.status === "approved" ? "#22c55e" : req.status === "pending" ? "#eab308" : "#ef4444" }}>{req.status}</td>
                        <td>
                          <button onClick={() => { const updated = allRequests.map(r => r.id === req.id ? { ...r, status: "approved" as const } : r); setAllRequests(updated); localStorage.setItem("suraj_portfolio_db", JSON.stringify(updated)); }} style={{ background: "#22c55e", border: "none", color: "#fff", marginRight: "5px", padding: "2px 6px", borderRadius: "4px", cursor: "pointer" }}>Approve</button>
                          <button onClick={() => { const updated = allRequests.map(r => r.id === req.id ? { ...r, status: "deleted" as const } : r); setAllRequests(updated); localStorage.setItem("suraj_portfolio_db", JSON.stringify(updated)); }} style={{ background: "#ef4444", border: "none", color: "#fff", padding: "2px 6px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ background: "#0f172a", border: "1px solid #38bdf8", padding: "20px", borderRadius: "12px" }}>
                <h4 style={{ color: "#38bdf8", margin: "0 0 15px 0" }}>Client Active Session: {currentUserEmail}</h4>
                {availableDocs.map((doc) => {
                  const userReq = allRequests.find(r => r.userEmail === currentUserEmail && r.fileName === doc.fileName);
                  return (
                    <div key={doc.id} style={{ display: "flex", justifyContent: "space-between", margin: "12px 0", borderBottom: "1px solid #1e293b", paddingBottom: "8px" }}>
                      <span style={{ color: "#fff" }}>{doc.label}</span>
                      {!userReq ? (
                        <button onClick={() => { const newReq: RequestItem = { id: "req_" + Date.now(), userEmail: currentUserEmail, docLabel: doc.label, fileName: doc.fileName, status: "pending", timestamp: "2026" }; const updated = [newReq, ...allRequests]; setAllRequests(updated); localStorage.setItem("suraj_portfolio_db", JSON.stringify(updated)); }} style={{ background: "#1e293b", color: "#38bdf8", border: "1px solid #38bdf8", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>Request Access</button>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {userReq.status === "approved" ? (
                            <button onClick={() => window.open(`/Portfolio/${doc.fileName}`, "_blank")} style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}>View Document</button>
                          ) : (
                            <span style={{ color: userReq.status === "pending" ? "#eab308" : "#ef4444", fontSize: "12px" }}>
                              {userReq.status === "pending" ? "⏳ Pending Approval" : "❌ Access Deleted"}
                            </span>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "30px" }}>
          <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
            <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Public Data Modules</h5>
            <a href="/Portfolio/Introduction to SQL_certificate.pdf" target="_blank" rel="noreferrer" style={{ display: "block", marginBottom: "8px", color: "#38bdf8", textDecoration: "none" }}>SQL Structural Data <MdArrowOutward /></a>
            <a href="/Portfolio/Data Analytics with AI_certificate.pdf" target="_blank" rel="noreferrer" style={{ display: "block", color: "#38bdf8", textDecoration: "none" }}>Analytics Infrastructure <MdArrowOutward /></a>
          </div>
          <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
            <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Pithampur Center Matrix</h5>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Corporate Base: Pithampur, Madhya Pradesh</p>
          </div>
        </div>

        <div style={{ marginTop: "40px", borderTop: "1px solid #1e293b", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "13px", margin: 0, color: "#64748b" }}>System Platform Architecture by <span>Suraj Singh Jadon</span></h2>
          <h5 style={{ margin: 0, color: "#475569" }}><MdCopyright /> 2026</h5>
        </div>
      </div>
    </div>
  );
};

export default Contact;
