export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      // Check if the token is expired
      const isTokenExpired = /* Implement your token expiration check here */ false;
  
      if (!isTokenExpired) {
        return { Authorization: 'Bearer ' + user.token };
      }
    }
  
    // Return an empty object if the user or token is not available or if the token is expired
    return {};
  }
  

    // export default function authHeader() {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user && user.token) {
    //       return { Authorization: 'Bearer ' + user.token };
    //     } else {
    //       return {};
    //     }
    //   }
