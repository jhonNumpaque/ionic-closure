import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular/es2015/index.js'


@Injectable()
export class UserData {
  _favorites = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(public events: Events) {}

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(username) {
    // this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(username) {
    // this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  };

  logout() {
    // this.storage.remove(this.HAS_LOGGED_IN);
    // this.storage.remove('username');
    this.events.publish('user:logout');
  };

  setUsername(username) {
    // this.storage.set('username', username);
  };

  getUsername() {
    /*return this.storage.get('username').then((value) => {
      return value;
    });
    */
    return Promise.resolve('username');
  };

  // return a promise
  hasLoggedIn() {
    /*return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
    */
    return Promise.resolve(true);
  };

  checkHasSeenTutorial() {
    /*return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    })
    */
    return Promise.resolve(true);
  };
}
