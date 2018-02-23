export default ({
    location,
    locationDescriptor
}) => {
    let {
        pathname = "",
        search = ""
    } = (
        locationDescriptor instanceof Object ? locationDescriptor
      :                                        {pathname: locationDescriptor}
    )

    return (
        pathname == location.pathname
     && search == location.search
    )
}
