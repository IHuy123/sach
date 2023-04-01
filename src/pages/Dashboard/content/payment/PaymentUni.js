import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PaginationRe from "../../../../common/Paging";
import { actFetchPaymentUniAsync } from "../../../../store/post/actions";

function PaymentUni() {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  const paymentUni = useSelector((state) => state.Post.paymentUni);
  useEffect(
    () => {
      dispatch(actFetchPaymentUniAsync());
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="dashboard-content">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-xs-12 traffic">
          <div className="dashboard-list-box margin-top-20 user-list">
            <h4 className="gray">Lịch Sử Thanh Toán</h4>
            <ul>
              {paymentUni && (
                <>
                  <li>
                    <div className="user-list-item">
                      <div className="user-list-content">
                        <h4>
                          {parseInt(paymentUni.amount).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </h4>
                        <span>
                          {moment(paymentUni.expirationdate).format(
                            "DD-MM-YYYY"
                          )}
                        </span>
                      </div>
                      <div className="user-btns"></div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentUni;
