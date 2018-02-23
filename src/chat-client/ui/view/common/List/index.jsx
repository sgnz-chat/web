import React        from "react"
import LinearLayout from "chat-client/ui/view/common/LinearLayout"

import classNames from "chat-client/ui/view/common/List/classNames"

export default ({
    children,
    className,
    location,
    orientation = "vertical",
    ...props
}) =>
    <LinearLayout
        className={
            [
                className,
                classNames.Host,
                orientation == "vertical"   ? classNames.Vertical
              : orientation == "horizontal" ? classNames.Horizontal
              :                               undefined
            ].join(" ")
        }
        orientation={orientation}
        {...props}
    >
        {React.Children.toArray(children).map(
            x => React.cloneElement(
                x,
                {
                    location: location
                }
            )
        )}
    </LinearLayout>
