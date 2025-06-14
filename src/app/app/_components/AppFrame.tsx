import { useState } from "react";

import {
    ActionList,
    TopBar
} from "@shopify/polaris";

function AppFrame() {

    // ---------------------------------------------
    // Logo
    // ---------------------------------------------
    const logo_config = {
        width: 86
    };

    // ---------------------------------------------
    // User Menu
    // ---------------------------------------------
    const userMenu_config = {};

    const userMenu_markup = (
        <TopBar.UserMenu
            actions={[]}
    );

    const userMenu = {
        markup: userMenu_markup,
    }
    return null;
}