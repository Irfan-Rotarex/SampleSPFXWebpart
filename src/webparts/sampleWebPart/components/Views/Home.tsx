 

import * as React from 'react';
import { Stack, MessageBarType, MessageBar, Spinner, Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, mergeStyleSets, TextField, IconButton } from '@fluentui/react';
import styles from "../SampleWebPartApp.module.scss";
import { PageContext } from "@microsoft/sp-page-context";
import { ISPListItem } from "../Models/ISPListItem";
import { ISPListProvider } from '../Providers/ISPListProvider';
import AppContext from '../Context/AppContext';
import LoadingComponent from '../Common/LoadingComponent';
import AppContainer from '../Common/AppContainer';
const $: any = require('jquery');

class Home extends React.Component {
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
        this.loadDefaultData();
    }

    public componentDidUpdate() {
        const table: any = $('table.tbdisplay');
        if (table.length > 0) {
            const dt = table.DataTable({
                searching: false,
                ordering: false,
                paging: false,
                "bInfo": false
            });
        }
    }

    public loadDefaultData() {
        this.setState({ screenName: 'Loading' });
        this.defaultSPListProvider.getListItems(this._list).then((items) => {
            this._items = items;
            this._items.push({ Id: -1, Title: '' });
            this.setState({ screenName: 'Default' });
        }).catch((error) => {
            this.showMessage("Error occured " + error.toString(), MessageBarType.error);
            this.setState({ screenName: 'Default' });
        });
    }

    private addItem(item: ISPListItem) {
        if (item.Id == -1) {
            this.defaultSPListProvider.addListItem(this._list, item).then((ret) => {
                this.loadDefaultData();
                this.showMessage("Record added successfully.", MessageBarType.success);
                this.setState({ screenName: 'Default' });
            }).catch((err) => {
                this.showMessage("Error occured " + err.toString(), MessageBarType.error);
                this.setState({ screenName: 'Default' });
            });
        }
        else {
            this.defaultSPListProvider.updateListItem(this._list, item).then((ret) => {
                this.loadDefaultData();
                this.showMessage("Record updated successfully.", MessageBarType.success);
                this.setState({ screenName: 'Default' });
            }).catch((err) => {
                this.showMessage("Error occured " + err.toString(), MessageBarType.error);
                this.setState({ screenName: 'Default' });
            });
        }
    }

    private deleteItem(item: ISPListItem) {
        this.showconfirmDialig(() => {
            this.showConfirm = false;
            this.setState({ screenName: 'Default' });
            if (item.Id != -1) {
                this.defaultSPListProvider.deleteListItem(this._list, item.Id).then((ret) => {
                    this.loadDefaultData();
                    this.showMessage("Record deleted successfully.", MessageBarType.success);
                    this.setState({ screenName: 'Default' });
                }).catch((err) => {
                    this.showMessage("Error occured " + err.toString(), MessageBarType.error);
                    this.setState({ screenName: 'Default' });
                });
            }
        });
    }

    public render() {
        try {
            const table: any = $('table.tbdisplay');
            if (table != null) {
                const dt = table.DataTable();
                if (dt != null) {
                    dt.destroy();
                }
            }
        } catch {

        }
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

        const __classNames = mergeStyleSets({
            deepSkyBlue: [{ color: 'deepskyblue' }]
        });

        switch (screenName) {
            case 'Default':
                return (
                    <AppContainer>
                        {MessageBarElement}
                        {confirmElement}
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl12">
                                <div className={styles.pageTitle}>HOME</div>
                                <div className={styles.smallTitle}>SharePoint List - Test</div>
                                <table id="tbdata" className="tbdisplay">
                                    <thead>
                                        <tr>
                                            <td style={{ maxWidth: '40px' }}></td>
                                            <td style={{ maxWidth: '200px' }}>
                                                Title
                                            </td>
                                            <td style={{ maxWidth: '60px' }}>
                                                Modified
                                            </td>
                                            <td style={{ maxWidth: '60px' }}>
                                                Modified By
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this._items.map((r) => {
                                                return <ItemDataRow key={r.Id} item={r} onSaveClick={this.addItem.bind(this, r)}
                                                    onDeleteClick={this.deleteItem.bind(this, r)} classNames={__classNames}></ItemDataRow>;
                                            })
                                        }
                                    </tbody>
                                </table>
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

        function ItemDataRow({ item, classNames, onSaveClick, onDeleteClick }) {
            const [__Editing, __setEditing] = React.useState(false);
            const __titleFld = __Editing ? <TextField
                onChange={(ev, t) => {
                    item.Title = t;
                }}
                value={item.Title}></TextField> : item.Title;
            const __iconName: string = item.Id == -1 ? 'CircleAdditionSolid' : 'EditSolid12';
            let __modifiedDate: string = '';
            if (item.Modified != null) {
                __modifiedDate = (new Date(item.Modified.toString())).toLocaleDateString('uk');
            }
            const __deleteIcon = item.Id == -1 ? null : <IconButton iconProps={{ iconName: 'Delete', className: classNames.deepSkyBlue }} title="Delete" ariaLabel="Delete"
                onClick={(ev) => {
                    onDeleteClick();
                }} />;

            return (
                <tr key={item.Id}>
                    <td style={{ maxWidth: '54px' }}>
                        <Stack horizontal>
                            <div className={styles.rowIndicatorOnSave}></div>
                            <IconButton iconProps={{ iconName: __Editing ? 'Save' : __iconName, className: classNames.deepSkyBlue }} title="Edit" ariaLabel="Edit"
                                onClick={(ev) => {
                                    __setEditing(!__Editing);
                                    if (__Editing == true && item.Title != '') {
                                        const el = (ev as any).currentTarget.parentElement.parentElement.parentElement.children[0].children[0].children[0];
                                        el.setAttribute('style', "background:none");
                                        onSaveClick();
                                        el.setAttribute('style', "background:lightgreen");
                                    }
                                }} />
                            {__deleteIcon}
                        </Stack>
                    </td>
                    <td>{__titleFld}</td>
                    <td style={{ maxWidth: '100px' }}>{__modifiedDate}</td>
                    <td style={{ maxWidth: '100px' }}>{item.ModifiedBy}</td>
                </tr>
            );
        }
    }
}

Home.contextType = AppContext;

export default Home;
            
