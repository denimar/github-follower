import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Routes from '../../../routes'

class RoutesViewport extends React.Component {

  render() {

    const renderMergedProps = (component, ...routePropsAndProps) => {
      const finalProps = Object.assign({}, ...routePropsAndProps);
      return (
        React.createElement(component, finalProps)
      );
    }

    return (
      <Switch>
        <Route exact path='/' component={ Routes.indexRoute }/>
        {
          Routes.childRoutes.map((route, index) => {
            return (
              <Route
                key={ index }
                path={ route.path }
                render={routeProps => {
                  return renderMergedProps(route.component, routeProps, { repositories: this.props.repositories });
                }}
              />
            )
          })
        }
      </Switch>
    )

  }

}

export default RoutesViewport;
