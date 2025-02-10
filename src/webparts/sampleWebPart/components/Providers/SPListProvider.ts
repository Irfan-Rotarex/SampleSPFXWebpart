 
import { sp, IItemAddResult, SPHttpClient, SharingRole, RoleType, SharingLinkKind, Site } from "@pnp/sp/presets/all";
import { ISiteUser, ISiteUserInfo } from "@pnp/sp/site-users/types";
import { Web } from "@pnp/sp/webs";
import { ISPListItem } from "../Models/ISPListItem";
import { ISPListProvider } from "./ISPListProvider";

export class SPListProvider implements ISPListProvider {

    public Context: any;

    constructor() {
        this.Context = sp;
    }

    public getListItems(list): Promise<ISPListItem[]> {
        return new Promise<ISPListItem[]>((resolve, reject) => {
            sp.web.lists.getByTitle(list).items.select(
                'ID',
                'Title',
                'Modified',
                'Editor/Title'
            ).expand('Editor').getAll().then((items) => {
                const __items = items.map<ISPListItem>((item) => {
                    return {
                        Id: item.ID,
                        Title: item.Title,
                        Modified: item.Modified,
                        ModifiedBy: item.Editor.Title
                    };
                });
                resolve(__items);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public addListItem(list: string, item: ISPListItem): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            sp.web.lists.getByTitle(list).items.select(
                'Id',
                'Title'
            ).add({
                Title: item.Title
            }).then((result) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public updateListItem(list: string, item: ISPListItem): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            sp.web.lists.getByTitle(list).items.select(
                'Id',
                'Title'
            ).getById(item.Id).update({
                Title: item.Title
            }).then((result) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public deleteListItem(list: string, id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            sp.web.lists.getByTitle(list).items.select(
                'Id',
                'Title',
            ).getById(id).delete().then((f) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private _validateEmail(email): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public isUserInGroup(groupName: string, userEmail: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            sp.web.siteGroups.getByName(groupName).users.getByEmail(userEmail).get().then((user) => {
                if (user != null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    public getUserId(email: string): Promise<number> {
        return sp.site.rootWeb.ensureUser(email).then(result => {
            return result.data.Id;
        });
    }

}
            
