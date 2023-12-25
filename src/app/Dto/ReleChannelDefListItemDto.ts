import { PortDefListItemDto } from "./PortDefListItemDto";

export class  ReleChannelDefListItemDto {
    id!: number;
    espPortDefId!: number;
    releChannelName!: string;
    releChannelDesc!: string;
    isActive!: boolean;
    releStat!:boolean;
    portDef!: PortDefListItemDto;
  }