import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides: any[] = [
    { src: '../../../assets/slider0.png' },
    { src: '../../../assets/slider1.png' },
    { src: '../../../assets/slider2.png' },
    { src: '../../../assets/slider3.png' }
  ];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000); 
  }

  nextSlide(): void {
    const firstSlide = this.slides.shift();
    this.slides.push(firstSlide);
  }
}

