import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Users</h1>

      <div className="mt-5">
        {users.map((user) => (
          <div key={user.id}>
            {user.name} - {user.email}
          </div>
        ))}
      </div>
    </main>
  );
}
