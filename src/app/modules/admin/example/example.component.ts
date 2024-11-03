import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'example',
    standalone: true,
    templateUrl: './example.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent implements OnInit, OnDestroy {
    images = [
        'assets/image1.jpg',
        'assets/image2.jpg',
        'assets/image3.jpg',
        'assets/image4.jpg'
    ];
    currentSlide = 0;
    isTransitioning = false;
    private slideInterval: any;

    constructor() {}

    ngOnInit(): void {
        this.startAutoSlide(); // Start automatic sliding when the component initializes
    }

    ngOnDestroy(): void {
        this.stopAutoSlide(); // Clear the interval when the component is destroyed
    }

    private startAutoSlide(): void {
        this.slideInterval = setInterval(() => {
            this.nextSlide(); // Call nextSlide() every 3 seconds
        }, 3000); // Change slide every 3 seconds (3000 ms)
    }

    private stopAutoSlide(): void {
        if (this.slideInterval) {
            clearInterval(this.slideInterval); // Clear the interval
        }
    }

    nextSlide(): void {
        if (this.isTransitioning) return; // Prevent multiple transitions at once
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide + 1) % this.images.length; // Increment the slide index
    }

    prevSlide(): void {
        if (this.isTransitioning) return; // Prevent multiple transitions at once
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length; // Decrement the slide index
    }

    setSlide(index: number): void {
        if (this.isTransitioning) return; // Prevent multiple transitions at once
        this.isTransitioning = true;
        this.currentSlide = index; // Set the current slide index to the clicked thumbnail index
    }

    onTransitionEnd(): void {
        this.isTransitioning = false; // Allow new transitions
    }
}