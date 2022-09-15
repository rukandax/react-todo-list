import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import './index.scss'

/**
 * Define The Prop Types
 */
InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  block: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  'data-testid': PropTypes.string,
}

/**
 * Define The Prop Default Value
 */
InputField.defaultProps = {
  type: 'text',
  block: false,
  onChange: () => {},
  onSubmit: () => {},
  value: '',
  className: '',
  'data-testid': '',
}

/**
 * Input Field
 */
export default function InputField(props) {
  return (
    <div className={`component-input-field ${props.className}`}>
      <input
        type={props.type}
        value={props.value}
        onChange={(event) => {
          props.onChange(event)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            props.onSubmit(event)
          }
        }}
        placeholder=""
        className={ClassNames({
          block: props.block,
        })}
        data-testid={props['data-testid']}
      />
      {props.placeholder.length && <label>{props.placeholder}</label>}
    </div>
  )
}
