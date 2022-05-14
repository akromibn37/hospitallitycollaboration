import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HospitalitytypesTable from './HospitalitytypesTable';
import {
  openEditHospitalitytypeDialog,
  selectHospitalitytypes,
} from './store/hospitalitytypesSlice';

function HospitalitytypesList(props) {
  const dispatch = useDispatch();
  const hospitalitytypes = useSelector(selectHospitalitytypes);
  const searchText = useSelector(
    ({ hospitalitytypesApp }) => hospitalitytypesApp.hospitalitytypes.searchText
  );
  const hospitalitytype = useSelector(
    ({ hospitalitytypesApp }) => hospitalitytypesApp.hospitalitytype
  );
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <HospitalitytypesMultiSelectMenu selectedHospitalitytypeIds={selectedRowIds} />
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
        Header: 'Hospitalitytype Id',
        accessor: 'id',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitalitytype Name',
        accessor: 'hos_type_name',
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
      //           dispatch(toggleStarredHospitalitytype(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {hospitalitytype.starred && hospitalitytype.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeHospitalitytype(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, hospitalitytype.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return hospitalitytypes;
      }
      return FuseUtils.filterArrayByString(hospitalitytypes, _searchText);
    }

    if (hospitalitytypes) {
      setFilteredData(getFilteredArray(hospitalitytypes, searchText));
    }
  }, [hospitalitytypes, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no hospitalitytypes!
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
      <HospitalitytypesTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            if (user.role !== 'user') {
              dispatch(openEditHospitalitytypeDialog(row.original));
            }
          }
        }}
      />
    </motion.div>
  );
}

export default HospitalitytypesList;
