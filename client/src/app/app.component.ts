import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoggerService, LoggingLevel } from './service/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

  comp: string = "AppComponent";
  title = 'client';

  constructor(private logger:LoggerService) {
    this.logger.log(this.comp,LoggingLevel.INFO,['app constructed.']);
    this.setTitle("Constructor");
  }

  ngOnInit() {
    this.logger.log(this.comp,LoggingLevel.INFO,['app initialized.']);
    this.setTitle("OnInit");
  }

  ngOnDestroy() {
    this.logger.log(this.comp,LoggingLevel.INFO,['app destroyed.']);
    this.setTitle("OnDestroy");
  }

  setTitle(msg:string) {
    this.title = msg;
  }

}
