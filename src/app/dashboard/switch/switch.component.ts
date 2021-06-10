import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() estado: boolean;
  @Input() id: any;
  @Output() clickEnable = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
