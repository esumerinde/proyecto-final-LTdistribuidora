const CURRENT_USER_KEY = "lt_current_user";
const LOGGED_KEY = "isLoggedIn";

const hasWindow = () => typeof window !== "undefined" && !!window.localStorage;

export const setCurrentUser = (user) => {
  if (!user) return;
  if (!hasWindow()) {
    return;
  }
  try {
    const safeUser = { ...user };
    delete safeUser.password;
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    window.localStorage.setItem(LOGGED_KEY, "true");
  } catch (error) {
    console.warn("Could not persist current user", error);
  }
};

export const getCurrentUser = () => {
  if (!hasWindow()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Could not read current user", error);
    return null;
  }
};

export const clearCurrentUser = () => {
  if (!hasWindow()) {
    return;
  }
  try {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    window.localStorage.removeItem(LOGGED_KEY);
  } catch (error) {
    console.warn("Could not clear current user", error);
  }
};

export const isLoggedIn = () => {
  if (!hasWindow()) {
    return false;
  }
  return window.localStorage.getItem(LOGGED_KEY) === "true";
};

export default {
  setCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  isLoggedIn,
};
