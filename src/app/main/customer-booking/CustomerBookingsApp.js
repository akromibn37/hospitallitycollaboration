import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import CustomerBookingDialog from './CustomerBookingsDialog';
import CustomerBookingsHeader from './CustomerBookingsHeader';
import CustomerBookingsList from './CustomerBookingsList';
// import CustomerBookingsSidebarContent from './CustomerBookingsSidebarContent';
import reducer from './store';
import { getCustomerBookings } from './store/customerBookingsSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 72,
    height: 72,
    [theme.breakpoints.up('lg')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageSimple-wrapper': {
    minHeight: 0,
  },
  '& .FusePageSimple-contentWrapper': {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      height: '100%',
    },
  },
  '& .FusePageSimple-content': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  '& .FusePageSimple-sidebar': {
    width: 256,
    border: 0,
  },
}));

function CustomerBookingsApp(props) {
  const dispatch = useDispatch();
  // const user = useSelector(({ auth }) => auth.user);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    // if (user.role === 'user') {
    //   routeParams.id = user.userId;
    // }
    dispatch(getCustomerBookings(routeParams));
    // dispatch(getCustomerBookingData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<CustomerBookingsHeader pageLayout={pageLayout} />}
        content={<CustomerBookingsList />}
        // leftSidebarContent={<CustomerBookingsSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <CustomerBookingDialog />
    </>
  );
}

export default withReducer('customerBookingsApp', reducer)(CustomerBookingsApp);
