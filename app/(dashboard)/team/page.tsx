"use client";

import { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Search,
  Mail,
  MoreHorizontal,
  X,
  Clock3,
  Trash2,
  ChevronDown,
} from "lucide-react";

import {
  initialTeamMembers,
  initialInvitations,
  type TeamMember,
  type TeamInvitation,
  type TeamRole,
} from "@/lib/team-data";

import InviteMemberModal from "@/components/team/InviteMemberModal";

type ActiveTab = "members" | "invitations";

const roleStyles: Record<TeamRole, string> = {
  Admin: "bg-purple-50 text-purple-700",
  
  Staff: "bg-slate-100 text-slate-700",
};

export default function TeamPage() {
  const [members, setMembers] =
    useState<TeamMember[]>(initialTeamMembers);

  const [invitations, setInvitations] =
    useState<TeamInvitation[]>(initialInvitations);

  const [activeTab, setActiveTab] = useState<ActiveTab>("members");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const adminCount = members.filter(
    (member) => member.role === "Admin"
  ).length;

  const pendingCount = invitations.length;

  const filteredMembers = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phone.toLowerCase().includes(searchTerm) ||
        member.id.toLowerCase().includes(searchTerm);

      const matchesRole =
        roleFilter === "All" || member.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, roleFilter, statusFilter]);

  const filteredInvitations = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return invitations.filter((invitation) => {
      const matchesSearch =
        invitation.name.toLowerCase().includes(searchTerm) ||
        invitation.email.toLowerCase().includes(searchTerm) ||
        invitation.id.toLowerCase().includes(searchTerm);

      const matchesRole =
        roleFilter === "All" || invitation.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [invitations, search, roleFilter]);

  const handleInvite = (data: {
    name: string;
    email: string;
    phone: string;
    role: TeamRole;
  }) => {
    const alreadyMember = members.some(
      (member) => member.email.toLowerCase() === data.email
    );

    const alreadyInvited = invitations.some(
      (invitation) => invitation.email.toLowerCase() === data.email
    );

    if (alreadyMember || alreadyInvited) {
      window.alert(
        "This email address already belongs to a team member or has a pending invitation."
      );
      return;
    }

    const newInvitation: TeamInvitation = {
      id: `INV-${String(Date.now()).slice(-6)}`,
      name: data.name,
      email: data.email,
      role: data.role,
      sentDate: new Date().toLocaleDateString("en-NG", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setInvitations((previous) => [newInvitation, ...previous]);
    setModalOpen(false);
    setActiveTab("invitations");
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const handleRevokeAccess = (member: TeamMember) => {
    const confirmed = window.confirm(
      `Are you sure you want to revoke access for ${member.name}?`
    );

    if (!confirmed) return;

    setMembers((previous) =>
      previous.filter((item) => item.id !== member.id)
    );

    setOpenMenuId(null);
  };

  const handleCancelInvitation = (invitation: TeamInvitation) => {
    const confirmed = window.confirm(
      `Cancel the invitation sent to ${invitation.email}?`
    );

    if (!confirmed) return;

    setInvitations((previous) =>
      previous.filter((item) => item.id !== invitation.id)
    );

    setOpenMenuId(null);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const clearInvitationFilters = () => {
    setSearch("");
    setRoleFilter("All");
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Team Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage workspace staff, invitations and team access.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800"
        >
          <UserPlus size={18} />
          Invite Team Member
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
              <Users size={20} />
            </div>
            <span className="text-xs text-slate-400">Team directory</span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Total Members</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {members.length}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Registered team members
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
              <UserCheck size={20} />
            </div>
            <span className="text-xs text-slate-400">Current access</span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Active Members</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {activeMembers}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Members with active status
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-700">
              <Mail size={20} />
            </div>
            <span className="text-xs text-slate-400">Awaiting acceptance</span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Pending Invitations</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {pendingCount}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Invitations not yet accepted
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-50 p-2.5 text-purple-700">
              <ShieldCheck size={20} />
            </div>
            <span className="text-xs text-slate-400">Privileged role</span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Administrators</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {adminCount}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Members assigned the Admin role
          </p>
        </div>
      </div>

      {/* Team directory */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {/* Tabs */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 pt-4 sm:flex-row sm:items-center">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("members");
                setSearch("");
                setRoleFilter("All");
                setStatusFilter("All");
                setOpenMenuId(null);
              }}
              className={`relative pb-4 text-sm font-medium transition ${
                activeTab === "members"
                  ? "text-green-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Team Members
              <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {members.length}
              </span>

              {activeTab === "members" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-green-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("invitations");
                setSearch("");
                setRoleFilter("All");
                setStatusFilter("All");
                setOpenMenuId(null);
              }}
              className={`relative pb-4 text-sm font-medium transition ${
                activeTab === "invitations"
                  ? "text-green-700"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Pending Invitations
              <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                {invitations.length}
              </span>

              {activeTab === "invitations" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-green-700" />
              )}
            </button>
          </div>

          <div className="pb-3 text-xs text-slate-400">
            Workspace access directory
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                activeTab === "members"
                  ? "Search name, email or phone..."
                  : "Search invitation name or email..."
              }
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-40"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                
                <option value="Staff">Staff</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            {activeTab === "members" && (
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-40"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Team members table */}
        {activeTab === "members" && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Team Member</th>
                    <th className="px-5 py-4">Member ID</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Joined Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((member) => {
                    const initials = member.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr
                        key={member.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-700">
                              {initials}
                            </div>

                            <div className="min-w-0">
                              <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                                {member.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-500">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {member.id}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${roleStyles[member.role]}`}
                          >
                            {member.role}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {member.joinedDate}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              member.status === "Active"
                                ? "bg-green-50 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                member.status === "Active"
                                  ? "bg-green-600"
                                  : "bg-slate-400"
                              }`}
                            />
                            {member.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="relative inline-block">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId === member.id ? null : member.id
                                )
                              }
                              aria-label={`Actions for ${member.name}`}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                            >
                              <MoreHorizontal size={19} />
                            </button>

                            {openMenuId === member.id && (
                              <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-lg">
                                <button
                                  type="button"
                                  onClick={() => handleRevokeAccess(member)}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                >
                                  <Trash2 size={15} />
                                  Revoke access
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredMembers.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <Users size={24} className="mx-auto text-slate-400" />
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    No team members found
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {filteredMembers.length > 0 && (
              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-xs text-slate-500">
                  Showing {filteredMembers.length} of {members.length} team members
                </p>
              </div>
            )}
          </>
        )}

        {/* Pending invitations table */}
        {activeTab === "invitations" && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Invitee</th>
                    <th className="px-5 py-4">Invitation ID</th>
                    <th className="px-5 py-4">Assigned Role</th>
                    <th className="px-5 py-4">Date Sent</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredInvitations.map((invitation) => (
                    <tr
                      key={invitation.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-800">
                          {invitation.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {invitation.email}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {invitation.id}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${roleStyles[invitation.role]}`}
                        >
                          {invitation.role}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {invitation.sentDate}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          <Clock3 size={13} />
                          {invitation.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleCancelInvitation(invitation)}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInvitations.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <Mail size={24} className="mx-auto text-slate-400" />
                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    No pending invitations
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    There are no invitations matching your search.
                  </p>
                  <button
                    type="button"
                    onClick={clearInvitationFilters}
                    className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {filteredInvitations.length > 0 && (
              <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-xs text-slate-500">
                  Showing {filteredInvitations.length} of {invitations.length} pending invitations
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Invitation modal */}
      <InviteMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleInvite}
      />
    </div>
  );
}