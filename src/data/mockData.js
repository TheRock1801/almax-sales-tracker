export const currentUser = {
  name: 'Brett',
  email: 'brett@almax.co.nz',
}

export const tasks = [
  { id: 1, title: 'Check stock requirements', customer: 'Ridge Field Freight', status: 'Pending', type: 'task' },
  { id: 2, title: 'Introduce new product range', customer: 'Lincoln Source Plastics', status: 'Pending', type: 'task' },
  { id: 3, title: 'Follow up on quote', customer: 'Golden Haven Corp', status: 'Pending', type: 'task' },
]

export const callPlan = {
  today: [
    { id: 1, customer: 'Ridge Field Freight', address: '10 Mackelvie Street, Grey Lynn, Auckland', time: '9:00 AM', duration: '30 min', type: 'VISIT', lat: -36.862, lng: 174.745 },
    { id: 2, customer: 'Sierra Source Medical', address: '50 Ponsonby Road, Ponsonby, Auckland', time: '11:00 AM', duration: '30 min', type: 'PHONE', phone: '0211234567', lat: -36.854, lng: 174.748 },
    { id: 3, customer: 'Golden Haven Corp', address: '105 Albert Street, Auckland CBD', time: '2:00 PM', duration: '30 min', type: 'VISIT', lat: -36.848, lng: 174.763 },
  ],
  tomorrow: [
    { id: 4, customer: 'Pinnacle Cascade Co', address: '22 Broadway, Newmarket, Auckland', time: '10:00 AM', duration: '45 min', type: 'VISIT', lat: -36.870, lng: 174.776 },
    { id: 5, customer: 'Metro Isle International', address: '8 Shortland Street, Auckland CBD', time: '2:30 PM', duration: '30 min', type: 'PHONE', phone: '0212345678', lat: -36.845, lng: 174.766 },
  ],
  thisWeek: [
    { id: 6, customer: 'Highland Park Plastics', address: '5 Ti Rakau Drive, East Auckland', time: 'Mon 9:00 AM', duration: '60 min', type: 'VISIT', lat: -36.898, lng: 174.878 },
    { id: 7, customer: 'Silver Gate Consulting', address: '1 Queen Street, Auckland CBD', time: 'Wed 11:00 AM', duration: '30 min', type: 'VISIT', lat: -36.843, lng: 174.767 },
    { id: 8, customer: 'Liberty Source Holdings', address: '45 Victoria Street West', time: 'Thu 3:00 PM', duration: '30 min', type: 'PHONE', phone: '0213456789', lat: -36.849, lng: 174.757 },
  ],
}

export const salesData = [
  { month: 'Jul 2025', sales: 112000 },
  { month: 'Aug 2025', sales: 98000 },
  { month: 'Sep 2025', sales: 135000 },
  { month: 'Oct 2025', sales: 125000 },
  { month: 'Nov 2025', sales: 91000 },
  { month: 'Dec 2025', sales: 108000 },
  { month: 'Jan 2026', sales: 115000 },
  { month: 'Feb 2026', sales: 95000 },
  { month: 'Mar 2026', sales: 148000 },
  { month: 'Apr 2026', sales: 220000 },
  { month: 'May 2026', sales: 238000 },
  { month: 'Jun 2026', sales: 229000 },
]

export const topCustomers = [
  { name: 'Silver Gate Consulting', sales: 980000 },
  { name: 'Pinnacle Cascade Co', sales: 320000 },
  { name: 'Metro Isle International', sales: 290000 },
  { name: 'Highland Park Plastics', sales: 265000 },
  { name: 'Golden Haven Corp', sales: 240000 },
  { name: 'Heritage Technologies', sales: 198000 },
  { name: 'Sierra Source Medical', sales: 175000 },
  { name: 'Liberty Source Holdings', sales: 142000 },
  { name: 'Pacific Hill Financial', sales: 118000 },
  { name: 'Ridge Field Freight', sales: 95000 },
]

export const detailedTasks = [
  { id: 1, title: 'Follow up on recent order', customer: 'Silver Gate Consulting', status: 'Pending', type: 'TASK', dueDate: '29 Jun 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '22 Jun 2026' },
  { id: 2, title: 'Check stock requirements', customer: 'Ridge Field Freight', status: 'Pending', type: 'TASK', dueDate: '30 Jun 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '23 Jun 2026' },
  { id: 3, title: 'Introduce new product range', customer: 'Lincoln Source Plastics', status: 'Pending', type: 'TASK', dueDate: '2 Jul 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '24 Jun 2026' },
  { id: 4, title: 'Send updated pricing sheet', customer: 'Golden Haven Corp', status: 'Pending', type: 'TASK', dueDate: '28 Jun 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '20 Jun 2026' },
  { id: 5, title: 'Confirm delivery address', customer: 'Metro Isle International', status: 'Complete', type: 'TASK', dueDate: '25 Jun 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '18 Jun 2026' },
  { id: 6, title: 'Product demo scheduled', customer: 'Pinnacle Cascade Co', status: 'Complete', type: 'NOTE', dueDate: '24 Jun 2026', assignedTo: 'MarkJ', createdBy: 'MarkJ', createdDate: '15 Jun 2026' },
]

export const prospects = [
  { id: 1, accountNo: 'ALPI-000001', name: 'Alpine Auto Parts', phone: '03 434 5678', email: 'info@alpineauto.co.nz', address: '12 Thames Street, Oamaru', status: 'Contacted' },
  { id: 2, accountNo: 'NORT-000001', name: 'North Shore Plumbing Ltd', phone: '09 441 2345', email: 'admin@nspltd.co.nz', address: '45 Archers Road, Auckland', status: 'New' },
  { id: 3, accountNo: 'SOUT-000002', name: 'Southern Cross Painters', phone: '03 477 8901', email: 'contact@scpainters.co.nz', address: '8 Andersons Bay Rd, Dunedin', status: 'Qualified' },
  { id: 4, accountNo: 'WGTN-000003', name: 'Wellington Decorating Co', phone: '04 385 6712', email: 'hello@wdc.co.nz', address: '22 Cuba Street, Wellington', status: 'New' },
]

export const products = [
  { code: 'ALM-001', name: 'Premium Paint Brush Set 5pc', category: 'Brushes', price: 45.99, unit: 'Set' },
  { code: 'ALM-002', name: 'Roller Kit 9" with Tray', category: 'Rollers', price: 28.50, unit: 'Kit' },
  { code: 'ALM-003', name: 'Masking Tape 24mm x 50m', category: 'Prep & Tape', price: 6.90, unit: 'Roll' },
  { code: 'ALM-004', name: 'Drop Cloth 3.6m x 2.7m', category: 'Protective Gear', price: 19.95, unit: 'Each' },
  { code: 'ALM-005', name: 'Angled Sash Brush 2"', category: 'Brushes', price: 12.50, unit: 'Each' },
  { code: 'ALM-006', name: 'Paint Sprayer Pro 650W', category: 'Sprayers', price: 189.00, unit: 'Each' },
  { code: 'ALM-007', name: 'Roller Cover 9" 3-Pack', category: 'Rollers', price: 14.99, unit: 'Pack' },
  { code: 'ALM-008', name: 'Painters Tape Blue 48mm', category: 'Prep & Tape', price: 8.50, unit: 'Roll' },
  { code: 'ALM-009', name: 'Extension Pole 1.2m-2.4m', category: 'Accessories', price: 34.95, unit: 'Each' },
  { code: 'ALM-010', name: 'Paint Tray Liner 9" 5-Pack', category: 'Accessories', price: 9.99, unit: 'Pack' },
  { code: 'ALM-011', name: 'Disposable Gloves Box 100', category: 'Protective Gear', price: 22.00, unit: 'Box' },
  { code: 'ALM-012', name: 'Caulking Gun Heavy Duty', category: 'Accessories', price: 27.50, unit: 'Each' },
]

export const categories = ['All Categories', 'Brushes', 'Rollers', 'Prep & Tape', 'Protective Gear', 'Sprayers', 'Accessories']

export const customers = [
  {
    id: 1,
    name: 'Almax Professional Painters Tools',
    accountNo: 'ALMAX-0001',
    address: '6b TY Duncan Road, Oamaru North, Oamaru 9494',
    phone: '03 434 5678',
    email: 'sales@almax.co.nz',
    lat: -45.0878,
    lng: 170.9748,
    salesYTD: '$148,400',
    lastVisit: '12 Jun 2026',
    nextCall: 'Today, 9:00 AM',
    outstandingBalance: '$4,250.00',
    creditLimit: '$20,000.00',
    paymentTerms: '30 days',
    notes: [
      { id: 1, date: '12 Jun 2026', author: 'MarkJ', text: 'Discussed new roller product range — very interested in ALM-007 and ALM-009. Follow up next visit.' },
      { id: 2, date: '28 May 2026', author: 'MarkJ', text: 'Delivered order #4521. All good, customer happy with delivery time.' },
    ],
    tasks: [
      { id: 1, title: 'Follow up on recent order', due: '29 Jun 2026', status: 'Pending' },
      { id: 2, title: 'Send updated pricing sheet', due: '28 Jun 2026', status: 'Pending' },
    ],
  },
  { id: 2, name: 'Ridge Field Freight', accountNo: 'RIDG-0002', address: '10 Mackelvie Street, Grey Lynn, Auckland', phone: '093456789', email: 'contact@ridgefield.co.nz', lat: -36.862, lng: 174.745, salesYTD: '$95,000', lastVisit: '10 Jun 2026', nextCall: 'Tomorrow', outstandingBalance: '$1,200.00', creditLimit: '$10,000.00', paymentTerms: '30 days', notes: [], tasks: [] },
  { id: 3, name: 'Sierra Source Medical', accountNo: 'SIER-0003', address: '50 Ponsonby Road, Ponsonby, Auckland', phone: '092345678', email: 'info@sierrasource.co.nz', lat: -36.854, lng: 174.748, salesYTD: '$175,000', lastVisit: '8 Jun 2026', nextCall: 'Next Week', outstandingBalance: '$0.00', creditLimit: '$15,000.00', paymentTerms: '20 days', notes: [], tasks: [] },
  { id: 4, name: 'Golden Haven Corp', accountNo: 'GOLD-0004', address: '105 Albert Street, Auckland CBD', phone: '091234567', email: 'hello@goldenhaven.co.nz', lat: -36.848, lng: 174.763, salesYTD: '$240,000', lastVisit: '5 Jun 2026', nextCall: 'Today, 2:00 PM', outstandingBalance: '$8,500.00', creditLimit: '$25,000.00', paymentTerms: '30 days', notes: [], tasks: [] },
]
