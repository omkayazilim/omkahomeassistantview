import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PinStatResponse } from './PinStatResponse';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Message } from 'primeng/api';
import { environment } from '../enviroments/enviroment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'HomeController';
  button0:boolean=true;
  button1:boolean=true;
  button2:boolean=true;
  button3:boolean=true;
  button4:boolean=true;
  button5:boolean=true;
  button6:boolean=true;
  button7:boolean=true;
  button8:boolean=true;
  checked: boolean=true;
  messages: Message[] =[];
  buttonTextRun:string="Açık";
  buttonTextStop:string="Kapalı";

  serverurl:string="";
  constructor(private client:HttpClient)
  {
    
  }
  ngOnInit(): void
   {
    this.serverurl= environment.appconfig.serverurl;
    const env = '{{APP_ENV}}'.replace(/^\s+|\s+$/g, '');
    console.log(env,this.serverurl);
    this.getPinValue();
   
  }
  setPinValue(pin:Number,stat:boolean)
  {
    this.client.post<PinStatResponse[]>(this.serverurl+"Esp/EspSetValue",{pin:pin,stat:stat}).subscribe(x=>{
      this.calcButtonEffect(x);
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Esp Modül bağlantısı Başarılı' }];
    },e=>{

      this.messages = [{ severity: 'error', summary: 'Error', detail:"Modüle Erişilemedi"}];
    }
    );
  }

  getPinValue()
  {
    this.client.get<PinStatResponse[]>(this.serverurl+"Esp/EspGetValue").subscribe(x=>{
      this.calcButtonEffect(x);
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Esp Modül bağlantısı Başarılı' }];
    },e=>{
      this.messages = [{ severity: 'error', summary: 'Error', detail:"Modüle Erişilemedi"}];
    });
  }

   calcButtonEffect(stats:PinStatResponse[])
   {
    stats.forEach(x=>{

      switch(x.pin){
        case 0:
          {
            this.button0=x.value >0 ? true : false;
            break;
          }
        case 1:
          {
            this.button1=x.value >0 ? true : false;
            break;
          }
        case 2:
          {
            this.button2=x.value >0 ? true : false;
            break;
          }
        case 3:
          {
            this.button3=x.value >0 ? true : false;
            break;
          }
        case 4:
          {
            this.button4=x.value >0 ? true : false;
            break;
          }
        case 5:
          {
            this.button5=x.value >0 ? true : false;
             break;
          }
        case 6:
          {
            this.button6=x.value >0 ? true : false;
            break;
          }
        case 7:
          {
            this.button7=x.value >0 ? true : false;
            break;
          }
        case 8:
          {
            this.button8=x.value >0 ? true : false;
            break;
          }
      }
      console.log(x);
    });

   }

   callbackFun(event:any,pin:number)
   {
      let check:boolean=event.checked?false:true;
      this.setPinValue(pin,check)
      
   }

}
