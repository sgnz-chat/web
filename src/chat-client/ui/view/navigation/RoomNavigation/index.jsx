import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import SubNavigation    from "chat-client/ui/view/navigation/SubNavigation"

import classNames from "chat-client/ui/view/navigation/RoomNavigation/classNames"

export default ({
    className,
    ...props
}) =>
    <List>
        <ListItem>test</ListItem>
        <ListItem>test</ListItem>
        <ListItem>test</ListItem>
    </List>