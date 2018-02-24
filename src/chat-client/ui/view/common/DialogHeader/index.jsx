import React from "react"

import classNames from "chat-client/ui/view/common/DialogHeader/classNames"

export default ({
    className,
    component = "div",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
