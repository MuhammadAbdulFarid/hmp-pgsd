import { NextResponse } from "next/server";

import { getAdminResource, sanitizeAdminPayload } from "@/lib/admin/resources";

import { revalidateResourcePaths } from "@/lib/admin/revalidate";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

async function authorizeAdmin() {
  return getCurrentAdmin();
}

/* =========================================================
   GET
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

  const { resource } = await context.params;

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

  const { data, error } = await supabase.from(config.table).select("*");

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

  return NextResponse.json({
    success: true,
    data: data || [],
  });
}

/* =========================================================
   POST / CREATE
   ========================================================= */

export async function POST(request, context) {
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

  const { resource } = await context.params;

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

  if (resource === "pengaturan" || resource === "site-settings") {
    return NextResponse.json(
      {
        success: false,
        message:
          "Pengaturan website tidak dapat ditambahkan melalui endpoint ini.",
      },
      {
        status: 403,
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
        message: "Tidak ada data untuk disimpan.",
      },
      {
        status: 400,
      },
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from(config.table)
    .insert(payload)
    .select()
    .maybeSingle();

  if (error) {
    console.error("[POST " + resource + "]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan data.",
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }

  revalidateResourcePaths(resource, data?.id);

  return NextResponse.json(
    {
      success: true,
      message: config.label + " berhasil ditambahkan.",
      data,
    },
    {
      status: 201,
    },
  );
}
