import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setData([]);

    if (token !== '') {
      setLoading(true);

      await axios
        .post(process.env.ENDPOINT_URL, {
          token: token
        })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) {
            toast.error('Token tidak valid, pastikan token benar', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          } else {
            toast.error(err.message, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined
            });
          }
        });
    } else {
      toast.error('Masukan Token anda', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <ToastContainer />
      <h1
        style={{
          margin: 0,
          marginTop: '20px',
          padding: 0,
          textAlign: 'center'
        }}
      >
        Hasil Nilai Semester 2
      </h1>

      <div
        className='box-input'
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <p>Masukan Token Anda</p>

        <div class='input-group mb-3' style={{ width: '400px' }}>
          <input
            type='text'
            class='form-control'
            placeholder='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9......'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            onChange={(e) => setToken(e.target.value)}
          />
          <div class='input-group-append'>
            <button
              class='btn btn-outline-secondary'
              type='button'
              onClick={() => getData()}
            >
              Check
            </button>
          </div>
        </div>

        {loading ? (
          <div
            class='spinner-border'
            style={{ marginTop: '50px', width: '50px', height: '50px' }}
            role='status'
          ></div>
        ) : data && data.length > 0 ? (
          <table
            class='table table-hover table-responsive'
            style={{ width: '80%', marginTop: '30px', maxWidth: '100%' }}
          >
            <thead>
              <tr>
                <th scope='col'>No</th>
                <th scope='col'>Mata Kuliah</th>
                <th scope='col'>SKS</th>
                <th scope='col'>Nilai UTS</th>
                <th scope='col'>Nilai UAS</th>
                <th scope='col'>Nilai Akhir</th>
                <th scope='col'>Nilai Huruf</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.nama_mata_kuliah}</td>
                    <td>{item.sks}</td>
                    <td>{item.nilai_mid}</td>
                    <td>{item.nilai_uas}</td>
                    <td>{item.nilai_akhir}</td>
                    <td>{item.nilai_huruf}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default App;
