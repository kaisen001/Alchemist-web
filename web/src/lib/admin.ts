const KEY = "lqd_admin_session";

export type AdminSession = {
  role: "admin";
  signedInAt: string;
};

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function setAdminSession(session: AdminSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  localStorage.removeItem(KEY);
}
