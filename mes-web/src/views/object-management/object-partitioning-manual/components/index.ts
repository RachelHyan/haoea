import DrawTool from "./draw-tool.vue";
import GridForm from "./grid-form.vue";
import ObjectForm from "./object-form.vue";
import TablePanel from "./table-panel.vue";


export declare type FormModel = {
	title: string;
    dataIndex: string;
		valueType: "string" | "number" | "enum" | "date" | "daterange" | "datetime" | "datetimerange" | "slot";
    valueEnum?: {
        value: any;
        label: any;
    }[] | undefined;
    width?: number | undefined;
    minWidth?: number | undefined;
    align?: "left" | "right" | "center" | undefined;
    search?: boolean | undefined;
    hidden?: boolean | undefined;
    placeholder?: string | undefined;
    fixed?: string | undefined;
		multiple?: boolean | undefined;
		show?: boolean | undefined;
		disabled?: boolean | undefined;
}


export { DrawTool, GridForm, ObjectForm, TablePanel };

