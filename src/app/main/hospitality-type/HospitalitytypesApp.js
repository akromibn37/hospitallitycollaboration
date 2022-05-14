import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import HospitalitytypeDialog from './HospitalitytypesDialog';
import HospitalitytypesHeader from './HospitalitytypesHeader';
import HospitalitytypesList from './HospitalitytypesList';
// import HospitalitytypesSidebarContent from './HospitalitytypesSidebarContent';
import reducer from './store';
import { getHospitalitytypes } from './store/hospitalitytypesSlice';

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

function HospitalitytypesApp(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const pageLayout = useRef(null);
  const routeParams = useParams();

  useDeepCompareEffect(() => {
    if (user.role === 'user') {
      routeParams.id = user.userId;
    }
    dispatch(getHospitalitytypes(routeParams));
    // dispatch(getHospitalitytypeData());
  }, [dispatch, routeParams]);

  return (
    <>
      <Root
        header={<HospitalitytypesHeader pageLayout={pageLayout} />}
        content={<HospitalitytypesList />}
        // leftSidebarContent={<HospitalitytypesSidebarContent />}
        sidebarInner
        ref={pageLayout}
        innerScroll
      />
      <HospitalitytypeDialog />
    </>
  );
}

export default withReducer('hospitalitytypesApp', reducer)(HospitalitytypesApp);
