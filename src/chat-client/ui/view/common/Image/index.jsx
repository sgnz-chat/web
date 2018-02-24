import React    from "react"
import ReactDOM from "react-dom"

import classNames from "chat-client/ui/view/common/Image/classNames"

export default ({
    className,
    alt,
    crossOrigin,
    height,
    onLoad,
    sizes,
    src,
    srcSet,
    style,
    width,
    ...props
}) =>
    <span
        className={[className, classNames.Host].join(" ")}
        style={{
            backgroundImage   : (src ? "url(" + src + ")," : "")
                              + "linear-gradient(45deg, #fcfcfc 25%, transparent 25%, transparent 75%, #fcfcfc 75%, #fcfcfc),"
                              + "linear-gradient(45deg, #fcfcfc 25%, transparent 25%, transparent 75%, #fcfcfc 75%, #fcfcfc)",
            backgroundSize    : (src ? "contain," : "")
                              + "12.5px 12.5px,"
                              + "12.5px 12.5px",
            backgroundPosition: (src ? "center," : "")
                              + "0 0,"
                              + "6.25px 6.25px",
            backgroundRepeat  : (src ? "no-repeat," : "")
                              + "repeat,"
                              + "repeat",
            width             : width != undefined ? width + "px"
                              :                      undefined,
            height            : height != undefined ? height + "px"
                              :                       undefined,
            ...style
        }}
        {...props}
    >
        <img
            alt={alt}
            crossOrigin={crossOrigin}
            height={height}
            onLoad={onLoad}
            sizes={sizes}
            src={src}
            srcSet={srcSet}
            width={width}
        />
    </span>