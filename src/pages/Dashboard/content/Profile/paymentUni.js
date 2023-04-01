import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  actPaymentUniversityAsync } from "../../../../store/user/actions";
import { NotificationManager } from "react-notifications";
import { PayPalButton } from "react-paypal-button-v2/lib";
import { useIsLogin } from "../../../../hooks/useIsLogin";
import { actFetchPaymentUniAsync } from "../../../../store/post/actions";
import moment from "moment";
function PaymentUni() {
  const dispatch = useDispatch();
  const { isLogin } = useIsLogin();
  const [load, setLoad] = useState(false);
  const [authorpayment, setAuthorpayment] = useState(null);
  console.log("authorpayment",authorpayment);
  // const allUniversity = useSelector((state) => state.User.allUniversity);
  const paymentUni = useSelector((state) => state.Post.paymentUni); 
  console.log("15",paymentUni);
  useEffect(
    () => {
      //  dispatch(actGetAllUniversity());
      dispatch(actFetchPaymentUniAsync());
    },
    // eslint-disable-next-line
    [load]
  );

  const clientId ="AaD6Jk0vH-3xv3Znlq4ztjADzIHzaHABruRk8dCmnwbHB34rvJx7W-GUesEdMeX9kqSzXaaqnrEc3VGs";
  const onSuccess = (details, data) => {
    if (details.status === "COMPLETED") {
          dispatch(actPaymentUniversityAsync(1,load, setLoad,false)).then((res) => {
            if (res.ok) {
              NotificationManager.success("Thành công");
            } else {
              NotificationManager.error("Thất bại");
            }
          });
    } else {
      alert("fail");
    }
  };
  const onUpdate = (details, data) => {
    if (details.status === "COMPLETED") {
      dispatch(
        actPaymentUniversityAsync(paymentUni.id, load, setLoad, true)
      ).then((res) => {
        if (res.ok) {
          NotificationManager.success("Thành công");
        } else {
          NotificationManager.error("Thất bại");
        }
      });
    } else {
      alert("fail");
    }
  };
  return (
    <div
      className="dashboard-list-box margin-top-0"
      style={{ marginTop: "25px" }}
    >
      <h4 className="gray">Thanh Toán Trường Học</h4>
      <form className="dashboard-list-box-static">
        <div className="my-profile">
          <label className="margin-top-0">
            {paymentUni ? ("Ngày hết hạn : " + moment(paymentUni.expirationdate).format("DD-MM-YYYY")): "chưa thanh toán"}
          </label>
          <br />
          <label className="margin-top-0">Email Trường : {isLogin.email}</label>
          {/* <select
            className="chosen-select-no-single"
            style={{
              background: "rgb(53, 54, 58)",
              color: "#ddd",
            }}
            name="majorid"
            onChange={(e) => setUniversityid(e.target.value)}
            required
          >
            {allUniversity &&
              allUniversity
                .filter((u) => u.email === isLogin.email)
                .map((university, index) => (
                  <option value={university.id} key={index}>
                    {university.name}
                  </option>
                ))}
          </select> */}
        </div>
        {!paymentUni && (
          <>
            <label className="margin-top-0">Thanh Toán</label>
            <PayPalButton
              shippingPreference="NO_SHIPPING"
              amount="65"
              options={{
                clientId,
              }}
              onSuccess={(details, data) => {
                onSuccess(details, data);
              }}
            />
          </>
        )}
        {paymentUni && paymentUni.isexpired && (
          <>
            <label className="margin-top-0">Gia Hạn</label>
            <PayPalButton
              shippingPreference="NO_SHIPPING"
              amount="65"
              options={{
                clientId,
              }}
              onSuccess={(details, data) => {
                onUpdate(details, data);
              }}
            />
          </>
        )}
      </form>
    </div>
  );
}

export default PaymentUni;
