const USER_STORAGE_KEY = "lt_mock_users";

const DEFAULT_USERS = [
  {
    id: "user-1",
    email: "emiliano@gmail.com",
    username: "emiliano",
    password: "123Emiliano!",
    fullName: "Emiliano Sumerinde",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "nahuel@gmail.com",
    username: "nahuel",
    password: "123Nahuel!",
    fullName: "Nahuel Juarez",
    role: "usuario",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-3",
    email: "lucas@gmail.com",
    username: "lucas",
    password: "123Lucas!",
    fullName: "Lucas Guerrero",
    role: "usuario",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-4",
    email: "carlos@gmail.com",
    username: "carlos",
    password: "123Carlos!",
    fullName: "Carlos Sumerinde",
    role: "usuario",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-5",
    email: "abril@gmail.com",
    username: "abril",
    password: "123Abril!",
    fullName: "Abril Silvestro",
    role: "usuario",
    createdAt: new Date().toISOString(),
  },
];

let memoryUsers = [...DEFAULT_USERS];

const hasWindow = () => typeof window !== "undefined" && !!window.localStorage;

const readFromStorage = () => {
  if (!hasWindow()) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch (error) {
    console.warn("Error reading mock users from storage", error);
    return null;
  }
};

const writeToStorage = (users) => {
  memoryUsers = [...users];
  if (!hasWindow()) {
    return;
  }
  try {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn("Error writing mock users to storage", error);
  }
};

const ensureInitialized = () => {
  const stored = readFromStorage();
  if (stored && stored.length) {
    memoryUsers = [...stored];
  } else {
    writeToStorage(DEFAULT_USERS);
  }
};

ensureInitialized();

const normalize = (value = "") => value.trim().toLowerCase();

const findUserIndex = (predicate) => {
  ensureInitialized();
  return memoryUsers.findIndex(predicate);
};

export const getUsers = () => {
  ensureInitialized();
  return memoryUsers.map((user) => ({ ...user }));
};

export const findUserByIdentifier = (identifier) => {
  const normalized = normalize(identifier);
  if (!normalized) return null;
  return (
    getUsers().find(
      (user) =>
        normalize(user.email) === normalized ||
        normalize(user.username) === normalized
    ) || null
  );
};

export const authenticateUser = (identifier, password) => {
  const user = findUserByIdentifier(identifier);
  if (!user) return null;
  return user.password === password ? user : null;
};

export const isEmailTaken = (email) => {
  return (
    findUserIndex((user) => normalize(user.email) === normalize(email)) !== -1
  );
};

export const isUsernameTaken = (username) => {
  return (
    findUserIndex(
      (user) => normalize(user.username) === normalize(username)
    ) !== -1
  );
};

const generateId = () =>
  `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const addUser = (userData) => {
  const { email, username, password, fullName, role = "usuario" } = userData;

  if (!email || !username || !password || !fullName) {
    throw new Error("Missing required user fields");
  }

  if (isEmailTaken(email)) {
    throw new Error("EMAIL_TAKEN");
  }

  if (isUsernameTaken(username)) {
    throw new Error("USERNAME_TAKEN");
  }

  const newUser = {
    id: generateId(),
    email,
    username,
    password,
    fullName,
    role,
    createdAt: new Date().toISOString(),
  };

  const users = getUsers();
  users.push(newUser);
  writeToStorage(users);

  return newUser;
};

export const resetUsers = () => {
  writeToStorage(DEFAULT_USERS);
  return getUsers();
};

export const getInitials = (fullName) => {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return `${first}${second}`.toUpperCase();
};

export default {
  getUsers,
  addUser,
  authenticateUser,
  findUserByIdentifier,
  isEmailTaken,
  isUsernameTaken,
  resetUsers,
  getInitials,
};
