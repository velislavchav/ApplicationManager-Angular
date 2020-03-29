import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() skillsSelectedByUser;

  isEmptyObject(obj): boolean {
    return Object.keys(obj).length > 0 ? false : true;
  }
}
