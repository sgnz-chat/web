import React from "react"

import classNames from "chat-client/ui/view/common/TextField/classNames"

export default class extends React.Component {
    componentWillMount() {
        this.setState({
            empty  : undefined,
            focused: false,
            invalid: false
        })
    }

    render() {
        let {
            className,
            disabled,
            helperText,
            hintText,
            labelText,
            multiLine,
            component = (
                multiLine ? "textarea"
              :             "input"
            ),
            Component = component,
            name,
            id = name,
            onBlur = e => undefined,
            onFocus = e => undefined,
            placeholder = hintText,
            required,
            value,
            defaultValue,
            ...props
        } = this.props

        return (
            <div
                className={
                    [
                        classNames.Host,
                        this.state.empty == true  ? classNames.Empty
                      : this.state.empty == false ? undefined
                      : value                     ? undefined
                      : defaultValue              ? undefined
                      :                             classNames.Empty,
                        this.state.focused ? classNames.Focused
                      :                      undefined,
                        this.state.invalid ? classNames.Invalid
                      :                      undefined,
                        disabled ? classNames.Disabled
                      :            undefined,
                        required ? classNames.Required
                      :            undefined
                    ].join(" ")
                }
            >
                <label
                    className={classNames.Label}
                    htmlFor={id}
                >
                    <span
                        className={classNames.LabelText}
                    >
                        {labelText}
                    </span>
                    <span
                        className={classNames.DummyLabelText}
                    >
                        {labelText}
                    </span>
                </label>
                <Component
                    className={[className, classNames.InputText].join(" ")}
                    disabled={disabled}
                    id={id}
                    name={name}
                    onBlur={e => {
                        onBlur(e)

                        this.setState({
                            empty  : e.target.value.length == 0,
                            focused: false,
                            invalid: !e.target.validity.valid
                        })
                    }}
                    onFocus={e => {
                        onFocus(e)

                        this.setState({
                            focused: true
                        })
                    }}
                    placeholder={(
                        this.state.focused ? placeholder
                      : labelText          ? ""
                      :                      placeholder
                    )}
                    required={required}
                    value={value}
                    defaultValue={defaultValue}
                    {...props}
                />
                <span
                    className={classNames.HelperText}
                >
                    {helperText}
                </span>
            </div>
        )
    }
}
