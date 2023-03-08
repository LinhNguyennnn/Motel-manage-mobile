// import BarChart from '@/components/chart/Bar';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
// import {
//   getBillServiceByYear,
//   getDetailBillServiceByMonthYear,
// } from 'src/pages/api/statistical';
// import BarDien from '@/components/chart/barDien';
// import {useUserContext} from '@/context/UserContext';
// import BarNuoc from '@/components/chart/barNuoc';

const Ternant: React.FC = () => {
  //   const [roomStatisticals, setRoomStatisticals] = useState<any>([]);
  //   const [totalWater, setTotalWater] = useState<any>([]);
  //   const [totalElictic, setTotalElictric] = useState<any>([]);
  //   const [totalElicticDetail, setTotalElictricDetail] = useState<any>([]);
  //   const [checkYear, setCheckYear] = useState(new Date().getFullYear());
  //   const [codeRoom, setCodeRoom] = useState<any>();

  const tailwind = useTailwind();
  //   useEffect(() => {
  //     const data = cookies?.code_room;
  //     setCodeRoom(data as any);
  //   }, [cookies?.code_room]);

  //   const yearStatistical = new Date().getFullYear();
  //   var years = Array.from(
  //     new Array(20),
  //     (val, index) => yearStatistical - index,
  //   );
  //   const checkNameNuoc = 'nuoc';
  //   const checkNameDien = 'dien';

  //   const YearShow = React.useMemo(() => {
  //     const onChange = (data: any) => {
  //       setCheckYear(parseInt(data.target.value));
  //     };
  //     return (
  //       <div className="">
  //         <label
  //           className="block text-gray-700 text-sm font-bold"
  //           htmlFor="username">
  //           Chọn năm thống kê
  //         </label>
  //         <select
  //           className="mt-2 border rounded w-[10%] 2xs:w-[20%] xs:w-[20%] s:w-[20%] py-2 px-3 text-gray-700 leading-tight"
  //           id="status"
  //           onChange={onChange}>
  //           {years?.map((year, index) => {
  //             return (
  //               <option key={index} value={year}>
  //                 {year}
  //               </option>
  //             );
  //           })}
  //         </select>
  //       </div>
  //     );
  //   }, [years]);

  //   useEffect(() => {
  //     if (checkYear && codeRoom?._id) {
  //       const getTotalWater = async () => {
  //         try {
  //           const {data} = await getBillServiceByYear(
  //             codeRoom?._id,
  //             checkNameNuoc,
  //             checkYear,
  //           );
  //           if (data?.data) {
  //             setTotalWater(data?.data as any);
  //           }
  //         } catch (error) {
  //           console.log('error', error);
  //         }
  //       };
  //       getTotalWater();

  //       const getTotalElictric = async () => {
  //         try {
  //           const {data} = await getBillServiceByYear(
  //             codeRoom?._id,
  //             checkNameDien,
  //             checkYear,
  //           );
  //           if (data?.data) {
  //             setTotalElictric(data?.data as any);
  //           }
  //         } catch (error) {
  //           console.log('error', error);
  //         }
  //       };
  //       getTotalElictric();

  //       const getTotalElictricDetail = async () => {
  //         try {
  //           const {data} = await getDetailBillServiceByMonthYear(
  //             codeRoom?._id,
  //             checkNameDien,
  //             7,
  //             checkYear,
  //           );
  //           if (data?.data) {
  //             setTotalElictricDetail(data?.data as any);
  //           }
  //         } catch (error) {
  //           console.log('error', error);
  //         }
  //       };
  //       getTotalElictricDetail();
  //     }
  //   }, [codeRoom?._id, checkYear, checkNameDien]);

  return (
    <View style={tailwind('w-full flex flex-col')}>
      <View style={tailwind('bg-white border rounded-md')}>
        <View style={tailwind('max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8')}>
          <View style={tailwind('lg:flex lg:items-center lg:justify-between')}>
            <View style={tailwind('flex-1 min-w-0')}>
              <Text
                style={tailwind(
                  'text-2xl font-bold leading-7 text-gray-900 sm:text-2xl uppercase',
                )}>
                Bảng thống kê
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* {YearShow} */}
      <View
        style={tailwind('w-full flex lg:flex-nowrap xl:flex-nowrap flex-wrap')}>
        <View
          style={tailwind(
            'w-[100%] lg:w-[50%] xl:w-[50%] bg-white border rounded-md p-2',
          )}>
          {/* <BarDien data={totalElictic} /> */}
        </View>
        <View
          style={tailwind(
            'w-[100%] lg:w-[50%] xl:w-[50%] bg-white border rounded-md p-2',
          )}>
          {/* <BarNuoc dataNuoc={totalWater} /> */}
        </View>
      </View>
    </View>
  );
};

export default Ternant;
