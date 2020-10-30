import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-route-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../const";

const PrivateRoute = ({render, path, exact, authorizationStatus}) => (
  <Route
    path={path}
    exact={exact}
    render={(routeProps) => {
      return (
        authorizationStatus === AuthorizationStatus.AUTH
          ? render(routeProps)
          : <Redirect to={`/login`} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.AuthorizationStatus
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
