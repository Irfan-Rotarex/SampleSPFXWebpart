 
import { ReactElement } from 'react';
import { PageContext } from '@microsoft/sp-page-context';
import { ISPListProvider } from '../Providers/ISPListProvider';
import { IAppContext } from '../Context/IAppContext';

export interface ISampleWebPartVM {
    DefaultSPListProvider: ISPListProvider;
    SampleWebPartWebPart: ReactElement<IAppContext>;
}
            
