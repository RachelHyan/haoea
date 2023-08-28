type ColumnPropsValueType = "string" | "number" | "enmu"

export declare type ColumnProps = {
	title: string
	dataIndex: string
	valueType: ColumnPropsValueType
	valueEnum?: (string | number | SelectOptionData | SelectOptionGroup)[]
	width?: number
	align?: 'left' | 'center' | 'right'
	search?: boolean
	hidden?: boolean
}

type ModalFormItemComponentType = "a-input" | "a-input-number" | "a-input-password" | "a-select" | "a-date-picker" | "a-description"

export declare type ModalFormItem = {
	field: string
	label: string
	componentType: ModalFormItemComponentType
	options?: (string | number | SelectOptionData | SelectOptionGroup)[]
	request?: Function
	mapping?: {
		label: string,
		value: string
	}
	defaultValue?: any
	placeholder?: string
	disabled?:boolean
}
