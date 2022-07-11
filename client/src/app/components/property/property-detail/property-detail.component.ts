import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Property } from 'src/app/data-model/property.model';
import { LoggerService, LoggingLevel } from 'src/app/service/logger.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {

  comp: string = 'PropertyDetailComponent';
  title: string = "";
  @Input('property') prop: any;
  @Input('row') rowNum: any;

  constructor(private logger: LoggerService) {
    this.logger.log(this.comp,LoggingLevel.INFO,['Property Detail Component Constructed for property = '+JSON.stringify(this.prop)]);
    this.setTitle("Constructor");
  }

  ngOnInit() {
    this.logger.log(this.comp,LoggingLevel.FATAL,['Property Detail Component Initiated for property = '+JSON.stringify(this.prop)]);
    this.setTitle("OnInit");

  }

  ngOnDestroy() {
    this.logger.log(this.comp,LoggingLevel.INFO,['Property Destroyed']);
    this.setTitle("OnDestroy");
  }

  setTitle(msg:string) {
    this.title = msg;
  }

}
