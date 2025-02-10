 
import { ISPListItem } from "../Models/ISPListItem";

export interface ISPListProvider {
    Context: any;
    getListItems(list: string): Promise<ISPListItem[]>;
    addListItem(list: string, item: ISPListItem): Promise<boolean>;
    updateListItem(list: string, item: ISPListItem): Promise<boolean>;
    deleteListItem(list: string, id: number): Promise<boolean>;
    isUserInGroup(groupName: string, userEmail: string): Promise<boolean>;
    getUserId(email: string): Promise<number>;
}
            
