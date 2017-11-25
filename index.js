import React, {Component} from 'react'
import PropTypes from 'prop-types'

class StateComponent extends Component {
  state = this.props.state
  render() {
    return this.props.children({state: this.state, setState: this.setState})
  }
}

const getFirstKey = obj => Object.keys(obj)[0]

export class BoolState extends Component {
  constructor() {
    super()
    const {state, key, value} = this.props
    this.state = state || {[key || 'bool']: value || false}
  }
  toggle = () => {
    this.setState({
      [getFirstKey(this.state)]: !this.state[getFirstKey(this.state)],
    })
  }

  render() {
    const {render, children} = this.props
    const renderParameters = {state: this.state, toggle: this.toggle}
    return typeof render === 'function'
      ? render(renderParameters)
      : typeof children === 'function'
        ? children(renderParameters)
        : render || children
  }
}

const Example = () => {
  return (
    <BoolState state={{modalOpen: false}}>
      {({state: {modalOpen}, toggle}) => {
        return (
          <div>
            <button onClick={toggle}>Toggle Modal</button>
            <Modal isOpen={modalOpen} />
          </div>
        )
      }}
    </BoolState>
  )
}

class StateComponentContainer extends Component {
  constructor() {
    super()
  }
  render() {
    const renderProps = this.props.renderStateComponents.reduce(
      (acc, {component: Comp, props}) => {
        //TODO WIP
      },
    )
  }
}

const Example2 = () => {
  return (
    <StateComponentContainer
      renderStateComponents={[
        // <BoolState state={{open: false}} />,
        // <BoolState key={'loggedIn'} value={true}/>,
        {component: BoolState, props: {state: {open: false}}},
        {component: BoolState, props: {key: 'loggedIn', value: true}},
      ]}
    >
      {(
        [
          {state: {open}, toggle: toggleOpen},
          {state: {loggedIn}, toggle: toggleLogOut},
        ],
      ) => {
        //stuff with state from several state components
      }}
    </StateComponentContainer>
  )
}
