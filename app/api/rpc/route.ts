// app/api/rpc/route.ts https://devnet.dplabs-internal.com

import { NextRequest, NextResponse } from "next/server";

const DEVNET_RPC_URL = "https://devnet.dplabs-internal.com"; // Replace with your devnet RPC

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const rpcResponse = await fetch(DEVNET_RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await rpcResponse.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

