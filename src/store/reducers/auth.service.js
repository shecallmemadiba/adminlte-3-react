class AuthService {
  login(email, password) {
    return axios
      .post("http://mktiagoandre.ddns.net:8080/user/login", { email, password })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Unauthorized - Invalid user credentials
          throw new Error('Invalid email or password');
        } else {
          // Other error scenarios
          throw new Error('Failed to authenticate user');
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
