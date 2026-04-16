import {Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ],
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();

  @Input() usuario:any;
  @Input() patient:any;
  constructor(
  ) {}

  ngOnInit(): void {
  }




}
