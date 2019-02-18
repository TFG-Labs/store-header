import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Adopt } from 'react-adopt'
import { ExtensionPoint } from 'vtex.render-runtime'
import { Button } from 'vtex.styleguide'
import classNames from 'classnames'
import useDevice from '../hooks/useDevice'
import { icons } from '../defaults'

import styles from '../store-header.css'

/**
 * Represents the search bar of the header
 * @param {Function} onCancel - Callback function on cancel
 * @param {String} iconClasses - classes for icons
 */
const SearchBar = ({ onCancel, iconClasses }) => {
  const { mobile, desktop } = useDevice()

  const searchBarClassNames = classNames(
    `${styles.topMenuSearchBar} flex pa2-m flex-grow-1`,
    {
      'justify-between': mobile,
      'justify-center': desktop,
    }
  )

  const cancelClassNames = classNames(`${iconClasses} ttl`)

  return (
    <div className={searchBarClassNames}>
      <div className="w-75">
        <Adopt
          mapper={{
            placeholder: <FormattedMessage id="header.search-placeholder" />,
            emptyPlaceholder: (
              <FormattedMessage id="header.search-emptyPlaceholder" />
            ),
          }}
        >
          {({ placeholder, emptyPlaceholder }) => (
            <ExtensionPoint
              id="search-bar"
              placeholder={placeholder}
              emptyPlaceholder={emptyPlaceholder}
              autoFocus={mobile}
              hasIconLeft={mobile}
              iconClasses={iconClasses}
            />
          )}
        </Adopt>
      </div>
      {mobile && (
        <div className="w-25 pa2-m pt2-s">
          <Button size="small" variation="tertiary" onClick={onCancel}>
            <span className={cancelClassNames}>
              <FormattedMessage id="header.search-cancel" />
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  /** Callback function on cancel */
  onCancel: PropTypes.func,
  ...icons.propTypes,
}

SearchBar.defaultProps = {
  onCancel: () => {},
  ...icons.defaultProps,
}

export default SearchBar
