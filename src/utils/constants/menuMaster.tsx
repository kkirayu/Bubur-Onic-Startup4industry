import {
  UserCog,
  User,
  UserX2,
  BadgeDollarSign,
  BadgePercent,
} from 'lucide-react'

export const menuMaster = [
  {
    href: '/master',
    label: 'Master',
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
        href: '/master/akun',
        label: 'Akun',
        icon: (
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18ZM5 11V17H3V11H5ZM11 13V17H13V13H11ZM7 9V17H9V9H7Z"
              fill="#A2A3B7"
            />
          </svg>
        ),
      },
      {
        href: '/master/kategori-akun',
        label: 'Kategori Akun',
        icon: (
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0ZM14 18H2V2H9V7H14V18ZM5 11V17H3V11H5ZM11 13V17H13V13H11ZM7 9V17H9V9H7Z"
              fill="#A2A3B7"
            />
          </svg>
        ),
      },
      {
        href: '/master/user',
        label: 'User',
        icon: <User size={20} />,
      },
      {
        href: '/master/role',
        label: 'Role',
        icon: <UserCog size={20} />,
      },
      {
        href: '/master/unactive-user',
        label: 'Unactive User',
        icon: <UserX2 size={20} />,
      },
      {
        href: '/master/bonus',
        label: 'Bonus',
        icon: <BadgeDollarSign size={20} />,
      },
      {
        href: '/master/denda',
        label: 'Denda',
        icon: <BadgePercent size={20} />,
      },
    ],
  },
]
