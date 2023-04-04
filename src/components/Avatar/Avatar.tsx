import React, { FunctionComponent } from "react";

interface IUserProps {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface IAvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  user: IUserProps;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
}

export function getUserAvatarUrl(user: Partial<IUserProps>) {
  return `https://ui-avatars.com/api/?name=${user.name?.replace(
    " ",
    "+"
  )}&background=a855f7&color=fff`;
}

export const Avatar: FunctionComponent<IAvatarProps> = (props) => {
  const { user, size = "sm", shape = "circle", ...rest } = props;
  function getSizeClass() {
    switch (size) {
      case "sm":
        return "w-9 h-9";
      case "md":
        return "w-12 h-12";
      case "lg":
        return "w-16 h-16";
      case "xl":
        return "w-24 h-24";
      default:
        return "w-12 h-12";
    }
  }

  function getShapeClass() {
    switch (shape) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded";
      default:
        return "rounded-full";
    }
  }

  const className = `object-cover ${getShapeClass()} ${getSizeClass()}`;
  return (
    <img
      className={className}
      src={getUserAvatarUrl(user)}
      alt={user.name}
      {...rest}
    />
  );
};
