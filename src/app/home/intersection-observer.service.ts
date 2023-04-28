import { ElementRef, Injectable } from '@angular/core';
import { distinctUntilChanged, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  _observer: IntersectionObserver | undefined;

  constructor() {}

  createAndObserve(element: ElementRef, visibilityRatio?: number): Observable<boolean> {
    return new Observable((observer) => {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          observer.next(entries);
        },
        {
          threshold: visibilityRatio
        }
      );

      intersectionObserver.observe(element.nativeElement);

      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      mergeMap((entries: IntersectionObserverEntry[]) => entries),
      map((entry) => entry.isIntersecting),
      distinctUntilChanged()
    );
  }
}
