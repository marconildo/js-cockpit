import ControlCenterRenderer from '../../../renderers/control-center/ControlCenterRenderer'
import React, { ReactElement, ReactNode } from 'react'
import { defineComponent, isElement, isElementOfType, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'

// --- ControlCenter ------------------------------------------------

type ControlCenterProps = {
  vendor?: string,
  title: string,
  logo?: ReactElement<any>,
  children?: ReactElement<LoginProps | AppsProps>
}

const ControlCenter = defineComponent<ControlCenterProps>({
  displayName: 'ControlCenter',

  properties: {
    vendor: {
      type: String
    },

    title: {
      type: String,
      required: true
    },

    logo: {
      type: Object,
      validate: isElement
    },

    children: {
      validate:
        withChildren(
          Spec.all(Spec.lazy(() => isElementOfType([Login, Apps])))
        )
    }
  },

  base: class extends React.PureComponent<ControlCenterProps> {
    private __controlCenterModel: ControlCenterModel = null
    private __controlCenterModelSource: ControlCenterProps = null

    constructor(props: ControlCenterProps) {
      super(props)
    }

    render() {
      this.__prepareModel()

      return ControlCenterRenderer.render(this.__controlCenterModel)
    }

    private __prepareModel() {
      const props = this.props

      if (this.__controlCenterModelSource !== props) {
        this.__controlCenterModel = this.__getControlCenterModel(props)
        this.__controlCenterModelSource = props
      }
    }

    private __getControlCenterModel(props: ControlCenterProps): ControlCenterModel {
      const ret: ControlCenterModel = {
        vendor: props.vendor || null,
        title: props.title,
        logo: props.logo || null,

        login: {
          enabled: false
        },

        apps: []
      }

      React.Children.forEach(props.children, (child: any) => {
        // TODO
      })

      return ret
    }
  }
})

// --- ControlCenter.Login ------------------------------------------

type LoginProps = {
}

const Login = defineComponent<LoginProps>({
  displayName: 'ControlCenter.Login',

  render() {
    throw new Error(
      'Components of type ControlCenter.Login must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.Apps -------------------------------------------

type AppsProps = {
  children: ReactNode
}

const Apps = defineComponent({
  displayName: 'ControlCenter.Apps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType(App))))
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.Login must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- ControlCenter.App --------------------------------------------

type AppProps = {
  title: string,
  description?: string
}

const App = defineComponent<any>({
  displayName: 'ControlCenter.App',

  properties: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    }
  },

  render() {
    throw new Error(
      'Components of type ControlCenter.App must be children of '
        + 'ControlCenter components'
    )
  }
})

// --- models -------------------------------------------------------

type LoginModel = {
  enabled: boolean
}

type AppModel = {
  name: string,
  title: string,
  description: string | null
}

type ControlCenterModel = {
  vendor: string | null,
  title: string,
  logo: ReactElement<any>,
  
  login: {
    enabled: boolean
  },

  apps: AppModel[]
}

// --- exports ------------------------------------------------------

export default Object.assign(ControlCenter, {
  Login,
  Apps,
  App
})

export {
  ControlCenterModel
}