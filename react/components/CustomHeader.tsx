import type { FunctionComponent } from 'react'
import React, { useEffect, useState } from 'react'
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

const HIDDEN_PAGES = [
  'store.orderplaced',
  'store.account',
  'store.custom#paynow',
  // Add more page to hide header
]

const CustomHeader: FunctionComponent = () => {
  const runtime = useRuntime()
  const currentPage = runtime.page
  const shouldHideHeader = HIDDEN_PAGES.includes(currentPage)
  const [isHidden, setIsHidden] = useState(shouldHideHeader ?? false)
  const { isMobile } = useDevice()

  useEffect(() => {
    if (shouldHideHeader) {
      const checkCookie = () => {
        const cookies = document.cookie.split(';')
        const isAppCookie = cookies.some((cookie) =>
          cookie.trim().startsWith('is_app=true')
        )

        setIsHidden(isAppCookie)
      }

      checkCookie()
    } else {
      setIsHidden(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ display: isHidden ? 'none' : 'block' }}>
      <CustomHeaderLayout device={isMobile ? Device.mobile : Device.desktop} />
    </div>
  )
}

export default CustomHeader
