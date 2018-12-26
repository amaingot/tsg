import cx from 'classnames';
import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import tableStyle from 'styles/jss/components/tableStyle';
import { CommonProps } from 'utils/commonProps';

type Color = 'warning' | 'primary' | 'danger' | 'success' | 'info' | 'rose' | 'gray';

interface Props extends CommonProps {
  tableHeaderColor?: Color;
  tableHead?: React.ReactNode[];
  tableData?: Array<{
    color?: string;
    colspan?: number;
    data: React.ReactNode[];
    purchase?: boolean;
    total?: boolean;
    amount?: React.ReactNode;
  }>;
  hover?: boolean;
  coloredColls?: number[];
  colorsColls?: Color[];
  customCellClasses?: string[];
  customClassesForCells?: number[];
  customHeadCellClasses?: string[];
  customHeadClassesForCells?: number[];
  striped?: boolean;
  tableShopping?: boolean;
}

const defaultProps: Props = {
  classes: {},
  tableHeaderColor: 'gray',
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
};

const CustomTable: React.SFC<Props> = (props: Props = defaultProps) => {
  const {
    classes,
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls = [],
    coloredColls = [],
    customCellClasses = [],
    customClassesForCells = [],
    striped,
    tableShopping,
    customHeadCellClasses = [],
    customHeadClassesForCells = [],
  } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor || 'gray']}>
            <TableRow className={classes.tableRow}>
              {tableHead.map((prop, key) => {
                const tableCellClasses =
                  classes.tableHeadCell +
                  ' ' +
                  classes.tableCell +
                  ' ' +
                  cx({
                    [customHeadCellClasses[customHeadClassesForCells.indexOf(key)]]:
                      customHeadClassesForCells.indexOf(key) !== -1,
                    [classes.tableShoppingHead]: tableShopping,
                    [classes.tableHeadFontSize]: !tableShopping,
                  });
                return (
                  <TableCell className={tableCellClasses} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData &&
            tableData.map((row, key) => {
              let rowColor = '';
              let rowColored = false;

              if (row.color) {
                rowColor = row.color;
                rowColored = true;
              }

              const tableRowClasses = cx({
                [classes.tableRowHover]: hover,
                [classes[rowColor + 'Row']]: rowColored,
                [classes.tableStripedRow]: striped && key % 2 === 0,
              });

              if (row.total) {
                return (
                  <TableRow key={key} hover={hover} className={tableRowClasses}>
                    <TableCell className={classes.tableCell} colSpan={row.colspan} />
                    <TableCell className={classes.tableCell + ' ' + classes.tableCellTotal}>
                      Total
                    </TableCell>
                    <TableCell className={classes.tableCell + ' ' + classes.tableCellAmount}>
                      {row.amount}
                    </TableCell>
                    {tableHead && tableHead.length - ((row.colspan || 1) + 2) > 0 ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={tableHead.length - ((row.colspan || 1) + 2)}
                      />
                    ) : null}
                  </TableRow>
                );
              }

              // if (row.purchase) {
              //   return (
              //     <TableRow key={key} hover={hover} className={tableRowClasses}>
              //       <TableCell className={classes.tableCell} colSpan={row.colspan} />
              //       <TableCell
              //         className={classes.tableCell + ' ' + classes.right}
              //         colSpan={row.col.colspan}
              //       >
              //         {row.col.text}
              //       </TableCell>
              //     </TableRow>
              //   );
              // }

              return (
                <TableRow
                  key={key}
                  hover={hover}
                  className={classes.tableRow + ' ' + tableRowClasses}
                >
                  {row.data.map((cell, cellIndex) => {
                    const tableCellClasses =
                      classes.tableCell +
                      ' ' +
                      cx({
                        [classes[colorsColls[coloredColls.indexOf(cellIndex)]]]:
                          coloredColls.indexOf(cellIndex) !== -1,
                        [customCellClasses[customClassesForCells.indexOf(cellIndex)]]:
                          customClassesForCells.indexOf(cellIndex) !== -1,
                      });
                    return (
                      <TableCell className={tableCellClasses} key={cellIndex}>
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(tableStyle)(CustomTable);
