'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from '@/components/Tables/users-tables/cell-action';
import { Button } from '@/components/ui/button';
import { User } from '@/constants/data';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';


// update UserCell component to properly handle row type
const UserCell = ({ row }: { row: any }) => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push(`/admin/user/${row.original.id}`)}
      style={{ cursor: 'pointer', color: 'blue' }}
    >
      {row.original.id}
    </span>
  );
};

export const columns: ColumnDef<User>[] = [
  
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <UserCell row={row} />,
  },
  {
    accessorKey: 'first_name',
    header: 'FIRST NAME',
  },
  {
    accessorKey: 'last_name',
    header: 'LAST NAME',
  },
  {
    accessorKey: 'username',
    header: 'USERNAME',
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
  },
  {
    accessorKey: 'role',
    header: 'ROLE',
  },
  {
    accessorKey: 'entity',
    header: 'ENTITY',
  },
  {
    accessorKey: 'isVerified',
    header: 'VERIFIED',
    cell: ({ row }) => (row.original.isVerified ? 'Verified' : 'Not Verified'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

