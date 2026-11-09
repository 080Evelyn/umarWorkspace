export type VisitStatus = "Active" | "Checked Out";

export interface Visit {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  paymentType: string;
  checkIn: string;
  checkOut: string | null;
  status: VisitStatus;
}

export const initialVisits: Visit[] = [
  {
    id: "VIS-001",
    name: "John Williams",
    phone: "08012345678",
    email: "john@example.com",
    service: "Private Office",
    paymentType: "Card",
    checkIn: "08:30 AM",
    checkOut: null,
    status: "Active",
  },
  {
    id: "VIS-002",
    name: "Mary Johnson",
    phone: "08023456789",
    email: "mary@example.com",
    service: "Hot Desk",
    paymentType: "Transfer",
    checkIn: "09:15 AM",
    checkOut: null,
    status: "Active",
  },
  {
    id: "VIS-003",
    name: "David Okoro",
    phone: "08034567890",
    email: "david@example.com",
    service: "Meeting Room",
    paymentType: "Cash",
    checkIn: "09:45 AM",
    checkOut: "11:30 AM",
    status: "Checked Out",
  },
  {
    id: "VIS-004",
    name: "Grace Williams",
    phone: "08045678901",
    email: "grace@example.com",
    service: "Private Office",
    paymentType: "Card",
    checkIn: "10:10 AM",
    checkOut: null,
    status: "Active",
  },
  {
    id: "VIS-005",
    name: "Michael James",
    phone: "08056789012",
    email: "michael@example.com",
    service: "Hot Desk",
    paymentType: "Cash",
    checkIn: "10:30 AM",
    checkOut: "12:15 PM",
    status: "Checked Out",
  },
  {
    id: "VIS-006",
    name: "Sarah Adams",
    phone: "08067890123",
    email: "sarah@example.com",
    service: "Meeting Room",
    paymentType: "Transfer",
    checkIn: "11:00 AM",
    checkOut: null,
    status: "Active",
  },
];

export const serviceTypes = [
  "Private Office",
  "Hot Desk",
  "Meeting Room",
  "Virtual Office",
];

export const paymentTypes = [
  "Cash",
  "Card",
  "Transfer",
];