import { Component, OnInit} from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  posts: any[] = [];
  title = '';
  content = '';
  editMode = false;
  postIdToEdit: number | null = null;

  constructor(private postService: PostService, private router: Router) {}

  async ngOnInit() {
    await this.fetchPosts();
  }

  async fetchPosts() {
    this.posts = await this.postService.getAllPosts();
  }

  async onAddOrUpdatePost() {
    if (this.editMode && this.postIdToEdit) {
      await this.postService.updatePost(this.postIdToEdit, this.title, this.content);
      this.editMode = false;
      this.postIdToEdit = null;
    } else {
      await this.postService.createPost(this.title, this.content);
    }
    this.title = '';
    this.content = '';
    await this.fetchPosts();
  }

  onEditPost(post: any) {
    this.editMode = true;
    this.title = post.title;
    this.content = post.content;
    this.postIdToEdit = post.postId; 
  }

  async onDeletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      console.log('eeee:', postId);
      await this.postService.deletePost(postId);
      await this.fetchPosts();
    }
  }

}
