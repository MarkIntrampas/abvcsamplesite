import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/dashstyle.css'

type DataRow = {
  type: string;
  count?: number;
  total?: number;
  lastHour?: number;
  today?: number;
  [key: string]: string | number | undefined;
};

type TabKey = "home" | "analytics" | "blogs" | "users" | "settings";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [clock, setClock] = useState("00:00:00");
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState(false);
  const [tableRows, setTableRows] = useState<DataRow[]>([]);
  const [username,setUsername] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const navigate =useNavigate();
  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    
const storedUser = sessionStorage.getItem("user");

  if (!storedUser) {
    navigate("/");
    return;
  }

  const user = JSON.parse(storedUser);

  if (!user.isLoggedIn) {
    navigate("/");
    return;
  }
  
  setUsername(user.username);
  console.log("Logged in as:", user.username);

  loadTableData();

    loadTableData();
  }, []);


  const logout = () => {
  sessionStorage.removeItem("user"); // remove session
  navigate("/"); // go back to login page
};

  const breadcrumbs: Record<TabKey, string> = {
    home: "HOME",
    analytics: "ANALYTICS",
    blogs: "BLOGS",
    users: "USERS",
    settings: "SETTINGS",
  };

  const getSampleData = (): DataRow[] => [
    { type: "UBL Invoice", count: 4821, lastHour: 312, today: 1240 },
    { type: "Credit Note", count: 1034, lastHour: 78, today: 312 },
    { type: "Debit Note", count: 523, lastHour: 41, today: 168 },
    { type: "Order", count: 987, lastHour: 64, today: 295 },
    { type: "Reminder", count: 310, lastHour: 22, today: 94 },
    { type: "Statement", count: 215, lastHour: 15, today: 61 },
  ];

  const normalizeRows = (data: unknown): DataRow[] => {
    if (Array.isArray(data)) return data as DataRow[];

    if (data && typeof data === "object") {
      return Object.entries(data as Record<string, unknown>).map(([k, v]) =>
        typeof v === "object" && v !== null
          ? ({ type: k, ...(v as Record<string, unknown>) } as DataRow)
          : ({ type: k, count: Number(v) || 0 } as DataRow)
      );
    }

    return [];
  };

  const loadTableData = async () => {
    setTableLoading(true);
    setTableError(false);

    try {
      // IMPORTANT:
      // Replace this with your own secure backend endpoint.
      // DO NOT expose secret API keys in frontend code.
      const res = await fetch("/api/data-entry-counter");

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const rows = normalizeRows(data);
      setTableRows(rows);
    } catch {
      setTableError(true);
      setTableRows(getSampleData());
    } finally {
      setTableLoading(false);
    }
  };

  const getNum = (row: DataRow) => {
    return (
      Number(
        row.count ??
          row.total ??
          Object.values(row).find((v) => typeof v === "number")
      ) || 0
    );
  };

  const total = useMemo(
    () => tableRows.reduce((sum, row) => sum + getNum(row), 0),
    [tableRows]
  );

  const elapsedHours = useMemo(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 || 1;
  }, [clock]);

  const statTotal = total.toLocaleString();
  const statEod = Math.round((total / elapsedHours) * 24).toLocaleString();
  const statLastHour = Math.round(total / elapsedHours).toLocaleString();

  const homeChartData = useMemo(() => {
    const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
    const vals = hours.map(() => Math.random() * 0.9 + 0.1);
    const max = Math.max(...vals);

    return hours.map((hour, i) => {
      const pct = (vals[i] / max) * 100;
      const est = Math.round(vals[i] * ((total || 1000) / hours.length) * 1.8);

      return {
        hour,
        pct,
        est,
      };
    });
  }, [total]);

  const analyticsChartData = [
    { day: "MON", val: 65 },
    { day: "TUE", val: 78 },
    { day: "WED", val: 82 },
    { day: "THU", val: 91 },
    { day: "FRI", val: 100 },
    { day: "SAT", val: 55 },
    { day: "SUN", val: 42 },
  ];

  const renderTable = () => {
    if (tableLoading) {
      return (
        <div className="loading-state">
          <div>FETCHING DATA...</div>
          <div className="loading-bar" />
        </div>
      );
    }

    if (!tableRows.length) {
      return (
        <div className="error-state">
          <div className="err-text">NO DATA</div>
        </div>
      );
    }

    const keys = Object.keys(tableRows[0]);

    return (
      <>
        {tableError && (
          <div className="error-state" style={{ paddingBottom: 16 }}>
            <div className="err-icon">⚠</div>
            <div className="err-text">
              CORS / NETWORK RESTRICTION
              <br />
              Showing sample data for layout preview.
            </div>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              {keys.map((key) => (
                <th key={key}>{key.replace(/_/g, " ").toUpperCase()}</th>
              ))}
              <th>SHARE</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, idx) => (
              <tr key={`${row.type}-${idx}`}>
                {keys.map((key, i) => {
                  const value = row[key];

                  if (i === 0) return <td key={key}>{String(value)}</td>;

                  if (typeof value === "number") {
                    return (
                      <td key={key} className="num">
                        {value.toLocaleString()}
                      </td>
                    );
                  }

                  return (
                    <td key={key} className="mono">
                      {String(value ?? "")}
                    </td>
                  );
                })}

                <td>
                  <span className="badge badge-pink">
                    {total ? Math.round((getNum(row) / total) * 100) : 0}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
   

      <div className="dashboard-root">
        {/* Sidebar */}
        <div id="sidebar">
          <div className="sb-logo">
            <div className="sb-logo-icon">AB</div>
            <div className="sb-logo-text">
              <div className="brand">ALE BOSMA</div>
              <div className="sub">DASHBOARD</div>
            </div>
          </div>

          <div className="sb-section-label">Main</div>
          <div
            className={`dash-nav-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <span className="nav-icon">⌂</span> Home
          </div>
          <div
            className={`dash-nav-item ${activeTab === "analytics" ? "active" : ""}`}
            onClick={() => setActiveTab("analytics")}
          >
            <span className="nav-icon">◎</span> Analytics
          </div>

          <div className="sb-section-label">Content</div>
          <div
            className={`dash-nav-item ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => setActiveTab("blogs")}
          >
            <span className="nav-icon">✎</span> Blogs <span className="nav-badge">3</span>
          </div>

          <div className="sb-section-label">Admin</div>
          <div
            className={`dash-nav-item ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <span className="nav-icon">◉</span> Users
          </div>
          <div
            className={`dash-nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <span className="nav-icon">◈</span> Settings
          </div>

          <div className="sb-footer">
            <div>
              <span className="status-dot" />
              SYSTEM ONLINE
            </div>
            <div style={{ marginTop: 4, color: "rgba(255,255,255,0.3)" }}>v2.4.1 · GO2UBL</div>
          </div>
        </div>

        {/* Main */}
        <div id="main">
          <div id="topbar">
            <div className="breadcrumb">
              ALE BOSMA / <span>{breadcrumbs[activeTab]}</span>
            </div>

            <div className="topbar-right">
              <div className="topbar-clock">{clock}</div>
              <button className="topbar-btn" onClick={loadTableData}>
                ↻
              </button>
              <button className="topbar-btn">🔔</button>
              <div className="user-pill" onClick={()=>logout()}>
                <div className="user-avatar">A</div>
                <div className="user-name" >{username}</div>
              </div>
            </div>
          </div>

          <div id="content">
            {/* HOME */}
            {activeTab === "home" && (
              <>
                <div className="page-title">
                  <div className="page-title-bar" />
                  <div>
                    <div className="label">// OVERVIEW</div>
                    <h1>DATA ENTRY MONITOR</h1>
                  </div>
                </div>

                <div className="mini-stats">
                  <div className="mini-stat">
                    <div className="mini-stat-label">Total Processed</div>
                    <div className="mini-stat-val">{statTotal}</div>
                    <div className="mini-stat-sub">All-time entries</div>
                    <div className="mini-stat-trend">↑ LIVE</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-label">Est. End of Day</div>
                    <div className="mini-stat-val">{statEod}</div>
                    <div className="mini-stat-sub">Projected by 23:59</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-label">Last Hour</div>
                    <div className="mini-stat-val">{statLastHour}</div>
                    <div className="mini-stat-sub">Recent throughput</div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-title">◆ LIVE DATA ENTRY TYPE COUNTER</div>
                    <button className="card-action" onClick={loadTableData}>
                      ↻ REFRESH
                    </button>
                  </div>
                  <div>{renderTable()}</div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-title">◆ HOURLY ACTIVITY ESTIMATE</div>
                  </div>
                  <div className="chart-area">
                    {homeChartData.map((item, i) => (
                      <div
                        key={`${item.hour}-${i}`}
                        className="bar-wrap"
                        title={`${item.hour}:00 — ~${item.est} entries`}
                      >
                        <div
                          className="bar"
                          style={{
                            height: `${item.pct}%`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                        <div className="bar-label">{item.hour}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ANALYTICS */}
            {activeTab === "analytics" && (
              <>
                <div className="page-title">
                  <div className="page-title-bar" />
                  <div>
                    <div className="label">// DEEP DIVE</div>
                    <h1>ANALYTICS</h1>
                  </div>
                </div>

                <div className="mini-stats">
                  <div className="mini-stat">
                    <div className="mini-stat-label">Avg Daily Volume</div>
                    <div className="mini-stat-val">3,241</div>
                    <div className="mini-stat-sub">Last 30 days</div>
                    <div className="mini-stat-trend">↑ 12%</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-label">Accuracy Rate</div>
                    <div className="mini-stat-val">99.2%</div>
                    <div className="mini-stat-sub">Data validation pass</div>
                    <div className="mini-stat-trend">↑ 0.4%</div>
                  </div>
                  <div className="mini-stat">
                    <div className="mini-stat-label">SLA Compliance</div>
                    <div className="mini-stat-val">97.8%</div>
                    <div className="mini-stat-sub">On-time delivery</div>
                    <div className="mini-stat-trend">↑ 2.1%</div>
                  </div>
                </div>

                <div className="analytics-grid">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">◆ VOLUME TREND — 7 DAYS</div>
                    </div>
                    <div className="chart-area">
                      {analyticsChartData.map((item, i) => (
                        <div key={item.day} className="bar-wrap">
                          <div
                            className="bar"
                            style={{
                              height: `${item.val}%`,
                              animationDelay: `${i * 0.07}s`,
                            }}
                          />
                          <div className="bar-label">{item.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">◆ TYPE DISTRIBUTION</div>
                    </div>
                    <div className="donut-wrap">
                      <svg width="110" height="110" viewBox="0 0 110 110">
                        <circle cx="55" cy="55" r="42" fill="none" stroke="#fce8f0" strokeWidth="18" />
                        <circle
                          cx="55"
                          cy="55"
                          r="42"
                          fill="none"
                          stroke="#E91F68"
                          strokeWidth="18"
                          strokeDasharray="158 106"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                          transform="rotate(-90 55 55)"
                        />
                        <circle
                          cx="55"
                          cy="55"
                          r="42"
                          fill="none"
                          stroke="#FFD600"
                          strokeWidth="18"
                          strokeDasharray="66 198"
                          strokeDashoffset="-158"
                          strokeLinecap="round"
                          transform="rotate(-90 55 55)"
                        />
                        <circle
                          cx="55"
                          cy="55"
                          r="42"
                          fill="none"
                          stroke="#00c97a"
                          strokeWidth="18"
                          strokeDasharray="40 224"
                          strokeDashoffset="-224"
                          strokeLinecap="round"
                          transform="rotate(-90 55 55)"
                        />
                        <text
                          x="55"
                          y="60"
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="900"
                          fill="#E91F68"
                        >
                          100%
                        </text>
                      </svg>

                      <div>
                        <div className="legend-item">
                          <div className="legend-dot" style={{ background: "#E91F68" }} />
                          Data Entry — 60%
                        </div>
                        <div className="legend-item">
                          <div className="legend-dot" style={{ background: "#FFD600" }} />
                          Bookkeeping — 25%
                        </div>
                        <div className="legend-item">
                          <div className="legend-dot" style={{ background: "#00c97a" }} />
                          Other — 15%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* BLOGS */}
            {activeTab === "blogs" && (
              <>
                <div className="page-title">
                  <div className="page-title-bar" />
                  <div>
                    <div className="label">// CONTENT MANAGEMENT</div>
                    <h1>BLOGS</h1>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                  <button
                    className="btn-sm primary"
                    style={{ padding: "8px 20px", fontSize: 10, borderRadius: 6 }}
                  >
                    + NEW POST
                  </button>
                </div>

                <div className="blog-grid">
                  {[
                    {
                      emoji: "📊",
                      cat: "Data Entry",
                      title: "How Accurate Data Entry Drives Business Growth",
                      meta: "APR 01 · 2026 · 5 MIN READ",
                    },
                    {
                      emoji: "📒",
                      cat: "Bookkeeping",
                      title: "Why European SMEs Trust Remote Bookkeepers",
                      meta: "MAR 21 · 2026 · 4 MIN READ",
                    },
                    {
                      emoji: "🌐",
                      cat: "Company",
                      title: "Ale Bosma Ventures: Bridging PH Talent to EU",
                      meta: "MAR 10 · 2026 · 6 MIN READ",
                    },
                  ].map((blog) => (
                    <div className="blog-card" key={blog.title}>
                      <div className="blog-thumb">{blog.emoji}</div>
                      <div className="blog-body">
                        <div className="blog-cat">{blog.cat}</div>
                        <div className="blog-title">{blog.title}</div>
                        <div className="blog-meta">{blog.meta}</div>
                      </div>
                      <div className="blog-actions">
                        <button className="btn-sm primary">EDIT</button>
                        <button className="btn-sm">VIEW</button>
                        <button className="btn-sm">DELETE</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* USERS */}
            {activeTab === "users" && (
              <>
                <div className="page-title">
                  <div className="page-title-bar" />
                  <div>
                    <div className="label">// TEAM MANAGEMENT</div>
                    <h1>USERS</h1>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 10, color: "var(--gray)", letterSpacing: 2 }}>
                    SHOWING 6 OF 12 USERS
                  </div>
                  <button
                    className="btn-sm primary"
                    style={{ padding: "8px 20px", fontSize: 10, borderRadius: 6 }}
                  >
                    + ADD USER
                  </button>
                </div>

                <div className="card">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Last Active</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["MR", "Maria Reyes", "DATA ENCODER", "DATA ENTRY", "ACTIVE", "2026-04-07"],
                        ["JD", "Juan Dela Cruz", "BOOKKEEPER", "FINANCE", "ACTIVE", "2026-04-07"],
                        ["AS", "Ana Santos", "TEAM LEAD", "OPERATIONS", "AWAY", "2026-04-06"],
                        ["BL", "Ben Lim", "DATA ENCODER", "DATA ENTRY", "OFFLINE", "2026-04-05"],
                        ["CG", "Carla Garcia", "BOOKKEEPER", "FINANCE", "ACTIVE", "2026-04-07"],
                        ["AB", "Admin Bosma", "ADMIN", "MANAGEMENT", "ACTIVE", "2026-04-07"],
                      ].map(([initials, name, role, dept, status, lastActive]) => (
                        <tr key={name}>
                          <td>
                            <span className="user-row-avatar">{initials}</span>
                            {name}
                          </td>
                          <td className="mono">{role}</td>
                          <td className="mono">{dept}</td>
                          <td>
                            <span
                              className={`badge ${
                                status === "ACTIVE"
                                  ? "badge-green"
                                  : status === "AWAY"
                                  ? "badge-yellow"
                                  : "badge-outline"
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td className="mono">{lastActive}</td>
                          <td>
                            <button className={status === "ACTIVE" ? "btn-sm primary" : "btn-sm"}>
                              EDIT
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* SETTINGS */}
            {activeTab === "settings" && (
              <>
                <div className="page-title">
                  <div className="page-title-bar" />
                  <div>
                    <div className="label">// CONFIGURATION</div>
                    <h1>SETTINGS</h1>
                  </div>
                </div>

                <div className="settings-grid">
                  <div className="card" style={{ height: "fit-content" }}>
                    <div className="card-header">
                      <div className="card-title">◆ MENU</div>
                    </div>
                    <div style={{ padding: "8px 0" }}>
                      <div
                        style={{
                          padding: "12px 20px",
                          color: "var(--pink)",
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: 1.5,
                          background: "var(--pink-pale)",
                          borderLeft: "3px solid var(--pink)",
                          cursor: "pointer",
                        }}
                      >
                        ◈ General
                      </div>
                      {["◉ API Keys", "◆ Notifications", "◈ Security", "◎ About"].map((item) => (
                        <div
                          key={item}
                          style={{
                            padding: "12px 20px",
                            color: "var(--gray)",
                            fontSize: 13,
                            fontWeight: 600,
                            letterSpacing: 1.5,
                            cursor: "pointer",
                            borderBottom: "1px solid rgba(233,31,104,0.08)",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">◆ GENERAL SETTINGS</div>
                    </div>

                    <div className="settings-field">
                      <div className="settings-label">Company Name</div>
                      <div className="settings-desc">Displayed across dashboard and reports.</div>
                      <input
                        className="settings-input"
                        type="text"
                        defaultValue="Ale Bosma Ventures Corporation"
                      />
                    </div>

                    <div className="settings-field">
                      <div className="settings-label">Data API Key</div>
                      <div className="settings-desc">Store this in backend env, not frontend.</div>
                      <input
                        className="settings-input"
                        type="password"
                        defaultValue="••••••••••••••••••••••••••••••"
                      />
                    </div>

                    <div className="settings-field">
                      <div className="settings-label">Refresh Interval (seconds)</div>
                      <div className="settings-desc">Auto-refresh interval for the home table.</div>
                      <input
                        className="settings-input"
                        type="number"
                        defaultValue={60}
                        style={{ maxWidth: 120 }}
                      />
                    </div>

                    <div
                      className="settings-field"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div className="settings-label">Dark Mode</div>
                        <div className="settings-desc" style={{ marginBottom: 0 }}>
                          Use dark theme across dashboard.
                        </div>
                      </div>
                      <button
                        className={`toggle ${darkMode ? "on" : ""}`}
                        onClick={() => setDarkMode((prev) => !prev)}
                      />
                    </div>

                    <div
                      className="settings-field"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div className="settings-label">Email Notifications</div>
                        <div className="settings-desc" style={{ marginBottom: 0 }}>
                          Send daily digest reports via email.
                        </div>
                      </div>
                      <button
                        className={`toggle ${emailNotifications ? "on" : ""}`}
                        onClick={() => setEmailNotifications((prev) => !prev)}
                      />
                    </div>

                    <div style={{ padding: 20 }}>
                      <button
                        className="btn-sm primary"
                        style={{ padding: "8px 24px", fontSize: 10, borderRadius: 6 }}
                      >
                        SAVE CHANGES
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
