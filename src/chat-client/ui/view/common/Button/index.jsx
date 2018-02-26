import React  from "react"

import classNames from "chat-client/ui/view/common/Button/classNames"

export default ({
    className,
    color = "Blue",
    component = "span",
    onClick = e => undefined,
    Component = component,
    dense,
    disabled,
    type = "flat",
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host,
                disabled ? classNames.Disabled
              :            undefined,
                dense ? classNames.Dense
              :         "",
                type == "flat"   ? classNames.Flat
              : type == "raised" ? classNames.Raised
              :                    undefined,
              classNames[color]
            ].join(" ")
        }
        onClick={e => !disabled && onClick(e)}
        {...props}
    />
