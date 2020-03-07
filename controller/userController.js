import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    //status code http를 확인해보자
    //이런 오류에 해당하는 code가 400
    res.render("join", { pageTitle: "Join" });
  } else {
    //To Do: Register User 사용자 등록해야 함.
    //To Do: Log user in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  // db의 데이터와 확인 시켜야함.
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // 로그아웃 시키는 작업 해야함
  res.render(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
