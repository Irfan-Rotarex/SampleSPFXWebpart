 
import * as React from "react";
import styles from "../SampleWebPartApp.module.scss";

function FooterComponent() {
    return (
        <div style={{ marginTop: '20px' }}>
            <footer className={styles.Footer + ' ms-Grid'}>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12">
                        <span>Terms &amp; Conditions / Privacy / Sitemap</span>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-md12">
                        <span>© 2019 Rotarex. All rights reserved. Group Headquarters - 24 rue de Diekirch, L7440 LINTGEN Luxembourg</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default FooterComponent;
            
