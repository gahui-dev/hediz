import { useEffect, useState, useRef, useCallback } from 'react';
import { Form, redirect } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

function Info() {
  const [info, setInfo] = useState([]);
  const [selectClosedDay, setSelectClosedDay] = useState();
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const token = localStorage.getItem('jwtauthtoken');
  const shop_seq = localStorage.getItem('shop_seq');
  const convertArrayToString = (array) => {
    return array.join(',');
  };

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: '수정 성공',
      detail: '수정 성공하였습니다.',
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: '수정 실패',
      detail: '수정에 실패했습니다. 다시 시도해주세요.',
      life: 3000,
    });
  };

  const closedDay = [
    { shop_offday: '일요일', shop_off: '1' },
    { shop_offday: '월요일', shop_off: '2' },
    { shop_offday: '화요일', shop_off: '3' },
    { shop_offday: '수요일', shop_off: '4' },
    { shop_offday: '목요일', shop_off: '5' },
    { shop_offday: '금요일', shop_off: '6' },
    { shop_offday: '토요일', shop_off: '7' },
  ];
  useEffect(() => {
    axios
      .get('http://localhost:8080/hairshop/info/' + shop_seq, {
        headers: { jwtauthtoken: token },
      })
      .then((response) => {
        console.log(response.data);
        setInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // useEffect(async() => {
  //   const token = localStorage.getItem("jwtauthtoken");
  //   console.log("token:", token);
  //   const response = await fetch('http://localhost:8080/hairshop/info', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'jwtauthtoken': token
  //     },
  //   });
  //   if (response.status !== 200) {
  //       console.log(response.status);
  //       // throw json({ message: 'Could not save event.' }, { status: 500 });
  //     }

  // console.log("email:" , email);

  // const response = await axios({
  //    method:"GET",
  //    url:"http://localhost:8080/hairshop/info",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'jwtauthtoken': token,
  //       'xyz':'hello'
  //     }
  //   });
  //   console.log("Hairshop.response >>>>>>>>>>>..", response );
  //   if (response.status !== 200) {
  //     console.log(response.status);
  //     // throw json({ message: 'Could not save event.' }, { status: 500 });
  //   }

  //   axios
  //     .get('http://localhost:8080/hairshop/info/1')
  //     .then((res) => {

  //       // const token = localStorage.getItem('jwtauthtoken');
  //       // console.log("토근 값 " , token);

  //       console.log(res.data);
  //       setInfo(res.data);
  //       setSelectClosedDay(
  //         res.data.shop_off ? res.data.shop_off.split(',') : []
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <>
      <Panel
        header={info.shop_name}
        toggleable
      >
        <div className='card flex flex-column md:flex-row gap-3'>
          <div className='p-inputgroup flex-1'>
            <span className='p-inputgroup-addon'>
              <i className='pi pi-user mr-2'></i> 사업자 등록번호
            </span>
            <InputText
              placeholder='사업자 등록번호'
              value={info.shop_register}
              disabled
            />
          </div>

          {/* <div className='p-inputgroup flex-1'>
            <span className='p-inputgroup-addon'>
              <i className='pi pi-code mr-2'></i> 미용실 고유코드
            </span>
            <InputText
              placeholder='미용실 고유코드'
              value={info.shop_code}
              disabled
            />
            <span className='p-inputgroup-addon'>
              <i className='pi pi-clone'></i>
            </span>
          </div> */}
        </div>
      </Panel>

      <Panel
        header='미용실 정보 수정'
        toggleable
      >
        <Form
          method='post'
          className='flex flex-column flex-wrap gap-4'
        >
          <div className='card flex flex-column gap-3'>
            <div className='p-inputgroup flex-1'>
              <span className='p-inputgroup-addon'>
                <i className='pi pi-calendar-minus'></i>
              </span>
              <InputText
                hidden='true'
                name='shop_seq'
                placeholder='미용실 번호'
                defaultValue={info.shop_seq}
              />

              <MultiSelect
                name='shop_off'
                value={selectClosedDay}
                onChange={(e) => {
                  setSelectClosedDay(e.value);
                  const selectedDaysString = convertArrayToString(e.value);
                  setInfo({ ...info, shop_off: selectedDaysString });
                  console.log(info);
                }}
                options={closedDay}
                optionLabel='shop_offday'
                optionValue='shop_off'
                placeholder='정기 휴무일'
                className='w-full md:w-20rem'
              />
            </div>

            <div className='p-inputgroup flex-1'>
              <span className='p-inputgroup-addon'>
                <i className='pi pi-map'></i>
              </span>
              <InputText
                name='shop_address'
                placeholder='주소'
                defaultValue={info.shop_address}
              />
            </div>

            <InputText
              hidden='true'
              name='shop_off'
              placeholder='휴무일'
              defaultValue={info.shop_off}
            />

            <div className='p-inputgroup flex-1'>
              <span className='p-inputgroup-addon'>
                <i className='pi pi-phone'></i>
              </span>
              <InputText
                name='shop_phone'
                placeholder='미용실 전화번호'
                defaultValue={info.shop_phone}
              />
            </div>

            <div className='flex gap-3'>
              <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                  <i className='pi pi-clock'></i>
                </span>
                <InputText
                  name='shop_start'
                  placeholder='영업 시작시간'
                  defaultValue={info.shop_start}
                />
              </div>

              <div className='p-inputgroup flex-1'>
                <span className='p-inputgroup-addon'>
                  <i className='pi pi-clock'></i>
                </span>
                <InputText
                  name='shop_end'
                  placeholder='영업 종료시간'
                  defaultValue={info.shop_end}
                />
              </div>
            </div>

            <div className='p-inputgroup flex-1'>
              <span className='p-inputgroup-addon'>
                <i className='pi pi-hashtag'></i>
              </span>
              <InputText
                name='shop_tag'
                placeholder='태그'
                defaultValue={info.shop_tag}
              />
            </div>

            <div className='p-inputgroup flex-1'>
              <span className='p-inputgroup-addon'>
                <i className='pi pi-comment'></i>
              </span>
              <InputTextarea
                name='shop_intro'
                placeholder='미용실 소개글'
                defaultValue={info.shop_intro}
                rows={10}
              />
            </div>
          </div>

          <Toast ref={toast} />
          <ConfirmDialog
            group='declarative'
            visible={visible}
            onHide={() => setVisible(false)}
            message='정말 수정하시겠습니까?'
            header='수정하기'
            icon='pi pi-exclamation-triangle'
            accept={accept}
            reject={reject}
          />
          <div className='card flex justify-content-center'>
            <Button
              onClick={() => setVisible(true)}
              icon='pi pi-check'
              label='수정하기'
              type='submit'
            />
          </div>
        </Form>
      </Panel>
    </>
  );
}

export default Info;

export async function action({ request }) {
  const token = localStorage.getItem('jwtauthtoken');
  console.log('토큰 값 ', token);
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log('postData >>>>>', postData);
  const response = await fetch('http://localhost:8080/hairshop/info', {
    method: 'PUT',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
      jwtauthtoken: token,
    },
  });

  console.log(response);

  if (!response.ok) {
    console.log('!response.ok>>', !response.ok);
  }

  return redirect('/hairshop/info');
}
