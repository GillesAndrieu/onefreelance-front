// ----------------------------------------------------------------------

const icon = (name: string) => (
  <img width="100%" height="100%" src={`/assets/icons/navbar/${name}.png`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('bar-graph'),
  },
  {
    title: 'Activity report',
    path: '/activity-report',
    icon: icon('schedule'),
  },
  {
    title: 'Users',
    path: '/users',
    icon: icon('team'),
  },
  {
    title: 'Contracts',
    path: '/contracts',
    icon: icon('contract'),
  },
  {
    title: 'Clients',
    path: '/clients',
    icon: icon('customer-care'),
  }
];
