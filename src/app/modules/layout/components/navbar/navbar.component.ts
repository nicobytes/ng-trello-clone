import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { navBgColors, Colors } from '@models/colors.model';

import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  mapColors = navBgColors;
  backgroundColor: Colors = 'sky';

  constructor(
    private authService: AuthService,
    private router: Router,
    private boardsService: BoardsService,
  ) {
    this.boardsService.backgroundColor$.subscribe(color => {
      this.backgroundColor = color;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get colors() {
    const colors = this.mapColors[this.backgroundColor]
    if (colors) {
      return colors;
    }
    return {};
  }

}
