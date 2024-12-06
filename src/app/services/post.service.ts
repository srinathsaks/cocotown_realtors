import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private baseUrl = 'http://localhost:3000/api';

  async getAllPosts() {
    const response = await axios.get(`${this.baseUrl}/posts`);
    return response.data;
  }

  async createPost(title: string, content: string) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token is missing');
    const response = await axios.post(
      `${this.baseUrl}/posts`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  async updatePost(postId: number, title: string, content: string) {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${this.baseUrl}/posts/${postId}`,
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }

  async deletePost(postId: number) {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token is missing');
  
    try {
      const response = await axios.delete(`${this.baseUrl}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting post:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      throw error; 
    }
  }
  
}
