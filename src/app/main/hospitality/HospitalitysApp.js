import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import HospitalityDialog from './HospitalitysDialog';
import HospitalitysHeader from './HospitalitysHeader';
import HospitalitysList from './HospitalitysList';
// import HospitalitysSidebarContent from './HospitalitysSidebarContent';
import reducer from './store';
import { getHospitalitys } from './store/hospitalitysSlice';

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

function HospitalitysApp(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    if (user.role === 'user') {
      routeParams.id = user.userId;
    }
    dispatch(getHospitalitys(routeParams));
    // dispatch(getHospitalityData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<HospitalitysHeader pageLayout={pageLayout} />}
        content={<HospitalitysList />}
        // leftSidebarContent={<HospitalitysSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <HospitalityDialog />
    </>
  );
}

export default withReducer('hospitalitysApp', reducer)(HospitalitysApp);
