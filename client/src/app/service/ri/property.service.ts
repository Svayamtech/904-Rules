import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../main.service';
import { Property } from 'src/app/data-model/property.model';
import { firstValueFrom } from 'rxjs';
import { LoggerService, LoggingLevel } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private comp: string = "PropertyService";
  private apiRoute: string = "/property/properties"

  constructor(private http: HttpClient,
              private logger: LoggerService,
              private mainService: MainService) { }

 
 async getAllPropertiesDetails(reqObj:any):Promise<Property[]> {
  let ret: Property[] = [];
  await firstValueFrom(this.http.get<any>(this.mainService.apiEndPoint + this.apiRoute + '/getAllPropertiesData'+reqObj))
      .then( (props) => {
        if (props.error) throw new Error(
          'Error encountered in calling API - '
              +this.mainService.apiEndPoint 
              + this.apiRoute 
              + '/getAllPropertiesData'+reqObj
          +", Error returned from API server =>"+props.data);
        else {
          this.logger.log(this.comp,LoggingLevel.INFO,['Property Count='+props.data.length]);
          ret = props.data;
        }        
      }).catch( (err) => {
        this.logger.log(this.comp,LoggingLevel.ERROR,['Error in getting properties.Error='+err]);
      });
  return ret;
 }

}
