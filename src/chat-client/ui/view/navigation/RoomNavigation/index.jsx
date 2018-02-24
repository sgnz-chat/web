import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"

import classNames from "chat-client/ui/view/navigation/RoomNavigation/classNames"

export default ({
    user,
    className,
    ...props
}) =>
    <List>
        {user.rooms && user.rooms.map(x => 
            <div>{room.name}</div>
        )}
    </List>
