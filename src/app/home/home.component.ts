import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import AutoUnsubscribe from './auto-unsubscribe.decorator';
import { IntersectionObserverService } from './intersection-observer.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('intro', { read: ElementRef }) intro: ElementRef;
  @ViewChild('aboutMe', { read: ElementRef }) aboutMe: ElementRef;
  @ViewChild('skills', { read: ElementRef }) skills: ElementRef;
  @ViewChild('references', { read: ElementRef }) references: ElementRef;

  constructor(private intersectionObserver: IntersectionObserverService) {}

  ngAfterViewInit() {
    this.intersectionObserver
      .createAndObserve(this.intro)
      .pipe(filter((isVisible: boolean) => isVisible))
      .subscribe(() => {
        this.intro.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.aboutMe)
      .pipe(filter((isVisible: boolean) => isVisible))
      .subscribe(() => {
        this.aboutMe.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.skills)
      .pipe(filter((isVisible: boolean) => isVisible))
      .subscribe(() => {
        this.skills.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.references)
      .pipe(filter((isVisible: boolean) => isVisible))
      .subscribe(() => {
        this.references.nativeElement.classList.add('visible');
      });
  }
}
