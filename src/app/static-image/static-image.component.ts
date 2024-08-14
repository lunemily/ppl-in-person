import { Component, Input, OnInit } from '@angular/core';
import { api } from '../../environments/environment';

@Component({
  selector: 'app-static-image',
  templateUrl: './static-image.component.html',
  styleUrls: ['./static-image.component.scss'],
})
export class StaticImageComponent implements OnInit {
  @Input() imageSrcPath: string;
  fullImgSrc: string;

  ngOnInit(): void {
    this.fullImgSrc = api.serverUrl + this.imageSrcPath;
  }
}
