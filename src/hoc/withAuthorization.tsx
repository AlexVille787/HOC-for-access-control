import React from "react";
import { AccessDenied } from "../components/AccessDenied";
import { CurrentUser } from "../types";

interface WithAuthorizationProps {
  currentUser?: CurrentUser | null;
}

export function withAuthorization<P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthorizationProps>,
  allowedRoles: string[],
) {
  const WithAuthorization = (props: P & WithAuthorizationProps) => {
    const { currentUser, ...restProps } = props;

    if (!currentUser || !currentUser.roles) {
      return <AccessDenied />;
    }

    const hasAccess = currentUser.roles.some((role) =>
      allowedRoles.includes(role),
    );

    if (!hasAccess) {
      return <AccessDenied />;
    }

    return <WrappedComponent {...(restProps as P)} currentUser={currentUser} />;
  };

  WithAuthorization.displayName = `withAuthorization(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthorization;
}
