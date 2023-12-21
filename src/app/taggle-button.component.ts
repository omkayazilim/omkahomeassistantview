import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'toggle-button',
  templateUrl: './taggle-button.component.html',
  styleUrl: './taggle-button.component.scss'
})
export class ToggleButtonComponent  {
  @Output() changed = new EventEmitter<boolean>();
   change(event:any)
   {
    this.changed.emit(event.target.checked)
   }
}
