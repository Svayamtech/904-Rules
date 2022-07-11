import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/data-model/property.model';
import { LoggerService, LoggingLevel } from 'src/app/service/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  comp: string = 'HomeComponent';
  title: string = "";
  prop: Property = {
    property_id: 4,
    assigned_property_number: 'D2-34',
    property_type: 'HSE',
    description: 'My Property',
    area: 200,
    unit: 'SQM',
    feature_id: 2,
    feature_type: 'Corner',
    property_group_id: 1
  }
  row:number = 24;

  constructor(private logger: LoggerService) {
    this.logger.log(this.comp,LoggingLevel.INFO,['Home Constructed']);
    this.setTitle(this.comp+" Constructor");
  }

  ngOnInit() {
    this.logger.log(this.comp,LoggingLevel.INFO,['Home Initiated']);
    this.setTitle(this.comp+" OnInit");
  }

  ngOnDestroy() {
    this.logger.log(this.comp,LoggingLevel.INFO,['Home Destroyed']);
    this.setTitle(this.comp+" OnDestroy");
  }

  setTitle(msg:string) {
    this.title = msg;
  }

}
