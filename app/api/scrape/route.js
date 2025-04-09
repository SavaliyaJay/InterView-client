import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request) {
  try {
    const { url } = await request.json();

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    // Remove script and style tags
    $("script").remove();
    $("style").remove();

    const title = $("title").text();
    const description = $('meta[name="description"]').attr("content") || "";
    const content = $("body").text().trim().replace(/\s+/g, " ");

    return NextResponse.json({
      title,
      description,
      content
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to scrape website" }, { status: 500 });
  }
}
