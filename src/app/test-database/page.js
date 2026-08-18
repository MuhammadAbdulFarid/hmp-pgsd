import { createClient } from "@/lib/supabase/server";

export default async function TestDatabase() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("angkatan").select("*");

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Test Database HMP PGSD</h1>

      {error ? (
        <div className="mt-5 text-red-500">❌ Error: {error.message}</div>
      ) : (
        <>
          <div className="mt-5 text-green-600">
            ✅ Supabase berhasil terhubung
          </div>

          <pre className="mt-5 rounded-lg bg-gray-100 p-5 text-black">
            {JSON.stringify(data, null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}
