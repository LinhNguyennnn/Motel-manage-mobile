export type GetDetailBillServiceRequest = {
  room_id: string;
  building_name: string;
  month: number;
  year: number;
};

export type GetDetailBillServiceResponse = {
  data: {inputValue: number; outputValue: number};
};

export type GetRoomDataRequest = {
  room_id: string;
};

export type GetRoomDataResponse = {
  data: {
    _id: string;
    idHouse: string;
    idAuth: string;
    name: string;
    address: string;
    status: boolean;
    maxMember: number;
    listMember: Array<{
      memberName: string;
      cardNumber: string;
      status: boolean;
      phoneNumber: string;
    }>;
    contract: {
      addressCT: string;
      timeCT: string;
      startTime: string;
      endTime: string;
      additional: Array<string>;
      fine: number;
      imageContract: Array<string>;
      infoTenant: {
        name: string;
        cardNumber: string;
        phoneNumber: string;
        dateRange: string;
        issuedBy: string;
        deposit: number;
      };
      infoLandlord: {
        name: string;
        cardNumber: string;
        phoneNumber: string;
        dateRange: string;
        issuedBy: string;
      };
    };
    price: number;
    service: Array<{
      name: string;
      label: string;
      price: number;
      status: boolean;
      type: boolean;
      idService: string;
    }>;
    area: number;
    subName: string;
    emailOfAuth: string;
  };
};

export type GetBillRoomIDRequest = {
  room_id: string;
  month: number;
  year: number;
};

export type GetBillRoomIDResponse = {
  data: Array<{
    _id: string;
    invoiceService: Array<{
      amount: number;
    }>;
    debt: number;
    paidAmount: number;
  }>;
};

export type CreatePaymentRequest = {
  building_id: string;
  data: any;
};

export type CreatePaymentResponse = {
  redirect: string;
};

export type GetListServiceByHouseRequest = {
  building_id: string;
};

export type GetListServiceByHouseResponse = {
  data: {
    idHouse: string;
    name: string;
    label: string;
    price: number;
    unit: string;
    type: boolean;
    doNotDelete: boolean;
  };
};

export type GetListReportRequest = {
  building_id: string;
};

export type GetListReportResponse = {
  data: {
    idRoom: string;
    idHouse: string;
    roomName: string;
    content: string;
    status: boolean;
  };
};

export type GetListServiceRequest = {
  building_id: string;
  year: number;
  type: 'dien' | 'nuoc';
};

export type GetListServiceResponse = {
  data: {result: number[]; sum: number};
};
