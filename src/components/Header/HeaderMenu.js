import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useIsLogin } from "../../hooks/useIsLogin";
import { actLogout } from "../../store/auth/actions";
import { FlagFR, FlagUK, FlagVN, FlagZH } from "../../common/AppIcon";
import MainMenus from "./MainMenus";
import { actSetLang } from "../../store/app/actions";
import { locales } from "../../i18n";
import { Trans } from "@lingui/macro";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
const mapFlagByLang = {
  vi: <FlagVN />,
  en: <FlagUK />,
  zh: <FlagZH />,
  fr: <FlagFR />,
};

export default function HeaderMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const lang = useSelector((state) => state.App.lang);
  const { isLogin, currentUser } = useIsLogin();

  function handleLogout(evt) {
    evt.preventDefault();
    dispatch(actLogout({ history }));
  }

  function handleChangeLang(evt, locale) {
    evt.preventDefault();
    dispatch(actSetLang(locale));
  }

  return (
    <div className="header-nav">
      <MainMenus />

      <ul className="header-nav__lists">
        <li className="user">
          {isLogin ? (
            <>
              <Link to="/dashboard/profile">
                <UserOutlined /> {currentUser.fullname}
              </Link>
              <ul>
                <li style={{ marginTop: "15px" }}>
                  <Link to="/dashboard/profile">
                    <AppstoreAddOutlined /> Quản lý
                  </Link>
                  <Link to="#" onClick={handleLogout}>
                    <LogoutOutlined /> Đăng xuất
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <Link to="/login">
              <UserOutlined /> <Trans>Tài khoản</Trans>
            </Link>
          )}
        </li>
        
      </ul>
    </div>
  );
}
