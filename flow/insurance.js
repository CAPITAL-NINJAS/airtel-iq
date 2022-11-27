const whatsapp = require('./../whatsapp/whatsapp');

// Send Insurance Services to customer
exports.sendInsuranceServices = (options) => {
  const message = {
    text: 'We provide all types of Insurance Services',
  };

  const list = {
    heading: 'Insurance Services',
    options: [
      {
        tag: 'I-01',
        title: 'Buy New Insurance',
        description: 'Insure your n your Family Future ',
      },
      {
        tag: 'I-02',
        title: 'Find details',
        description: 'Get Existing Insurance Details',
      },
      {
        tag: 'I-03',
        title: 'Pay Installment',
        description: 'Pay EMI for Insurance',
      },
      ,
      {
        tag: 'I-04',
        title: 'Renew Policy',
        description: 'Renew Existing Policy',
      },
      ,
      {
        tag: 'I-05',
        title: 'Drop Insurance',
        description: 'Stop policy, Claim Insurance',
      },
      ,
      {
        tag: 'I-06',
        title: 'Raise Claim',
        description: 'Claim for Existing Policy',
      },
      ,
      {
        tag: 'I-07',
        title: 'Claim status',
        description: 'Check updates on your claim',
      },
    ],
  };

  options.message = message;
  options.list = list;

  whatsapp.sendInteractiveList(options);
};
