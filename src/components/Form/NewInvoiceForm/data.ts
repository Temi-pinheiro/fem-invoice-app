export const initialData = {
  invoiceNum: '',
  dueDate: '',
  description: '',
  paymentTermId: '',
  status: 'pending',
};
export const receivingAddrData = {
  city: '',
  address: '',
  country: '',
  postCode: '',
};
export const billingAddrData = {
  city: '',
  address: '',
  country: '',
  postCode: '',
  email: '',
  clientName: '',
};

export const initialDataSchema = {
  invoiceNum: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please add an invoice number',
      },
    ],
  },
  dueDate: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please add a due date',
      },
    ],
  },
  description: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please add a description',
      },
    ],
  },

  paymentTermId: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please select a payment term',
      },
    ],
  },
};
export const receivingAddrSchema = {
  city: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a city',
      },
    ],
  },
  address: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter an address',
      },
    ],
  },
  state: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a state',
      },
    ],
  },

  postCode: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a postCode',
      },
    ],
  },
};
export const billingAddrSchema = {
  city: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a city',
      },
    ],
  },
  address: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter an address',
      },
    ],
  },
  state: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a state',
      },
    ],
  },

  postCode: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a postCode',
      },
    ],
  },
  clientName: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter the client&apos;s email',
      },
    ],
  },
  email: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: 'Please enter a postCode',
      },
    ],
  },
};
