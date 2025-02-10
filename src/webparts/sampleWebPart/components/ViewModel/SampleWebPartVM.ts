 
import { ReactElement } from "react";
import * as React from "react";
import { PageContext } from "@microsoft/sp-page-context";
import { ISPListProvider } from "../Providers/ISPListProvider";
import { IAppContext } from "../Context/IAppContext";
import { AppLayout } from "../AppRoute/AppLayout";
import { SPListProvider } from "../Providers/SPListProvider";
import { ISampleWebPartVM } from "./ISampleWebPartVM";

export class SampleWebPartVM implements ISampleWebPartVM {
    public DefaultSPListProvider: ISPListProvider;
    public SampleWebPartWebPart: ReactElement<IAppContext>;
    private _SampleWebPartWebPartProps: IAppContext;
    constructor(context: PageContext) {
        this.DefaultSPListProvider = new SPListProvider();
        this._SampleWebPartWebPartProps = <IAppContext>{
            Context: context, DefaultSPListProvider: this.DefaultSPListProvider
        };
        this.SampleWebPartWebPart = React.createElement(AppLayout, this._SampleWebPartWebPartProps);
    }
}
            
