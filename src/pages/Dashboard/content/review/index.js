import React, { useEffect, useState } from 'react'
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  actGetAllReviewAsync, actSubmitReviewAsync } from '../../../../store/user/actions';
function Review() {
      const dispatch = useDispatch();
    const [formData, setFormData] = useState({ content: "", suggest :true});
    const [articleid, setArticleid] = useState("");
    const [articleti, setArticleti] = useState("");
      const [isLoading, setIsLoading] = useState(false);
        const { allReview } = useSelector((state) => state.User);
        useEffect(
          () => {
            dispatch(actGetAllReviewAsync());
          },
          // eslint-disable-next-line
          []
        );
      function handleChange(key) {
        return (evt) => {
          setFormData({
            ...formData,
            [key]: evt.target.value,
          });
        };
      }
        function onFinish(evt) {
          evt.preventDefault();
          if (isLoading) {
            return;
          }
          setIsLoading(true);
          dispatch(actSubmitReviewAsync(formData, articleid, allReview)).then(
            (res) => {
              if (res.ok) {
                NotificationManager.success("Đổi thông tin thành công");
                setArticleid("");
                setArticleti("");
                setFormData({ content: "", suggest: true });
              } else {
                NotificationManager.error("Đổi thông tin thất bại");
              }
              setIsLoading(false);
            }
          );
        }
  return (
    <div className="dashboard-content">
      <div className="dashboard-form">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
            <div className="dashboard-list-box">
              <h4 className="gray">Đánh giá</h4>
              <form onSubmit={onFinish} className="dashboard-list-box-static">
                <label>Bài báo :</label> {articleti}
                <div className="my-profile">
                  <label>Nội dung đánh giá *</label>
                  <input
                    type="text"
                    placeholder="Nội dung"
                    value={formData.content}
                    onChange={handleChange("content")}
                  />
                  <label>Quyết định *</label>
                  <select
                    className="chosen-select-no-single"
                    style={{
                      background: "rgb(53, 54, 58)",
                      color: "#ddd",
                    }}
                    value={formData.suggest}
                    onChange={handleChange("suggest")}
                    required
                  >
                    <option value={true}>Đồng Ý</option>
                    <option value={false}>Không Đồng Ý</option>
                  </select>
                </div>
                <button className="button">Gửi đánh giá</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-xs-12 padding-right-30">
              <div className="dashboard-list-box margin-top-20 user-list">
                <h4 className="gray">Bài chờ đánh giá</h4>
                <ul>
                  {allReview && (
                    <>
                      {allReview.map((user, index) => (
                        <li key={index}>
                          <div className="user-list-item">
                            <div className="user-list-content">
                              <h4>{user.title}</h4>
                              <span>{user.majorname}</span>
                            </div>
                            <div
                              className="user-btns"
                              style={{ alignItems: "center", display: "flex" }}
                            >
                              <Link to={`/post/${user.id}`} className="button">
                                Xem
                              </Link>
                              <button
                                className="button"
                                onClick={
                                  (() => {setArticleid(user.id);
                                    setArticleti(user.title);})
                                }
                              >
                                Đánh giá
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review