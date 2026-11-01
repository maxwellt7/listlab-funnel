import { NextResponse, type NextRequest } from "next/server";
import { ghlConfigured, ghlEnv, listCustomFields, listPipelines } from "@/lib/ghl";

/**
 * Setup helper: lists ListLab's pipelines, stage ids and contact custom-field ids so the
 * GHL_PIPELINE_ID / GHL_STAGE_* / GHL_CF_* env vars can be filled in without digging through
 * GHL's UI. Protected by SETUP_SECRET:
 *
 *   GET /api/ghl/pipelines?secret=<SETUP_SECRET>
 *
 * Remove SETUP_SECRET from the environment to disable the route entirely.
 */
export async function GET(request: NextRequest) {
  const provided = request.nextUrl.searchParams.get("secret"); // read the request first so this route is never prerendered
  const secret = process.env.SETUP_SECRET;
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (!ghlConfigured()) {
    return NextResponse.json({ error: "GHL_API_KEY and GHL_LOCATION_ID are not set." }, { status: 500 });
  }
  try {
    const [pipelines, fields] = await Promise.all([listPipelines(), listCustomFields().catch(() => ({ customFields: [] }))]);
    return NextResponse.json({
      locationId: ghlEnv.locationId,
      configured: {
        pipelineId: ghlEnv.pipelineId || null,
        stageNewLead: ghlEnv.stageNewLead || null,
        stageApplicationSubmitted: ghlEnv.stageApplied || null,
      },
      pipelines: pipelines.pipelines.map((p) => ({
        id: p.id,
        name: p.name,
        stages: [...p.stages].sort((a, b) => a.position - b.position).map((s) => ({ id: s.id, name: s.name })),
      })),
      customFields: fields.customFields.map((f) => ({ id: f.id, name: f.name, key: f.fieldKey, type: f.dataType })),
    });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 502 });
  }
}
