export type TeamRole = "Admin" | "Staff";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TeamRole;
  status: "Active" | "Inactive";
  joinedDate: string;
};

export type TeamInvitation = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  sentDate: string;
  status: "Pending";
};

export const initialTeamMembers: TeamMember[] = [
  {
    id: "TEAM-001",
    name: "Evelyn Okafor",
    email: "evelyn@workspace.com",
    phone: "+234 803 111 2233",
    role: "Admin",
    status: "Active",
    joinedDate: "Jan 10, 2026",
  },
  {
    id: "TEAM-002",
    name: "David Williams",
    email: "david@workspace.com",
    phone: "+234 806 222 3344",
    role: "Manager",
    status: "Active",
    joinedDate: "Feb 15, 2026",
  },
  {
    id: "TEAM-003",
    name: "Grace Okoro",
    email: "grace@workspace.com",
    phone: "+234 809 333 4455",
    role: "Staff",
    status: "Active",
    joinedDate: "Mar 02, 2026",
  },
  {
    id: "TEAM-004",
    name: "Michael James",
    email: "michael@workspace.com",
    phone: "+234 802 444 5566",
    role: "Staff",
    status: "Active",
    joinedDate: "Apr 18, 2026",
  },
  {
    id: "TEAM-005",
    name: "Sarah Adams",
    email: "sarah@workspace.com",
    phone: "+234 805 555 6677",
    role: "Manager",
    status: "Inactive",
    joinedDate: "May 20, 2026",
  },
];

export const initialInvitations: TeamInvitation[] = [
  {
    id: "INV-001",
    name: "Daniel Eze",
    email: "daniel@workspace.com",
    role: "Staff",
    sentDate: "Nov 07, 2026",
    status: "Pending",
  },
  {
    id: "INV-002",
    name: "Esther Bello",
    email: "esther@workspace.com",
    role: "Manager",
    sentDate: "Nov 08, 2026",
    status: "Pending",
  },
];