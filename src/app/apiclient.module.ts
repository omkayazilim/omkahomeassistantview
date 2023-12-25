import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../enviroments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ApiclientModule
{
  constructor(private client:HttpClient)
  {

  }
 public get<T>(path:string,ctx:any,callback:(resp:T ,ctx:any)=>void)
 {
   this.client.get<T>(environment.serverUrl+path)
    .pipe(retry(2), catchError(er=>this.errorhandle<T>(er)))
    .subscribe(x=>{
      callback(x,ctx);
    });
 }

 public getby<T>(path:string,ctx:any,callback:(resp:T ,ctx:any)=>void)
 {
  this.client.get<T>(environment.serverUrl+path)
  .pipe(retry(2), catchError(er=>this.errorhandle<T>(er)))
  .subscribe(x=>{
    callback(x,ctx);
  });
 }

 public post<T,T1>(path:string,model:T1,ctx:any,callback:(resp:T ,ctx:any)=>void)
 {
    this.client.post<T>(environment.serverUrl+path,model)
    .pipe(retry(2), catchError(er=>this.errorhandle<T>(er)))
    .subscribe(x=>{
     callback(x,ctx);
      });
 }
 public put<T,T1>(path:string,model:T1,ctx:any,callback:(resp:T ,ctx:any)=>void)
 {
   this.client.put<T>(environment.serverUrl+path,model)
   .pipe(retry(2), catchError(er=>this.errorhandle<T>(er)))
   .subscribe(x=>{
    callback(x,ctx);
     });
    
 }

 public delete<T>(path:string,ctx:any,callback:(resp:T ,ctx:any)=>void)
 {
    this.client.delete<T>(environment.serverUrl+path)
    .pipe(retry(2), catchError(er=>this.errorhandle<T>(er)))
    .subscribe(x=>{
     callback(x,ctx);
      });
 }

 errorhandle<T>(er:any):Observable<T>{
  if(er&er.error&&er.error.message)
  {
    console.error(er.error.message);
  }
  if(er.error&&er.error.message)
  {
    console.error(er.error.message);
  }
  if(er.error.message)
  {
    console.error(er.error.error.message);
  }
  return throwError(er);
 }
}
