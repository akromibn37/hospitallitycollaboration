import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@mui/material/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HospitalitysTable from './HospitalitysTable';
import { openEditHospitalityDialog, selectHospitalitys } from './store/hospitalitysSlice';

function HospitalitysList(props) {
  const dispatch = useDispatch();
  const hospitalitys = useSelector(selectHospitalitys);
  const searchText = useSelector(({ hospitalitysApp }) => hospitalitysApp.hospitalitys.searchText);
  const hospitality = useSelector(({ hospitalitysApp }) => hospitalitysApp.hospitality);
  const user = useSelector(({ auth }) => auth.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map((row) => row.original.id);

      //     return (
      //       selectedFlatRows.length > 0 && <HospitalitysMultiSelectMenu selectedHospitalityIds={selectedRowIds} />
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
        Header: 'Hospitality Id',
        accessor: 'id',
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
        Header: 'Hospitality Contact',
        accessor: 'hos_contact_name',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitality PhoneNumber',
        accessor: 'hos_phone_number',
        className: 'font-medium',
        sortable: true,
      },
      {
        Header: 'Hospitality Type',
        accessor: 'hos_type',
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
      //           dispatch(toggleStarredHospitality(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         {hospitality.starred && hospitality.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       <IconButton
      //         onClick={(ev) => {
      //           ev.stopPropagation();
      //           dispatch(removeHospitality(row.original.id));
      //         }}
      //         size="large"
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton>
      //     </div>
      //   ),
      // },
    ],
    // [dispatch, hospitality.starred]
    []
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return hospitalitys;
      }
      return FuseUtils.filterArrayByString(hospitalitys, _searchText);
    }

    if (hospitalitys) {
      setFilteredData(getFilteredArray(hospitalitys, searchText));
    }
  }, [hospitalitys, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no hospitalitys!
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
      <HospitalitysTable
        columns={columns}
        data={filteredData}
        onRowClick={(ev, row) => {
          if (row) {
            if (user.role !== 'user') {
              dispatch(openEditHospitalityDialog(row.original));
            }
          }
        }}
      />
    </motion.div>
  );
}

export default HospitalitysList;
