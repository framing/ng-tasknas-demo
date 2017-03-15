import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent {
  public statuses: any[] = [
    {
      description: 'Dashboard component ui',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Jeremy Becker',
        username: 'jeremy',
        email: 'jeremy@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-jeremy@2x.jpg',
      },
    }, {
      description: 'Side nav',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Jon Boyd',
        username: 'jon',
        email: 'jon@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-jon@2x.jpg',
      },
    }, {
      description: 'App Framer',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Ryan Campbell',
        username: 'ryan',
        email: 'ryan@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-ryan@2x.jpg',
      },
    }, {
      description: 'Framing MVC',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Greg Magolan',
        username: 'greg',
        email: 'greg@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-greg@2x.jpg',
      },
    }, {
      description: 'The docs though',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Reid Schretlen',
        username: 'reid',
        email: 'reid@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-reid@2x.jpg',
      },
    }, {
      description: 'Biznas things',
      datetime: new Date(),
      mood: {},
      user: {
        name: 'Justin Goodhew',
        username: 'justin',
        email: 'justin@biznas.io',
        avatarUrl: 'http://biznas.io/public/imgs/biznas-justin@2x.jpg',
      },
    },

  ];
}
