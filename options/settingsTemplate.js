const settingsTemplate = {
    0: {
        text: "Use Minified",
        options: ["No", "Yes"],
        localStorage: "showMinified",
        type: "Bool"
    },
    1: {
        text: "Show Enemies",
        options: ["No", "Yes"],
        localStorage: "showEnemies",
        type: "Bool"
    },
    2: {
        text: "Show Party",
        options: ["No", "Yes"],
        localStorage: "showParty",
        type: "Bool"
    },
    3: {
        text: "Overlay Scale",
        options: ["0.5", "1.0", "1.5", "2.0","2.5","3.0"],
        appendText: "x",
        localStorage: "scaleFactor",
        type: "Float"
    },
    4: {
        text: "Menu Type",
        options: ["1", "2", "3", "4", "5"],
        localStorage: "menuType",
        type: "Int"
    },
    5: {
        text: "Show Sidebar",
        options: ["No", "Yes"],
        localStorage: "showSidebar",
        type: "Bool"
    },
    6: {
        text: "Sidebar Position",
        options: ["Left", "Right" /*,"Top", "Bottom"*/],
        localStorage: "sidebarPosition",
        type: "String"
    }
};

export default settingsTemplate;