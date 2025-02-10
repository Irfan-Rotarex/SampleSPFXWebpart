 
import { ISPListProvider } from "../Providers/ISPListProvider";
import { PageContext } from '@microsoft/sp-page-context';

export interface IAppContext {
    DefaultSPListProvider: ISPListProvider;
    Context: PageContext;
}
            
