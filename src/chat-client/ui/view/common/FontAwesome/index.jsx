import React from "react"

import classNames from "chat-client/ui/view/common/FontAwesome/classNames"

export default ({
    className,
    component = "span",
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
