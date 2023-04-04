import React, { FunctionComponent, useContext, useRef, useState } from "react";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useOutsideAlerter } from "../../hooks/outsideClick.hook";
// import { logout } from "../../services/api.service";
import { Avatar } from "../../components/Avatar/Avatar";
import { ListItem } from "../../components/ListItem/ListItem";
import { AuthContext } from "../../state/auth.state";
import { GlobalUIContext } from "../../state/ui.state";

export const HeaderBar: FunctionComponent = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const [UIState, setUIState] = useContext(GlobalUIContext);
  const wrapperRef = useRef(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  useOutsideAlerter(wrapperRef, () => setIsAccountMenuOpen(false));

  return (
    <div className="flex items-center justify-between p-2 px-4 border-b border-gray-200 z-10 print:hidden">
      <div className="flex items-center">
        <span
          className="mr-2 text-xl"
          onClick={() => {
            setUIState({
              type: UIState.isSideNavOpen ? "CLOSE_SIDENAV" : "OPEN_SIDENAV",
              payload: {},
            });
          }}
        >
          {UIState.isSideNavOpen ? <FiX /> : <FiMenu />}
        </span>
        <span className="ml-2 text-gray-700 flex flex-col">
          <span className="font-bold">Ambari Square</span>
          <span className="text-gray-500 text-xs">Management Dashboard</span>
        </span>
      </div>

      {auth.isAuthenticated && (
        <div className="relative inline-block text-left">
          <div
            className="flex items-center hover:bg-gray-100 p-1 cursor-pointer rounded"
            onMouseEnter={() => {
              setIsAccountMenuOpen(true);
            }}
          >
            <Avatar user={auth.user} />
          </div>
          {isAccountMenuOpen && (
            <div
              ref={wrapperRef}
              className="bg-white shadow-xl z-20 mt-1 absolute origin-top-right absolute right-0 w-56 border border-gray-200 rounded-lg"
              onMouseLeave={() => {
                setIsAccountMenuOpen(false);
              }}
            >
              <span className="px-4 py-2 text-gray-700 flex flex-col">
                <span className="font-bold">{auth.user.name}</span>
                <span className="text-gray-500 text-xs">{auth.user.email}</span>
                <span className="text-gray-500 text-xs">{auth.user.phone}</span>
              </span>
              <div className="border-b border-gray-200" />
              {/* 
              <a href="">
                <ListItem text="Profile" icon={<FiUser />} menuItem />
              </a>
              <a href="">
                <ListItem text="Settings" icon={<FiSettings />} menuItem />
              </a> */}
              <div className="border-b border-gray-200" />
              <a
                onClick={async () => {
                  setAuth({
                    type: "LOGOUT",
                    payload: {},
                  });
                  //   await logout();
                }}
              >
                <ListItem text="Logout" icon={<FiLogOut />} menuItem />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
