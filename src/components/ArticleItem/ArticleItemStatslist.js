import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { OPEN_MODAL } from "../../store/modal/actions";
import {  actFetchPaymentAuAsync, actFetchUpdatePostsAsync } from "../../store/post/actions";
import AssignReviewModal from "../Modal/AssignReviewModal";
import ManuscriptModal from "../Modal/manuscriptModal";
import ReviewModal from "../Modal/reviewModal";
import UpdateModal from "../Modal/UpdateModal";
import PayAuModal from "../Modal/PayAuModal";
import EdittorInchefModal from "../Modal/EdittorInchefModal";
export default function ArticleItemStatslist({
  user,
  load,
  setLoad,
  isEditor,
  isEditorUse,
  isEditorChef,
  isEditorChefUse,
  isAuthor,
  isAuthorUse,
  isMember,
  reviewed,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [review, setReview] = useState(null);
  const [authorpayment, setAuthorpayment] = useState(null);
  const [reviews, setReviews] = useState(null);
  const baseURL = "http://localhost:5000/";
  const paymentAu = useSelector((state) => state.Post.paymentAu);
console.log(user);
  useEffect(() => {
    const getAccountInfo = async () => {
      const response = await axios
        .create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .post("review/view/all/", { articleid: user.id });
      setReview(response.data.list);
    };
    const authorpayments = async () => {
      const response = await axios
        .create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .post("payment/authorpayment/", { articleid: user.id, accountid: user.accountid});
        setAuthorpayment(response.data);
    };
    const getReviewed = async () => {
      const response = await axios
        .create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .post("review/reviews/", { articleid: user.id });
      setReviews(response.data.list);
    };
    dispatch(actFetchPaymentAuAsync());
    getAccountInfo();
    authorpayments();
    reviewed && getReviewed();
    // eslint-disable-next-line
  }, []);
  const onModal = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ManuscriptModal id={user.id} />,
    });
  };
  const onModalOpent = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: (
        <EdittorInchefModal id={user.id} load={load} setLoad={setLoad} />
      ),
    });
  };
  const onModals = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <AssignReviewModal user={user} />,
    });
  };
  const onModalss = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ReviewModal review={review} />,
    });
  };
  const onReviews = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <ReviewModal review={reviews} reviews={true}/>,
    });
  };
  const onEditorInchef = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <EdittorInchefModal user={user} />,
    });
  };
  const onUpdate = () => {
    dispatch(actFetchUpdatePostsAsync(user.id, history));
  };

  const onDelete = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <UpdateModal id={user.id} />,
    });
  };
  const onDPayAu = () => {
    dispatch({
      type: OPEN_MODAL,
      payload: <PayAuModal id={user.id} />,
    });
  };

  return (
    <>
      <li>
        <div className="user-list-item">
          <div className="user-list-content">
            <Link to={`/post/${user.id}`}>
              <h4>{user.title}</h4>
            </Link>
            {/* {isMember &&<span>Ngành học : {user.major}</span>} */}
            {reviewed &&<span>Ngành học : {user.major}</span> }
            {isMember ? (
              // <span>{user.status ? user.status : "ACCEPTED"}</span>
             <>
              <span>
              Trạng thái :{" "}
              {user.status === "ACCEPTED"
                ? "Đã duyệt"
                : user.status === "REJECTED"
                ? "Đã từ chối"
                : user.status === "WAITING"
                ? "Chưa đánh giá"
                : user.status === "PENDING"
                ? "Đợi đánh giá"
                : user.status === "REVIEWED"
                ? "Đã đánh giá"
                : "Cần chỉnh sửa"}
            </span>
            <br />
              <span>Ngành học : {user.majorname}</span>
             </>
            ) : (
              <>
                {/* <span>Ngành học : {user.majorname}</span> */}
                <br />
              </>
            )}
            {isEditor ? (
              // <span>{user.status ? user.status : "ACCEPTED"}</span>
             <>
              <span>
              Trạng thái :{" "}
              {user.status === "ACCEPTED"
                ? "Đã duyệt"
                : user.status === "REJECTED"
                ? "Đã từ chối"
                : user.status === "WAITING"
                ? "Chưa đánh giá"
                : user.status === "PENDING"
                ? "Đợi đánh giá"
                : user.status === "REVIEWED"
                ? "Đã đánh giá"
                : "Cần chỉnh sửa"}
            </span>
            <br />
              <span>Ngành học : {user.majorname}</span>
             </>
            ) : (
              <>
                {/* <span>Ngành học : {user.majorname}</span> */}
                <br />
              </>
            )}
            {isEditorChef ? (
              <>
                <span>
                Trạng thái :{" "}
                  {user.status === "RESTRICTED" 
                  ? "Hạn chế"
                  : user.status === "PUBLIC"
                  ? "Công khai"
                  : user.status === "ACCEPTED"
                  ? "Đã duyệt"
                  : user.status === "REJECTED"
                  ? "Đã từ chối"
                  : user.status === "WAITING"
                  ? "Chưa đánh giá"
                  : user.status === "PENDING"
                  ? "Đợi đánh giá"
                  : user.status === "REVIEWED"
                  ? "Đã đánh giá"
                  : "Cần chỉnh sửa"}
                </span>
              </>
            ) : (
              <span></span>
            )}
          </div>
          <div className="user-btns">
            {isEditor && (
              <>
                {isEditorUse && (
                  <>
                    {/* {user.openaccess ? (
                      <>
                        {authorpayment && (
                          <>
                            {authorpayment.list.length > 0 ? (
                              <></>
                            ) : (
                              <button
                                className="button"
                                onClick={() => onModal()}
                              >
                                Trạng thái
                              </button>
                            )
                            }
                          </>
                        )}
                      </>
                    ):  
                    <button
                    className="button"
                    onClick={() => onModal()}
                  >
                    Trạng thái
                  </button>} */
                  <button
                    className="button"
                    onClick={() => onModal()}
                  >
                    Trạng thái
                  </button>}
                  
                  

                    <button className="button" onClick={() => onModals()}>
                      Phân công người đánh giá
                    </button>
                  </>
                )}
                {review ? (
                 <>
                 {review.length >0 &&  <button className="button" onClick={() => onModalss()}>
                    Xem đánh giá
                  </button>}
                 </>
                ) : (
                  <></>
                )}
              </>
            )}
            {isEditorChef && (
              <>
                {isEditorChefUse && (
                  <>
                    <button className="button" onClick={() => onModalOpent()}>
                      Đổi trạng thái
                    </button>
                  </>
                )}
              </>
            )}
            {isAuthor && (
              <>
                {review && (
                <>
                {review.length >0 &&  <button className="button" onClick={() => onModalss()}>
                   Xem đánh giá
                 </button>}
                </>
                )}
                {isAuthorUse && (
                  <>
                    <button className="button" onClick={() => onUpdate()}>
                      Chỉnh sửa
                    </button>
                    <button className="button" onClick={() => onDelete()}>
                      Xóa bài
                    </button>
                    {user.openaccess && (
                      <>
                        {paymentAu && (
                          <>
                            {!paymentAu.filter((p) => p.articleid === user.id)
                              .length > 0 && (
                              <button
                                className="button"
                                onClick={() => onDPayAu()}
                              >
                                Thanh toán
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {reviewed && (
              <>
                {reviews && (
                 <>
                 {reviews.length >0 &&  <button className="button" onClick={() => onModalss()}>
                    Xem đánh giá
                  </button>}
                 </>
                )}
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
