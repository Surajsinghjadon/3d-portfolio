import { useState, useEffect } from "react";
import { MdArrowOutward, MdCopyright, MdLock, MdCheckCircle, MdHourglassTop, MdCancel, MdLogin, MdLogout, MdAdminPanelSettings, MdPerson } from "react-icons/md";
import "./styles/Contact.css";

// Structural Definitions
type RequestItem = {
  id: string;
  userEmail: string;
  docLabel: string;
  fileName: string;
  status: "approved" | "pending" | "deleted";
  timestamp: string;
};

const Contact = () => {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [loginInput, setLoginInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Database State (Initialized from localStorage for persistence)
  const [allRequests, setAllRequests] = useState<RequestItem[]>([]);

  // Fixed Document Array available for users
  const availableDocs = [
    { id: "dca", label: "Diploma in Computer Applications (DCA)", fileName: "dca_diploma.pdf" },
    { id: "m12", label: "12th Grade Marksheet", fileName: "12th_marksheet.pdf" },
    { id: "m10", label: "10th Grade Marksheet", fileName: "10th_marksheet.pdf" },
  ];

  // Load database on mount
  useEffect(() => {
    const savedRequests = localStorage.getItem("suraj_portfolio_db");
    if (savedRequests) {
      setAllRequests(JSON.parse(savedRequests));
    } else {
      // Seed dummy requests for initial visual validation
      const dummyData: RequestItem[] = [
        { id: "req_1", userEmail: "tata_recruiter@tata.com", docLabel: "Diploma in Computer Applications (DCA)", fileName: "dca_diploma.pdf", status: "pending", timestamp: "24/06/2026" },
        { id: "req_2", userEmail: "reliance_hr@jio.com", docLabel: "12th Grade Marksheet", fileName: "12th_marksheet.pdf", status: "approved", timestamp: "23/06/2026" }
      ];
      setAllRequests(dummyData);
      localStorage.setItem("suraj_portfolio_db", JSON.stringify(dummyData));
    }
  }, []);

  // Save to database helper
  const saveToDB = (updatedList: RequestItem[]) => {
    setAllRequests(updatedList);
    localStorage.setItem("suraj_portfolio_db", JSON.stringify(updatedList));
  };

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput.trim()) return;

    const email = loginInput.trim().toLowerCase();
    setCurrentUserEmail(email);
    setIsLoggedIn(true);

    if (email === "surajsinghrajput5040@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  // Logout Logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail("");
    setLoginInput("");
    setIsAdmin(false);
  };

  // Recruiter Action: Request Access Token
  const raiseAccessRequest = (docLabel: string, fileName: string) => {
    // Check if request already exists
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
    alert(`🚀 Request for ${docLabel} sent to Suraj Bhaiya's account! Check status below.`);
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
        
        {/* Header Bar with Session Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "15px", marginBottom: "25px" }}>
          <h3 style={{ margin: 0, color: "#fff" }}>🔒 Secure Documents Portal</h3>
          {isLoggedIn && (
            <button onClick={handleLogout} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <MdLogout /> Logout
            </button>
          )}
        </div>

        {/* ----------------- PHASE 1: LOGIN PORTAL ----------------- */}
        {!isLoggedIn ? (
          <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
            <MdLock size={40} color="#38bdf8" />
            <h4 style={{ color: "#fff", marginTop: "12px", marginBottom: "6px", fontSize: "18px" }}>Account Authentication</h4>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 20px 0" }}>Enter email to view certificates or request corporate documents.</p>
            
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input 
                type="email" 
                value={loginInput} 
                onChange={(e) => setLoginInput(e.target.value)} 
                placeholder="Enter your Email Address" 
                required 
                style={{ width: "100%", background: "#1e293b", border: "1px solid #334155", padding: "10px", borderRadius: "6px", color: "#fff", textAlign: "center" }}
              />
              <button type="submit" style={{ background: "#0284c7", color: "#fff", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "600", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                <MdLogin /> Authenticate & Access
              </button>
            </form>
            <p style={{ fontSize: "11px", color: "#64748b", marginTop: "15px", margin: "15px 0 0 0" }}>Tip: Admin uses master identity credentials for pipeline clearance.</p>
          </div>
        ) : (
          /* ----------------- PHASE 2: AUTHENTICATED SYSTEM PANEL ----------------- */
          <div>
            
            {/* ADMIN DASHBOARD - ONLY VISIBLE TO SURAJ */}
            {isAdmin ? (
              <div style={{ background: "#0f172a", border: "1px solid #eab308", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", color: "#eab308" }}>
                  <MdAdminPanelSettings size={24} />
                  <h4 style={{ margin: 0, fontSize: "16px" }}>Master Admin Request Hub — surajsinghrajput5040@gmail.com</h4>
                </div>
                
                {allRequests.length === 0 ? (
                  <p style={{ color: "#94a3b8", fontSize: "13px" }}>No active user requests found inside database pipelines.</p>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #334155", color: "#94a3b8" }}>
                          <th style={{ padding: "8px" }}>User Email</th>
                          <th style={{ padding: "8px" }}>Requested File</th>
                          <th style={{ padding: "8px" }}>Date</th>
                          <th style={{ padding: "8px" }}>Current Status</th>
                          <th style={{ padding: "8px" }}>Action Controls</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allRequests.map((req) => (
                          <tr key={req.id} style={{ borderBottom: "1px solid #1e293b" }}>
                            <td style={{ padding: "10px", color: "#38bdf8" }}>{req.userEmail}</td>
                            <td style={{ padding: "10px", color: "#fff" }}>{req.docLabel}</td>
                            <td style={{ padding: "10px", color: "#64748b" }}>{req.timestamp}</td>
                            <td style={{ padding: "10px" }}>
                              {req.status === "approved" && <span style={{ color: "#22c55e" }}>● Approved</span>}
                              {req.status === "pending" && <span style={{ color: "#eab308" }}>● Pending</span>}
                              {req.status === "deleted" && <span style={{ color: "#ef4444" }}>● Revoked</span>}
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
                )}
              </div>
            ) : (
              /* RECRUITER / NORMAL CLIENT DASHBOARD */
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "25px", marginBottom: "30px" }}>
                <div style={{ background: "#0f172a", border: "1px solid #38bdf8", padding: "20px", borderRadius: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px", color: "#38bdf8" }}>
                    <MdPerson size={22} />
                    <h4 style={{ margin: 0, fontSize: "15px" }}>Recruiter Console: {currentUserEmail}</h4>
                  </div>
                  
                  <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: 0, marginBottom: "20px" }}>Click on any secure document node below to raise an official clearance request to Suraj Bhaiya.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {availableDocs.map((doc) => {
                      // Find current user's request status for this specific file
                      const userReq = allRequests.find(r => r.userEmail === currentUserEmail && r.fileName === doc.fileName);
                      
                      return (
                        <div key={doc.id} style={{ borderBottom: "1px solid #1e293b", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                          <div>
                            <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#f8fafc" }}>{doc.label}</p>
                            <span style={{ fontSize: "11px", color: "#64748b" }}>Protected Node Verification File</span>
                          </div>
                          
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {!userReq ? (
                              <button 
                                onClick={() => raiseAccessRequest(doc.label, doc.fileName)}
                                style={{ background: "#1e293b", color: "#38bdf8", border: "1px solid #38bdf8", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}
                              >
                                Send Access Request
                              </button>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                {userReq.status === "approved" && (
                                  <button 
                                    onClick={() => openDocument(doc.fileName, "approved")}
                                    style={{ background: "#22c55e", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}
                                  >
                                    Download / View File
                                  </button>
                                )}
                                {userReq.status === "pending" && <span style={{ color: "#eab308", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}><MdHourglassTop /> Request Pending</span>}
                                {userReq.status === "deleted" && <span style={{ color: "#ef4444", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}><MdCancel /> Access Revoked</span>}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Public Verified Information Grid Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
              <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Public Training Badges</h5>
                <a href="/Introduction to SQL_certificate.pdf" target="_blank" rel="noreferrer" className="contact-social" style={{ display: "block", marginBottom: "8px", color: "#38bdf8" }}>SQL Course Node <MdArrowOutward /></a>
                <a href="/Data Analytics with AI_certificate.pdf" target="_blank" rel="noreferrer" className="contact-social" style={{ display: "block", color: "#38bdf8" }}>Data Analytics AI Certificate <MdArrowOutward /></a>
              </div>
              <div style={{ background: "#111827", padding: "15px", borderRadius: "8px" }}>
                <h5 style={{ margin: "0 0 10px 0", color: "#94a3b8" }}>Corporate Verification Matrix</h5>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Phone: +91 78795 95821</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Location: Pithampur Industrial Area, MP</p>
              </div>
            </div>

          </div>
        )}

        {/* Footer Area */}
        <div style={{ marginTop: "40px", borderTop: "1px solid #1e293b", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "13px", margin: 0, color: "#64748b" }}>System Platform Architecture by <span>Suraj Singh Jadon</span></h2>
          <h5 style={{ margin: 0, display: "flex", alignItems: "center", gap: "4px", color: "#475569" }}><MdCopyright /> 2026</h5>
        </div>

      </div>
    </div>
  );
};

export default Contact;
