import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerBookingsTable from './CustomerBookingsTable';
import {
  openEditCustomerBookingDialog,
  selectCustomerBookings,
} from './store/customerBookingsSlice';

function CustomerBookingsList(props) {
  const dispatch = useDispatch();
  const customerBookings = useSelector(selectCustomerBookings);
  const searchText = useSelector(
    ({ customerBookingsApp }) => customerBookingsApp.customerBookings.searchText
  );
  const customerBooking = useSelector(
    ({ customerBookingsApp }) => customerBookingsApp.customerBooking
  );
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <CustomerBookingsMultiSelectMenu selectedCustomerBookingIds={selectedRowIds} />
      //     );
      //   },
      //   accessor: 'avatar',
      //   Cell: ({ row }) => {
      //     return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
      //   },
      //   className: 'justify-center',
      //   width: 64,
      //   sortable: false,
      // },
      {
        Header: 'CustomerBooking Id',
        accessor: 'id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'CustomerService Id',
        accessor: 'cus_svc_id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Start Date',
        accessor: 'start_date',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'End Date',
        accessor: 'end_date',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitality Name',
        accessor: 'hos_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitality Contact Name',
        accessor: 'hos_contact_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitality Phone Number',
        accessor: 'hos_phone_number',
        className: 'font-medium',
        sortable: true,
      },
      // {
      //   id: 'action',
      //   width: 128,
      //   sortable: false,
      //   Cell: ({ row }) => (
      //     <div className="flex items-center">
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(toggleStarredCustomerBooking(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {customerBooking.starred && customerBooking.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeCustomerBooking(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, customerBooking.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return customerBookings;
      }
      return FuseUtils.filterArrayByString(customerBookings, _searchText);
    }

    if (customerBookings) {
      setFilteredData(getFilteredArray(customerBookings, searchText));
    }
  }, [customerBookings, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no customerBookings!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      className="flex flex-auto w-full max-h-full"
    >
      <CustomerBookingsTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            if (user.role !== 'user') {
              dispatch(openEditCustomerBookingDialog(row.original));
            }
          }
        }}
      />
    </motion.div>
  );
}

export default CustomerBookingsList;
