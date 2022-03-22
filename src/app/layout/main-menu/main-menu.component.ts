import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/authetication/services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  user: any;
  currentDetail: number | undefined;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 760px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() { }

  hiddenSide(snav: any) {
    if (this.mobileQuery.matches) {
      snav.toggle();
    }
  }

  logOutuser(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  showDetail(value: number): boolean {
    return value === this.currentDetail;
  }

  passValue(value: number): void {
    if (this.currentDetail !== value) {
      this.currentDetail = value;
      return;
    }

    this.currentDetail = undefined;

  }

}
