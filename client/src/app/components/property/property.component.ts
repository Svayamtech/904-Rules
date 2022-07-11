import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/data-model/property.model';
import { LoggerService, LoggingLevel } from 'src/app/service/logger.service';
import { PropertyService } from 'src/app/service/ri/property.service';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit, OnDestroy {

  comp: string = 'PropertyComponent';
  title: string = "";
  pageRowCount: number = 10;
  currPageNumber: number = 1;
  totalProperties: Property[] = [];
  currPageProperties: Property[] = [];

  constructor(private logger: LoggerService,
              private propSvc: PropertyService,
              private route: ActivatedRoute,
              private router: Router
             ) {

    this.logger.log(this.comp,LoggingLevel.INFO,['Property List Constructed']);
    this.setTitle("Constructor");

  }

  async ngOnInit() {

    this.logger.log(this.comp,LoggingLevel.INFO,['Property List Initiated']);
    this.setTitle("OnInit");

    let allPropDtlsReq = { 'b_acct_id': 91};
    try {
      await this.propSvc.getAllPropertiesDetails(JSON.stringify(allPropDtlsReq))
        .then( (data: Property[]) => {
          this.logger.log(this.comp,LoggingLevel.DEBUG,['Returned Properties=>',JSON.stringify(data)]);
          this.totalProperties = data;
        })
    } catch (e) {
      this.logger.log(this.comp,LoggingLevel.ERROR,['Error encountered in getAllPropertiesDetails']);
    }
    
    this.route.queryParams
      .subscribe( p => {
        let routeHasPageQueryParam: number = p['page'];
        if (!routeHasPageQueryParam) {
          this.logger.log(this.comp,LoggingLevel.INFO,['route does not have page number query parameter therefore going to currentpage of '+this.currPageNumber]);
          this.goToPage(this.currPageNumber);
        } else {
          this.logger.log(this.comp,LoggingLevel.INFO,['route has page number query parameter therefore going to page number requested by the route'+routeHasPageQueryParam]);
          this.goToPage(routeHasPageQueryParam);
        }
      })

    // this.route.params
    //   .subscribe( p => {
    //     let routeHasPageQueryParam: number = p['page'];
    //     if (!routeHasPageQueryParam) {
    //       this.logger.log(this.comp,LoggingLevel.INFO,['route does not have page number query parameter therefore going to currentpage of '+this.currPageNumber]);
    //       this.goToPage(this.currPageNumber);
    //     } else {
    //       this.logger.log(this.comp,LoggingLevel.INFO,['route has page number query parameter therefore going to page number requested by the route'+routeHasPageQueryParam]);
    //       this.goToPage(routeHasPageQueryParam);
    //     }
    //   })  

  }

  ngOnDestroy() {
    this.logger.log(this.comp,LoggingLevel.INFO,['Property List Destroyed']);
    this.setTitle("OnDestroy");
  }

  setTitle(msg:string) {
    this.title = msg;
  }

  goToPage(num: number) {
    this.currPageProperties = [];
    this.totalProperties.forEach((prop, index) => {
      if (index >= (num-1)*(this.pageRowCount) && index < num*this.pageRowCount) this.currPageProperties.push(prop);
    })
    this.currPageNumber = num;
  }

  next() {
    this.currPageNumber = this.currPageNumber + 1;
    this.goToPage(this.currPageNumber);    
  }
  previous() {
    this.currPageNumber = +this.currPageNumber - 1;
    this.goToPage(this.currPageNumber);    
  }

  nextUsingRouteParams() {
    let i = +this.currPageNumber + 1;
    console.log("next"+i);
    this.router.navigate(
      ['/prop',i]
    );
  }

  previousUsingRouteParams() {
    let i = +this.currPageNumber - 1;
    console.log("previous"+i);
    this.router.navigate(
      ['/prop',i]
    );
  }

  nextUsingQueryParams() {
    let i = +this.currPageNumber + 1;
    console.log("next"+i);
    this.router.navigate(
      [
        '/prop',
        { 
          queryParams: { 
            page: i,
            weather: 'nice'
          } 
        }
      ]
    );
  }

  previousUsingQueryParams() {
    let i = +this.currPageNumber - 1;
    console.log("previous"+i);
    this.router.navigate(
      [
        '/prop',
        { 
          queryParams: { 
            page: i,
            weather: 'nice'
          } 
        }
      ]
    );
  }


}
