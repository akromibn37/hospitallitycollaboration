import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerProfilesTable from './CustomerProfilesTable';
import {
  openEditCustomerProfileDialog,
  selectCustomerProfiles,
} from './store/customerProfilesSlice';

function CustomerProfilesList(props) {
  const dispatch = useDispatch();
  const customerProfiles = useSelector(selectCustomerProfiles);
  const searchText = useSelector(
    ({ customerProfilesApp }) => customerProfilesApp.customerProfiles.searchText
  );
  const customerProfile = useSelector(
    ({ customerProfilesApp }) => customerProfilesApp.customerProfile
  );
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <CustomerProfilesMultiSelectMenu selectedCustomerProfileIds={selectedRowIds} />
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
        Header: 'CustomerProfile Id',
        accessor: 'id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'CustomerProfile Name',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'LineId',
        accessor: 'line_id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'PhoneNumber',
        accessor: 'phone_number',
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
      //           dispatch(toggleStarredCustomerProfile(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {customerProfile.starred && customerProfile.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeCustomerProfile(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, customerProfile.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return customerProfiles;
      }
      return FuseUtils.filterArrayByString(customerProfiles, _searchText);
    }

    if (customerProfiles) {
      setFilteredData(getFilteredArray(customerProfiles, searchText));
    }
  }, [customerProfiles, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no customerProfiles!
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
      <CustomerProfilesTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            if (user.role !== 'user') {
              dispatch(openEditCustomerProfileDialog(row.original));
            }
          }
        }}
      />
    </motion.div>
  );
}

export default CustomerProfilesList;
