import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerServicesTable from './CustomerServicesTable';
import {
  openEditCustomerServiceDialog,
  selectCustomerServices,
} from './store/customerServicesSlice';

function CustomerServicesList(props) {
  const dispatch = useDispatch();
  const customerServices = useSelector(selectCustomerServices);
  const searchText = useSelector(
    ({ customerServicesApp }) => customerServicesApp.customerServices.searchText
  );
  const customerService = useSelector(
    ({ customerServicesApp }) => customerServicesApp.customerService
  );
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <CustomerServicesMultiSelectMenu selectedCustomerServiceIds={selectedRowIds} />
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
        Header: 'CustomerService Id',
        accessor: 'id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Customer Phone Number',
        accessor: 'customer_phone_number',
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
      {
        Header: 'Service Name',
        accessor: 'svc_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Responsible person',
        accessor: 'user_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
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
      //           dispatch(toggleStarredCustomerService(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {customerService.starred && customerService.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeCustomerService(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, customerService.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return customerServices;
      }
      return FuseUtils.filterArrayByString(customerServices, _searchText);
    }

    if (customerServices) {
      setFilteredData(getFilteredArray(customerServices, searchText));
    }
  }, [customerServices, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no customerServices!
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
      <CustomerServicesTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            if (user.role !== 'user') {
              dispatch(openEditCustomerServiceDialog(row.original));
            }
          }
        }}
      />
    </motion.div>
  );
}

export default CustomerServicesList;
