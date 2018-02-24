import React  from "react"
import Avatar from "chat-client/ui/view/common/Avatar"

import classNames from "chat-client/ui/view/room/Message/classNames"

export default ({
    position = "left", // left or rignt
    text,
    balloonColor = "#f6f6f6",
    messageColor = "black",
    className,
    ...props
}) =>
    <div
        className={
            [
                className,
                classNames.ArrowBox,
                position == "left" ? classNames.Left
              :                      classNames.Right
            ].join(" ")
        }
        style={{
            backgroundColor: balloonColor
        }}
    >
        <pre
            className={classNames.Text}
            style={{
                color: messageColor,
            }}
            {...props}
        >
            {text}
        </pre>
    </div>
