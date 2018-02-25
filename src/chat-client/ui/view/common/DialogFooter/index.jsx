import React        from "react"
import LinearLayout from "chat-client/ui/view/common/LinearLayout"

import classNames from "chat-client/ui/view/common/DialogFooter/classNames"

export default ({
    className,
    ...props
}) =>
    <LinearLayout
        className={[className, classNames.Host].join(" ")}
        component="div"
        orientation="horizontal"
        {...props}
    />
