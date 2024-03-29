export const initialData = {
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
        message: 'Please enter a post code',
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
  email: {
    rules: [
      {
        rule: 'pattern',
        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        message: 'Please enter a valid email',
      },
      {
        rule: 'required',
        value: true,
        message: 'Please enter an email address',
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
        message: 'Please enter a post code',
      },
    ],
  },
  clientName: {
    rules: [
      {
        rule: 'required',
        value: true,
        message: "Please enter the client's  email",
      },
    ],
  },
};
