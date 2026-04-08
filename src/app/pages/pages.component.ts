import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';



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
