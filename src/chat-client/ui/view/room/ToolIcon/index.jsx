import React       from "react"
import FontAwesome from "chat-client/ui/view/common/FontAwesome"

import classNames from "chat-client/ui/view/room/ToolIcon/classNames"

export default ({
    className,
    ...props
}) =>
    <FontAwesome
        className={[className, classNames.Host].join(" ")}
        {...props}
    />
