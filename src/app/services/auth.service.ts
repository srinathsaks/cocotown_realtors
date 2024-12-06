import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  async register(username: string, password: string) {
    const response = await axios.post(`${this.baseUrl}/register`, {
      username,
      password,
    });
    return response.data;
  }

  async login(username: string, password: string) {
    const response = await axios.post(`${this.baseUrl}/login`, {
      username,
      password,
    });
    return response.data;
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
