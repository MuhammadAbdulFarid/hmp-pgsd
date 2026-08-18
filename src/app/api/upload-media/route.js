import { NextResponse } from "next/server";

import { getCurrentAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "media";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const ALLOWED_FOLDERS = new Set([
  "pengurus",
  "struktur-pengurus",
  "angkatan",
  "galeri",
  "program-kerja",
  "site-settings",
  "uploads",
]);

/* =========================================================
   GET — TEST ENDPOINT
   ========================================================= */

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload media API aktif.",
    bucket: BUCKET,
    methods: ["GET", "POST"],
  });
}

/* =========================================================
   POST — UPLOAD
   ========================================================= */

export async function POST(request) {
  try {
    /* ==============================================
       AUTH ADMIN
       ============================================== */

    const admin = await getCurrentAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Sesi admin tidak ditemukan. Silakan login ulang.",
        },
        {
          status: 401,
        },
      );
    }

    /* ==============================================
       FORM DATA
       ============================================== */

    const formData = await request.formData();

    const file = formData.get("file");

    const requestedFolder = String(
      formData.get("folder") || "uploads",
    )
      .trim()
      .toLowerCase();

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "File foto tidak diterima server.",
        },
        {
          status: 400,
        },
      );
    }

    console.log("");
    console.log("========================================");
    console.log("UPLOAD MEDIA");
    console.log("========================================");
    console.log("File   :", file.name);
    console.log("Type   :", file.type);
    console.log("Size   :", file.size);
    console.log("Folder :", requestedFolder);

    /* ==============================================
       TYPE
       ============================================== */

    const extension = ALLOWED_TYPES[file.type];

    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Format "${file.type || "unknown"}" tidak didukung. ` +
            "Gunakan JPG, PNG, atau WEBP.",
        },
        {
          status: 400,
        },
      );
    }

    /* ==============================================
       SIZE
       ============================================== */

    if (file.size <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "File kosong.",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Ukuran file ${(file.size / 1024 / 1024).toFixed(2)} MB. ` +
            "Maksimal 5 MB.",
        },
        {
          status: 400,
        },
      );
    }

    /* ==============================================
       FOLDER
       ============================================== */

    const folder = ALLOWED_FOLDERS.has(requestedFolder)
      ? requestedFolder
      : "uploads";

    /* ==============================================
       FILE NAME
       ============================================== */

    const uniqueName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const storagePath =
      `${folder}/${uniqueName}`;

    /* ==============================================
       SUPABASE
       ============================================== */

    const supabase = createAdminClient();

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    console.log(
      "Buffer :",
      buffer.length,
      "bytes",
    );

    const {
      data: uploadData,
      error: uploadError,
    } = await supabase.storage
      .from(BUCKET)
      .upload(
        storagePath,
        buffer,
        {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        },
      );

    if (uploadError) {
      console.error(
        "SUPABASE STORAGE ERROR:",
        uploadError,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            uploadError.message ||
            "Supabase Storage menolak upload.",
          error:
            uploadError.message,
        },
        {
          status: 400,
        },
      );
    }

    /* ==============================================
       PUBLIC URL
       ============================================== */

    const {
      data: publicUrlData,
    } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    const publicUrl =
      publicUrlData?.publicUrl;

    if (!publicUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Upload berhasil tetapi public URL tidak dapat dibuat.",
        },
        {
          status: 500,
        },
      );
    }

    console.log(
      "UPLOAD BERHASIL:",
      storagePath,
    );

    console.log(
      "PUBLIC URL:",
      publicUrl,
    );

    console.log(
      "========================================",
    );
    console.log("");

    return NextResponse.json({
      success: true,

      message:
        "Foto berhasil diupload.",

      bucket:
        BUCKET,

      path:
        uploadData?.path ||
        storagePath,

      url:
        publicUrl,
    });
  } catch (error) {
    console.error(
      "UPLOAD MEDIA EXCEPTION:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error?.message ||
          "Terjadi kesalahan saat upload.",

        error:
          error?.message ||
          String(error),
      },
      {
        status: 500,
      },
    );
  }
}
