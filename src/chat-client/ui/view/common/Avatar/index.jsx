import React from "react"
import Image from "chat-client/ui/view/common/Image"

import classNames from "chat-client/ui/view/common/Avatar/classNames"

export default ({
    className,
    component = Image,
    Component = component,
    ...props
}) =>
    <Component
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
