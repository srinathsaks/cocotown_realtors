import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('footerSection', { static: false }) footerSection!: ElementRef;

  images: string[] = [
    'assets/images/prestige1.jpg',
    'assets/images/prestige2.jpg',
    'assets/images/prestige3.jpg',
  ];

  currentImage: string = '';
  private imageIndex: number = 0;
  private intervalId: any;
  isLoading: boolean = true;
  isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Preload images to avoid rendering issues in browser only
      this.preloadImages().then(() => {
        this.currentImage = this.images[this.imageIndex];
        this.startSlideshow();
        this.isLoading = false; // Set loading to false once images are loaded
      });
    }
  }

  preloadImages(): Promise<void> {
    const imagePromises = this.images.map(image => {
      return new Promise<void>((resolve) => {
        if (this.isBrowser) {
          const img = new Image(); // Use Image constructor only in the browser
          img.src = image;
          img.onload = () => resolve(); 
        } else {
          resolve(); 
        }
      });
    });
    return Promise.all(imagePromises).then(() => { });
  }

  startSlideshow(): void {
    if (this.isBrowser) {
      this.intervalId = setInterval(() => {
        this.imageIndex = (this.imageIndex + 1) % this.images.length;
        this.currentImage = this.images[this.imageIndex];
      }, 2000); 
    }
  }

  scrollToFooter(): void {
    if (this.footerSection && this.isBrowser) {
      this.footerSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId && this.isBrowser) {
      clearInterval(this.intervalId); 
    }
  }

}

