import moment from "moment";

export const SaveToken = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const IsLogged = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && !moment(user.expiresAt).isAfter(moment())) {
      localStorage.setItem("user", {});
      return false;
    }
    return !!user;
  } catch (e) {
    localStorage.removeItem("user");
    return false;
  }
};

export const getUserToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.codToken;
  } catch (e) {
    localStorage.removeItem("user");
    return null;
  }
};

export const getCurrentUser = () => {
  if (IsLogged()) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return null;
};
