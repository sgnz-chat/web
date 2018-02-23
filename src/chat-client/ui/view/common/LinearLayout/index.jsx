import React        from "react"

import classNames from "chat-client/ui/view/common/LinearLayout"

export default ({
    className,
    component = "div",
    Compoenent = component,
    orientation = "vertical",
    ...props
}) =>
    <Compoenent
        className={
            [
                className,
                classNames.Host,
                orientation == "vertical"   ? classNames.Vertical
              : orientation == "horizontal" ? classNames.Horizontal
              :                               undefined
            ].join(" ")
        }
        {...props}
    />
