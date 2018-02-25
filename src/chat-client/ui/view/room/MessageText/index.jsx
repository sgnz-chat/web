import React  from "react"

import classNames from "chat-client/ui/view/room/MessageText/classNames"

export default ({
    className,
    ...props
}) =>
    <pre
        className={[className, classNames.Host].join(" ")}
        {...props}
    />