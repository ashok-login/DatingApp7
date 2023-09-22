import { Component, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-my-member-card',
  templateUrl: './my-member-card.component.html',
  styleUrls: ['./my-member-card.component.css']
})
export class MyMemberCardComponent {
  @Input() member: Member | undefined;
}
