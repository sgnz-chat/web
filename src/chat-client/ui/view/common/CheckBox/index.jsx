import React from "react"

import classNames from "chat-client/ui/view/common/CheckBox/classNames"

export default ({
    className,
    component = "span",
    Component = component,
    selected = false,
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host,
                selected ? classNames.Selected
              :            undefined
            ].join(" ")
        }
        {...props}
    />
