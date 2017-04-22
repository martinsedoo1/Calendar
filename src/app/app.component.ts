import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { CustomDateFormatter } from './custom-date-formatter.provider';

const colors: any = {
  red: {
    primary: '#ff0000'
  },
  blue: {
    primary: '#1e90ff'
  },
  yellow: {
    primary: '#e3bc08'
  },
  black: {
    primary: '#3a3a3a'
  }
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css'],
  providers: [{
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
  }],
  templateUrl: './app.component.html'
})

export class AppComponent {
 @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: string = 'month';
  viewDate: Date = new Date('2017-02-05');
  
  modalData: {
    action: string,
    event: CalendarEvent
  };
  
  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.handleEvent('Edited', event);
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
      this.handleEvent('Deleted', event);
    }
  }];
  
  refresh: Subject<any> = new Subject();
  
  events: CalendarEvent[] = [{
    start: new Date('2017-02-01'),
    end: new Date('2017-02-01'),
    title: 'Project-09 SC.B (RD)',
    color: colors.red,
    actions: this.actions
  }, {
    start: new Date('2017-02-01'),
    end: new Date('2017-02-01'),
    title: 'HW-09 HE.B (SM)',
    color: colors.black,
    actions: this.actions
  },{
    start: new Date('2017-02-01'),
    end: new Date('2017-02-01'),
    title: 'CW-09 MA.D (CH)',
    color: colors.black,
    actions: this.actions
  },{
    start: new Date('2017-02-01'),
    end: new Date('2017-02-01'),
    title: 'HW-09 EN.C (GP)',
    color: colors.black,
    actions: this.actions
  },{
    start: new Date('2017-02-02'),
    end: new Date('2017-02-02'),
    title: 'HW-09 EN.C (GP)',
    color: colors.black,
    actions: this.actions
  },{
    start: new Date('2017-02-02'),
    end: new Date('2017-02-02'),
    title: 'Quiz-09 SC.B (RD)',
    color: colors.black,
    actions: this.actions
  },{
    start: new Date('2017-02-03'),
    end: new Date('2017-02-03'),
    title: 'Paper-09 EN.C (GP)',
    color: colors.red,
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'Project-09 SC.B (RD)',
    color: colors.red,
    cssClass: 'child-1',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'HW-09 HE.B (SM)',
    color: colors.black,
    cssClass: 'child-1',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'CW-09 MA.D (CH)',
    color: colors.black,
    cssClass: 'child-2',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'Quiz-09 SC.B (RD)',
    color: colors.black,
    cssClass: 'child-2',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'CW-09 MA.D (CH)',
    color: colors.black,
    cssClass: 'child-2',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'HW-09 HE.B (SM)',
    color: colors.black,
    cssClass: 'child-3',
    actions: this.actions
  },{
    start: new Date('2017-02-13'),
    end: new Date('2017-02-13'),
    title: 'HW-09 HE.B (SM)',
    color: colors.black,
    cssClass: 'child-3',
    actions: this.actions
  },{
    start: new Date('2017-02-21'),
    end: new Date('2017-02-21'),
    title: 'Test-09 SC.B (RD)',
    color: colors.red,
    actions: this.actions
  }];
  
  activeDayIsOpen: boolean = true;

    //constructor(private modal: NgbModal) {}

    dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }

    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
      this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }

    handleEvent(action: string, event: CalendarEvent): void {
      this.modalData = {event, action};
      //this.modal.open(this.modalContent, {size: 'lg'});
    }
  
  
}


