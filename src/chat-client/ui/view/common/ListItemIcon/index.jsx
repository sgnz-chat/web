import React       from "react"
import FontAwesome from "chat-client/ui/view/common/FontAwesome"

import classNames from "chat-client/ui/view/common/ListItemIcon/classNames"

export default ({
    className,
    selected,
    ...props
}) =>
    <FontAwesome
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
