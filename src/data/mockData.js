export const currentUser = {
  name: 'Mark Jones',
  email: 'mark.jones@almax.co.nz',
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

export const customers = [
  { id: 1, name: 'Ridge Field Freight', address: '10 Mackelvie Street, Grey Lynn, Auckland', phone: '093456789', email: 'contact@ridgefield.co.nz', lat: -36.862, lng: 174.745 },
  { id: 2, name: 'Sierra Source Medical', address: '50 Ponsonby Road, Ponsonby, Auckland', phone: '092345678', email: 'info@sierrasource.co.nz', lat: -36.854, lng: 174.748 },
  { id: 3, name: 'Golden Haven Corp', address: '105 Albert Street, Auckland CBD', phone: '091234567', email: 'hello@goldenhaven.co.nz', lat: -36.848, lng: 174.763 },
  { id: 4, name: 'Pinnacle Cascade Co', address: '22 Broadway, Newmarket, Auckland', phone: '094567890', email: 'admin@pinnaclecascade.co.nz', lat: -36.870, lng: 174.776 },
  { id: 5, name: 'Silver Gate Consulting', address: '1 Queen Street, Auckland CBD', phone: '095678901', email: 'info@silvergate.co.nz', lat: -36.843, lng: 174.767 },
  { id: 6, name: 'Metro Isle International', address: '8 Shortland Street, Auckland CBD', phone: '096789012', email: 'contact@metroisle.co.nz', lat: -36.845, lng: 174.766 },
  { id: 7, name: 'Highland Park Plastics', address: '5 Ti Rakau Drive, East Auckland', phone: '097890123', email: 'sales@highlandpark.co.nz', lat: -36.898, lng: 174.878 },
  { id: 8, name: 'Liberty Source Holdings', address: '45 Victoria Street West, Auckland', phone: '098901234', email: 'info@libertysource.co.nz', lat: -36.849, lng: 174.757 },
]
