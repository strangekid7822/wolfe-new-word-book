// Simple localStorage-backed leaderboard service scoped by libraryId.
// Swappable with a real backend later without touching components.
//
// Design goals:
// - Keep API Promise-free for now (synchronous localStorage) but pure functions
//   so we can drop-in replace with async HTTP later.
// - Scope data per libraryId so each course has its own leaderboard.

const STORAGE_PREFIX = 'leaderboard:';
const USER_KEY = 'leaderboard:user';

/**
 * Build storage key for a library scope.
 * @param {string} libraryId
 */
function getLibraryKey(libraryId) {
  return `${STORAGE_PREFIX}${libraryId || 'default'}`;
}

/** Load a JSON array from localStorage */
function loadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save a JSON array to localStorage */
function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

/** Deterministic color for avatars based on userId */
function hashToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;
  return `rgb(${(r % 160) + 60}, ${(g % 160) + 60}, ${(b % 160) + 60})`;
}

/** Initials from display name for avatar fallback */
function initialsFromName(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Get persisted user identity or create a random one on first run */
function getOrCreateUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const userId = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const name = `Learner ${Math.floor(1000 + Math.random() * 9000)}`;
  const user = { userId, name };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

/**
 * Submit a score to the leaderboard, keeping the best score per user.
 * @param {{libraryId: string, score: number, finishedCount: number, accuracyPct: number}} params
 * @returns {{rank:number,total:number,user:object}}
 */
function submitScore({ libraryId, score, finishedCount, accuracyPct }) {
  const { userId, name } = getOrCreateUser();
  const key = getLibraryKey(libraryId);
  const list = loadArray(key);

  const now = Date.now();
  const idx = list.findIndex((e) => e.userId === userId);
  const entry = { userId, name, score, finishedCount, accuracyPct, updatedAt: now };

  if (idx >= 0) {
    // Keep the best score; if tie, keep latest.
    const prev = list[idx];
    if (score > prev.score || (score === prev.score && now > (prev.updatedAt || 0))) {
      list[idx] = { ...prev, ...entry };
    }
  } else {
    list.push(entry);
  }

  // Sort by score desc, then updatedAt desc
  list.sort((a, b) => (b.score - a.score) || ((b.updatedAt || 0) - (a.updatedAt || 0)));
  saveArray(key, list);

  const rank = list.findIndex((e) => e.userId === userId) + 1;
  return { rank, total: list.length, user: { ...entry } };
}

/** Get the top N entries for a library (sorted by best score) */
function getTopN(libraryId, n = 3) {
  const key = getLibraryKey(libraryId);
  const list = loadArray(key);
  return list.slice(0, n);
}

/** Get current user's rank and total participants in the library */
function getUserRank(libraryId) {
  const { userId } = getOrCreateUser();
  const key = getLibraryKey(libraryId);
  const list = loadArray(key);
  const idx = list.findIndex((e) => e.userId === userId);
  return { rank: idx >= 0 ? idx + 1 : null, total: list.length, user: idx >= 0 ? list[idx] : null };
}

/** Build an international rank line in Chinese like "你的世界排名进入前X%" */
function getIntlRankText(rank, total) {
  if (!rank || !total) return '暂无排名';
  const pct = Math.max(1, Math.ceil((rank / total) * 100));
  return `你的世界排名进入前${pct}%`;
}

export default {
  getOrCreateUser,
  submitScore,
  getTopN,
  getUserRank,
  getIntlRankText,
  hashToColor,
  initialsFromName,
};
