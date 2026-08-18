import { NextResponse } from "next/server";

import { getAdminResource, sanitizeAdminPayload } from "@/lib/admin/resources";

import { revalidateResourcePaths } from "@/lib/admin/revalidate";

import { getCurrentAdmin } from "@/lib/auth/admin";

import { createAdminClient } from "@/lib/supabase/admin";

/* =========================================================
   AUTH
   ========================================================= */

async function authorizeAdmin() {
  return getCurrentAdmin();
}

/* =========================================================
   GET ONE
   ========================================================= */

export async function GET(request, context) {
  const admin = await authorizeAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { resource, id } = await context.params;

  const config = getAdminResource(resource);

  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: "Resource tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(config.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data.",
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        message: "Data tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

/* =========================================================
   UPDATE
   ========================================================= */

export async function PUT(request, context) {
  return updateResource(request, context, "PUT");
}

export async function PATCH(request, context) {
  return updateResource(request, context, "PATCH");
}

async function updateResource(request, context, method) {
  const admin = await authorizeAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { resource, id } = await context.params;

  const config = getAdminResource(resource);

  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: "Resource tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Request body tidak valid.",
      },
      {
        status: 400,
      },
    );
  }

  const payload = sanitizeAdminPayload(body);

  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Tidak ada data untuk diperbarui.",
      },
      {
        status: 400,
      },
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(config.table)
    .update(payload)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data.",
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        message: "Data tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  revalidateResourcePaths(resource, id);

  return NextResponse.json({
    success: true,
    method,
    message: config.label + " berhasil diperbarui.",
    data,
  });
}

/* =========================================================
   DELETE
   ========================================================= */

export async function DELETE(request, context) {
  const admin = await authorizeAdmin();

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const { resource, id } = await context.params;

  const config = getAdminResource(resource);

  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message: "Resource tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  /*
   * Jangan izinkan pengaturan website dihapus.
   */
  if (resource === "pengaturan" || resource === "site-settings") {
    return NextResponse.json(
      {
        success: false,
        message: "Pengaturan website tidak boleh dihapus.",
      },
      {
        status: 403,
      },
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(config.table)
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data.",
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        message: "Data tidak ditemukan.",
      },
      {
        status: 404,
      },
    );
  }

  revalidateResourcePaths(resource, id);

  return NextResponse.json({
    success: true,
    message: config.label + " berhasil dihapus.",
    data,
  });
}
