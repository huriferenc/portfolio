import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { IntersectionObserverService } from '../home/intersection-observer.service';
import { SKILL_ICONS } from './skill-icons';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webAppList', { read: ElementRef }) webAppList: ElementRef;
  @ViewChild('mobileAppList', { read: ElementRef }) mobileAppList: ElementRef;

  skillIcons = SKILL_ICONS;

  imageGallerySettings = {
    thumbnail: false,
    download: false,
    share: false
  };

  webApps = [
    {
      title: 'Energy Management System',
      images: [
        {
          src: '/assets/img/reference/ems-01.png',
          thumb: '/assets/img/reference/ems-01.png'
        },
        {
          active: true,
          src: '/assets/img/reference/ems-02.png',
          thumb: '/assets/img/reference/ems-02.png'
        },
        {
          src: '/assets/img/reference/ems-03.png',
          thumb: '/assets/img/reference/ems-03.png'
        }
      ],
      desc: 'An Energy Management System (EMS) web-application that helps companies or institutions optimize their energy usage.',
      skills: ['angular', 'rxjs', 'ts', 'sass'],
      primaryButton: {
        disabled: true,
        href: null
      },
      secondaryButton: {
        disabled: true,
        href: null
      }
    },
    {
      title: 'Exalon Translation Agency',
      images: [
        {
          active: true,
          src: '/assets/img/reference/ex-01.png',
          thumb: '/assets/img/reference/ex-01.png'
        },
        {
          src: '/assets/img/reference/ex-02.png',
          thumb: '/assets/img/reference/ex-02.png'
        }
      ],
      desc: 'A CodeIgniter-based interpretation and translation application.',
      skills: ['codeigniter', 'php', 'js', 'html5'],
      primaryButton: {
        disabled: true,
        href: null
      },
      secondaryButton: {
        disabled: false,
        href: 'https://exalon.hu'
      }
    }
  ];

  mobileApps = [
    {
      title: 'Tenancy Tracker by Foxtons',
      images: [
        {
          active: true,
          src: '/assets/img/reference/tenant-01.png',
          thumb: '/assets/img/reference/tenant-01.png'
        },
        {
          src: '/assets/img/reference/tenant-02.png',
          thumb: '/assets/img/reference/tenant-02.png'
        },
        {
          src: '/assets/img/reference/tenant-03.png',
          thumb: '/assets/img/reference/tenant-03.png'
        },
        {
          src: '/assets/img/reference/tenant-04.png',
          thumb: '/assets/img/reference/tenant-04.png'
        },
        {
          src: '/assets/img/reference/tenant-05.png',
          thumb: '/assets/img/reference/tenant-05.png'
        },
        {
          src: '/assets/img/reference/tenant-06.png',
          thumb: '/assets/img/reference/tenant-06.png'
        }
      ],
      desc: 'A React-Native-based tenant application for Foxtons',
      skills: ['react-native', 'redux', 'ts', 'html5'],
      primaryButton: {
        disabled: true,
        href: null
      },
      secondaryButton: {
        disabled: false,
        href: 'https://www.foxtons.co.uk/myfoxtons/tenants'
      }
    }
  ];

  private onDestroy$ = new Subject<void>();

  constructor(private intersectionObserver: IntersectionObserverService) {}

  ngAfterViewInit() {
    this.intersectionObserver
      .createAndObserve(this.webAppList)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.webAppList.nativeElement.classList.add('visible');
      });

    this.intersectionObserver
      .createAndObserve(this.mobileAppList)
      .pipe(
        takeUntil(this.onDestroy$),
        filter((isVisible: boolean) => isVisible)
      )
      .subscribe(() => {
        this.mobileAppList.nativeElement.classList.add('visible');
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
