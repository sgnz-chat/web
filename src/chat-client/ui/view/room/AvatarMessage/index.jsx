import React   from "react"
import Avatar  from "chat-client/ui/view/common/Avatar"

import classNames from "chat-client/ui/view/room/AvatarMessage/classNames"

export default ({
    avatarUrl,
    children,
    className,
    name,
    position = "left", // left or rignt
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
        <div
            className={classNames.TextContent}
        >
            <div>
                {name}
            </div>
            {React.cloneElement(
                children,
                {
                    position,
                    ...children.props
                }
            )}
        </div>
        {avatarUrl && position == "right" &&
            <Avatar
                className={classNames.Avatar}
                src={avatarUrl}
            />
        }
    </div>
