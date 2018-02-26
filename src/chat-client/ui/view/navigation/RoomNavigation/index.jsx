import React            from "react"
import List             from "chat-client/ui/view/common/List"
import ListItem         from "chat-client/ui/view/common/ListItem"
import ListItemAvatar   from "chat-client/ui/view/common/ListItemAvatar"

import classNames from "chat-client/ui/view/navigation/RoomNavigation/classNames"

export default ({
    user,
    rooms,
    roomId,
    className,
    ...props
}) => {

    return (
        <List>
            {rooms && rooms.map(room => {
                const friend = room.type == "pair" && user.friends.find(x => room.id == x.roomId)

                return (
                    <ListItem
                        key={room.id}
                        to={`/rooms/${room.id}`}
                        selected={roomId == room.id}
                    >
                        <ListItemAvatar
                            src={
                                friend ? friend.avatarUrl
                              :          room.imageUrl
                            }
                        />
                        {
                            friend ? friend.displayName
                          :          room.name   
                        }
                    </ListItem>
                )
            })}
        </List>
    )
}
