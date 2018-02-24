import React  from "react"
import Avatar from "chat-client/ui/view/common/Avatar"

import classNames from "chat-client/ui/view/common/ListItemAvatar/classNames"

export default ({
    className,
    selected,
    ...props
}) =>
    <Avatar
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
