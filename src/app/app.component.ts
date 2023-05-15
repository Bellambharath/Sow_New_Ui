import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CandidateProfiles';
  headerEvent: boolean = true;
  constructor(public router: Router) {}
  update(event: any) {
    this.headerEvent = event;
  }

}


