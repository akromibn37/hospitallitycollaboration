import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersTable from './UsersTable';
import { openEditUserDialog, selectUsers } from './store/usersSlice';

function UsersList(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);
  const user = useSelector(({ usersApp }) => usersApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <UsersMultiSelectMenu selectedUserIds={selectedRowIds} />
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
        Header: 'First Name',
        accessor: 'name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'SurName',
        accessor: 'surname',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Date Of Birth',
        accessor: 'date_of_birth',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Phone',
        accessor: 'phone_number',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Province',
        accessor: 'province',
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
      //           dispatch(toggleStarredUser(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {user.starred && user.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeUser(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, user.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return users;
      }
      return FuseUtils.filterArrayByString(users, _searchText);
    }

    if (users) {
      setFilteredData(getFilteredArray(users, searchText));
    }
  }, [users, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no users!
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
      <UsersTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            dispatch(openEditUserDialog(row.original));
          }
        }}
      />
    </motion.div>
  );
}

export default UsersList;
