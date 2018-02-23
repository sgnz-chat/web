import React       from "react"

import classNames from "chat-client/ui/view/navigation/SubNavigation/classNames"

export default ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
