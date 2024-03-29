export const menuKeuangan = [
  {
    href: '/keuangan',
    label: 'Keuangan',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.8333 9.16663H4.16667C3.24619 9.16663 2.5 9.91282 2.5 10.8333V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V10.8333C17.5 9.91282 16.7538 9.16663 15.8333 9.16663Z"
          stroke="#A2A3B7"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83331 9.16663V5.83329C5.83331 4.72822 6.2723 3.66842 7.0537 2.88701C7.8351 2.10561 8.89491 1.66663 9.99998 1.66663C11.105 1.66663 12.1649 2.10561 12.9463 2.88701C13.7277 3.66842 14.1666 4.72822 14.1666 5.83329V9.16663"
          stroke="#A2A3B7"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    child: [
      {
        href: '/keuangan/journal',
        label: 'Journal (Double Entry)',
      },
      {
        href: '/keuangan/kas-bank',
        label: 'Kas Bank',
      },
      {
        href: '/keuangan/piutang',
        label: 'Piutang',
        child: [
          {
            href: '/keuangan/piutang/invoice',
            label: 'Invoice',
          },
          {
            href: '/keuangan/piutang/customer',
            label: 'Customer',
          },
        ],
      },
      {
        href: '/keuangan/hutang',
        label: 'Hutang',
        child: [
          
          {
            href: '/keuangan/hutang/tagihan',
            label: 'Tagihan',
          },
          {
            href: '/keuangan/hutang/vendor',
            label: 'Supplier',
          },
        ],
      },
      {
        href: '/keuangan/aset',
        label: 'Aset',
      },
    ],
  },
]
