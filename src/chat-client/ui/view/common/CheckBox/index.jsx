import React from "react"

import classNames from "chat-client/ui/view/common/CheckBox/classNames"

export default ({
    className,
    component = "span",
    Component = component,
    isSelect = false,
    ...props
}) =>
    <Component
        className={
            [
                className,
                classNames.Host,
                isSelect ? classNames.Selected
              :            undefined
            ].join(" ")
        }
        {...props}
    />
