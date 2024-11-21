import {
  Checkbox,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Radio,
  RadioGroupProps,
  Select,
  SelectProps,
  TimePicker,
  TimePickerProps
} from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
import TextArea, { TextAreaProps } from 'antd/es/input/TextArea'
import { DefaultOptionType } from 'antd/es/select'
import { ComponentType, FocusEvent, Ref, memo, useCallback, useMemo } from 'react'
import { Control, FieldValues, UseControllerProps, useController } from 'react-hook-form'

const numberRegex = /^-?\d*(\.\d*)?$/

type InputType =
  | 'input'
  | 'select'
  | 'datePicker'
  | 'timePicker'
  | 'checkbox'
  | 'radioGroup'
  | 'checkboxGroup'
  | 'number'
  | 'textArea'

const components: Record<InputType, ComponentType<any>> = {
  input: Input,
  select: Select,
  datePicker: DatePicker,
  timePicker: TimePicker,
  checkbox: Checkbox,
  checkboxGroup: Checkbox.Group,
  radioGroup: Radio.Group,
  number: Input,
  textArea: TextArea
}

type InputTypePropsMap = {
  input: InputProps
  select: SelectProps
  datePicker: DatePickerProps
  timePicker: TimePickerProps
  checkbox: CheckboxProps
  checkboxGroup: CheckboxGroupProps
  radioGroup: RadioGroupProps
  number: InputProps
  textArea: TextAreaProps
}

type RefType = {
  /** Reference to the input element, preferred for handling refs. */
  inputRef?: Ref<any>

  /** @deprecated Please use `inputRef` instead of `ref` due to `forwardRef` limitations */
  ref?: `Use "inputRef" instead`
}

/** This type does not require control */
export type OmitControlControlledInputProps<FV extends FieldValues> = Omit<FormItemProps, 'rules' | 'name'> &
  UseControllerProps<FV> &
  {
    [K in keyof InputTypePropsMap]: {
      inputType: K
      inputProps?: InputTypePropsMap[K]
    }
  }[keyof InputTypePropsMap] &
  RefType

type ControlledInputProps<FV extends FieldValues> = OmitControlControlledInputProps<FV> & { control: Control<FV> }

const ControlledInput = <FV extends FieldValues>(props: ControlledInputProps<FV>) => {
  const { name, rules, control, inputRef, inputType, inputProps, ...rest } = props

  const {
    field,
    fieldState: { error }
  } = useController({ name, control, rules })

  const Component = useMemo(() => components[inputType], [inputType])

  const handleChange = useCallback(
    (arg0: any, arg1: (DefaultOptionType | DefaultOptionType[]) & (string | string[])) => {
      if (inputType !== 'number') {
        inputProps?.onChange?.(arg0, arg1)
        field.onChange(arg0, arg1)

        return
      }

      const { value: inputValue } = arg0.target

      if (numberRegex.test(inputValue) || inputValue === '' || inputValue === '-') {
        inputProps?.onChange?.(inputValue)
        field.onChange(inputValue)
      }
    },
    [inputType, inputProps, field]
  )

  const handleBlur = useCallback(
    (arg0: FocusEvent<HTMLElement, Element> & FocusEvent<HTMLInputElement, Element>, info: any) => {
      if (inputType !== 'checkboxGroup' && inputType !== 'textArea') {
        inputProps?.onBlur?.(arg0, info)
      }
      field.onBlur()
    },
    [inputType, field, inputProps]
  )

  const requiredRule = useMemo(() => !!rules?.required, [rules])

  return (
    <Form.Item {...rest} help={error?.message} required={requiredRule} validateStatus={error ? 'error' : ''}>
      <Component
        checked={field.value}
        {...rest}
        {...inputProps}
        {...field}
        ref={inputRef}
        onBlur={handleBlur}
        onChange={handleChange}
        value={field.value ?? ''}
      />
    </Form.Item>
  )
}

export default memo(ControlledInput)
