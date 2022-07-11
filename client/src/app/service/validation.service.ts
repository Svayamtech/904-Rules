import { Injectable } from '@angular/core';
import { LoggerService, LoggingLevel } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private comp: string = "ValidationService"; 

  constructor(private logger:LoggerService) { 
    this.logger.log(this.comp,LoggingLevel.INFO,['LoggerService constructed!.']);
  }

  //***************************************************/ 
  // utility service to check whether passed object is
  // valid or not -
  // (a) Returns true if passed object is 
  //    (i) not null
  //    (ii) not undefined
  //    and (iii) it's typeof is object
  //  (b) otherwise returns false
  //***************************************************/
  isValidObject(object_to_check: any) {
    let ret:boolean;
    if (!this.isNullOrUndefined(object_to_check) && typeof object_to_check == 'object') ret = true;
    else ret = false;
    return ret;
  }

  //***************************************************/ 
  // utility service to check whether passed object 
  // contains items (variables and/or functions) -
  // (a) Returns true if passed object is 
  //    (i) A valid object (isValidObject())
  //    (ii) has a length > 0
  //***************************************************/
  isObjectEmpty(object_to_check: any) {
    let ret:boolean = this.isValidObject(object_to_check);
    if (ret && object_to_check.length > 0) {
        ret = false;
    }
    else ret = true;
    return ret;
  }

  //***************************************************/ 
  // utility service to check whether passed is a valid
  // number or not -
  // (a) Returns true if passed object is 
  //    (i) A valid object (isValidObject())
  //    (ii) it's' typeof is number
  //***************************************************/
  isValidNumber(number_to_check: any) {
    let ret:boolean = !this.isNullOrUndefined(number_to_check);
    if (ret && typeof number_to_check == 'number') ret = false;
    else ret = true;
    return ret;
  }

  //***************************************************/ 
  // utility service to check whether passed is a valid
  // string or not -
  // (a) Returns true if passed object is 
  //    (i) A valid object (isValidObject())
  //    (ii) it's' typeof is string
  //***************************************************/
  isValidString(string_to_check: any) {
    let ret:boolean = !this.isNullOrUndefined(string_to_check);
    if (ret && typeof string_to_check == 'string') ret = true;
    else ret = false;
    return ret;
  }

  //***************************************************/ 
  // utility service to check value is neither null
  // nor undefined -
  // (a) Returns true if passed variable is 
  //    (i) A valid object (isValidObject())
  //    (ii) it's' typeof is number
  //***************************************************/
  isNullOrUndefined(item_to_check: any) {
    let ret:boolean;
    if (!item_to_check) ret = true;
    else ret = false;
    return ret;
  }

  isNeitherNullNorUndefined(item_to_check: any) {
    let ret = !this.isNullOrUndefined(item_to_check);
    return ret;
  }
}
