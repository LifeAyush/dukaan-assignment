import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Pagination from "@mui/material/Pagination";
import "./paymentsTable.css";

const PaymentsTable = ({ sortOrder, sortColumn, rows, searchQuery }) => {
  const [orderBy, setOrderBy] = useState("orderDate");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const rowsPerPage = 7;

  useEffect(() => {
    setOrder(sortOrder);
    setOrderBy(sortColumn);
  }, [sortOrder, sortColumn]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const extractNumberFromId = (id) => {
    return parseInt(id.replace(/^#/, ""), 10);
  };

  const filteredRows = rows.filter((row) =>
    row.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRows = filteredRows.slice().sort((a, b) => {
    if (orderBy === "orderDate") {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    } else {
      const aValue = extractNumberFromId(a[orderBy]);
      const bValue = extractNumberFromId(b[orderBy]);

      if (order === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    }
  });

  const TableHeadingStyle = {
    color: "var(--Text-Color-Grey)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "142.857%",
  };
  const OrderIDStyle = {
    color: "#146EB4",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "142.857%",
  };
  const RowDataStyle = {
    color: "var(--Text-Color-Black)",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "142.857%",
  };

  return (
    <div className="paymentsTable">
      <TableContainer>
        <Table aria-label="sortable table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#F2F2F2" }}>
              <TableCell>
                <TableSortLabel
                  sx={TableHeadingStyle}
                  active={orderBy === "orderId"}
                  direction={orderBy === "orderId" ? order : "asc"}
                  onClick={() => handleRequestSort("orderId")}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  sx={TableHeadingStyle}
                  active={orderBy === "orderDate"}
                  direction={orderBy === "orderDate" ? order : "asc"}
                  onClick={() => handleRequestSort("orderDate")}
                >
                  Order Date
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sx={TableHeadingStyle}>
                Order Amount
              </TableCell>
              <TableCell align="right" sx={TableHeadingStyle}>
                Transaction Fees
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.orderId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={OrderIDStyle}>
                    {row.orderId}
                  </TableCell>
                  <TableCell align="right" sx={RowDataStyle}>
                    {row.orderDate}
                  </TableCell>
                  <TableCell align="right" sx={RowDataStyle}>
                    {row.orderAmount}
                  </TableCell>
                  <TableCell align="right" sx={RowDataStyle}>
                    {row.transactionFees}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(sortedRows.length / rowsPerPage)}
        page={page + 1}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={2}
        boundaryCount={2}
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default PaymentsTable;
