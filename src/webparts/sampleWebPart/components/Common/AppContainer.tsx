 
import { DefaultButton, Icon, Panel, PanelType, Stack } from "@fluentui/react";
import * as React from "react";
import styles from "../SampleWebPartApp.module.scss";
import FooterComponent from "./Footer";

function AppContainer({ children }) {
    const [__isOpen, __setIsOpen] = React.useState(true);
    const [__selectedTab, __setSelectedTab] = React.useState(window.location.hash.replace("#/", ''));
    return (

        <div className={styles.container}>
            <Icon iconName="GlobalNavButton" onClick={() => { __setIsOpen(!__isOpen); }}></Icon>
            <Stack horizontal gap={40}>
                <div style={{ marginTop: 46, width: 200, display: __isOpen ? 'block' : 'none' }}>
                    <DefaultButton className={styles.NavButton + ' ' + (__selectedTab == '' ? styles.NavButtonSelected : '')}
                        onClick={(e) => { window.location.href = '#/', __setSelectedTab(''), e.preventDefault(); }}
                    >HOME</DefaultButton>
                    <DefaultButton className={styles.NavButton + ' ' + (__selectedTab == 'Search' ? styles.NavButtonSelected : '')}
                        onClick={(e) => { window.location.href = '#/Search', __setSelectedTab('Search'), e.preventDefault(); }}
                    >SEARCH</DefaultButton>
                </div>
                <div style={{ minWidth: 800, minHeight: 600 }}>
                    {children}
                </div>
            </Stack>
            <FooterComponent></FooterComponent>
        </div>
    );
}

export default AppContainer;
            
