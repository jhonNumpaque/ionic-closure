"use strict";

const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
class HomePage {
  constructor(navCtrl) {
    this.navCtrl = navCtrl;
  }
  nextPage() {
    this.navCtrl.push('PageOne');
    console.log();
  }
}
HomePage.decorators = [{ type: core_1.Component, args: [{
    selector: 'page-home',
    template: `
  <ion-header>
    <ion-navbar>
      <ion-title>
        Ionic Blank
      </ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>
    The world is your oyster.
    <p>
      If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will be your guide.
    </p>
    <button ion-button (click)="nextPage()">Next Page</button>
  </ion-content>
  `
  }] }];
/** @nocollapse */
HomePage.ctorParameters = [{ type: ionic_angular_1.NavController }];
exports.HomePage = HomePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiY29yZV8xIiwicmVxdWlyZSIsImlvbmljX2FuZ3VsYXJfMSIsIkhvbWVQYWdlIiwiY29uc3RydWN0b3IiLCJuYXZDdHJsIiwibmV4dFBhZ2UiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImRlY29yYXRvcnMiLCJ0eXBlIiwiQ29tcG9uZW50IiwiYXJncyIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJjdG9yUGFyYW1ldGVycyIsIk5hdkNvbnRyb2xsZXIiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxNQUFNQSxTQUFTQyxRQUFRLGVBQVIsQ0FBZjtBQUNBLE1BQU1DLGtCQUFrQkQsUUFBUSxlQUFSLENBQXhCO0FBQ0EsTUFBTUUsUUFBTixDQUFlO0FBQ1hDLGNBQVlDLE9BQVosRUFBcUI7QUFDakIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0g7QUFDREMsYUFBVztBQUNQLFNBQUtELE9BQUwsQ0FBYUUsSUFBYixDQUFrQixTQUFsQjtBQUNBQyxZQUFRQyxHQUFSO0FBQ0g7QUFQVTtBQVNmTixTQUFTTyxVQUFULEdBQXNCLENBQ2xCLEVBQUVDLE1BQU1YLE9BQU9ZLFNBQWYsRUFBMEJDLE1BQU0sQ0FBQztBQUNyQkMsY0FBVSxXQURXO0FBRXJCQyxjQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztBQUZVLEdBQUQsQ0FBaEMsRUFEa0IsQ0FBdEI7QUFzQkE7QUFDQVosU0FBU2EsY0FBVCxHQUEwQixDQUN0QixFQUFFTCxNQUFNVCxnQkFBZ0JlLGFBQXhCLEVBRHNCLENBQTFCO0FBR0FDLFFBQVFmLFFBQVIsR0FBbUJBLFFBQW5CIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IGNvcmVfMSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUnKTtcbmNvbnN0IGlvbmljX2FuZ3VsYXJfMSA9IHJlcXVpcmUoJ2lvbmljLWFuZ3VsYXInKTtcbmNsYXNzIEhvbWVQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihuYXZDdHJsKSB7XG4gICAgICAgIHRoaXMubmF2Q3RybCA9IG5hdkN0cmw7XG4gICAgfVxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLm5hdkN0cmwucHVzaCgnUGFnZU9uZScpO1xuICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgIH1cbn1cbkhvbWVQYWdlLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBjb3JlXzEuQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAncGFnZS1ob21lJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogYFxuICA8aW9uLWhlYWRlcj5cbiAgICA8aW9uLW5hdmJhcj5cbiAgICAgIDxpb24tdGl0bGU+XG4gICAgICAgIElvbmljIEJsYW5rXG4gICAgICA8L2lvbi10aXRsZT5cbiAgICA8L2lvbi1uYXZiYXI+XG4gIDwvaW9uLWhlYWRlcj5cblxuICA8aW9uLWNvbnRlbnQgcGFkZGluZz5cbiAgICBUaGUgd29ybGQgaXMgeW91ciBveXN0ZXIuXG4gICAgPHA+XG4gICAgICBJZiB5b3UgZ2V0IGxvc3QsIHRoZSA8YSBocmVmPVwiaHR0cDovL2lvbmljZnJhbWV3b3JrLmNvbS9kb2NzL3YyXCI+ZG9jczwvYT4gd2lsbCBiZSB5b3VyIGd1aWRlLlxuICAgIDwvcD5cbiAgICA8YnV0dG9uIGlvbi1idXR0b24gKGNsaWNrKT1cIm5leHRQYWdlKClcIj5OZXh0IFBhZ2U8L2J1dHRvbj5cbiAgPC9pb24tY29udGVudD5cbiAgYFxuICAgICAgICAgICAgfSxdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5Ib21lUGFnZS5jdG9yUGFyYW1ldGVycyA9IFtcbiAgICB7IHR5cGU6IGlvbmljX2FuZ3VsYXJfMS5OYXZDb250cm9sbGVyLCB9LFxuXTtcbmV4cG9ydHMuSG9tZVBhZ2UgPSBIb21lUGFnZTtcbiJdfQ==