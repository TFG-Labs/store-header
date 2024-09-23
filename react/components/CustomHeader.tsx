import { FunctionComponent, useEffect, useState } from 'react'
import React from 'react'
import { Block, useRuntime } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'



const enum Device {
  mobile = 'mobile',
  desktop = 'desktop',
}

const CustomHeaderLayout = React.memo(({ device }: { device: Device }) => {
  switch (device) {
    case Device.mobile:
      return (
        <>
          <Block id="header-layout.mobile" />
          <Block id="unstable--header-layout.mobile" />
        </>
      )

    case Device.desktop:
    // falls through

    default:
      return (
        <>
          <Block id="header-layout.desktop" />
          <Block id="unstable--header-layout.desktop" />
        </>
      )
  }
})

CustomHeaderLayout.displayName = 'CustomHeaderLayout'

const CustomHeader: FunctionComponent = () => {
  const runtime = useRuntime()
  const currentPage = runtime.page
  const isOrderPlacedPage = currentPage === 'store.orderplaced'
  const [isHidden, setIsHidden] = useState(isOrderPlacedPage)
  const { isMobile } = useDevice()


  useEffect(() => {
    if (isOrderPlacedPage) {
      const checkCookie = () => {
        const cookies = document.cookie.split(';')
        const isAppCookie = cookies.some(cookie => cookie.trim().startsWith('is_app=true'))
        setIsHidden(isAppCookie)
      }
      checkCookie()
    } else {
      setIsHidden(false)
    }
  }, [isOrderPlacedPage])

  return (
    <div style={{ display: isHidden ? 'none' : 'block' }}>
      <CustomHeaderLayout device={isMobile ? Device.mobile : Device.desktop} />
    </div>
  )
}

export default CustomHeader