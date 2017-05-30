import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { NotificationService } from './notification.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'notification',
  templateUrl: './notification.component.html'
})

export class NotificationComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() title: string;
  @Input() code: string;
  @Input() message: string;
  @Input() stacktrace: string;
  private element: JQuery;

  constructor(private notificationService: NotificationService, private el: ElementRef) {
    this.element = $(el.nativeElement);
  }

  set(title: string, code: string, message: string, stacktrace: string) {
    this.title = title;
    this.code = code;
    this.message = message;
    this.stacktrace = stacktrace;
  }

  ngOnInit(): void {
    let note = this;

    if (!this.id) {
      console.error('note must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    this.element.appendTo('body');

    // close modal on background click
    this.element.on('click', function (e: any) {
      var target = $(e.target);
      if (!target.closest('.notification-body').length) {
        note.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.notificationService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.notificationService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.show();
    $('body').addClass('notification-open');
  }

  close(): void {
    this.element.hide();
    $('body').removeClass('notification-open');
  }
}
