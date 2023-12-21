import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PinStatResponse } from './PinStatResponse';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Message } from 'primeng/api';
import { environment } from '../enviroments/environment';
import { PortInfoDto } from './Dto/PortInfoDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'HomeController';
  messages: Message[] =[];
  buttonTextRun:string="Açık";
  buttonTextStop:string="Kapalı";

  portInfoList:PortInfoDto[]=[];

  serverurl:string="";
  constructor(private client:HttpClient)
  {
    
  }
  ngOnInit(): void
   {
    const env = '{{APP_ENV}}'.replace(/^\s+|\s+$/g, '');
    this.serverurl= environment.serverUrl;
    console.log("ortm değişkeni",env);
    this.getPortinfo()
  }
  setPinValue(pin:Number,stat:boolean)
  {
    this.client.post<PinStatResponse[]>(this.serverurl+"Esp/EspSetValue",{pin:pin,stat:stat}).subscribe(x=>{
      this.getPortinfo();
      this.messages = [{ severity: 'success', summary: 'Success', detail: 'Esp Modül bağlantısı Başarılı' }];
    },e=>{

      this.messages = [{ severity: 'error', summary: 'Error', detail:"Modüle Erişilemedi"}];
    }
    );
  }

  

   callbackFun(event:any,pin:number)
   {
      let check:boolean=event.checked?false:true;
      this.setPinValue(pin,check)
   }

   getPortinfo()
   {
    this.client.get<PortInfoDto[]>(this.serverurl+"Esp/GetPortProps").subscribe(x=>{
       console.log(x);
       this.portInfoList=x;
    },e=>{
      this.messages = [{ severity: 'error', summary: 'Error', detail:"Modüle Erişilemedi"}];
    });

   }

}
