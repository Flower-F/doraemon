import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(true); // true 表示动图

  const getSource = (type: boolean) => {
    setLoading(true);
    if (type) {
      axios
        .get(
          'https://service-aja60qcs-1305624698.gz.apigw.tencentcs.com/release/api/dynamic'
        )
        .then((res) => {
          setSource(res.data.data.url);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .get(
          'https://service-aja60qcs-1305624698.gz.apigw.tencentcs.com/release/api/static'
        )
        .then((res) => {
          setSource(res.data.data.url);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getSource(type);
  }, []);

  return (
    <div className='min-h-screen main-bg relative flex items-center'>
      <div className='text-center w-full pb-16'>
        {loading ? (
          <div className='font-semibold text-xl text-black flex items-center justify-center'>
            <svg
              className='animate-spin h-5 w-5 mr-3 text-black'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            哆啦哆啦哆啦哆啦
          </div>
        ) : (
          <img src={source} alt='doraemon' className='w-3/4 inline-block' />
        )}
      </div>

      <div className='flex absolute bottom-20 w-full justify-center'>
        <button
          className='button'
          onClick={() => {
            setType(!type);
            getSource(!type);
          }}
        >
          我要{type ? '静' : '动'}图
        </button>

        <button className='button ml-4' onClick={() => getSource(type)}>
          获取表情
        </button>
      </div>
    </div>
  );
}

export default App;
