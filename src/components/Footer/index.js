import {
  FacebookFilled,
  InstagramFilled,
  GithubFilled,
  MailFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import "./Footer.css";
export default function Footer() {
  return (
    <footer id="mt_footer" className="mt_footer_style1">
      <div className="container">
        <div className="mt_footer_col">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="mt_footer_about">
                <div className="footer-logo">
                  <Link to="/">eJournal</Link>
                </div>
                <p>© 2023, TEAM EJOURNAL</p>
                <p>
                  Được tạo bởi
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    eJournal
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="mt_footer_list">
                <h3>Thể loại</h3>
                <ul
                  className="footer-quick-links-4"
                  style={{ display: "grid" }}
                >
                  <li>
                    <a href="/">ReactJs</a>
                  </li>
                  <li>
                    <a href="/">Javascript</a>
                  </li>
                  <li>
                    <a href="/">Angular</a>
                  </li>
                  <li>
                    <a href="/">HTML, HTML5</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="mt_footer_newsletter">
                <h3>Bản tin</h3>
                <div className="mailpoet_form">
                  <form
                    target="_self"
                    method="post"
                    action="https://cyclonethemes.com/demo/html/suchana/email"
                    noValidate
                  >
                    <label>Địa chỉ Email:</label>
                    <input
                      type="email"
                      className="mailpoet_text"
                      name="mail"
                      title="Email"
                      placeholder="Vui lòng chỉ định email hợp lệ"
                    />
                    <div className="blog-button">
                      <button className="btn-blog">
                        <Trans>Đăng Kí</Trans>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="mt_footer_gallery">
                <h3>Mạng Xã Hội</h3>
                <div className="row">
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_01.jpg" alt="Img" />
                    </Link>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_02.jpg" alt="Img" />
                    </Link>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_03.jpg" alt="Img" />
                    </Link>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_04.jpg" alt="Img" />
                    </Link>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_05.jpg" alt="Img" />
                    </Link>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <Link to="/">
                      <img src="/images/insta/insta_06.jpg" alt="Img" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt_footer_copy">
          <div className="copy_txt pull-left">
            <p className="mar-0">
              <a href="/">eJournal</a>
            </p>
          </div>
          <div className="follow_us pull-right">
            <ul className="social_icons">
              <li className="facebook">
                <Link to="https://www.facebook.com/">
                  <FacebookFilled />
                </Link>
              </li>
              <li className="instagram">
                <Link to="https://www.instagram.com/">
                  <InstagramFilled />
                </Link>
              </li>
              <li className="mail">
                <Link to="0@gmail.com">
                  <MailFilled />
                </Link>
              </li>
              <li className="github">
                <Link to="https://github.com">
                  <GithubFilled />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
