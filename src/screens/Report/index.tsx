import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn/dist';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

// import {useRouter} from 'next/router';
// import {useForm} from 'react-hook-form';
// import Modal from 'react-responsive-modal';
// import {Toast} from 'src/hooks/toast';
// import dayjs from 'dayjs';
// import {removePeople} from 'src/pages/api/room';

// import {addReport, listReport, removeReport} from 'src/pages/api/notification';
import {useAppDispatch} from '@hooks/useAppDispatch';
import {appSelector} from '@redux/selector';
import {GetListReportResponse} from '@types';
import {getListReport} from '@redux/thunk';

// const {Column, ColumnGroup} = Table;

const ListReport: React.FC = () => {
  const [listReport, setListReport] = useState<GetListReportResponse>();
  const [open, setOpen] = useState(false);
  // const onCloseModal = () => setOpen(false);
  // const onOpenModal = () => setOpen(true);
  // const {
  //   register,
  //   handleSubmit,

  //   formState: {errors},
  // } = useForm<any>();

  const {code_room} = useSelector(appSelector);

  const tailwind = useTailwind();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (code_room?.building_id) {
      (async () => {
        const resultAction = await dispatch(
          getListReport({building_id: code_room.building_id}),
        );
        if (getListReport.fulfilled.match(resultAction)) {
          setListReport(resultAction.payload);
        }
      })();
    }
  }, [code_room?.building_id, dispatch]);

  // -------------------Add  repost------------------
  // const onSubmit = async (data2: any) => {
  //   setLoading(true);
  //   await addReport(data2)
  //     .then((result: any) => {
  //       setLoading(false);
  //       setOpen(false);
  //       Toast('success', result?.data?.message);
  //     })
  //     .catch(err => {
  //       Toast('error', err?.response?.data);
  //       setOpen(false);
  //       setLoading(false);
  //     })
  //     .finally(() => {
  //       setResetPage(resetPage + 1);
  //     });
  // };

  // // -------------------End repost------------------

  // const handleRemove = async (id: any) => {
  //   await removeReport(id)
  //     .then(result => {
  //       Toast('success', result?.data?.message);
  //     })
  //     .catch(err => {
  //       Toast('error', err?.data?.message);
  //     })
  //     .finally(() => {
  //       setResetPage(resetPage + 1);
  //     });
  // };

  return (
    <View style={tailwind('flex flex-col')}>
      <View style={tailwind('overflow-x-auto sm:rounded-lg')}>
        <View style={tailwind('inline-block min-w-full align-middle')}>
          {/* <button
            onClick={onOpenModal}
            stule={tailwind(
              'text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2',
            )}>
            Gửi thông báo
          </button>
          <View style={tailwind('text-right')}>
            <Modal open={open} onClose={onCloseModal} center>
              <div className="w-full">
                <div className="  ">
                  <h2 className="pt-2 text-xl">Thông báo </h2>
                </div>{' '}
                <div className="border  p-2 ">
                  <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
                    <div className="   md:flex md:items-center mb-6 mt-3  ">
                      <div className=" hidden md:w-1/5">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name">
                          Phòng
                        </label>
                      </div>
                      <div className=" hidden md:w-4/5">
                        <input
                          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
                          id="inline-full-name"
                          type="text"
                          placeholder="Xin mời nhập tên phòng"
                          defaultValue={codeRoom && codeRoom.name}
                          {...register('roomName', {
                            required: true,
                            minLength: 3,
                          })}
                        />
                        <p className="text-red-500 text-sm">
                          {errors.fullName?.type === 'required' && (
                            <span>Không được để trống </span>
                          )}
                        </p>
                        <p className="text-red-500 text-sm">
                          {errors.fullName?.type === 'minLength' && (
                            <span>Tối thiểu 3 ký tự </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="md:flex mb-6 w-full justify-center">
                      <div className="md:w-1/5">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-full-name">
                          Nội dung
                        </label>
                      </div>
                      <div className="md:w-[70%]">
                        <textarea
                          className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 pl-4 text-gray-700 leading-tight"
                          id="inline-full-name"
                          rows={6}
                          placeholder="Xin mời nhập nội dung"
                          {...register('content', {
                            required: true,
                            minLength: 3,
                          })}
                        />
                        <p className="text-red-500 text-sm">
                          {errors.fullName?.type === 'required' && (
                            <span>Không được để trống </span>
                          )}
                        </p>
                        <p className="text-red-500 text-sm">
                          {errors.fullName?.type === 'minLength' && (
                            <span>Tối thiểu 3 ký tự </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-6 ">
                      <div className="hidden">
                        <div className="md:w-2/3">
                          <input
                            className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
                            id="inline-password"
                            type="text"
                            value={codeRoom && codeRoom.idHouse}
                            {...register('idHouse', {required: true})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="md:flex md:items-center  ">
                      <div className="hidden">
                        <div className="md:w-2/3">
                          <input
                            className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
                            id="inline-password"
                            type="text"
                            value={codeRoom && codeRoom._id}
                            {...register('idRoom', {required: true})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className=" text-center">
                      <button
                        className="bg-purple-500 text-white font-bold py-2 px-4 rounded"
                        type="submit">
                        Thêm thông báo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </View>
          <View style={tailwind('overflow-hidden')}>
            <Table
              dataSource={listReport?.map(
                (
                  item: {
                    _id: any;
                    roomName: any;
                    content: any;
                    createdAt: dayjs.dayjsInput;
                    status: any;
                  },
                  index: number,
                ) => ({
                  index: index + 1,
                  key: item._id,
                  name: item.roomName,
                  content: item.content,
                  date: dayjs(item.createdAt).format('DD/MM/YYYY'),
                  status: item.status,
                }),
              )}
              pagination={{pageSize: 5}}>
              <Column title="STT" dataIndex="index" key="name" />

              <Column title="Phòng" dataIndex="name" key="name" />
              <Column
                title="Nội dung"
                dataIndex="content"
                key="content"
                width={500}
              />
              <Column title="Ngày thông báo" dataIndex="date" key="date" />
              <Column
                title="Trạng thái"
                dataIndex="status"
                key="date"
                render={status => {
                  return (
                    <>
                      {status == false ? (
                        <div
                          className=" p-2 mb-4 text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                          role="alert">
                          <div>
                            <span className="font-medium">Chưa xử lý</span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className=" p-2 mb-4 text-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                          role="alert">
                          <div>
                            <span className="font-medium">Đã xử lý</span>
                          </div>
                        </div>
                      )}
                    </>
                  );
                }}
              />
              <Column
                title=""
                key="action"
                render={action => {
                  return (
                    <>
                      <Popconfirm
                        placement="top"
                        title="Bạn có muốn xóa không?"
                        onConfirm={() => handleRemove(action.key)}
                        okText="Có"
                        cancelText="Không">
                        <button
                          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                          type="submit">
                          Xóa
                        </button>
                      </Popconfirm>
                    </>
                  );
                }}
              />
            </Table> 
           </View> */}
        </View>
      </View>
    </View>
  );
};

export default ListReport;
