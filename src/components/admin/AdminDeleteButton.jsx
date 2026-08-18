"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDeleteButton({ resource, id, label = "data" }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (loading) return;

    const confirmed = window.confirm(
      `Yakin ingin menghapus ${label} ini?\n\nTindakan ini tidak dapat dibatalkan.`,
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/${resource}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || "Gagal menghapus data.",
        );
      }

      router.refresh();
    } catch (err) {
      setError(err?.message || "Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="
          rounded-lg
          border border-red-200
          px-3 py-2
          text-xs font-semibold
          text-red-600
          transition
          hover:border-red-300
          hover:bg-red-50
          hover:text-red-700
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Menghapus..." : "Hapus"}
      </button>

      {error ? (
        <span className="max-w-[220px] text-right text-[10px] text-red-600">
          {error}
        </span>
      ) : null}
    </div>
  );
}
