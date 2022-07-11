import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export enum LoggingLevel { 
  'NONE'  = 0, 
  'FATAL' = 100,
  'ERROR' = 200, 
  'WARN'  = 300, 
  'INFO'  = 400,
  'DEBUG' = 500,
  'TRACE' = 600 
};

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private comp: string = "LoggerService";
  private _allowedLoggingLevel: LoggingLevel = environment.log || LoggingLevel.WARN;
  private _logEnabledComponents: string[] = environment.logEnabledComponents || [];

  constructor() {  
    this.log(this.comp, LoggingLevel.INFO,['LoggerSerive Constructed.']);
  }

  log(comp:string, level: LoggingLevel, msgArray: string[]) {
    if (this.isLoggingEnabledForLevel(level) && this.isLoggingEnabledForComponent(comp)) {
      let logMsg: string = comp + ": ";
      for (let i=0; i < msgArray.length; i++) {
        let msg = msgArray[i];
        switch (typeof msg) {
          case ("string"): { 
            logMsg = logMsg + " " + msg; 
            break; 
          }
          case ("boolean"): { 
            logMsg = logMsg + " " + msg; 
            break; 
          }
          case ("number"): { 
            logMsg = logMsg + " " + msg; 
            break; 
          }
          case "object": { 
            if (!msg) {
              logMsg = logMsg + " invalid("+i+")";              
            } else {
              logMsg = logMsg + " " + JSON.stringify(msg);
            }
            break; 
          } 
          default: { 
            logMsg = logMsg + " skipped("+i+")";
            break; 
          } 
        }
      }
      console.log(logMsg);
    }
  }

  private isLoggingEnabledForLevel(requestedLevel: LoggingLevel) {
    return (requestedLevel <= this._allowedLoggingLevel);
  }

  private isLoggingEnabledForComponent(comp:string) {
    var shouldLog = false;
    this._logEnabledComponents.forEach(c => {
        if (comp.toUpperCase() == c.toUpperCase() || c == "*") shouldLog = true;
    })
    return shouldLog;
  }

}
