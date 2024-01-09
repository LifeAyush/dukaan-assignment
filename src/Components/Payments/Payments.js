import React, { useState } from "react";
import "./payments.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InfoCard from "../InfoCard/InfoCard";
import PaymentsTable from "../PaymentsTable/PaymentsTable";
import { rows } from "../PaymentsTable/PaymentsData";

const Payments = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (column) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleDownload = () => {
    const paymentData = rows;
    const jsonData = JSON.stringify(paymentData, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "payment_data.json";
    a.click();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const IconStyle = {
    fontSize: "14px",
    color: "#999999",
    cursor: "pointer",
  };
  const IconSearchStyle = {
    fontSize: "16px",
    color: "#808080",
    cursor: "pointer",
  };
  const SortIconStyle = {
    fontSize: "16px",
    color: "var(--Text-Color-Grey)",
  };
  const DownloadIconStyle = {
    fontSize: "20px",
    color: "var(--Text-Color-Grey)",
  };

  return (
    <div className="payments">
      <div className="payments-overview">
        <div className="payments-overview-header">
          <div className="payments-overview-header-text">Overview</div>
          <div className="payments-overview-header-dropdown">
            <div className="payments-overview-header-dropdown-text">
              Last Month
            </div>
            <KeyboardArrowDownIcon sx={IconStyle} />
          </div>
        </div>
        <div className="payments-overview-info">
          <InfoCard title={"Online orders"} metric={"231"} />
          <InfoCard title={"Amount received"} metric={"₹23,92,312.19"} />
        </div>
      </div>
      <div className="payments-transactions">
        <div className="payments-transactions-title">
          Transactions | This Month
        </div>
        <div className="payments-transactions-main">
          <div className="payments-transactions-main-actions">
            <div className="payments-transacions-main-search">
              <SearchOutlinedIcon sx={IconSearchStyle} />
              <input
                type="text"
                placeholder="Search by order ID..."
                className="payments-transacions-main-search-text"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="payments-transacions-main-other-actions">
              <div
                className="payments-transacions-main-Icon-flex"
                onClick={() => handleSort("orderId")}
              >
                <div className="payments-transacions-main-Icon-text">Sort</div>
                <SwapVertRoundedIcon sx={SortIconStyle} />
              </div>
              <div
                className="payments-transacions-main-Icon-flex"
                onClick={handleDownload}
              >
                <FileDownloadOutlinedIcon sx={DownloadIconStyle} />
              </div>
            </div>
          </div>
          <PaymentsTable sortOrder={sortOrder} sortColumn={sortColumn} rows={rows} searchQuery={searchQuery}/>
        </div>
      </div>
    </div>
  );
};

export default Payments;
