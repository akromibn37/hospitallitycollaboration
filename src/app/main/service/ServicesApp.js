import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import ServiceDialog from './ServicesDialog';
import ServicesHeader from './ServicesHeader';
import ServicesList from './ServicesList';
// import ServicesSidebarContent from './ServicesSidebarContent';
import reducer from './store';
import { getServices } from './store/servicesSlice';

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

function ServicesApp(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    if (user.role === 'user') {
      routeParams.id = user.userId;
    }
    dispatch(getServices(routeParams));
    // dispatch(getServiceData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<ServicesHeader pageLayout={pageLayout} />}
        content={<ServicesList />}
        // leftSidebarContent={<ServicesSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <ServiceDialog />
    </>
  );
}

export default withReducer('servicesApp', reducer)(ServicesApp);
