import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as Constant from '../../Constant';

function ShowImagePage() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [source, setSource] = useState(null);
  useEffect(() => {
    console.log('routeParams:', routeParams);
    // dispatch(

    axios
      .get(`${Constant.BASE_URL}/api/v1/scholarship/transaction/slip/${routeParams.transId}`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (response, byte) => response + String.fromCharCode(byte),
            ''
          )
        );
        // setSource(`data:;base64,${base64}`);
        const image = `data:;base64,${base64}`;
        console.log('image:', image);
        setSource(image);
      });
  }, [routeParams]);
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <div>{source && <img src={source} alt="Cat" />}</div>;
      </div>
    </div>
  );
}

export default ShowImagePage;
