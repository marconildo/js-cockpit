// external imports
import React from 'react'
import { component } from 'js-react-utils'
import { Dropdown, Label } from 'office-ui-fabric-react'

// derived imports
const { useCallback, useRef, useState } = React

// --- LoginFormDropdown --------------------------------------------

const LoginFormDropdown = component({
  displayName: 'LoginFormDropdownField',
  memoize: true,
  render: LoginFormDropdownView
})

// --- locals -------------------------------------------------------

type LoginFormDropdownProps = {
  name: string,
  label: string,
  options: { value: string, text: string }[],
  defaultValue?: string,
  disabled?: boolean,
  forceValidation?: boolean,

  onValueChanged?: (ev: {
    type: 'valueChanged',
    value: string,
    name: string
  }) => void
}

function LoginFormDropdownView({
  name,
  label,
  options,
  defaultValue = '',
  disabled = false,
  forceValidation = false,
  onValueChanged
}: LoginFormDropdownProps) {
  const
    [value, setValue] = useState(defaultValue),
    [errorMsg, setErrorMsg] = useState(''),
    valueChangedRef = useRef(false),

    validate = useCallback(() => {
      const msg = value.length === 0
        ? `Please enter field "${label}"`
        : ''

      if (msg !== errorMsg) {
        setErrorMsg(msg)
      }
    }, [value, label, errorMsg]),

    onChange = useCallback((ev: any) => {
      const newValue = ev.target.value

      setValue(newValue)
      valueChangedRef.current = true,
      setErrorMsg('')

      if (onValueChanged) {
        onValueChanged({
          type: 'valueChanged',
          value: newValue,
          name
        })
      }
    }, [name]),

    onEnter = useCallback((ev: any) => {
      if (!ev.keyCode || ev.keyCode === 13) {
        if (valueChangedRef.current) {
          validate()
          valueChangedRef.current = false
        }
      }
    }, [value])

  if (forceValidation) {
    validate()
  }

  return (
    <div>
      <div>
        <Label disabled={disabled}>{label}</Label>
      </div>
      <Dropdown
        selectedKey={value}
        disabled={disabled}
        errorMessage={errorMsg}

        options={
          options.map(({ value, text }) => ({
            key: value,
            text: text
          }))
        }

        onChange={onChange}
        onBlur={onEnter}
        onKeyDown={onEnter}
      />
    </div>
  )
}

// --- exports ------------------------------------------------------

export default LoginFormDropdown
