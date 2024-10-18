import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contact = {
    name: '',
    email: '',
    message: ''
  };


  constructor() {}

  onSubmit(): void {
    console.log('Form submitted:', this.contact);
    alert('Thank you for your message! We will get back to you soon.');
    
    this.contact = {
      name: '',
      email: '',
      message: ''
    };
  }

}
