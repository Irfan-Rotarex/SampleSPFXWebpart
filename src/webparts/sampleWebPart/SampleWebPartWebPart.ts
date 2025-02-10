import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SampleWebPartWebPartStrings';
import SampleWebPart from './components/SampleWebPart';
import { ISampleWebPartProps } from './components/ISampleWebPartProps';

//require for fabric ui data grid classes
require('datatables.net');
const $: any = require('jquery');
import { SPComponentLoader } from '@microsoft/sp-loader';
import { sp } from "@pnp/sp";
import { ISampleWebPartVM } from './components/ViewModel/ISampleWebPartVM';
import { SampleWebPartVM } from './components/ViewModel/SampleWebPartVM';
import { loadTheme } from '@fluentui/react';

export interface ISampleWebPartWebPartProps {
  description: string;
}

export default class SampleWebPartWebPart extends BaseClientSideWebPart<ISampleWebPartWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _SampleWebPartVM: ISampleWebPartVM;

  public render(): void {
    let dtCssUrl = "https://publiccdn.sharepointonline.com/rotarex.sharepoint.com/CDN/datatable/css/jquery.dataTables.min.css";
    SPComponentLoader.loadCss(dtCssUrl);
    //Set veriable as you defined in your app and use VM class from ViewModel folder 
    this._SampleWebPartVM = new SampleWebPartVM(this.context.pageContext);
    //Note that your webpart name would be different, use webpart that comes from VM object
    ReactDom.render(this._SampleWebPartVM.SampleWebPartWebPart, this.domElement);

    try {
    $('#workbenchPageContent').css("max-width", "100%");
    $('#CommentsWrapper').css("display", "none");
    $('[data-automation-id^="pageHeader"]').css("display", "none");
    $('#spLeftNav').css("display", "none");
    //$('#spCommandBar').css("display", "none");
    }
    catch (e) {
    console.log(e);
    }
}

 
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
        sp.setup({
            spfxContext: this.context as any
        });
        loadTheme({
            defaultFontStyle: { fontFamily: 'Oswald;OswaldLight;OswaldBold' }
        });
    });
}



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
