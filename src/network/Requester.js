import axios from "axios";

export default class Requester {

  constructor() {
    this.apidomain = "https://cit-631-nodejs.vercel.app";
  }

  async queryAllUsers(userId, email) {
    try { 
      let response = await axios.post(`${this.apidomain}/api/listusers`, {
        userId,
        email
      });
      return response.data;
    } catch (e) {
      console.log(e)
      return [];
    }
  }

  async register(email, password) {
    try {  
      let response = await axios.post(`${this.apidomain}/api/register`, {
        email: email,
        password: password
      });
      return response.data;
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async login(email, password) {
    try {  
      let response = await axios.get(`${this.apidomain}/api/login?email=${email}&password=${password}`);
      return response.data;
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async passwordReset(email, oldpassword, newpassword) {
    try {  
      let response = await axios.post(`${this.apidomain}/api/passwordreset`, {
        email: email,
        password: oldpassword,
        newpassword: newpassword
      });
      return response.data;
    } catch (e) {
      console.log(e)
      return {}
    }
  }

  async deleteUser(userId, email, deletingUserId) {
    try {  
      let response = await axios.post(`${this.apidomain}/api/deleteuser`, {
        userId: userId,
        email: email,
        deletingUserId: deletingUserId
      });
      return response.data;
    } catch (e) {
      console.log(e)
      return {}
    }
  }

}

