const KEY = "lqd_client_session";

export type AccountKind = "portal" | "management";

export type ClientSession = {
  kind: AccountKind;
  name: string;
  username: string;
  phone?: string;
  phoneCode?: string;
  country: string;
  countryCode?: string;
  /** Management accounts only */
  broker?: string;
  accountBalance?: string;
  currency?: string;
  preferredAccount?: string;
  managementStatus?: "pending" | "reviewing" | "accepted" | "rejected";
  createdAt: string;
};

export function getSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ClientSession & { email?: string };
    if (!parsed.username && parsed.email) {
      parsed.username = parsed.email.split("@")[0] || parsed.email;
    }
    if (!parsed.kind) parsed.kind = "portal";
    return parsed;
  } catch {
    return null;
  }
}

export function setSession(session: ClientSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
