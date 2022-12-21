export default [{
  _name: 'CSidebarNav',
  _children: [{
      _name: 'CSidebarNavTitle',
      _children: ['Menu']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Items',
      to: '/dashboard',
      icon: 'cil-restaurant'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Sections',
      to: '/dashboard',
      icon: 'cil-list'
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['Orders']
    },

    {
      _name: 'CSidebarNavItem',
      name: 'Orders',
      to: '/orders',
      icon: 'cil-basket'
      
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Notifications',
      to: '/orders',
      icon: 'cil-bell',
      badge: {
        color: 'primary',
        text: 'New',
        shape: 'pill'
      }
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Payments',
      to: '/orders',
      icon: 'cil-wallet'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Delivery',
      to: '/orders',
      icon: 'cil-truck'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Settings',
      to: '/orders',
      icon: 'cil-settings'
    },
    {
      _name: 'CSidebarNavTitle',
      _children: ['Settings']
    },
    {
      _name: 'CSidebarNavItem',
      name: 'General',
      to: '/settings',
      icon: 'cil-settings',
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Design',
      to: '/settings',
      icon: 'cil-paint-bucket'
    },
    {
      _name: 'CSidebarNavItem',
      name: 'Account',
      to: '/settings',
      icon: 'cil-user'
    }
  ],
}]