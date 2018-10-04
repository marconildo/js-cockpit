import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { defineComponent, isElementOfType, isNode, withChildren } from 'js-react-utils'
import { Spec } from 'js-spec'
import ActionEvent from '../../events/ActionEvent'
import AppsWithMenuRenderer from '../../../renderers/AppsWithMenu/AppsWithMenuRenderer'

// --- AppsWithMenu.App --------------------------------------------

type AppProps = {
  title: string,
  name: string,
  children?: ReactNode
}

const App = defineComponent<AppProps>({
  displayName: 'AppsWithMenu.App',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    children: {
      nullable: true,
      validate: isNode
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.App must be children '
      + 'of AppsWithMenu.Apps or AppsWithMenu.AppGroup components')
  }
})

// --- AppsWithMenu.AppGroup ----------------------------------------

type AppGroupProps = {
  title: string,
  name: string,
  children: ReactNode // TODO
}

const AppGroup: ComponentType<AppGroupProps> = defineComponent<AppGroupProps>({
  displayName: 'AppsWithMenu.AppGroup',

  properties: {
    title: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    children: {
      validate:
        withChildren(
          Spec.lazy(() => Spec.all(isElementOfType([AppGroup, App]))))
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.Menu must be children '
      + 'of AppsWithMenu.Menus or AppsWithMenu.Menu components')
  }
})

// --- AppsWithMenu.Apps --------------------------------------------

type AppsProps = {
  children: ReactNode // TODO
}

const Apps = defineComponent({
  displayName: 'AppsWithMenu.Apps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.all(isElementOfType([AppGroup, App])))
    }
  },

  render() {
    throw new Error('Components of type AppsWithMenu.Apps must be children '
      + 'of AppsWithMenu components')
  }
})

// --- AppsWithMenu -------------------------------------------------

type AppsWithMenuProps = {
  children: ReactNode // TODO
}

const AppsWithMenu = defineComponent<AppsWithMenuProps>({
  displayName: 'AppsWithMenuProps',

  properties: {
    children: {
      validate:
        withChildren(
          Spec.singleOf(isElementOfType([Apps])))
    }
  },

  base: class Base extends React.PureComponent<AppsWithMenuProps> {
    render() {
      const model = Base._getAppsWithMenuModel(this.props)
      return AppsWithMenuRenderer.render(model)
    }

    static _getAppsWithMenuModel(props: AppsWithMenuProps): Model_AppsWithMenu {
      const ret: Model_AppsWithMenu = {
        kind: 'Model_AppsWithMenu',
        menu: []
      }

      React.Children.forEach(props.children, (child: ReactElement<AppsProps>) => {
        if (child.type === Apps) {
          React.Children.forEach(child.props.children, (child2: ReactElement<AppGroupProps | AppProps>) => {
            ret.menu.push(
              child2.type === AppGroup
                ? Base._getAppGroupModel(child2.props as AppGroupProps)
                : Base._getAppModel(child2.props as AppProps))
          })
        } else {
          console.log(child)
          throw new Error('This should never happen')
        }
      })

      return ret
    }

    private static _getAppGroupModel(props: AppGroupProps): Model_AppsWithMenu_AppGroup {
      const ret: Model_AppsWithMenu_AppGroup = {
        kind: 'Model_AppsWithMenu_AppGroup',
        title: props.title,
        name: props.name,
        items: []
      }

      React.Children.forEach(props.children, (child: ReactElement<AppGroupProps | AppProps>) => {
        ret.items.push(
          child.type === AppGroup
            ? Base._getAppGroupModel(child.props as AppGroupProps)
            : Base._getAppModel(child.props as AppProps))
      })

      return ret
    }

    private static _getAppModel(props: AppProps): Model_AppsWithMenu_App {
      const ret: Model_AppsWithMenu_App = {
        kind: 'Model_AppsWithMenu_App',
        title: props.title,
        name: props.name,
        content: props.children || null
      }

      return ret
    }
  }
})

// --- models -------------------------------------------------------

type Model_AppsWithMenu = {
  kind: 'Model_AppsWithMenu',
  menu: (Model_AppsWithMenu_AppGroup | Model_AppsWithMenu_App)[]
}

type Model_AppsWithMenu_AppGroup = {
  kind: 'Model_AppsWithMenu_AppGroup',
  title: string,
  name: string,
  items: (Model_AppsWithMenu_AppGroup | Model_AppsWithMenu_App)[]
}

type Model_AppsWithMenu_App = {
  kind: 'Model_AppsWithMenu_App',
  title: string,
  name: string,
  content: ReactNode
}

// --- exports ------------------------------------------------------

export default Object.assign(AppsWithMenu, {
  App,
  Apps,
  AppGroup,
})

export {
  Model_AppsWithMenu,
  Model_AppsWithMenu_AppGroup,
  Model_AppsWithMenu_App,
}