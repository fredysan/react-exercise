import React from "react";
import { orderBy } from "lodash";
import "./List.css";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const SORTS = {
  NONE: (list, order) => list,
  TITLE: (list, order) => orderBy(list, ["title"], order),
  AUTHOR: (list, order) => orderBy(list, ["author"], order),
  COMMENT: (list, order) => orderBy(list, ["num_comments"], order),
  POINT: (list, order) => orderBy(list, ["points"], order),
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({ field: "TITLE", order: "asc" });

  const handleSort = (sortKey) => {
    let order = "asc";
    if (sortKey === sort.field) {
      order = sort.order === "asc" ? "desc" : "asc";
    }

    setSort({ field: sortKey, order: order });
  };

  const sortFunction = SORTS[sort.field];
  const sortedList = sortFunction(list, sort.order);

  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("TITLE")}>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Num comments</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.author}</TableCell>
                <TableCell align="right">{row.num_comments}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    type="button"
                    onClick={() => onRemoveItem(row)}
                    className="button button_small"
                  >
                    Dismiss
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
