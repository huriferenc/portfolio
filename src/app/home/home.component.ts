import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import { IntersectionObserverService } from './intersection-observer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('intro', { read: ElementRef }) intro: ElementRef;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef;
  @ViewChild('skills', { read: ElementRef }) skills: ElementRef;
  @ViewChild('references', { read: ElementRef }) references: ElementRef;

  private onDestroy$ = new Subject<void>();

  constructor(private intersectionObserver: IntersectionObserverService) {}

  ngAfterViewInit() {
    this.intersectionObserver
      .createAndObserve(this.intro)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.intro.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.aboutMe)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.aboutMe.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.skills)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.skills.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.references)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.references.nativeElement.classList.add('visible');
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
