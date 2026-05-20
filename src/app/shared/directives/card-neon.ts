import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardNeon]',
})
export class CardNeon {
  
  @HostBinding('style.backgroundColor')
  background = 'var(--color-surface)';

  @HostBinding('style.border')
  border = '2px solid var(--color-primary)';

  @HostBinding('style.borderRadius')
  radius = '1rem';

  @HostBinding('style.transition')
  transition = 'transform 0.3s ease, box-shadow 0.3s ease';

  @HostBinding('style.boxShadow')
  shadow = '0 0 15px -3px var(--color-primary)';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.shadow = '0 0 20px -2px var(--color-primary)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.shadow = '0 0 15px -3px var(--color-primary)';
  }
}
