import React   from "react"
import Avatar  from "chat-client/ui/view/common/Avatar"
import Message from "chat-client/ui/view/room/Message"

import classNames from "chat-client/ui/view/room/AvatarMessage/classNames"

export default ({
    children,
    avatarUrl,
    position = "left", // left or rignt
    className,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.Host,
                position == "left" ? classNames.Left
            :                        classNames.Right
            ].join(" ")
        }
        {...props}
    >
        {avatarUrl && position == "left" &&
            <Avatar
                className={classNames.Avatar}
                src={avatarUrl}
            />
        }
        {React.cloneElement(
            children,
            {
                position,
                ...children.props
            }
        )}
        {avatarUrl && position == "right" &&
            <Avatar
                className={classNames.Avatar}
                src={avatarUrl}
            />
        }
    </div>
