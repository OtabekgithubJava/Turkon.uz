import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { HelpCenterService } from 'app/modules/admin/apps/help-center/help-center.service';
import { Subject, takeUntil } from 'rxjs';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'help-center',
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, RouterLink, MatExpansionModule, NgFor],
})
export class HelpCenterComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject();
  
  // Carousel properties
  images = [
    'assets/image1.jpg',
    'assets/image2.jpg',
    'assets/image3.jpg',
    'assets/image4.jpg'
  ];
  currentSlide = 0;
  isTransitioning = false;

  /**
   * Constructor
   */
  constructor(private _helpCenterService: HelpCenterService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // Get the FAQs (example)
    this._helpCenterService.faqs$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((faqCategories) => {
        // Handle FAQ categories here
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Carousel methods
  // -----------------------------------------------------------------------------------------------------

  getTransform(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  nextSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    console.log("Slide set to:", index); 
    this.currentSlide = index;  
  }


  onTransitionEnd(): void {
    this.isTransitioning = false;
  }
}
