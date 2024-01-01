import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides: any[] = new Array(4).fill({id: -1, src: '', title: '', subtitle:''});

  constructor() {};

  ngOnInit(): void {
      this.slides[0] = {
        src: '../../../assets/slider0.png'
      };
      this.slides[1] = {
        src: '../../../assets/slider1.png'
      }
      this.slides[2] = {
        src: '../../../assets/slider2.png'
      }
      this.slides[3] = {
        src: '../../../assets/slider3.png'
      }
  }

  onItemChange($event: any): void{
    console.log('Slider OnItemChange', $event)
  }

}
