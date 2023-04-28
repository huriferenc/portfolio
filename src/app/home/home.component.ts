import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import { IntersectionObserverService } from './intersection-observer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('intro', { read: ElementRef }) intro: ElementRef;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef;
  @ViewChild('skills', { read: ElementRef }) skills: ElementRef;
  @ViewChild('references', { read: ElementRef }) references: ElementRef;

  private sectionVisibilityRatio = 0.5;

  private onDestroy$ = new Subject<void>();

  constructor(private intersectionObserver: IntersectionObserverService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.intro.nativeElement.classList.remove('visible');
    this.aboutMe.nativeElement.classList.remove('visible');
    this.skills.nativeElement.classList.remove('visible');
    this.references.nativeElement.classList.remove('visible');

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
      .createAndObserve(this.aboutMe, this.sectionVisibilityRatio)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.aboutMe.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.skills, this.sectionVisibilityRatio)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.skills.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.references, this.sectionVisibilityRatio)
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
