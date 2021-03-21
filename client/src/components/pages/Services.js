import React, { useEffect, useState } from "react";
import moment from "moment";
import { getInquiries, isauthenticate } from "../../util/function";
import "./Services.css";

export default function Services() {
  const [items, setItems] = useState("");
  const [order, setOrder] = useState(true);
  const [error, setError] = useState("");

  // check if user already has token/logged in
  const token = isauthenticate();
  // order based on created time
  const orderInquiry = order ? "desc" : "asce";

  useEffect(() => {
    // call api on initialisation
    init();
  }, [order]);

  const init = async () => {
    // no token no need to call api
    if (!token) {
      setError("You need to login");
      return;
    }
    try {
      const result = await getInquiries(orderInquiry, 15, token);
      // save items called from api
      setItems(result.data.success);
    } catch (error) {
      // set error if api resulted in error
      setError(error.response.data.error);
    }
  };
  const showError = () => {
    return <div className="table-error">{error}.</div>;
  };

  const showTable = () => {
    return (
      <table className="inquiry-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th className="head-button" onClick={() => setOrder(!order)}>
              Date
              <i
                className={
                  orderInquiry === "desc"
                    ? "fas fa-angle-double-down"
                    : "fas fa-angle-double-up"
                }
              />
            </th>
          </tr>
        </thead>
        {items
          ? items.map((item) => (
              <tbody key={item.createdTime}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>{moment(item.createdTime).fromNow()}</td>
                </tr>
              </tbody>
            ))
          : null}
      </table>
    );
  };

  return <>{error ? showError() : showTable()}</>;
}
