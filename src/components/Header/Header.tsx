import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Dropdown, Menu } from "antd";
import classNames from "classnames";
import { useAuth } from "../../hooks/auth.hooks";
import "./Header.scss";

interface HeaderProps {
  dark?: boolean;
}

const Header = ({ dark }: HeaderProps) => {
  const { isSignedIn, signIn, signOut, user } = useAuth();

  return (
    <header className={classNames("Header", { "Header--dark": dark })}>
      <svg
        className="Header__logo"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.816 18.2983L27.9999 23.0877V17.193L23.816 18.2983Z"
          fill="currentColor"
        />
        <path
          d="M10.8782 28H24.846L17.8299 19.8948L10.8782 21.7983V28Z"
          fill="currentColor"
        />
        <path
          d="M10.8782 16.149L28 11.5438V6.38586L10.8782 11.0525V16.149Z"
          fill="currentColor"
        />
        <path d="M28 0.859649V0H0V8.41228L28 0.859649Z" fill="currentColor" />
        <path
          d="M5.14943 12.6492L0 14.0614V28H5.14943V12.6492Z"
          fill="currentColor"
        />
      </svg>
      {!isSignedIn ? (
        <Button type="text" onClick={signIn} className="Header__signInButton">
          Sign in / sign up
        </Button>
      ) : (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="sign-out" onClick={signOut}>
                Sign out
              </Menu.Item>
            </Menu>
          }
        >
          <div className="Header__user">
            <Avatar size="small" icon={<UserOutlined />} src={user?.picture} />
            {user?.name} <DownOutlined />
          </div>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;
