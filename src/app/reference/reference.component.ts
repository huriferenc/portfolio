import { Component, OnInit } from '@angular/core';

import initGallery from './popup-image/galleryApp.js';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    initGallery('/assets/galleries.json', {
      speed: 600
    });
  }
}
