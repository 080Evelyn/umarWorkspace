export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalVisits: number;
  lastVisit: string;
  joinedDate: string;
  customerType: "Regular" | "Occasional" | "New";
  totalSpent: number;
};

export const initialCustomers: Customer[] = [
  {
    id: "CUS-001",
    name: "John Williams",
    email: "john.williams@email.com",
    phone: "+234 803 456 7890",
    totalVisits: 28,
    lastVisit: "Nov 08, 2026",
    joinedDate: "Jan 12, 2026",
    customerType: "Regular",
    totalSpent: 485000,
  },
  {
    id: "CUS-002",
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    phone: "+234 806 123 4567",
    totalVisits: 16,
    lastVisit: "Nov 07, 2026",
    joinedDate: "Feb 03, 2026",
    customerType: "Regular",
    totalSpent: 320000,
  },
  {
    id: "CUS-003",
    name: "David Okoro",
    email: "david.okoro@email.com",
    phone: "+234 809 234 5678",
    totalVisits: 4,
    lastVisit: "Nov 05, 2026",
    joinedDate: "Oct 18, 2026",
    customerType: "Occasional",
    totalSpent: 85000,
  },
  {
    id: "CUS-004",
    name: "Grace Williams",
    email: "grace.williams@email.com",
    phone: "+234 802 345 6789",
    totalVisits: 1,
    lastVisit: "Nov 04, 2026",
    joinedDate: "Nov 04, 2026",
    customerType: "New",
    totalSpent: 25000,
  },
  {
    id: "CUS-005",
    name: "Michael James",
    email: "michael.james@email.com",
    phone: "+234 805 456 7890",
    totalVisits: 12,
    lastVisit: "Nov 02, 2026",
    joinedDate: "Apr 21, 2026",
    customerType: "Regular",
    totalSpent: 210000,
  },
  {
    id: "CUS-006",
    name: "Sarah Adams",
    email: "sarah.adams@email.com",
    phone: "+234 807 567 8901",
    totalVisits: 3,
    lastVisit: "Oct 28, 2026",
    joinedDate: "Sep 10, 2026",
    customerType: "Occasional",
    totalSpent: 65000,
  },
  {
    id: "CUS-007",
    name: "Daniel Eze",
    email: "daniel.eze@email.com",
    phone: "+234 810 678 9012",
    totalVisits: 9,
    lastVisit: "Oct 25, 2026",
    joinedDate: "May 16, 2026",
    customerType: "Regular",
    totalSpent: 175000,
  },
  {
    id: "CUS-008",
    name: "Esther Bello",
    email: "esther.bello@email.com",
    phone: "+234 813 789 0123",
    totalVisits: 2,
    lastVisit: "Oct 20, 2026",
    joinedDate: "Oct 20, 2026",
    customerType: "Occasional",
    totalSpent: 40000,
  },
];