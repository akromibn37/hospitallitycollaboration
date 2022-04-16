import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import CustomerProfileDialog from './CustomerProfilesDialog';
import CustomerProfilesHeader from './CustomerProfilesHeader';
import CustomerProfilesList from './CustomerProfilesList';
// import CustomerProfilesSidebarContent from './CustomerProfilesSidebarContent';
import reducer from './store';
import { getCustomerProfiles } from './store/customerProfilesSlice';

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

function CustomerProfilesApp(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    if (user.role === 'user') {
      routeParams.id = user.userId;
    }
    dispatch(getCustomerProfiles(routeParams));
    // dispatch(getCustomerProfileData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<CustomerProfilesHeader pageLayout={pageLayout} />}
        content={<CustomerProfilesList />}
        // leftSidebarContent={<CustomerProfilesSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <CustomerProfileDialog />
    </>
  );
}

export default withReducer('customerProfilesApp', reducer)(CustomerProfilesApp);
