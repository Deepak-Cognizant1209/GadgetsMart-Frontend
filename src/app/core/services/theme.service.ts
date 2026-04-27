import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _dark = signal(true);

  get isDark() { return this._dark(); }

  constructor() {
    const saved = localStorage.getItem('gm-theme');
    const dark = saved ? saved === 'dark' : true;
    this._dark.set(dark);
    this.applyTheme(dark);
  }

  toggle(): void {
    const dark = !this._dark();
    this._dark.set(dark);
    this.applyTheme(dark);
    localStorage.setItem('gm-theme', dark ? 'dark' : 'light');
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    const tabColor = dark ? '' : '#000000';
    document.documentElement.style.setProperty('--mat-tab-inactive-label-text-color', tabColor);
    document.documentElement.style.setProperty('--mat-tab-inactive-focus-label-text-color', tabColor);
    document.documentElement.style.setProperty('--mat-tab-inactive-hover-label-text-color', tabColor);
  }
}
