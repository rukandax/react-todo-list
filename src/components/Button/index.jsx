import PropTypes from 'prop-types'

import './index.scss'

/**
 * Define The Prop Types
 */
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  'data-testid': PropTypes.string,
}

/**
 * Define The Prop Default Value
 */
Button.defaultProps = {
  type: 'button',
  onClick: () => {},
  className: '',
  'data-testid': '',
}

/**
 * TODO List
 */
export default function Button(props) {
  return (
    <button
      className={`component-button ${props.className}`}
      type={props.type}
      onClick={(event) => {
        props.onClick(event)
      }}
      data-testid={props['data-testid']}
    >
      {props.children}
    </button>
  )
}
