 
import { Spinner, Stack } from "@fluentui/react";
import * as React from "react";
import styles from "../SampleWebPartApp.module.scss";

function LoadingComponent() {
    return (
        <div className={styles.container}>
            <Stack>
                <div>
                    <Spinner label="Loading...Please wait." />
                </div>
            </Stack>
        </div>
    );
}

export default LoadingComponent;
            
