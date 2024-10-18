import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {

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
  isBrowser: boolean = false; // To track if the platform is browser

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in browser
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Preload images only in the browser
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
          img.onload = () => resolve(); // Resolve promise once image is loaded
        } else {
          resolve(); // Resolve immediately in SSR (skip image preloading in server)
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
      }, 2000); // Change image every 2 seconds
    }
  }

  scrollToFooter(): void {
    if (this.footerSection && this.isBrowser) {
      this.footerSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId && this.isBrowser) {
      clearInterval(this.intervalId); // Clear the interval when the component is destroyed
    }
  }

}

