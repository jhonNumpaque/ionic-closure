"use strict";

const core_1 = require('@angular/core');
const ionic_angular_1 = require('ionic-angular');
/*
  Generated class for the PageOne page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
class PageOne {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ionViewDidLoad() {
        console.log('Hello PageOnePage Page one two three four');
    }
    nextPage() {
        this.navCtrl.push('PageTwo');
    }
    previousPage() {
        this.navCtrl.pop();
    }
}
PageOne.decorators = [{ type: core_1.Component, args: [{
        selector: 'page-page-one',
        template: `
  <ion-header>

  <ion-navbar>
    <ion-title>Page-One</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>
  <button ion-button (click)="nextPage()">Next Page</button>
  <button ion-button (click)="previousPage()">Back</button>
</ion-content>
  `
    }] }];
/** @nocollapse */
PageOne.ctorParameters = [{ type: ionic_angular_1.NavController }];
exports.PageOne = PageOne;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2Utb25lLmpzIl0sIm5hbWVzIjpbImNvcmVfMSIsInJlcXVpcmUiLCJpb25pY19hbmd1bGFyXzEiLCJQYWdlT25lIiwiY29uc3RydWN0b3IiLCJuYXZDdHJsIiwiaW9uVmlld0RpZExvYWQiLCJjb25zb2xlIiwibG9nIiwibmV4dFBhZ2UiLCJwdXNoIiwicHJldmlvdXNQYWdlIiwicG9wIiwiZGVjb3JhdG9ycyIsInR5cGUiLCJDb21wb25lbnQiLCJhcmdzIiwic2VsZWN0b3IiLCJ0ZW1wbGF0ZSIsImN0b3JQYXJhbWV0ZXJzIiwiTmF2Q29udHJvbGxlciIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLE1BQU1BLFNBQVNDLFFBQVEsZUFBUixDQUFmO0FBQ0EsTUFBTUMsa0JBQWtCRCxRQUFRLGVBQVIsQ0FBeEI7QUFDQTs7Ozs7O0FBTUEsTUFBTUUsT0FBTixDQUFjO0FBQ1ZDLGdCQUFZQyxPQUFaLEVBQXFCO0FBQ2pCLGFBQUtBLE9BQUwsR0FBZUEsT0FBZjtBQUNIO0FBQ0RDLHFCQUFpQjtBQUNiQyxnQkFBUUMsR0FBUixDQUFZLDJDQUFaO0FBQ0g7QUFDREMsZUFBVztBQUNQLGFBQUtKLE9BQUwsQ0FBYUssSUFBYixDQUFrQixTQUFsQjtBQUNIO0FBQ0RDLG1CQUFlO0FBQ1gsYUFBS04sT0FBTCxDQUFhTyxHQUFiO0FBQ0g7QUFaUztBQWNkVCxRQUFRVSxVQUFSLEdBQXFCLENBQ2pCLEVBQUVDLE1BQU1kLE9BQU9lLFNBQWYsRUFBMEJDLE1BQU0sQ0FBQztBQUNyQkMsa0JBQVUsZUFEVztBQUVyQkMsa0JBQVc7Ozs7Ozs7Ozs7Ozs7OztBQUZVLEtBQUQsQ0FBaEMsRUFEaUIsQ0FBckI7QUFvQkE7QUFDQWYsUUFBUWdCLGNBQVIsR0FBeUIsQ0FDckIsRUFBRUwsTUFBTVosZ0JBQWdCa0IsYUFBeEIsRUFEcUIsQ0FBekI7QUFHQUMsUUFBUWxCLE9BQVIsR0FBa0JBLE9BQWxCIiwiZmlsZSI6InBhZ2Utb25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBjb3JlXzEgPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlJyk7XG5jb25zdCBpb25pY19hbmd1bGFyXzEgPSByZXF1aXJlKCdpb25pYy1hbmd1bGFyJyk7XG4vKlxuICBHZW5lcmF0ZWQgY2xhc3MgZm9yIHRoZSBQYWdlT25lIHBhZ2UuXG5cbiAgU2VlIGh0dHA6Ly9pb25pY2ZyYW1ld29yay5jb20vZG9jcy92Mi9jb21wb25lbnRzLyNuYXZpZ2F0aW9uIGZvciBtb3JlIGluZm8gb25cbiAgSW9uaWMgcGFnZXMgYW5kIG5hdmlnYXRpb24uXG4qL1xuY2xhc3MgUGFnZU9uZSB7XG4gICAgY29uc3RydWN0b3IobmF2Q3RybCkge1xuICAgICAgICB0aGlzLm5hdkN0cmwgPSBuYXZDdHJsO1xuICAgIH1cbiAgICBpb25WaWV3RGlkTG9hZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0hlbGxvIFBhZ2VPbmVQYWdlIFBhZ2Ugb25lIHR3byB0aHJlZSBmb3VyJyk7XG4gICAgfVxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICB0aGlzLm5hdkN0cmwucHVzaCgnUGFnZVR3bycpO1xuICAgIH1cbiAgICBwcmV2aW91c1BhZ2UoKSB7XG4gICAgICAgIHRoaXMubmF2Q3RybC5wb3AoKTtcbiAgICB9XG59XG5QYWdlT25lLmRlY29yYXRvcnMgPSBbXG4gICAgeyB0eXBlOiBjb3JlXzEuQ29tcG9uZW50LCBhcmdzOiBbe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAncGFnZS1wYWdlLW9uZScsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IGBcbiAgPGlvbi1oZWFkZXI+XG5cbiAgPGlvbi1uYXZiYXI+XG4gICAgPGlvbi10aXRsZT5QYWdlLU9uZTwvaW9uLXRpdGxlPlxuICA8L2lvbi1uYXZiYXI+XG5cbjwvaW9uLWhlYWRlcj5cblxuXG48aW9uLWNvbnRlbnQgcGFkZGluZz5cbiAgPGJ1dHRvbiBpb24tYnV0dG9uIChjbGljayk9XCJuZXh0UGFnZSgpXCI+TmV4dCBQYWdlPC9idXR0b24+XG4gIDxidXR0b24gaW9uLWJ1dHRvbiAoY2xpY2spPVwicHJldmlvdXNQYWdlKClcIj5CYWNrPC9idXR0b24+XG48L2lvbi1jb250ZW50PlxuICBgXG4gICAgICAgICAgICB9LF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cblBhZ2VPbmUuY3RvclBhcmFtZXRlcnMgPSBbXG4gICAgeyB0eXBlOiBpb25pY19hbmd1bGFyXzEuTmF2Q29udHJvbGxlciwgfSxcbl07XG5leHBvcnRzLlBhZ2VPbmUgPSBQYWdlT25lO1xuIl19