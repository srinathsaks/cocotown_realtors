import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  @ViewChild('footerSection', { static: false }) footerSection!: ElementRef;


  images: string[] = [
    'assets/images/ramnuja2.jpg',
    'assets/images/ramnuja3.jpg',
    'assets/images/ramnuja1.jpg',
  ];

  currentImage: string = '';
  private imageIndex: number = 0;
  private intervalId: any;
  isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // Preload images to avoid rendering issues
    this.preloadImages().then(() => {
      this.currentImage = this.images[this.imageIndex];
      this.startSlideshow();
      this.isLoading = false; // Set loading to false once images are loaded
    });
  }

  preloadImages(): Promise<void> {
    const imagePromises = this.images.map(image => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(); 
      });
    });
    return Promise.all(imagePromises).then(() => {}); // Wait for all images to load
  }

  startSlideshow(): void {
    this.intervalId = setInterval(() => {
      this.imageIndex = (this.imageIndex + 1) % this.images.length;
      this.currentImage = this.images[this.imageIndex];
    }, 2000); // Change image every 2 seconds
  }

  scrollToFooter(): void {
    if(this.footerSection)
    this.footerSection.nativeElement.scrollIntoView({ behavior: 'smooth'});
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); 
    }
  }

}
