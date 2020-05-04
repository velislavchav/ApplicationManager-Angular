import { Component } from '@angular/core';
import { EmployerService } from 'src/app/helpers/services/employer.service';

@Component({
  selector: 'app-change-logo-modal',
  templateUrl: './change-logo-modal.component.html'
})
export class ChangeLogoModalComponent {
  constructor(private employerService: EmployerService) { }

  changeLogo(logo: HTMLInputElement, closeBtn: HTMLButtonElement) {
    const logoValue = logo.value;
    if(logoValue !== '') {
      this.employerService.updateLogo(logoValue);
      closeBtn.click();
    }
  }
}
