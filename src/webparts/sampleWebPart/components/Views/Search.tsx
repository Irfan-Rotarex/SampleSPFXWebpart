 
import * as React from 'react';
import { Stack, MessageBarType, MessageBar, Spinner, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, mergeStyleSets, TextField, IconButton, IBreadcrumbItem, Breadcrumb } from '@fluentui/react';
import styles from "../SampleWebPartApp.module.scss";
import { PageContext } from "@microsoft/sp-page-context";
import { ISPListItem } from "../Models/ISPListItem";
import { ISPListProvider } from '../Providers/ISPListProvider';
import AppContext from '../Context/AppContext';
import LoadingComponent from '../Common/LoadingComponent';
import AppContainer from '../Common/AppContainer';
const $: any = require('jquery');

class Search extends React.Component {
    public defaultSPListProvider: ISPListProvider;
    private showMessageBar: boolean = false;
    private message: string = '';
    private messageType: MessageBarType;
    private showConfirm: boolean = false;
    private _confirmOKClick;
    private pageContext: PageContext;
    private _list = 'Test';
    private _items: ISPListItem[] = [];
    public constructor(props, context) {
        super(props, context);
        this.defaultSPListProvider = context.DefaultSPListProvider;
        this.pageContext = context.Context;
    }

    public showMessage(message: string, messageType: MessageBarType) {
        this.showMessageBar = true;
        this.message = message;
        this.messageType = messageType;
    }

    public showconfirmDialig(handleOkClick) {
        this.showConfirm = true;
        this.setState({ screenName: 'Default' });
        this._confirmOKClick = handleOkClick;
    }

    public componentDidMount() {
        this.setState({ screenName: 'Default' });
    }

    public render() {
        let screenName: string = "Loading";
        if (this.state != null)
            screenName = (this.state as any).screenName;

        let MessageBarElement: JSX.Element;
        if (this.showMessageBar) {
            MessageBarElement = <MessageBar messageBarType={this.messageType} dismissButtonAriaLabel="Close"
                onDismiss={() => {
                    this.showMessageBar = false;
                    this.setState({ screenName: 'Default' });
                }}>{this.message}</MessageBar>;
        } else {
            MessageBarElement = <div></div>;
        }

        let confirmElement: JSX.Element;
        if (this.showConfirm) {
            confirmElement = <div><Dialog
                hidden={!this.showConfirm}
                onDismiss={() => {
                    this.showConfirm = false;
                    this.setState({ screenName: 'Default' });
                }}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Delete',
                    subText: 'Do you want to delete this item?'
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { main: { maxWidth: 450 } }
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={this._confirmOKClick} text="Delete" />
                    <DefaultButton onClick={() => {
                        this.showConfirm = false;
                        this.setState({ screenName: 'Default' });
                    }} text="Don't delete" />
                </DialogFooter>
            </Dialog></div>;
        }
        else {
            confirmElement = <div></div>;
        }

        const __itemsWithHeading: IBreadcrumbItem[] = [
            { text: 'Home', key: 'Home', href: '#/' },
            { text: 'Search', key: 'Search', isCurrentItem: true }
        ];

        switch (screenName) {
            case 'Default':
                return (
                    <AppContainer>
                        {MessageBarElement}
                        {confirmElement}
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12">
                                <div className={styles.pageTitle}>Search</div>
                                <div className={styles.smallTitle}>Search List Item</div>
                                <Breadcrumb
                                    items={__itemsWithHeading}
                                    ariaLabel="Nav Menu"
                                />
                            </div>
                        </div>
                    </AppContainer >
                );
            case 'Loading':
                return (
                    <AppContainer>
                        <LoadingComponent></LoadingComponent>
                    </AppContainer>
                );
                break;
            default:
                return (
                    <AppContainer>
                        <LoadingComponent></LoadingComponent>
                    </AppContainer>
                );
        }

    }
}

Search.contextType = AppContext;

export default Search;            
            
