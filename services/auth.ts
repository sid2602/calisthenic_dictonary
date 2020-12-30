export const isBrowser = () => typeof window !== undefined;

export const setUser = (user: string) => {
  window.localStorage.setItem("DictonaryUser", JSON.stringify(user));
};

export const getUser = () => {
  const user = window.localStorage.getItem("DictonaryUser");

  return isBrowser && user ? JSON.parse(user) : {};
};

export const isLoggedIn = () => {
  const user = getUser();
  return user.jwt ? (user.jwt as string) : null;
};
