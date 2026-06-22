import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'qodist-website';
  public isDarkThemeSelected: boolean = false;
  public isNavbarOpen: boolean = false;

  constructor(private router: Router) {
    // Automatically close mobile navbar on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

  public ngOnInit(): void {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);

      if (currentTheme === 'dark') {
        this.isDarkThemeSelected = true;
      }
    }
  }

  public toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.updateBodyScroll();
  }

  public closeNavbar() {
    this.isNavbarOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (this.isNavbarOpen) {
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 991 && this.isNavbarOpen) {
      this.closeNavbar();
    }
  }

  public switchTheme(e: any) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }
}
