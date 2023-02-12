import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeQualificationEntry, Qualification } from '../Qualification';

@Component({
  selector: 'app-qualification-entry',
  templateUrl: './qualification-entry.component.html',
  styleUrls: ['./qualification-entry.component.css']
})
export class QualificationEntryComponent {
  @Input() disableEdit: boolean = false;
  @Input() quali!: EmployeeQualificationEntry;
  @Input() mode: string = 'delete';

  @Output() delete = new EventEmitter();


  MarkDelete($event: MouseEvent, quali: EmployeeQualificationEntry) {
    if (this.mode === 'delete') {
      this.delete.emit(quali);
      return;
    }


    quali.removeFlag = !quali.removeFlag;
    let target = $event.target as HTMLElement;
    if (target.nodeName == 'path') {
      target = target.parentElement as HTMLElement;
    }
    if (target.nodeName == 'svg') {
      target = target.parentElement as HTMLElement;
    }
    if (quali.removeFlag) {
      target.parentElement?.classList.add('marked-delete');
    }
    else {
      target.parentElement?.classList.remove('marked-delete');
    }

  }
}
