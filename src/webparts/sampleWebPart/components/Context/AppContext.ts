 
import * as React from 'react';
import { IAppContext } from '../Context/IAppContext';

const defaultValue: IAppContext = {} as IAppContext;
const AppContext = React.createContext(defaultValue);
export const UserProvider = AppContext.Provider;
export const UserConsumer = AppContext.Consumer;

export default AppContext;
            
