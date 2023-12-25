import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ApiclientModule } from './apiclient.module';
import {  portDefGetUrl, releChannelCreateUrl, releChannelGetUrl, releChannelUpdateUrl, releSetValueUrl } from './ServiceConstants';
import { ReleChannelDefListItemDto } from './Dto/ReleChannelDefListItemDto';
import { EspSetValueRequestDto } from './Dto/EspSetValueRequestDto';
import { PinStatResponse } from './PinStatResponse';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReleChannelDefCreateDto } from './Dto/ReleChannelDefCreateDto';
import { PortDefListItemDto } from './Dto/PortDefListItemDto';
import { ReleChannelDefUpdateDto } from './Dto/ReleChannelDefUpdateDto';

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
  releChannelInfoList:ReleChannelDefListItemDto[]=[];
  serverurl:string="";
  releCreate!:FormGroup;
  postModel!:ReleChannelDefCreateDto;
  portList!:PortDefListItemDto[];
  peopleLoading:boolean=false;
  dropdown!:string;
  constructor(private client:ApiclientModule,private formBuilder: FormBuilder)
  {
    
  }
  visible: boolean = false;

  visibleChannelEdit: boolean = false;

  showDialog(id?:number) {
    if(id==null){
      this.visible = true;
    }
    else{
      let selected= this.releChannelInfoList.find(x=>x.id==id)??new ReleChannelDefListItemDto();
      this.visible = true;
      this.createReleChannelFormBuilder(selected);
    }
      
  }

  ngOnInit(): void
   {
    let model= new ReleChannelDefListItemDto();
    model.portDef=new PortDefListItemDto();
   this.createReleChannelFormBuilder(model);
   this.getReleChannelList();
   this.getPortDefList();
  }

getPortDefList()
{
  this.client.get<PortDefListItemDto[]>(portDefGetUrl,this,x=>
  { console.log("Port Kayıtları",x)
    this.portList=x;
  });
}

getReleChannelList()
{
  this.client.get<ReleChannelDefListItemDto[]>(releChannelGetUrl,this,x=>
  { console.log("Röle Kayıtları",x)
    this.releChannelInfoList=x;
  });
}

callbackFun(event:any,pin:number)
{
   let check:boolean=event.checked?false:true;
   this.setPinValue(pin,check)
}

setPinValue(pin:number,stat:boolean)
{
  let request:EspSetValueRequestDto= new EspSetValueRequestDto();
  request.Pin=pin;
  request.Stat=stat;
  this.client.post<PinStatResponse[],EspSetValueRequestDto>(this.serverurl+releSetValueUrl,request,this,x=>{})
}
public releSave(releChannelCreate:FormGroup)
{

  let reledefCreate= new ReleChannelDefCreateDto();
  let reledefEdit = new ReleChannelDefUpdateDto();
  if(!releChannelCreate.invalid)
  {
    let id:number=releChannelCreate.value["id"];
    let isActive=true;
    let channelDesc=releChannelCreate.value["reledesc"];
    let channelName= releChannelCreate.value["relename"];
    let portno:String=releChannelCreate.value["portno"];
    let prt =this.portList.find(x=> x.portKey===portno)
  
  if(id==null)
  {
    reledefCreate.isActive=true;
    reledefCreate.releChannelDesc=channelDesc;
    reledefCreate.releChannelName=channelName;
    reledefCreate.espPortDefId=prt?.id??0;
    this.client.put<String,ReleChannelDefCreateDto>(releChannelCreateUrl,reledefCreate,this,x=>
      {
          this.visible = false;
           this.getReleChannelList();
      });
  }
  else
  {
    reledefEdit.id=id
    reledefEdit.isActive=true;
    reledefEdit.releChannelDesc=channelDesc;
    reledefEdit.releChannelName=channelName;
    reledefEdit.espPortDefId=prt?.id??0;
    console.log("Edit rele",reledefEdit);
    this.client.post<String,ReleChannelDefCreateDto>(releChannelUpdateUrl,reledefEdit,this,x=>
      {
          this.visible = false;
           this.getReleChannelList();
      });
   
  }
  
  

 
     
  }
  else console.error("İnvalid");
  
}

public createReleChannelFormBuilder(data:ReleChannelDefListItemDto)
 {
   let key:string=data.portDef.portKey;
   this.releCreate = new FormGroup({
    relename: new FormControl(data.releChannelName,[Validators.required]),
    reledesc: new FormControl(data.releChannelDesc,[Validators.required]),
    portno: new FormControl("00",[Validators.required]),
    id:new FormControl(data.id),
  });

}





}
