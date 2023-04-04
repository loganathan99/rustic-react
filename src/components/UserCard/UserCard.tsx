import React, { FunctionComponent } from "react";
import { FiCheck } from "react-icons/fi";

interface IUserProps {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

interface IUserCardProps {
  user: Partial<IUserProps>;
  isActive?: boolean;
  showPhoto?: boolean;
}

export function getUserAvatarUrl(user: Partial<IUserProps>) {
  return `https://ui-avatars.com/api/?name=${user.name?.replace(
    " ",
    "+"
  )}&background=a855f7&color=fff`;
}

export const UserCard: FunctionComponent<IUserCardProps> = (props) => {
  const { user, isActive = false, showPhoto = true, ...rest } = props;

  return (
    <a href={`/dashboard/users/${user.id}/view`}>
      <div className="p-4 flex rounded-lg border border-gray-200 m-2 flex-grow cursor-pointer items-start">
        {showPhoto && (
          <img
            src={getUserAvatarUrl(user)}
            alt={user.name}
            className="object-cover rounded-lg mr-4 w-16 h-16 border border-gray-200"
          />
        )}
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-gray-800">{user.name}</h3>
          {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
          {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
        </div>
        {isActive && (
          <div className="flex flex-col items-center justify-center p-1 m-1 text-white bg-purple-500 rounded">
            <FiCheck />
          </div>
        )}
      </div>
    </a>
  );
};
