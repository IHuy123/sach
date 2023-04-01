import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationRe from "../../../../common/Paging";
import { actFetchPaymentAuAsync } from "../../../../store/post/actions";

function Payment() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const paymentAu = useSelector((state) => state.Post.paymentAu);
  useEffect(
    () => {
      dispatch(actFetchPaymentAuAsync());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Lịch sử thanh toán</h4>
            <ul>
              {paymentAu && (
                <>
                  {paymentAu.slice(page, page + 8).map((user, index) => (
                    <li key={index}>
                      <div className="user-list-item">
                        <div className="user-list-content" style={{display: "flex",justifyContent: "space-between"}}>
                        <div>
                        <h4>
                        {user.title}
                          </h4>
                          <h5>
                            {parseInt(user.amount).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </h5>
                        </div>
                         <div  style={{display: "flex",alignItems: "center"}}>
                         <h4>
                           {user.type ?"Đăng bài báo":"Xem bài báo"}
                          </h4>
                         <span style={{marginLeft:"10px"}}>
                            {moment(user.creationtime).format("DD-MM-YYYY")}
                          </span>
                          
                         </div>
                        </div>
                        <div className="user-btns"></div>
                      </div>
                    </li>
                  ))}
                  <PaginationRe
                    page={page}
                    setPage={setPage}
                    count={8}
                    totalPages={paymentAu.length}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
