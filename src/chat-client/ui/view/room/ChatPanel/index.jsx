import React       from "react"
import List        from "chat-client/ui/view/common/List"
import ListItem    from "chat-client/ui/view/common/ListItem"

import classNames from "chat-client/ui/view/room/ChatPanel/classNames"

export default ({
    className,
    ...props
}) =>
    <div
        className={[className, classNames.Host].join(" ")}
        {...props}
    >
        <textarea></textarea>
    </div>
