import React        from "react"
import bind         from "api-common/util/bind"
import * as roomApi from "api-common/api/room"
import * as userApi from "api-common/api/user"
import config       from "api-common/config"

export default class extends React.Component {

    componentWillMount() {
        this.setState()
    }

    componentDidMount() {
    }

    render() {
        const {
            tokenApi,
            render,
            ...props
        } = this.props

        const token = tokenApi.read()
        
        return render({
            databaseApi: {
                roomApi: bind(roomApi, {token}),
                userApi: bind(userApi, {
                    user: {
                        id: token && token.user.uid
                    },
                    token
                })
            },
            tokenApi,
            ...props
        })
    }
}
