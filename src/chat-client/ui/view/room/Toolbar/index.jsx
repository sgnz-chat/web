import React               from "react"

import classNames from "chat-client/ui/view/room/Toolbar/classNames"

export default ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
