import { forwardRef, useRef, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import { Button } from '@mui/material';
import ContactsTablePaginationActions from './CustomerServicesTablePaginationActions';
import compareDate from '../../Utils';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
});

const EnhancedTable = ({ columns, data, onRowClick }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((_columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          sortable: false,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...row.getToggleRowSelectedProps()}
                onClick={(ev) => ev.stopPropagation()}
              />
            </div>
          ),
        },
        ..._columns,
      ]);
    }
  );

  // const inputFile = useRef(null);
  // const onClick = (e) => {
  //   inputFile.current.click();
  // };

  // const StatusCompponent = (cellValue) => {
  //   switch (cellValue) {
  //     case 'Contact User':
  //       return 'ADMIN';
  //     case 'staff':
  //       return 'STAFF';
  //     default:
  //       return 'USER';
  //   }
  // };

  const StatusAppearance = (cellValue) => {
    switch (cellValue) {
      case 'Contact User':
        return 'bg-blue text-white';
      case 'Completed':
        return 'bg-green-700 text-white';
      case 'Cancel':
        return 'bg-red-700 text-white';
      case 'Hospitality Submitted':
        return 'bg-orange text-white';
      default:
        return 'bg-purple-300 text-white';
    }
  };

  const StatusActiveComponent = (cellValue) => {
    switch (cellValue) {
      case 'active':
        return 'ACTIVE';
      default:
        return 'INACTIVE';
    }
  };

  const StatusActiveAppearance = (cellValue) => {
    switch (cellValue) {
      case 'active':
        return 'bg-green text-white';
      default:
        return 'bg-red-700 text-white';
    }
  };

  const TableCellComponent = (row) => {
    const cellRow = row.cells;
    return row.cells.map((cell) => {
      switch (cell.column.Header) {
        case 'Status':
          return (
            <TableCell
              {...cell.getCellProps()}
              className={clsx('p-4 md:p-12', cell.column.className)}
            >
              <div
                className={clsx(
                  'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
                  StatusAppearance(cell.value)
                )}
              >
                {/* {StatusCompponent(cell.value)} */}
                {cell.render('Cell')}
              </div>
            </TableCell>
          );

        case 'Start Date':
          return (
            <TableCell
              {...cell.getCellProps()}
              className={clsx('p-4 md:p-12', cell.column.className)}
            >
              {/* <div
                className={clsx(
                  'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
                  StatusAppearance(cell.value)
                )}
              > */}
              {cellRow[6].value !== 'Cancel' ? cell.render('Cell') : <></>}
              {/* </div> */}
            </TableCell>
          );

        case 'End Date':
          return (
            <TableCell
              {...cell.getCellProps()}
              className={clsx('p-4 md:p-12', cell.column.className)}
            >
              {/* <div
                className={clsx(
                  'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
                  StatusAppearance(cell.value)
                )}
              > */}
              {console.log()}
              {cellRow[6].value !== 'Cancel' ? cell.render('Cell') : <></>}
              {/* </div> */}
            </TableCell>
          );

        case 'See Detail':
          return (
            <TableCell
              {...cell.getCellProps()}
              className={clsx('p-4 md:p-12', cell.column.className)}
            >
              <Button
                href={`customer-booking/${row.original.id}`}
                variant="outlined"
                size="large"
                color="info"
              >
                See Detail
              </Button>
            </TableCell>
          );

        default:
          return (
            <TableCell
              {...cell.getCellProps()}
              className={clsx('p-4 md:p-12', cell.column.className)}
            >
              {cell.render('Cell')}
            </TableCell>
          );
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  // Render the UI for your table
  return (
    <div className="flex flex-col w-full min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
      <TableContainer className="flex flex-1">
        <Table {...getTableProps()} stickyHeader className="simple borderless">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    className="whitespace-nowrap p-4 md:p-12"
                    {...(!column.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render('Header')}
                    {column.sortable ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              // console.log('row:', row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={(ev) => onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                  style={compareDate(row.original) ? { backgroundColor: 'yellow' } : {}}
                >
                  {TableCellComponent(row)}
                  {/* {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        className={clsx('p-4 md:p-12', cell.column.className)}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })} */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        classes={{
          root: 'flex-shrink-0 border-t-1',
        }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
        colSpan={5}
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: false,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={ContactsTablePaginationActions}
      />
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
